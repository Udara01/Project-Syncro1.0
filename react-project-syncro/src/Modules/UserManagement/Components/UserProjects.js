import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/UserProjects.css';
import { useParams } from 'react-router-dom';


function UserProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const { user } = useContext(UserContext);
  

  const { userId } = useParams();

  useEffect(() => {
    console.log("User data:", user);

    if (userId) {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/user-projects/${userId}`);
          setProjects(response.data.projects);
        } catch (error) {
          console.error("Error fetching projects", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    } else {
      setLoading(false);
      console.warn("userEmail is undefined, skipping fetchProjects call.");
    }
  }, );

  if (loading) return <p>Loading...</p>;

  const getEmailInitials = (email) => email ? email.charAt(0).toUpperCase() : '';

  // Control how many projects are displayed based on the `showAll` state
  const displayedProjects = showAll ? projects : projects.slice(0, 5);

  return (
    <div className="container my-4">
      <h3>Active Projects</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Members</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {displayedProjects.map((project) => (
            <tr key={project._id}>
              <td>{project.projectName}</td>
              <td>
                <div className="d-flex">
                  {project.teamMembers.slice(0, 3).map((member, index) => (
                    <OverlayTrigger
                      key={index}
                      placement="top"
                      overlay={<Tooltip>{member.email}</Tooltip>}
                    >
                      <div className="avatar mx-1">{getEmailInitials(member.email)}</div>
                    </OverlayTrigger>
                  ))}
                  {project.teamMembers.length > 3 && <span>+{project.teamMembers.length - 3}</span>}
                </div>
              </td>
              <td style={{ width: '30%' }}>
                <ProgressBar now={project.status === 'Done' ? 100 : 50} label={`${project.status}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show the "View All" button only if there are more than 5 projects */}
      {projects.length > 5 && (
        <button className="btn btn-link" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show Less' : 'View All Projects'}
        </button>
      )}
    </div>
  );
}

export default UserProjects;





