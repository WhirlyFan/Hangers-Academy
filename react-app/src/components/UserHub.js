import React from "react";
import { useSelector } from "react-redux";
import UserSettingsModal from "./UserSettingsModal";

export default function UserHub() {
    const sessionUser = useSelector(state => state.session.user); 

    return (
        <div>
            <span>{sessionUser.username}</span>
            <UserSettingsModal sessionUser={sessionUser} />
        </div>
    )
};
