/*import React, { useState, useEffect } from 'react';
import { Card, ProgressBar, ListGroup, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProjectProgress() {
  const { projectId } = useParams(); // Assuming projectId is in the route params
  const [progressData, setProgressData] = useState({
    completedTasks: 30,
    remainingTasks: 20,
  });
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/milestones`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };
    
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/progress`);
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchMilestones();
    fetchProgressData();
  }, [projectId]);

  const progressPercentage = 
    (progressData.completedTasks / (progressData.completedTasks + progressData.remainingTasks)) * 100;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Project Progress Report", 10, 10);

    doc.text(`Project Completion: ${progressPercentage.toFixed(2)}%`, 10, 20);
    doc.text(`Completed Tasks: ${progressData.completedTasks}`, 10, 30);
    doc.text(`Remaining Tasks: ${progressData.remainingTasks}`, 10, 40);

    doc.text("Milestones:", 10, 50);
    milestones.forEach((milestone, index) => {
      doc.text(
        `${index + 1}. ${milestone.name} - ${milestone.status} (${milestone.progress}%)`,
        10, 60 + (index * 10)
      );
    });

    doc.save("project_progress_report.pdf");
  };

  const downloadExcel = () => {
    const progressSheet = [
      { Field: "Project Completion", Value: `${progressPercentage.toFixed(2)}%` },
      { Field: "Completed Tasks", Value: progressData.completedTasks },
      { Field: "Remaining Tasks", Value: progressData.remainingTasks },
    ];
    const milestoneSheet = milestones.map((milestone, index) => ({
      No: index + 1,
      Name: milestone.name,
      Status: milestone.status,
      Progress: `${milestone.progress}%`,
    }));

    const workbook = XLSX.utils.book_new();
    const progressWorksheet = XLSX.utils.json_to_sheet(progressSheet);
    const milestoneWorksheet = XLSX.utils.json_to_sheet(milestoneSheet);

    XLSX.utils.book_append_sheet(workbook, progressWorksheet, "Project Progress");
    XLSX.utils.book_append_sheet(workbook, milestoneWorksheet, "Milestones");

    XLSX.writeFile(workbook, "project_progress.xlsx");
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Project Progress</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Project Completion</Card.Title>
          <div className="d-flex align-items-center">
            <ProgressBar 
              now={progressPercentage} 
              label={`${progressPercentage.toFixed(2)}%`} 
              className="flex-fill"
            />
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Task Progress</Card.Title>
          <Pie 
            data={{
              labels: ['Completed Tasks', 'Remaining Tasks'],
              datasets: [{
                data: [progressData.completedTasks, progressData.remainingTasks],
                backgroundColor: ['#4caf50', '#f44336'],
              }]
            }}
          />
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Milestones</Card.Title>
          <ListGroup variant="flush">
            {milestones.map((milestone, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{milestone.name}</strong> - {milestone.status}
                  </div>
                  <div>{milestone.description}</div>
                </div>
                <div>
                  Start Date: {new Date(milestone.startDate).toLocaleDateString()} - 
                  End Date: {new Date(milestone.endDate).toLocaleDateString()}
                </div>
                <ProgressBar now={milestone.progress} label={`${milestone.progress}%`} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={generatePDF}>Download PDF</Button>
        <Button variant="success" onClick={downloadExcel}>Download Excel</Button>
      </div>
    </div>
  );
}

export default ProjectProgress;*/


