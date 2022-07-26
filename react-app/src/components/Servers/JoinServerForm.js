import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { joinServer } from "../../store/servers";

const JoinServerForm = ({ server, hideForm }) => {
  const serverId = server.id;
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const userServers = useSelector(state => state.servers['user-servers']);
  console.log('userServers: ', userServers)
  console.log('serverId: ', serverId)

  const handleJoin = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: user.id,
      server_id: Number(serverId)
    }

    // console.log('payload in SingleServer component: ', payload)

    await dispatch(joinServer(payload));
    hideForm()
    return <Redirect to={`/channels/${serverId}`} />
  }

  return (
    <div>
      <h1>Join {server.name} Server</h1>
      {/* {!(server.id in userServers) && ( */}
        <button
          onClick={handleJoin}
        >
          Join
        </button>
      {/* )} */}
    </div>
  );
}

export default JoinServerForm;
