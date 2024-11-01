/*import React, { useEffect, useRef, useContext } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';
import '../../../styles/Plan.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GanttChart = () => {
  const ganttContainer = useRef(null);
  const { projectId } = useParams();


  // Function to mark a task as complete
  const markTaskComplete = (taskId) => {
    const task = gantt.getTask(taskId);
    task.progress = 1.0;  // Set progress to 100%
    gantt.updateTask(taskId);  // Update the Gantt chart
  };

  useEffect(() => {
    // Gantt initialization and configuration
    gantt.config.columns = [
      { name: "text", label: "Task name", width: "*", tree: true },
      { name: "start_date", label: "Start Date", align: "center" },
      { name: "duration", label: "Duration", align: "center" },
      { name: "progress", label: "Progress", template: (obj) => {
          return Math.round(obj.progress * 100) + "%";  // Display as a percentage
        }, align: "center", width: 80 },
      {
        name: "complete", label: "Complete", width: 80, align: "center", template: (task) => {
          return `<button onclick="markComplete('${task.id}')">Complete</button>`;
        }
      },
      { name: "add", label: "", width: 44 }
    ];

    // Define a global function for the "Complete" button
    window.markComplete = (taskId) => {
      markTaskComplete(taskId);
    };
    gantt.config.xml_date = "%Y-%m-%d %H:%i";  // Use ISO-like date format

    gantt.config.scale_unit = "month";
    gantt.config.date_scale = "%F, %Y";
    gantt.config.subscales = [{ unit: "day", step: 1, date: "%j, %D" }];

    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      { name: "progress", type: "slider", map_to: "progress", max: 100, step: 1 },
      { name: "time", type: "duration", map_to: "auto" }
    ];

    // Highlight milestones
    gantt.templates.task_class = (start, end, task) => {
      return task.duration === 0 ? "gantt_milestone" : "";  // Milestones are tasks with zero duration
    };

    // Fetch tasks and initialize Gantt
    // Event listener: Task creation
    gantt.attachEvent("onAfterTaskAdd", async (id, task) => {
      try {
        const response = await axios.post('http://localhost:4000/api/tasks', {
          text: task.text,
          start_date: new Date(task.start_date).toISOString(),
          duration: task.duration,
          progress: task.progress || 0,
          parent: task.parent ?? 0,
          projectId: projectId
        });

        if (response.status === 201) {
          console.log('Task created successfully:', response.data);
          gantt.changeTaskId(id, response.data._id);
        } else {
          throw new Error('Failed to save task');
        }
      } catch (error) {
        console.error('Error creating task:', error);
        gantt.deleteTask(id);
      }
    });

    // Event listener: Task update
    gantt.attachEvent("onAfterTaskUpdate", async (id, task) => {
      try {
        const response = await axios.put(`http://localhost:4000/api/tasks/${id}`, task);
        if (response.status !== 200) {
          throw new Error('Failed to update task');
        }
        console.log('Task updated successfully:', response.data);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    });

    // Event listener: Task deletion
    gantt.attachEvent("onAfterTaskDelete", async (id) => {
      try {
        const response = await axios.delete(`http://localhost:4000/api/tasks/${id}`);
        if (response.status !== 200) {
          throw new Error('Failed to delete task');
        }
        console.log('Task deleted successfully');
      } catch (error) {
        console.error('Error deleting task:', error);
        gantt.undo();  // Restore task if deletion fails
      }
    });

  // Fetch tasks and initialize Gantt
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
      
      // Parse and transform task dates
      const tasks = response.data.data.map(task => {
        return {
          ...task,
          start_date: new Date(task.start_date).toISOString().split('T')[0]  // Convert to 'YYYY-MM-DD' format
        };
      });
  
      gantt.clearAll();
      gantt.parse({ data: tasks });  // Parse the tasks with the transformed dates
  
      // Use overall progress in the frontend
      if (response.data.overallProgress !== undefined) {
        console.log(`Overall project progress: ${response.data.overallProgress}%`);
        document.getElementById('overall-progress').innerText = `Overall Progress: ${response.data.overallProgress}%`;
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  gantt.init(ganttContainer.current);
  fetchData();

  return () => {
    gantt.clearAll();
    gantt.detachAllEvents();  // Ensure events are cleared on unmount
  };
}, [projectId]);



  return (
    <div className="container">
      <h3>Software Project Gantt Chart</h3>
      <div ref={ganttContainer} style={{ width: '100%', height: '500px' }}></div>
      <div id="overall-progress" style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        {/* Overall progress will be displayed here *//*}
      </div>
    </div>
  );
};

export default GanttChart;*/

