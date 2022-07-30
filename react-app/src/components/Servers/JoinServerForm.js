import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { joinServer } from "../../store/servers";

const JoinServerForm = ({ server, hideForm, setAlreadyJoined, alreadyJoined }) => {
  const serverId = server.id;
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const userServers = useSelector(state => state.servers['user-servers']);

  const userServersArr = userServers ? Object.values(userServers) : null

  const alreadyJoinedServer = userServersArr.filter(server => {
    return server.id === serverId
  })

  console.log("ALREADY JOINED??", alreadyJoined, alreadyJoinedServer)

  useEffect(()=> {
    if (alreadyJoinedServer.length > 0) {
      setAlreadyJoined(true)
    }
  }, [alreadyJoinedServer])

  const handleJoin = async (e) => {
    // e.preventDefault();

    if (!user) {
      history.push('/sign-up')
    } else {
      if (!alreadyJoined) {

        const payload = {
          user_id: user.id,
          server_id: Number(serverId)
        }


        await dispatch(joinServer(payload));
        hideForm()
        return <Redirect to={`/channels/${serverId}`} />
      }
    }
  }


  let component = (
  <div>
    <div>You've already joined this server </div>
    <button onClick={()=> hideForm()}>Close</button>
  </div>
  )


  return (
    <div>
      <h1>Join <span className="join-server-name"> {server.name}</span> Server</h1>
      {alreadyJoined && component}
      {!alreadyJoined && (
        <button onClick={handleJoin}> Join </button>
      )}
    </div>
  );
}

export default JoinServerForm;
