import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postServerChannelThunk } from "../../store/server";
// import { getUserThunk } from "../../store/session";

function CreateChannelForm({ setShowCreateChannelModal, setHasSubmitted, serverId }) {
    const dispatch = useDispatch();

    const [channelName, setChannelName] = useState('')
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(postServerChannelThunk({ server_id: serverId, name: channelName }))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowCreateChannelModal(false))
    };

    return (
        <div>
            <div>
                Create Channel
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            placeholder='Channel Name'
                            required
                        />
                    </div>
                    <ul className="errorList">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <button type="submit">Create Channel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateChannelForm;