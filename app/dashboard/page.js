'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      setTasks([...tasks, taskName]);
      setTaskName('');
    }
  };

  const handleEditTask = (index) => {
    const newTaskName = prompt('Edit task:', tasks[index]);
    if (newTaskName) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = newTaskName;
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
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