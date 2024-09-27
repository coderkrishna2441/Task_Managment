import React from 'react'
import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export const Delete = () => {

    const [tasks,setTask] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks()
    },[]);

    const fetchTasks = async() => {
        try
        {
            const response = await fetch("http://127.0.0.1:8000/show/"); 
            const data = await response.json();
            setTask(data);
        }
        
        catch(error)
        {
            console.log(error)
        }
    }

    const deleteTask = async(pk) => {
      try
      {
          const response = await fetch(`http://127.0.0.1:8000/delete/${pk}/`,
          {
            method: "DELETE"
          });

          if (response.ok) { // Check for successful deletion from the server
            setTask((prevTasks) =>
              prevTasks.filter((task) => task.id !== pk) // Filter locally for efficiency
            );
          } else {
            console.error(`Error deleting task with primary key ${pk}`);
          }
      }
      
      catch(error)
      {
          console.log(error)
      }
    }

    const homeTask = () => {
      navigate('/home');
  };
  

  return(
    <div class="home" align="center">
     <h1> Delete Task</h1>
     <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Actions</th>
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
                <button onClick={() => deleteTask(task.id)}>Delete</button>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={homeTask}>Go back Home</button>
    </div>
)}

export  default Delete