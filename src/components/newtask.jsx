import { use, useState } from "react";

export default function NewTask({onAddTask}) {
  const [showNewTask, setShowNewTask] = useState(false);
  const [inputValue, setInputValue] = useState("");
const handleAddClick = () => {
  if (inputValue.trim() === "") return; 
  onAddTask(inputValue);              
  setInputValue("");                   
};

  return (
    <div className="flex flex-row m-20  items-center ">
      <button
        onClick={() => setShowNewTask(!showNewTask)}
        className="hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 text-5xl w-15 h-12 m-10 text-white bg-black rounded-2xl hover:bg-zinc-700 "

      >
        +
      </button>

      {showNewTask && (
        <div className="bg-gray-100 w-50 rounded-xl p-4 mt-2 shadow-2xl">
          <fieldset className="fieldset">
            <legend className="font-my-font fieldset-legend mb-2">Add new To Do</legend>
            <textarea
              className="textarea h-24 w-40 rounded-xl border-none mb-2"
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
              placeholder="Your text"
            ></textarea>
            <button onClick={handleAddClick} className="font-my-font hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 rounded-xl text-white w-20 h-7 bg-black hover:bg-zinc-700">
              Add
            </button>
          </fieldset>
        </div>
      )}
    </div>
  );
}
