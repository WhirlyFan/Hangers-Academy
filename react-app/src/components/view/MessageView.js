import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
let socket;

export default function MessageView() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);
  const { serverId, channelId } = useParams();

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });
    socket.emit("join", {
      user: user.username,
      room: serverId + "-" + channelId,
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, [channelId, serverId, user.username]);

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

  return (
    <div>
      <div>
        {messages.map((message, ind) => (
          <div key={ind}>{`${message.user}: ${message.msg}`}</div>
        ))}
      </div>
      <form onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
