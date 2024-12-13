import React, { useState, useEffect } from 'react';

const LearningModuleTwo = () => {
  console.log('Render: CounterComponent function body');

  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Effect for count changes
  useEffect(() => {
    console.log('Effect: Count dependency - setting up');

    return () => {
      console.log('Effect: Count dependency - cleanup');
    };
  }, [count]);

  // Effect for showMessage changes
  useEffect(() => {
    console.log('Effect: showMessage dependency - setting up');

    return () => {
      console.log('Effect: showMessage dependency - cleanup');
    };
  }, [showMessage]);

  const handleIncrement = () => {
    console.log('Event: Increment button clicked');
    setCount(prev => prev + 1);
  };

  const toggleMessage = () => {
    console.log('Event: Toggle message button clicked');
    setShowMessage(prev => !prev);
  };

  return (
    <div>
      {console.log('Render: Inside return')}
      <button onClick={handleIncrement}>Increment Count</button>
      <button onClick={toggleMessage}>Toggle Message</button>
      <p>Count: {count}</p>
      {showMessage && <p>This is a toggleable message!</p>}
    </div>
  );
};

export default LearningModuleTwo;

/**
 * Solution:
 * 
 * Initial render:
 * Render: CounterComponent function body
 * Render: Inside return
 * Effect: Count dependency - setting up
 * Effect: showMessage dependency - setting up
 * 
 * On Increment button:
 * Event: Increment button clicked
 * Render: CounterComponent function body
 * Render: Inside return
 * Effect: Count dependency - cleanup
 * Effect: Count dependency - setting up
 * 
 * On Toggle button:
 * Event: Toggle message button clicked
 * Render: CounterComponent function body
 * Render: Inside return
 * Effect: showMessage dependency - cleanup
 * Effect: showMessage dependency - setting up
 */
