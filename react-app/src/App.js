import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/list/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Main from "./components/Main";
import ServersView from "./components/view/ServerView";
import UserHub from "./components/UserHub";
import FriendsView from "./components/view/FriendsView";
import DirectMessagesView from "./components/view/DirectMessagesView";
import UserView from "./components/view/UserView";
import ChannelList from "./components/list/ChannelList";
import MemberList from "./components/list/MemberList";
import ChannelView from "./components/view/ChannelView";
import AllServersView from "./components/view/AllServersView";
import ProfileView from "./components/view/ProfileView";

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

  //if not logged in, redirect to root landing page
  if (!sessionUser) {
    return (
      <BrowserRouter>
        <span>needs to log in</span>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </BrowserRouter>
    );
  }

  //if logged in, redirect to user hub
  return (
    <BrowserRouter>
      <span>logged in</span>
      <ServersView />
      <UserHub />
      <Route path="/friends" exact={true}>
        <FriendsView />
        <DirectMessagesView />
        <UserView />
      </Route>
      <Route path="/servers/:serverId/:channelId">
        <ChannelList />
        <MemberList />
        <ChannelView />
      </Route>
      <Route path="/servers/me/:serverId/:channelId">
        <DirectMessagesView />
        <ChannelView />
      </Route>
      <Route path="/servers" exact={true}>
        <AllServersView />
      </Route>
      <Route path="/me">
        <ProfileView />
      </Route>
    </BrowserRouter>
  );

  // return (
  //   <BrowserRouter>
  //     <NavBar />
  //     <Switch>
  //       <Route path='/login' exact={true}>
  //         <LoginForm />
  //       </Route>
  //       <Route path='/sign-up' exact={true}>
  //         <SignUpForm />
  //       </Route>
  //       <ProtectedRoute path='/users' exact={true} >
  //         <UsersList/>
  //       </ProtectedRoute>
  //       <ProtectedRoute path='/users/:userId' exact={true} >
  //         <User />
  //       </ProtectedRoute>
  //       <Route path='/' exact={true} >
  //         <h1>My Home Page</h1>
  //       </Route>
  //       <Route path='/chat' exact={true} >
  //         <Chat />
  //       </Route>
  //     </Switch>
  //   </BrowserRouter>
  // );
}

export default App;
