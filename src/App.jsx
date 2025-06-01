import './App.css'
import React,{useState,useEffect} from 'react'
import NewTask from './components/newtask'
import ShowTask from './components/showtask'

function App() {

  const [tasks,setTasks]=useState([])
  useEffect(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    setTasks(JSON.parse(storedTasks));
  }
}, []);

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

    const addTask=(text)=>{
    const newTask={
      id:Date.now(),
      text:text,
      completed:false,
    };
    setTasks((prevTasks)=>[...prevTasks,newTask])
  }
  return (
    <>
    <div className='p-20'>
    <div className='flex justify-around'>
        <div>
          <h1 class="title ">Simple To do list</h1>
          <h2 className='text-xl m-10'>Today is awesome day.The weather is awesome, you are awesome too!</h2>
        </div>
        <div>
          <NewTask onAddTask={addTask}/>
        </div>
    </div>
    </div>
    <div className='p-25'>
    <ShowTask/>
    </div>
    </>
  )
}

export default App
