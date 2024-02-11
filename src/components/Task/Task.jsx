/* eslint-disable react/prop-types */
import * as React from "react";
import PopUpEdit from "../PopUpEdit";
import s from "./Task.module.css";
import { useState } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { deleteTask, updateTask } from "../../services/tasks";

function Task({ item, boardId, cardId }) {
  const svgPoints = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
        stroke="#525252"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
        stroke="#525252"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
        stroke="#525252"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const { username } = useRouteLoaderData("app");
  const navigate = useNavigate();

  const [showEdit, setShowEdit] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);
  let [taskContent, setTaskContent] = React.useState(item.task);
  let [originalContent, setOriginalContent] = React.useState(item.task);

  function handlerEdit() {
    setIsBeingEdited(!isBeingEdited);
    setShowEdit(!showEdit);
  }

  function handlerCancel() {
    setIsBeingEdited(false);
    setShowEdit(!showEdit);
    setTaskContent(originalContent);
  }

  async function handlerDelete() {
    await deleteTask(username, boardId, cardId, item.id);
    navigate(0);
  }

  async function handleEditTaskContent(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsBeingEdited(false);
      setTaskContent(e.target.value);
      setOriginalContent(e.target.value);

      const taskData = { task: taskContent };
      await updateTask(taskData, username, boardId, cardId, item.id);
    }
  }

  return (
    <div className={s.card__content}>
      <div className={s.card__slot}>
        {isBeingEdited ? (
          <input
            id="board-title"
            type="text"
            className={s.card__text}
            placeholder={"Nuevo contenido"}
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            onKeyDown={handleEditTaskContent}
          />
        ) : (
          <p className={s.card__text}>{taskContent}</p>
        )}
        <div className={s["position-relative"]}>
          <div
            className={s.card__points}
            onClick={() => setShowEdit(!showEdit)}
          >
            {svgPoints}
          </div>
          {showEdit && (
            <PopUpEdit
              isBeingEdited={isBeingEdited}
              handlerDelete={handlerDelete}
              handlerEdit={handlerEdit}
              handlerCancel={handlerCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
