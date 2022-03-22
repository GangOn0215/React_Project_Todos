const TodosItem = ({ author, content, create_date, id }) => {
  return (
    <div className="todos-item">
      <span> Content: {content} </span> <br />
      <span className="create-at">
        Create_at: {new Date(create_date).toLocaleDateString()}
      </span>
    </div>
  );
};

export default TodosItem;
