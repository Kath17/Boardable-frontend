/* eslint-disable react/prop-types */
import clsx from "clsx";
import Button from "../Button/Button";
import ColorPicker from "../ColorPicker/ColorPicker";
import s from "./Board.module.css";

function Board() {
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
  return (
    <div className={clsx(s.board, s.color_orange)}>
      <div className={s["form-field"]}>
        <label htmlFor="title">Board Title</label>
        <input type="text" id="title" />
      </div>
      <div className={s.board__bottom}>
        <div className={s.board__color}>
          <p>Color</p>
          {svgColor}
          <ColorPicker />
        </div>
        <Button size="sm">Create</Button>
      </div>
    </div>

    /*
    <div className={clsx(s.board, s["align-center"])}>
      <h1 className={s.board__title}>My board title</h1>
    </div>
    */
  );
}

export default Board;
