import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteServerThunk, editServerThunk } from "../../store/server";
import styles from "../cssModules/EditServerForm.module.css";

function EditServerForm({
  setShowEditServerModal,
  setHasSubmitted,
  serverId,
  userId,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  //Grabbing the current information of server to place in field
  const user = useSelector((state) => state.session.user);
  const userPublicServersArr = user.public_servers;
  const server = userPublicServersArr.filter((server) => {
    return server.id === parseInt(serverId);
  });
  const prevServerName = server[0].name;
  const prevServerImg = server[0].server_img;

  const [serverName, setServerName] = useState(prevServerName);
  const [serverImg, setServerImg] = useState(prevServerImg);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (serverName.length > 50) {
      errors.push("Please enter a server name that is less than 50 characters");
    }

    setErrors(errors);

    if (!errors.length) {
      const editServer = await dispatch(
        editServerThunk(
          { name: serverName, server_img: serverImg },
          serverId,
          userId
        )
      )
        .then(() => setHasSubmitted((prevValue) => !prevValue))
        .then(() => setShowEditServerModal(false));
      return editServer;
    }
  };

  const handleDelete = () => {
    setShowEditServerModal(false);
    setHasSubmitted((prevValue) => !prevValue);
    return dispatch(deleteServerThunk(serverId, userId)).then(() =>
      history.push("/main/friends")
    );
  };

  const handleExit = (e) => {
    e.preventDefault();
    setShowEditServerModal(false)
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.xContainer}>
        <span
        style={{ fontSize: "1.6rem", fontWeight: "200", cursor: 'pointer' }}
        id={styles.xBtn}
        className="material-symbols-outlined exit"
        onClick={(e) => handleExit(e)}
        >
          cancel
        </span>
      </div>
      <div className={styles.formHeader}>Server Overview</div>
      <form onSubmit={handleSubmit} className={styles.editServerform}>
        <div className={styles.formInput}>
          <label htmlFor="editServerNameInput">Server Name</label>
          <input
            id="editServerNameInput"
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
          <label htmlFor="editServerImgInput">Server Image</label>
          <input
            id="editServerImgInput"
            type="url"
            value={serverImg}
            onChange={(e) => setServerImg(e.target.value)}
            placeholder="Server Image URL"
          />
        </div>
        <div className={styles.editServerButtons}>
          <button type="submit">Save Changes</button>
          <button onClick={() => handleDelete()}>Delete Server</button>
        </div>
      </form>
    </div>
  );
}

export default EditServerForm;
