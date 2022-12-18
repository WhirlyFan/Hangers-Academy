import React, { useState } from "react";
import { ServerSettingsModal } from "../../context/ServerSettingsModal";
import CreateServerForm from "./CreateServerForm";
import styles from "../cssModules/ServersView.module.css";

function CreateServerModal({ setHasSubmitted }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <button onClick={() => setShowModal(true)}>
                Create Server
            </button> */}
      <div id={styles.addBtn}>
        <span
          onClick={() => setShowModal(true)}
          style={{ fontWeight: "200", fontSize: "1.5rem" }}
          className="material-symbols-outlined"
        >
          add
        </span>
      </div>
      {showModal && (
        <ServerSettingsModal onClose={() => setShowModal(false)}>
          <CreateServerForm
            setShowModal={setShowModal}
            setHasSubmitted={setHasSubmitted}
          />
        </ServerSettingsModal>
      )}
    </>
  );
}

export default CreateServerModal;
