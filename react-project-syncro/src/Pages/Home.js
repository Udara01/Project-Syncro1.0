import React, { useState } from 'react';
import Navbarmain from '../Components/Layouts/Navbarmain';
import Footer from '../Components/Layouts/Footer';

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="Home">
      <Navbarmain toggleSidebar={toggleSidebar} />
      <div
        className="content"
        style={{
          paddingLeft: showSidebar ? '280px' : '20px',
          marginTop: '56px',
          padding: '20px',
          marginBottom: '1200px', // Adjusted to ensure space for the footer
        }}
      >
        {/* Main content goes here */}
        <h1>Welcome to Syncro</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
