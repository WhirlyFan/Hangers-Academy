import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postServerThunk } from "../../store/server";

function CreateServerForm({ setShowModal, setHasSubmitted }) {
    const dispatch = useDispatch();

    const [serverName, setServerName] = useState("")
    const [serverImg, setServerImg] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(postServerThunk({ name: serverName, private: false, server_img: serverImg }))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowModal(false))
    };

    return (
        <div>
            <div>
                Create Server
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            placeholder='Server Name'
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={serverImg}
                            onChange={(e) => setServerImg(e.target.value)}
                            placeholder='Server Image URL'
                            required
                        />
                    </div>
                    <ul className="errorList">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <button type="submit">Create Server</button>
                </form>
            </div>
        </div>
    );
}

export default CreateServerForm;