/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import FormAddTodo from "./FormAddTodo";
import TodoContainer from "./TodoContainer";
import Loading from "../pages/Loading";

function TodoApp() {
  //const apiUrl = 'https://easy-erin-clownfish-yoke.cyclic.app/todos';
  //const apiUrl = 'http://localhost:3000/todos';
  const apiUrl = 'https://json-todo-server.onrender.com/todos'

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortStyle,setSortStyle] = useState('asc');
  const [trigger, setTrigger] = useState(false);
  
  

useEffect(() => {
    setIsLoading(true);
    
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [trigger]);

  const hdlAdd = (newJob) => {
    axios.post(apiUrl, newJob)
      .then(response => {
        console.log(response.data);
        setTrigger(prev => !prev);
      })
      .catch(error => {
        console.error("Error adding new todo:", error);
      });
  }

  const hdlDelete = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`);
      console.log(response.data);
  
      // Assuming setTrigger is a state update function
      setTrigger(prev => !prev);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

  const hdlEdit = (id, updatedText , completeStatus) => {
    axios.put(`${apiUrl}/${id}`, { todo: updatedText , completed : completeStatus })
      .then(response => {
        console.log(response.data);
        setTrigger(prev => !prev);
      })
      .catch(error => {
        console.error("Error editing todo:", error);
      });
  }

  const hdlComplete = (id , todotext , completeStatusChange) =>{
    axios.put(`${apiUrl}/${id}`, { todo: todotext , completed : completeStatusChange })
      .then(response => {
        console.log(response.data);
        setTrigger(prev => !prev);
      })
      .catch(error => {
        console.error("Error editing todo:", error);
      });
  }

  // const handleSort = (newSortOrder) => {
  //   console.log(`Now order type is ${newSortOrder}`)
    
  // }
  useEffect(()=>{
    const sortedData = [...data].sort((a, b) => {
      if (sortStyle === 'asc') {
          return a.todo.localeCompare(b.todo);
      } else {
          return b.todo.localeCompare(a.todo);
      }
  });

  setData(sortedData);

  },[sortStyle])

  const handleSort = (newSortOrder) =>{
    setSortStyle(newSortOrder)
  }

  
  //track todo complete
  const datacomplate = data.filter(todo => todo.completed)
  const dataincomplate = data.filter(todo => !todo.completed)

  const dataComplateCount = datacomplate.length
  const dataIncomplateCount = dataincomplate.length

  {if(isLoading){
    return (<div className='container mx-auto p-3'>
    <Dashboard taskall={'loading..'} taskcom={'loading..'} taskincom={'loading..'}/>
    Loading...
  </div>)
  }}

  return (
    <div className='container mx-auto p-3'>
      <Dashboard taskall={data.length} taskcom={dataComplateCount} taskincom={dataIncomplateCount} onSort={handleSort} />
      <FormAddTodo hdlAdd={hdlAdd} />
      <TodoContainer todos={data} hdlDelete={hdlDelete} hdlEdit={hdlEdit} hdlComplete={hdlComplete} />
      <label>if the app can fetch data you will see this text</label>
    </div>
  );
}

export default TodoApp;
