/* eslint-disable no-unused-vars*/
import * as React from "react";
import s from "./App.module.css";
import Header from "../Header";
import { authProvider } from "../../auth";
import { Outlet, redirect, useActionData } from "react-router-dom";
import { createBoard, getBoards, getUser } from "../../temp";

//export const PageContext = React.createContext();

async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const [username, notes] = await Promise.all([getUser(), getBoards()]);
  const activeNotes = notes.filter((note) => !note.deleted);
  const deletedNotes = notes.filter((note) => note.deleted);

  return { username, activeNotes, deletedNotes };
}

async function action({ request }) {
  let formData = await request.formData();
  const noteData = Object.fromEntries(formData.entries());
  try {
    await createBoard(noteData);
    return redirect("/");
  } catch (error) {
    return { error: error.message };
  }
}

export default function App() {
  const actionData = useActionData();

  return (
    <div className={s.container}>
      <Header />
      <main className={s.main}>
        <Outlet context={actionData?.error} />
      </main>
    </div>
  );
}

App.loader = loader;
App.action = action;
