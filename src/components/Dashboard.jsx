import React, { useState } from 'react';

function Dashboard(props) {
  const { taskall,taskcom,taskincom } = props;
  const [sortOrder, setSortOrder] = useState('asc'); // เพิ่ม state สำหรับตัวเรียงลำดับ

  const handleSort = () => {
    // change sort type
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    // export sort type to props
    props.onSort(newSortOrder);
  };

  return (
    <div className='flex justify-between p-4 text-white bg-sky-400'>
      <a href="."><h2 className="text-2xl font-bold mb-2">{new Date().toDateString()}</h2></a>
      <div className="flex items-center space-x-2">
        <p className="text-lg">You have {taskall} Task(s)</p><p className='text-ls rounded-md border-2 px-2 border-green-600 bg-green-600'> {taskcom} complate </p><p className='text-ls rounded-md border-2 px-2 border-red-600 bg-red-600'>{taskincom} incomplate</p>
        <button
          onClick={handleSort}
          className="bg-white text-blue-500 py-1 px-2 rounded-md hover:bg-blue-200"
        >
          Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
