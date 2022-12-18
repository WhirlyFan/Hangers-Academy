import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AllServersView from "./AllServersView.js";
import styles from "../cssModules/ServersView.module.css";

function AllServerModal({ setHasSubmitted }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id={styles.discoverButton} onClick={() => setShowModal(true)}>
        <span
          className="material-symbols-outlined"
          id={styles.discoverButtonImg}
        >
          explore
        </span>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AllServersView
            setShowModal={setShowModal}
            setHasSubmitted={setHasSubmitted}
          />
        </Modal>
      )}
    </>
  );
}

export default AllServerModal;
