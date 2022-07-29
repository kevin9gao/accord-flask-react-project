import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadDMHistory } from '../store/chat';
import DmChat from './Dms/Dms';

import './UsersList.css'

function UsersList() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(false)

  const sessionUser = useSelector(state => state.session.user);
  const usersList = users?.filter(user => {
    return (user.id !== sessionUser.id)
  })

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);



  return (
<div className='user-list-container'>
<div className='user-box'>
    <div>User List:</div>
      {usersList && usersList.map(user => (
        <ul className='user-list' key={user.id}>
          <div onClick={() => setChat(true)}>
            <NavLink to={`/channels/@me/${user.id}`}>
              <li key={user.id}>{user.username}</li>
            </NavLink>
          </div>
        </ul>
      ))}

      {/* {chat && <DmChat />} */}
      </div>
    </div>
  );
}

export default UsersList;
