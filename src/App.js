import "./App.css";
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";

function App() {
  return (
    <div className="todos-container">
      <TodosHeader />
      <TodosList />
    </div>
  );
}

export default App;
