/* eslint-disable react/prop-types */
import clsx from "clsx";
import s from "./ColorPicker.module.css";

const colors = [
  "#e2e8f0",
  "#fecaca",
  "#fed7aa",
  "#fef08a",
  "#d9f99d",
  "#bfdbfe",
  "#fbcfe8",
  "#ddd6fe",
];

function ColorPicker({ setColor, setShowColorPicker, id }) {
  function handlerPickColor(color) {
    setColor(color);
    setShowColorPicker(false);
    //const newColor = { color: color };

    if (id !== "") {
      //   console.log(id);
      //   let optionsPatch = {
      //     method: "PATCH",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newColor),
      //   };
      //   fetch(url, optionsPatch)
      //     .then((response) => response.json)
      //     .then(() => handleUpdate());
    }
  }

  return (
    <ul className={s.picker__container}>
      {colors.map((color) => (
        <li
          key={color}
          onClick={() => handlerPickColor(color)}
          className={clsx(
            {
              [s[`color_${color.substring(1).toUpperCase()}`]]: color,
            },
            s.picker__color
          )}
        ></li>
      ))}
    </ul>
  );
}

export default ColorPicker;
