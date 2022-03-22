import TodosItem from "./TodosItem";

const TodosList = ({ todosList }) => {
  console.log(todosList);
  return (
    <div className="todos-lists">
      {todosList.map((item) => {
        return <TodosItem key={item.id} {...item} />;
      })}
    </div>
  );
};

export default TodosList;
