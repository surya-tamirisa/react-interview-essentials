/*
Question: Create a React application to manage and toggle between light and dark themes.

Requirements:
1. The application should:
   - Allow the user to toggle between "light" and "dark" themes using a checkbox.
   - Display the current theme in each component.

2. Components:
   - A parent component that displays the current theme and provides the toggle functionality.
   - A grandchild component that also displays the current theme and allows toggling it.

3. Theme management:
   - Pass the theme and toggle functionality as props from the parent to the grandchild component.
   - Ensure consistent theme changes across all components.

4. Provide user-friendly labels indicating the current theme and toggle action.
*/

import { useState } from "react";


const GrandChildComp = ({theme, setTheme}) => {
    return (<div>
        This is the Grand Child Component:
        <div>CUrrent theme: {theme}</div>
            <input 
                type='checkbox' 
                checked={theme === 'light'} 
                onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}>
            </input>
            <label>{theme === 'light' ? 'Uncheck for Dark Theme' : 'Check for Light Theme'}</label>
        </div>)
}

const ChildCompoenent = ({theme, setTheme}) => {
    return (<div>
        This is the Parent Component
        <div>CUrrent theme: {theme}</div>
        <input 
                type='checkbox' 
                checked={theme === 'light'} 
                onChange={(e) => setTheme(e.target.checked ? 'light' : 'dark')}>
        </input>
        <label>{theme === 'light' ? 'Uncheck for Dark Theme' : 'Check for Light Theme'}</label>

        <GrandChildComp theme={theme} setTheme={setTheme}></GrandChildComp>
    </div>);
}

const EM11 = () => {
    const [theme, setTheme] = useState('light');
    return (
        <div>
            EM11
            <ChildCompoenent theme={theme} setTheme={setTheme}></ChildCompoenent>
        </div>
    )
}

export default EM11;