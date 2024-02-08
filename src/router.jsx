import { createBrowserRouter } from "react-router-dom";
import Account from "./components/Account";
import App from "./components/App";
import Login from "./components/Login";
import MyBoards from "./components/MyBoards";
import Signup from "./components/Signup";
import SingleBoard from "./components/SingleBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <MyBoards />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/boards",
    element: <SingleBoard />,
  },
]);
