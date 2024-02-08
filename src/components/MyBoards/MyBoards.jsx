/* eslint-disable no-unused-vars, react/no-unknown-property */
import * as React from "react";
import s from "./MyBoards.module.css";
import Board from "../Board/Board";
import BoardsList from "../BoardsList/BoardsList";

const navigation = [
  {
    name: "Color Game",
    to: "/color-game",
  },
  {
    name: "Doable",
    to: "/doable",
  },
];

function MyBoards() {
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
        <Board />
        <Board />
        <Board />
      </BoardsList>
    </div>
  );
}

export default MyBoards;
