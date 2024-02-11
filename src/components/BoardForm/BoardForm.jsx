/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "../Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import s from "./BoardForm.module.css";
import clsx from "clsx";
import { createBoard, getBoards } from "../../services/boards";
import { useRouteLoaderData } from "react-router-dom";

function BoardForm({ setCurrrentBoards }) {
  const svgColor = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="11.5" fill="#E2E8F0" stroke="#525252" />
    </svg>
  );

  const { username } = useRouteLoaderData("app");

  const [color, setColor] = React.useState("#e2e8f0");
  const [showColor, setShowColor] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const colorBoard = color.substring(1).toUpperCase();

  async function handleUpdate() {
    const boards = await getBoards(username);
    setCurrrentBoards(boards);
    setColor("#e2e8f0");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const boardData = { title, color };
    await createBoard(boardData, username);

    handleUpdate();
    setTitle("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(s.board, {
        [s[`color_${colorBoard}`]]: colorBoard,
      })}
    >
      <div className={s["form-field"]}>
        <label htmlFor="title">Board Title</label>
        <input
          type="text"
          id="title"
          placeholder="New Board"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={s.board__bottom}>
        <div className={s["position-relative"]}>
          <div
            className={s.board__color}
            onClick={() => {
              setShowColor(!showColor);
            }}
          >
            <p>Color</p>
            {svgColor}
          </div>
          {showColor && (
            <ColorPicker
              setColor={setColor}
              setShowColorPicker={setShowColor}
              id={1}
            />
          )}
        </div>
        <Button size="sm">Create</Button>
      </div>
    </form>
  );
}

export default BoardForm;
