import React from 'react';
import imgCompleted from "../assets/img-completed.svg";
import doneImg from "../assets/done.svg";
import TodoItem from "./TodoItem";

const TodoList = ({todos}) => {
    return (

        <ul className="list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo}/>
            ))}
        </ul>

    );
};

export default TodoList;