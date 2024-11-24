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