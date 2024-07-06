import React from 'react';
import HeaderLanding from '../Components/HeaderLanding';
import MainContentLanding from '../Components/MainContentLanding';
import Footer from '../Components/Footer';

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