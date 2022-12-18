import LogoutButton from "../auth/LogoutButton";
import styles from "../cssModules/UserSettings.module.css";

const UserSettingsDisplay = ({ sessionUser, setShowModal }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <div className={styles.left_top}>
          <span>My Account</span>
        </div>
        <div className={styles.account_card}>
          <div className={styles.top_banner}></div>
          <div className={styles.bottom_half}>
            <div className={styles.bot_top}>
              <div className={styles.icon_container}>
                <img
                  className={styles.icon}
                  src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
                  alt="default-icon"
                ></img>
              </div>
              <div className={styles.user_lg}>
                <div>
                  <span className={styles.username}>
                    {sessionUser.username}
                  </span>
                </div>
                <div className={styles.logout_btn}>
                  <LogoutButton />
                </div>
              </div>
            </div>
            <div className={styles.bot_bot}>
              <div className={styles.user_info_container}>
                <div className={styles.username_box}>
                  <span className={styles.name_label}>USERNAME</span>
                  <span className={styles.name}>{sessionUser.username}</span>
                </div>
                <div className={styles.username_box}>
                  <span className={styles.name_label}>EMAIL</span>
                  <span className={styles.name}>{sessionUser.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right_container}>
        <div onClick={(e) => handleClick(e)} className={styles.exit_btn}>
          <span
            style={{ fontSize: "2.5rem", fontWeight: "200" }}
            className="material-symbols-outlined exit"
          >
            cancel
          </span>
          <div className={styles.escape_container}>
            <span className={styles.escape}>ESC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsDisplay;
