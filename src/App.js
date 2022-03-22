import "./App.css";
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";

function App() {
  const dummyList = [
    {
      id: 1,
      author: "Arannay",
      content: "study react",
      create_date: new Date().getTime(),
    },
    {
      id: 2,
      author: "Buan",
      content: "study node",
      create_date: new Date().getTime(),
    },
    {
      id: 3,
      author: "Mace",
      content: "study mvc pattern",
      create_date: new Date().getTime(),
    },
  ];
  return (
    <div className="todos-container">
      <TodosHeader />
      <TodosList todosList={dummyList} />
    </div>
  );
}

export default App;
