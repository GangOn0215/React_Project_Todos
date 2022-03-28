import React, {useContext} from "react";
import TodosItem from "./TodosItem";
import {TodosStateContext} from "../App";

const TodosList = () => {
  const todosLists = useContext(TodosStateContext);
  
  console.log();

  return (
    <div className="todos-lists">
      {todosLists.map((item) => {
        return (
          <TodosItem key={item.id} {...item}
          />
        );
      })}
    </div>
  );
};

TodosList.defaultProps = {
  todosList: [],
};

export default TodosList;
