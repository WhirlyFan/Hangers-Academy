import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AllServersView from './AllServersView.js';
import styles from '../cssModules/ServersView.module.css'

function AllServerModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button  className={styles.homeButton} onClick={() => setShowModal(true)}>
                <img className={styles.serverItemImage} src='https://cdn3.emoji.gg/emojis/6473-greencompass.png' alt='home-button-icon' />
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AllServersView setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default AllServerModal;
