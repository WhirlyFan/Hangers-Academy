import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllServersThunk } from "../../store/server";
import styles from "../cssModules/AllServersView.module.css"
import ServerCard from "./ServerCard";
import guild_banner from "../../assets/guild_banner.svg"

export default function AllServersView({ setShowModal }) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)
    const allServersObj = useSelector(state => state.server.allServers)
    const allServersArr = Object.values(allServersObj)

    useEffect(() => {
        dispatch(getAllServersThunk())
    }, [dispatch])

    if (!allServersArr.length) {
        return "Servers loading..."
    }

    const publicServers = allServersArr.map(server => {
        const memberIds = server.Members.map(member => member.id)
        return {...server, memberIds}
    });
    const unjoinedServers = publicServers.filter(server => {
        return !server.memberIds.includes(currentUser.id)
    })

    return (
        <div id={styles.outerContainer}>
            <div id={styles.allServersContainer}>
                <div className={styles.bannerContainer}>
                    <div id={styles.welcomeText}><span>Find your community on Discord</span></div>
                    <img src={guild_banner} alt="banner" className={styles.banner}></img>
                </div>
                <div className={styles.featuredCommunitiesText}>
                    <span>Featured Communities</span>
                </div>
                <div className={styles.allServerCardsContainer}>
                    {unjoinedServers.map((server) => (
                        <div key={server.id} className={styles.serverCard}>
                                <ServerCard server={server} setShowModal={setShowModal} />
                            </div>
                    ))}
                </div>
            </div>
        </div>
    )
};
