import React from 'react'
import Todo from './Todo'

const Todolist = ({ todos, lineThrough, del }) => {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} lineThrough={lineThrough} todo={todo} del={del} />
        })
    )
}
export default Todolist