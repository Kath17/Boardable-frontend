/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "../Button/Button";
import s from "./TaskForm.module.css";

function TaskForm({ setTasks }) {
  const [task, setTask] = React.useState("");
  const [showAddCard, setShowAddCard] = React.useState(false);
  let urlGetTasks = `/api/Kat2/boards/1/cards/1/tasks`;

  function handleUpdate() {
    fetch(urlGetTasks)
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newTask = { task };

    let options = {
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(urlGetTasks, options)
      .then((response) => response.json())
      .then(() => handleUpdate());

    setTask("");
    setShowAddCard(false);
  }

  return (
    <>
      {showAddCard && (
        <form className={s.card__content} onSubmit={handleSubmit}>
          <div className={s["form-field"]}>
            <label htmlFor="task">Card Title</label>
            <input
              type="text"
              id="task"
              placeholder="New Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className={s.card__buttons}>
            <Button type="submit" size="sm">
              Add card
            </Button>
            <Button
              type="button"
              onClick={() => setShowAddCard(!showAddCard)}
              size="sm"
              variant="secondary"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {!showAddCard && (
        <div
          onClick={() => setShowAddCard(!showAddCard)}
          className={s["card__add-button"]}
        >
          + Add a card
        </div>
      )}
    </>
  );
}

export default TaskForm;
