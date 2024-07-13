// src/permissions.js
/* In here Defined role-based access control (RBAC). define permissions for each role*/
// src/permissions.js
export const permissions = {
  'Project Manager': [
    'ProjectPlanning', 'TaskList', 'Timeline', 'TeamMembers', 'FileUpload', 
    'ProjectSettings', 'Reports'
  ],
  'Product Owner': ['TaskList', 'Timeline', 'TeamMembers', 'Reports'],
  'Team Lead': ['TaskList', 'Timeline', 'TeamMembers', 'FileUpload'],
  'Developers/Programmers': ['TaskList', 'Timeline'],
  'UX/UI Designers': ['TaskList', 'Timeline'],
  'Quality Assurance Testers': ['TaskList'],
  'Client': ['ProjectOverview', 'CustomCalendar']
};

