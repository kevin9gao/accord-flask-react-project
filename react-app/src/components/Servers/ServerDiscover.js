import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import * as serverActions from "../../store/servers";
import { NavLink } from "react-router-dom";
import JoinServerModal from './JoinServerModal';
import './ServerDiscover.css';

export default function ServerDiscover() {
    const dispatch = useDispatch();

    const servers = useSelector(state => state.servers)
    // console.log("server", servers)
    const serversArray = servers ? Object.values(servers) : null
    console.log("server array",serversArray)

    useEffect(() => {
        dispatch(serverActions.loadServers());
    }, [dispatch])


    return (
        <div className="main-containers">
            <h2>Click on a Server to Join!</h2>
            <div className="card-containers">
                {serversArray && serversArray.map(server => {
                    return (server && (
                        <div
                            key={server.id}
                        >
                            <article
                                className='cards'
                            >
                                <img
                                    src={server.server_cover_pic_url}
                                    className='cover-pics'
                                    alt='cover-pics'
                                />
                                <JoinServerModal server={server} />
                            </article>
                        </div>
                    )
                    )
                }
                )}
            </div>
        </div>
    )
}
