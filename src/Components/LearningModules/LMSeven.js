import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';

const ListItem = React.memo(({ item }) => {
  console.log('Rendering ListItem:', item);
  return <li>{item}</li>;
});

const LMSeven = () => {

  let timerIdRef = useRef(null);
  const debounce = (callback, delay) => {
    console.log('debounce received');
    if(timerIdRef.current) clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(callback, delay);
  }


  const [searchTerm, setSearchTerm] = useState('');
  const [filterWord, setFilterWord] = useState('');
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange', 'Mango']);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
    debounce(() => setFilterWord(value), 500);
  };

  const addItem = useCallback(() => {
    setItems([...items, `Item ${items.length + 1}`]);
  }, [items]);

  useEffect(() => {
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(filterWord.toLowerCase())));
  }, [filterWord, items]);


  return (
    <div>
      <h1>Filtered List</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search items..."
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {filteredItems.map((item) => (
          <ListItem key={item} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default LMSeven;
