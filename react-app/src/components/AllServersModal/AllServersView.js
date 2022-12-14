import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllServersThunk } from "../../store/server";
import styles from "../cssModules/AllServersView.module.css"
import ServerCard from "./ServerCard";

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
            {Object.values(allServersObj).map((server) => (
                    <div key={server.id} className={styles.serverCard}>
                        <ServerCard server={server} setShowModal={setShowModal} />
                    </div>
            ))}
        </div>
    )
};
