import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { deleteFriendThunk } from "../../store/session";

export default function FriendsView() {
    const sessionUser = useSelector(state => state.session.user)
    const { friends } = sessionUser; 
    const dispatch = useDispatch();
    const [hasClicked, setHasClicked] = useState(false)
  
    useEffect(() => {

    }, [dispatch, hasClicked]);
    
    const deleteFriend = (userId, friendId) => {
        dispatch(deleteFriendThunk(userId, friendId)).then(() => {
            setHasClicked(!hasClicked)
        })
    }

    // const messageFriend = () => {
        
    // }

    //TODO remove li element style

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
                        </div>
                    )) :
                    <h3>Try adding a friend from the Users list!</h3>
                }
                </div>
            </div>
        </div>
    )
};
