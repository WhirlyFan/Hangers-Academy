import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ServersView from "./view/ServersView";
import UserHub from "./UserHub";
import FriendsView from "./view/FriendsView";
import DirectMessagesView from "./view/DirectMessagesView";
import UsersView from "./view/UsersView";
import ChannelList from "./list/ChannelList";
import MemberList from "./list/MemberList";
import MessageView from "./view/MessageView";
import Header from "./Header";
import ProtectedRoute from "./auth/ProtectedRoute";
import NotFound from "./NotFound";

import '../index.css'

export default function Main() {

    return (
        <div className="all">

            <div id="main-div">
                <BrowserRouter>
                    <Switch>
                        <ProtectedRoute exact={true} path='/main/friends'>
                            <div id='server-list'>
                                <ServersView />
                            </div>
                            <div id='user-hub'>
                                <UserHub />
                            </div>
                            <div id='header'>
                                <Header />
                            </div>
                            <div className='message-view'>
                                <FriendsView />
                            </div>
                            <div className='channel-list'>
                                <DirectMessagesView />
                            </div>
                            <div className="member-list">
                                <UsersView />
                            </div>
                        </ProtectedRoute>
                        <Route path='/main/servers/:serverId/:channelId' exact={true}>
                            <div id='server-list'>
                                <ServersView />
                            </div>
                            <div id='user-hub'>
                                <UserHub />
                            </div>
                            <div id='header'>
                                <Header />
                            </div>
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
                            <div id='server-list'>
                                <ServersView />
                            </div>
                            <div id='user-hub'>
                                <UserHub />
                            </div>
                            <div id='header'>
                                <Header />
                            </div>
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
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    )
};
