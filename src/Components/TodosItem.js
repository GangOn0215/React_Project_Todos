import React from "react";

const TodosItem = ({ author, todos, create_date, id }) => {
  console.log(author, todos, create_date, id);

  return (
    <div className="todos-item">
      <span> Content: {todos} </span> <br />
      <span className="create-at">
        Create_at: {new Date(create_date).toLocaleDateString()}
      </span>
    </div>
  );
};

export default TodosItem;
