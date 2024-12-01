/*
Question: Create a React application to manage a Todo list with filtering and counting functionality.

Requirements:
1. The application should allow users to:
   - Add new Todo items with a default "incomplete" status.
   - Mark items as "completed" or "incomplete" using a checkbox.
   - Filter Todo items by their status ("all," "completed," or "incomplete").

2. Todo details:
   - Each Todo should include:
     - A text description.
     - A status indicating whether it is "completed" or "incomplete."

3. Functionality:
   - Display the filtered list of Todos based on the selected filter.
   - Show a count of the total number of Todos and the number of completed Todos.

4. Dynamic updates:
   - Update the filtered list and counts dynamically whenever the Todo list or filter changes.
   - Ensure the application reflects the current state of Todos and filters accurately.

5. Display:
   - Use a list format to display Todos with their text and completion status.
   - Include user-friendly input fields for adding Todos and selecting filters.
*/

import React, { useEffect, useState } from "react";


const TODOComponent = React.memo(({todo, changeStatus}) =>{
    console.log('todoComponent...');
    return (
        <div className="todo-card">
            <input type="checkbox" value={todo.status === 'comp'} onClick={(e) => changeStatus(e.target.checked, todo.text)}></input>
            <div>{todo.text}</div>
        </div>
    );
})

const EM7 = () => {

    const [todo, setTodo] = useState([]);
    const [filteredTodo, setFilteredTodo] = useState([]);
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('all');
    const [count, setCount]= useState({t:0, c:0});


    const addTodo = () => {
        setTodo((prev) => [...prev, { text: text, status:'incomp'}])
    }

    const changeStatus = (checked, text) => {
        console.log(text, checked);
        let todoArr = todo.map(t => {
            if(t.text === text){
                let newStatus = t.status === 'incomp' ? 'comp' : 'incomp';
                let newObj = {text: t.text, status:newStatus};
                console.log('returning the new status', newObj)
                return newObj;
            } else return t;
        });
        console.log(todoArr);
        setTodo([...todoArr])
    }

    useEffect(() => {
        if(filter === 'all') setFilteredTodo(todo);
        else {
            let filteredArr = todo.filter((t) => t.status === filter)
            setFilteredTodo(filteredArr);
        }
        
    }, [todo, filter]);

    useEffect(() => {
        let total = 0, comp = 0;
        filteredTodo.forEach((t) => {
            if(t.status === 'comp') comp++;
            total++;
        })
        setCount({
            t: total,
            c: comp
        });
    }, [filteredTodo]);

    useEffect(() => {
        console.log(todo);
    }, [todo])

    return (<div className="Page-container">
        <div className="add-container">
            <input onChange={(e) => setText(e.target.value)}></input>
            <button disabled={text.length<0} onClick={() => addTodo()}>Add Todo</button>
        </div>
        <div className="todos-list-container">
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value='all'>All</option>
                <option value='comp'>Completed</option>
                <option value='incomp'>Incomplete</option>
            </select>
            {filteredTodo.map(t => <TODOComponent todo={t} changeStatus={changeStatus}></TODOComponent>)}
            <div>Total: {count.t} || Completed: {count.c}</div>
        </div>

    </div>);
}

export default EM7;