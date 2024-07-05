import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";

import HeaderLanding from './Components/HeaderLanding';
import MainContentLanding from './Components/MainContentLanding';
import Navbarmain from './Components/Navbarmain';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <HeaderLanding />
      <MainContentLanding />      
      <Footer />

    </div>
    
  );
}

export default App;
