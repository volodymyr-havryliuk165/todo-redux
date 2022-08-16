import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todos.js';

export const store = configureStore(
  {
    reducer: {
      todos: todoReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
