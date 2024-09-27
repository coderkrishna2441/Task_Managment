import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

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
    
    const AddTasks= () => {
        navigate('/add');
    };

    const DeleteTasks= () => {  
        if (tasks.length === 0) {
            alert("No tasks available. Please add a task first.");
            navigate('/add');
        }
        else{
        navigate('/delete');
        }
    };

    const ShowTasks= () => {
        if (tasks.length === 0) {
            alert("No tasks available. Please add a task first.");
            navigate('/add');
        }
        else{
        navigate('/show');
        }
    };

    const UpdateStatus= () => {
        if (tasks.length === 0) {
            alert("No tasks available. Please add a task first.");
            navigate('/add');
        }
        else{
        navigate('/update');
        }
    };

  return(
    <div class="home" align="center">
        <h1>Welcome To Home</h1>
        <button onClick={AddTasks}>Want to add tasks</button>
        <button onClick={DeleteTasks}>Want to delete tasks</button>
        <button onClick={ShowTasks}>Display Task</button>
        <button onClick={UpdateStatus}>Update Status of the Task</button>
    </div>
  )
}

export  default Home