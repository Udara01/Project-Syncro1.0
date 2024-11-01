
/*
import React, { useState, useEffect, useContext } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext"; // Import user context

const RecentActivities = () => {
    const [activities, setActivities] = useState([]);
    const { user } = useContext(UserContext); // Get user context
    const userEmail = user?.useremail;

    useEffect(() => {                                         
        const fetchRecentActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/recentactivities`, {
                    params: { email: userEmail }
                });
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching recent activities:', error);
            }
        };

        if (userEmail) {
            fetchRecentActivities();
        }
    }, [userEmail]);

    return (
        <Card className="mb-4">
            <Card.Body>
                <div style={{ width: '200px', height: '330px', margin: '0 auto' }}>
                    <Card.Title>Recent Activities</Card.Title>
                    <ListGroup variant="flush">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>{activity.title || 'Requirement Updated'}</strong><br />
                                    <small>{new Date(activity.updatedAt).toLocaleString()} by {activity.updatedBy}</small>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>
                                <small>No recent activities found.</small>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>
    );
};

export default RecentActivities; */

/*
import React, { useState, useEffect, useContext } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";

const RecentActivities = () => {
    const [activities, setActivities] = useState([]);
    const { user } = useContext(UserContext); 
    const userEmail = user?.useremail;


    const [requirements, setRequirements] = useState([]);


    useEffect(() => {                                         
        const fetchRecentActivities = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/recentactivities`, {
                    params: { email: userEmail }
                });
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching recent activities:', error);
            }
        };

        if (userEmail) {
            fetchRecentActivities();
        }
    }, [userEmail]);

    const handleDownload = async (filePath) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/download`, {
                params: { path: filePath },
                responseType: 'blob', // Necessary to handle binary file data
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filePath.split('/').pop()); // Extract file name from path
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };





    useEffect(() => {                                         
        const fetchPrioritizedRequirements = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/prioritizedrequirements`, {
                    params: { email: userEmail }
                });
                setRequirements(response.data);
            } catch (error) {
                console.error('Error fetching prioritized requirements:', error);
            }
        };

        if (userEmail) {
            fetchPrioritizedRequirements();
        }
    }, [userEmail]);




    const handleDownloadPrioritize = async (filePath) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/download/Prioritize`, {
                params: { path: filePath },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filePath.split('/').pop());
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (

        <div>
        <Card className="mb-4">
            <Card.Body>
                <div style={{ width: '200px', height: '330px', margin: '0 auto' }}>
                    <Card.Title>Recent Activities</Card.Title>
                    <ListGroup variant="flush">
                        {activities.length > 0 ? (
                            activities.map((activity, index) => (
                                <ListGroup.Item key={index}>
                                    <strong>{activity.title || 'Requirement Updated'}</strong>
                                    <br />
                                    <small>
                                        {new Date(activity.updatedAt).toLocaleString()} by {activity.updatedBy}
                                    </small>
                                    <div>
                                        {activity.filePath && activity.filePath.length > 0 ? (
                                            activity.filePath.map((file, idx) => (
                                                <Button
                                                    key={idx}
                                                    variant="link"
                                                    onClick={() => handleDownload(file)}
                                                >
                                                    Download {activity.fileName ? activity.fileName[idx] : `File ${idx + 1}`}
                                                </Button>
                                            ))
                                        ) : (
                                            <small>No files to download.</small>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item>
                                <small>No recent activities found.</small>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </div>
            </Card.Body>
        </Card>

        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Prioritized Requirements</Card.Title>
                <ListGroup variant="flush">
                    {requirements.length > 0 ? (
                        requirements.map((requirement, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{requirement.description || 'Requirement'}</strong>
                                <br />
                                <small>Status: {requirement.status} | Priority: {requirement.priority}</small>
                                <div>
                                    {requirement.filePath && requirement.filePath.length > 0 ? (
                                        requirement.filePath.map((file, idx) => (
                                            <Button
                                                key={idx}
                                                variant="link"
                                                onClick={() => handleDownload(file)}
                                            >
                                                Download {requirement.fileName ? requirement.fileName[idx] : `File ${idx + 1}`}
                                            </Button>
                                        ))
                                    ) : (
                                        <small>No files to download.</small>
                                    )}
                                </div>
                                {requirement.comments && requirement.comments.length > 0 && (
                                    <div>
                                        <strong>Comments:</strong>
                                        <ul>
                                            {requirement.comments.map((comment, cIdx) => (
                                                <li key={cIdx}>
                                                    {comment.commentText} - <small>{comment.userEmail}</small>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>
                            <small>No prioritized requirements found.</small>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>

        </div>
    );
};

export default RecentActivities;*/



import React, { useState, useEffect, useContext } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import '../../../styles/RecentActivities.css'

const RecentActivities = () => {
    const [mergedData, setMergedData] = useState([]);
    const { user } = useContext(UserContext);
    const userEmail = user?.useremail;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activitiesResponse, requirementsResponse] = await Promise.all([
                    axios.get(`http://localhost:4000/api/recentactivities`, { params: { email: userEmail } }),
                    axios.get(`http://localhost:4000/api/prioritizedrequirements`, { params: { email: userEmail } })
                ]);

                const activities = activitiesResponse.data.map(activity => ({
                    ...activity,
                    type: 'activity'
                }));

                const requirements = requirementsResponse.data.map(requirement => ({
                    ...requirement,
                    type: 'requirement'
                }));

                const merged = [...activities, ...requirements]
                    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
                    .slice(0, 4);

                setMergedData(merged);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (userEmail) fetchData();
    }, [userEmail]);

    const handleDownload = async (filePath) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/download`, {
                params: { path: filePath },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filePath.split('/').pop());
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Recent Updates</Card.Title>
                <ListGroup variant="flush">
                    {mergedData.length > 0 ? (
                        mergedData.map((item, index) => (
                            <ListGroup.Item key={index} className="compact-item">
                                <strong>{item.type === 'activity' ? item.title || 'Requirement Updated' : item.description || 'Requirement'}</strong>
                                <br />
                                <small>
                                    {new Date(item.updatedAt || item.createdAt).toLocaleString()} by {item.updatedBy || item.createdBy}
                                </small>
                                <div>
                                    {item.filePath && item.filePath.length > 0 ? (
                                        item.filePath.map((file, idx) => (
                                            <Button
                                                key={idx}
                                                variant="link"
                                                onClick={() => handleDownload(file)}
                                                className="download-link"
                                            >
                                                {item.fileName ? `${item.fileName[idx].substring(0, 15)}...` : `File ${idx + 1}`}
                                            </Button>
                                        ))
                                    ) : (
                                        <small>No files to download.</small>
                                    )}
                                </div>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>
                            <small>No recent updates found.</small>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default RecentActivities;




