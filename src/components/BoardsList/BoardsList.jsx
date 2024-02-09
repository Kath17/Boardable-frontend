/* eslint-disable react/prop-types */
import s from "./BoardsList.module.css";

function BoardsList({ children }) {
  return <div className={s.boards__list}>{children}</div>;
}

export default BoardsList;
