import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    const channels = useSelector(state => state.channels)
    const channelsArr = Object.values(channels)


    useEffect(() => {
        dispatch(loadChannels(serverId));
    }, [dispatch])

    return (
        <div>
            <div>
                {}
            </div>
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

            </div>
        </div>
    )
}

export default ChannelsNavBar;
