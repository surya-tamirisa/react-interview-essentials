import { useReducer, useState } from "react";

const users = ['Select User',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

const initialState={
    usersList: [],
};

const usersReducer = (state, action) =>{
    switch(action.type){
        case 'ADD_NEW_USER_TO_DB':
            return {
                ...state,
                usersList: [...state.usersList, action.payload.newUser]
            }
            break;
        default:
            return state; 
    }
}

const EM17 = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(usersReducer, initialState);

    const handleSelectionChange = (uid) => {
        setIsLoading(true);
        let userFound = state.usersList.find(u => Number(u.id) === Number(uid));
        if(userFound){
            setCurrentUser(userFound);
        } else {
            getUserData(uid);
        }
    }

    const getUserData = (id) => {
        const url = `https://jsonplaceholder.typicode.com/users/`+id;
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dispatch({type: 'ADD_NEW_USER_TO_DB', payload:{newUser: data}})
            setCurrentUser(data);
        }).finally(() => setIsLoading(false));
    };

    return (<div>
        <h5>Welcome, select the user to see their details:</h5>
        <select onChange={(e) => handleSelectionChange(e.target.value)}>
            {users.map(uid => <option key={uid} value={uid}>{uid}</option>)}
        </select>
        {isLoading && <div>Retrieving user deatils from the server ....</div>}
        {!isLoading && currentUser && <div>
            <h3>Retrieved user details:{currentUser.name}</h3>
            </div>}
    </div>);
}

export default EM17;