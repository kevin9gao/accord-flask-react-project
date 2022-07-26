import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadServers, loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import EditServerModal from "./EditServerModal";
import { deleteServer } from "../../store/servers";
import { NavLink } from "react-router-dom";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => state.servers['user-servers']);
  const allServers = useSelector(state => state.servers);
  const sessionUser = useSelector(state => state.session.user);
  const userServersArr = userServers ? Object.values(userServers) : null

console.log("UPDATED SERVER? FROM NAVBAR", userServers)
useEffect(()=> {
  dispatch(loadServers)
}, [dispatch])

useEffect(() => {
    if (user) dispatch(loadSingleUserServers(user.id));
  }, [dispatch])

  const deleteServ = async (id) => {
    await dispatch(deleteServer(id))
  }

  if (user) {
    return (
      <div>
        <h2>Logged in user: {user.username}</h2>
        Server Navbar
        <CreateServerModal />

        {userServersArr && userServersArr.map(server => (
        <div>
          <NavLink to={`/channels/${server.id}`}>
            <h3>{server.name}</h3>
          </NavLink>
          {sessionUser?.id === server.owner_id &&
            (
              <div>
                <EditServerModal server={server} />
                <button type="submit" onClick={(id)=> deleteServ(server.id)}>Delete Server</button>
              </div>
            )
          }
      </div>
        ))}
      </div>
    );
  } else return null;

}
