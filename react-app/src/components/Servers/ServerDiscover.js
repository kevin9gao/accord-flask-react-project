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
    const user = useSelector(state => state.session.user)

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

    let discoverComp = (
        <div className="discover-container-no-user">
            <NavLink className='accord-logo-no-user' id="accord-discover" to='/' exact={true} activeClassName='active'>ACCORD</NavLink>
            <div className="discover-upper-no-user">
                <h1>
                    Find your community on Accord
                </h1>
                <h2>
                    From gaming, to music, to learning, there's a place for you.
                </h2>
            </div>
            <div className="discover lower-no-user">
                <h2 className="discover-no-user">Discover</h2>
                <div className="discover-cards-container-no-user">
                    {serversArray && serversArray.map(server => {
                        return (server && (
                            <div className="card-inner-container-no-user" key={server.id}>
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


    return (
        <div>
            {!user && discoverComp}
            {user && (
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
                        <h2 className="discover">Discover</h2>
                        <div className="discover-cards-container">
                            {serversArray && serversArray.map(server => {
                                return (server && (
                                    <div className="card-inner-container" key={server.id}>
                                        <JoinServerModal server={server} />
                                    </div>
                                )
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
