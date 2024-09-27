import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Add = () => {
  const [tasks, setTasks] = useState([]); // Array to store tasks (fetched for reference)

  useEffect(() => {
    const fetchTasks = async () => { // Fetch existing tasks for reference (optional)
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

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(false); // Default status is false
  const navigate = useNavigate();

  const homeTask = () => {
    navigate('/home');
};

const addTask = async () => {
  const taskData = {
    Author: author,
    Title: title,
    Content: content,
    Status: status, // Use the current state of status
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/add/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (response.ok) {
      // Handle successful task creation (e.g., clear form, display success message)
      console.log('Task created successfully:', data);

      navigate('/show');

      // Optionally, clear form fields after successful addition
      setAuthor('');
      setTitle('');
      setContent('');
      setStatus('');
    } else {
      // Handle error by displaying a pop-up or other notification
      const errorMessage = await response.text();
      alert(`Error adding task: ${errorMessage}`);
    }
  } catch (error) {
    console.error('Error adding task:', error);

    // Handle unexpected errors
    alert('Name of the user, Title of Task and content of task are required to add a task for a user');
  }
};

  return (
    <div className="home" align="center">
      <h1>Add Tasks</h1>
        Mark as Completed
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={status} // Set checkbox state based on status
          onChange={(e) => setStatus(e.target.checked)} // Update status on checkbox change
        />
        <input type="text" placeholder="Enter your Name..." onChange={(e) => setAuthor(e.target.value)} />
        <input type="text" placeholder="Enter Task Title..." onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Enter the task content..." onChange={(e) => setContent(e.target.value)} />
        <button onClick={addTask}>Add Task</button>
        <button onClick={homeTask}>Go back Home</button>
    </div>
  );
};

export default Add;