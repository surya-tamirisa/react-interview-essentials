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