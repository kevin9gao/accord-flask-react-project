import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

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
                    <ul>
                        <NavLink to={`/channels/${serverId}/${channel.id}`}>
                            <li key={channel.id}>{channel.name}</li>
                        </NavLink>
                        <EditChannelModal channel={channel}/>
                    </ul>
                ))}

            </div>
        </div>
    )
}

export default ChannelsNavBar;
