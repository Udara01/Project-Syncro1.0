import './App.css';
import { Routes, Route } from "react-router-dom";

import Landing from './Pages/Landing';//Landing page
import SignUp from './Modules/Authentication/components/SignUp';
import Home from './Pages/Home';//Home page
import Login from './Modules/Authentication/components/Login';

function App() {
  return (
    <div className="App">

    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/signup' element={<SignUp></SignUp>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
    </Routes>
    </div>
    
  );
}

export default App;
