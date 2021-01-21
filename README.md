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

        при выполнении todo он должен быть зачёркнут

Тут необходимо работать через корневой элемент. Данный массив является определённым стейтом и не можем изменить отделльный компонент где-то в  дочерний элементах
Если что-то меняем нужно изменить сам state

                 const todos = [
                        {id: 1, completed: false, title: "Забег на лыжах 2 км"},
                        {id: 2, completed: false, title: "Ужин в 18:00"},
                        {id: 3, completed: false, title: "Английский с 19:00 до 19:45"}
                    ]
При нажатии на imput типа chekbox по тому элементу которому кликнули изменить состояние completed на противоположное значения и перерисовать остальные элементы

----------------------        Как добовлять события в JSX        ---------------------- 

Это просто. Например для checkbox можно использовать события onChange           
TodoItem.js:

        <input type='checkbox' style={styles.input} onChange={() => console.log(todo.id)} />
        
Теперь нужно передать данное событие в родительский элемент из TodoItem.js в App.js т.к state там. И для этого в компоненте TodoItem я могу принимать ещё одну ф-ю/name random
                               
                                                function TodoItem( {todo, index, onChange} )
                                                
Когда будет происходить событие onChange я буду вызывать метод onChange, куда я буду передовать id по которому кликнул. Попутно опишу это свойство в propTyps

                                        import React from 'react';
                                        import PropTypes from 'prop-types';


                                        function TodoItem( {todo, index, onChange} ) {


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
                                                            <input type='checkbox' style={styles.input} onChange={() => onChange(todo.id)} />
                                                            <strong>{index + 1}) </strong>
                                                            {todo.title}  
                                                        </span>

                                                        <button className='btn'>&times;</button>
                                                    </li> 
                                                </div>
                                            )
                                        }


                                        TodoItem.propTypes = {
                                            todo: PropTypes.object.isRequired,
                                            index: PropTypes.number,
                                            onChange: PropTypes.func.isRequired
                                        }


                                        export default TodoItem
                                        
Теперь в ком-те TodoItem передаёт ф-ю onChange. TodoItem выводится в компоненте TodoList поэтому для каждого элемента также нужно передать с-во onChange, но данное событие нужно соединить с родительским элементов , поэтому сюда будет передоваться объект props и метод который я буду предать с рандомным названием(onToggle). Теперь в компоненте TodoList я принимаю метод onToggle.

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
                                                            return <TodoItem 
                                                            todo={todo} 
                                                            key={todo.id} 
                                                            index={index} 
                                                            onChange={props.onToggle}/>
                                                        })}
                                                    </ul>
                                                </div>
                                            )
                                        }


                                        TodoList.propTypes = {
                                            todos: PropTypes.arrayOf(PropTypes.object).isRequired,
                                            onToggle: PropTypes.func.isRequired
                                        }

                                        export default TodoList
                                        
В компоненте App, где вывожу список TodoList передаю параметр onToggle и метод который я буду вызывать скажем будет toggleTodo. Метод toggleTodo нужно определить в компоненте App , это будет обычная ф-я 
                        <TodoList todos={todos} onToggle={toggleTodo}/>
                                  function toggleTodo(id) {
                                        console.log('todo id', id);
                                    }
Теперь нужно изменить state для этого нужно обратиться к массиву todos и изменить его, переопределяя его с помощью map, где на каждой итерации мы принимаем объект todo и если todo.id === с тем id по которому мы кликнули, того его поле todo.completed будет равняться противоположному значению todo.completed
                
                    function toggleTodo(id) {
                        todos = todos.map(todo => {
                            if (todo.id === id) {
                                todo.completed = !todo.completed
                            }
                            return todo
                        })
                    }
                    
в таком члучае реакт не будет перерендеривать компоннт, хотя мы как-бы изменили состояние , таким образом стате задать нельзя 
___-для того чтобы определить state за которым будет следить React для того чтобы перерендоривать наш шаблон и добавлять динамики приложению , нужно определять через ф-ю useState - всегда возвращает массив состоящее из двух элементов , начальное состояние(поумолчанию) и второе - ф-я позволяющее изменять данное состояниее для того чтобы React видел эти изменения  

                                        import React from 'react';
                                        import TodoList from './Todo/TodoList'


                                        function App() {

                                            const [todos, setTodos] = React.useState(
                                                [
                                                    {id: 1, completed: false, title: "Забег на лыжах 2 км"},
                                                    {id: 2, completed: false, title: "Ужин в 18:00"},
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


Теперь нужно отобразить что todo выполнено . Для этого заведу класс активности
                        
                        .done{
                               text-decoration: line-through;
                             }
                             
теперь нужно дабавлять этот класс в зависимости от состояния поля completed, если true добавляем класс  
                                
                                    const classes = []


                                    if (todo.completed) {
                                        classes.push('done')
                                    }
создали пустой массив и спросили если todo.completed === true , то в массив  будет добавлен done

Массив необходимо передать в шаблон. Например тегу span 
                <span className={classes.join(' ')}>
        т.к в атрибут className должны передавать строку воспользуюсь методом join клоторый приводит массив к строке , каждый элемент в данном случаи соединяется через пробел, это на тот случае если в массиве classes будет несколько классов , тогда они будут добавляться в тегу span через пробел
        И если сейчас чекать задачи то они будут перечёркиваться
