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

//import RequirementUploadPage from './Modules/ProductOwner/Pages/RequirementUploadPage';

import Meet from './Modules/VirtualMeeting/Components/meet'; //for the create and store virtual meeting

import TeamMembers from './Modules/ProjectDashboard/Components/TeamMembers';//show allocated team members for the page

import MeetingDetails from './Modules/VirtualMeeting/Components/MeetingDetails';//show the meeting details in a page

import MeetingPage from './Modules/VirtualMeeting/pages/MeetingPage';//To create the meeting

import Notifications from './Modules/Notification/Components/Notifications';//To fetch the notifications and mark as read
import CreateNotification from './Modules/Notification/Components/CreateNotification';//just check one no need

import SettingsPage from './Modules/Setting/Components/SettingsPage';

//import TaskCreationForm from './Modules/Task/Pages/Components/TaskCreationForm';  
import TaskApp from './Modules/Task/Components/TaskAssignModal';
import TaskCreationPage from './Modules/Task/page/TaskCreationPage';
import TaskListPage from './Modules/Task/page/TaskListPage';
import UpdateProject from './Modules/Project/components/UpdateProject';

import SprintPlanning from './Modules/ProjectPlaning/Components/Plan';
import GanttChart from './Modules/ProjectPlaning/Components/GanttChart';

import SprintGanttChart from './Modules/ProjectPlaning/Components/SprintGanttChart';

import TaskAssignModal from './Modules/Task/Components/TaskAssignModal';

import ParentComponent from './Modules/Task/Components/ParentComponent';

import TaskList from './Modules/Task/Components/TaskList';

import TaskDashboard from './Modules/Task/Components/TaskDashboard';

import LeaderTaskDashboard from './Modules/Task/Components/AllTasks';

import DesignUpload from './Modules/Design/Components/DesignUpload';

import DesignDownload from './Modules/Design/Components/DesignDownload';

import AddRequirement from './Modules/Requirements/Components/AddRequirement';

import RequirementList from './Modules/Requirements/Components/RequirementList';

import PrioritizedList from './Modules/Requirements/Components/PrioritizedList';

import TestingPage from './Modules/TestingandInitiation/Components/TestingPage';

import DocumentManagement from './Modules/DocumentManagement/page/DocumentManagement';

import PrivateDocument from './Modules/DocumentManagement/Components/PrivateDocument';

import ProjectProgress from './Modules/ClientAccess/Components/ProjectProgress';

import MilestoneForm from './Modules/Milestone/Components/MilestoneForm';

import MilestoneList from './Modules/Milestone/Components/MilestoneList';

import ProjectPlan from './Modules/ProjectPlaning/Page/ProjectPlan';

import MilestoneListPage from './Modules/Milestone/Pages/MilestoneListPage';

import GitDashboard from './Modules/SystemIntegration/Pages/GitDashboard';

import UserProfile from './Modules/UserManagement/Components/UpdateUserForm';

import UserPerformance from './Modules/UserManagement/Components/UserPerformance';

import UserProjects from './Modules/UserManagement/Components/UserProjects';

import MembersList from './Components/MembersList';

import ProfilePage from './Modules/UserManagement/Components/ProfilePage';

import UserCalendar from './Modules/UserManagement/Components/UserCalendar';

import CreateTaskDashboard from './Modules/Task/Pages/CreateTaskDashboard';

import UserTaskDashboard from './Modules/Task/Pages/UserTaskDashboard';

import RequirementUploadPage from './Modules/Requirements/Pages/RequirementUploadPage';

import RequirementListPage from './Modules/Requirements/Pages/RequirementListPage';

import PrioritizedRequirementspage from './Modules/Requirements/Pages/PrioritizedRequirementspage';

import DesignUploadPage from './Modules/Design/Pages/DesignUploadPage';

import DesignDownloadPage from './Modules/Design/Pages/DesignDownloadPage';

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

      <Route path='/user-profile' element={<UserProfile></UserProfile>}></Route>  

      <Route path='/user-performance' element={<UserPerformance></UserPerformance>}></Route> 

      <Route path='/user-projects' element={<UserProjects></UserProjects>}></Route> 

      <Route path='/MembersList' element={<MembersList></MembersList>}></Route> 

      <Route path='/profile/:userId' element={<ProfilePage></ProfilePage>}></Route> 

      <Route path='/profile/calender/:userId' element={<UserCalendar></UserCalendar>}></Route> 


      <Route path='/projects/:projectId/add-meeting' element={<Meet />} />

      <Route path='/projects/:projectId/team-members' element={<TeamMembers />} />

      <Route path='/meetings' element={<MeetingDetails></MeetingDetails>}></Route>

      <Route path='/projects/:projectId/create-meeting' element={<MeetingPage></MeetingPage>}></Route>

      <Route path='/notification' element={<Notifications ></Notifications >}></Route>
      <Route path='/create-notification' element={<CreateNotification />} />
      
      <Route path='/setting' element={<SettingsPage ></SettingsPage >}></Route>
      
     <Route path='/projects/:projectId/taskscomplete' element={<TaskListPage></TaskListPage>} />
     <Route path='/projects/:projectId/taskCreat' element={<TaskCreationPage></TaskCreationPage>} />
     <Route path='/projects/:projectId/taskApp' element={<TaskApp></TaskApp>} />

     <Route path='/projects/:projectId/taskassign' element={<TaskAssignModal></TaskAssignModal>} />

     <Route path='/projects/:projectId/ParentComponent' element={<ParentComponent></ParentComponent>} />

     <Route path='/projects/:projectId/updateproject' element={<UpdateProject></UpdateProject>} />

     <Route path='/projects/:projectId/gantt' element={<GanttChart></GanttChart>} />

     <Route path="/projects/:projectId/sprints" element={<SprintPlanning />} />
     


    <Route path="/projects/:projectId/sprints/:sprintId/gantt" element={<SprintGanttChart />} />

    <Route path="/projects/:projectId/tasks/user/:userEmail" element={<TaskList />} />

    <Route path="/projects/:projectId/tasks" element={<LeaderTaskDashboard />} />

    <Route path="/TaskDashboard" element={<TaskDashboard />} />

    

    
    <Route path="/projects/:projectId/git" element={<GitDashboard />} />

    <Route path="/projects/:projectId/testing" element={<TestingPage />} />
    
    <Route path="/projects/:projectId/documents" element={<DocumentManagement />} />

    <Route path="/projects/:projectId/pridocuments" element={<PrivateDocument />} />

    <Route path="/projects/:projectId/client" element={<ProjectProgress />} />

    <Route path="/projects/:projectId/milestoneForm" element={<MilestoneForm />} />

    <Route path="/projects/:projectId/project-planning" element={<ProjectPlan />} />

    <Route path="/projects/:projectId/milestone-List" element={<MilestoneListPage />} />

    <Route path="/projects/:projectId/CreateTask" element={<CreateTaskDashboard />} />

    <Route path="/projects/:projectId/userTask" element={<UserTaskDashboard />} />

    <Route path="/projects/:projectId/requirement" element={<RequirementUploadPage />} />

    <Route path="/projects/:projectId/requirementlist" element={<RequirementListPage />} />

    <Route path="/projects/:projectId/prioritylist" element={<PrioritizedRequirementspage />} />

    <Route path="/projects/:projectId/design" element={<DesignUploadPage />} />

    <Route path="/projects/:projectId/design/download" element={<DesignDownloadPage />} />


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
