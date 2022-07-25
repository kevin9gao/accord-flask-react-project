import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import CreateChannelModal from './CreateChannelModal.js';
import EditChannelModal from './EditChannelModal.js'

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    const channels = useSelector(state => state.channels)

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
                    <li key={channel.id}>{channel.name}</li>
                    <EditChannelModal />
                ))}
            </div>
        </div>
    )
}

export default ChannelsNavBar;
