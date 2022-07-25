import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css'
import SignUpForm from './auth/SignUpForm';
import LoginFormModal from './LoginFormModal';
import DemoUser from './LoginFormModal/DemoUser';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (user) {
    sessionLinks = (
      <li>
        <LogoutButton />
      </li>
    )
  } else {
    sessionLinks = (
      <>
        <SignUpForm />
        <LoginFormModal />
        <DemoUser />
      </>
    )
  }

  return (
    <nav>
      <ul className='navigation'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            ACCORD
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/discover' exact={true} activeClassName='active'>
            Discover
          </NavLink>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
