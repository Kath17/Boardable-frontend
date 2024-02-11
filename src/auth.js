import { URL_BASE, tokenKey } from "./constants";

const savedToken = window.localStorage.getItem(tokenKey);

export const authProvider = {
  isAuthenticated: savedToken !== null,
  token: savedToken,

  async login(username, password) {
    const url = URL_BASE + "/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      authProvider.isAuthenticated = true;
      authProvider.token = body.data.token;
      window.localStorage.setItem(tokenKey, body.data.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  },

  async updateUser(userData, username) {
    const url = URL_BASE + `/update/${username}`;
    const token = window.localStorage.getItem(tokenKey);

    const options = {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      authProvider.isAuthenticated = true;
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  },

  async signup(username, password) {
    const url = URL_BASE + "/signup";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const body = await response.json();
      authProvider.isAuthenticated = true;
      authProvider.token = body.data.token;
      window.localStorage.setItem(tokenKey, body.data.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  },

  logout() {
    window.localStorage.removeItem(tokenKey);
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("isLoggedIn");

    authProvider.isAuthenticated = false;
    authProvider.token = null;
  },
};
