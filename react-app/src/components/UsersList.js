import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadDMHistory } from '../store/chat';
import DmChat from './Dms/Dms';


function UsersList() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(false)

  const sessionUser = useSelector(state => state.session.user);
  const dmConvos = useSelector(state => state.chat)
  // const recipient = Object.values(dmConvos)[0].recipient_id
  // const convoId = Object.values(dmConvos)[0].dm_convo_id

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

//   useEffect(() => {
//     dispatch(loadDMHistory(convoId));
// }, [dispatch])


  const userComponents = users?.map((user) => {
    return (
      <div>
        <button onClick={() => setChat(true)} key={user?.id}>
          {user?.username}
          {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
        </button>
      </div>

    );
  });

  return (
    <>
      <h1>User List: </h1>
      <div>{users && users.map(user => (
        <ul key={user.id}>
          <div onClick={() => setChat(true)}>
            <NavLink to={`/channels/@me/user1`}>
              <li key={user.id}>{user.username}</li>
            </NavLink>
          </div>
        </ul>
      ))}
      </div>
      {chat && <DmChat />}
    </>
  );
}

export default UsersList;
