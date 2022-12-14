import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function DirectMessagesView() {
  const userServers = useSelector((state) => state.session.user.servers);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  useEffect(() => {}, [userServers]);

  const handleClick = (serverId, channelId) => {
    history.push(`/servers/me/${serverId}/${channelId}`);
  };

  const privateServers = userServers.filter(
    (server) => server.private === true
  );

  return (
    <div>
      <ul>
        {privateServers.length > 0 ? (
          privateServers.map((server) => (
            <div
              onClick={() => handleClick(server.id, server.Channels[0].id)}
              key={server.id}
            >
              {server.name
                .split("_")
                .filter((name) => name !== sessionUser.username)
                .join("")}
            </div>
          ))
        ) : (
          <h3>Try Chatting With a Friend!</h3>
        )}
      </ul>
    </div>
  );
}
