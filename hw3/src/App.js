import React from 'react';
import TodoappMain from './TodoappMain';



function App() {
  return (
    <div className='todo-app__root'>
      <header className='todo-app__header'>
        <p className='todo-app__title'>todos</p>
      </header>
      <TodoappMain />
    </div >
  )
}

export default App;
