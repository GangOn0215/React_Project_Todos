import React from "react";

const TodosItem = ({ onDelete, author, todos, create_date, id }) => {
  console.log(author, todos, create_date, id);

  return (
    <div className="todos-item">
      <div className="info">
        <span> Author: {author} </span> <br />
        <span className="create-at">
          Create_at: {new Date(create_date).toLocaleDateString()}
        </span>
      </div>
      <div className="content">{todos}</div>
      <button
        onClick={() => {
          if (window.confirm("real you want delete?")) {
            onDelete(id);
            // console.log(id);
          }
        }}
      >
        delete
      </button>
    </div>
  );
};

export default TodosItem;
