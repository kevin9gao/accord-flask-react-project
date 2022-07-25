import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { editServer } from "../../store/servers";

const EditServerForm = () => {
    const dispatch = useDispatch();

    const owner = useSelector(state => state.session.user);

    const servers = useSelector(state => state.servers);
    const serversArray = Object.values(servers);

    const [ editName, setEditName ] = useState()
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);

    useEffect(() => {
        const errors = [];
        if (!editName) errors.push("Server name cannot be empty");
        if (serversArray.map(server => server.editName).includes(editName)) errors.push("Server name must be unique");
        setValidationErrors(errors);
    }, [editName]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) alert("Cannot edit server");

        const payload = {
            editName,
            owner_id: owner.id
        };

        const edittedServer = await dispatch(editServer(payload));
        if (edittedServer) reset();
        setHasSubmitted(false);
    }

    const reset = () => {
        setEditName("");
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
            <h3>Edit Server</h3>
            <label>SERVER NAME</label>
            <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
            />
            <div>
                <button type="submit">Create</button>
            </div>
            </form>
        </>
    )
}