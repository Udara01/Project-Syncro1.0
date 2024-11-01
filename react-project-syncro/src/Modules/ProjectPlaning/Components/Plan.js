/*import React, { useState } from 'react';
import { Form, Button, Card, ListGroup, ProgressBar, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SprintPlanning = () => {
  const [sprints, setSprints] = useState([]);
  const [newSprintName, setNewSprintName] = useState('');
  const [sprintStart, setSprintStart] = useState('');
  const [sprintEnd, setSprintEnd] = useState('');
  const [newTask, setNewTask] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [currentSprint, setCurrentSprint] = useState(null); // Tracks which sprint the task is being added to
  const [show, setShow] = useState(false);
  const { projectId } = useParams();

  // Add a new sprint
  const handleAddSprint = () => {
    if (newSprintName && sprintStart && sprintEnd) {
      if (new Date(sprintStart) >= new Date(sprintEnd)) {
        alert("Sprint start date must be before end date.");
        return;
      }
      setSprints([...sprints, { name: newSprintName, start: sprintStart, end: sprintEnd, tasks: [] }]);
      setNewSprintName('');
      setSprintStart('');
      setSprintEnd('');
    }
  };

  // Open modal and track which sprint is being updated
  const handleOpenModal = (sprintName) => {
    setCurrentSprint(sprintName);
    setShow(true);
  };

  // Add task to the current sprint
  const handleAddTask = () => {
    const updatedSprints = sprints.map(sprint => {
      if (sprint.name === currentSprint) {
        return { ...sprint, tasks: [...sprint.tasks, { task: newTask, assignedTo, completed: false }] };
      }
      return sprint;
    });
    setSprints(updatedSprints);
    setShow(false);
    setNewTask('');
    setAssignedTo('');
  };

  // Toggle task completion status
  const toggleTaskCompletion = (sprintName, taskIdx) => {
    const updatedSprints = sprints.map(sprint => {
      if (sprint.name === sprintName) {
        const updatedTasks = sprint.tasks.map((task, idx) => 
          idx === taskIdx ? { ...task, completed: !task.completed } : task
        );
        return { ...sprint, tasks: updatedTasks };
      }
      return sprint;
    });
    setSprints(updatedSprints);
  };

  return (
    <div className="container mt-5">
      <h2>Sprint Planning</h2>

      {/* Sprint Creation *//*}
      <div className="mb-4">
        <h4>Create New Sprint</h4>
        <Form>
          <Form.Group controlId="newSprintName">
            <Form.Label>Sprint Name</Form.Label>
            <Form.Control
              type="text"
              value={newSprintName}
              onChange={(e) => setNewSprintName(e.target.value)}
              placeholder="Enter Sprint Name"
            />
          </Form.Group>
          <Form.Group controlId="sprintStart">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={sprintStart}
              onChange={(e) => setSprintStart(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="sprintEnd">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={sprintEnd}
              onChange={(e) => setSprintEnd(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddSprint}>Add Sprint</Button>
        </Form>
      </div>

      {/* Sprint Overview *//*}
      <div className="row">
        {sprints.map((sprint, idx) => (
          <Card key={idx} className="col-md-6 mb-3">
            <Card.Body>
              <Card.Title>{sprint.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">From {sprint.start} to {sprint.end}</Card.Subtitle>

              {/* Tasks in Sprint *//*}
              <ListGroup className="mb-3">
                {sprint.tasks.length > 0 ? (
                  sprint.tasks.map((task, taskIdx) => (
                    <ListGroup.Item key={taskIdx}>
                      {task.task} (Assigned to: {task.assignedTo})
                      <ProgressBar now={task.completed ? 100 : 0} label={`${task.completed ? 100 : 0}%`} />
                      <Button variant={task.completed ? "success" : "warning"} onClick={() => toggleTaskCompletion(sprint.name, taskIdx)}>
                        {task.completed ? "Completed" : "Mark as Complete"}
                      </Button>
                    </ListGroup.Item>
                  ))
                ) : (
                  <p>No tasks added to this sprint yet.</p>
                )}
              </ListGroup>
              <Button variant="success" onClick={() => handleOpenModal(sprint.name)}>Add Task to Sprint</Button>
              <Button variant="success" href={`/projects/${projectId}/gantt` }>Add Task to Sprint</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

 {/* Modal for Adding Task *//*}
 <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task to Sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="taskInput">
            <Form.Label>Task</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="assignedTo">
            <Form.Label>Assign to</Form.Label>
            <Form.Control
              type="text"
              placeholder="Assign task to"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={() => handleAddTask(sprints[0].name)}>Add Task</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SprintPlanning;*/


