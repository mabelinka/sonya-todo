import React from 'react';
import imgCompleted from "../assets/img-completed.svg";
import doneImg from "../assets/done.svg";
import {useRef} from "react";
import {useContext} from "react";
import {TodoContext} from "./TodoCtx";
import {useLocalStorage} from "../hooks/useLocalStorage";


const TodoItemCompleted = ({todo}) => {

    const animationRef = useRef(null)

    function startSlideOffAnimation(){
        const a = animationRef.current.animate([
            {transform: "translateY(0)",
                opacity: "1"
            },
            {transform: "translateY(50px)",
                opacity: "0"
            }
        ], {
            duration: 400,
            easing: "ease-in-out",
        })
        a.onfinish = function() {
            unToggleTodo(todo.id)
        }
    }

    const {unToggleTodo, deleteCompletedTodo} = useContext(TodoContext)

    function startDeleteAnimation(){
       const a = animationRef.current.animate([
            {opacity: 1, transform: 'translateY(0)'},
            {opacity: 0, transform: 'translateY(-40px)'}
        ],{
            duration: 500,
            easing: "ease-in",
            fill: "forwards"
        })
        return a
    }

    function deleteTodo(){
        startDeleteAnimation().onfinish = function (){
            deleteCompletedTodo(todo.id)
        }

    }

    return (
        <li
            className={"todoItem"}
            onDoubleClick={() => deleteTodo()}
            ref={animationRef}>
            <div
                className={todo.completed ?
                    "todoLeftPart completed" :
                    "todoLeftPart"}>
                <p className={
                    todo.completed ?
                        "todoTitle completed" :
                        "todoTitle"
                }
                >{todo.title}
                </p>
            </div>
            <img
                onClick={() => startSlideOffAnimation()}
                className="doneImg"
                src={todo.completed === true ? imgCompleted : doneImg}
                alt=""
            />
        </li>
    );
};

export default TodoItemCompleted;