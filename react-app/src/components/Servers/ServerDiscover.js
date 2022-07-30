import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as serverActions from "../../store/servers";
import { NavLink } from "react-router-dom";
import JoinServerModal from './JoinServerModal';
import './ServerDiscover.css'

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
        <div className="discover-container">
            <div className="discover-upper">
                <h1>
                    Find your community on Accord
                </h1>
                <h2>
                    From gaming, to music, to learning, there's a place for you.
                </h2>
            </div>
            <div className="discover lower">
                <h2>Discover</h2>
                <div className="discover-cards-container">
                    {serversArray && serversArray.map(server => {
                        return (server && (
                            <div className="discover-options" key={server.id}>
                                <JoinServerModal server={server} />
                            </div>
                        )
                        )
                    }
                    )}
                </div>
            </div>
        </div>
    )
}
