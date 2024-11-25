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