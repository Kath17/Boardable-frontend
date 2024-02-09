/* eslint-disable no-unused-vars, react/no-unknown-property */
import * as React from "react";
import s from "./MyBoards.module.css";
import Board from "../Board/Board";
import BoardsList from "../BoardsList/BoardsList";
import { useLoaderData } from "react-router-dom";
import BoardInput from "../BoardInput";

async function loader() {
  return [
    { id: 1, title: "Board 1", color: "#fef08a" },
    { id: 2, title: "Board 2", color: "#fecaca" },
    { id: 3, title: "Board 3", color: "#e2e8f0" },
    { id: 4, title: "Board 4", color: "#ddd6fe" },
    { id: 5, title: "Board 5", color: "#bfdbfe" },
    { id: 6, title: "Board 6", color: "#fbcfe8" },
  ];
}

export default function MyBoards() {
  //const boards = useLoaderData();
  const [boards, setBoards] = React.useState([]);

  let urlGet = `/api/Kat1/boards`;

  React.useEffect(() => {
    fetch(urlGet)
      .then((response) => response.json())
      .then((data) => setBoards(data.boards));
  }, []);

  return (
    <div className={s.content}>
      <div>
        <h1 className={s.title}>My Boards</h1>
        <div className={s["form-field"]}>
          <label htmlFor="select">Sort By</label>
          <select type="text" id="select">
            <option value="date">Created date</option>
            <option value="title">By title</option>
          </select>
        </div>
      </div>
      <BoardsList>
        <BoardInput setBoards={setBoards} />
        {boards.map((board) => {
          return <Board key={board.id} board={board} />;
        })}
      </BoardsList>
    </div>
  );
}

MyBoards.loader = loader;
