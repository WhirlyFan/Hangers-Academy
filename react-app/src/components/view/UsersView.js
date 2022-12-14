import { useEffect, useState } from "react";
import { getAllUsers } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { addFriendThunk } from "../../store/session";

export default function UsersView() {
  const allUsers = useSelector((state) => state.session.allUsers);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [hasClicked, setHasClicked] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers()).then(() => {
      setHasLoaded(true);
    });
  }, [dispatch, hasClicked]);

  if (!hasLoaded) return null;

  const addFriend = (userId, friendId) => {
    dispatch(addFriendThunk(userId, friendId)).then(() => {
      setHasClicked(!hasClicked);
    });
  };

  const friendIds = sessionUser.friends.map(friend => {
    return friend.id
  })

  return (
    <div>
      <div>
        <div>
          {allUsers.map((user) => {
            return user.id !== sessionUser.id && !friendIds.includes(user.id) && (
              <div key={user.id}>
                <div>{user.username}</div>
                <button onClick={() => addFriend(sessionUser.id, user.id)}>Add Friend</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
