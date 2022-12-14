import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import LoginForm from "./components/auth/LoginForm"
import Landing from "./components/Landing";
import Main from "./components/Main"

import './index.css'

function App() {
  const [loaded, setLoaded] = useState(false);
  // const sessionUser = useSelector((state) => state.session.user);
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

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true}>
          <Landing />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/main'>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  )
// if (!sessionUser) {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path='/' exact={true}>
//           <Landing />
//         </Route>
//         <Route path='/login'>
//           <LoginForm />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   )
// }

// return (
//   <div id="main-div">
//     <BrowserRouter>
//     <div id='server-list'>
//       <ServersView />
//     </div>
//     <div id='user-hub'>
//       <UserHub />
//     </div>
//     <div id='header'>
//       <Header />
//     </div>
//       <Switch>
//         <Route path='/friends'>
//           <div className='message-view'>
//             <FriendsView />
//           </div>
//           <div className='channel-list'>
//             <DirectMessagesView />
//           </div>
//           <div className="member-list">
//             <UsersView />
//           </div>
//         </Route>
//         <Route path='/servers/:serverId/:channelId'>
//           <div className='channel-list'>
//             <ChannelList />
//           </div>
//           <div className='member-list'>
//             <MemberList />
//           </div>
//           <div className='message-view'>
//             <MessageView />
//           </div>
//         </Route>
//         <Route path='/servers/me/:serverId/:channelId'>
//           <div className='channel-list'>
//             <DirectMessagesView />
//           </div>
//           <div className='message-view'>
//             <MessageView />
//           </div>
//         </Route>
//         <Route path='/servers' exact={true}>
//           <div>
//             <AllServersView />
//           </div>
//         </Route>
//         <Route path='/me'>
//           <div id='profile-view'>
//             <ProfileView />
//           </div>
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   </div>
//   )
}

export default App;
