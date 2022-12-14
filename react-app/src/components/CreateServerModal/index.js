import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';

function CreateServerModal({ setHasSubmitted }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create Server</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateServerForm setShowModal={setShowModal} setHasSubmitted={setHasSubmitted} />
                </Modal>
            )}
        </>
    );
}

export default CreateServerModal;