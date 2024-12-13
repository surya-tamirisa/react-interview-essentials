/**
 * React Counter with Multiple Actions
 * 
 * Problem Statement:
 * Create a React component that:
 * 1. Displays a counter on the screen.
 * 2. Includes buttons to:
 *    - Increment the counter by 1.
 *    - Decrement the counter by 1.
 *    - Reset the counter to 0.
 * 
 * Requirements:
 * 1. Manage the counter state using `useReducer`.
 * 2. Use a reducer function to handle the following actions:
 *    - "increment" to increase the counter by 1.
 *    - "decrement" to decrease the counter by 1.
 *    - "reset" to set the counter back to 0.
 * 
 * Expected Behavior:
 * 1. Clicking "Increment" increases the counter by 1.
 * 2. Clicking "Decrement" decreases the counter by 1.
 * 3. Clicking "Reset" sets the counter to 0.
 * 
 * Bonus:
 * 1. Add a text input that allows the user to set the counter to any number by dispatching an "update" action.
 */

import { type } from '@testing-library/user-event/dist/type';
import React, { useReducer, useState } from 'react';

const counterReducer = (state, action) => {
    switch(action.type){
        case 'INC':
            return {
                ...state, counter: state.counter+1
            }
            break;
        case 'DEC':
            return {
                ...state, counter: state.counter-1 <= 0 ? 0 : state.counter-1
            }
            break;
        case 'RESET':
            return {
                ...state, counter: 0
            }
            break;
        case 'SET':
            return {
                ...state, counter: action.payload.counter
            }
            break;
        default:
            return state;
    }
}

export default function EM26() {

    const [state, dispatch] = useReducer(counterReducer, {counter: 0})
    const [input, setInput] = useState('');
    return (
        <div>
            <h3>Current Value: {state.counter}</h3>
            <button onClick={() => dispatch({type: 'INC'})}>Increment</button>
            <button disabled={state.counter === 0} onClick={() => dispatch({type: 'DEC'})}>Decrement</button>
            <button onClick={() => dispatch({type: 'RESET'})}>Reset</button>
            <br></br>
            <br></br>
            <br></br>
            <label>Enter to set a custom value to the counter:</label>
            <input type='number' value={input} onChange={((e) => setInput(Number(e.target.value)))}></input>
            <button onClick={() => {
                dispatch({
                    type: 'SET',
                    payload: {
                        counter: input
                    }
                });
                setInput('');
            }}>Set Counter</button>
        </div>
    )
}
