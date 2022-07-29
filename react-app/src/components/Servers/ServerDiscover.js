import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as serverActions from "../../store/servers";
import { NavLink } from "react-router-dom";
import JoinServerModal from './JoinServerModal';

export default function ServerDiscover() {
    const dispatch = useDispatch();

    const servers = useSelector(state => state.servers)

    const userServers = servers ? servers['user-servers'] : null
    const userServersArr = userServers ? Object.values(userServers) : null
    // console.log(userServersArr)
    const serversArray = servers ? Object.values(servers) : null
    // console.log("server array",serversArray)
  
    serversArray?.pop();
    // console.log(serversArray)

    useEffect(() => {
        dispatch(serverActions.loadServers());
    }, [dispatch])


    return (
        <div>
            <h2>Click on a Server to Join!</h2>
            {serversArray && serversArray.map(server => {
                return (server && (
                    <div key={server.id}>
                        <JoinServerModal server={server} />
                    </div>
                )
                )
            }
            )}
        </div>
    )
}
