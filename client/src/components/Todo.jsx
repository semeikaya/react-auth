import React from "react";

const Todo = ({handleRemove, makeMark, todos }) => {
  return (
    <ul className="list">
      {todos.map((todo, index) => {
        return (
          <li className={todo.completed ? "mark" : "nonmark"} key={index}>
            <div className={todo.completed ? "selected" : "nonselected"}>
              <button className="fav" onClick={() => makeMark(todo._id)}>
                ❤
              </button>
            </div>
            <div className="text">{todo.title}</div>
            <div>
              <button
                className="removeBtn"
                onClick={() => handleRemove(todo._id)}
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Todo;
