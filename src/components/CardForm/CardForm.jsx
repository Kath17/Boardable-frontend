/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "../Button/Button";
import s from "./CardForm.module.css";
import { useRouteLoaderData } from "react-router-dom";
import { createCard, getCards } from "../../services/cards";

function CardForm({ setCurrrentCards, boardId }) {
  const { username } = useRouteLoaderData("app");
  const [title, setTitle] = React.useState("");

  async function handleUpdate() {
    const cards = await getCards(username, boardId);
    setCurrrentCards(cards);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const bodyCard = { title };
    await createCard(bodyCard, username, boardId);

    handleUpdate();
    setTitle("");
  }

  return (
    <form className={s.card} onSubmit={handleSubmit}>
      <div className={s["form-field"]}>
        <label htmlFor="card-title">List Title</label>
        <input
          type="text"
          id="card-title"
          placeholder="New List"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Button size="sm">Create new list</Button>
      </div>
    </form>
  );
}

export default CardForm;
