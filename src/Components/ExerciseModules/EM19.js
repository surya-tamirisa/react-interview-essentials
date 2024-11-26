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
