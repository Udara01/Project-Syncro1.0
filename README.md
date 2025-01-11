# Project-Syncro1.0
Project-Syncro1.0 is a comprehensive system designed to enhance project and remote work management. It offers features such as task tracking, milestone management, team collaboration, time tracking, virtual meetings, productivity analysis, and user management. Built with Node.js/Express, React.js, MongoDB, and video conferencing APIs, it aims to boost team productivity and communication.

![Landing_Page Screenshot](https://github.com/Udara01/Project-Syncro1.0/blob/main/react-project-syncro/Backend/uploads/LandPage.png)
 
![Dashboard Screenshot](https://github.com/Udara01/Project-Syncro1.0/blob/main/react-project-syncro/Backend/uploads/Dashboard.png)

## Table of Contents

- [Features](#features)
- [Technologies_Used](#Technologies_Used)
- [Demo](#demo)
- [Prerequisites](#Prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Future_Features](#Future_Features)
- [License](#license)
- [Contact](#contact)

## Features

- **Task Tracking**: Create, assign, and monitor tasks to ensure timely completion.
- **Milestone Management**: Set and track project milestones to monitor progress.
- **Team Collaboration**: Facilitate seamless communication and collaboration among team members.
- **Time Tracking**: Log work hours to manage time effectively.
- **Virtual Meetings**: Conduct video conferences directly within the platform.
- **Productivity Analysis**: Analyze team performance with built-in analytics tools.
- **User Management**: Manage user roles and permissions to control access.

## Technologies_Used
- **Frontend**: ![React.js](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)
                ![CSS](https://img.shields.io/badge/Styling-CSS-1572B6?logo=css3)
                ![Bootstrap](https://img.shields.io/badge/Styling-Bootstrap-7952B3?logo=bootstrap)

- **Backend**: ![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js) ![Express.js](https://img.shields.io/badge/Backend-Express.js-000000?logo=express)

- **Database**: ![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
- **Authentication**: JSON Web Tokens![JWT](https://img.shields.io/badge/Authentication-JWT-000000?logo=jsonwebtokens)
- **Video Conferencing**: ![Zoom APIs](https://img.shields.io/badge/Video%20Conferencing-Zoom%20APIs-2D8CFF?logo=zoom)


## Demo

A live demo of the project is available at: [Project-Syncro1.0 Demo](https://project-syncro.vercel.app)

Here's the corrected **Installation** section with the details about running the backend and frontend separately, as well as installing dependencies for both parts:

---

## Prerequisites
- ![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green) (v14 or later)  
- ![npm](https://img.shields.io/badge/npm-v6%2B-CB3837?logo=npm) (v6 or later)  
- ![MongoDB](https://img.shields.io/badge/MongoDB-Local%20or%20Cloud%20Atlas-47A248?logo=mongodb)  


## Installation
---

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Udara01/Project-Syncro1.0.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Project-Syncro1.0
   ```

3. **Install backend dependencies**:

   Navigate to the `Backend` directory and install the required dependencies:

   ```bash
   cd Backend
   npm install
   ```

4. **Start the backend server**:

   Run the backend server using `nodemon`:

   ```bash
   nodemon server.js
   ```

   The backend server will start running on the specified port (e.g., `http://localhost:5000`).

5. **Install frontend dependencies**:

   Navigate to the `react-project-syncro` directory and install the required dependencies:

   ```bash
   cd ../react-project-syncro
   npm install
   ```

6. **Start the frontend application**:

   Run the frontend development server:

   ```bash
   npm start
   ```

   The frontend application should now be running at `http://localhost:3000`.

7. **Set up environment variables**:

   In the `Backend` directory, create a `.env` file and add the following:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

   Replace `your_mongodb_connection_string` and `your_secret_key` with the appropriate values.

---

After completing these steps, your project should be fully functional with the backend running on `http://localhost:5000` and the frontend running on `http://localhost:3000`.

## Usage

After installation, you can:

- **Register a new account** or **log in** with existing credentials.
- **Create a new project** and invite team members.
- **Assign tasks** and **set milestones** to manage project progress.
- **Track time** spent on tasks using the time tracking feature.
- **Initiate virtual meetings** directly from the platform.
- **Analyze productivity** through the analytics dashboard.


## Future_Features
- Integration with third-party project management tools.
- Mobile application support.
- Advanced reporting and analytics dashboards.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Udara01/Project-Syncro1.0/blob/main/LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact [Udara01](https://github.com/Udara01).

---
