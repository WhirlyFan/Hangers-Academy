import landing_background from "../assets/landing_background.svg";
import styles from "./cssModules/Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landing_background}>
      <span>landing</span>
      <img src={landing_background} alt="landing_background"></img>
    </div>
  );
}
