import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

let socket;

const ChannelChat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const { id } = useParams();

  const user = useSelector(state => state.session.user);
  const channels = useSelector(state => state.channels)
  const channel = channels[id]

  useEffect(() => {
    socket = io();

    socket.on('chat', chat => {
      setMessages(messages => [...messages, chat])
    })

    socket.on('chat', data => {
      console.log(`I am here: ${data}`)
    })

    return (() => {
      socket.disconnet()
    }, [])
  }, []); 

  // const joinRoom = (room) => {
  //   socket.emit('join', {username: user.username, channel: channel})
  // }

  // const leaveRoom = (room) => {
  //   socket.emit('leave', { username: user.username, channel: channel });

  // }

  const updateChatInput = e => {
    setChatInput(e.target.value);
  }

  const sendChat = e => {
    e.preventDefault();

    //emit a message
    socket.emit('chat', { 'user': user.username, 'msg': chatInput, 'channel': channel });

    //clear input field after message is sent
    setChatInput('');
  }

    return (user && (
      <div>
        <h1>Hi from Channel Chat</h1>
        <div>
          {messages.map((message, idx) => (
            <div key={idx}>
              {`${message.user}: ${message.msg}`}
            </div>
          ))}
        </div>
        <form
          onSubmit={sendChat}
        >
          <input
            value={chatInput}
            onChange={updateChatInput}
          />
          <button type='submit'>Send</button>
        </form>
      </div>
    ));
  }

export default ChannelChat;
