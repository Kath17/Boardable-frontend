/* eslint-disable react/prop-types */
import clsx from "clsx";
import s from "./Board.module.css";
import { Link } from "react-router-dom";

function Board({ board }) {
  const board_color = board.color.substring(1).toUpperCase();
  const boardClass = clsx(
    {
      [s[`color_${board_color}`]]: board.color,
    },
    s.board
  );

  return (
    <Link to={`/boards/${board.id}`} className={boardClass}>
      <h1 className={s.board__title}>{board.title}</h1>
    </Link>
  );
}

export default Board;
