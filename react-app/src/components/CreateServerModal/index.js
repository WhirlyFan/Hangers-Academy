import React, { useState } from 'react';
import { ServerSettingsModal } from '../../context/ServerSettingsModal';
import CreateServerForm from './CreateServerForm';

function CreateServerModal({ setHasSubmitted }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create Server</button>
            {showModal && (
                <ServerSettingsModal onClose={() => setShowModal(false)}>
                    <CreateServerForm setShowModal={setShowModal} setHasSubmitted={setHasSubmitted} />
                </ServerSettingsModal>
            )}
        </>
    );
}

export default CreateServerModal;