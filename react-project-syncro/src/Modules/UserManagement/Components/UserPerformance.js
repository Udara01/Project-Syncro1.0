import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, LogarithmicScale, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

import { useParams } from 'react-router-dom';

Chart.register(LogarithmicScale, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const UserPerformance = () => {
  const { userId } = useParams();
  const [hoursTracked, setHoursTracked] = useState(0);
  const [activityData, setActivityData] = useState({
    labels: ['Tasks Completed', 'Projects Joined', 'Comments Added', 'Milestones Achieved'],
    datasets: [
      {
        label: 'Activity Overview',
        data: [0, 0, 0, 0],
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'],
      },
    ],
  });

  useEffect(() => {
    const fetchUserPerformance = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user-performance/${userId}`);
        const { tasksCompleted, projectsJoined, hoursTracked, commentsAdded, milestonesAchieved } = response.data;

        setActivityData({
          labels: ['Tasks Completed', 'Projects Joined', 'Comments Added', 'Milestones Achieved'],
          datasets: [
            {
              label: 'Activity Overview',
              data: [tasksCompleted, projectsJoined, commentsAdded, milestonesAchieved],
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'],
            },
          ],
        });

        const hours = Math.floor(hoursTracked / 60);
        const minutes = Math.round((hoursTracked / 60 - hours) * 60);
        const formattedTime = `${hours} hours, ${minutes} minutes`;
        setHoursTracked(formattedTime);
      } catch (error) {
        console.error('Error fetching user performance data:', error);
      }
    };

    fetchUserPerformance();
  }, [userId]);

  return (
    <div>
      <Container className="my-5">
        <Row className="mt-4">
          <Col md={12}>
            <Card>
              <Card.Body>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <Card>
                          <Card.Body>
                            <h3>Activity Overview</h3>
                            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                              <Doughnut
                                data={activityData}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  plugins: {
                                    legend: {
                                      position: 'top',
                                    },
                                    tooltip: {
                                      callbacks: {
                                        label: function (tooltipItem) {
                                          return `${tooltipItem.label}: ${tooltipItem.raw}`;
                                        },
                                      },
                                    },
                                  },
                                }}
                                height={500}
                                width={500}
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      </td>
                      <td>
                        <Card>
                          <Card.Body>
                            <h4>Total Hours Tracked</h4>
                            <p>{hoursTracked}</p>
                          </Card.Body>
                        </Card>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserPerformance;







/*import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import { Chart, LogarithmicScale, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
Chart.register(LogarithmicScale, CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const UserPerformance = () => {

  const { user, setUser } = useContext(UserContext);

  const userId = user.userId;

  const [activityData, setActivityData] = useState({
    labels: ['Tasks Completed', 'Projects Joined', 'Hours Tracked', 'Comments Added', 'Milestones Achieved'],
    datasets: [
      {
        label: 'Activity Overview',
        data: [0, 0, 0, 0, 0], // Initialize with zero data
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8'],
      },
    ],
  });

  useEffect(() => {
    const fetchUserPerformance = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user-performance/${userId}`);
        const { tasksCompleted, projectsJoined, hoursTracked, commentsAdded, milestonesAchieved } = response.data;

        setActivityData({
          labels: ['Tasks Completed', 'Projects Joined', 'Comments Added', 'Milestones Achieved'],
          datasets: [
            {
              label: 'Activity Overview',
              data: [tasksCompleted, projectsJoined, commentsAdded, milestonesAchieved],
              backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching user performance data:', error);
      }
    };

    fetchUserPerformance();
  }, [userId]);

  return (

    <div>
    <Container className="my-5">
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <h3>Activity Overview</h3>
              <Bar 
  data={activityData} 
  options={{
    scales: {
      y: {
        type: 'logarithmic',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Activity Count'
        }
      }
    }
  }} 
/>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

<div>
<Container className="my-5">
  <Row className="mt-4">
    <Col md={12}>
      <Card>
        <Card.Body>
          <h3>Activity Overview</h3>
          <Bar data={activityData} />
        </Card.Body>
      </Card>
    </Col>
  </Row>
  <Row className="mt-4">
    <Col md={12}>
      <Card>
        <Card.Body>
          <h4>Total Hours Tracked: {activityData.datasets[0].data[2]}</h4>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

</div>
    </div>

  );
};

export default UserPerformance;
*/