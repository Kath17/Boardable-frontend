/* eslint-disable react/prop-types */

import Board from "../Board/Board";
import s from "./BoardsList.module.css";

function BoardsList() {
  return (
    <div className={s.boards__list}>
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </div>
  );
}

export default BoardsList;
