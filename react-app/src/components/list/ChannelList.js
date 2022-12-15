import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getUserThunk } from "../../store/session";
import styles from "../cssModules/ChannelList.module.css"
import { ServerSettingsModal } from "../../context/ServerSettingsModal";
import EditServerForm from "../Forms/EditServerForm";
import CreateChannelForm from "../Forms/CreateChannelForm";

export default function ChannelList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { serverId } = useParams()

    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showEditServerModal, setShowEditServerModal] = useState(false);
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false);

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getUserThunk(user.id))
    }, [dispatch, user.id, hasSubmitted])

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

    const serverFilter = userPublicServersArr.filter((server) => {
        return server.id === parseInt(serverId)
    })
    if (!serverFilter.length) return null

    const server = serverFilter[0]
    const serverName = server.name
    const channelsArr = server.Channels
    // console.log(channelsArr)

    const redirectChannel = (channelId) => {
        history.push(`/main/servers/${server.id}/${channelId}`)
    }

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
                {showMenu && (user.id === server.owner_id) && (
                    <div className={styles.dropdownMenu}>
                        <div className={styles.serverSettingsDiv}>
                            <div className={styles.clickModal} onClick={() => setShowEditServerModal(true)}>
                                Server Settings
                            </div>
                        </div>
                        <div className={styles.serverSettingsDiv}>
                            <div className={styles.clickModal} onClick={() => setShowCreateChannelModal(true)}>
                                Create Channel
                            </div>
                        </div>
                    </div>
                )}
                {showEditServerModal && (
                    <ServerSettingsModal onClose={() => { setShowEditServerModal(false) }} >
                        {<EditServerForm setShowEditServerModal={setShowEditServerModal} setHasSubmitted={setHasSubmitted} serverId={serverId} userId={user.id} />}
                    </ServerSettingsModal>
                )}
                {showCreateChannelModal && (
                    <ServerSettingsModal onClose={() => { setShowCreateChannelModal(false) }}>
                        {<CreateChannelForm setShowCreateChannelModal={setShowCreateChannelModal} setHasSubmitted={setHasSubmitted} serverId={serverId} />}
                    </ServerSettingsModal>
                )}

                {/* Map out the channels for a server */}
                <div>
                    {
                        channelsArr.map((channel) => {
                            return (
                                <div key={channel.id} onClick={() => redirectChannel(channel.id)}>
                                    {channel.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};
