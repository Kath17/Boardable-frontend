/* eslint-disable react/prop-types */
import * as React from "react";
import clsx from "clsx";
import s from "./Card.module.css";
import Button from "../Button/Button";
import PopUpEdit from "../PopUpEdit";
import { useState } from "react";
import Task from "../Task/Task";

export default function Card({ card }) {
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

  const list = card.list;
  const [showEdit, setShowEdit] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = React.useState(false);
  let [cardTitle, setCardTitle] = React.useState(card.title);
  let [originalTitle, setOriginalTitle] = React.useState(card.title);

  console.log("isBeingDeleted: ", isBeingDeleted);

  React.useEffect(() => {
    setOriginalTitle(originalTitle);
  }, [originalTitle]);

  function handlerClickEdit() {
    setShowEdit(!showEdit);
  }

  function handlerAddCard() {
    setShowAddCard(!showAddCard);
  }

  function handlerEdit() {
    setIsBeingEdited(!isBeingEdited);
    setShowEdit(!showEdit);
  }

  function handleChangeTitle(e) {
    const newTitle = e.target.value;
    setCardTitle(newTitle);
  }

  function handlerDelete() {
    setIsBeingDeleted(true);
  }

  function handlerCancel() {
    setIsBeingDeleted(false);
    setIsBeingEdited(false);
    setShowEdit(!showEdit);
    setCardTitle(originalTitle);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsBeingEdited(false);
      setCardTitle(e.target.value);
      setOriginalTitle(e.target.value);
    }
  }

  return (
    <div className={s.card}>
      <div className={clsx(s.card__slot, s["padding-right"])}>
        {isBeingEdited ? (
          <input
            id="board-title"
            type="text"
            className={s.card__title}
            placeholder={"Ingrese un título"}
            value={cardTitle}
            onChange={handleChangeTitle}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <h1 className={clsx(s.card__title, s["padding-left"])}>
            {cardTitle}
          </h1>
        )}
        <div className={s["position-relative"]}>
          <div className={s.card__points} onClick={handlerClickEdit}>
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
      {list.map((item) => {
        return <Task key={item.id} item={item} />;
      })}

      {showAddCard && (
        <div className={s.card__content}>
          <div className={s["form-field"]}>
            <label htmlFor="card-title">Card Title</label>
            <input type="text" id="card-title" />
          </div>
          <div className={s.card__buttons}>
            <Button size="sm">Add card</Button>
            <Button onClick={handlerAddCard} size="sm" variant="secondary">
              Cancel
            </Button>
          </div>
        </div>
      )}
      {!showAddCard && (
        <div
          onClick={handlerAddCard}
          className={clsx(s["padding-inline"], s["card__add-button"])}
        >
          + Add a card
        </div>
      )}
    </div>
  );
}
