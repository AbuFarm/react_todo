# react_todo
create react app todo lists

При компонентном подходе в файле впервую очереде нужно указать 
        import React from 'react';
иначе компонент безполезен.Всегда есть главный компонент, обычно App.js, куда экспортируется все другие компоненты
Для экспорта компонентов нужно:
*1 в экспортироваемом файле прописать 
                                    export default function ...() {} если экспорт по умолчанию
                                    
2 Этап. Добавления динамики
создам [] с делами в App.js

                                                import React from 'react';
                                                import TodoList from './Todo/TodoList'

                                                function App() {

                                                    const todos = [
                                                        {id: 1, completed: false, title: "Забег на лыжах 2км"},
                                                        {id: 2, completed: false, title: "Ужин в 18:00"},
                                                        {id: 3, completed: false, title: "Английский с 19:00 до 19:45"}
                                                    ]

                                                  return(
                                                      <div className='wrapper'>
                                                          <h1>Todo</h1>
                                                          <TodoList/> 
                                                      </div>
                                                  )
                                                }

                                                export default App;
                                                
Нужно обозначить [] в TodoList чтобы дела отображались, для этого нужно обозначить какие свойства компонент TodoList будет принимать. Придумываю названия свойства (todos) которое будет принимать компонет TodoList. Так передаём масиив todos
                                        import React from 'react';
                                        import TodoList from './Todo/TodoList'

                                        function App() {

                                            const todos = [
                                                {id: 1, completed: false, title: "Забег на лыжах 2км"},
                                                {id: 2, completed: false, title: "Ужин в 18:00"},
                                                {id: 3, completed: false, title: "Английский с 19:00 до 19:45"}
                                            ]

                                          return(
                                              <div className='wrapper'>
                                                  <h1>Todo</h1>
                                                  <TodoList todos={todos}/> 
                                              </div>
                                          )
                                        }

                                        export default App;
                                        
Дальше их необходимо приниять в компоненте TodoList.j, где в качестве входных параметров принимается некий props - это объект у которого есть ключ, который соответствует todos 
                                           export default function TodoList(props) => props{todos[{id: 1, completed: false, title: "Забег на лыжах 2км"},
                                                                                                   {id: 2, completed: false, title: "Ужин в 18:00"},
                                                                                                   {id: 3, completed: false, title: "Английский с 19:00 до 19:45"}
                                                                                                   ]}
                                                            
Теперь в шаблоне нужно динамически вывести props
                                                                        import React from 'react';
                                                                        import TodoItem from './TodoItem'



                                                                        export default function TodoList(props) {

                                                                            const styles = {
                                                                                ul: {
                                                                                    listStyle: 'none',
                                                                                    margine: 0,
                                                                                    padding: 0
                                                                                }
                                                                            }

                                                                            return (
                                                                                <div>
                                                                                    <ul style={styles.ul}>
                                                                                        <TodoItem />
                                                                                        <TodoItem />
                                                                                        <TodoItem />
                                                                                    </ul>
                                                                                </div>
                                                                            )
                                                                        }
Делать это надо через цикл, предполагается неизвестное кол-во элементов в ходящих свойствах

                                                                    return (
                                                                        <div>
                                                                            <ul style={styles.ul}>
                                                                                {props.todos.map(todo => {
                                                                                    return <TodoItem todo={todo} />
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    )
у объекта props есть массив todos , а у массивом есть метод map который помогает преобразовать массив, где на каждой итерации будет приниматься объект todo, в callback будет формироваться HTML в фрмате JSX . Хочу вернуть TodoItem т.к он отвечает за <li></li> в который я хочу рендерить задачи. Будет столько TodoItem сколько задач в массиве todos.
Также как и с TodoList нужно передать данные в TodoItem для рендеринга. В данном случае свойства обозначего как todo в который помещён объект todo = результат итерации
                                        todo=[{id: 1, completed: false, title: "Забег на лыжах 2км"}]
                                        todo=[{id: 2, completed: false, title: "Ужин в 18:00"}]   
                                        todo=[{id: 3, completed: false, title: "Английский с 19:00 до 19:45"}]     
В TodoItem тоже принимаем props , но учитывая что знаем название входящего параметра можно сразу забрать нужный ключ    
                                                
                                                import React from 'react';

                                                export default function TodoItem( {todo} ) {

                                                    return (
                                                        <div>
                                                            <li>{todo.title}</li>
                                                        </div>
                                                    )
                                                }
                                                
Todo на сегодня:
Забег на лыжах 2км
Ужин в 18:00
Английский с 19:00 до 19:45
