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
    // console.log("server", servers)
    const serversArray = servers ? Object.values(servers) : null
    // console.log("server array",serversArray)

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
            <div className="discover">
                <h2>Discover</h2>
                <div className="discover-options-grid">
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
            {/* <div className="discover-right1">
                <h1>
                    Find your community on Accord
                </h1>
                <h2>
                    From gaming, to music, to learning, there's a place for you.
                </h2>
                <div className="discover-right2">
                    <h1>
                        hello
                    </h1>
                </div>
            </div> */}
            {/* <div className="discover">
                <h2>Discover</h2>
                <div className="discover-options">
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
            </div> */}
        </div>
    )
}
