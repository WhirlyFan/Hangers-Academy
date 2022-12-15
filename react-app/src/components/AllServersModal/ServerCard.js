import styles from "../cssModules/AllServersView.module.css"
import { postServerMemberThunk } from "../../store/server"
import { useSelector, useDispatch } from "react-redux"

const ServerCard = ({ server, setShowModal }) => {
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const imgValidator = (imgUrl) => {
        if (!imgUrl) return false
        if (imgUrl.slice(imgUrl.length - 3) === "jpg" || imgUrl.slice(imgUrl.length - 3) === "png") return true
        else return false
    }
    const addToServer = () => {
        dispatch(postServerMemberThunk(server.id, currentUser.id))
        setShowModal(false)
    }

    return (
        <>
            { imgValidator(server.server_img) ?
                <div className={styles.cardImgContainer} onClick={addToServer}>
                    <img src={server.server_img} className={styles.cardImg} alt="server_img"/>
                </div>
                :
                <div className={styles.cardImgContainer} onClick={addToServer}>
                    <img src="https://cdn.discordapp.com/attachments/1049445170778738789/1051654100976160888/2.png" className={styles.cardImg} alt="server_img"/>
                </div>}
            <div className={styles.cardTextContainer} onClick={addToServer}>
                <div>{server.name}</div>
                <div className={styles.cardDescriptiveText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                <div className={styles.cardDescriptiveText}>Members: {server.Members.length}</div>
            </div>
        </>
    )
}

export default ServerCard
