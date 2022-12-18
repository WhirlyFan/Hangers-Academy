import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "../cssModules/DirectMessagesView.module.css";
import friend_btn from "../../assets/friend_btn.png";

export default function DirectMessagesView() {
  const userServers = useSelector(
    (state) => state.session.user.private_servers
  );
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {}, [userServers]);

  const handleClick = (serverId, channelId) => {
    history.push(`/main/servers/me/${serverId}/${channelId}`);
  };

  const privateServers = userServers.filter(
    (server) => server.private === true
  );

  const friendsRedirect = () => {
    history.push("/main/friends");
  };

  return (
    <div>
      <div className={styles.friend_btn_container} onClick={friendsRedirect}>
        <div className={styles.friend_btn}>
          <img className={styles.friend} src={friend_btn} alt="friendbtn"></img>
        </div>
        <div>
          <span className={styles.friend_text}>Friends</span>
        </div>
      </div>
      <div className={styles.direct_messages_container}>
        <div className={styles.direct_messages_text}>
          <span>DIRECT MESSAGES</span>
        </div>
        <div className={styles.dm_list}>
          {privateServers.length > 0 ? (
            privateServers.map((server) => (
              <div
                className={styles.direct_message_card}
                onClick={() => handleClick(server.id, server.Channels[0].id)}
                key={server.id}
              >
                <div className={styles.icon_container}>
                  <img
                    className={styles.icon}
                    src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
                    alt="default-icon"
                  ></img>
                </div>
                <span className={styles.dm_name}>
                  {server.name
                    .split("_")
                    .filter((name) => name !== sessionUser.username)
                    .join("")}
                </span>
              </div>
            ))
          ) : (
            <h3 className={styles.no_dm}>Try Chatting With a Friend!</h3>
          )}
        </div>
      </div>
    </div>
  );
}
