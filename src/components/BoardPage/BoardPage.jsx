import * as React from "react";
import s from "./BoardPage.module.css";
import Card from "../Card";
import PopUpEdit from "../PopUpEdit";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import CardForm from "../CardForm";
import { authProvider } from "../../auth";
import { getCards } from "../../services/cards";
import { deleteBoard, getBoard, updateBoard } from "../../services/boards";

async function loader({ request }) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const boardId = pathname.substring(pathname.lastIndexOf("/") + 1);

  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", pathname);
    return redirect("/login?" + params.toString());
  }

  const username = localStorage.getItem("username");
  const cards = await getCards(username, boardId);
  const board = await getBoard(username, boardId);

  return { cards, board };
}

export default function BoardPage() {
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

  const { cards, board } = useLoaderData();
  const { username } = useRouteLoaderData("app");
  const navigate = useNavigate();

  const [currentCards, setCurrrentCards] = React.useState(cards);
  const [boardTitle, setBoardTitle] = React.useState(board.title);
  const [originalTitle, setOriginalTitle] = React.useState(board.title);

  const [showEdit, setShowEdit] = React.useState(false);
  const [isBeingEdited, setIsBeingEdited] = React.useState(false);

  function handlerEdit() {
    setIsBeingEdited(!isBeingEdited);
    setShowEdit(!showEdit);
  }

  function handlerCancel() {
    setIsBeingEdited(false);
    setShowEdit(!showEdit);
    setBoardTitle(originalTitle);
  }

  async function handlerDelete() {
    await deleteBoard(username, board.id);
    navigate("/");
    navigate(0);
  }

  async function handleEditBoardTitle(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsBeingEdited(false);
      setBoardTitle(e.target.value);
      setOriginalTitle(e.target.value);
      navigate(0);

      const boardData = { title: boardTitle };
      await updateBoard(boardData, username, board.id);
    }
  }

  return (
    <div className={s.content}>
      <div className={s.title}>
        {isBeingEdited ? (
          <input
            id="board-title"
            type="text"
            className={s.title__text}
            placeholder={"Ingrese un título"}
            value={boardTitle}
            onChange={(e) => {
              setBoardTitle(e.target.value);
            }}
            onKeyDown={handleEditBoardTitle}
          />
        ) : (
          <h1 className={s.title__text}>{boardTitle}</h1>
        )}
        <div className={s["position-relative"]}>
          <div
            className={s.title__points}
            onClick={() => {
              setShowEdit(!showEdit);
            }}
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
      <div className={s.cards__list}>
        {currentCards.map((card) => (
          <Card key={card.id} card={card} boardId={board.id} />
        ))}
        <CardForm setCurrrentCards={setCurrrentCards} boardId={board.id} />
      </div>
    </div>
  );
}

BoardPage.loader = loader;
