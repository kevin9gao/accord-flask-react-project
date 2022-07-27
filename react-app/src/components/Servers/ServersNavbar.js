import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadServers, loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import EditServerModal from "./EditServerModal";
import { deleteServer } from "../../store/servers";
import { NavLink } from "react-router-dom";
import "./ServerNavBar.css"

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => state.servers['user-servers']);
  console.log(userServers)
  const allServers = useSelector(state => state.servers);
  const sessionUser = useSelector(state => state.session.user);
  const userServersArr = userServers ? Object.values(userServers) : null

  // useEffect(()=> {
  //   dispatch(loadServers)
  // }, [dispatch])

  useEffect(() => {
    if (user) dispatch(loadSingleUserServers(sessionUser.id));
  }, [dispatch])


  const deleteServ = async (id) => {
    await dispatch(deleteServer(id))
  }

  if (user) {
    return (
      <div className="server navbar">
        <h2>Logged in user: {user.username}</h2>
        Server Navbar

        {userServersArr && userServersArr.map(server => (
          <div>
            <NavLink to={`/channels/${server.id}`}>
              <h3 className="server-name">{server.name}</h3>
              <img className="server-img" src="https://www.linkpicture.com/q/LPic62e1b7613a8e71742548931.png" type="image" />          </NavLink>
            {sessionUser?.id === server.owner_id &&
              (
                <div>
                  <EditServerModal server={server} />
                  <button type="submit" onClick={(id) => deleteServ(server.id)}>Delete Server</button>
                </div>
              )
            }
          </div>
        ))}
        <CreateServerModal />
      </div>
    );
  } else return null;

}
