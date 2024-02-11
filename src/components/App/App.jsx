/* eslint-disable no-unused-vars*/
import * as React from "react";
import s from "./App.module.css";
import Header from "../Header";
import { authProvider } from "../../auth";
import { Outlet, redirect, useActionData } from "react-router-dom";
import { createBoard, getBoards } from "../../services/boards";

async function loader({ request }) {
  if (!authProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }

  const username = localStorage.getItem("username");
  const boards = await getBoards(username);

  return { username, boards };
}

async function action({ request, loaderData }) {
  let formData = await request.formData();
  const boardData = Object.fromEntries(formData.entries());
  const { username } = loaderData;
  try {
    await createBoard(boardData, username);
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
