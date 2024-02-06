/* eslint-disable no-unused-vars*/
import * as React from "react";
import s from "./App.module.css";
import Login from "../Login/Login";

const navigation = [
  {
    name: "Login",
    to: "/login",
  },
  {
    name: "Signup",
    to: "/signup",
  },
];

function App() {
  const [page, setPage] = React.useState("/");
  React.useEffect(() => {
    setPage("/login");
  }, []);

  return (
    <div className={s.container}>
      {page === "/login" && <Login />}
      {page === "/signup" && <></>}
    </div>
  );
}

export default App;
