import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import EditServerModal from "./EditServerModal";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => state ? state.servers['user-servers'] : null);
  const userServersArr = userServers ? Object.values(userServers) : null;
  console.log("frontend",userServers)
  console.log(userServersArr)

  // console.log('user.id: ', user.id)
  // const [servers, setServers ]
  
  // const server = userServers[1]['name']
  // const server = userServersArr?.filter(server => server.id = serverId);
  // console.log(server)

  useEffect(() => {
      dispatch(loadSingleUserServers(user.id));
  }, [dispatch])
  

  if (user) {
    return (
      <div>
        Server Navbar
        <CreateServerModal />
        {/* {Object.values(servers).map(server => (
          <h3>{server.name}</h3>
        ))} */}
        {userServersArr && userServersArr?.map(server => (
        <div>
          <h3>{server.name}</h3>
          <EditServerModal server={server} />
      </div>
        ))}
      </div>
    );
  } else return null;
  
}
