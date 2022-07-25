import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleUserServers } from "../../store/servers";

export default function ServersNavBar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(loadSingleUserServers(user.id));
  }, [dispatch])

  return (
    <h1>Servers Navbar</h1>
  );
}
