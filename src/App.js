import "./App.css";
import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
} from "react";
import axios from "axios";
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";
// import LifeCycle from "./Study/LifeCycle";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const url = "https://jsonplaceholder.typicode.com/comments";
  const getData = async () => {
    const getFakeJsonData = await axios(url).then((res) => res.data);

    const processedData = getFakeJsonData.slice(0, 19).map((item) => {
      return {
        author: item.email,
        todos: item.body,
        importance: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(processedData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, todos, importance) => {
    const create_date = new Date().getTime();
    const newData = {
      author,
      todos,
      importance,
      create_date,
      check: false,
      id: dataId.current,
    };

    dataId.current += 1;

    setData([newData, ...data]);
  };

  const onRemove = (id) => {
    const newTodoLists = data.filter((item) => item.id !== id);

    setData(newTodoLists);

    console.log("success delete");
  };

  const onEdit = (targetId, newTodo) => {
    const newTodoLists = data.map((item) =>
      item.id === targetId ? { ...item, todos: newTodo } : item
    );

    setData(newTodoLists);
  };

  const onCheck = (targetId) => {
    const newTodoLists = data.map((item) =>
      item.id === targetId ? { ...item, check: !item.check } : item
    );

    setData(newTodoLists);
  };

  // useMemo
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((item) => item.importance >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]); // data.length 데이터가 변경될때 실행이 됩니다

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="todos-container">
      {/* <LifeCycle /> */}
      <TodosHeader onCreate={onCreate} />
      <div>All Diary Length: {data.length}</div>
      <div>good: {goodCount}</div>
      <div>bad: {badCount}</div>
      <div>good ratio: {goodRatio.toFixed(1)}% </div>
      <TodosList
        onCheck={onCheck}
        onEdit={onEdit}
        onRemove={onRemove}
        todosList={data}
      />
    </div>
  );
}

export default App;
