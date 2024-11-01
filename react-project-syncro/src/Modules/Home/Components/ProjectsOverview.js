/*
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { UserContext } from "../../../contexts/UserContext"; // Import user context

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ProjectsOverviewPie({ email }) {
    const { user } = useContext(UserContext); // Get user context
    const [statusData, setStatusData] = useState({});

    // Use email from context if prop is undefined
    const userEmail = user.useremail;

    useEffect(() => {
      if (!userEmail) {
        console.warn("Email is missing for fetching project data");
        return;
      }

      const fetchStatusData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/user-projects/status/${userEmail}`);
          setStatusData(response.data.statusCount || {}); // Default to empty object if no data
        } catch (error) {
          console.error('Error fetching status data:', error);
        }
      };
      fetchStatusData();
    }, [userEmail]);

    // Check if statusData has content before generating chart data
    const labels = Object.keys(statusData);
    const dataValues = Object.values(statusData);

    const data = {
      labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };

    console.log("Chart data:", data); // Debug

    if (labels.length === 0) {
      return <p>No project data available to display.</p>;
    }

    return <Pie data={data} />;
}

export default ProjectsOverviewPie;
*/


import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { UserContext } from "../../../contexts/UserContext"; // Import user context
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const ProjectsOverviewPie = () => {
    const { user } = useContext(UserContext); // Get user context
    const [statusData, setStatusData] = useState({});
    const userEmail = user?.useremail;

    useEffect(() => {
        if (!userEmail) {
            console.warn("Email is missing for fetching project data");
            return;
        }

        const fetchStatusData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/user-projects/status/${userEmail}`);
                setStatusData(response.data.statusCount || {});
            } catch (error) {
                console.error('Error fetching status data:', error);
            }
        };

        fetchStatusData();
    }, [userEmail]);

    const labels = Object.keys(statusData);
    const dataValues = Object.values(statusData);

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',   // Blue
                    'rgba(75, 192, 192, 0.6)',   // Green
                    'rgba(255, 206, 86, 0.6)',   // Yellow
                    'rgba(255, 99, 132, 0.6)',   // Red
                    'rgba(201, 203, 207, 0.6)'   // Grey
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',     // Blue
                    'rgba(75, 192, 192, 1)',     // Green
                    'rgba(255, 206, 86, 1)',     // Yellow
                    'rgba(255, 99, 132, 1)',     // Red
                    'rgba(201, 203, 207, 1)'     // Grey
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    if (labels.length === 0) {
        return <p>No project data available to display.</p>;
    }

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Projects Overview</Card.Title>
                <div style={{ width: '300px', height: '300px', margin: '0 auto' }}>
                    <Pie data={data} options={options} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProjectsOverviewPie;
