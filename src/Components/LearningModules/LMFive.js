import React, { useMemo, useState } from 'react';

const ExpensiveCalculation = (num) => {
  console.log('Running expensive calculation...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
};

const LMFive = () => {
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);

  const doubleCount = count * 2;

  const calculatedValue = useMemo(()=> ExpensiveCalculation(count), [count]);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const incrementCount = () => setCount((prev) => prev + 1);

  return (
    <div>
      <h1>Expensive Calculation: {calculatedValue}</h1>
      <h2>Double Count: {doubleCount}</h2>
      <button onClick={incrementCount}>Increment Count</button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
    </div>
  );
};

export default LMFive;
