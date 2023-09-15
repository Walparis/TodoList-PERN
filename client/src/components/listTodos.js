import React, {Fragment, useEffect, useState}  from "react";
import EditTodo from "./editTodo";


const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    //delete todo function
    const deleteTodo = async (todo_id) => {
        try{
            const deleteTodo = await fetch(`http://localhost:5000/todos/${todo_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setTodos(todos.filter(todo => todo.todo_id!== todo_id));
        }catch(err){
            console.error(err.message);
        }
            console.log(deleteTodo);
    }

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) { 
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return(
        <Fragment>
            <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {/*
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                */}
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td> {todo.description} </td>
                        <td><EditTodo todo={todo}/></td>
                        <td><button className="btn btn-danger"
                         onClick={() => deleteTodo(todo.todo_id)}
                         >
                            Delete
                            </button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListTodos;
