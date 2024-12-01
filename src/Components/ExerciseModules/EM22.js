/*
Question: Create a React component to manage a Todo list.

Requirements:
1. The Todo list should:
   - Allow users to add new Todos with unique IDs and text.
   - Display a list of Todos with each Todo having the following actions:
     a. Mark as Complete/Incomplete toggle.
     b. Edit the Todo text.

2. Each Todo action should:
   - Toggle between complete and incomplete states.
   - Allow inline editing of the text with a Done button to save changes.

3. The component should dynamically update the displayed list based on user interactions.
*/

import { useReducer, useState } from "react";

const TODOComp = ({todo, dispatch}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const buttonActionHandler = () => {
        if(isEditing){
            dispatch({type: 'EDIT_TODO', payload:{id: todo.id, text: text}})
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    }

    return (<div style={{display:'flex', gap:'15px'}}>
        <div>{todo.id}</div>
        <button 
            onClick={() => dispatch({type: 'MARK_AS_COMP', payload:{id: todo.id, comp: !todo.isCompleted}})}>
                {todo.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        {!isEditing && <div>{todo.text}</div>}
        {isEditing && <input value={text} onChange={(e) => setText(e.target.value)}></input>}
        <button onClick={buttonActionHandler}>{isEditing ? 'Done' : 'Edit'}</button>
    </div>);
}

const initialState = {
    todos: []
}

const reducer = (state, action) => {
    console.log('received action', action)
    let newTodosArr;
    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state, 
                todos: [...state.todos, {...action.payload.todo}]
            }
            break;
        case 'EDIT_TODO':
            newTodosArr = state.todos.map(todo => {
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        text: action.payload.text
                    }
                } else return todo;
            });
            return {
                ...state, 
                todos: [...newTodosArr]
            }
            break;
        case 'MARK_AS_COMP':
            newTodosArr = state.todos.map(todo => {
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        isCompleted: action.payload.comp
                    }
                } else return todo;
            });
            return {
                ...state, 
                todos: [...newTodosArr]
            }
            break;
    }
}

const EM22 = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [text, setText] = useState('');
    const handleAddTodo = () => {
        const todo = {
            id: Date.now(),
            text,
            isCompleted: false
        }
        dispatch({type: 'ADD_TODO', payload:{todo:todo}})
        setText('');
    }

    return (<div>
        <input value={text} onChange={(e) => setText(e.target.value)}></input>
        <button onClick={() => handleAddTodo()}>Add Todo</button>
        {state.todos.map(todo => <TODOComp todo={todo} dispatch={dispatch}></TODOComp>)}
    </div>);
}

export default EM22;