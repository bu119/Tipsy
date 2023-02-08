import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { addTodo } from './redux/actions';

// console.log(store.getState());
// store.dispatch(addTodo('coding'));
// console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);