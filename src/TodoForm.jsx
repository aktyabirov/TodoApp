import React, { useState, useContext } from 'react';
import { TodoContext } from './TodoContext';

const TodoForm = () => {
    const [text, setText] = useState('');
    const {dispatch} = useContext(TodoContext);

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch({type: 'ADD_TODO', payload: { id: Date.now(), text} });
        setText('');
        };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
           <input
    className="flex-1 rounded-lg shadow-md p-2 text-gray-700"
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Add todo"
  />
  <button
    className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow focus:outline-none focus:shadow-outline transition-colors"
    type="submit"
  >
    Add
  </button>
        </form>
    );

};


export default TodoForm;