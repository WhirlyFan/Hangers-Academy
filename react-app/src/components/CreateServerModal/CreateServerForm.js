import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postServerThunk } from "../../store/server";
import { useHistory } from "react-router-dom";
import styles from "../cssModules/CreateServerForm.module.css"

function CreateServerForm({ setShowModal, setHasSubmitted }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [serverName, setServerName] = useState("")
    const [serverImg, setServerImg] = useState("")
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = [];

        if (serverName.length > 50) {
            errors.push(
                "Please enter a server name that is less than 50 characters"
            )
        }

        setErrors(errors);

        if (!errors.length) {
            setShowModal(false)
            const submitServer = await dispatch(postServerThunk({ name: serverName, server_img: serverImg }))
                .then((response) => {
                    history.push(`/main/servers/${response.server.id}/${response.channel.id}`)
                })
                .then(() => setHasSubmitted(prevValue => !prevValue))
            return submitServer
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formHeader}>
                Customize your server
            </div>
            <div className={styles.formSubText}>
                Give your new server a personality with a name and an icon. You can always change it later.
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formInput}>
                    <input
                        type="text"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                        placeholder='Server Name'
                        required
                    />
                </div>
                <div className={styles.errorMap}>
                    {errors.length > 0 && (
                        <div>
                            {errors.map((error) => (
                                <div key={error}>
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.formInput}>
                    <input
                        type="url"
                        value={serverImg}
                        onChange={(e) => setServerImg(e.target.value)}
                        placeholder='Server Image URL'
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateServerForm;
