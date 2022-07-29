import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { editChannel, deleteChannel } from "../../store/channels";

const EditChannelForm = ({hideForm, channel, setChannelExists}) => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const history = useHistory()
    const channels = useSelector(state => state.channels);
    const channelsArr = Object.values(channels);

    const [ editName, setEditName ] = useState(channel.name);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);


    useEffect(() => {
        const errors = [];
        if (!editName) errors.push("Channel name cannot be empty");
        if (channelsArr.map(channel => channel.name).includes(editName)) errors.push("Channel name must be unique");
        setValidationErrors(errors);
    }, [editName]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if(validationErrors.length) alert("Cannot create channel");

        const payload = {
            id: channel.id,
            name: editName,
            server_id:  channel.server_id,
        };

        let editedChannel = await dispatch(editChannel(payload));
        if (editedChannel) reset();
        setHasSubmitted(false);
        hideForm();
    };

    const reset = () => {
        setEditName("");
    };

    const onCancel = (e) => {
        e.preventDefault();
        hideForm();
    }

    const onDelete = async(e) => {
        e.preventDefault()
        await dispatch(deleteChannel(serverId, channel.id));
        hideForm()
        setChannelExists('false')
        history.push(`/channels/${serverId}`)
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <h3>Edit Channel</h3>
                <button type="button" onClick={(e) => onDelete(e, channel.id)}>Delete Channel</button>
                <label>CHANNEL NAME</label>
                <input
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                />
                <div>
                    <button type="button" onClick={onCancel}>Cancel</button>
                    <button type="submit">Submit Edit Channel</button>
                </div>
            </form>
        </div>
    )
}

export default EditChannelForm;
