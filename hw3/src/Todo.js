import React from 'react'
import X from './x.png'

const Todo = ({ todo, lineThrough, del }) => {
    return (
        <li className='todo-app__item' style={todo.dis}>
            <div className='todo-app__checkbox' >
                <input id={todo.id} type='checkbox' onClick={() => {
                    lineThrough(todo.id)
                }}></input>
                <label htmlFor={todo.id}></label>
            </div>
            <h1 className='todo-app__item-detail' style={todo.style}>{todo.name}</h1>
            <img src={X} className='todo-app__item-x' alt='x' onClick={() => { del(todo.id) }}></img>
        </li >
    )
}
export default Todo