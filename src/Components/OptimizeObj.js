import React, { useEffect, useState } from "react";

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log("Rerender :: CountView Component");
  });

  return <div>{count}</div>;
});

const CountObjView = ({ countObj }) => {
  useEffect(() => {
    console.log("Rerender :: CounterObjView Component");
  });

  return <div>{countObj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.countObj.count === nextProps.countObj.count;
};

const MemoizedCounter = React.memo(CountObjView, areEqual);

const OptimizeObj = () => {
  const [count, setCount] = useState(1);
  const [countObj, setCountObj] = useState({
    count: 1,
  });

  return (
    <div>
      <CountView count={count} />
      <button onClick={() => setCount(count)}>add Count</button>
      <MemoizedCounter countObj={countObj} />
      <button onClick={() => setCountObj({ count: countObj.count })}>
        add CountObj
      </button>
    </div>
  );
};

export default OptimizeObj;
