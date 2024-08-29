import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/chat.css';

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState('chamika');
  const [inputMessage, setInputMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(null);
  const [chats, setChats] = useState({});
  const contacts = ['chamika', 'udara', 'waruna'];

  const profilePhotos = {
    chamika: require('../Images/img.jpg'),
    udara: require('../Images/img.jpg'),
    waruna: require('../Images/img.jpg'),
    user: require('../Images/img.jpg'),
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/messages/${selectedChat}`);
        setChats((prevChats) => ({
          ...prevChats,
          [selectedChat]: response.data,
        }));
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  const handleContactClick = (contact) => {
    setSelectedChat(contact);
    setPopupVisible(null);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const newMessage = { chatId: selectedChat, sender: 'user', text: inputMessage };

      try {
        const response = await axios.post('http://localhost:4000/api/messages', newMessage);
        setChats((prevChats) => ({
          ...prevChats,
          [selectedChat]: [...(prevChats[selectedChat] || []), response.data],
        }));
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleDeleteMessage = async (index) => {
    const updatedChat = chats[selectedChat].filter((_, i) => i !== index);
    setChats({
      ...chats,
      [selectedChat]: updatedChat,
    });
    setPopupVisible(null);
  };

  const togglePopup = (index) => {
    setPopupVisible(popupVisible === index ? null : index);
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Your Contacts</h2>
        </div>
        <div className="sidebar-chats">
          {contacts.map((contact) => (
            <div
              key={contact}
              className={`sidebar-chat ${contact === selectedChat ? 'active' : ''}`}
              onClick={() => handleContactClick(contact)}
            >
              <img src={profilePhotos[contact]} alt={`${contact}'s profile`} className="profile-photo" />
              {contact}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <h3>Chat with {selectedChat}</h3>
        </div>
        <div className="chat-body">
          {(chats[selectedChat] || []).map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <img
                src={profilePhotos[message.sender === 'user' ? 'user' : selectedChat]}
                alt={`${message.sender}'s profile`}
                className="profile-photo"
              />
              <div className="message-content">
                <p>{message.text}</p>
                <div className="options">
                  <button className="options-button" onClick={() => togglePopup(index)}>
                    ⋮
                  </button>
                  {popupVisible === index && (
                    <div className="options-popup">
                      <button onClick={() => handleDeleteMessage(index)}>Delete</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
