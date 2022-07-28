import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;


const DmChat = () => {
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [users, setUsers] = useState([]);
    const { userId } = useParams();
    let recipientId = userId

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [])

    const recipient = users.filter(user => {
        return user.id === Number(recipientId)
    })

    useEffect(() => {
        // create websocket
        socket = io();

        if (socket && recipient && sessionUser) socket.emit("dm_join", {username: sessionUser.username, recipient: recipientId, sender:sessionUser.id })

        //listen for chat events
        socket.on('dm_chat', chat => {
            // when receive a chat, add to messages state var
            setMessages(messages => [...messages, chat]);
        })

        //when component unmounts, disconnect
        return (() => {
            // socket.removeAllListeners()
            socket.emit('dm_leave', {username: sessionUser.username, recipient: recipientId, sender:sessionUser.id});
            socket.disconnect();
            setMessages([]);
        })
    }, [recipientId])

    const updateChatInput = e => {
        setChatInput(e.target.value);
    }

    const sendChat = e => {
        e.preventDefault();

        //emit a message
        if(recipient && sessionUser) socket.emit('dm_chat', { user: sessionUser.username, msg: chatInput,'recipient': recipientId, sender:sessionUser.id });

        //clear input field after message is sent
        setChatInput('');
    }


    return (
        <div>
            <div>
                {messages && messages.map((message, idx) => (
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
