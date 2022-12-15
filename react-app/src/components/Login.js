import React from "react";
import LoginForm from "./auth/LoginForm";
import styles from "./cssModules/Login.module.css"
import login_background from "../assets/login_background.svg"

export default function Login() {
  return (
    <div id={styles.loginView}>
      <img alt="login-banner" src={login_background} id={styles.loginBackground}/>
      <div id={styles.centeredLoginFormContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
