import { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserSettingsForm from './UserSettingsForm';

const UserSettingsModal = () => {
    const [shwoModal , setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Settings</button>
        </>
    )
};

export default UserSettingsModal;
