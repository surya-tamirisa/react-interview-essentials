import React, { useState, useEffect, useRef } from 'react';

const LearningModuleThree = () => {
  console.log('Render: RefEffectComponent function body');

  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Effect to start and stop the interval based on `isRunning`
  useEffect(() => {
    console.log('Effect: we are inside effect');
    if (isRunning) {
      console.log('Effect: Starting interval');
      intervalRef.current = setInterval(() => {
        console.log('Effect: Interval tick');
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        console.log('Effect: Clearing interval');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

//   useEffect(() => {
//     console.log('test1');
//     return () => { console.log('test2')} 
//   })

  const toggleRunning = () => {
    console.log('Event: Toggle running button clicked');
    setIsRunning((prev) => !prev);
  };

  const resetCount = () => {
    console.log('Event: Reset button clicked');
    setCount(0);
  };

  return (
    <div>
      {console.log('Render: Inside return')}
      <button onClick={toggleRunning}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetCount}>Reset</button>
      <p>Count: {count}</p>
    </div>
  );
};

export default LearningModuleThree;
