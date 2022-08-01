import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import User from './components/User';
import { authenticate } from './store/session';
import Footer from './components/Footer'
import SplashPage from './components/SplashPage';
import ServerDiscover from './components/Servers/ServerDiscover';
import ChannelsNavBar from './components/Channels/ChannelsNavBar';
import ServersNavBar from './components/Servers/ServersNavbar';
import ServerMainPage from './components/Servers/ServerMainPage';
import DmNavBar from './components/Dms/DmNavBar';
import DmChat from './components/Dms/Dms';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state?.session?.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
          <Footer />
        </Route>
        {/* <Route path='/login' exact={true}>
          <LoginForm />
        </Route> */}
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/discover' exact={true}>
          {user && (
            <ServersNavBar />
          )}
          <ServerDiscover />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <ServersNavBar />
          {/* <UsersList/> */}
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/channels/@me' exact={true}>
          <ServersNavBar />
          <DmNavBar />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/@me/:userId'>
          <ServersNavBar />
          <DmNavBar />
          <DmChat />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:serverId' exact={true}>
          <ServersNavBar />
          <ServerMainPage />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:serverId/:channelId' exact={true}>
          <ServersNavBar />
          <ChannelsNavBar />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/channels/:serverId' exact={true}>
          <SingleServer />
          {/* <CreateChannelForm /> */}
        {/* </ProtectedRoute> */}

      </Switch>
    </BrowserRouter>
  );
}

export default App;
