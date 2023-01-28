import styles from "./cssModules/MessageCard.module.css";
import DeleteMessage from "./DeleteMessage";

const MessageCard = ({ message, allUsersObj, user, deleteMessage }) => {
  // Convert the created_at timestamp into legible timestamp for users
  const formatDateTime = (timestamp) => {
    let dateObj = new Date(timestamp);
    // Grab month, day, and year of dateObj then convert into string, do the same for time
    let date = dateObj.toLocaleString("default", { month: "2-digit", day: "2-digit", year: "numeric" })
    let time = dateObj.toLocaleString("default", { hour: "numeric", hour12: true, minute: "numeric", timeZone: 'UTC' });
    //  Check if the message's date matches today and replace date with Today
    let todayObj = new Date();
    let todayDate = todayObj.toLocaleString("default", { month: "2-digit", day: "2-digit", year: "numeric" })
    if (todayDate === date) {
      date = "Today at"
    }

    let formattedDate = `${date} ${time}`;
    return formattedDate;
  };

  return (
    <div className={styles.wholeMessage}>
      <div className={styles.message_container}>
        <div className={styles.icon_container}>
          <img
            className={styles.icon}
            src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
            alt="default-icon"
          ></img>
        </div>
        <div className={styles.message_content}>
          <div>
            <div>
              <span className={styles.user}>
                {allUsersObj[message.user_id].username}
              </span>
              <span className={styles.created_at}>
                {formatDateTime(message.created_at)}
              </span>
            </div>
            <span className={styles.message}>{message.message_content}</span>
          </div>
        </div>
      </div>
      {user.id === message.user_id && (
        <div className={styles.popUp}>
          <DeleteMessage deleteMessage={deleteMessage} message={message} />
        </div>
      )}
    </div>
  );
};

export default MessageCard;
