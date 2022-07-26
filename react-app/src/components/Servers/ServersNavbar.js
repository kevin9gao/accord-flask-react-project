import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadServers, loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import EditServerModal from "./EditServerModal";
import { deleteServer } from "../../store/servers";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  // const userServers = useSelector(state => state.servers['user-servers']);
  const userServers = useSelector(state => state.servers);
  const sessionUser = useSelector(state => state.session.user);


useEffect(() => {
    if (user) dispatch(loadServers(user.id));
  }, [dispatch])

  const deleteServ = async (id) => {
    await dispatch(deleteServer(id))
  }

  if (user) {
    return (
      <div>
        Server Navbar
        <CreateServerModal />
        {/* {Object.values(servers).map(server => (
          <h3>{server.name}</h3>
        ))} */}
        {userServers && Object.values(userServers)?.map(server => (
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
