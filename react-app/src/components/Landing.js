import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import landing_background from "../assets/landing_background.svg";
import landing_right from "../assets/landing_right.svg";
import landing_left from "../assets/landing_left.svg";
import body1 from "../assets/body1.svg";
import body2 from "../assets/body2.svg";
import body3 from "../assets/body3.svg";
import body4 from "../assets/body4.svg";
import styles from "./cssModules/Landing.module.css";

//fix background layout
export default function Landing() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    history.push("/main/friends");
  }

  const openDiscord = (e) => {
    e.preventDefault();
    history.push(`/login`);
  };

  return (
    <div className={styles.landing}>
      <div className={styles.container}>
        <div className={styles.body0}>
          <div className={styles.text1}>IMAGINE A PLACE...</div>
          <p className={styles.text2}>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day and
            hang out more often.
          </p>
          <img src={landing_background} alt="landing_background"></img>
          <img
            className={styles.left}
            src={landing_left}
            alt="landing_left"
          ></img>
          <img
            className={styles.right}
            src={landing_right}
            alt="landing-right"
          ></img>
          <button className={styles.login_button} onClick={openDiscord}>
            Open Discord in your browser
          </button>
        </div>
        <div className={styles.extra_pics}>
          <div className={styles.card1_container}>
            <div className={styles.card1}>
              <div className={styles.body1}>
                <img src={body1} alt="body1"></img>
              </div>
              <div className={styles.card1_text}>
                <span className={styles.card1_text_upper}>
                  Create an invite-only place where you belong
                </span>
                <span className={styles.card1_text_lower}>
                  Discord servers are organized into topic-based 
                  channels where you can collaborate, share, and 
                  just talk about your day without clogging up a group chat.
                </span>
              </div>
            </div>
          </div>
          <div className={styles.card2_container}>
            <div className={styles.card1}>
              <div className={styles.card1_text}>
                <span className={styles.card1_text_upper}>
                  Where hanging out is easy
                </span>
                <span className={styles.card1_text_lower}>
                  Grab a seat in a voice channel when you’re free. 
                  Friends in your server can see you’re around and instantly 
                  pop in to talk without having to call.
                </span>
              </div>
              <div className={styles.body2}>
                <img src={body2} alt="body2"></img>
              </div>
            </div>
          </div>
          <div className={styles.card1_container}>
            <div className={styles.card1}> 
              <div className={styles.body3}>
                <img src={body3} alt="body3"></img>
              </div>
              <div className={styles.card1_text}>
                <span className={styles.card1_text_upper}>
                  From few to a fandom
                </span>
                <span className={styles.card1_text_lower}>
                  Get any community running with moderation tools and 
                  custom member access. Give members special powers, 
                  set up private channels, and more.
                </span>
              </div>
            </div>
          </div>
          <div className={styles.card3_container}>
            <div className={styles.card3}>
              <div className={styles.card3_text}>
                <span className={styles.card3_text_upper}>
                  RELIABLE TECH FOR STAYING CLOSE
                </span>
                <span className={styles.card3_text_lower}>
                  Low-latency voice and video feels like you’re in the same room. 
                  Wave hello over video, watch friends stream their games, or gather 
                  up and have a drawing session with screen share.
                </span>
              </div>
            <div className={styles.body4}>
              <img src={body4} alt="body4"></img>
            </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_content_container}>
            <div className={styles.footer_card1}>
              <div className={styles.footer_title}>
                <h2>IMAGINE A PLACE</h2>
              </div>
            </div>
            <div className={styles.footer_card}>
              <span className={styles.names}>Linus Huynh</span>
              <div className={styles.link_container}>
                <a className={styles.links} href="https://github.com/linushuynh" target="_blank">
                  <img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/>
                  <span>Github</span>
                </a>
              </div>
            </div>
            <div className={styles.footer_card}>
              <span className={styles.names}>Michael Lee</span>
              <div className={styles.link_container}>
                <a className={styles.links} href="https://github.com/WhirlyFan" target="_blank">
                  <img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/>
                  <span>Github</span>
                </a>
              </div>
            </div>
            <div className={styles.footer_card}>
              <span className={styles.names}>Kevin Vu</span>
              <div className={styles.link_container}>
                <a className={styles.links} href="https://github.com/kevintvu123" target="_blank">
                  <img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/>
                  <span>Github</span>
                </a>
              </div>
            </div>
            <div className={styles.footer_card}>
              <span className={styles.names}>Preston Prince</span>
              <div className={styles.link_container}>
                <a className={styles.links} href="https://github.com/prestonprince" target="_blank">
                  <img className={styles.githubImg} src="https://img.icons8.com/ios-glyphs/30/FFFFFF/github.png"/>
                  <span>Github</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className={styles.background}>
  // <img
  //   className={styles.background_image}
  //   src={landing_background}
  //   alt="landing_background"
  // ></img>
  // <img
  //   className={styles.left_image}
  //   src={landing_left}
  //   alt="landing_left"
  // ></img>
  // <img
  //   className={styles.right_image}
  //   src={landing_right}
  //   alt="landing-right"
  // ></img>
  //     <div>
  // <button className={styles.login_button} onClick={openDiscord}>
  //   Open Discord in your browser
  // </button>
  //     </div>
  //   </div>
  // );
}
