import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;


const DmChat = () => {
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const { convoId } = useParams();

    const user = useSelector(state => state.session.user);
    // const dmConversations = useSelector(state => state.conversations)

    // const convo = Object.values(dmConversations).filter(conversation => {
    //     return conversation['id'] = Number(convoId);
    // });

    useEffect(() => {
        // create websocket
        socket = io();

        if(socket) socket.emit("dm_join", {'username': user.username})

        //listen for chat events
        socket.on('chat', chat => {
            // when receive a chat, add to messages state var
            setMessages(messages => [...messages, chat]);
        })

        //when component unmounts, disconnect
        return (() => {
            // socket.removeAllListeners()
            socket.emit('dm_leave', {'username': user.username});
            socket.disconnect();
            setMessages('');
        })
    }, [convoId])

    const updateChatInput = e => {
        setChatInput(e.target.value);
    }

    const sendChat = e => {
        e.preventDefault();

        //emit a message
        socket.emit('dm_chat', { user: user.username, msg: chatInput });

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
