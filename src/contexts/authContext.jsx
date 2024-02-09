import * as React from "react";
import { URL_BASE, tokenKey } from "../constants";

const authContext = React.createContext({
  token: null,
  login: () => {},
  logout: () => {},
});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function login(username, password) {
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
      setToken(body.token);
      window.localStorage.setItem(tokenKey, body.token);
    } else {
      const error = await response.json();
      throw new Error(error);
    }
  }

  function logout() {
    setToken(null);
    window.localStorage.removeItem(tokenKey);
  }

  return (
    <authContext.Provider value={{ token, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  return React.useContext(authContext);
}

AuthProvider.useAuth = useAuth;
