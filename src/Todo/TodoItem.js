import React from 'react';

export default function TodoItem( {todo, index} ) {

    return (
        <div>
            <li>{index + 1}) {todo.title}</li>
        </div>
    )
}