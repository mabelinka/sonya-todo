import React, {useState} from 'react';
import TodoItemCompleted from "../todo/TodoItemCompleted";
import {useEffect, useRef} from "react";
import progressBar from "./ProgressBar";


const ProgressContainer = ({completedTodos, ratio}) => {

    const [isActive, setActive] = useState(false)
    function toggleClicked(){
        setActive(!isActive)
    }

    const progressRef = useRef(null)


    useEffect(() => {
        animate()
    }, [])

    function animate(){
      const a = progressRef.current.animate([
            {width: "0"},
            {width: `${ratio}%`}
        ], {
            duration: 400,
            easing: "ease-in-out",
        })
    }


    return (
        <div className={isActive ? "progressContainer active" : "progressContainer"}>

            <div className="completedListDiv">
                <ul className={isActive ? "completedList" : "completedList --hidden"} style={{paddingTop: "0.5rem"}}>
                    {completedTodos.map(cTodo => (
                        <TodoItemCompleted key={cTodo.id} todo={cTodo}/>
                    ))}
                </ul>
            </div>

            <div className="progressBarAndNumber" onClick={toggleClicked}>
                <div className="progressBar">
                    <div style={{width: `${ratio}%`}} ref={progressRef} className="progressValue"></div>
                </div>
                <p className="progressNumber">{ratio}<small>%</small></p>
            </div>
        </div>
    );
};

export default ProgressContainer;