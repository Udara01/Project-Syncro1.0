import './App.css';
import { Routes, Route } from "react-router-dom";

import Landing from './Pages/Landing';//Landing page

import Register from './Modules/Authentication/components/Register';
import Login from './Modules/Authentication/components/Log';
import DashboardHome from './Modules/Home/Components/DashboardHome';

import ProjectList from './Modules/Project/components/ProjectList';
import CreateProject from './Modules/Project/components/CreateProject';
import Dashboard from './Modules/ProjectDashboard/pages/Dashboard';
import UserSearch from './Modules/SearchUsers/userSearch';

import PrivateRoute from './Modules/Authentication/components/PrivateRoute';


function App() {
  return (
    <div className="App">

    <Routes>
    <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/signup' element={<Register></Register>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>


      <Route element={<PrivateRoute />}>
      <Route path='/home' element={<DashboardHome></DashboardHome>}></Route>
      <Route path='/createProject' element={<CreateProject></CreateProject>}></Route>
      <Route path='/projects' element={<ProjectList></ProjectList>}></Route>
      <Route path='/dashboard/:projectId' element={<Dashboard></Dashboard>}></Route>
      <Route path='/user' element={<UserSearch></UserSearch>}></Route>   
    </Route>
    </Routes>
    </div>
    
  );
}

export default App;
