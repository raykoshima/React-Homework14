/* eslint-disable react/prop-types */
import TodoItem from "./TodoItem";

function TodoContainer(props) {
  const { todos, hdlDelete, hdlEdit, hdlComplete } = props;

  return (
    <div className="flex flex-wrap p-4 bg-gray-200 shadow-md">
      {todos.map((el) => (
        <TodoItem key={el.id} job={el} hdlDelete={hdlDelete} hdlEdit={hdlEdit} hdlComplete={hdlComplete} />
      ))}
    </div>
  );
}

export default TodoContainer;
