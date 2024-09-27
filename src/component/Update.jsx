import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Update = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/show/');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  });

  const homeTask = () => {
    navigate('/home');
};

const updateTaskStatus = async (pk, newStatus) => {
  if (newStatus === false) { // Check if newStatus is true (corrected)
    try {
      const response = await fetch(`http://127.0.0.1:8000/end/${pk}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Status: true }), // Specify the field and value to update
      });

      if (response.ok) {
        const updatedTaskData = await response.json(); // Parse the updated task data

        // Update the local task state (if applicable)
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === pk ? updatedTaskData : task))
        ); // Update task with matching ID
      } else {
        console.error(`Error updating task status with primary key ${pk}`);
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  } else {
    alert(`Task status is already true.`);
  }
}

  return (
    <div className="home" align="center">
      <h1>Update Task Status</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.Author}</td>
              <td>{task.Title}</td>
              <td>{task.Content}</td>
              <td>
                {task.Status ? (
                  <span style={{ color: 'green' }}>Completed</span>
                ) : (
                  <span style={{ color: 'red' }}>Not Completed</span>
                )}
              </td>
              <td>
                <p>
                <button onClick={() => updateTaskStatus(task.id,task.Status)}>End the Task</button>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={homeTask}>Go back Home</button>
    </div>
  );
};

export default Update;