import { useState } from "react";
import "../App.css";

export default function ShowTask({moveBackToDo, onPermanentDelete, done, onToggleCompleted, tasks, onTrash, trash }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeTab, setActiveTab] = useState("todo"); 
  const [openTrashMenu, setTrashMenu]=useState(null)

  const toggleTrashM=(id)=>{
    setTrashMenu(openTrashMenu===id?null:id)
  }
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const toggleTrash = () => {
    setTrashSeen(!seeTrash);
  };

  const renderHeader = () => (
    <>
      <div className="m-10 flex justify-between h-10 w-100">
  <button
    className={`font-my-font hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 w-30 h-auto rounded-3xl ${activeTab === "todo" ? "bg-gray-300 text-stone-900" : "bg-zinc-100"}`}
    onClick={() => setActiveTab("todo")}
  >
    To do
  </button>

  <button
    className={`font-my-font hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 w-30 h-auto rounded-3xl ${activeTab === "done" ? "bg-gray-300 text-stone-900" : "bg-zinc-100"}`}
    onClick={() => setActiveTab("done")}
  >
    Done
  </button>

  <button
    className={`font-my-font hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 w-30 h-auto rounded-3xl ${activeTab === "trash" ? "bg-gray-300 text-stone-900" : "bg-zinc-100"}`}
    onClick={() => setActiveTab("trash")}
  >
    Trash
  </button>
</div>
     
    </>
  );

if (activeTab === "trash") {
  return (
    <div>
      {renderHeader()}
      <p className="font-my-font text-5xl">Trash</p>
      <div className='h-0.5 opacity-30 w-auto bg-black my-10'></div>
      {trash.length === 0 ? (
        <p className="font-my-font text-gray-400">🗑 Trash is empty</p>
      ) : (
        trash.map((task) => (
          
          <div key={task.id} className="p-2 mb-2" >
            
          <button onClick={() => toggleTrashM(task.id)} className="text-xl px-2">
          ⋮
        </button>
        🗑 {task.text}
        {openTrashMenu===task.id&&(
          <div className="shadow-2xl flex flex-col my-8 w-55 items-start bg-gray-200 rounded-3xl">
            <button className="font-my-font hover:-translate-y-1 hover:scale-110 hover:bg-zinc-500 border flex gap-3 p-2 items-center m-3 w-50 rounded-3xl" onClick={() => onPermanentDelete(task.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5a1 1 0 0 1-1 .5H7a1 1 0 0 1-1-.5L5 9zm5 2v7h2v-7H10zm4 0v7h2v-7h-2z"/>
</svg>Delete forever</button>
            <button className="font-my-font hover:-translate-y-1 hover:scale-110 hover:bg-zinc-500 border flex gap-3 p-2 items-center m-3 w-50 rounded-3xl" onClick={()=>moveBackToDo(task.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
</svg>
             Move back to ToDo</button>
          </div>
        )}
            
            
          </div>
        ))
      )}
    </div>
  );
}

if (activeTab === "done") {
  return (
    <div>
      {renderHeader()}
      <p className="font-my-font text-5xl">Done</p>
      <div className='h-0.5 opacity-30 w-auto bg-black my-10'></div>
      {done.length === 0 ? (
        <p className="font-my-font text-gray-400">Nothing done</p>
      ) : (
        done.map((task) => (
          <div key={task.id} className="p-2 bg-gray-100 mb-2 rounded-lg">
             {task.text}
          </div>
        ))
      )}
    </div>
  );
}
if (tasks.length === 0) {
  return (
    <div>
      {renderHeader()}
      <p className="font-my-font text-5xl">To do</p>
    <div className='h-0.5 opacity-30 w-auto bg-black my-10'></div>
      <p className="font-my-font text-gray-400">No tasks</p>
    </div>
  );
}

return (
  <div>
    {renderHeader()}
    <p className="font-my-font text-5xl">To do</p>
    <div className='h-0.5 opacity-30 w-auto bg-black my-10'></div>
    {tasks.map((task) => (
      <div key={task.id} className="flex items-center gap-5 bg-gray-200 p-2 rounded-lg">
        <button onClick={() => toggleMenu(task.id)} className="text-xl px-2">
          ⋮
        </button>

        {openMenuId === task.id && (
          <div className="top-8 left-0 mt-1 bg-white border rounded-xl shadow-lg w-40 z-10">
            <button
              onClick={() => {
                onTrash(task.id);
                setOpenMenuId(null);
              }}
              className="font-my-font shadow-2xl w-full text-center py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl"
            >
              🗑 Move to Trash
            </button>
          </div>
        )}

        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={task.completed} onChange={()=>onToggleCompleted(task.id)} className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
        </label>
        <span className={task.completed ? "line-through text-gray-400" : ""}>
        {task.text}
    </span>
      </div>
    ))}
  </div>
);

}
