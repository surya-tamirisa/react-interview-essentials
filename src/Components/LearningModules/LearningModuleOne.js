import React, { useState, useEffect } from 'react';

const LearningModuleOne = () => {
  console.log('Render: Function body');

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Effect for count changes
  useEffect(() => {
    console.log('Effect: Count dependency - setting up');
    
    return () => {
      console.log('Effect: Count dependency - cleanup');
    };
  }, [count]);

  // Effect for text changes
  useEffect(() => {
    console.log('Effect: Text dependency - setting up');
    
    return () => {
      console.log('Effect: Text dependency - cleanup');
    };
  }, [text]);

  const handleIncrement = () => {
    console.log('Event: Increment button clicked');
    setCount(prev => prev + 1);
  };

  const handleTextChange = (e) => {
    console.log('Event: Text input changed');
    setText(e.target.value);
  };

  return (
    <div>
      {console.log('Render: Inside return')}
      <button onClick={handleIncrement}>Increment Count</button>
      <input onChange={handleTextChange} value={text} placeholder="Type something..." />
      <p>Count: {count}</p>
      <p>Text: {text}</p>
    </div>
  );
};

export default LearningModuleOne;

/**
 * Solution:
 * 
 * Initial render:
 * Render: Function body
 * Render: Inside return
 * Effect: Count dependency - setting up
 * Effect: Text dependency - setting up
 * 
 * On Button Click:
 * Event: Increment button clicked
 * Render: Function body
 * Render: Inside return
 * Effect: Count dependency - cleanup
 * Effect: Count dependency - setting up
 * 
 * On Input Chnage:
 * Event: Text input changed
 * Render: Function body
 * Render: Inside return
 * Effect: Text dependency - cleanup
 * Effect: Text dependency - setting up
 * 
 */
