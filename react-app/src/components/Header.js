import { useLocation } from "react-router-dom"
import styles from "./cssModules/Header.module.css"
import friend_btn from "./../assets/friend_btn.png"
import { useSelector } from "react-redux"
export default function Header() {
    const location = useLocation()
    const locationPathArr = (location.pathname).split('/')

    const user = useSelector(state => state.session.user)

    let serverChannelName
    let otherMember

    if (locationPathArr.length === 5) {
        const publicServers = user.public_servers

        for (let server of publicServers) {
            for (let channel of server.Channels) {
                if (channel.id === parseInt(locationPathArr[4])) {
                    serverChannelName = channel.name
                }
            }
        }
    }

    if (locationPathArr.length === 6) {
        const privateServers = user.private_servers

        for (let server of privateServers) {
            if (server.id === parseInt(locationPathArr[4]))
                otherMember = (server.name.split("_")[1])
        }

    }

    return (
        <div className={styles.bigContainer}>
            {(locationPathArr[2] === "friends") && (
                <div className={styles.headerContainer}>
                    <div className={styles.friendButtonContainer}>
                        <img
                            className={styles.friend}
                            src={friend_btn}
                            alt='friendbtn'
                        >
                        </img>
                    </div>
                    <div>
                        Friends
                    </div>
                </div>
            )
            }
            {(locationPathArr.length === 5) && (
                <div className={styles.headerContainer}>
                    <div className={styles.friendButtonContainer}>
                        <span className="material-symbols-outlined">
                            tag
                        </span>
                    </div>
                    <div>
                        {serverChannelName}
                    </div>
                </div>
            )}
            {(locationPathArr.length === 6) && (
                <div className={styles.headerContainer}>
                    <div className={styles.friendButtonContainer}>
                        <span className="material-symbols-outlined">
                            alternate_email
                        </span>
                    </div>
                    <div>
                        {otherMember}
                    </div>
                </div>
            )}
        </div >
    )
};
