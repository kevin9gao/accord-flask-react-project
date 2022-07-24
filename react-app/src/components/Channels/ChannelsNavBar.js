import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadChannels } from '../../store/channels';
import CreateChannelModal from '../CreateChannelModal.js';

const ChannelsNavBar = () => {
    const dispatch = useDispatch();

    const channels = useSelector(state => state.channels)

    const channelsArr = Object.values(channels)

    useEffect(() => {
        dispatch(loadChannels());
    }, [dispatch])

    return (
        <div>
            <div>
                <CreateChannelModal />
            </div>
            <div>
                {channelsArr && channelsArr.map(channel => (
                    <li key={channel.id}>{channel.name}</li>
                ))}
            </div>
        </div>
    )
}

export default ChannelsNavBar;