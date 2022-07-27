import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { loadChannels } from '../../store/channels';
import ChannelChat from '../LiveChat/ChannelChat';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'
import { io } from 'socket.io-client';
import ChannelChat from '../LiveChat/ChannelChat';


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

    const room = (room) => {
        if (room) {
            socket.emit('leave', { username: user.username, channel: channel });
            socket.emit('join', {username: user.username, channel: channel })
        } else {
            socket.emit('join', {username: user.username, channel: channel })
        }
      }

    // const leaveRoom = (room) => {
    // }



    let previous;
    // const onChannelClick = (channelName) => {
    //     if(room !== channelName) {
    //         previous = room
    //     }
    //     <ChannelChat room={room} setRoom={setRoom} previousChannel={previous}/>
    // }

    // const onChannelClick = () => {
    //     <ChannelChat/>
    // }


    return (
        <div>
            <div>
                Channels NavBar
            </div>
            <div>
                <CreateChannelModal />
            </div>
            <div>
                {channels && channels.map(channel => (
                    <ul>
                        <NavLink to={`/channels/${serverId}/${channel.id}`}>
                            <li key={channel.id} onClick={() => room(channel)}>{channel.name}</li>
                        </NavLink>
                        {/* <ChannelChat /> */}
                        <EditChannelModal channel={channel}/>
                    </ul>
                ))}

            </div>
        </div>
    )
}

export default ChannelsNavBar;
