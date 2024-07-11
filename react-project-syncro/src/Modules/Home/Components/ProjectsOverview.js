import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
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
    const data = {
        labels: ['Done', 'In Progress', 'To Do', 'In Review', 'On Hold'],
        datasets: [
            {
                data: [32, 20, 12, 16, 20],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',   // Done - Blue
                    'rgba(75, 192, 192, 0.6)',   // In Progress - Green
                    'rgba(255, 206, 86, 0.6)',   // To Do - Yellow
                    'rgba(255, 99, 132, 0.6)',   // In Review - Red
                    'rgba(201, 203, 207, 0.6)'   // On Hold - Grey
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',   // Done - Blue
                    'rgba(75, 192, 192, 1)',   // In Progress - Green
                    'rgba(255, 206, 86, 1)',   // To Do - Yellow
                    'rgba(255, 99, 132, 1)',   // In Review - Red
                    'rgba(201, 203, 207, 1)'   // On Hold - Grey
                ],
                borderWidth: 1,
            },
        ],
    };

    // Define options to adjust the size of the pie chart
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

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
}

export default ProjectsOverviewPie;
