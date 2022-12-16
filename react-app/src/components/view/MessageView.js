import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import {
  deleteChannelMessageThunk,
  getChannelMessagesThunk,
} from "../../store/channelMessages";
import { normalize } from "../../store/server";
import { getAllUsers } from "../../store/session";
import styles from "../cssModules/MessageView.module.css";
let socket;

export default function MessageView() {
  const dispatch = useDispatch();
  const [allUsersObj, setAllUsersObj] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);
  const { serverId, channelId } = useParams();
  const [hasClicked, setHasClicked] = useState(false);
  const messageRef = useRef(null)

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  }, [messages])

  useEffect(() => {
    dispatch(getAllUsers()).then((data) => {
      setHasLoaded(true);
      setAllUsersObj(normalize(data.users));
    });
    dispatch(getChannelMessagesThunk(channelId)).then((messages) => {
      setMessages(messages.Messages);
    });
  }, [dispatch, channelId, hasClicked]);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();
    socket.on("chat", () => {
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
    dispatch(deleteChannelMessageThunk(messageId)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  return (
    <div className={styles.view}>
      <div className={styles.message_container}>
        {messages.map((message, ind) => (
          <div key={`message-${ind}`} className={styles.message}>
            <div className={styles.profile_pic}>
              {/* <img src={allUsersObj[message.user_id].profile_pic} /> */}
            </div>
            <div className={styles.message_stuff}>
              <div className={styles.non_buttons}>
                <div className={styles.details}>
                  <div className={styles.username}>
                    {allUsersObj[message.user_id].username}
                  </div>
                  <div className={styles.created_at}>{message.created_at}</div>
                </div>
                <div className={styles.message_content}>
                  {message.message_content}
                </div>
              </div>
              <div className={styles.buttons}>
                {/* <button onClick={editMessage}>Edit</button> */}
                <button onClick={() => deleteMessage(message.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        <div ref={messageRef} />
      </div>
      <form className={styles.form} onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        {/* <button type="submit">Send</button> */}
      </form>
    </div>
  );
}
