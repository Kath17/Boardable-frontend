/* eslint-disable react/prop-types */
import s from "./PopUpEdit.module.css";

function PopUpEdit({
  isBeingEdited,
  handlerDelete,
  handlerEdit,
  handlerCancel,
}) {
  return (
    <div className={s.card__container}>
      {isBeingEdited ? (
        <p className={s.card__text} onClick={handlerCancel}>
          Cancel
        </p>
      ) : (
        <p className={s.card__text} onClick={handlerEdit}>
          Edit
        </p>
      )}
      <p className={s.card__text} onClick={handlerDelete}>
        Delete
      </p>
    </div>
  );
}

export default PopUpEdit;
