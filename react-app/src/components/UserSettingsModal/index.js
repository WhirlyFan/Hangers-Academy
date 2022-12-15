import { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserSettingsDisplay from './UserSettingsDisplay';

import settings_gear from "../../assets/settings_gear.svg"

const UserSettingsModal = ({ sessionUser }) => {
    const [showModal , setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <img
                src={settings_gear}
                alt='settings_gear'
                >
                </img>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserSettingsDisplay sessionUser={sessionUser} setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
};

export default UserSettingsModal;
