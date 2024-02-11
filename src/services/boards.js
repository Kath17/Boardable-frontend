import { redirect } from "react-router-dom";
import { authProvider } from "../auth";
import { URL_BASE, tokenKey } from "../constants";

export async function getBoards(username) {
  const token = authProvider.token;

  const url = `${URL_BASE}/${username}/boards`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.boards;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function getBoard(username, boardId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/${username}/boards/${boardId}`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.board;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function createBoard(boardData, username) {
  const url = `${URL_BASE}/${username}/boards`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "POST",
    body: JSON.stringify(boardData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.data;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}
