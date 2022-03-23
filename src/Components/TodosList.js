import React from "react";
import TodosItem from "./TodosItem";

const TodosList = ({ onCheck, onEdit, onRemove, todosList }) => {
  console.log(todosList);
  return (
    <div className="todos-lists">
      {todosList.map((item) => {
        console.log("break");
        return (
          <TodosItem
            key={item.id}
            {...item}
            onRemove={onRemove}
            onEdit={onEdit}
            onCheck={onCheck}
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
