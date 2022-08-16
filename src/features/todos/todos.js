import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    all: [],
    filterWord: '',
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.all.push(action.payload);
      },
      prepare: (text, date, priority) => {
        return {
          payload: {
            id: nanoid(),
            text,
            date: date.toLocaleString(),
            priority,
            completed: false,
          },
        };
      },
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const targetTodo = state.all.find((t) => t.id === id);
      targetTodo.completed = !targetTodo.completed;
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      state.all = state.all.filter((t) => t.id !== id);
    },
    setFilterWord: (state, action) => {
      const { word } = action.payload;
      state.filterWord = word;
    },
  },
});

const { reducer, actions } = todosSlice;

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilterWord } =
  actions;

export const selectAllTodos = (state) => state.todos.all;
export const selectFilterWord = (state) => state.todos.filterWord;

export default reducer;
