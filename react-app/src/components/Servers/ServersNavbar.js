import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleUserServers } from "../../store/servers";
import CreateServerModal from "./CreateServerModal";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import './ServersNavBar.css';

export default function ServersNavBar() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const userServers = useSelector(state => state.servers['user-servers']);
  // console.log(userServers)
  const userServersArr = userServers ? Object.values(userServers) : null


  useEffect(() => {
    if (user) dispatch(loadSingleUserServers(user.id));
  }, [dispatch])


  if (user) {
    return (
      <div className="servers-container">
        <NavBar />
        <div>
          {userServersArr && userServersArr.map(server => (
            <div className="servers-box" key={server.id}>
                <NavLink className={'servers'} to={`/channels/${server.id}`}>
                  <h3 className="server-name-nav-bar">{server.name[0].toUpperCase()}</h3>
                </NavLink>
              </div>
          ))}
          <CreateServerModal />
          <div>
            <NavLink className='discover' to='/discover' exact={true} activeClassName='active'>
            <i className="fa-solid fa-compass"></i>
            </NavLink>
          </div>

        </div>

      </div>
    );
  } else return null;

}
