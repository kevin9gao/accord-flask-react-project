import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'
import { io } from 'socket.io-client';
import ChannelChat from '../LiveChat/ChannelChat';


const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [room, setRoom] = useState('')
    const [onChannel, setOnChannel] = useState(false)
    const [messages, setMessages] = useState([]);

    // const [room, setRoom] = useState('')

    const allChannels = useSelector(state => state.channels)
    const allChannelsArr = Object.values(allChannels)
    console.log('channelsArr', allChannelsArr)

    const channels = allChannelsArr.filter(channel => {
        return channel['server_id'] === Number(serverId);
    })

    useEffect(() => {
        dispatch(loadChannels(serverId));
    }, [dispatch])



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

    console.log("ONCHANNEL VALUE". onChannel)

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
                        <div onClick={()=> {
                            setOnChannel(true)
                            setMessages([])
                            }}>
                            <NavLink to={`/channels/${serverId}/${channel.id}`}>
                                <li key={channel.id}>{channel.name}</li>
                            </NavLink>
                        </div>
                        <EditChannelModal channel={channel} />
                    </ul>
                ))}
                { onChannel && <ChannelChat messages={messages} setMessages={setMessages} />}

            </div>
        </div>
    )
}

export default ChannelsNavBar;
