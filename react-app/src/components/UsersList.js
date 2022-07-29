import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DmChat from './Dms/Dms';

import './UsersList.css'

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
          {user.username}
          {/* <NavLink to={`/users/${user.id}`}>{user.username}</NavLink> */}
        </button>
      </div>

    );
  });

  return (
    <div className='user-list-container'>
      <div className='user-box'>
        <div>User List:</div>
        <div>
          <ul className='user-list'>{userComponents}</ul>
          {chat && <DmChat />}
        </div>
      </div>


    </div>
  );
}

export default UsersList;
