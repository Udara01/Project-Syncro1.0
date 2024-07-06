import './App.css';
import { Routes, Route } from "react-router-dom";

import Landing from './Pages/Landing';//Landing page
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';//Home page

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
