import React, { createContext, useReducer, useEffect } from 'react';


const initialState = {
    todos: {
      pending: [],
      inProcess: [],
      done: [],
    },
  };

export const TodoContext = createContext();


const todoReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: {
            ...state.todos,
            pending: [...state.todos.pending, action.payload],
          },
        };
        case 'EDIT_TODO':
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.status]: state.todos[action.payload.status].map(todo =>
            todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
          ),
        },
      };
        case 'REMOVE_TODO':
      const { id, status } = action.payload;
      return {
        ...state,
        todos: {
          ...state.todos,
          [status]: state.todos[status].filter(todo => todo.id !== id),
        },
      };
      case 'MOVE_TODO':
        const { todo, from, to } = action.payload;
        return {
          ...state,
          todos: {
            ...state.todos,
            [from]: state.todos[from].filter((t) => t.id !== todo.id),
            [to]: [...state.todos[to], todo],
          },
        };
      default:
        return state;
    }
  };
  


export const TodoProvider = ({children}) => {
    const [state, dispatch ] = useReducer (todoReducer, initialState, ()=>{
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : initialState;
    });

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(state));
    },[state]);
    return (
       < TodoContext.Provider value = {{state, dispatch}}>
        {children}
        </TodoContext.Provider>
    );
};