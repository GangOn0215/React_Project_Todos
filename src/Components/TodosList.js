import React from "react";
import TodosItem from "./TodosItem";

const TodosList = ({ onCheck, onEdit, onRemove, todosList }) => {
  return (
    <div className="todos-lists">
      {todosList.map((item) => {
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
