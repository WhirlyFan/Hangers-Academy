import { useState } from 'react';
import { DeleteMessageModal } from "../../context/DeleteMessageModal"

import DeleteMessage from './DeleteMessage';

const UserSettings = ({ message, deleteMessage }) => {
    const [showModal , setShowModal] = useState(false);

    return (
        <>
            <div onClick={() => setShowModal(true)}>
                <span style={{fontWeight: "200"}} className="material-symbols-outlined">
                    more_horiz
                </span>
            </div>
            {showModal && (
                <DeleteMessageModal onClose={() => setShowModal(false)}>
                    <DeleteMessage message={message} deleteMessage={deleteMessage} />
                </DeleteMessageModal>
            )}
        </>
    )
};

export default UserSettings;
