import React from 'react';
import TodoList from './Todo/TodoList'


function App() {

    const [todos, setTodos] = React.useState(
        [
            {id: 1, completed: false, title: "Забег на лыжах 2 км"},
            {id: 2, completed: true, title: "Ужин в 18:00"},
            {id: 3, completed: false, title: "Английский с 19:00 до 19:45"}
        ]
    )


    function toggleTodo(id) {
        setTodos (
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            }) 
        ) 
    }

  return(
      <div className='wrapper'>
          <h1>Todo на сегодня:</h1>
          <TodoList todos={todos} onToggle={toggleTodo}/> 
      </div>
  )
}

export default App;
