import styles from "../cssModules/DeleteMessage.module.css";

const DeleteMessage = ({ message, deleteMessage, setShowModal }) => {
  return (
    <div
      onClick={() => {
        setShowModal(false);
        deleteMessage(message.id);
      }}
      className={styles.container}
    >
      <span className={styles.text}>Delete Message</span>
      <div className={styles.text}>
        <span className="material-symbols-outlined">delete</span>
      </div>
    </div>
  );
};

export default DeleteMessage;
