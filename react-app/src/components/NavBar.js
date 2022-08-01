import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './NavBar.css'
import LoginFormModal from './LoginFormModal';
import DemoUser from './LoginFormModal/DemoUser';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  if (!user) {
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
      <ul className={user? 'navigation-home': "navigation"}>
        <div>
          <div className='accord-logo-div'>
            {user && (
              <NavLink className='accord-logo' to='/channels/@me' exact={true} activeClassName='active'>
              ACCORD
              </NavLink>
            )}
            {!user && (
              <NavLink className='accord-logo-no-user' to='/' exact={true} activeClassName='active'>
                ACCORD
              </NavLink>
            )}
          </div>
          <div>
            {/* <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink> */}
          </div>
          <div className='splash-discover-div'>
            {!user && (
              <NavLink className='splash-discover' to='/discover' exact={true} activeClassName='active'>
                DISCOVER
              </NavLink>
            )}
          </div>
        </div>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
