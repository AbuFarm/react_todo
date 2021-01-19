import React from 'react';

export default function TodoItem( {todo} ) {

    return (
        <div>
            <li>{todo.title}</li>
        </div>
    )
}