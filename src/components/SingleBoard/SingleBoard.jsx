import * as React from "react";
import s from "./SingleBoard.module.css";
import Card from "../Card";
import CardsList from "../CardsList";
import PopUpEdit from "../PopUpEdit";
import Button from "../Button";
import { useLoaderData } from "react-router-dom";

async function loader() {
  return [
    {
      id: 1,
      title: "To do",
      list: [{ id: 1, body: "Mi otra tarjeta" }],
    },
    {
      id: 2,
      title: "Doing",
      list: [
        { id: 2, body: "Mi primera tarjeta" },
        { id: 3, body: "Mi segunda tarjeta" },
        { id: 4, body: "Mi tercera tarjeta" },
      ],
    },
    {
      id: 3,
      title: "Done",
      list: [
        { id: 5, body: "Mi primera tarjeta" },
        { id: 6, body: "Mi segunda tarjeta" },
      ],
    },
    {
      id: 4,
      title: "New List",
      list: [{ id: 7, body: "Mi primera tarjeta" }],
    },
  ];
}

function SingleBoard() {
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

  const cards = useLoaderData();
  const [showEdit, setShowEdit] = React.useState(false);
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);
  const [isBeingDeleted, setIsBeingDeleted] = React.useState(false);
  let [title, setTitle] = React.useState("My Board Title");
  let [originalTitle, setOriginalTitle] = React.useState("My Board Title");

  React.useEffect(() => {
    setOriginalTitle(originalTitle);
  }, [originalTitle]);

  function handlerClickEdit() {
    setShowEdit(!showEdit);
  }

  function handleChangeTitle(e) {
    const newTitle = e.target.value;
    setTitle(newTitle);
  }

  function handlerEdit() {
    setIsBeingEdited(!isBeingEdited);
    setShowEdit(!showEdit);
  }

  function handlerDelete() {
    setIsBeingDeleted(true);
  }

  function handlerCancel() {
    setIsBeingDeleted(false);
    setIsBeingEdited(false);
    setShowEdit(!showEdit);
    setTitle(originalTitle);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsBeingEdited(false);
      setTitle(e.target.value);
      setOriginalTitle(e.target.value);
    }
  }

  console.log("isBeingDeleted: ", isBeingDeleted);

  return (
    <div className={s.content}>
      <div className={s.title}>
        {isBeingEdited ? (
          <input
            id="board-title"
            type="text"
            className={s.title__text}
            placeholder={"Ingrese un título"}
            value={title}
            onChange={handleChangeTitle}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <h1 className={s.title__text}>{title}</h1>
        )}
        <div className={s["position-relative"]}>
          <div className={s.title__points} onClick={handlerClickEdit}>
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
      <CardsList>
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}

        <div className={s.card}>
          <div className={s["form-field"]}>
            <label htmlFor="card-title">List Title</label>
            <input type="text" id="card-title" />
          </div>
          <div className={s.card__buttons}>
            <Button size="sm">Create new list</Button>
          </div>
        </div>
      </CardsList>
    </div>
  );
}

export default SingleBoard;

SingleBoard.loader = loader;
