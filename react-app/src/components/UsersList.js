import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DmChat from './Dms/Dms';


function UsersList() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(false)


  const user = useSelector(state => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);



  const userComponents = users.map((user) => {
    return (
      <div>
        <button onClick={() => setChat(true)} key={user.id}>
          <div>
            {/* <NavLink to={`/channels/@me/${messagesId}`}> */}
              <li key={user.id}>{user.username}</li>
            {/* </NavLink> */}
          </div>
          {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
        </button>
      </div>

    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
      {chat && <DmChat />}


    </>
  );
}

export default UsersList;
