import React, { useState } from 'react';

function TodoTable(props) {
    return (

        <div>
            <table>
                <tbody>
                    <tr>Tasks:</tr>
                    {
                        props.todos.map((todo, index) =>
                            <tr key={index}>
                                <td>{todo.desc}</td>
                                <td>{todo.date}</td>
                                <td>{todo.priority}</td>
                                <button onClick={() => props.deleteTodo(index)}>Delete</button>
                                
                            </tr>)
                            
                    }
                </tbody>
            </table>
        </div>)
}

export default TodoTable;