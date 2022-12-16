import { useState } from 'react';
import { UserSettingsModal } from '../../context/UserSettingsModal';
import UserSettingsDisplay from './UserSettingsDisplay';

import settings_gear from "../../assets/settings_gear.png"

const UserSettings = ({ sessionUser }) => {
    const [showModal , setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <img
                src={settings_gear}
                alt='settings_gear'
                >
                </img>
            </div>
            {showModal && (
                <UserSettingsModal onClose={() => setShowModal(false)}>
                    <UserSettingsDisplay sessionUser={sessionUser} setShowModal={setShowModal} />
                </UserSettingsModal>
            )}
        </>
    )
};

export default UserSettings;
