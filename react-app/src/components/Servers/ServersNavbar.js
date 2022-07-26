import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadServers, loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import EditServerModal from "./EditServerModal";
import { deleteServer } from "../../store/servers";

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

  if (user && userServers) {
    return (
      <div>
        <h2>Logged in user: {user.username}</h2>
        Server Navbar
        <CreateServerModal />

        {userServersArr && userServersArr.map(server => (
        <div>
          <h3>{server.name}</h3>

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
