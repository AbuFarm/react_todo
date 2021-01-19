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