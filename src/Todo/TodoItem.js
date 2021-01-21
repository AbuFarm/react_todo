import React from 'react';
import PropTypes from 'prop-types';
import { renderIntoDocument } from 'react-dom/test-utils';


function TodoItem( {todo, index, onChange} ) {
    const classes = []


    if (todo.completed) {
        classes.push('done')
    }

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
                <span className={classes.join(' ')}>
                    <input 
                    type='checkbox' 
                    checked={todo.completed}
                    style={styles.input} 
                    onChange={() => onChange(todo.id)} 
                    />
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