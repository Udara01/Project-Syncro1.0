import './App.css';
import { Routes, Route } from "react-router-dom";

import Landing from './Pages/Landing'; // Landing page
import Chat from './Pages/Chat'; // Chat Page

import Register from './Modules/Authentication/components/Register';
import Login from './Modules/Authentication/components/Log';
import ForgotPassword from './Modules/Authentication/components/ForgotPassword'; // for the reset password
import DashboardHome from './Modules/Home/Components/DashboardHome';

import ProjectList from './Modules/Project/components/ProjectList';
import CreateProject from './Modules/Project/components/CreateProject';
import Dashboard from './Modules/ProjectDashboard/pages/Dashboard';
import UserSearch from './Modules/SearchUsers/userSearch';

import PrivateRoute from './Modules/Authentication/components/PrivateRoute';

import ProjectPlanning from './Modules/Project/components/ProjectPlanning'; // Example restricted page{/*Role base access control test*/}
import ProductOwnerPage from './Modules/Project/components/ProductOwnerPage'; // Import ProductOwnerPage{/*Role base access control test*/}

import RequirementUploadPage from './Modules/ProductOwner/Pages/RequirementUploadPage';

import Meet from './Modules/VirtualMeeting/Components/meet'; // for the create and store virtual meeting

import TeamMembers from './Modules/ProjectDashboard/Components/TeamMembers'; // show allocated team members for the page

import MeetingDetails from './Modules/VirtualMeeting/Components/MeetingDetails'; // show the meeting details in a page

import MeetingPage from './Modules/VirtualMeeting/pages/MeetingPage'; // To create the meeting

function App() {
  return (
    <div className="App">
      {/* Define the routes within the App function */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Add a route for the Chat page */}
        <Route path='/chat' element={<Chat />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<DashboardHome />} />
          <Route path='/createProject' element={<CreateProject />} />
          <Route path='/projects' element={<ProjectList />} />
          <Route path='/dashboard/:projectId' element={<Dashboard />} /> {/* Route for each project dashboard */}
          <Route path='/user' element={<UserSearch />} />
          <Route path='/projects/:projectId/add-meeting' element={<Meet />} />
          <Route path='/projects/:projectId/team-members' element={<TeamMembers />} />
          <Route path='/meetings' element={<MeetingDetails />} />
          <Route path='/projects/:projectId/create-meeting' element={<MeetingPage />} />

          {/* Role-based access control */}
          <Route path='/project-planning/:projectId' element={<PrivateRoute requiredRole="Project Manager" />}>
            <Route path='' element={<ProjectPlanning />} />
          </Route>

          <Route path='/product-owner/:projectId' element={<PrivateRoute requiredRole="Project Owner" />}>
            <Route path='' element={<ProductOwnerPage />} />
          </Route>

          <Route path='/Prioritize-Requirements/:projectId' element={<PrivateRoute requiredRole="Project Owner" />}>
            <Route path='' element={<RequirementUploadPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
