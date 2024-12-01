/*
Question: Create a React component that allows switching between multiple child components dynamically.

Requirements:
1. The component should:
   - Display a navigation panel with options to select between different child components.
   - Render the selected child component dynamically.

2. Each child component should:
   - Perform its own unique functionality.
   - Be rendered only when selected from the navigation panel.

3. Provide the following functionality:
   - Component 1 should display a timer that increments every second and updates dynamically.
   - Component 2 should display static content.

4. Ensure proper cleanup of resources (e.g., intervals) when switching between components.
*/

import { useRef, useState, useEffect } from "react";

const Comp1 = ({curTime, setCurTime}) => {
    const timerRef = useRef(null);
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurTime(prev => prev+1)
        }, 1000)
        return () => {
            console.log('clearing out interval');
            clearInterval(timerRef.current);
            timerRef.current = null
        }
    }, [])
    return(
        <div>Current time is {curTime}</div>
    );
}

const Comp2 = () => {
    return(
        <div>Comp2</div>
    );
}

const listOfComp = {
    Comp1,
    Comp2
}

const EM16 = () => {
    const timerRef = useRef(null);
    const [curPage, setCurPage] = useState(1);
    const CurComp = listOfComp[curPage === 1 ? 'Comp1' : 'Comp2']; 
    const [curTime, setCurTime] = useState(0);

    return (<div style={{display:'flex', flexDirection:'row', margin:'20px', gap:'20px', width:'min-content'}}>
        <div style={{display:'flex', flexDirection:'column', margin:'20px', gap:'20px', width:'min-content'}}>
            <div onClick={() => setCurPage(1)} style={{backgroundColor: '#ABCABC', border: '1px solid black', padding: '10px'}}>1</div>
            <div onClick={() => setCurPage(2)} style={{backgroundColor: '#ABCABC', border: '1px solid black', padding: '10px'}}>2</div>
        </div>
        <CurComp curTime={curTime} setCurTime={setCurTime}></CurComp>
        
    </div>);
}

export default EM16;