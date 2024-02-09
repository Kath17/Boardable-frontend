/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "../Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import s from "./BoardInput.module.css";
import clsx from "clsx";

function BoardInput({ setBoards }) {
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

  const [color, setColor] = React.useState("#e2e8f0");
  const [showColor, setShowColor] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const colorBoard = color.substring(1).toUpperCase();

  let urlGet = `/api/Kat1/boards`;

  function handleUpdate() {
    fetch(urlGet)
      .then((response) => response.json())
      .then((data) => setBoards(data.boards));
    setColor("#e2e8f0");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newBoard = { title, color };
    console.log(newBoard);

    let options = {
      method: "POST",
      body: JSON.stringify(newBoard),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(urlGet, options)
      .then((response) => response.json())
      .then(() => handleUpdate());

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

export default BoardInput;
