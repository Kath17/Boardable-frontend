/* eslint-disable react/prop-types */
import s from "./CardsList.module.css";

function BoardsList({ children }) {
  return <div className={s.cards__list}>{children}</div>;
}

export default BoardsList;
