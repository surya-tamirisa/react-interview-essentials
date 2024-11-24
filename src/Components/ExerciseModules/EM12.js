import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const GrandChildComp = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    return (<div>
        This is the Grand Child Component:
        <div>Current theme in GC: {theme}</div>
            <input 
                type='checkbox' 
                checked={theme === 'light'} 
                onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}>
            </input>
            <label>{theme === 'light' ? 'Uncheck for Dark Theme' : 'Check for Light Theme'}</label>
        </div>)
}

const ChildCompoenent = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    return (<div>
        This is the Parent Component
        <div>Current theme: {theme}</div>
        <input 
                type='checkbox' 
                checked={theme === 'light'} 
                onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}>
        </input>
        <label>{theme === 'light' ? 'Uncheck for Dark Theme' : 'Check for Light Theme'}</label>

        <GrandChildComp></GrandChildComp>
    </div>);
}

const EM12 = () => {
    const [theme, setTheme] = useState('light');
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
        <div>
            EM11
            <ChildCompoenent></ChildCompoenent>
        </div>
        </ThemeContext.Provider>
    )
}

export default EM12;