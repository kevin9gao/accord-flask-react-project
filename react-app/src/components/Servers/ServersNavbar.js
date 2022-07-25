import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUserServers, loadSingleUserServers } from "../../store/servers";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const servers = useSelector(state => state.servers);

  // console.log('user.id: ', user.id)

  let userServers;

  useEffect(async () => {
    if (user) {
      userServers = await dispatch(loadSingleUserServers(user.id));
      console.log('userServers: ', userServers)
    } else dispatch(clearUserServers());
  }, [dispatch])

  return (
    <div>
      Server Navbar
      {servers && Object.values(servers).map(server => (
        <h3>{server.name}</h3>
      ))}
    </div>
  );
}
