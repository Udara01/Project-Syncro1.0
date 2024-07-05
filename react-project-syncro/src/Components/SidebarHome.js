// Sidebar.js

import React from 'react';
import './Sidebar.css'; // Import CSS for styling 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Task</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">Setting</a></li>
            </ul>
        </div>
    );
}

export default Sidebar;
