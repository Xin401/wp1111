import React from 'react'

export default function TodoFooter({ todos, showAll, showActive, showComplete, getLeft, getComplete, clearComplete }) {
    if (todos.length > 0) {
        return (
            <footer className='todo-app__footer'>
                <div className='todo-app__total'>{getLeft()} left</div>
                <ul className='todo-app__view-buttons'>
                    <button onClick={() => {
                        showAll()
                    }}>All</button>
                    <button onClick={() => {
                        showActive()
                    }}>Active</button>
                    <button onClick={() => {
                        showComplete()
                    }}>Completed</button>
                </ul>
                <div className='todo-app__clean' style={{ visibility: getComplete() }}>
                    <button onClick={() => { clearComplete() }}>Clear completed</button>
                </div>
            </footer >
        )
    }
}
