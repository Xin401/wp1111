import React, { useState, useRef } from 'react'
import TodoFooter from './TodoFooter';
import Todolist from './TodoList'
import { v4 as uuidv4 } from 'uuid';


const TodoappMain = () => {
    const [todos, setTodo] = useState([])
    const todoName = useRef()

    function createTodo(e) {
        const newTodo = todoName.current.value;
        if (e.key === 'Enter') {
            if (newTodo === '') {
                return
            }
            if (todos.length > 0) {
                if (todos[0].complete === true) {
                    if (todos[0].dis.display === 'none') {
                        setTodo(prevTodo => { return [...prevTodo, { name: newTodo, id: uuidv4(), complete: false, style: { textDecoration: "", opacity: 1 }, dis: { display: 'flex' } }] })
                    }
                    else {
                        setTodo(prevTodo => { return [...prevTodo, { name: newTodo, id: uuidv4(), complete: false, style: { textDecoration: "", opacity: 1 }, dis: { display: 'none' } }] })
                    }
                }
                else {
                    setTodo(prevTodo => { return [...prevTodo, { name: newTodo, id: uuidv4(), complete: false, style: { textDecoration: "", opacity: 1 }, dis: { display: todos[0].dis.display } }] })
                }
            }
            else {
                setTodo(prevTodo => { return [...prevTodo, { name: newTodo, id: uuidv4(), complete: false, style: { textDecoration: "", opacity: 1 }, dis: { display: 'flex' } }] })
            }
            todoName.current.value = null
        }
    }
    function lineThrough(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        if (todo.complete === true) {
            todo.style = { textDecoration: "line-through", opacity: 0.5 }
        }
        else {
            todo.style = { textDecoration: "", opacity: 1 }
        }
        setTodo(newTodos)
    }
    function del(id) {
        const newTodos = [...todos]
        for (let i = 0; i < newTodos.length; i++) {
            if (newTodos[i].id === id) {
                newTodos.splice(i, 1)
            }
        }
        setTodo(newTodos)
    }
    function showAll() {
        let newTodos = [...todos]
        for (let i = 0; i < newTodos.length; i++) {
            newTodos[i].dis = { display: 'flex' }
        }
        setTodo(newTodos)
    }
    function showActive() {
        let newTodos = [...todos]
        for (let i = 0; i < newTodos.length; i++) {
            if (newTodos[i].complete === false) {
                newTodos[i].dis = { display: 'flex' }
            }
            else {
                newTodos[i].dis = { display: 'none' }
            }
        }
        setTodo(newTodos)
    }
    function showComplete() {
        let newTodos = [...todos]
        for (let i = 0; i < newTodos.length; i++) {
            if (newTodos[i].complete === true) {
                newTodos[i].dis = { display: 'flex' }
            }
            else {
                newTodos[i].dis = { display: 'none' }
            }
        }
        setTodo(newTodos)
    }
    function getLeft() {
        let left = 0
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].dis.display === 'flex') {
                left++
            }
        }
        return left
    }
    function clearComplete() {
        let newTodos = []
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].complete === false) {
                newTodos.push(todos[i])
            }
        }
        setTodo(newTodos)
    }
    function getComplete() {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].complete === true) {
                return 'visible'
            }
        }
        return 'hidden'
    }
    return (
        <>
            <section className='todo-app__main'>
                <input className='todo-app__input' placeholder='What needs to be done?' onKeyDown={createTodo} ref={todoName} />
                <ul className='todo-app__list' id='todo-list'>
                    <Todolist todos={todos} lineThrough={lineThrough} del={del} />
                </ul>
            </section>
            <TodoFooter todos={todos} showAll={showAll} showActive={showActive} showComplete={showComplete} getLeft={getLeft} getComplete={getComplete} clearComplete={clearComplete} />
        </>
    )
}
export default TodoappMain