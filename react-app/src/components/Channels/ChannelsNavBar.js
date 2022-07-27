import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import ChannelChat from '../LiveChat/ChannelChat';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'


const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [room, setRoom] = useState('')
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
