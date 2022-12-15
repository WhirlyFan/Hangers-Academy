import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllServersThunk } from "../../store/server";
import styles from "../cssModules/AllServersView.module.css"
import ServerCard from "./ServerCard";
import guild_banner from "../../assets/guild_banner.svg"

export default function AllServersView({ setShowModal }) {
    const dispatch = useDispatch()
    const allServersObj = useSelector(state => state.server.allServers)
    // TO DO: STOP RENDERING SERVERS THAT YOU ARE ALREADY MEMBER OF

    useEffect(() => {
        dispatch(getAllServersThunk())
    }, [dispatch])

    if (Object.keys(allServersObj) < 1) {
        return "Servers loading..."
    }

    return (
        <div id={styles.allServersContainer}>
            <div className={styles.bannerContainer}>
                <div id={styles.welcomeText}><span>Sup Gamers, find a home</span></div>
                <img src={guild_banner} alt="banner" className="banner"></img>
            </div>

            {Object.values(allServersObj).map((server) => (
                    <div key={server.id} className={styles.serverCard}>
                        <ServerCard server={server} setShowModal={setShowModal} />
                    </div>
            ))}
        </div>
    )
};
