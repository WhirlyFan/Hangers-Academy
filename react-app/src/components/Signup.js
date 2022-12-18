import React from "react";
import SignUpForm from "./auth/SignUpForm";
import login_background from "../assets/login_background.svg";
import styles from "./cssModules/Login.module.css";

export default function Signup() {
  return (
    <div id={styles.loginView}>
      <div>
        <img
          alt="signup-banner"
          src={login_background}
          id={styles.loginBackground}
        />
      </div>
      <div id={styles.centeredFormContainer}>
        <SignUpForm />
      </div>
    </div>
  );
}
