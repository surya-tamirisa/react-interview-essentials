/*
Question: Create a React application to manage and toggle between light and dark themes.

Requirements:
1. The application should:
   - Allow the user to toggle between "light" and "dark" themes using a checkbox.
   - Display the current theme in each component.

2. Components:
   - A parent component that shows the current theme and provides the toggle functionality.
   - A grandchild component that also shows the current theme and allows toggling it.

3. Theme management:
   - Ensure that theme changes are reflected consistently across all components.
   - Maintain and share the theme state between components.

4. Provide user-friendly labels indicating the current theme and toggle action.
*/

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