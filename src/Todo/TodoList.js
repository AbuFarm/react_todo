import React from 'react';
import TodoItem from './TodoItem'



export default function TodoList() {

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