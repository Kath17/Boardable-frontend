/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "../Button/Button";
import s from "./TaskForm.module.css";
import { createTask, getTasks } from "../../services/tasks";
import { useRouteLoaderData } from "react-router-dom";

function TaskForm({ setTasks, boardId, cardId }) {
  const { username } = useRouteLoaderData("app");

  const [task, setTask] = React.useState("");
  const [showAddCard, setShowAddCard] = React.useState(false);

  async function handleUpdate() {
    const tasks = await getTasks(username, boardId, cardId);
    setTasks(tasks);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newTask = { task };
    await createTask(newTask, username, boardId, cardId);

    handleUpdate();
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
