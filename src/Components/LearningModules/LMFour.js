import React, { useState } from 'react';

const ListItem = React.memo(({ item }) => {
  console.log('list rendered...')
  return <li>{item}</li>;
});

const LMFour = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);

  const increment = () => setCount((prev) => prev + 1);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment Count</button>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <ListItem key={item} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default LMFour;
