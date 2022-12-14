import {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";

export default function DirectMessagesView() {
    const userServers = useSelector(state => state.session.user.servers)

    useEffect(() => {

    }, [userServers])

    const privateServers = userServers.filter(server => server.private === true)

    return (
        <div>
            <ul>
                {privateServers.length > 0 ? privateServers.map(server => (
                <div key={server.id}>{server.name}</div>
                )) : <h3>Try Chatting With a Friend!</h3>}
            </ul>
        </div>
    )
};
