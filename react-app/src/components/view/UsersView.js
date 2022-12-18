import { useEffect, useState } from "react";
import { getAllUsers } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { addFriendThunk } from "../../store/session";

import styles from "../cssModules/UsersView.module.css";

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

  const friendIds = sessionUser.friends.map((friend) => {
    return friend.id;
  });

  return (
    <div className={styles.container}>
      <span className={styles.add_friends}>Add Friends</span>
      <div className={styles.users_list}>
        {allUsers.map((user) => {
          return (
            user.id !== sessionUser.id &&
            !friendIds.includes(user.id) && (
              <div key={user.id} className={styles.user_card}>
                <div className={styles.left}>
                  <div className={styles.icon_container}>
                    <img
                      className={styles.icon}
                      src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
                      alt="default-icon"
                    ></img>
                  </div>
                  <div className={styles.user_box}>{user.username}</div>
                </div>
                <div
                  onClick={() => addFriend(sessionUser.id, user.id)}
                  className={styles.right}
                >
                  <span className="material-symbols-outlined">add</span>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
