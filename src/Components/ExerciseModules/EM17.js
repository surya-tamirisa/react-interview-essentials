/*
Question: Create a React component that retrieves and displays user details based on a selection.

Requirements:
1. The component should:
   - Display a dropdown menu with a list of user IDs to select from.
   - Allow the user to select a user ID and retrieve the corresponding user details.

2. User details should:
   - Be retrieved from a remote API if the user is not already in the local data store.
   - Be displayed dynamically once retrieved.

3. Provide functionality to:
   - Check if the selected user already exists in the local data store.
   - Fetch user details from an API if the user is not found locally.
   - Update the local data store with newly fetched user details.

4. Show a loading indicator while fetching data from the API.
*/

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