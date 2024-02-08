/* eslint-disable no-unused-vars, react/no-unknown-property */
import * as React from "react";
import s from "./Account.module.css";
import Button from "../Button";

function Account() {
  return (
    <div className={s.content}>
      <h1 className={s.title}>My Account</h1>
      <form className={s.form}>
        <div className={s["form-field"]}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="testino" />
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="password">Name</label>
          <input type="text" id="password" />
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" />
        </div>
        <div className={s["form-field"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <Button size="lg">Update</Button>
        <Button size="lg" variant="delete">
          Delete my account
        </Button>
      </form>
    </div>
  );
}

export default Account;
