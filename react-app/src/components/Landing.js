import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import landing_background from "../assets/landing_background.svg";
import landing_right from "../assets/landing_right.svg";
import landing_left from "../assets/landing_left.svg";
import body1 from "../assets/body1.svg";
import body2 from "../assets/body2.svg";
import body3 from "../assets/body3.svg";
import body4 from "../assets/body4.svg";
import styles from "./cssModules/Landing.module.css";

//fix background layout
export default function Landing() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    history.push("/main/friends");
  }

  const openDiscord = (e) => {
    e.preventDefault();
    history.push(`/login`);
  };

  return (
    <div className={styles.landing}>
      <div className={styles.body0}>
        <div className={styles.text1}>IMAGINE A PLACE...</div>
        <p className={styles.text2}>
          ...where you can belong to a school club, a gaming group, or a
          worldwide art community. Where just you and a handful of friends can
          spend time together. A place that makes it easy to talk every day and
          hang out more often.
        </p>
        <img src={landing_background} alt="landing_background"></img>
        <img
          className={styles.left}
          src={landing_left}
          alt="landing_left"
        ></img>
        <img
          className={styles.right}
          src={landing_right}
          alt="landing-right"
        ></img>
        <button className={styles.login_button} onClick={openDiscord}>
          Open Discord in your browser
        </button>
      </div>

      <div className={styles.body1}>
        <img src={body1} alt="body1"></img>
      </div>
      <div className={styles.body2}>
        <img src={body2} alt="body2"></img>
      </div>
      <div className={styles.body3}>
        <img src={body3} alt="body3"></img>
      </div>
      <div className={styles.body4}>
        <img src={body4} alt="body4"></img>
      </div>
    </div>
  );
  // return (
  //   <div className={styles.background}>
  // <img
  //   className={styles.background_image}
  //   src={landing_background}
  //   alt="landing_background"
  // ></img>
  // <img
  //   className={styles.left_image}
  //   src={landing_left}
  //   alt="landing_left"
  // ></img>
  // <img
  //   className={styles.right_image}
  //   src={landing_right}
  //   alt="landing-right"
  // ></img>
  //     <div>
  // <button className={styles.login_button} onClick={openDiscord}>
  //   Open Discord in your browser
  // </button>
  //     </div>
  //   </div>
  // );
}
