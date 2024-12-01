/*
Question: Create a React application with a simple login/logout system.

Requirements:
1. The application should:
   - Display a login form when the user is not logged in.
   - Display a welcome message and logout button when the user is logged in.

2. Login functionality:
   - Allow the user to enter a username and password.
   - Log the user in only if the correct password is provided.

3. Logout functionality:
   - Clear the logged-in user information when the user clicks the logout button.
   - Redirect the user back to the login form after logging out.

4. Maintain the logged-in user state and pass it between components.
*/

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const EM13 = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    return(
    <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
        <div>
            {!loggedInUser && <LoginForm></LoginForm>}
            {loggedInUser && <HomePageComp></HomePageComp>}
        </div>
    </UserContext.Provider>    
    )
}

const LoginForm = () => {
    const {setLoggedInUser} = useContext(UserContext);
    const handleLogin = () =>{
        if(password === 'asd')
            setLoggedInUser({username: username, userId: 123});
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <label>Username: </label><input value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <label>Password: </label><input value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    );
}

const HomePageComp = () => {
    const {loggedInUser, setLoggedInUser} = useContext(UserContext);
    return (
        <div>
            Welcome {loggedInUser.username}
            <button onClick={() => setLoggedInUser(null)}>Logout</button>
        </div>
    );
}

export default EM13;