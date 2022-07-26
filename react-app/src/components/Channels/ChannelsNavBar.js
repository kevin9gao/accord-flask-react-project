import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import { loadServers } from '../../store/servers';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    const server = useSelector(state => state.servers[serverId]);
    console.log('server', server)

    const allChannels = useSelector(state => state.channels)
    const allChannelsArr = Object.values(allChannels)
    console.log('channelsArr', allChannelsArr)

    const channels = allChannelsArr.filter(channel => {
        return channel['server_id'] === Number(serverId);
    })

    useEffect(() => {
        dispatch(loadServers());
        dispatch(loadChannels(serverId));
    }, [dispatch])


    return (
        <div>
            <div>
                Channels NavBar
            </div>
            {sessionUser?.id === server?.owner_id && <div>
                <CreateChannelModal />
            </div>}
            <div>
                {channels && channels.map(channel => (
                    <ul>
                        <NavLink to={`/channels/${serverId}/${channel.id}`}>
                            <li key={channel.id}>{channel.name}</li>
                        </NavLink>
                        {sessionUser?.id === server?.owner_id && <EditChannelModal channel={channel}/>}
                    </ul>
                ))}

            </div>
        </div>
    )
}

export default ChannelsNavBar;
