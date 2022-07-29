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
      <div>
        <LogoutButton />
      </div>
    )
  } else {
    sessionLinks = (
      <div>
        <div>
          <LoginFormModal />
          <DemoUser />
        </div>
      </div>
    )
  }

  return (
    <nav>
      <ul className='navigation'>
        <div>
          <div>
            {user && (
              <NavLink to='/channels/@me' exact={true} activeClassName='active'>
              ACCORD
              </NavLink>
            )}
            {!user && (
              <NavLink to='/' exact={true} activeClassName='active'>
                ACCORD
              </NavLink>
            )}
          </div>
          <div>
            {/* <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink> */}
          </div>
          <div>
            <NavLink to='/discover' exact={true} activeClassName='active'>
              Discover
            </NavLink>
          </div>
        </div>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
