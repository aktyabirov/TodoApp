import React, { useState, useContext} from 'react';
import { TodoContext } from './TodoContext';

const TodoColumn = ({status}) => {
    const {state,dispatch} = useContext(TodoContext);
    const todos = state.todos[status];

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const moveToNext = (todo)=> {
        const nextStatus = status === 'pending' ? 'inProcess' : 'done';
        dispatch({type :'MOVE_TODO', payload: {todo, from:status, to: nextStatus}});
    };

    const removeTodo = (id)=> {
        dispatch({type:'REMOVE_TODO', payload: {id, status}});
    }; 

    const startEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    const saveEdit = (id) => {
        dispatch({type: 'EDIT_TODO', payload: {id, text: editText, status}});
        setEditId(null);
        setEditText('');
    }

    const cancelEdit = () => {
        setEditId(null);
        setEditText('');
      };

      return (
        <div className="w-64 bg-transparent0 text-center pl-2 pr-2 rounded-lg shadow-md h-screen overflow-scroll ">
          <h2 className="text-xl font-bold mb-4 capitalize rounded-md bg-white">{status}</h2>
          <ul className="bg-white shadow rounded-lg divide-y divide-gray-200  flex-col mb-2 overflow-y-scroll gap-4">
            {todos.map((todo) => (
              <li key={todo.id} className="p-4 flex flex-col justify-between items-center bg-gray-100">
                {editId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="mb-2 w-full rounded-md shadow-sm p-2 text-gray-700"
                  />
                ) : (
                  <span className="mb-2 w-full text-gray-800 text-center">{todo.text}</span>
                )}
                <div className="flex justify-center items-center space-x-2">
                  {editId === todo.id ? (
                    <>
                      <button className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none" onClick={() => saveEdit(todo.id)}>Save</button>
                      <button className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {status !== 'done' && (
                        <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => moveToNext(todo)}>Next</button>
                      )}
                      <button className="text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => startEdit(todo)}>Edit</button>
                      <button className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => removeTodo(todo.id)}>Remove</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default TodoColumn;
    