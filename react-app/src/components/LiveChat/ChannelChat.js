import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { loadLiveChatHistory, sendLiveChatMessage } from '../../store/chat';


let socket;

const ChannelChat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const chatHistoryObj = useSelector(state => state['chat']['live-chat-history']);
  const chatHistory = chatHistoryObj ? Object.values(chatHistoryObj) : null;
  // console.log('chatHistory useSelector: ', chatHistory);


  const { channelId, serverId } = useParams()
  const dispatch = useDispatch();

  // console.log('channelId', channelId)
  // console.log('serverId', serverId)


  // const channelRoom = useSelector(state => state.channel['room'])
  const user = useSelector(state => state.session.user);
  const allChannels = useSelector(state => state.channels)

  const channel = Object.values(allChannels).filter(channel => {
    return channel['id'] === Number(channelId)
  })[0]


  useEffect(() => {
    const errors = [];
    if (chatInput.length === 0) errors.push("Message body cannot be empty.");

    setValidationErrors(errors);
  }, [chatInput]);

  useEffect(async () => {

    if(channelId) await dispatch(loadLiveChatHistory(channelId));

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
      setMessages([]);
    })
  }, [channelId])


  const updateChatInput = e => {
    setChatInput(e.target.value);
  }

  const sendChat = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length === 0) {
      //emit a message
      socket.emit('chat', { username: user.username, msg: chatInput, channel: channel?.id });

      const dateTime = new Date();
      const isoTime = dateTime.toISOString();
      const date = isoTime.slice(0, 10);
      const time = isoTime.slice(12,19);
      const combined = date + ' ' + time

      // console.log(combined)

      const payload = {
        channel_id: channel?.id,
        username: user.username,
        message_body: chatInput,
        created_at: combined
      };
      // console.log("Frontend Component, payload", payload)
      await dispatch(sendLiveChatMessage(payload));

      setHasSubmitted(false);

      //clear input field after message is sent
      setChatInput('');
    }
  }


  return (user && (
    <div>
      <div>
        {chatHistory && chatHistory.map((message, idx) => (
          <div key={idx}>
            {`${message.username}: ${message.message_body ? message.message_body : message.msg}`}
          </div>
        ))}
      </div>
      <form className='channel-chat-form'
        onSubmit={sendChat}
      >
        {hasSubmitted && validationErrors.length > 0 && (
          <ul>
            {validationErrors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <input className='channel-chat-input'
          value={chatInput}
          onChange={updateChatInput}
        />
        <button className='channel-chat-button'
        // onClick={}
        >Send</button>
      </form>
    </div>
  ));
}

export default ChannelChat;
