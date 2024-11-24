import { type } from "@testing-library/user-event/dist/type";
import React, { useCallback, useEffect, useReducer, useState } from "react";


const TODOComponent = React.memo(({todo, changeStatus}) =>{
    // console.log('todoComponent...');
    return (
        <div className="todo-card">
            <input type="checkbox" checked={todo.status === 'comp'} onChange={(e) => changeStatus(e.target.checked, todo.text)}></input>
            <div>{todo.text}</div>
        </div>
    );
})

const initialTodoState = {
    todo: [],
    filteredTodo: [],
    filter: 'all',
    count: {t:0, c:0}
}

const todoReducer = (state, action) => {

    switch(action.type){
        case 'ADD_TODO':
            const newTodo = { text: action.payload.text, status: 'incomp'};
            return {
                ...state,
                todo: [...state.todo, {...newTodo}]
            }
            break;
        case 'CHANGE_STATUS':
            const newTodoArr = state.todo.map(t => {
                if(t.text === action.payload.text){
                    let newStatus = action.payload.checked ? 'comp' : 'incomp';
                    return {t: t.text, status: newStatus}
                } else return t;
            });
            return {
                ...state,
                todo: newTodoArr
            }
            break;
        case 'FILTER_CHANGED':
            console.log('received filter: ', action.payoad)
            return {
                ...state,
                filter: action.payload
            }
            break;
        case 'CHANGE_FILTERED_TODO':
            return {
                ...state,
                filteredTodo: action.payload
            }
            break;
        case 'CHANGE_COUNT':
            let total = 0, comp = 0;
            state.filteredTodo.forEach((t) => {
                if(t.status === 'comp') comp++;
                total++;
            })
            let newCount = {
                t: total,
                c: comp
            };
            return {
                ...state,
                count: newCount
            }
            break;
    }

}

const EM8 = () => {

    // const [todo, setTodo] = useState([]);
    // const [filteredTodo, setFilteredTodo] = useState([]);
    const [text, setText] = useState('');
    // const [filter, setFilter] = useState('all');
    // const [count, setCount]= useState({t:0, c:0});

    const [state, dispatch] = useReducer(todoReducer, initialTodoState);


    const addTodo = () => {
        dispatch({type: 'ADD_TODO', payload: {text}});
        setText('');
    };


    const changeStatus = (checked, text) => {
        dispatch({type: 'CHANGE_STATUS', payload: {checked: checked, text:text}})
    }

    useEffect(() => {

        const newArr = [...state.todo];
        
        if(state.filter !== 'all'){
            newArr = state.todo.filter((t) => t.status === state.filter)
        }
        dispatch({type: 'CHANGE_FILTERED_TODO', payload: newArr })
    }, [state.todo, state.filter]);

    useEffect(() => {
        dispatch({type: 'CHANGE_COUNT', payload: {}})
    }, [state.filteredTodo]);

    useEffect(() => {
        console.log('STATE CHANGED: ', state);
    }, [state])

    return (<div className="Page-container">
        <div className="add-container">
            <input onChange={(e) => setText(e.target.value)}></input>
            <button disabled={text.length === 0} onClick={() => addTodo()}>Add Todo</button>
        </div>
        <div className="todos-list-container">
            <select onChange={(e) => 
                dispatch(
                    {type: 'FILTER_CHANGED', 
                        payload: e.target.value
                        })}>
                <option value='all'>All</option>
                <option value='comp'>Completed</option>
                <option value='incomp'>Incomplete</option>
            </select>
            {state.filteredTodo.map(t => <TODOComponent todo={t} changeStatus={changeStatus}></TODOComponent>)}
            <div>Total: {state.count.t} || Completed: {state.count.c}</div>
        </div>

    </div>);
}

export default EM8;