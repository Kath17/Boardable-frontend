/* eslint-disable no-unused-vars, react/no-unknown-property */
import * as React from "react";
import s from "./MyBoards.module.css";
import Board from "../Board/Board";

import { useRouteLoaderData } from "react-router-dom";
import BoardForm from "../BoardForm";

export default function MyBoards() {
  const { boards } = useRouteLoaderData("app");
  const [currentBoards, setCurrrentBoards] = React.useState(boards);

  function handleSortByChange(e) {
    let boardsCopy = [...currentBoards];

    if (e.target.value === "title") {
      boardsCopy.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else if (e.target.value === "date") {
      boardsCopy.sort((a, b) => {
        return new Date(a.created_date) - new Date(b.created_date);
      });
    }

    setCurrrentBoards(boardsCopy);
  }

  return (
    <div className={s.content}>
      <div>
        <h1 className={s.title}>My Boards</h1>
        <div className={s["form-field"]}>
          <label htmlFor="select">Sort By</label>
          <select type="text" id="select" onChange={handleSortByChange}>
            <option value="date">Created date</option>
            <option value="title">By title</option>
          </select>
        </div>
      </div>
      <div className={s.boards__list}>
        <BoardForm setCurrrentBoards={setCurrrentBoards} />
        {currentBoards.map((board) => {
          return <Board key={board.id} board={board} />;
        })}
      </div>
    </div>
  );
}
