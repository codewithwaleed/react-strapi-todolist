import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  console.log(
    `${import.meta.env.VITE_REACT_APP_BACKEND}api/todos`,
    "backend url"
  );

  useEffect(() => {
    // update update the list of todos
    // when the component is rendered for the first time
    update();
  }, []);

  // This function updates the component with the
  // current todo data stored in the server
  function update() {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}api/todos`)
      .then((res) => res.json())
      .then((todo) => {
        setTodos(todo.data);
      });
  }

  // This function sends a new todo to the server
  // and then call the update method to update the
  // component
  function addTodo(e: any) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item,
      },
    };
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND}api/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(() => {
      setNewTodo("");
      update();
    });
  }

  return (
    <div className="app">
      <h1>Todo with Strapi Postgres and ReactJS</h1>
      <div className="box">
        {/* we centered the "main" tag in our style sheet*/}

        <div className="form_container">
          {/* This form collects the item we want to add to our todo, and sends it to the server */}
          <form className="form" onSubmit={addTodo}>
            <input
              type="text"
              className="todo_input"
              placeholder="Enter new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.currentTarget.value)}
            />
            <button type="submit" className="todo_button">
              Add todo
            </button>
          </form>
        </div>

        {/* This is a list view of all the todos in the "todo" state variable */}
        <div>
          {todos.map((todo) => {
            return <TodoItem todo={todo} key={todo.id} update={update} />;
          })}
        </div>
      </div>
    </div>
  );
}
export default App;
