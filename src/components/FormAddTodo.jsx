/* eslint-disable react/prop-types */
import { useState } from "react";

function FormAddTodo(props) {
  const { hdlAdd } = props;
  const [input, setInput] = useState('');

  const hdlSubmit = (e) => {
    if(input === ''){
    // do notthing
    }else{
    e.preventDefault();
    let newJob = { todo: input, completed: false, user: 1 };
    hdlAdd(newJob);
    // Reset the input after adding a new todo
    setInput('');
    }
  };

  const hdlClear = (e) => {
    e.preventDefault();
    // Clear the input
    setInput('');
  };

  return (
    <form onSubmit={hdlSubmit} className="flex p-3 bg-gray-200 rounded-md shadow-md">

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="what do you want to do?"
        className="w-full p-3 border rounded-l-lg text-lg" 
        required/>
      <div className="flex space-x-1">
        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-r-lg hover:bg-green-700"
        >
          Add
        </button>
        <button
          type="button"
          onClick={hdlClear}
          className="bg-red-500 text-white p-3 rounded-md hover:bg-red-700"
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default FormAddTodo;
