import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createChannel } from "../../store/channels";
import './CreateChannel.css';

const CreateChannelForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    const channels = useSelector(state => state.channels);
    const channelsArr = Object.values(channels);

    const [name, setName] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Channel name cannot be empty");
        setValidationErrors(errors);
    }, [name]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const errors = [];

        if (channelsArr.map(channel => channel.name).includes(name)) errors.push("Channel name must be unique");
        // console.log('channelsArr.map(channel => channel.name).includes(name)', channelsArr.map(channel => channel.name).includes(name))

        // console.log('errors', errors);
        if (errors.length > 0) {
            // console.log('validationErrors', validationErrors)
            // console.log('errors', errors)
            setValidationErrors([...validationErrors, ...errors]);
            // console.log('validationErrors', validationErrors)
        }

        if (validationErrors.length) alert("Cannot create channel");

        if (!errors.length) {
            const payload = {
                name,
                server_id: serverId
            };

            let createdChannel = await dispatch(createChannel(payload));
            if (createdChannel) reset();
            setHasSubmitted(false);
            hideForm();
        }
    };

    const reset = () => {
        setName("");
    };

    const onCancel = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <>
            <form className="create-channel" onSubmit={onSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <h3>Create Channel</h3>
                <div></div>
                <label className="create-channel-label">CHANNEL NAME</label>
                <input
                    className="create-channel-input"
                    placeholder="new-channel"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <div className="create-channel-bottom-div">
                    <button className="cancel-create-channel-btn" type="button" onClick={onCancel}>Cancel</button>
                    <button className="create-channel-submit-btn" type="submit">Create Channel</button>
                </div>
            </form>
        </>
    )
}

export default CreateChannelForm;
