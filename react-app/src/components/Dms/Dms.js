import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { loadDMHistory, sendDmMessage } from '../../store/chat';
import './Dms.css';

let socket;


const DmChat = () => {
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [users, setUsers] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { userId } = useParams();
    let recipientId = Number(userId)

    const sessionUser = useSelector(state => state.session.user);
    // console.log('users', users)
    const recipient = users?.filter(user => {
        return user.id === recipientId
    })[0];

    // console.log('recipient', recipient)

    const dmHistoryObj = useSelector(state => state['chat']['dm-messages']);
    const dmHistory = dmHistoryObj ? Object.values(dmHistoryObj) : null;

    // const privateHistory = dmHistory?.filter(message => {
    //     return (message['sender_id'] === sessionUser.id || message['recipient_id'] === sessionUser.id) &&
    //             (message['sender_id'] === recipientId || message['recipient_id'] === recipientId)
    // })


    // console.log('DM HISTORY', dmHistory)

    // console.log("PRIVATE HISTORY", privateHistory)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [])



    const sender = sessionUser;

    // const recipient = users.filter(user => {
    //     return user.id === Number(recipientId)
    // })


    // putting the sessionUser id and recipient id into a combined string to make a unique room
    // console.log('sender ID: ', sessionUser.id);
    // console.log('recipientId: ', recipientId);
    const joinedId = [sessionUser.id, recipientId].sort();
    const roomId = `${joinedId[0]}-${joinedId[1]}`;
    // console.log('joining the two IDs: ', roomId);

    useEffect(() => {
        const errors = [];
        if (chatInput.length === 0) errors.push("Message body cannot be empty.");

        setValidationErrors(errors);
    }, [chatInput]);


    useEffect(async () => {
        await dispatch(loadDMHistory(sessionUser.id, recipientId));
        // create websocket
        socket = io();


        // if (socket && recipient && sessionUser) socket.emit("dm_join", {username: sessionUser.username, recipient: recipientId, sender:sessionUser.id })
        if (socket && recipientId && sessionUser) socket.emit("dm_join", { username: sessionUser.username, dm_room_id: roomId })


        //listen for chat events
        socket.on('dm_chat', chat => {
            // when receive a chat, add to messages state var
            setMessages(messages => [...messages, chat]);
            // console.log('chat in socket.on(dm_chat):', chat)
        })

        //when component unmounts, disconnect
        return (() => {
            // socket.removeAllListeners()
            socket.emit('dm_leave', { username: sessionUser.username, recipient: recipientId });
            socket.disconnect();
            setMessages([]);
        })
    }, [recipientId, messages])

    const updateChatInput = e => {
        setChatInput(e.target.value);
    }

    const sendChat = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length === 0) {
            //emit a message
            if (recipientId && sessionUser) socket.emit('dm_chat', { username: sessionUser.username, msg: chatInput, dm_room_id: roomId });

            const dateTime = new Date();
            const isoTime = dateTime.toISOString();
            const date = isoTime.slice(0, 10);
            const time = isoTime.slice(12, 19);
            const combined = date + ' ' + time

            const payload = {
                sender_id: sessionUser.id,
                recipient_id: recipientId,
                message_body: chatInput,
                created_at: combined
            }

            await dispatch(sendDmMessage(payload));
            setHasSubmitted(false);
            setChatInput('');
        }


        //clear input field after message is sent
        setChatInput('');
    }


    return (
        // <div className='dm-chat-container'>
        <div className='dms-container'>
            <div className='dm-history-container'>
                {sessionUser && (
                    dmHistory && dmHistory?.map((message, idx) => (
                        <div className='single-dm' key={idx}>
                            <div className='dm-name'>

                                {message.sender_id === sessionUser.id ?
                                    sessionUser?.username :
                                    recipient?.username}
                            </div>
                            <div className='msg-body' >
                                {message.message_body ?
                                    message?.message_body :
                                    message?.msg}
                            </div>
                        </div>
                    ))

                )}
            </div>

            <div className='chat-box-container'>
                <form
                    onSubmit={sendChat}
                    id='chat-box-form'
                >
                    <input
                        placeholder={`Message ${recipient?.username}`}
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    {/* <button>Send</button> */}
                </form>
            </div>
        </div>
        // </div>
    )
}

export default DmChat;
