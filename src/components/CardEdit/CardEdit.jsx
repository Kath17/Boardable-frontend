/* eslint-disable react/prop-types */
import s from "./CardEdit.module.css";

function CardEdit() {
  return (
    <div className={s.card__container}>
      <p className="card__text">Edit</p>
      <p className="card__text">Delete</p>
    </div>
  );
}

export default CardEdit;
