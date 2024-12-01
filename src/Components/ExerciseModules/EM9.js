/*
Question: Create a React application to manage a counter.

Requirements:
1. The application should:
   - Display the current value of the counter.
   - Provide buttons to increment, decrement, and reset the counter.

2. Counter functionality:
   - Increment the counter by 1 when the "Increment Counter" button is clicked.
   - Decrement the counter by 1 when the "Decrement Counter" button is clicked.
   - Reset the counter to 0 when the "Reset Counter" button is clicked.

3. Ensure the UI dynamically updates to reflect the current counter value after any operation.
*/

import { useReducer } from "react"


const initialState = {
    counter: 0
}

const counterReducer = (state, action) => {
    switch(action.type){
        case 'INC_COUNTER':
            return {
                ...state,
                counter: state.counter+1
            }
        case 'DEC_COUNTER':
            return {
                ...state,
                counter: state.counter-1
            }
        case 'RESET_COUNTER':
            return {
                ...state,
                counter: 0
            }
        default:
            return state;
    }
}

const EM9 = () => {

    const [state, dispatch] = useReducer(counterReducer, initialState);

    const buttonHandler  = (type) => {
        if(type === 'INC')
            dispatch({type:'INC_COUNTER', payload:{}})
        else if(type === 'DEC')
            dispatch({type:'DEC_COUNTER', payload:{}})
        else if(type ==='RES'){
            dispatch({type: 'RESET_COUNTER', payload:{}})
        }
    }

    return (
        <div>
            <button onClick={() => buttonHandler('DEC')}>Decrement Counter</button>
            <div>{state?.counter}</div>
            <button onClick={() => buttonHandler('INC')}>Increment Counter</button>
            <br></br>
            <button onClick={() => buttonHandler('RES')}>Reset Counter</button>
        </div>
    )
}

export default EM9;