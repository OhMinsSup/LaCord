// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configure from './store/configure';

const preloadedState = (typeof window === 'undefined' ? undefined : window.__REDUX_STATE__);
const store = configure(preloadedState);

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>    
            <App />
        </BrowserRouter>
    </Provider>
)

export default Root;

