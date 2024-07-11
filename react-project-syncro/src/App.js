import './App.css';
import { Routes, Route } from "react-router-dom";

import Landing from './Pages/Landing';//Landing page
//import SignUp from './Modules/Authentication/components/SignUp';
import Home from './Pages/Home';//Home page
//import Login from './Modules/Authentication/components/Login';
import CreateProject from './Modules/Project/components/CreateProject';
import ProjectList from './Modules/Project/components/ProjectList';
import Dashboard from './Modules/Project/pages/Dashboard';
import UserSearch from './Modules/SearchUsers/userSearch';
import Register from './Modules/Authentication/components/Register';
import Login from './Modules/Authentication/components/Log';
import PrivateRoute from './Modules/Authentication/components/PrivateRoute';


function App() {
  return (
    <div className="App">

    <Routes>
      <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/signup' element={<Register></Register>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>


      <Route element={<PrivateRoute />}>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/createProject' element={<CreateProject></CreateProject>}></Route>
      <Route path='/projects' element={<ProjectList></ProjectList>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/user' element={<UserSearch></UserSearch>}></Route>
      
</Route>
    </Routes>
    </div>
    
  );
}

export default App;
