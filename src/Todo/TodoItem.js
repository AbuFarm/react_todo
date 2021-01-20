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