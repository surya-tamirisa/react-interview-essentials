import React, { useState, useCallback } from 'react';

const ButtonComponent = React.memo(({ onClick }) => {
  console.log('Rendering ButtonComponent');
  return <button onClick={onClick}>Increment Count</button>;
});

const LMSix = () => {
  const [count, setCount] = useState(0);

//   const incrementCount = () => setCount(count + 1);
  const incrementCount = useCallback(() => setCount(count + 1));

  console.log('Rendering ParentComponent');
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <ButtonComponent onClick={incrementCount} />
    </div>
  );
};

export default LMSix;
