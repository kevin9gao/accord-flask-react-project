import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';


let socket;


const DmChat = () => {
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const { messagesId } = useParams();
    const user = useSelector(state => state.session.user)



    useEffect(() => {
        // create websocket
        socket = io();

        if (socket & messagesId ) socket.emit('on_dm_join', {'username': user.username, })
        //listen for chat events
        socket.on('chat', chat => {
            // when receive a chat, add to messages state var
            setMessages(messages => [...messages, chat]);
        })

        //when component unmounts, disconnect
        return (() => {
            // socket.removeAllListeners()
            socket.emit('on_dm_leave', { username: user.username,})
            socket.disconnect()
        })
    }, [])

    const updateChatInput = e => {
        setChatInput(e.target.value);
    }

    const sendChat = e => {
        e.preventDefault();

        //emit a message
        socket.emit('on_dm_chat', { user: user.username, msg: chatInput });

        //clear input field after message is sent
        setChatInput('');
    }

    return (
        <div>
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
                <button
                // onClick={}
                >Send</button>
            </form>
        </div>
    )
}

export default DmChat;
