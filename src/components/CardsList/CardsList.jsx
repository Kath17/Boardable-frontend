/* eslint-disable react/prop-types */

import Card from "../Card/Card";
import s from "./CardsList.module.css";

function BoardsList() {
  return (
    <div className={s.cards__list}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default BoardsList;
