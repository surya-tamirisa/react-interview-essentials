/*
Question: Create a React component that implements a countdown timer with a visual progress bar.

Requirements:
1. The component should:
   - Allow users to input a duration in seconds.
   - Start the countdown timer when the user clicks the "Start Timer" button.
   - Display the remaining time during the countdown.

2. The progress bar should:
   - Visually represent the percentage of time elapsed.
   - Update dynamically as the timer counts down.
   - Change the color of each segment based on the elapsed time.

3. Provide controls to:
   - Reset the timer and progress bar to their initial state.
   - Automatically stop the countdown and reset when it reaches 0.

4. Display a message ("Countdown Done!!!!!") when the countdown completes.
*/

import { useEffect, useRef, useState } from "react";

const ProgressBar = ({time, initVal}) => {
    let barArr = [];
    for(let i=0; i<100; i++) barArr[i] = i;
    return (<div style={{display:'flex', width:'200px', height:'10px', border:'1px solid black'}}>
        {barArr.map(bar => 
            {   const bcVal = (initVal - time) / initVal * 100;
                const bc = bcVal > bar ? 'yellow' : 'white';
                return (<div style={{
                    width:'2px',
                    height: '10px',
                    backgroundColor: bc
                }}>
                </div>)
            }
        )}
    </div>)
}

const EM21 = () => {
    const timerRef = useRef(null);
    const [inputVal, setInputVal] = useState();
    const [time, setTime] = useState();

    useEffect(() => {
        if(time === 0)
            resetHandler();
    }, [time]);

    const startHandler = () => {
        setTime(inputVal);
        timerRef.current = setInterval(()=> setTime((p) => Number(p-1)), 1000);
    }

    const resetHandler = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTime(null);
        setInputVal(0);
    }


    return (
        <div>
            <label>Enter time in seconds:</label>
            <input type='number' value={inputVal} onChange={(e) => setInputVal(e.target.value)}></input>
            <button onClick={() => startHandler()}>Start Timer</button>
            <button onClick={() => resetHandler()}>Reset Timer</button>
            <h3>Time Left: {time}</h3>
            <ProgressBar time={Number(time)} initVal={Number(inputVal)}></ProgressBar>
            {time === 0 && <div>Countdown Done!!!!!</div>}
        </div>
    )
}

export default EM21;