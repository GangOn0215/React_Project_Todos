import React, { useState } from "react";

const TodosHeader = () => {
  const [state, setState] = useState({
    author: "",
    todos: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
  };
  return (
    <div className="todos-header">
      <input
        id="author"
        name="author"
        value={state.author}
        onChange={handleChangeState}
        placeholder="author"
      />
      <input
        name="todos"
        value={state.todos}
        onChange={handleChangeState}
        placeholder="todos"
      />
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default TodosHeader;
