import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUserThunk } from "../../store/session";
import styles from "../cssModules/ChannelList.module.css"

export default function ChannelList() {
    const dispatch = useDispatch()
    const { serverId } = useParams()
    const [showMenu, setShowMenu] = useState(false);

    const user = useSelector(state => state.session.user)
    const userPublicServersArr = user.public_servers


    useEffect(() => {
        dispatch(getUserThunk(user.id))
    }, [dispatch, user.id])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const server = userPublicServersArr.filter((server) => {
        return server.id === parseInt(serverId)
    })

    const serverName = server[0].name

    return (
        <>
            <div className={styles.channelListContainer}>
                <div className={styles.channelListNavBar} onClick={openMenu}>
                    <div>
                        {serverName}
                    </div>
                    <div className={styles.channelListNavBarDropDown}>
                        <img src='https://www.pngkit.com/png/full/273-2739733_white-drop-down-arrow.png' />
                    </div>
                </div>
                {showMenu && (
                    <div className={styles.dropdownMenu}>
                        <div className={styles.serverSettingsDiv} >
                            <div>
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
            </div>
        </>
    )
};
