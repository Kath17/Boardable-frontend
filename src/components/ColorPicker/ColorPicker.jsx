/* eslint-disable react/prop-types */
import s from "./ColorPicker.module.css";

function ColorPicker() {
  function handlerPickColor(color) {
    console.log(color);
    //setColor(color);
  }

  return (
    // <div className={s.picker__container}>
    <ul className={s.picker__container}>
      <li
        onClick={() => handlerPickColor("#e2e8f0")}
        className={s.picker__color}
      ></li>
      <li
        onClick={() => handlerPickColor("#fecaca")}
        className={s.picker__color}
      ></li>
      <li
        onClick={() => handlerPickColor("#fed7aa")}
        className={s.picker__color}
      ></li>
      <li
        onClick={() => handlerPickColor("#fef08a")}
        className={s.picker__color}
      ></li>
      <li
        onClick={() => handlerPickColor("#d9f99d")}
        className={s.picker__color}
      ></li>{" "}
      <li
        onClick={() => handlerPickColor("#bfdbfe")}
        className={s.picker__color}
      ></li>
      <li
        onClick={() => handlerPickColor("#fbcfe8")}
        className={s.picker__color}
      ></li>
      <li
        onClick={() => handlerPickColor("#ddd6fe")}
        className={s.picker__color}
      ></li>
    </ul>
    // </div>
  );
}

export default ColorPicker;
