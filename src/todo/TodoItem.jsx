import React, {useContext, useRef} from 'react';
import imgCompleted from "../assets/img-completed.svg";
import doneImg from "../assets/done.svg";
import {TodoContext} from "./TodoCtx";

const TodoItem = ({todo}) => {

    const {toggleTodo} = useContext(TodoContext)

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
            duration: 500,
            easing: "ease-in",
            fill: "forwards"
        })

        a.onfinish = function() {
            toggleTodo(todo.id)
        }
    }

    return (
        <li ref={animationRef} className={"todoItem"}>
            <div
                className={todo.completed ?
                "todoLeftPart completed" :
                "todoLeftPart"}>
                <p
                    className={
                        todo.completed ?
                        "todoTitle completed" :
                        "todoTitle"
                    }>
                    {todo.title}
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

export default TodoItem;