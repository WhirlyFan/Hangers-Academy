import styles from "./cssModules/MessageCard.module.css";
import DeleteMessage from "./DeleteMessage";

const MessageCard = ({ message, allUsersObj, user, deleteMessage }) => {
    const formatDateTime = (created_at) => {
        let dateObj = new Date(created_at)
        let month = dateObj.getMonth()
        let day = dateObj.getDate()
        let hour = dateObj.getHours()
        let min = dateObj.getMinutes()
        if (min < 10) min = "0" + min
        let PSThr = `${+hour + 8}`
        let amPM;
        if (PSThr < 13) amPM = "AM"
        if (+PSThr > 13) {
            amPM = "PM"
            PSThr -= 12
        }
        let formattedDate = `${month}/${day} at ${PSThr}:${min}${amPM}`
        return formattedDate
    }

    return (
        <div className={styles.wholeMessage}>
            <div className={styles.message_container}>
                <div className={styles.icon_container}>
                    <img
                    className={styles.icon}
                    src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
                    alt="default-icon"
                    >
                    </img>
                </div>
                    <div className={styles.message_content}>
                    <div>
                        <div>
                            <span className={styles.user}>{allUsersObj[message.user_id].username}</span>
                            <span className={styles.created_at}>{formatDateTime(message.created_at)}</span>
                        </div>
                        <span className={styles.message}>{message.message_content}</span>
                    </div>
                </div>
            </div>
            <div className={styles.popUp}>
                {user.id === message.user_id && (
                    <DeleteMessage deleteMessage={deleteMessage} message={message} />
                )}
            </div>
        </div>
    )
};

export default MessageCard;
