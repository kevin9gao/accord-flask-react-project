import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { createServer } from "../../store/servers";

const CreateServerForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const owner = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers);
    const serversArray = Object.values(servers);

    const [ name, setName ] = useState("");
    const [ hasSubmitted, setHasSubmitted ] = useState(false);
    const [ validationErrors, setValidationErrors ] = useState([]);
    
    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Server name cannot be empty");
        if (serversArray.map(server => server.name).includes(name)) errors.push("Server name must be unique");
        setValidationErrors(errors);
    }, [name]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) alert("Cannot create new channel");

        const payload = {
            name,
            // ownerId: owner.id
        };

        const createdServer = await dispatch(createServer(payload));
        console.log("FRONTEND ROUTE, createdserver", createdServer)
        if (createdServer) reset();
        setHasSubmitted(false);
        hideForm();
    }

    const reset = () => {
        setName("");
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
            <h3>Create a server</h3>
            <p>Your server is where you and your friends hang out. Make yours and start talking.</p>
            <label>SERVER NAME</label>
            <input 
                placeholder={`${owner.username}'s server`}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <div>
                <button type="submit">Create</button>
            </div>
            </form>
        </>
    )
};

export default CreateServerForm;