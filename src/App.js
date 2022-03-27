import "./App.css";
import React, { useRef, useEffect, useMemo, useCallback, useReducer } from "react";

import axios from "axios";
import TodosHeader from "./Components/TodosHeader";
import TodosList from "./Components/TodosList";
// import LifeCycle from "./Study/LifeCycle";
// import Optimize from "./Study/Optimize";
// import OptimizeObj from "./Study/OptimizeObj";

// 첫번째 매개변수는 state, 두번째 매개변수는 action을 넣어줍니다.
const reducer = (state, action) => {
  switch(action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      const create_date = new Date().getTime();
      
      const newItem = {
        ...action.data,
        create_date,
      }

      return [newItem, ...state];
    case "UPDATE":
      // targetID, newTodo
      /*
       * 1. targetID 와 state.id 를 비교하여 수정할 값을 찾는다.
       * 2. Array.prototype.map() 을 사용하여 만약 값이 같다면 수정할 부분만 고쳐주고 return 을 해줍니다
       * 3. 만약 서로 다른 아이디 이라면 원래의 값으로 돌려줍니다.
       * 4. 삼항 연산자를 써봅니다.
       * 5. 데이터가 바뀌지 않는 비지니스 로직 문제가 발생하였습니다. --> state.map((item) => action.targetID === item.id ? {...item, todos: action.newTodo} : item);
       * 6. 해결: dispatch({type: "UPDATE", data: {targetID, newTodo}}) 이렇게 데이터를 넘겨서 action.targetID 라고 하면 undefined가 뜨게 됩니다.
       *    그래서 action.data. 을 집어넣어서 데이터를 나오게 했습니다.
       */
      return state.map((item) => action.data.targetID === item.id ? {...item, todos: action.data.newTodo} : item);
    case "CHECK":
      return state.map((item) => action.targetID === item.id ? {...item, check: !item.check} : item);
    case "REMOVE":
      /**
       * 
       * 1. filter을 사용하여 targetID 와 state.id 를 비교하여 삭제할 값을 찾는다.
       * 2. if를 걸어서 만약 targetID 와 state.id 와 같지 않은 데이터만 return 을 하여 걸러준다 ( 삭제 한다. )
       * 
       */
      console.log(state.filter((item) => {return action.targetID !== item.id }));
      return state.filter((item) => { return action.targetID !== item.id } );
    default:
      // 잘못 매핑이 되었거나 그럴경우 state를 그대로 넘겨줘서 데이터가 변하지 않게 만들어 줍니다.
      return state;
  }    
}

function App() {
 /* 
  * useReducer 을 사용하기 위한 과정 
  * 1. import useReducer
  * 2. remove import useState
  * 3. useState 코드들을 지우고 useReducer 선언
  * 4. 기본 reducer 함수 생성 (App Component 밖에서) - switch 를 적어둔고 default 넣어둡니다.
  * 5. switch case 를 정하기 위해 App Component를 보며 필요한 action.type이 무엇이 있을지 생각해봅니다.
  * 6. [ INIT, CREATE, UPDATE, DELETE, CHECK ]
  * 7. 
  */

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const url = "https://jsonplaceholder.typicode.com/comments";
  
  const getData = async () => {
    const getFakeJsonData = await axios(url).then((res) => res.data);

    const initData = getFakeJsonData.slice(0, 20).map((item) => {
      return {
        author: item.email,
        todos: item.body,
        importance: Math.floor(Math.random() * 5) + 1,
        // todo check 를 관리, 랜덤으로 돌려서 0, 1로 맞추고 1이면 true 0이면 false를 사용하게 만들었습니다.
        check: Math.floor(Math.random() * 2) ? true : false,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    dispatch({type: "INIT", data: initData});
  };

  useEffect(() => {
    getData();

    return () => {};
  }, []);

  const onCreate = useCallback((author, todos, importance) => {
    dispatch({type: "CREATE", data: {author, todos, importance, id:dataId.current}})

    dataId.current++;
  }, []);

  
  const onEdit = useCallback((targetID, newTodo) => {
    // data: {targetID, newTodo} === data: { targetID: targetID, newTodo: newTodo }
    dispatch({type: "UPDATE", data: {targetID, newTodo}});
  }, []);

  const onCheck = useCallback((targetID) => {
    dispatch({type: "CHECK", targetID});
  }, []);

  const onRemove = useCallback((targetID) => {
    dispatch({type: "REMOVE", targetID});
  }, []);
  

  // useMemo
  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작");

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
      {/* <Optimize /> */}
      {/* <OptimizeObj /> */}
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
