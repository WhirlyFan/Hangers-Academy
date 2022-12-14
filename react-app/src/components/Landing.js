import React from "react";
import { useHistory } from "react-router-dom";
import landing_background from "../assets/landing_background.svg";
import landing_right from "../assets/landing_right.svg";
import landing_left from "../assets/landing_left.svg";
import styles from "./cssModules/Landing.module.css";

//fix background layout
export default function Landing() {
  const history = useHistory();

  const openDiscord = (e) => {
    e.preventDefault();
    history.push(`/login`);
  };

  return (
    <div className={styles.background}>
      <img
        className={styles.background_image}
        src={landing_background}
        alt="landing_background"
      ></img>
      <img
        className={styles.left_image}
        src={landing_left}
        alt="landing_left"
      ></img>
      <img
        className={styles.right_image}
        src={landing_right}
        alt="landing-right"
      ></img>
      <div>
        {/* <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p> */}
        <button className={styles.login_button} onClick={openDiscord}>
          Open Discord in your browser
        </button>
      </div>
    </div>
  );
}
