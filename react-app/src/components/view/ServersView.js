import { useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom'
import { getUserThunk } from "../../store/session";
import styles from "../cssModules/ServersView.module.css"

export default function ServersView() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const serversArr = user.servers
    const userId = user.id

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
            <div className={styles.homeButton} onClick={() => redirectFriendsRoute()}>
                <img className={styles.serverItemImage} src='https://cdn.discordapp.com/attachments/1049445170778738789/1051654101286527137/1.png' alt='home-button-icon'/>
            </div>
            <div id={styles.homeBar}>
                <hr />
            </div>
            <div>
                { serversArr.map((server) => (
                    <div className={styles.serverItem} onClick={() => redirectServer(server.id)}>
                       {imgValidator(server.server_img) ? <img className={styles.serverItemImage} src={server.server_img} alt='server_img'/> : server.name[0]}
                    </div>
                ))}
            </div>
        </div>
        // <div>SERVERLIST</div>
    )
};
