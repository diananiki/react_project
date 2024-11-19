import React, { useState, useEffect } from "react";
import './App.css';

function App() {
    const [list, setList] = useState<string[]>(() => {
        const savedList = localStorage.getItem('todoList');
        return savedList ? JSON.parse(savedList) : [];
    });
    const [task, setTask] = useState<string>('');
    const [check, setCheck] = useState<boolean[]>(() => {
        const savedCheck = localStorage.getItem('todoCheck');
        return savedCheck ? JSON.parse(savedCheck) : [];
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editTask, setEditedTask] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list));
        localStorage.setItem('todoCheck', JSON.stringify(check));
    }, [list, check]);

    const handleAddTask = () => {
        if (task.trim() !== '') {
            setList([...list, task]);
            setCheck([...check, false]);
            setTask('');
        }
    };

    const handleDeleteTask = (indexToDelete: number) => {
        setList(list.filter((_, index) => index !== indexToDelete));
        setCheck(check.filter((_, index) => index !== indexToDelete));
    };

    const handleCheck = (indexToCheck: number) => {
        setCheck(check.map((value, index) => index === indexToCheck ? !value : value));
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditedTask(list[index]);
    };

    const handleSaveEdit = (indexToEdit: number) => {
        setList(list.map((value, index) => index === indexToEdit ? editTask : value));
        setEditIndex(null);
        setEditedTask('');
    };

    return (
        <section>
            <div>
                <h1>To-do list</h1>
                <input
                    type="text"
                    value={task}
                    onChange={(event) => setTask(event.target.value)}
                />
                <button id="add" onClick={handleAddTask}>Add new task</button>
                <ol>
                    {list.map((item, index) => (
                        <li key={index}>
                            <button onClick={() => handleCheck(index)}>
                                {check[index] ? '✔️' : '❌'}
                            </button>
                            {editIndex === index ? (
                                <span>
                                    <input
                                        id = "input_text"
                                        type="text"
                                        value={editTask}
                                        onChange={(e) => setEditedTask(e.target.value)}
                                    />
                                    <button id="save" onClick={() => handleSaveEdit(index)}>Save</button>
                                    <button id="cancel" onClick={() => setEditIndex(null)}>Cancel</button>
                                </span>
                            ) : (
                                <span>
                                    <span id="text">{item}</span>
                                    <button id="edit" onClick={() => handleEdit(index)}>Edit</button>
                                    <button id="delete" onClick={() => handleDeleteTask(index)}>Delete</button>
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default App;