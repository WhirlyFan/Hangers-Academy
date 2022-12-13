import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "./store/session";
import Login from "./components/Login";
import ServersView from "./components/view/ServersView";
import UserHub from "./components/UserHub";
import FriendsView from "./components/view/FriendsView";
import DirectMessagesView from "./components/view/DirectMessagesView";
import UsersView from "./components/view/UsersView";
import ChannelList from "./components/list/ChannelList";
import MemberList from "./components/list/MemberList";
import ChannelView from "./components/view/ChannelView";
import AllServersView from "./components/view/AllServersView";
import ProfileView from "./components/view/ProfileView";
import Landing from "./components/Landing";

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
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

return (
  <div>
    <BrowserRouter>
      <ServersView />
      <UserHub />
      <Switch>
        <Route path='/friends'>
          <FriendsView />
          <DirectMessagesView />
          <UsersView />
        </Route>
        <Route path='/servers/:serverId/:channelId'>
            <ChannelList />
            <MemberList />
            <ChannelView />
        </Route>
        <Route path='/servers/me/:serverId/:channelId'>
            <DirectMessagesView />
            <ChannelView />
        </Route>
        <Route path='/servers' exact={true}>
            <AllServersView />
        </Route>
        <Route path='/me'>
            <ProfileView />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
)}

export default App;
