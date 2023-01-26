import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postServerChannelThunk } from "../../store/server";
import styles from "../cssModules/CreateChannelForm.module.css";

function CreateChannelForm({
  setShowCreateChannelModal,
  setHasSubmitted,
  serverId,
}) {
  const dispatch = useDispatch();

  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (channelName.length > 25) {
      errors.push(
        "Please enter a channel name that is less than 25 characters"
      );
    }

    setErrors(errors);

    if (!errors.length) {
      setShowCreateChannelModal(false);
      const submitChannel = await dispatch(
        postServerChannelThunk({ server_id: serverId, name: channelName })
      ).then(() => setHasSubmitted((prevValue) => !prevValue));
      return submitChannel;
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>Create Channel</div>
      <form onSubmit={handleSubmit} className={styles.createChannelform}>
        <div className={styles.formInput}>
          <label htmlFor="channelNameInput">Channel Name</label>
          <input
            id="channelNameInput"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="new-channel"
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
        <div className={styles.formButtonContainer}>
          <button type="submit">Create Channel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateChannelForm;
