import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Footer from './components/Footer'
import SplashPage from './components/SplashPage';
import ServerDiscover from './components/Servers/ServerDiscover';
import { loadServers } from './store/servers';
import ChannelsNavBar from './components/Channels/ChannelsNavBar';
import CreateServerModal from './components/Servers/CreateServerModal';
import PrivateServer from './components/PrivateServer';
import SingleServer from './components/Servers/SingleServer';
import ServersNavBar from './components/Servers/ServersNavbar';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
          <Footer />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/discover' exact={true}>
          <ServersNavBar />
          <ServerDiscover />
          {/* <CreateServerModal /> move to another place */}
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <ServersNavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/channels/@me' exact={true}>
          <PrivateServer />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:serverId' exact={true}>
          <ChannelsNavBar />
        </ProtectedRoute>
        <ProtectedRoute path='/channels/:serverId' exact={true}>
          <SingleServer />
          {/* <CreateChannelForm /> */}
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
