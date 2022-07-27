import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
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
=======
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';


let socket;

const ChannelChat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const { channelId, serverId } = useParams()

  console.log('channelId', channelId)
  console.log('serverId', serverId)


  // const channelRoom = useSelector(state => state.channel['room'])
  const user = useSelector(state => state.session.user);
  const allChannels = useSelector(state => state.channels)

  const channel = Object.values(allChannels).filter(channel => {
    return channel['id'] === Number(channelId)
  })[0]


  useEffect(() => {
    // create websocket
    socket = io();

    // console.log('channel IN CHANNELCHAT: ', channel.id)
    if (socket && channel) socket.emit('join', { username: user.username, channel: channel.id })

    //listen for chat events
    socket.on('chat', chat => {
      // when receive a chat, add to messages state var
      setMessages(messages => [...messages, chat]);
    })

    //when component unmounts, disconnect
    return (() => {
      // socket.removeAllListeners()
      socket.emit('leave', { username: user.username, channel: channel?.id })
      socket.disconnect()
<<<<<<<< HEAD:react-app/src/components/LiveChat/ChannelChat.js
      setMessages([]);
    })
  }, [channelId])

========
    })
  }, [])
>>>>>>>> main:react-app/src/components/Socket/Chat.js
>>>>>>> main

  const updateChatInput = e => {
    setChatInput(e.target.value);
  }

  const sendChat = e => {
    e.preventDefault();

    //emit a message
<<<<<<< HEAD
    socket.emit('chat', { 'user': user.username, 'msg': chatInput, 'channel': channel });
=======
    socket.emit('chat', { username: user.username, msg: chatInput, channel: channel?.id });
>>>>>>> main

    //clear input field after message is sent
    setChatInput('');
  }

<<<<<<< HEAD
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
=======

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
>>>>>>> main

export default ChannelChat;
