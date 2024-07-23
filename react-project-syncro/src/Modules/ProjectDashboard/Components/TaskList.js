import React from 'react';

const TaskList = () => {
  const tasks = [
    { name: "Document Uploaded", description: "User Interface Design for the Home Page", due: "08/July" },
    { name: "Document Uploaded", description: "User Interface Design for the Home Page", due: "08/July" },
    { name: "Document Uploaded", description: "User Interface Design for the Home Page", due: "08/July" },
    // Add more tasks as needed
  ];

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Task You Have to Complete</h5>
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <h6>{task.name}</h6>
            <p>{task.description}</p>
            <p>Due: {task.due}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
