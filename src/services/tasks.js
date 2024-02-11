import { redirect } from "react-router-dom";
import { authProvider } from "../auth";
import { URL_BASE, tokenKey } from "../constants";

export async function getTasks(username, boardId, cardId) {
  const token = authProvider.token;

  const url = `${URL_BASE}/${username}/boards/${boardId}/cards/${cardId}/tasks`;
  const options = {
    headers: {
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.tasks;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function createTask(taskData, username, boardId, cardId) {
  const url = `${URL_BASE}/${username}/boards/${boardId}/cards/${cardId}/tasks`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "POST",
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.task;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function updateTask(
  taskData,
  username,
  board_id,
  card_id,
  task_id
) {
  const url = `${URL_BASE}/${username}/boards/${board_id}/cards/${card_id}/tasks/${task_id}`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "PATCH",
    body: JSON.stringify(taskData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.task;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}

export async function deleteTask(username, board_id, card_id, task_id) {
  const url = `${URL_BASE}/${username}/boards/${board_id}/cards/${card_id}/tasks/${task_id}`;
  const token = window.localStorage.getItem(tokenKey);

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token}`,
    },
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const body = await response.json();
    return body.ok;
  }

  if (response.status === 401) {
    authProvider.logout();
    throw redirect("/login");
  }

  const body = await response.json();
  return Promise.reject(new Error(body.error));
}
