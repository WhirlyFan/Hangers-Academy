import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import { getChannelMessagesThunk } from "../../store/channelMessages";
import { normalize } from "../../store/server";
import { getAllUsers } from "../../store/session";
import MessageCard from "../MessageCard";
import styles from "../cssModules/MessageView.module.css";
let socket;

export default function MessageView() {
  const dispatch = useDispatch();
  const [allUsersObj, setAllUsersObj] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);
  const allServers = useSelector((state) => state.server.allServers);
  const { serverId, channelId } = useParams();
  const messageRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    if (!allServers[+serverId]) {
      history.push("/main/friends");
      return null;
    }
    messageRef.current?.scrollIntoView();
  }, [dispatch, messages, allServers, serverId, history]);

  useEffect(() => {
    dispatch(getAllUsers()).then((data) => {
      setHasLoaded(true);
      setAllUsersObj(normalize(data.users));
    });
    dispatch(getChannelMessagesThunk(channelId)).then((messages) => {
      setMessages(messages.Messages);
    });
  }, [dispatch, channelId]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.on("chat", () => {
      dispatch(getChannelMessagesThunk(channelId)).then((messages) => {
        setMessages(messages.Messages);
      });
    });
    socket.on("delete", () => {
      dispatch(getChannelMessagesThunk(channelId)).then((messages) => {
        setMessages(messages.Messages);
      });
    });
    //join room
    socket.emit("join", {
      user: user.username,
      room: serverId + "-" + channelId,
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [channelId, serverId, user.username, dispatch]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      id: user.id,
      user: user.username,
      msg: chatInput,
      channelId: channelId,
      room: serverId + "-" + channelId,
    });
    setChatInput("");
  };

  if (!hasLoaded) return null;
  if (!Object.keys(allUsersObj).length) return null;

  const deleteMessage = (messageId) => {
    socket.emit("delete", { id: messageId, room: serverId + "-" + channelId });
  };
  const server = allServers[+serverId];

  return (
    <div className={styles.view}>
      <div className={styles.message_container}>
        <div className={styles.header}>
          {server.private ? (
            <>
              <h2>
                {server.name
                  .split("_")
                  .filter((name) => name !== user.username)
                  .join("")}
              </h2>
              <span>
                This is the beginning of your direct message history with @
                {server.name
                  .split("_")
                  .filter((name) => name !== user.username)
                  .join("")}
              </span>
            </>
          ) : (
            <h2>Welcome to {server.name}</h2>
          )}
        </div>
        {messages.map((message, ind) => (
          <MessageCard
            key={`message-${ind}`}
            message={message}
            allUsersObj={allUsersObj}
            user={user}
            deleteMessage={deleteMessage}
          />
        ))}

        <div ref={messageRef} />
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={sendChat}>
          <input
            className={styles.chatBox}
            value={chatInput}
            onChange={updateChatInput}
            placeholder={"Message"}
          />
          {/* <button type="submit">Send</button> */}
        </form>
      </div>
    </div>
  );
}
