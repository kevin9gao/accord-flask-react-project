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
                    <ul key={channel.id}>
                        <div onClick={()=> setRoom(channel.name)}>
                            <NavLink to={`/channels/${serverId}/${channel.id}`}>
                                <li key={channel.id}>{channel.name}</li>
                            </NavLink>
                        </div>
                        <EditChannelModal channel={channel}/>
                    </ul>
                ))}
                <ChannelChat />
            </div>
        </div>
    )
}

export default ChannelsNavBar;
