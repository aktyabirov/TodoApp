import React from 'react';
import { TodoProvider } from './TodoContext';
import TodoForm from './TodoForm';
import TodoColumn from './TodoColumn';



function App() {
  const imageUrl = 'https://cdn.wallpapersafari.com/86/85/PE9K5u.jpg'; 
  

  return (
    <TodoProvider>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="min-h-screen bg-cover bg-center flex flex-col items-center pt-8"
      >
        <TodoForm />
        <div className="flex text-black justify-center gap-8 mt-8">
         <div><TodoColumn status="pending" /></div> 
          <div><TodoColumn status="inProcess" /></div>
          <div><TodoColumn status="done" /></div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
