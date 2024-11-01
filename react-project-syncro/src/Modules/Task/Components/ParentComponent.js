import React, { useState } from 'react';
import TaskAssignModal from './TaskAssignModal'; // Import your modal component

function ParentComponent() {
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [tasks, setTasks] = useState([]); // Store assigned tasks

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // Function to handle task assignment
  const handleTaskAssignment = (newTask) => {
    setTasks([...tasks, newTask]); // Add the new task to the tasks list
    console.log('Task Assigned:', newTask); // For debugging
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={toggleModal}>Assign New Task</button>
      
      {/* Render the TaskAssignModal component and pass the required props */}
      <TaskAssignModal
        show={modalVisible}
        handleClose={toggleModal}
        assignTask={handleTaskAssignment}
      />

      {/* Display the list of tasks */}
      <h3>Assigned Tasks:</h3>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>    </li>
        ))}
      </ul>
    </div>
  );
}

export default ParentComponent;
