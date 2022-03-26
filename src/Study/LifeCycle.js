import React, {useEffect, useState} from "react";

const UnMountTest = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log('Mount');

    return() => {
      console.log('UnMount');
    }
  }, []);

  useEffect(() => {
    console.log(`is update count: ${count}`);
  }, [count]);

  useEffect(() => {
    console.log(`is update text: ${text}`);
  }, [text]);

  return (
    <div>
      <div> 
        {count}
        <button onClick={() => { setCount(count + 1);}}>+</button>
      </div>
      <div>
        <textarea 
          value={text}
          onChange={(e) => {setText(e.target.value)}}/>
      </div>
  </div>
  )
}
const LifeCycle = () => {
  const [isToggle, setIsToggle] = useState(false);
  const handleToggle = () => {
    setIsToggle(!isToggle);
  }

  useEffect(() => {
    console.log('Mount');
  }, []);

  useEffect(() => {
    console.log('Update');
  });

  return (
    <div>
      <button onClick={handleToggle}>Toggle</button>
      {
      isToggle && <UnMountTest/>
    } </div>
  )
}

export default LifeCycle;
