import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { loadChannels } from '../../store/channels';
import ChannelChat from '../LiveChat/ChannelChat';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'



let socket;

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    socket = io();

    const allChannels = useSelector(state => state.channels)
    // console.log("channelsSELECTOR", allChannels)
    const allChannelsArr = Object.values(allChannels)
    const user = useSelector(state => state.session.user);
    const id = 5;
    const channel = allChannels[id]
    console.log(channel)
    // console.log('channelsArr', allChannelsArr)

    const channels = allChannelsArr.filter(channel => {
        return channel['server_id'] === Number(serverId);
    })

    useEffect(() => {
        dispatch(loadChannels(serverId));
    }, [dispatch]);


    // socket.on('connect', () => {
    //     socket.send("I am connected");
    // });

    // socket.on('message', data => {
    //     console.log(`message received:" ${data}`);
    // });
    const [ channelRoom, setChannelRoom ] = useState(false);

    // const room = (channel) => {
    //     let newRoom = channel;
    //     if (newRoom === channel) {
    //         console.log('You are already in the room');
    //     } else {
    //         socket.emit('leave', { username: user.username, channel: channel });
    //         socket.emit('join', {username: user.username, channel: newRoom })
    //     }
    //   }

    let room;

    allChannelsArr.forEach(channel => {
        channel.onClick = () => {
            let newRoom = channel;
            if (newRoom == room) {
                console.log("You are already in the room.");
            } else {
                leaveRoom(channel);
                joinRoom(newRoom);
            }
        }
    });

    const leaveRoom = (channel) => {
        socket.emit('leave', {"username": user.username, "channel": channel})
    }

    const joinRoom = (newRoom) => {
        socket.emit('join', { 'username': user.username, "channel": newRoom})
    }


    // const leaveRoom = (room) => {
    // }


    // const [ room, setRoom ] = useState('');
    // let previous;
    // const onChannelClick = (channelName) => {
    //     if(room !== channelName) {
    //         previous = room
    //     }
        // <ChannelChat room={room} setRoom={setRoom} previousChannel={previous}/>
    // }

    // const onChannelClick = () => {
    //     <ChannelChat/>
    // }

      const channelComponents = channels.map(channel => {
        return (
            <div>
            <ul>
                {/* <button onClick={() => onChannelClick(channel.name)}> */}
                    <NavLink to={`/channels/${serverId}/${channel.id}`}>
                        <li key={channel.id} onClick={() => setChannelRoom(true)}>{channel.name}</li>
                    </NavLink>
                {/* </button> */}
                <EditChannelModal channel={channel}/>
            </ul>
            </div>
        )
      })
    return (
        <div>
            <div>
                Channels NavBar
            </div>
            <div>
                <CreateChannelModal />
            </div>
            {/* <div>
                {channels && channels.map(channel => (
                    <ul>
                        <NavLink to={`/channels/${serverId}/${channel.id}`}>
                            <li key={channel.id} onClick={() => room(channel)}>{channel.name}</li>
                        </NavLink>
                     
                        <EditChannelModal channel={channel}/>
                    </ul>
                ))}
            </div> */}
            <div>{channels && channelComponents}</div>
            {channelRoom && <ChannelChat />}
        </div>
    )
}

export default ChannelsNavBar;
