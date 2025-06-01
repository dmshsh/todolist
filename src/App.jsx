import './App.css';
import React, { useState, useEffect } from 'react';
import NewTask from './components/newtask';
import ShowTask from './components/showtask';

function App() {

  const [trash, setTrash] = useState([]);
  const [done, setDone] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);
   const handleToggleCompleted = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks); 
   const toggledTask = tasks.find((task) => task.id === id);
  if (toggledTask && !toggledTask.completed) {
    setDone((prevTasks) => [...prevTasks, { ...toggledTask, completed: true }]);
  } else {
    setDone((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }
};

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTrash = (id) => {
  const taskToRemove = tasks.find((task) => task.id === id);
  if (taskToRemove) {
    setTasks(tasks.filter((task) => task.id !== id));
    setTrash((prevTrash) => [...prevTrash, taskToRemove]);
    setDone((prevDone) => prevDone.filter((task) => task.id !== id)); 
  }
};
const handlePermanentDelete = (id) => {
  setTrash((prevTrash) => prevTrash.filter((task) => task.id !== id));
};

  return (
    <>
      <div className="p-20">
        <div className="flex justify-around">
          <div>
            <h1 className="title">Simple To do list</h1>
            <h2 className="text-xl m-10">
              Today is awesome day. The weather is awesome, you are awesome too!
            </h2>
          </div>
          <div>
            <NewTask onAddTask={addTask} />
          </div>
        </div>
      </div>
  
      <div className="p-25">
        <ShowTask onPermanentDelete={handlePermanentDelete} tasks={tasks} done={done} onToggleCompleted={handleToggleCompleted} onTrash={handleTrash} trash={trash} />
      </div>
    </>
  );
}

export default App;
