import React from "react";
import { useSelector } from "react-redux";

export default function UserHub() {
    const sessionUser = useSelector(state => state.session.user); 

    return (
        <div>
            <span>{sessionUser.username}</span>
            <button>Settings</button>
        </div>
    )
};
