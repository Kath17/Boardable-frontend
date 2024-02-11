import { redirect } from "react-router-dom";
import { authProvider } from "../auth";
import { URL_BASE, tokenKey } from "../constants";

export async function getCards(username, boardId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/${username}/boards/${boardId}/cards`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.cards;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function createCard(cardData, username, boardId) {
  const url = `${URL_BASE}/${username}/boards/${boardId}/cards`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "POST",
    body: JSON.stringify(cardData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.card;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}
