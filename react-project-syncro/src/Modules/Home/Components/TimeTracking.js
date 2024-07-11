import React from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TimeTracking = () => {
    const data = {
        labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Previous week',
                data: [15, 12, 9, 13, 10, 11, 12],
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            },
            {
                label: 'This week',
                data: [10, 9, 6, 14, 11, 10, 13],
                backgroundColor: 'rgba(153, 102, 255, 0.6)'
            }
        ]
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Time Tracking</Card.Title>
                <Bar data={data} />
            </Card.Body>
        </Card>
    );
}

export default TimeTracking;
