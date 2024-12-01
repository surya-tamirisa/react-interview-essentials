import { useEffect, useRef, useState } from "react";


const TimerModule = ({timerObj}) => {
    const [time, setTime] = useState(timerObj.timer);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const [prog, setProg] = useState(0);

    useEffect(() => {
        if(time === 0){
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsRunning(false);
        }
            
    }, [time]);

    const startHandler = () =>{
        timerRef.current = setInterval(() => {
            setTime(p => p-1);
        }, 1000);
        setIsRunning(true);
    }
    const stopHandler = () =>{
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
    }
    const resethandler = () => {
        setTime(timerObj.timer)
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
    }

    return (
        <div style={{margin: '10px', border: '1px solid black'}}>
            <h5>Remaining Time: {time}</h5>
            <progress value={(time / timerObj.timer) * 100} max="100"></progress>
            <button disabled={isRunning} onClick={startHandler}>Start</button>
            <button disabled={!isRunning} onClick={stopHandler}>Pause</button>
            <button onClick={resethandler}>Reset</button>

        </div>
    );
}

const EM23 = () => {
    let [timerModules, setTimerModules] = useState([]);
    const [text1, setText1] = useState();
    const [text2, setText2] = useState();

    const handlerAddTimer = () => {
        let newTMArr = [...timerModules, {
            id: Date.now(),
            name: text1,
            timer: text2
        }];
        setTimerModules(newTMArr);
        setText1('');
        setText2(0);
    }
    return (
        <div>
            <input value={text1} onChange={(e) => setText1(e.target.value)}></input>
            <input value={text2} type='number' onChange={(e) => setText2(e.target.value)}></input>
            <button onClick={handlerAddTimer}>Add New Timer</button>
            <br></br>
            <h3>Timers:</h3>
            {timerModules.map(timerObj => <TimerModule key={timerObj.id} timerObj={timerObj}></TimerModule>)}
        </div>
    );
}

export default EM23;