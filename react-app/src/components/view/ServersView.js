import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getUserThunk } from "../../store/session";
import CreateServerModal from "../CreateServerModal";
import styles from "../cssModules/ServersView.module.css"

export default function ServersView() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const serversArr = user.servers
    const filteredPublicServers = serversArr.filter(server => server.private === false)
    const userId = user.id
    console.log(filteredPublicServers)

    useEffect(() => {
        dispatch(getUserThunk(userId))
    }, [dispatch, userId])

    const redirectServer = (serverId) => {
        history.push(`/servers/${serverId}/1`)
    }

    const redirectFriendsRoute = () => {
        history.push('/friends')
    }

    // This function validates image urls for conditional rendering
    const imgValidator = (imgUrl) => {
        if (imgUrl.slice(imgUrl.length - 3) === "jpg" || imgUrl.slice(imgUrl.length - 3) === "png") return true
        else return false
    }

    return (
        <div className={styles.serversContainer}>
            {/* Home Button */}
            <div className={styles.homeButton} onClick={() => redirectFriendsRoute()}>
                <img className={styles.serverItemImage} src='https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png' alt='home-button-icon' />
            </div>
            <div id={styles.homeBar}>
                <hr />
            </div>
            {/* Maps out all public server user is a member of */}
            <div>
                {
                    filteredPublicServers.map((server) => {
                        return (
                            <div className={styles.serverItem} key={server.id} onClick={() => redirectServer(server.id)}>
                                {imgValidator(server.server_img) ? <img className={styles.serverItemImage} src={server.server_img} alt='server_img' /> : server.name[0]}
                            </div>
                        )
                    })
                }
            </div>
            {/* Add Server Button */}
            <div>
                <CreateServerModal />
            </div>
        </div>
    )
};
