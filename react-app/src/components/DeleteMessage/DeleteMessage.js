import styles from "../cssModules/DeleteMessage.module.css"

const DeleteMessage = ({ message, deleteMessage }) => {
    return (
        <div onClick={() => deleteMessage(message.id)} className={styles.container}>
            <span className={styles.text}>DeleteMessage</span>
            <div className={styles.text}>
                <span class="material-symbols-outlined">
                    delete
                </span>
            </div>
        </div>
    )
}

export default DeleteMessage;
