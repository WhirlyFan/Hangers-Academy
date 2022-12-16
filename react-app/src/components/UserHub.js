import React from "react";
import { useSelector } from "react-redux";
import UserSettings from "./UserSettings";

import styles from './cssModules/UserHub.module.css'

export default function UserHub() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className={styles.hub}>
            <div className={styles.left_side}>
                <div className={styles.icon_container}>
                    <img 
                    className={styles.icon}
                    src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png"
                    alt="default-icon"
                    >
                    </img>
                </div>
                <span>{sessionUser.username}</span>
            </div>
            <UserSettings sessionUser={sessionUser} />
        </div>
    )
};
