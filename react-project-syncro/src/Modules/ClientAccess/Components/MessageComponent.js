import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import { Alert, Image, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Chat.css';

const MessageComponent = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const { members } = useContext(MembersContext);
  const { user } = useContext(UserContext);

  const userId = user?.userId;
  const placeholderImage = 'https://via.placeholder.com/100';

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
        setTeamMembers(response.data.teamMembers);
      } catch {
        console.error('Error fetching team members');
      }
    };

    const fetchMessages = async () => {
      if (!selectedMember) return;
      try {
        const response = await axios.get(`http://localhost:4000/api/chat/history/${projectId}/one-on-one`, {
          params: { senderId: userId, receiverId: selectedMember._id },
        });
        setMessages((prev) => [...prev, ...response.data]);
      } catch {
        console.error('Failed to fetch messages');
      }
    };

    fetchTeamMembers();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [projectId, selectedMember, userId]);

  const sendMessage = async () => {
    if (!selectedMember || !newMessage.trim()) return;
    try {
      await axios.post('http://localhost:4000/api/chat/send-message', {
        senderId: userId,
        receiverId: selectedMember._id,
        projectId,
        content: newMessage,
        chatType: 'one-on-one',
      });
      setNewMessage('');
    } catch {
      console.error('Failed to send message');
    }
  };

  return (
    <div className="chat-container d-flex" style={{ height: '600px', fontSize: '0.85em' }}>
      <div className="chat-sidebar" style={{ width: '250px', overflowY: 'auto' }}>
        <h6>Team Members</h6>
        <ListGroup variant="flush">
          {teamMembers.map((member) => {
            const matchedMember = members.find((m) => m.email === member.email);
            return (
              <ListGroup.Item
                key={member._id}
                active={selectedMember?._id === member._id}
                onClick={() => setSelectedMember(member)}
                className="d-flex align-items-center py-1"
              >
                <Image
                  src={matchedMember?.profilePicture ? `http://localhost:4000${matchedMember.profilePicture}` : placeholderImage}
                  onError={(e) => (e.target.src = placeholderImage)}
                  width="30"
                  height="30"
                  roundedCircle
                />
                <span className="ms-2" style={{ fontSize: '0.8em' }}>{member.role} ({member.email})</span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>

      <div className="chat-main p-2 flex-fill" style={{ fontSize: '0.9em' }}>
        <div className="chat-messages mb-2 p-2" style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd' }}>
          {selectedMember ? (
            messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender._id === userId ? 'sent' : 'received'} mb-1`}>
                <strong>{msg.sender.username}:</strong> {msg.content}
              </div>
            ))
          ) : (
            <Alert variant="info" style={{ padding: '0.5rem' }}>Select a team member to start a chat</Alert>
          )}
        </div>

        <div className="input-group" style={{ fontSize: '0.85em' }}>
          <input
            type="text"
            className="form-control form-control-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            disabled={!selectedMember}
          />
          <button className="btn btn-primary btn-sm" onClick={sendMessage} disabled={!selectedMember}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;

