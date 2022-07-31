import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { joinServer } from "../../store/servers";

const JoinServerForm = ({ server, hideForm, setAlreadyJoined, alreadyJoined }) => {
  const serverId = server.id;
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const userServers = useSelector(state => state.servers['user-servers']);

  const userServersArr = userServers ? Object.values(userServers) : null

  const alreadyJoinedServer = userServersArr?.filter(server => {
    return server.id === serverId
  })

  // console.log("ALREADY JOINED??", alreadyJoined, alreadyJoinedServer)

  useEffect(()=> {
    if (alreadyJoinedServer?.length > 0) {
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
    <div className="joined-server-p">You've already joined this server </div>
    <button onClick={()=> hideForm()}>
    <i className="fa-solid fa-circle-xmark"></i>
    </button>
  </div>
  )


  return (
    <div>
      <h1 className="join-server-h1">Join <span className="join-server-name"> {server.name}</span> Server</h1>
      {alreadyJoined && component}
      {!alreadyJoined && (
        <div className="join-server-btn-div">
          <button className="join-server-submit-btn" onClick={handleJoin}> Join </button>
        </div>
      )}
    </div>
  );
}

export default JoinServerForm;
