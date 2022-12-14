import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/session";
import Login from "./components/Login";
import LoginForm from "./components/auth/LoginForm"
import ServersView from "./components/view/ServersView";
import UserHub from "./components/UserHub";
import FriendsView from "./components/view/FriendsView";
import DirectMessagesView from "./components/view/DirectMessagesView";
import UsersView from "./components/view/UsersView";
import ChannelList from "./components/list/ChannelList";
import MemberList from "./components/list/MemberList";
import MessageView from "./components/view/MessageView";
import AllServersView from "./components/view/AllServersView";
import ProfileView from "./components/view/ProfileView";
import Landing from "./components/Landing";
import Header from "./components/Header";
import LoginForm from './components/auth/LoginForm'

import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }
if (!sessionUser) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

return (
  <div id="main-div">
    <BrowserRouter>
    <div id='server-list'>
      <ServersView />
    </div>
    <div id='user-hub'>
      <UserHub />
    </div>
    <div id='header'>
      <Header />
    </div>
      <Switch>
        <Route path='/friends'>
          <div className='message-view'>
            <FriendsView />
          </div>
          <div className='channel-list'>
            <DirectMessagesView />
          </div>
          <div className="member-list">
            <UsersView />
          </div>
        </Route>
        <Route path='/servers/:serverId/:channelId'>
          <div className='channel-list'>
            <ChannelList />
          </div>
          <div className='member-list'>
            <MemberList />
          </div>
          <div className='message-view'>
            <MessageView />
          </div>
        </Route>
        <Route path='/servers/me/:serverId/:channelId'>
          <div className='channel-list'>
            <DirectMessagesView />
          </div>
          <div className='message-view'>
            <MessageView />
          </div>
        </Route>
        <Route path='/servers' exact={true}>
          <div>
            <AllServersView />
          </div>
        </Route>
        <Route path='/me'>
          <div id='profile-view'>
            <ProfileView />
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
)}

export default App;
