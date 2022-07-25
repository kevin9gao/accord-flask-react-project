import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createChannel } from "../../store/channels";

const CreateChannelForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    const channels = useSelector(state => state.channels);
    const channelsArr = Object.values(channels);

    const [ name, setName ] = useState("");
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Channel name cannot be empty");
        if (channelsArr.map(channel => channel.name).includes(name)) errors.push("Channel name must be unique");
        setValidationErrors(errors);
    }, [name]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if(validationErrors.length) alert("Cannot create channel");

        const payload = {
            name,
            server_id:  serverId
        };

        let createdChannel = await dispatch(createChannel(payload));
        if (createdChannel) reset();
        setHasSubmitted(false);
        hideForm();
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
            <form onSubmit={onSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <h3>Create Channel</h3>
                <label>CHANNEL NAME</label>
                <input
                    placeholder="new-channel"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <div>
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Sumbit New Channel</button>
                </div>
            </form>
        </>
    )
}

export default CreateChannelForm;
