import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const sessionUser = useSelector(state => state.session.user);

    const channels = useSelector(state => state.channels)
    console.log("CHANNELS", channels.channel)
    const channelsArr = Object.values(channels)

    console.log("frontend server channels", channelsArr)

    useEffect(() => {
        dispatch(loadChannels(serverId));
    }, [dispatch])



    return (
        <div>
            <div>
                <CreateChannelModal />
            </div>
            <div>
                {channelsArr && channelsArr.map(channel => (
                    <ul>
                        <li key={channel.id}>{channel.name}</li>
                        <EditChannelModal channel={channel}/>
                    </ul>
                ))}
                {/* {sessionUser?.id === } */}
                <button type="submit">Delete Server</button>
            </div>
        </div>
    )
}

export default ChannelsNavBar;
