import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Show = () => {
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
  }, []);

  const homeTask = () => {
    navigate('/home');
};

  return (
    <div className="home" align="center">
      <h1>Show Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={homeTask}>Go back Home</button>
    </div>
  );
};

export default Show;