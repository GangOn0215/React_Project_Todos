import React, { useState, useEffect } from "react";

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Rerender :: CountView : ${count}`);
  });

  return <div>{count}</div>;
});

const TextView = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`Rerender :: TextView : ${text}`);
  });

  return <div>{text}</div>;
});

const Optimize = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div>
      <CountView count={count} />
      <button onClick={() => setCount(count + 1)}>add count</button> <br />
      <TextView text={text} />
      <input value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default Optimize;
