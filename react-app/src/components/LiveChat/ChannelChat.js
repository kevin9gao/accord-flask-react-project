import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';

let socket;

const ChannelChat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');

  const { serverId, channelId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const username = sessionUser.username;

  const channel_name = `/channels/${serverId}/${channelId}`;
  let users = [];

  useEffect(() => {
    socket = io();

    socket.on('join', { username, channel_name });

    socket.on('chat', chat => {
      setMessages(messages => [...messages, chat]);
    })

    return (() => {
      socket.disconnect()
    }, [])
  }, [])

  const sendChat = e => {
    e.preventDefault();

    socket.emit('chat', {
      username: sessionUser.username,
      msg: chatInput,
      // channel_name
    });

    setChatInput('');
  }

  return (sessionUser && (
    <div> Hello from Channel Chat
      <div>
        {messages.map((message, idx) => (
          <div key={idx}>
            {`${message.username}: ${message.msg}`}
          </div>
        ))}
      </div>
      <form
        onSubmit={sendChat}
      >
        <input
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
        />
        <button
        // onClick={}
        >Send</button>
      </form>
    </div>
  ));
}

export default ChannelChat;
