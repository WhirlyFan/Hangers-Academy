import React from "react";
import styles from "./cssModules/NotFound.module.css"
import ramen from "../assets/404ramen.gif"
import { useHistory } from "react-router-dom";

export default function NotFound() {
    const history = useHistory();

    function redirectToDiscord() {
        history.push('/login')
    }

    return (
        <div className={styles.bigContainer}>
            <div className={styles.centeredContainer}>
                <div className={styles.headerContainer}>
                    <button className={styles.discordButton} onClick={redirectToDiscord}>
                        Open Discord
                    </button>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.textContainer}>
                        <div id={styles.wrongTurn}>
                            <div>WRONG</div>
                            <div>TURN?</div>
                        </div>
                        <div id={styles.youLookLost}>You look lost, stranger. You know what helps when you’re lost? A piping hot bowl of noodles. Take a seat, we’re frantically at work here cooking up something good.</div>
                    </div>
                    <div className={styles.ramenContainer}>
                        <img src={ramen} alt="ramen-gif" className={styles.ramenGif} />
                    </div>
                </div>
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.centeredFoot}>
                    <div className={styles.imagineContainer}>
                        <div id={styles.imagine}>
                            IMAGINE
                        </div>
                        <div id={styles.APlace}>
                            <div>A</div>
                            <div>PLACE</div>
                        </div>

                        </div>
                    <div className={styles.nameCard}>
                        <div>Linus Huynh</div>
                        <a className={styles.gitContainer} href="https://github.com/linushuynh" target="_blank">
                            <div><img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/></div>
                            <div className={styles.gitText}>Github</div>
                        </a>
                    </div>
                    <div className={styles.nameCard}>
                        <div>Michael Lee</div>
                        <a className={styles.gitContainer} href="https://github.com/WhirlyFan" target="_blank">
                            <div><img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/></div>
                            <div className={styles.gitText}>Github</div>
                        </a>
                    </div>
                    <div className={styles.nameCard}>
                        <div>Kevin Vu</div>
                        <a className={styles.gitContainer} href="https://github.com/kevintvu123" target="_blank">
                            <div><img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/></div>
                            <div className={styles.gitText}>Github</div>
                        </a>
                        </div>
                    <div className={styles.nameCard}>
                        <div>Preston Prince</div>
                        <a className={styles.gitContainer} href="https://github.com/prestonprince" target="_blank">
                            <div><img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/></div>
                            <div className={styles.gitText}>Github</div>
                        </a>
                        </div>
                </div>
                <div className={styles.hrBarContainer}><hr className={styles.hrBar}/></div>
                <div id={styles.bottomButtonContainer}>
                    <button className={styles.discordButton} onClick={redirectToDiscord}>
                        Open Discord
                    </button>
                </div>
            </div>
        </div>
)}
