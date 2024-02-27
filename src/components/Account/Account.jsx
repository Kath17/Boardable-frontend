import * as React from "react";
import s from "./Account.module.css";
import Button from "../Button";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { authProvider } from "../../auth";
import { getUser } from "../../services/users";

async function loader() {
  const username = localStorage.getItem("username");
  const user = await getUser(username);
  return { user };
}

async function action({ request }) {
  let formData = await request.formData();
  const username = localStorage.getItem("username");

  let name = formData.get("name");
  let email = formData.get("email");
  let password = formData.get("password");

  const filteredValues = { name, email, password };
  const userData = Object.fromEntries(
    Object.entries(filteredValues).filter(
      ([key, value]) => value !== undefined && value !== ""
    )
  );

  try {
    await authProvider.updateUser(userData, username);
    localStorage.setItem("username", username);
    localStorage.setItem("isLoggedIn", "true");
  } catch (error) {
    return {
      error: "Couldn't update user",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

export default function Account() {
  const { user } = useLoaderData();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [currentName, setCurrentName] = React.useState(user.name || "");
  const [currentEmail, setCurrentEmail] = React.useState(user.email || "");
  const [emailError, setEmailError] = React.useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setCurrentEmail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(e.target.value)) setEmailError("Invalid email format");
    else setEmailError("");
  };

  const handleDeleteAccount = async () => {
    try {
      await authProvider.deleteUser(user.username);
      localStorage.removeItem("username");
      localStorage.removeItem("isLoggedIn");

      navigate("/signup");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className={s.content}>
      <h1 className={s.title}>My Account</h1>
      <Form className={s.form} method="PATCH">
        <div className={s["form-field"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={user.username}
            placeholder="username"
            name="username"
            disabled
          />
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
            placeholder="Your name"
            name="name"
          />
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={currentEmail}
            onChange={handleEmailChange}
            placeholder="Your e-mail"
            name="email"
          />
          {emailError && <p className={s.error}>{emailError}</p>}
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            placeholder="Your password"
            name="password"
          />
        </div>
        <Button type="submit" size="lg">
          Update
        </Button>
        <Button
          type="button"
          size="lg"
          variant="delete"
          onClick={handleDeleteAccount}
        >
          Delete my account
        </Button>
      </Form>
    </div>
  );
}

Account.action = action;
Account.loader = loader;
