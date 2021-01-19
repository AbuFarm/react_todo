import React from 'react';
import TodoList from './Todo/TodoList'

function App() {

    const todos = [
        {id: 1, completed: false, title: "Забег на лыжах 2 км"},
        {id: 2, completed: false, title: "Ужин в 18:00"},
        {id: 3, completed: false, title: "Английский с 19:00 до 19:45"}
    ]

  return(
      <div className='wrapper'>
          <h1>Todo на сегодня:</h1>
          <TodoList todos={todos}/> 
      </div>
  )
}

export default App;
