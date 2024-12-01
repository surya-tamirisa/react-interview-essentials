/*
Question: Create a React application to manage a task list.

Requirements:
1. The application should allow users to:
   - Add new tasks with a unique ID, name, and description.
   - Mark tasks as completed or uncompleted using a checkbox.
   - Delete tasks from the list.

2. Task details:
   - Each task should have the following properties:
     - ID: A unique identifier for the task.
     - Name: A string representing the task's title.
     - Description: A string representing the task's description.
     - isCompleted: A boolean indicating the completion status.

3. Functionality:
   - The list should dynamically update when tasks are added, marked as completed, or deleted.
   - Disable the "Add Task" button when either the name or description fields are empty.

4. Display:
   - Show all tasks in a list with their details, along with checkboxes and a delete button for each task.
*/


/***
 * {
  id: uniqueId,
  name: string,
  description: string,
  isCompleted: boolean
}
 */

import React, { useReducer, useState } from "react";

const taskCompStyles = {
    display: 'flex',
    flexDirection : 'row',
    gap: '15px'
}

const TaskComponent = React.memo(({task, dispatch}) => {
    console.log('rendering task: ', task);
    return (
        <div style={taskCompStyles}>
            <input 
                checked={task.isCompleted}
                type="checkbox"
                onChange={(e) => dispatch({type:'MARK_AS_READ', payload: {id: task.id}})}>
            </input>
            <div>{task.name}</div>
            <div>{task.description}</div>
            <button onClick={() => dispatch({type:'DELETE_TASK', payload: {id: task.id}})}>Del </button>
        </div>
    );
})

const taskReducer = (state, action) => {
    console.log('action received: ', action, state);
    switch(action.type){
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload.newTask]
            }
            break;
        case 'MARK_AS_READ':
            let id= action.payload.id;
            let newTasksArr = state.tasks.map(task => {
                if(task.id === id)
                    return {...task, isCompleted: !task.isCompleted}
                else return task;
            });
            return {
                ...state,
                tasks: [...newTasksArr]
            }
            break;
        case 'DELETE_TASK':
            const newTasksArr1 = state.tasks.filter(task => task.id!== action.payload.id);
            return {
                ...state,
                tasks: [...newTasksArr1]
            }
            break;
        default:
            return state;
    }
}

const EM10 = () => {

    const [state, dispatch] = useReducer(taskReducer, { tasks:[]});
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const addTaskHandler = () => {
        const newTask = {
            id: Math.round(Math.random()*1871*9765/55),
            name: title,
            description: desc,
            isCompleted: false
        }
        setTitle('');
        setDesc('');
        dispatch({
            type: 'ADD_TASK',
            payload: {newTask: newTask}
        });
        
    }
    
    return (
        <div className="task-list-container">
            <div>
                Add new Task:
                <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input value={desc} onChange={(e) => setDesc(e.target.value)}></input>
                <button 
                    disabled={title=== '' || desc===''}
                    onClick={addTaskHandler}>Add Task</button>
            </div>
            {state.tasks.map(task => 
                <TaskComponent
                    key={task.id}
                    task= {task}
                    dispatch={dispatch}
                    ></TaskComponent>)}
        </div>
    );
}

export default EM10;