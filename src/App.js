import React, {useEffect, useRef} from 'react'
import styles from './styles/App.css'
import Todo from './todo/Todo'

import {useState} from "react";
import backgroundImage from './assets/background-image.jpg'

import TodoList from "./todo/TodoList";
import InputAdd from "./input/InputAdd";
import {TodoContext} from "./todo/TodoCtx";
import ProgressContainer from "./progressBar/ProgressContainer";
import {useLocalStorage} from "./hooks/useLocalStorage";
import TimerComponent from "./timer/TimerComponent";
import Player from "./player/Player";

import video from './assets/videos/video.mp4'


function App() {

    const db = useLocalStorage()
    const [todos, setTodos] = useState(db.getUnCompletedTodos())
    const [completedTodos, setCompletedTodos] = useState(db.getCompletedTodos())
    const [ratio, setRatio] = useState(db.calculate())
    const videoRef = useRef(null)



    useEffect(() => {
        const r = db.calculate()
        setRatio(r)
    },[completedTodos, todos])

    function addNewTodo(title){
        const filtered = todos.filter(todo => todo.title === title)
        const createCondition = filtered.length === 0

        if (!createCondition) return
        if (title.trim() === '') return

        const id = Date.now()
        const newTodo = new Todo(id, title, false)
        db.addTodo(newTodo)
        setTodos(db.getUnCompletedTodos())
    }
    function toggleTodo(id){
        db.completeTodo(id)
        const r = db.getUnCompletedTodos()
        setTodos(r)
        setCompletedTodos(db.getCompletedTodos())
    }
    function unToggleTodo(id){
        db.unCompleteTodo(id)
        setTodos(db.getUnCompletedTodos())
        setCompletedTodos(db.getCompletedTodos())
    }
    function deleteCompletedTodo(id){
        db.deleteTodo(id)
        setCompletedTodos(db.getCompletedTodos())
    }

    return (
        <div className="App">
            {/*<img src={backgroundImage} className="backgroundImage" alt=""/>*/}
            <video className='background-video' ref={videoRef} src={video} ></video>
            <TodoContext.Provider value={ {toggleTodo, unToggleTodo, deleteCompletedTodo} } >
                <div className="container">
                    {/*<div className="top_bar">*/}
                    <InputAdd addNewTodo={addNewTodo} db={db}/>
                    <div className="todosAndProgress">
                        <div className="todosContainer">
                            <TodoList todos={todos}/>
                        </div>
                        <ProgressContainer ratio={ratio} completedTodos={completedTodos}/>
                    </div>
                    <Player  r={videoRef}/>
                    <TimerComponent />
                    {/*</div>*/}
                </div>
            </TodoContext.Provider>
        </div>
        );
    }

export default App;
