/* eslint-disable no-unused-vars, react/no-unknown-property */
import * as React from "react";
import s from "./Signup.module.css";
import Button from "../Button/Button";

function Signup() {
  return (
    <div className={s.content}>
      <div className={s.logo}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
        >
          <path
            d="M0 11.52C0 5.15768 5.15768 0 11.52 0H84.48C90.8423 0 96 5.15768 96 11.52V84.48C96 90.8423 90.8423 96 84.48 96H11.52C5.15768 96 0 90.8423 0 84.48V11.52Z"
            fill="#6D28D9"
          />
          <path
            d="M62.2933 17.92C62.2933 14.621 64.9677 11.9467 68.2667 11.9467H78.5067C81.8056 11.9467 84.48 14.621 84.48 17.92V78.08C84.48 81.379 81.8056 84.0533 78.5067 84.0533H68.2667C64.9677 84.0533 62.2933 81.379 62.2933 78.08V17.92Z"
            fill="white"
          />
          <path
            d="M11.9467 17.92C11.9467 14.621 14.621 11.9467 17.92 11.9467H28.16C31.459 11.9467 34.1333 14.621 34.1333 17.92V48.2133C34.1333 51.5123 31.459 54.1867 28.16 54.1867H17.92C14.621 54.1867 11.9467 51.5123 11.9467 48.2133V17.92Z"
            fill="white"
          />
          <path
            d="M37.12 17.92C37.12 14.621 39.7944 11.9467 43.0933 11.9467H53.3333C56.6323 11.9467 59.3067 14.621 59.3067 17.92V63.1467C59.3067 66.4456 56.6323 69.12 53.3333 69.12H43.0933C39.7944 69.12 37.12 66.4456 37.12 63.1467V17.92Z"
            fill="white"
          />
        </svg>
      </div>
      <h1 className={s.title}>Welcome to Boardable</h1>
      <form className={s.form}>
        <div className={s["form-field"]}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" />
        </div>
        <Button>Signup</Button>
      </form>
      <div className={s["link-field"]}>
        <a className={s.link}>Login to your account</a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3.33331 7.99998H12.6666M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
            stroke="#6D28D9"
            stroke-width="1.33"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default Signup;
