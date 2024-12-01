/*
Question: Create a React game where users select numbers under a time constraint.

Requirements:
1. The game should:
   - Start with a timer that counts down from a specified duration (e.g., 10 seconds).
   - Allow users to select numbers from a grid of numbers (1-9).
   - Track the selected numbers.

2. The game ends when:
   - The timer reaches 0.
   - Display a message indicating whether the user won or lost:
     - "You Won!!! Congrats" if all numbers are selected before the timer ends.
     - "Sorry, you Lost. Better luck next time!" otherwise.

3. Provide visual feedback:
   - Numbers already selected should have a different background color.

4. Use context to share the selected numbers between the main game component and the grid of numbers.
*/

import { createContext, useContext, useEffect, useRef, useState } from "react";

const GamePanel = () => {
  const { selection, setSelection } = useContext(GameContext);

  const handleClick = (number) => {
    if (!selection.includes(number)) {
      setSelection((prev) => [...prev, number]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px", margin: "30px" }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <div
          key={number}
          onClick={() => handleClick(number)}
          style={{
            display: "flex",
            border: "1px solid black",
            padding: "10px",
            margin: "2px",
            backgroundColor: selection.includes(number) ? "green" : "yellow",
          }}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

const GameContext = createContext();

const EM19 = () => {
  const timerRef = useRef(null);
  const [time, setTime] = useState(10);
  const [isGameOver, setGameOver] = useState(false);
  const [selection, setSelection] = useState([]);
  const [result, setResult] = useState(false);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timerRef.current);
      setGameOver(true);
      setResult(selection.length === 9);
    }
  }, [time, selection]);

  return (
    <GameContext.Provider value={{ selection, setSelection }}>
      <div>You have {time} seconds left</div>
      {!isGameOver && <GamePanel />}
      {isGameOver && <h3>{result ? "You Won!!! Congrats" : "Sorry, you Lost. Better luck next time!"}</h3>}
    </GameContext.Provider>
  );
};

export default EM19;
