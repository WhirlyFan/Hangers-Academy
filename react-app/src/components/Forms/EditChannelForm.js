import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editServerChannelThunk } from "../../store/server";
import { deleteServerChannelThunk } from "../../store/server";
import styles from "../cssModules/EditChannelForm.module.css";

function EditChannelForm({
  setShowEditChannelModal,
  setHasSubmitted,
  serverId,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const channelId = params.channelId;

  //Grabbing the current information of server to place in field
  const user = useSelector((state) => state.session.user);
  const userPublicServersArr = user.public_servers;
  const server = userPublicServersArr.filter((server) => {
    return server.id === parseInt(serverId);
  });

  //Grabbing the current information of channel within server with channelId
  const channel = server[0].Channels.filter((channel) => {
    return channel.id === parseInt(channelId);
  });

  const prevChannelName = channel[0].name;

  const [channelName, setChannelName] = useState(prevChannelName);
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
      setShowEditChannelModal(false);
      const editChannel = await dispatch(
        editServerChannelThunk({ channel_id: channelId, name: channelName })
      ).then(() => setHasSubmitted((prevValue) => !prevValue));
      return editChannel;
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const errors = [];

    if (server[0].Channels.length === 1) {
      errors.push(
        "You cannot delete a channel on a server with only one channel"
      );
    }

    setErrors(errors);

    if (!errors.length) {
      setShowEditChannelModal(false);
      const deleteChannel = await dispatch(
        deleteServerChannelThunk(channelId)
      ).then(() =>
        history.push(`/main/servers/${serverId}/${server[0].Channels[0]["id"]}`)
      ).then(() => setHasSubmitted((prevValue) => !prevValue));
      return deleteChannel;
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>Channel Overview</div>
      <form onSubmit={handleSubmit} className={styles.createChannelform}>
        <div className={styles.formInput}>
          <label htmlFor="editChannelNameInput">Channel Name</label>
          <input
            id="editChannelNameInput"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
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
        <div className={styles.editServerButtons}>
          <button type="submit">Save Changes</button>
          <button onClick={handleDelete}>Delete Channel</button>
        </div>
      </form>
    </div>
  );
}

export default EditChannelForm;
