import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';


let socket;
const ChannelChat = ({messages, setMessages, channels}) => {
  // const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const { channelId, serverId } = useParams()

  // const channelRoom = useSelector(state => state.channel['room'])
  const user = useSelector(state => state.session.user);
  const allChannels = useSelector(state => state.channels)

  const channel = Object.values(allChannels).filter(channel => {
    return channel['id'] === Number(channelId)
  })


  useEffect(() => {

    // create websocket
    socket = io();

    //listen for chat events
    socket.on('chat', chat => {
      // when receive a chat, add to messages state var
      setMessages(messages => [...messages, chat]);
    })

    socket.emit('join', { username: user.username, channel: channel })

    //when component unmounts, disconnect
    return (() => {
      // socket.removeAllListeners()
      socket.disconnect()
      socket.emit('leave', { username: user.username, channel: channel })

    })
  }, [])

  const updateChatInput = e => {
    setChatInput(e.target.value);
  }

  const sendChat = e => {
    e.preventDefault();

    //emit a message
    socket.emit('chat', { username: user.username, msg: chatInput, channel:channel });

    //clear input field after message is sent
    setChatInput('');
  }


  return (user && (
    <div>
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
          onChange={updateChatInput}
        />
        <button
          // onClick={}
        >Send</button>
      </form>
    </div>
  ));
}

export default ChannelChat;
