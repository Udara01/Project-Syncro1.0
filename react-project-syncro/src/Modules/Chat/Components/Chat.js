/*import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Chat.css';

const Chat = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastFetchedTime, setLastFetchedTime] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const { members, loading } = useContext(MembersContext);
  const { user, setUser } = useContext(UserContext);

  const userId = user.userId;
  const senderEmail = user?.useremail

  useEffect(() => {
    fetchTeamMembers();
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [lastFetchedTime, selectedMember]);

  const fetchMessages = async () => {
    if (!selectedMember) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/chat/history/${projectId}/one-on-one`, {
        params: { senderId: userId, receiverId: selectedMember._id, lastFetchedTime },
      });
      if (response.data.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...response.data]);
        setLastFetchedTime(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
      setTeamMembers(response.data.teamMembers);
    } catch (err) {
      setError('Error fetching team members');
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!selectedMember) return;
    try {
      const messageData = {
        senderId: userId,
        receiverId: selectedMember._id,
        projectId,
        content: newMessage,
        chatType: 'one-on-one',
      };
      await axios.post('http://localhost:4000/api/chat/send-message', messageData);
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="chat-container container p-3">
      <h4 className="text-center mb-4">Project Chat</h4>

      {/* Team Member Selection 
      <div className="mb-3">
        <label className="form-label">Select a team member to chat with:</label>
        <select
          className="form-select"
          value={selectedMember ? selectedMember._id : ''}
          onChange={(e) => {
            const member = teamMembers.find((m) => m._id === e.target.value);
            setSelectedMember(member);
            setMessages([]);
          }}
        >
          <option value="">Select Member</option>
          {teamMembers.map((member) => (
            <option key={member._id} value={member._id}>
              {member.role} ({member.email})
            </option>
          ))}
        </select>
      </div>*//*}


<div className="mb-3">
        <label className="form-label">Select a team member to chat with:</label>
        <select
  className="form-select"
  value={selectedMember ? selectedMember._id : ''}
  onChange={(e) => {
    const member = teamMembers.find((m) => m._id === e.target.value);
    setSelectedMember(member);
    setMessages([]);
  }}
>
  <option value="">Select Member</option>
  {teamMembers.map((member) => (
    member.email !== senderEmail && (
      <option key={member._id} value={member._id}>
        {member.role} ({member.email})
      </option>
    )
  ))}
</select>

      </div>



      <div className="chat-messages p-3 border rounded mb-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}
          >
            <strong>{msg.sender.username}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;*/

/*
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Chat.css';

const Chat = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastFetchedTime, setLastFetchedTime] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const { members, loading } = useContext(MembersContext);
  const { user, setUser } = useContext(UserContext);

  const userId = user.userId;
  const senderEmail = user?.useremail;

  useEffect(() => {
    fetchTeamMembers();
    const interval = setInterval(() => {
      fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [lastFetchedTime, selectedMember]);

  const fetchMessages = async () => {
    if (!selectedMember) return;
    try {
      const response = await axios.get(`http://localhost:4000/api/chat/history/${projectId}/one-on-one`, {
        params: { senderId: userId, receiverId: selectedMember._id, lastFetchedTime },
      });
      if (response.data.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...response.data]);
        setLastFetchedTime(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
      setTeamMembers(response.data.teamMembers);
    } catch (err) {
      setError('Error fetching team members');
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!selectedMember) return;
    try {
      const messageData = {
        senderId: userId,
        receiverId: selectedMember._id,
        projectId,
        content: newMessage,
        chatType: 'one-on-one',
      };
      await axios.post('http://localhost:4000/api/chat/send-message', messageData);
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h5 className="sidebar-title">Team Members</h5>
        <ul className="member-list">
          {teamMembers
            .filter((member) => member.email !== senderEmail)
            .map((member) => (
              <li
                key={member._id}
                className={`member-item ${selectedMember?._id === member._id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedMember(member);
                  setMessages([]); // Clear messages when switching members
                }}
              >
                {member.role} ({member.email})
              </li>
            ))}
        </ul>
      </div>

      <div className="chat-main container p-3">
        <h4 className="text-center mb-4">Project Chat</h4>
        
        <div className="chat-messages p-3 border rounded mb-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}
            >
              <strong>{msg.sender.username}:</strong> {msg.content}
            </div>
          ))}
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
*/

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MembersContext } from '../../../contexts/MembersContext';
import { UserContext } from '../../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/Chat.css';
import { Spinner, Alert, Card, ListGroup, Image } from 'react-bootstrap';

const Chat = () => {
  const { projectId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lastFetchedTime, setLastFetchedTime] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // State for selected member
  const [error, setError] = useState('');
  const { members, loading } = useContext(MembersContext);
  const { user } = useContext(UserContext);

  const userId = user.userId;
  const senderEmail = user?.useremail;
  const placeholderImage = 'https://via.placeholder.com/100'; // Placeholder image URL

  useEffect(() => {
    fetchTeamMembers();
    const interval = setInterval(() => {
      if (selectedMember) fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [lastFetchedTime, selectedMember]);

  const fetchMessages = async () => {
    if (!selectedMember) return;
  
    try {
      const response = await axios.get(`http://localhost:4000/api/chat/history/${projectId}/one-on-one`, {
        params: { senderId: userId, receiverId: selectedMember._id, lastFetchedTime },
      });
      if (response.data.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...response.data]);
        setLastFetchedTime(new Date().toISOString());
      }
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/project/${projectId}/team-members`);
      setTeamMembers(response.data.teamMembers);
    } catch (err) {
      setError('Error fetching team members');
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!selectedMember) return;

    try {
      const messageData = {
        senderId: userId,
        receiverId: selectedMember._id, // Send to selected member
        projectId,
        content: newMessage,
        chatType: 'one-on-one',
      };
      await axios.post('http://localhost:4000/api/chat/send-message', messageData);
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member);
    setMessages([]); // Clear previous messages when selecting a new member
    setLastFetchedTime(null); // Reset last fetch time
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h5 className="sidebar-title">Team Members</h5>
        <ul className="member-list">
          {teamMembers
            .filter((member) => member.email !== senderEmail)
            .map((teamMember) => {
              const matchedMember = members.find((member) => member.email === teamMember.email);
              const imageurl = matchedMember ? matchedMember.profilePicture : placeholderImage;

              return (
                <li
                  key={teamMember._id}
                  className={`member-item ${selectedMember?._id === teamMember._id ? 'active' : ''}`}
                  onClick={() => handleMemberSelect(teamMember)} // Handle member selection
                >
                  <Image
                    src={imageurl ? `http://localhost:4000${imageurl}` : placeholderImage}
                    onError={(e) => (e.target.src = placeholderImage)}
                    width="40"
                    height="40"
                    alt="Profile"
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                  {teamMember.role} ({teamMember.email})
                </li>
              );
            })}
        </ul>
      </div>

      <div className="chat-main container p-3">
        {/* Chat Messages */}
        <div className="chat-messages p-3 border rounded mb-3">
          {selectedMember ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}
              >
                <strong>{msg.sender.username}:</strong> {msg.content}
              </div>
            ))
          ) : (
            <Alert variant="info">Select a team member to start a chat</Alert>
          )}
        </div>

        {/* Message Input */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            disabled={!selectedMember} // Disable if no member selected
          />
          <button className="btn btn-primary" onClick={sendMessage} disabled={!selectedMember}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

