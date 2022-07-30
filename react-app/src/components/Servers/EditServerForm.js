import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { editServer } from "../../store/servers";

const EditServerForm = ({ server, hideForm }) => {
    const dispatch = useDispatch();

    const owner = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers);
    const serversArray = Object.values(servers);

    const [editName, setEditName] = useState(server.name);
    const [editServerPicUrl, setEditServerPicUrl] = useState(server.server_pic_url);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        if (!editName) errors.push("Server name cannot be empty");
        if (serversArray.filter(otherServer => otherServer.id !== server.id).map(server => server.name).includes(editName)) {
            errors.push("Server name must be unique");
        }
        setValidationErrors(errors);
    }, [editName, editServerPicUrl]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) alert("Cannot edit channel");

        const payload = {
            id: server.id,
            name: editName,
            owner_id: owner.id,
            server_pic_url: editServerPicUrl
        }
        // console.log("payload in COMPONENT", payload )

        const editedServer = await dispatch(editServer(payload));
        if (editedServer) reset();
        setHasSubmitted(false);
        hideForm();
    }

    const reset = () => {
        setEditName("");
    };

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
                <label className="create-server-label">SERVER NAME</label>
                <input
                    className="create-server-input"
                    type="text"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                />
                <input
                    className="create-server-input"
                    placeholder={'A different picture URL'}
                    type="text"
                    value={editServerPicUrl}
                    onChange={e => setEditServerPicUrl(e.target.value)}
                />
                <div className="create-server-bottom-div">
                    <button className="create-server-submit-btn" type="submit">Edit Server</button>
                </div>
            </form>
        </>
    )
}

export default EditServerForm;
