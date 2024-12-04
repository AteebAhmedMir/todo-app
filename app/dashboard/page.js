'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/tasks/${userId}`);
        setTasks(response.data.tasks);
      } catch (error) {
        alert('Error fetching tasks.');
      }
    };

    fetchTasks();
  }, [userId]);

  const handleAddTask = async () => {
    if (taskName.trim() === '') {
      alert('Task name is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/tasks', {
        userId,
        taskName,
      });
      setTasks([...tasks, response.data.task]);
      setTaskName('');
    } catch (error) {
      alert('Error adding task.');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">Dashboard</h1>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter new task"
          className="border border-gray-300 rounded-lg px-4 py-2 w-4/5 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Task
        </button>
      </div>
      <ul className="list-none p-0">
        {tasks.map((task, index) => (
          <li key={index} className="mb-4 flex justify-between items-center p-4 bg-white shadow rounded-lg">
            <span className="text-gray-800">{task}</span>
            <div>
              <button
                onClick={() => handleEditTask(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}