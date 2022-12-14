import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFriendThunk, getUserThunk } from "../../store/session";
import { postServerThunk, deleteServerThunk } from "../../store/server";

export default function FriendsView() {
    const sessionUser = useSelector(state => state.session.user)
    const { friends } = sessionUser;
    const dispatch = useDispatch();
    const [hasClicked, setHasClicked] = useState(false)
    const history = useHistory()

    useEffect(() => {
        dispatch(getUserThunk(sessionUser.id))
    }, [dispatch, hasClicked]);

    const deleteFriend = (userId, friendId) => {
        dispatch(deleteFriendThunk(userId, friendId))
        const serverToDelete = privServers.find(server => {
            return server.memberIds.includes(userId) && server.memberIds.includes(friendId)
        })
        if (serverToDelete) dispatch(deleteServerThunk(serverToDelete.id)).then(setHasClicked(!hasClicked))
    }

    const privateServers = sessionUser.servers.filter(server => server.private=true)
    const privServers = privateServers.map(server => {
        const memberIds = server.Members.map(member => member.id)
        return {...server, memberIds}
    });

    const messageFriend = (friend) => {
        const privateServer = {
            name: sessionUser.username + '_' +  friend.username,
            server_img: "url",
            private: true
        };

        const server = privServers.find(server => {
            return server.memberIds.includes(friend.id)
        })

        if (server) {
            const channelId = server.Channels[0].id
            history.push(`/servers/me/${server.id}/${channelId}`)
            return;
        }

        dispatch(postServerThunk(privateServer, friend.id)).then(({server, channel}) => {
            history.push(`/servers/me/${server.id}/${channel.id}`)
        })
    }

    return (
        <div>
            <div>
                <p>FRIENDS - {friends.length}</p>
            </div>
            <div>
                <div>
                    {friends.length > 0 ? friends.map(friend => (
                        <div key={friend.id}>
                            {friend.username}
                            <button onClick={() => deleteFriend(sessionUser.id,friend.id)}>Remove Friend</button>
                            <button onClick={() => messageFriend(friend)}>Chat</button>
                        </div>
                    )) :
                    <h3>Try adding a friend from the Users list!</h3>
                }
                </div>
            </div>
        </div>
    )
};