import React, { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import gantt from 'dhtmlx-gantt';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ProgressBar, Button } from 'react-bootstrap';  // Import components from react-bootstrap
import '../../../styles/Plan.css';

const GanttChart = () => {
  const ganttContainer = useRef(null);
  const { projectId } = useParams();

  const markTaskComplete = (taskId) => {
    const task = gantt.getTask(taskId);
    task.progress = 1.0;
    gantt.updateTask(taskId);
  };

  useEffect(() => {
    gantt.config.columns = [
      { name: "text", label: "Task", width: "*", tree: true },
      { name: "start_date", label: "Start Date", align: "center" },
      { name: "duration", label: "Duration", align: "center" },
      { name: "progress", label: "Progress", template: (obj) => {
          return Math.round(obj.progress * 100) + "%";
        }, align: "center", width: 80 },
      {
        name: "complete", label: "Complete", width: 100, align: "center", template: (task) => {
          return `<button class="complete-btn" onclick="markComplete('${task.id}')">Complete</button>`;
        }
      },
      { name: "add", label: "", width: 44 }
    ];

    window.markComplete = (taskId) => markTaskComplete(taskId);

    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.scale_unit = "month";
    gantt.config.date_scale = "%F, %Y";
    gantt.config.subscales = [{ unit: "day", step: 1, date: "%j, %D" }];

    gantt.config.lightbox.sections = [
      { name: "description", height: 38, map_to: "text", type: "textarea", focus: true },
      { name: "progress", type: "slider", map_to: "progress", max: 100, step: 1 },
      { name: "time", type: "duration", map_to: "auto" }
    ];

    gantt.templates.task_class = (start, end, task) => {
      return task.duration === 0 ? "gantt_milestone" : "";
    };

    gantt.attachEvent("onAfterTaskAdd", async (id, task) => {
      try {
        const response = await axios.post('http://localhost:4000/api/tasks', {
          text: task.text,
          start_date: new Date(task.start_date).toISOString(),
          duration: task.duration,
          progress: task.progress || 0,
          parent: task.parent ?? 0,
          projectId: projectId
        });

        if (response.status === 201) {
          gantt.changeTaskId(id, response.data._id);
        } else {
          throw new Error('Failed to save task');
        }
      } catch (error) {
        gantt.deleteTask(id);
      }
    });

    gantt.attachEvent("onAfterTaskUpdate", async (id, task) => {
      try {
        await axios.put(`http://localhost:4000/api/tasks/${id}`, task);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    });

    gantt.attachEvent("onAfterTaskDelete", async (id) => {
      try {
        await axios.delete(`http://localhost:4000/api/tasks/${id}`);
      } catch (error) {
        gantt.undo();
      }
    });

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
        
        const tasks = response.data.data.map(task => {
          return {
            ...task,
            start_date: new Date(task.start_date).toISOString().split('T')[0]
          };
        });

        gantt.clearAll();
        gantt.parse({ data: tasks });

        if (response.data.overallProgress !== undefined) {
          document.getElementById('overall-progress-bar').style.width = `${response.data.overallProgress}%`;
          document.getElementById('overall-progress-text').innerText = `${response.data.overallProgress}%`;
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    gantt.init(ganttContainer.current);
    fetchData();

    return () => {
      gantt.clearAll();
      gantt.detachAllEvents();
    };
  }, [projectId]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Project Gantt Chart</h3>
      <div ref={ganttContainer} className="gantt-container" style={{ width: '100%', height: '500px' }}></div>
      <div className="overall-progress mt-3">
        <h5>Overall Project Progress</h5>
        <ProgressBar now={50} id="overall-progress-bar" className="mt-2" style={{ height: '1.5rem', backgroundColor: '#17a2b8' }}>
          <span id="overall-progress-text" className="progress-bar-text">50%</span>
        </ProgressBar>
      </div>
    </div>
  );
};

export default GanttChart;
