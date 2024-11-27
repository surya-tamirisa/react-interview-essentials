import { useState, useRef, createContext, useContext } from "react";

const EM20 = () => {

    const [time, setTime] = useState(0);
    const [stack, setStack] = useState([]);
    const [currentState, setCurrentState] = useState(0); // 0-stopped , 1-running, 2- paused
    const timerRef = useRef(null);

    const handleStart = () => {
        timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000)
        let newActivity =  `Timer started running at ${time} seconds`;
        let newStack = [...stack, newActivity];
        setStack(newStack);
        setCurrentState(1);
    }

    const handlePause = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        let newActivity =  `Timer Paused at ${time} seconds`;
        let newStack = [...stack, newActivity];
        setStack(newStack);
        setCurrentState(2);
    }

    const handleReset = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        let newActivity =  `Timer was Reset at ${time} seconds`;
        let newStack = [...stack, newActivity];
        setStack(newStack);
        setTime(0);
        setCurrentState(0);
    }

    const TimerContext = createContext(null);

    const StackEntry = ({i}) => {
        const {stack} = useContext(TimerContext);
        return(<div>
            {stack[i]}
        </div>);
    }

    return (<TimerContext.Provider value={{stack}}>
        <h3>Timer Activity Tracker</h3>
        <h1>Current time is {time}</h1>
        <button onClick={() =>handleStart()} disabled={currentState===1} >Start Timer</button>
        <button onClick={() =>handlePause()} disabled={currentState===0 || currentState ===2}>Pause Timer</button>
        <button onClick={() =>handleReset()} disabled={currentState===0 || currentState ===2}>Reset Timer</button>
        {stack.map((_, index) => <StackEntry key={index} i={index}/>)}
    </TimerContext.Provider>);
}

export default EM20;