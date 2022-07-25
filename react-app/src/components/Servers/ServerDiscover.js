import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as serverActions from "../../store/servers";
import { NavLink } from "react-router-dom";

export default function ServerDiscover() {
    const dispatch = useDispatch();

    const servers = useSelector(state => state.servers)
    // console.log("server", servers)
    const serversArray = servers ? Object.values(servers) : null
    // console.log("server array",serversArray)

    useEffect(() => {
        dispatch(serverActions.loadServers());
    }, [dispatch])


    return (
        <div>
            {serversArray && serversArray.map(server => {
                return (server && (
                    <div key={server.id}>
                        <NavLink to={`/channels/${server.id}`}>
                            {server.name}
                        </NavLink>
                    </div>
                    /* add NavLink for the server */
                )
                )
            }
            )}
        </div>
    )
}
