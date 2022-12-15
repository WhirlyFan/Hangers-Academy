import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteServerThunk, editServerThunk } from "../../store/server";

function EditServerForm({ setShowEditServerModal, setHasSubmitted, serverId, userId }) {
    const dispatch = useDispatch();
    const history = useHistory()

    //Grabbing the current information of server to place in field
    const user = useSelector(state => state.session.user)
    const userPublicServersArr = user.public_servers
    const server = userPublicServersArr.filter((server) => {
        return server.id === parseInt(serverId)
    })
    const prevServerName = server[0].name
    const prevServerImg = server[0].server_img

    const [serverName, setServerName] = useState(prevServerName)
    const [serverImg, setServerImg] = useState(prevServerImg)
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(editServerThunk({ name: serverName, server_img: serverImg }, serverId, userId))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowEditServerModal(false))
    };

    const handleDelete = () => {
        return dispatch(deleteServerThunk(serverId, userId))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowEditServerModal(false))
            .then(() => history.push('/main/friends'))
    }

    return (
        <div>
            <div>
                Edit Server
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
                    <button type="submit">Edit Server</button>
                    <button onClick={() => handleDelete()}>Delete Server</button>
                </form>
            </div>
        </div>
    );
}

export default EditServerForm;
