// Sidebar.js

import React from 'react';
import '../../styles/Sidebar.css'; // Import CSS for styling 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li><a href="/home">Home</a></li>
                <li><a href="/task">Task</a></li>
                <li><a href="/project">Projects</a></li>
                <li><a href="/teams">Teams</a></li>
                <li><a href="/setting">Setting</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
