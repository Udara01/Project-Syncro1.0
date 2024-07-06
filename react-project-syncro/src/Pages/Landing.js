import React from 'react';
import { HeaderLanding, MainContentLanding } from '../Components/HeaderLanding'; // Adjust the import path as needed
import Footer from '../Components/Layouts/Footer';

function Landing() {
  return (
    <div className="Landing">
      <HeaderLanding />
      <MainContentLanding />      
      <Footer />
    </div>
    
  );
}

export default Landing;