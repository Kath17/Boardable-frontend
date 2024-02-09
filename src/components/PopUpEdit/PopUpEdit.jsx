/* eslint-disable react/prop-types */
import s from "./PopUpEdit.module.css";

function PopUpEdit() {
  return (
    <div className={s.card__container}>
      <p className={s.card__text}>Edit</p>
      <p className={s.card__text}>Delete</p>
    </div>
  );
}

export default PopUpEdit;
