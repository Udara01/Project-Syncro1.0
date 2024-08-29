import React from 'react';
import { HeaderLanding, MainContentLanding } from '../Components/HeaderLanding'; // Adjust the import path as needed
import Footer from '../Components/Layouts/Footer';
import ChatApp from '../Components/ChatApp';
import Navbarmain from '../Components/Layouts/Navbarmain'

function Chat() {
  return (
    <div className="Landing">
      <Navbarmain />
      <ChatApp/>
      <Footer />
    </div>
    
  );
}

export default Chat;