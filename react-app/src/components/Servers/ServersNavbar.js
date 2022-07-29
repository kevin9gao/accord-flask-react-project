import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadServers, loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import EditServerModal from "./EditServerModal";
import { leaveServer, deleteServer } from "../../store/servers";
import { NavLink, useHistory } from "react-router-dom";
import './ServersNavBar.css';
export default function ServersNavBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => state.servers['user-servers']);
  // console.log(userServers)
  const allServers = useSelector(state => state.servers);
  const sessionUser = useSelector(state => state.session.user);
  const userServersArr = userServers ? Object.values(userServers) : null

  // useEffect(()=> {
  //   dispatch(loadServers)
  // }, [dispatch])

  useEffect(() => {
    if (user) dispatch(loadSingleUserServers(sessionUser.id));
  }, [dispatch])


  // const deleteServ = async (id) => {
  //   await dispatch(deleteServer(id))
  // }

  // const leaveServ = async(id) => {
  //   // e.preventDefault();

  //   const payload = {
  //     user_id: user?.id,
  //     server_id: id
  //   }
  //   console.log('FRONTEND, payload', payload)
  //   await dispatch(leaveServer(payload))
  // }

  if (user) {
    return (
      <div className="servers-container">
        <div className="display-user">
          <h2>{user.username}</h2>
        </div>
        <div className="server-navbar">
          Server Navbar
          <CreateServerModal />
        </div>

        {userServersArr && userServersArr.map(server => (
          <div className="servers-box" key={server.id}>
            <NavLink className={'servers'} to={`/channels/${server.id}`}>
              <h3>{server.name}</h3>
            </NavLink>
            {sessionUser?.id === server.owner_id &&
            (
              <div>
                {/* <EditServerModal server={server} /> */}
                {/* <button type="submit" onClick={()=> deleteServ(server.id)}>Delete Server</button> */}
                {/* <button onClick={() => leaveServ(server.id)}>Leave Server</button> */}
              </div>
            )
          }
          </div>
        ))}

      </div>
    );
  } else return null;

}
