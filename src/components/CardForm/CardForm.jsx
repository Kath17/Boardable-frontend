/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "../Button/Button";
import s from "./CardForm.module.css";

function CardForm({ setCurrrentCards }) {
  const [title, setTitle] = React.useState("");

  function handleUpdate() {
    let urlGetCards = `/api/Kat2/boards/1/cards`;
    fetch(urlGetCards)
      .then((response) => response.json())
      .then((data) => setCurrrentCards(data.cards));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newCard = { title };

    let urlGetCards = `/api/Kat2/boards/1/cards`;
    let options = {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(urlGetCards, options)
      .then((response) => response.json())
      .then(() => handleUpdate());

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
