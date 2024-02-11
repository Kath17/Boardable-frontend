import { createBrowserRouter } from "react-router-dom";
import Account from "./components/Account";
import App from "./components/App";
import Login from "./components/Login";
import MyBoards from "./components/MyBoards";
import Signup from "./components/Signup";
import { action as logoutAction } from "./routes/logout";
import BoardPage from "./components/BoardPage/BoardPage";

export const router = createBrowserRouter([
  {
    id: "app",
    path: "/",
    element: <App />,
    loader: App.loader,
    action: App.action,
    children: [
      {
        index: true,
        // path: "/boards",
        element: <MyBoards />,
        loader: MyBoards.loader,
      },
      {
        path: "/boards/:boardId",
        element: <BoardPage />,
        loader: BoardPage.loader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: Login.action,
  },
  {
    path: "/logout",
    action: logoutAction,
  },
  {
    path: "/signup",
    element: <Signup />,
    action: Signup.action,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);
