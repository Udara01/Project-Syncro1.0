import React from 'react';
import Navbarmain from '../Components/Layouts/Navbarmain';

function Home() {
  return (
    <div className="Home">
      <Navbarmain />
      <div className="content" style={{ marginLeft: '250px', marginTop: '56px', padding: '20px' }}>
        {/* Main content goes here */}
        <h1>Welcome to the Syncro</h1>
      </div>
    </div>
  );
}

export default Home;

