import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, useHistory, useLocation } from "react-router-dom";

import ServersView from "./view/ServersView";
import UserHub from "./UserHub";
import FriendsView from "./view/FriendsView";
import DirectMessagesView from "./view/DirectMessagesView";
import UsersView from "./view/UsersView";
import ChannelList from "./list/ChannelList";
import MemberList from "./list/MemberList";
import MessageView from "./view/MessageView";
import AllServersView from "./AllServersModal/AllServersView";
import ProfileView from "./view/ProfileView";
import Header from "./Header";

import '../index.css'

export default function Main() {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const location = useLocation()

    if (!sessionUser) {
        history.push('/')
        return;
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
            {location.pathname !== "/main/servers" && (
            <div id='header'>
                <Header />
            </div>)}
        <Switch>
            <Route path='/main/friends'>
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
            <Route path='/main/servers/:serverId/:channelId' exact={true}>
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
            <Route path='/main/servers/me/:serverId/:channelId' exact={true}>
                <div className='channel-list'>
                    <DirectMessagesView />
                </div>
                <div className='member-list'>
                    <MemberList />
                </div>
                <div className='message-view'>
                    <MessageView />
                </div>
            </Route>
            <Route path='/main/servers' exact={true}>
                <div>
                    <AllServersView />
                </div>
            </Route>
            <Route path='/main/me'>
                <div id='profile-view'>
                    <ProfileView />
                </div>
            </Route>
        </Switch>
        </BrowserRouter>
    </div>
)
};
