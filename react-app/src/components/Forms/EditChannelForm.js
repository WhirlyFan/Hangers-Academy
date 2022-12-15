import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editServerChannelThunk } from "../../store/server";
import { deleteServerChannelThunk } from "../../store/server";

function EditChannelForm({ setShowEditChannelModal, setHasSubmitted, serverId }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const params = useParams()
    const channelId = params.channelId
    // console.log(params.channelId)

    //Grabbing the current information of server to place in field
    const user = useSelector(state => state.session.user)
    const userPublicServersArr = user.public_servers
    const server = userPublicServersArr.filter((server) => {
        return server.id === parseInt(serverId)
    })

    //Grabbing the current information of channel within server with channelId
    const channel = server[0].Channels.filter((channel) => {
        return channel.id === parseInt(channelId)
    })

    const prevChannelName = channel[0].name

    const [channelName, setChannelName] = useState(prevChannelName)
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(editServerChannelThunk({ channel_id: channelId, name: channelName }))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowEditChannelModal(false))
    };

    const handleDelete = () => {
        return dispatch(deleteServerChannelThunk(channelId))
            .then(() => setHasSubmitted(prevValue => !prevValue))
            .then(() => setShowEditChannelModal(false))
            .then(() => history.push(`/main/servers/${serverId}/1`))
    }

    return (
        <div>
            <div>
                Edit Channel
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
                    <button type="submit">Edit Channel</button>
                    <button onClick={() => handleDelete()}>Delete Channel</button>
                </form>
            </div>
        </div>
    );
}

export default EditChannelForm;