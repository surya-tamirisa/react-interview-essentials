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