/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import s from "./BoardInput.module.css";
import clsx from "clsx";

function BoardInput() {
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

  const [color, setColor] = useState("#FFFFFF");
  const [showColor, setShowColor] = useState(false);

  const colorBoard = color.substring(1).toUpperCase();

  function handlerClickColor() {
    setShowColor(!showColor);
  }

  return (
    <div
      className={clsx(s.board, {
        [s[`color_${colorBoard}`]]: colorBoard,
      })}
    >
      <div className={s["form-field"]}>
        <label htmlFor="title">Board Title</label>
        <input type="text" id="title" />
      </div>
      <div className={s.board__bottom}>
        <div className={s["position-relative"]}>
          <div className={s.board__color} onClick={handlerClickColor}>
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
    </div>
  );
}

export default BoardInput;
