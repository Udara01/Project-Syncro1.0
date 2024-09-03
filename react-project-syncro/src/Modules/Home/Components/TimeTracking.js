import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { UserContext } from "../../../contexts/UserContext";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TimeTracking = () => {
    const [chartData, setChartData] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = user?.userId;
                const response = await axios.get(`http://localhost:4000/api/time-tracking/${userId}`);
                const data = response.data;
                console.log('Time Tracking Data:', data);

                const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const previousWeekData = [0, 0, 0, 0, 0, 0, 0];
                const thisWeekData = [0, 0, 0, 0, 0, 0, 0];

                const now = new Date();
                const currentDayOfWeek = now.getDay();

                const startOfThisWeek = new Date(now);
                startOfThisWeek.setDate(now.getDate() - currentDayOfWeek);

                const startOfPreviousWeek = new Date(startOfThisWeek);
                startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

                data.forEach(entry => {
                    const entryDate = new Date(entry.date);
                    const day = entryDate.getDay();
                    const timeSpentInHours = entry.timeSpent / 60; // Convert minutes to hours

                    if (entryDate >= startOfPreviousWeek && entryDate < startOfThisWeek) {
                        previousWeekData[day] += timeSpentInHours;
                    } else if (entryDate >= startOfThisWeek && entryDate <= now) {
                        thisWeekData[day] += timeSpentInHours;
                    }
                });

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Previous week (hours)',
                            data: previousWeekData,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                        {
                            label: 'This week (hours)',
                            data: thisWeekData,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching time tracking data', error);
            }
        };

        console.log('User:', user);
        if (user) {
            fetchData();
        }
    }, [user]);

    if (!chartData) {
        return <p>Loading...</p>;
    }

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Time Tracking (Hours)</Card.Title>
                <Bar data={chartData} />
            </Card.Body>
        </Card>
    );
}

export default TimeTracking;
