/* eslint-disable react/prop-types */
import { useState } from "react";

function TodoItem(props) {
  const { job, hdlDelete, hdlEdit, hdlComplete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(job.todo);
  const [isButtonClicked, setIsButtonClicked] = useState(job.completed);

  const handleDelete = () => {
    hdlDelete(job.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(job.todo);
  };

  const handleSaveEdit = () => {
    hdlEdit(job.id, editedText , job.completed);
    setIsEditing(false);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
    hdlComplete(job.id,job.todo, !job.completed)
  };
  

  return (
    <div className="container flex justify-between mx-auto text-center my-4 p-4 bg-gray-100 rounded-md shadow-md">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="text-lg w-full p-2 border rounded-l-lg"
          />
          <div className="flex space-x-1">
            <button
              onClick={handleSaveEdit}
              className="bg-green-500 text-white py-2 px-4 rounded-r-lg hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            className={`text-lg text-left w-full py-2 px-4 border rounded-l-lg truncate focus:outline-none  ${isButtonClicked ? 'text-green-600  border-lime-800 focus:border-lime-500' : 'text-red-700 border-orange-300 focus:border-orange-500'}`}
            onClick={handleButtonClick}
          >
            {console.log(`${job.todo} complate is ${job.completed}`)}
           {job.todo}
          </button>
          <div className="flex space-x-1">
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white py-2 px-4 rounded-r-lg hover:bg-yellow-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
