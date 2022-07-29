import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteServer, leaveServer, loadSingleUserServers } from "../../store/servers";
import EditServerModal from "../Servers/EditServerModal";

const ServerNameDropDown = ({ server }) => {

    const user = useSelector(state => state.session.user)
    // const userServers = useSelector(state => state?.servers['user-servers'])
    const [ showMenu, setShowMenu ] = useState(false);
    const dispatch = useDispatch();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;
    }, [showMenu]);

    const deleteServ = async (id) => {
        await dispatch(deleteServer(id))
      }

    const leaveServ = async(id) => {
        // e.preventDefault();
    
        const payload = {
          user_id: user?.id,
          server_id: id
        }
        console.log('FRONTEND, payload', payload)
        await dispatch(leaveServer(payload))
      }
    
    console.log(server)

    return (
        <>
            <h3>{server && (
                server?.name
            )}</h3>
            <button onClick={() => setShowMenu(!showMenu)}>
                <i className="fa-solid fa-angle-down"></i>
            </button>
            {showMenu && (
                <div>
                    {user?.id === server?.owner_id && (
                        <div>
                            <EditServerModal server={server} />  
                            <div>
                                <button type="submit" onClick={()=> deleteServ(server.id)}>Delete Server</button>
                                <i className="fa-solid fa-trash-can"></i>
                            </div>
                        </div>
                    )}
                    <div>
                        <button onClick={() => leaveServ(server.id)}>Leave Server</button>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </div>
                </div>
            )}
        </>
    )
}

export default ServerNameDropDown;