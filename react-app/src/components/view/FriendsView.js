import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteFriendThunk, getUserThunk } from "../../store/session";
import { postServerThunk, deleteServerThunk } from "../../store/server";

import styles from '../cssModules/FriendsView.module.css'
import message_icon2 from "../../assets/message_icon2.png"
import remove_btn from "../../assets/remove_btn.png"

export default function FriendsView() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const [hasClicked, setHasClicked] = useState(false)
    const history = useHistory()
    
    const { friends } = sessionUser;
    
    useEffect(() => {
        dispatch(getUserThunk(sessionUser.id))
    }, [dispatch, hasClicked, sessionUser.id]);

    const deleteFriend = (userId, friendId) => {
        dispatch(deleteFriendThunk(userId, friendId))
        const serverToDelete = privServers.find(server => {
            return server.memberIds.includes(userId) && server.memberIds.includes(friendId)
        })
        console.log(serverToDelete)
        if (serverToDelete) dispatch(deleteServerThunk(serverToDelete.id)).then(setHasClicked(!hasClicked))
    }

    const privateServers = sessionUser.private_servers.filter(server => server.private=true)
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
            history.push(`/main/servers/me/${server.id}/${channelId}`)
            return;
        }

        dispatch(postServerThunk(privateServer, friend.id)).then(({server, channel}) => {
            history.push(`/main/servers/me/${server.id}/${channel.id}`)
        })
    }

    return (
        <div className={styles.container}>
            <div>
                <p className={styles.friend_label}>FRIENDS - {friends.length}</p>
            </div>
            <div className={styles.friends_container}>
                <div>
                    {friends.length > 0 ? friends.map(friend => (
                        <div className={styles.friend_card} key={friend.id}>
                            <div className={styles.left_half}>
                                <div className="profile-icon-container">
                                </div>
                                <div className={styles.friend}>
                                    <span className={styles.username}>{friend.username}</span>
                                    <span className={styles.status}>Online</span>
                                </div>    
                            </div>
                            <div className={styles.right_half}>
                                <div 
                                className={styles.message_icon_container} 
                                onClick={() => messageFriend(friend)}>
                                    <img
                                    className={styles.message_icon}
                                    src={message_icon2}
                                    alt='messageicon'
                                    >                                    
                                    </img>
                                </div>
                                <div
                                className={styles.message_icon_container} 
                                onClick={() => deleteFriend(sessionUser.id,friend.id)}>
                                     <img
                                    className={styles.message_icon}
                                    src={remove_btn}
                                    alt='remove-btn'
                                    >                                    
                                    </img>
                                </div>
                            </div>
                        </div>
                    )) :
                    <h3 className={styles.no_friends}>Try adding a friend from the Users list!</h3>
                }
                </div>
            </div>
        </div>
    )
};