import React, { useState, useEffect } from 'react';
import { Card, ProgressBar, ListGroup, Button } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProjectProgress() {
  const { projectId } = useParams();
  const [progressData, setProgressData] = useState({  });
  const [taskProgress, setTaskProgress] = useState({
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    totalTasks: 0
  });
  const [milestones, setMilestones] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0); // Track overall progress


  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/milestones`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };
    
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/progress`);
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
        
        if (response.data.overallProgress !== undefined) {
          setOverallProgress(response.data.overallProgress); // Set overall progress
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };


    const fetchTaskProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/project/${projectId}/tasks/progress`);
        setTaskProgress(response.data);

        // Calculate overall progress as a percentage
        //const { completedTasks, totalTasks } = response.data;
        //setOverallProgress(totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0);
      } catch (error) {
        console.error('Error fetching task progress data:', error);
      }
    };



    fetchMilestones();
    fetchProgressData();
    fetchTaskProgress();
    fetchData();
  }, [projectId]);


  

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Project Progress Report", 10, 10);
  
    doc.text(`Total Tasks: ${taskProgress.totalTasks}`, 10, 30);
    doc.text(`Completed Tasks: ${taskProgress.completedTasks}`, 10, 40);
    doc.text(`In Progress Tasks: ${taskProgress.inProgressTasks}`, 10, 50);
    doc.text(`Pending Tasks: ${taskProgress.pendingTasks}`, 10, 60);
  
    doc.text("Milestones:", 10, 80);
    milestones.forEach((milestone, index) => {
      doc.text(
        `${index + 1}. ${milestone.name} - ${milestone.status} (${milestone.progress}%)`,
        10, 90 + (index * 10)
      );
    });
  
    doc.save("project_progress_report.pdf");
  };
  
  const downloadExcel = () => {
    const taskSheet = [
      { Field: "Total Tasks", Value: taskProgress.totalTasks },
      { Field: "Completed Tasks", Value: taskProgress.completedTasks },
      { Field: "In Progress Tasks", Value: taskProgress.inProgressTasks },
      { Field: "Pending Tasks", Value: taskProgress.pendingTasks }
    ];
    const milestoneSheet = milestones.map((milestone, index) => ({
      No: index + 1,
      Name: milestone.name,
      Status: milestone.status,
      Progress: `${milestone.progress}%`
    }));
  
    const workbook = XLSX.utils.book_new();
    const taskWorksheet = XLSX.utils.json_to_sheet(taskSheet);
    const milestoneWorksheet = XLSX.utils.json_to_sheet(milestoneSheet);
  
    XLSX.utils.book_append_sheet(workbook, taskWorksheet, "Task Progress");
    XLSX.utils.book_append_sheet(workbook, milestoneWorksheet, "Milestones");
  
    XLSX.writeFile(workbook, "project_progress.xlsx");
  };

  


  return (
    <div className="container my-4">
      <h2 className="mb-4">Project Progress</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Project Completion</Card.Title>
          <ProgressBar now={overallProgress} label={`${overallProgress}%`} />
        </Card.Body>
      </Card>

<Card className="mb-4">
  <Card.Body>
    <Card.Title>Task Progress</Card.Title>
    <div className="d-flex align-items-center">
      <div style={{ flex: 1, maxWidth: '40%' }}>
        <Pie 
          data={{
            labels: ['Completed Tasks', 'In Progress Tasks', 'Pending Tasks'],
            datasets: [{
              data: [
                taskProgress.completedTasks,
                taskProgress.inProgressTasks,
                taskProgress.pendingTasks
              ],
              backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="ml-4">
        <p>Total Tasks: {taskProgress.totalTasks}</p>
        <p>Completed: {taskProgress.completedTasks}</p>
        <p>In Progress: {taskProgress.inProgressTasks}</p>
        <p>Pending: {taskProgress.pendingTasks}</p>
      </div>
    </div>
  </Card.Body>
</Card>

<Card className="mb-4">
  <Card.Body>
    <Card.Title>Milestones</Card.Title>
    <ListGroup variant="flush">
      {milestones.map((milestone, index) => (
        <ListGroup.Item key={index} className="p-3" style={{ backgroundColor: 'lightblue', borderRadius: '8px', marginBottom: '10px' }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0" style={{ fontWeight: 'bold', color: '#007bff' }}>{milestone.name}</h5>
            <span className={`badge ${milestone.status === 'Completed' ? 'badge-success' : milestone.status === 'In Progress' ? 'badge-warning' : 'badge-secondary'}`}>
              {milestone.status}
            </span>
          </div>
          
          <p className="mb-2 text-muted">{milestone.description}</p>
          
          <div className="d-flex justify-content-between text-muted mb-2">
            <small>Start Date: {new Date(milestone.startDate).toLocaleDateString()}</small>
            <small>End Date: {new Date(milestone.endDate).toLocaleDateString()}</small>
          </div>

          <ProgressBar now={milestone.progress} label={`${milestone.progress}%`} variant={milestone.progress === 100 ? 'success' : milestone.progress >= 50 ? 'info' : 'danger'} style={{ height: '10px' }} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Card.Body>
</Card>


      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={generatePDF}>Download PDF</Button>
        <Button variant="success" onClick={downloadExcel}>Download Excel</Button>
      </div>
    </div>
  );
}

export default ProjectProgress;