import React, { useState, useEffect } from 'react';
import { Form, Button, Card, ListGroup, ProgressBar } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SprintPlanning = () => {
  const [sprints, setSprints] = useState([]);
  const [newSprintName, setNewSprintName] = useState('');
  const [sprintStart, setSprintStart] = useState('');
  const [sprintEnd, setSprintEnd] = useState('');
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Fetch sprints when the component mounts
  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/projects/${projectId}/sprints`);
        setSprints(response.data);
      } catch (error) {
        console.error('Error fetching sprints:', error);
      }
    };
    fetchSprints();
  }, [projectId]);

  // Add a new sprint
  const handleAddSprint = async () => {
    if (newSprintName && sprintStart && sprintEnd) {
      if (new Date(sprintStart) >= new Date(sprintEnd)) {
        alert('Sprint start date must be before the end date.');
        return;
      }
      try {
        const response = await axios.post(`http://localhost:4000/api/projects/${projectId}/sprints`, {
          name: newSprintName,
          start: sprintStart,
          end: sprintEnd,
        });
        setSprints([...sprints, response.data]);
        setNewSprintName('');
        setSprintStart('');
        setSprintEnd('');
      } catch (error) {
        console.error('Error adding sprint:', error);
      }
    }
  };

  // Fetch tasks and calculate overall progress
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
      
      // Use overall progress in the frontend
      if (response.data.overallProgress !== undefined) {
        console.log(`Overall project progress: ${response.data.overallProgress}%`);
        document.getElementById('overall-progress').innerText = `Overall Progress: ${response.data.overallProgress}%`;
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  // Navigate to Gantt chart for a specific sprint
  const handleOpenGantt = (sprintId) => {
    navigate(`/projects/${projectId}/gantt`);
  };

  return (
    <div className="container mt-5">
      <h2>Sprint Planning</h2>

      {/* Display overall progress */}
      <div style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        <div id="overall-progress" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}></div>
      </div>

      {/* Sprint Creation */}
      <div className="mb-4">
        <h4>Create New Sprint</h4>
        <Form>
          <Form.Group controlId="newSprintName">
            <Form.Label>Sprint Name</Form.Label>
            <Form.Control
              type="text"
              value={newSprintName}
              onChange={(e) => setNewSprintName(e.target.value)}
              placeholder="Enter Sprint Name"
            />
          </Form.Group>
          <Form.Group controlId="sprintStart">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={sprintStart}
              onChange={(e) => setSprintStart(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="sprintEnd">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={sprintEnd}
              onChange={(e) => setSprintEnd(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddSprint}>
            Add Sprint
          </Button>
        </Form>
      </div>

      {/* Sprint Overview */}
      <div className="row">
        {sprints.length > 0 ? (
          sprints.map((sprint, idx) => (
            <Card key={idx} className="col-md-6 mb-3">
              <Card.Body>
                <Card.Title>{sprint.name} (ID: {sprint._id})</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  From {new Date(sprint.start).toLocaleDateString()} to {new Date(sprint.end).toLocaleDateString()}
                </Card.Subtitle>

                {/* Tasks in Sprint */}
                <ListGroup className="mb-3">
                  {sprint.tasks.length > 0 ? (
                    sprint.tasks.map((task, taskIdx) => (
                      <ListGroup.Item key={taskIdx}>
                        {task.task} (Assigned to: {task.assignedTo || 'Unassigned'})
                        <ProgressBar
                          now={task.completed ? 100 : task.progress * 100}
                          label={`${task.completed ? 100 : task.progress * 100}%`}
                        />
                      </ListGroup.Item>
                    ))
                  ) : (
                    <p>No tasks added to this sprint yet.</p>
                  )}
                </ListGroup>
                <Button variant="success" onClick={() => handleOpenGantt(sprint._id)}>
                  View Gantt Chart
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No sprints available. Create a new sprint to get started.</p>
        )}
      </div>
    </div>
  );
};

export default SprintPlanning;
