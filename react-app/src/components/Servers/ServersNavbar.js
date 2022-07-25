import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserServers, loadSingleUserServers } from "../../store/servers";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => state.servers['user-servers']);

  // console.log('user.id: ', user.id)

  useEffect(async () => {
    if (user) {
      await dispatch(loadSingleUserServers(user.id));
    } else dispatch(clearUserServers());
  }, [dispatch])


  if (user) {
    return (
      <div>
        Server Navbar
        {/* {Object.values(servers).map(server => (
          <h3>{server.name}</h3>
        ))} */}
        {userServers && Object.values(userServers)?.map(server => (
          <h3>{server.name}</h3>
        ))}
      </div>
    );
  } else return null;
}
