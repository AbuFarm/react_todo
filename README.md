# react_todo
create react app todo lists

При компонентном подходе в файле впервую очереде нужно указать 
        import React from 'react';
иначе компонент безполезен.Всегда есть главный компонент, обычно App.js, куда экспортируется все другие компоненты
Для экспорта компонентов нужно:
*1 в экспортироваемом файле прописать 
                                   a) export default function Name () {} если экспорт по умолчанию
                                   b) export default Name
                                    
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

Каждый дочерний элемент в списке должен иметь уникальную "ключевую" опору. Each child in a list should have a unique "key" prop
В React для каждого объекта который явл интегрируемым должны добавить специальный атрибут key. это нужно для более эффективного рендеринга шаблона 

                                                                             return <TodoItem todo={todo} key={todo.id}/>

Можно добавить перечисление todo добавив дополнительный параметр index в методе map 
   TodoList.js                     
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
                                        {props.todos.map((todo, index) => {
                                            return <TodoItem todo={todo} key={todo.id} index={index}/>
                                        })}
                                    </ul>
                                </div>
                            )
                        }
                        
 В  TodoItem.js также принимаем дополнительный парамтр index 
         
                        import React from 'react';

                        export default function TodoItem( {todo, index} ) {

                            return (
                                <div>
                                    <li>{index + 1}) {todo.title}</li>
                                </div>
                            )
                        }
                        
   Также можно не передавая index, т.к в передаваемом массиве todo есть id
   
                        import React from 'react';

                        export default function TodoItem( {todo} ) {

                            return (
                                <div>
                                    <li>{todo.id}){todo.title}</li>
                                </div>
                            )
                        }
--------JS не типезированный язык-------- и можно добавлять одним и тем же объектам разные типы и могут возникнуть потенциальные ошибки при передаче свойств, поэтому в React считается хорошей практикой описание входящих свойств в нужный компонентов. Для этого используют prop-types. 

Устанавливаю ------->   npm install prop-types   Перезагружаю сервак npm start

Для использования нужно прописать в консоли                      import PropTypes from 'prop-types';
TodoList.js :

                        import React from 'react';
                        import TodoItem from './TodoItem';
                        import PropTypes from 'prop-types';
                                        
                        function TodoList(props) {

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
                                        {props.todos.map((todo, index) => {
                                            return <TodoItem todo={todo} key={todo.id} index={index}/>
                                        })}
                                    </ul>
                                </div>
                            )
                        }


                        TodoList.propTypes = {
                            todos: PropTypes.arrayOf(PropTypes.object).isRequired
                        }

                        export default TodoList

Обращаюсь к ф-и TodoList и определяю у него св-во propTypes - это обычный объект , где описывается в качестве значения ключа - название св-ва, дальше используется библиотека PropTypes, чтобы определить его тип todos: PropTypes.array - это массив /   todos: PropTypes.arrayOf(PropTypes.object).isRequired  - массив arrayOf(PropTypes.object) состоящих из объектов , который необходим для работы данного компонента isRequired (флаг)

Валидация для TodoItem.js тут уже два параметра 

                        import React from 'react';
                        import PropTypes from 'prop-types';

                        function TodoItem( {todo, index} ) {

                            return (
                                <div>
                                    <li>{index + 1}) {todo.title}</li>
                                </div>
                            )
                        }


                        TodoItem.proptypes = {
                            todo: PropTypes.object.isRequired,
                            index: PropTypes.number
                        }


                        export default TodoItem
                        
Для чего эти действия? Как пример кто-то по ошибке привёл number к строке

                                                return <TodoItem todo={todo} key={todo.id} index={index.toString()}/>
в таком случае в консоли будет видна ошибка, что невалидный тип у index, т.к программа ожидает принять number , а получает string. Валидация параметров помогает при раз-ке
                        
                                                Warning: Failed prop type: Invalid prop `index` of type `string` supplied to `TodoItem`, expected `number`

3 Этап. Оформление стилей и прописание логики

                                                function TodoItem( {todo, index} ) {


                                                    const styles = {
                                                        li: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '.5rem 1rem',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '4px',
                                                            marginBottom: '.5rem'
                                                        },
                                                        input: {
                                                            marginRight: '1rem'
                                                        }
                                                    }

                                                    return (
                                                        <div>
                                                            <li style={styles.li}>
                                                                <span>
                                                                    <input type='checkbox' style={styles.input} />
                                                                    <strong>{index + 1}) </strong>
                                                                    {todo.title}  
                                                                </span>

                                                                <button className='btn'>&times;</button>
                                                            </li> 
                                                        </div>
                                                    )
                                                }
Стили можно добавить инлайн через объект или прописать в css добавив предварительно классы элементам через className. Обычно выбирают единый подход
