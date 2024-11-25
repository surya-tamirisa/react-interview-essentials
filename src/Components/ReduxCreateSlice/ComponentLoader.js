// src/Components/ComponentLoader.js
import React, { useState } from 'react';
import CounterComponentWrapper from './ReduxCreateSlice/CounterComponentWrapper';

const ComponentLoader = () => {
    const [selectedComponent, setSelectedComponent] = useState('');

    const components = {
        'Counter Component': <CounterComponentWrapper />,
        // Add other components here as needed
    };

    return (
        <div>
            <div style={{ border: '1px solid black', padding: '10px', marginBottom: '20px' }}>
                <h3>Load a Module</h3>
                <select onChange={(e) => setSelectedComponent(e.target.value)}>
                    <option value="">Select a Component</option>
                    <option value="Counter Component">Counter Component</option>
                    {/* Add other options here */}
                </select>
            </div>
            <div>{selectedComponent && components[selectedComponent]}</div>
        </div>
    );
};

export default ComponentLoader;
