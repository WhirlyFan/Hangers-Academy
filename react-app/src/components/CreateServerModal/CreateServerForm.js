import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postServerThunk } from "../../store/server";
import { useHistory } from "react-router-dom";
import styles from "../cssModules/CreateServerForm.module.css";

function CreateServerForm({ setShowModal, setHasSubmitted }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const username = user.username

  const [serverName, setServerName] = useState(`${username}'s Server`);
  const [serverImg, setServerImg] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (serverName.length > 50) {
      errors.push("Please enter a server name that is less than 50 characters");
    }

    setErrors(errors);

    if (!errors.length) {
      setShowModal(false);
      const submitServer = await dispatch(
        postServerThunk({ name: serverName, server_img: serverImg })
      )
        .then((response) => {
          history.push(
            `/main/servers/${response.server.id}/${response.channel.id}`
          );
        })
        .then(() => setHasSubmitted((prevValue) => !prevValue));
      return submitServer;
    }
  };

  const handleExit = (e) => {
    e.preventDefault();
    setShowModal(false)
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.xContainer}>
        <span
        style={{ fontSize: "1.7rem", fontWeight: "200", cursor: 'pointer' }}
        id={styles.xBtn}
        className="material-symbols-outlined exit"
        onClick={(e) => handleExit(e)}
        >
          cancel
        </span>
      </div>
      <div className={styles.formHeader}>Customize your server</div>
      <div className={styles.formSubText}>
        Give your new server a personality with a name and an icon. You can
        always change it later.
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formInput}>
          <label htmlFor="serverNameInput">Server Name</label>
          <input
            id="serverNameInput"
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            placeholder="Server Name"
            required
          />
        </div>
        <div className={styles.errorMap}>
          {errors.length > 0 && (
            <div>
              {errors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formInput}>
          <label htmlFor="serverImgInput">Server Image</label>
          <input
            id="serverImgInput"
            type="url"
            value={serverImg}
            onChange={(e) => setServerImg(e.target.value)}
            placeholder="Server Image URL (Optional)"
          />
        </div>
        <div className={styles.formButtonContainer}>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateServerForm;
