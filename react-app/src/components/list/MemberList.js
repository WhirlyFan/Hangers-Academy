import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllServersThunk } from "../../store/server";

import styles from "../cssModules/UsersView.module.css"

export default function MemberList() {
  const allServers = useSelector(state => state.server.allServers)
  const { serverId } = useParams()

  // useEffect(() => {
  //   dispatch(getAllServersThunk())
  // }, [dispatch])

  // if (!Object.keys(allServers).length) return null

  const members = allServers[+serverId].Members

  return (
    <div className={styles.container}>
      <span className={styles.add_friends}>Members</span>
      <div className={styles.users_list}>
        {members.map((user) => {
          return (
            <div key={user.id} className={styles.user_card}>
              <div className={styles.left}>
                <div className={styles.icon_container}>
                  <img
                    className={styles.icon}
                    src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
                    alt="default-icon"
                  >
                  </img>
                </div>
                <div>{user.username}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    // <div></div>
  )
};
