/* eslint-disable react/prop-types */
import * as React from "react";
import clsx from "clsx";
import s from "./Card.module.css";
import PopUpEdit from "../PopUpEdit";
import Task from "../Task/Task";
import TaskForm from "../TaskForm";
import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { getTasks } from "../../services/tasks";
import { deleteCard, updateCard } from "../../services/cards";

export default function Card({ card, boardId }) {
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

  const [tasks, setTasks] = React.useState([]);
  const [showEdit, setShowEdit] = React.useState(false);

  const [isBeingEdited, setIsBeingEdited] = React.useState(false);
  let [cardTitle, setCardTitle] = React.useState(card.title);
  let [originalTitle, setOriginalTitle] = React.useState(card.title);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getTasks(username, boardId, card.id);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [username, boardId, card.id]);

  function handlerEdit() {
    setIsBeingEdited(!isBeingEdited);
    setShowEdit(!showEdit);
  }

  function handlerCancel() {
    setIsBeingEdited(false);
    setShowEdit(!showEdit);
    setCardTitle(originalTitle);
  }

  async function handlerDelete() {
    await deleteCard(username, boardId, card.id);
    navigate(0);
  }

  async function handleEditCardTitle(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsBeingEdited(false);
      setCardTitle(e.target.value);
      setOriginalTitle(e.target.value);

      const cardData = { title: cardTitle };
      await updateCard(cardData, username, boardId, card.id);
    }
  }

  return (
    <div className={s.card}>
      <div className={clsx(s.card__slot, s["padding-right"])}>
        {isBeingEdited ? (
          <input
            id="card-title"
            type="text"
            className={s.card__title}
            placeholder={"Ingrese un título"}
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onKeyDown={handleEditCardTitle}
          />
        ) : (
          <h1 className={clsx(s.card__title, s["padding-left"])}>
            {cardTitle}
          </h1>
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
      {tasks.map((item) => {
        return (
          <Task key={item.id} item={item} boardId={boardId} cardId={card.id} />
        );
      })}
      <TaskForm setTasks={setTasks} boardId={boardId} cardId={card.id} />
    </div>
  );
}
