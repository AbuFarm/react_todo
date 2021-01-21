import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

function TodoList(props, onToggle) {

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