import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUserThunk } from "../../store/session";
import styles from "../cssModules/ChannelList.module.css"
import { ServerSettingsModal } from "../../context/ServerSettingsModal";
import EditServerForm from "../Forms/EditServerForm";

export default function ChannelList() {
    const dispatch = useDispatch()
    const { serverId } = useParams()

    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserThunk(user.id))
    }, [dispatch, user.id])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const userPublicServersArr = user.public_servers
    if (!userPublicServersArr.length) return null

    const server = userPublicServersArr.filter((server) => {
        return server.id === parseInt(serverId)
    })
    if (!server.length) return null

    const serverName = server[0].name


    return (
        <>
            <div className={styles.channelListContainer}>
                {/* This is the top nav bar logic for opening menu and modals */}
                <div className={styles.channelListNavBar} onClick={() => setShowMenu(true)}>
                    <div>
                        {serverName}
                    </div>
                    <div className={styles.channelListNavBarDropDown}>
                        <img src='https://www.pngkit.com/png/full/273-2739733_white-drop-down-arrow.png' alt="dropdown icon" />
                    </div>
                </div>
                {showMenu && (
                    <div className={styles.dropdownMenu}>
                        <div className={styles.serverSettingsDiv}>
                            <div className={styles.clickModal} onClick={() => setShowModal(true)}>
                                Server Settings
                            </div>
                        </div>
                        <div className={styles.serverSettingsDiv}>
                            <div>
                                Create Channel
                            </div>
                        </div>
                    </div>
                )}
                {showModal && (
                    <ServerSettingsModal onClose={() => { setShowModal(false) }} >
                        {<EditServerForm setShowModal={setShowModal} serverId={serverId} userId={user.id} />}
                    </ServerSettingsModal>
                )}
            </div>
        </>
    )
};
