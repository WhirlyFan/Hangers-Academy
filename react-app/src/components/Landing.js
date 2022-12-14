import landing_background from "../assets/landing_background.svg";
import landing_right from "../assets/landing_right.svg";
import landing_left from "../assets/landing_left.svg";
import styles from "./cssModules/Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing_background}>
      <div>
        <img src={landing_background} alt="landing_background"></img>
      </div>
      <div className={styles.landing_people}>
        <img src={landing_left} alt="landing_left"></img>
        <img src={landing_right} alt="landing-right"></img>
      </div>
    </div>
  );
}
