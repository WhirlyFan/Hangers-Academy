import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

import styles from "../cssModules/LogOutButton.module.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = (e) => {
    dispatch(logout()).then(() => {
      return history.push("/");
    });
  };

  return (
    <button className={styles.btn} onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
