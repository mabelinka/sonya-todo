import React, {useState} from 'react';
import btnAdd from "../assets/add-button.svg";
import todo from "../todo/Todo";

const InputAdd = ({addNewTodo, db}) => {

    const [title, setTitle] = useState('')

    return (
        <div className="inputAdd">
            <div onClick={() => {
                addNewTodo(title)
                setTitle('')
            }} className="buttonAddContainer">
                <img
                    className="btnAdd" src={btnAdd} alt=""/>
            </div>
            <input
                ref={input => input && input.focus()}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter'){
                        addNewTodo(title)
                        setTitle('')
                    }
                    return
                }}
                className="inputText"
                type="text"
                placeholder="Add todo.."
            />
        </div>
    );
};

export default InputAdd;