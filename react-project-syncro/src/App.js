import './App.css';
import { Routes, Route } from "react-router-dom";




import Landing from './Pages/Landing';//Landing page

import Register from './Modules/Authentication/components/Register';
import Login from './Modules/Authentication/components/Log';
import ForgotPassword from './Modules/Authentication/components/ForgotPassword';//for the reset password
import DashboardHome from './Modules/Home/Components/DashboardHome';

import ProjectList from './Modules/Project/components/ProjectList';
import CreateProject from './Modules/Project/components/CreateProject';
import Dashboard from './Modules/ProjectDashboard/pages/Dashboard';
import UserSearch from './Modules/SearchUsers/userSearch';

import PrivateRoute from './Modules/Authentication/components/PrivateRoute';


import ProjectPlanning from './Modules/Project/components/ProjectPlanning'; // Example restricted page{/*Role base access control test*/}
import ProductOwnerPage from './Modules/Project/components/ProductOwnerPage'; // Import ProductOwnerPage{/*Role base access control test*/}

import RequirementUploadPage from './Modules/ProductOwner/Pages/RequirementUploadPage';

import Meet from './Modules/VirtualMeeting/Components/meet'; //for the create and store virtual meeting

import TeamMembers from './Modules/ProjectDashboard/Components/TeamMembers';//show allocated team members for the page

import MeetingDetails from './Modules/VirtualMeeting/Components/MeetingDetails';//show the meeting details in a page

import MeetingPage from './Modules/VirtualMeeting/pages/MeetingPage';//To create the meeting

import Notifications from './Modules/Notification/Components/Notifications';//To fetch the notifications and mark as read
import CreateNotification from './Modules/Notification/Components/CreateNotification';//just check one no need

import TaskList from './Modules/ProjectDashboard/Components/TaskList';  
import TaskCreationForm from './Modules/Task/Pages/Components/TaskCreationForm';  
import TaskApp from './Modules/Task/Pages/Components/TaskApp';


function App() {
  return (
    <div className="App">

    <Routes>
    <Route path='/' element={<Landing></Landing>}></Route>
      <Route path='/signup' element={<Register></Register>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route element={<PrivateRoute />}>
      <Route path='/home' element={<DashboardHome></DashboardHome>}></Route>
      <Route path='/createProject' element={<CreateProject></CreateProject>}></Route>
      <Route path='/projects' element={<ProjectList></ProjectList>}></Route>
      <Route path='/dashboard/:projectId' element={<Dashboard></Dashboard>}></Route>{/*//route for the each project dashboard*/}
      <Route path='/user' element={<UserSearch></UserSearch>}></Route>   


      <Route path='/projects/:projectId/add-meeting' element={<Meet />} />

      <Route path='/projects/:projectId/team-members' element={<TeamMembers />} />

      <Route path='/meetings' element={<MeetingDetails></MeetingDetails>}></Route>

      <Route path='/projects/:projectId/create-meeting' element={<MeetingPage></MeetingPage>}></Route>

      <Route path='/notification' element={<Notifications ></Notifications >}></Route>
      <Route path='/create-notification' element={<CreateNotification />} />
      
     <Route path='/taskList' element={<TaskList></TaskList>} />
     <Route path='/taskCreat' element={<TaskCreationForm></TaskCreationForm>} />
     <Route path='/taskApp' element={<TaskApp></TaskApp>} />

{/*Role base access control test*/}
          <Route path='/project-planning/:projectId' element={<PrivateRoute requiredRole="Project Manager" />}>
            <Route path='' element={<ProjectPlanning />} />
          </Route>

          <Route path='/product-owner/:projectId' element={<PrivateRoute requiredRole="Project Owner" />}>
            <Route path='' element={<ProductOwnerPage />} />
          </Route>
{/*Role base access control test end*/}

      <Route path='/Prioritize-Requirements/:projectId' element={<PrivateRoute requiredRole="Project Owner" />}>

        <Route path='' element={<RequirementUploadPage />} />
      </Route>


    </Route>
    </Routes>
    </div>
    
    
  );
}

export default App;
