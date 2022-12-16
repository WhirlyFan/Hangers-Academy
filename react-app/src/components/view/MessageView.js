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
  const allServers = useSelector(state => state.server.allServers)
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
  const server = allServers[+serverId]
  // const channel = server.Channels.find(channel => channel.id === channelId)

  return (
    <div className={styles.view}>
      <div className={styles.message_container}>
        <div className={styles.header}>
          {server.private ? (
            <>
              <h2>{server.name
                .split("_")
                .filter((name) => name !== user.username)
                .join("")}</h2>
              <span>This is the beginning of your direct message history with @{server.name
                .split("_")
                .filter((name) => name !== user.username)
                .join("")}</span>
            </>
            ):
            <h2>Welcome to {server.name}</h2>
          }
        </div>
        {messages.map((message, ind) => (
          // <div key={`message-${ind}`} className={styles.message}>
          //   <div className={styles.profile_pic}>
          //     {/* <img src={allUsersObj[message.user_id].profile_pic} /> */}
          //   </div>
          //   <div className={styles.message_stuff}>
          //     <div className={styles.non_buttons}>
          //       <div className={styles.details}>
          //         <div className={styles.username}>
          //           {allUsersObj[message.user_id].username}
          //         </div>
          //         <div className={styles.created_at}>{message.created_at}</div>
          //       </div>
          //       <div className={styles.message_content}>
          //         {message.message_content}
          //       </div>
          //     </div>
          //     <div className={styles.buttons}>
          //       {/* <button onClick={editMessage}>Edit</button> */}
          //       <button onClick={() => deleteMessage(message.id)}>
          //         Delete
          //       </button>
          //     </div>
          //   </div>
          // </div>
          <MessageCard key={`message-${ind}`} message={message} allUsersObj={allUsersObj} user={user} deleteMessage={deleteMessage} />
        ))}

        <div ref={messageRef} />
      </div>
      <form className={styles.form} onSubmit={sendChat}>
        <input 
        className={styles.chatBox} 
        value={chatInput} 
        onChange={updateChatInput} 
        placeholder={" message"} />
        {/* <button type="submit">Send</button> */}
      </form>
    </div>
  );
}
