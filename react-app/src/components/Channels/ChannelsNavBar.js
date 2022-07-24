import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChannels } from '../../store/channels';

const ChannelsNavBar = () => {
    const dispatch = useDispatch();

    const channels = useSelector(state => state.channels)

    const channelsArr = Object.values(channels)

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch])

    return (
        <div>
            {channelsArr && channelsArr.map(channel => (
                <li key={channel.id}>{channel.name}</li>
            ))}
        </div>
    )
}

export default ChannelsNavBar;