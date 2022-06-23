import React, { useState, useEffect } from 'react'
import './style.css'

const getlocalStorageData = () => {
    const list = localStorage.getItem("todolist");

    if (list) {
        return JSON.parse(list);
    } else {
        return [];
    }
}

const Todo = () => {
    const [todo, setTodo] = useState("");
    const [Tlist, setTlist] = useState(getlocalStorageData());
    const [EditedItems, setEditedItems] = useState("");
    const [value, setValue] = useState(true);

    useEffect(() => {
        localStorage.setItem("todolist", JSON.stringify(Tlist));
    }, [Tlist]);

    const setVal = () => {
        if (!todo) {
            alert("Please write something!");
        }
        else if (todo && !value) {
            setTlist(
                Tlist.map((ele) => {
                    if (ele.id === EditedItems) {
                        return { ...ele, name: todo };
                    } else {
                        return ele;
                    }
                })
            );
            setTodo("");
            setEditedItems("");
            setValue(true);
        }
        else {
            const newdata = {
                id: new Date().getTime().toString(),
                name: todo,
            };
            setTlist([...Tlist, newdata]);
            setTodo("");
        }

    };

    const deleteTodo = (itemId) => {
        const updatedItem = Tlist.filter((ele) => {
            return ele.id != itemId;
        });
        setTlist(updatedItem);
    };

    const removeAllTodos = () => {
        setTlist([]);
    }

    const editItem = (itemId) => {
        const editedItem = Tlist.find((ele) => {
            return ele.id === itemId;
        });
        setTodo(editedItem.name);
        setEditedItems(itemId);
        setValue(false);
    }
    return (
        <div className="container">
            <div className='header'>
                <h2>My Todo List.</h2>
            </div>
            <div className='todos'>
                <div className='input'><input type="text" name="todo" placeholder='Type..' value={todo} onChange={(e) => { setTodo(e.target.value) }}></input>
                    {value ? <i className="fa-duotone fa-plus " onClick={setVal}></i> : <i className="fa-solid fa-pen-to-square edit" onClick={setVal}></i>}
                </div>

                {Tlist.map((TODOS) => {
                    return (
                        <div className='Todo' key={TODOS.id}>
                            <section className='TODO'>
                                <h3>{TODOS.name}</h3>
                                <div className="Icon">
                                    <i className="fa-solid fa-pen-to-square" onClick={() => { editItem(TODOS.id) }}></i><span><i className="fa-solid fa-trash" onClick={() => deleteTodo(TODOS.id)}></i></span></div>
                            </section>
                        </div>
                    )
                })}
                <div className='btn'>
                    <button type='button' onClick={removeAllTodos}>Clear All</button>
                </div>
            </div>
        </div>
    )
}

export default Todo