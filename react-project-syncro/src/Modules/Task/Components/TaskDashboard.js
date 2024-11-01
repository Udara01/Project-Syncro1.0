import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Toast, ProgressBar } from 'react-bootstrap';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false); // For modal
  const [currentTask, setCurrentTask] = useState(null); // Selected task
  const [showToast, setShowToast] = useState(false); // For notification

 
  const handleClose = () => setShow(false);
  const handleShow = (task) => {
    setCurrentTask(task);
    setShow(true);
  };

  return (
    <div className="container">
      <h2 className="my-4">Task Management Dashboard</h2>

      {/* Status Filter Buttons */}
      <div className="btn-group mb-3">
        <Button variant="secondary">Pending</Button>
        <Button variant="warning">In Progress</Button>
        <Button variant="success">Completed</Button>
      </div>

      {/* Task Cards */}
      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-4" key={task._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">
                  <span className={`badge bg-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'secondary'}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </span>
                </p>
                <ProgressBar now={task.progress} label={`${task.progress}%`} className="mb-3"/>
                <Button variant="primary" onClick={() => handleShow(task)}>View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Task Detail Modal */}
      {currentTask && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{currentTask.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{currentTask.description}</p>
            <p><strong>Due Date:</strong> {new Date(currentTask.dueDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {currentTask.status}</p>
            <p><strong>Progress:</strong> <ProgressBar now={currentTask.progress} label={`${currentTask.progress}%`} /></p>
            <h5>Comments</h5>
            <ul>
              {currentTask.comments.map((comment, idx) => (
                <li key={idx}>{comment}</li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Toast Notification */}
      <Toast show={showToast} onClose={() => setShowToast(false)} style={{ position: 'absolute', top: 10, right: 10 }}>
        <Toast.Header>
          <strong className="me-auto">Task Notification</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>A task has been updated!</Toast.Body>
      </Toast>
    </div>
  );
}

export default TaskDashboard;
