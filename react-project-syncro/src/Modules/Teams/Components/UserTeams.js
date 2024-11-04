import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import { FaUserTie, FaCogs, FaLaptopCode, FaPencilRuler, FaClipboardList, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../../styles/UserTeams.css';

const roleIcons = {
    "Project Manager": <FaUserTie className="member-icon" />,
    "Product Owner": <FaClipboardList className="member-icon" />,
    "Business Analyst": <FaCogs className="member-icon" />,
    "Team Lead": <FaUserTie className="member-icon" />,
    "Developers/Programmers": <FaLaptopCode className="member-icon" />,
    "UX/UI Designers": <FaPencilRuler className="member-icon" />,
    "Quality Assurance Testers": <FaClipboardList className="member-icon" />,
    "Client": <FaUserTie className="member-icon" />
};

const UserTeams = () => {
    const { user } = useContext(UserContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMembers, setShowMembers] = useState({});

    useEffect(() => {
        if (user) {
            const fetchUserTeams = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/api/userProjects/user-projects/${user.useremail}/teams`);
                    setProjects(response.data);
                } catch (error) {
                    console.error("Error fetching user project teams:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserTeams();
        }
    }, [user]);

    const toggleMembers = (projectId) => {
        setShowMembers(prevState => ({
            ...prevState,
            [projectId]: !prevState[projectId]
        }));
    };

    if (loading) {
        return <div className="loading-spinner">Loading teams...</div>;
    }

    return (
        <div className="user-teams-container mt-5">
            <h2 className="text-center mb-4">Your Project Teams</h2>
            {projects.length > 0 ? (
                <div className="row">
                    {projects.map((project) => (
                        <div key={project._id} className="col-md-6 mb-4">
                            <div className="card project-card">
                                <div className="project-header">
                                    {project.projectName}
                                </div>
                                <div className="card-body">
                                    <button className="toggle-members-btn" onClick={() => toggleMembers(project._id)}>
                                        {showMembers[project._id] ? "Hide Team Members" : "Show Team Members"}
                                        {showMembers[project._id] ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                    {showMembers[project._id] && (
                                        <ul className="member-list">
                                            {project.teamMembers.map((member, index) => (
                                                <li key={index} className="member-card">
                                                    <div className="member-details">
                                                        {roleIcons[member.role] || <FaUserTie className="member-icon" />}
                                                        <span className="member-email">{member.email}</span>
                                                    </div>
                                                    <span className="member-role">{member.role}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">You are not assigned to any project teams.</p>
            )}
        </div>
    );
};

export default UserTeams;
