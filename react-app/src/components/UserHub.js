import React from "react";
import { useSelector } from "react-redux";
import UserSettings from "./UserSettings";

import styles from './cssModules/UserHub.module.css'

export default function UserHub() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className={styles.hub}>
            <span>{sessionUser.username}</span>
            <UserSettings sessionUser={sessionUser} />
        </div>
    )
};
