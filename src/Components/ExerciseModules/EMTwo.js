import React, { useMemo, useState, useEffect } from 'react';
import '../../styles/ExerciseModules/EMTwo.css';

const taskDatafromBE= [
    {
        id: 1,
        status: 0,
        priority: 0,
        content: 'Take Milo out for vet'
    },
    {
        id: 2,
        status: 1,
        priority: 0,
        content: 'Take Milo out for vet'
    },
    {
        id: 3,
        status: 0,
        priority: 1,
        content: 'Take Milo out for vet'
    },
    {
        id: 4,
        status: 0,
        priority: 2,
        content: 'Take Milo out for vet'
    },
    {
        id: 5,
        status: 0,
        priority: 3,
        content: 'Take Milo out for vet'
    }
];

const TaskDetailsView = React.memo(({task, markAsRead}) => {
    console.log('preparing task details view', task)
    return (
        <div className={task.status === 1 ? "task-details-container completed" : "task-details-container"}>
            <div>{task.id}</div>
            {task.status === 0 ? 
                <div className='checkbox-class'>
                    <input type="checkbox" onChange={(_) => markAsRead(task, _)} />
                    <label>Mark as completed</label>
                </div> : <div>  </div>
            }
            <div>{task.priority}</div>
            <div>{task.content}</div>
        </div>
    );
});

const EMTwo = () => {
    const [tasksList, setTasksList] = useState(taskDatafromBE);
    const [filteredData, setFilteredData] = useState(tasksList);

    const [priorityFilter, setPriorityFilter] = useState(-1);


    const markAsRead = (receivedTask, _) => {
        console.log('marked as read', receivedTask);
        setTasksList(
            tasksList.map((task) => {
                if(task.id === receivedTask.id){
                    task.status=1;
                }
                return task;
            })
        )
    }

    useEffect(() => {
        if(priorityFilter === -1)
            setFilteredData(tasksList)
        else {
            let arr = tasksList.filter((task) => {
                console.log(task, 'milo2');
                return task.priority === priorityFilter});
            console.log(arr, 'milo1');
            setFilteredData(arr);
        }

    }, [tasksList, priorityFilter])

    return (
        <div>
            <div className='form-container'>
            <select name="pri" id="pri" onChange={(e) => setPriorityFilter(Number(e.target.value))}>
                <option value={-1}>All</option>
                <option value={0}>High</option>
                <option value={1}>Medium</option>
                <option value={2}>Low</option>
            </select>
                <p>test</p>
            </div>
            <div className='list-container'>
                {filteredData.map((task) => 
                    {return (<TaskDetailsView 
                        task={task} 
                        markAsRead={markAsRead}>
                    </TaskDetailsView>)})}
            </div>
        </div>
    );
}

export default EMTwo;