# General Component Architecture
## App Component
This component will be the foundation for our app. It will render two components based on the url route. If a user is not signed in, they will be redirected to a LoginPage component. Once logged in, the user will be taken to the Main component.

```Javascript
return (
    <BrowserRouter>
        <Route path='/'>
            <Landing />
        </Route>
        <Route path='/login' exact={true}>
            <Login />
        </Route>
        <Route path='/main'>
            <Main />
        </Route>
    </BrowserRouter>
)
```

## Login Component
This component will be just one page containing a form for the user to login or signup

## Main Component
This component will house all other components. We will use this component in order to structure where we want our other components to be located. (using css grid)

```Javascript
if (!sessionUser) {
    history.push('/')
}

return (
    <BrowserRouter>
        <ServersView />
        <UserHub />
        <Route path='/main/friends' exact={true}>
            <FriendsView />
            <DirectMessagesView />
            <UserView />
        </Route>
        <Route path='/main/servers/:serverId/:channelId'>
            <ChannelList />
            <MemberList />
            <ChannelView />
        </Route>
        <Route path='/main/servers/me/:serverId/:channelId'>
            <DirectMessagesView />
            <ChannelView />
        </Route>
        <Route path='/main/servers' exact={true}>
            <AllServersView />
        </Route>
        <Route path='/main/me'>
            <ProfileView />
        </Route>
    </BrowserRouter>
)
```

## FriendsView Component
This will be the component that user are redirected to upon logging in. It will show a list of each of the user's friends, each friend being its own component (FriendCard) (if any).

```Javascript
return (
    <ul>
        <li><FriendCard /></li>
    </ul>    
)
```

## FriendCard Component
This component will show a friend's username, default pfp (initial), a message icon button that will bring the user to the DM's between them and their friend, and a remove friend button that removes the user from the friends list.
 
![friendcard](https://cdn.discordapp.com/attachments/1049836343137673328/1051922595521507378/image.png)

## DirectMessagesView Component
This component houses a list of DMCards that when clicked upon, will bring the user to a private server showing messages between the two users.

```Javascript
return (
    <button>Friends</button>
    <span>Direct Messages</span>
    <ul>
        <li><DMCard /></li>
    </ul>
)
```

## DMCard
This component is a card that shows the username of the friend the user has a private server with. When clicked, it will bring the user to a private server showing messages between the two users.

![DMCard](https://cdn.discordapp.com/attachments/1024379154608701571/1051931035631374436/image.png)

## ChannelView
This component will house a list of all message components (Message) in that channel displayed by ascending id, as well as a message input component (InputMessage) so that the user can send messages in that channel in real time.

```Javascript
return (
    <ul>
        <li><Message /></li>
    </ul>
    <InputMessage />
)
```

## Message 
This component will render the message content as well as the username of the user who sent it, as well as a timestamp of when the user sent the message. (minus reactions)

![Message](https://cdn.discordapp.com/attachments/1049445170778738789/1051934004187758602/image.png)

## Input Message
This component will render an input to send a message to the channel.

![InputMessage](https://cdn.discordapp.com/attachments/1049445170778738789/1051934439699132506/image.png)

## ChannelList Component
This component will render a list of ChannelCard Components for the current server.

```Javascript
return (
    <ul>
        <li><ChannelCard /></li>
    </ul>
)
```
## ChannelCard Component
This component will render the name of the channel and when clicked, will bring the user to the selected channel.

![ChannelCard](https://cdn.discordapp.com/attachments/1049445170778738789/1051935451818242088/image.png)

## MemberList Component
This component will render a list of MemberCard Components for the members in the current server.

```Javascript
return (
    <ul>
        <li><MemberCard /></li>
    </ul>
)
```

## MemberCard
This component will render the username the member in the server. (READ ONLY)

![MemberCard](https://cdn.discordapp.com/attachments/1049445170778738789/1051936664727064576/image.png)
