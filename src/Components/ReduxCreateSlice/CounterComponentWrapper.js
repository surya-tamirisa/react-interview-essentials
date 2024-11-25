// src/Components/ReduxCreateSlice/CounterComponentWrapper.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import CounterComponent from './CounterComponent';

const CounterComponentWrapper = () => {
    return (
        <Provider store={store}>
            <CounterComponent />
        </Provider>
    );
};

export default CounterComponentWrapper;
