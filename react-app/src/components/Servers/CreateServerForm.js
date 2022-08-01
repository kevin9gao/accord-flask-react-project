import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createChannel } from "../../store/channels";
import { createServer, joinServer } from "../../store/servers";
import './CreateServer.css';

const CreateServerForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const owner = useSelector(state => state.session.user);
    const servers = useSelector(state => state.servers);
    const serversArray = Object.values(servers);

    const [name, setName] = useState("");
    const [serverPicUrl, setServerPicUrl] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        if (!name) errors.push("Server name cannot be empty");
        setValidationErrors(errors);
    }, [name]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const errors = [];

        if (serversArray.map(server => server.name).includes(name)) errors.push("Server name must be unique");

        if (errors.length > 0) {
            setValidationErrors([...validationErrors, ...errors]);
        }

        if (validationErrors.length) alert("Cannot create new server");

        if (!errors.length) {
            const payload = {
                name,
                owner_id: owner.id,
                server_pic_url: !!serverPicUrl ? serverPicUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZa82uPbc_oNLQh2TxnFsvEQaO4qQTQs14mg&usqp=CAU'
            };

            const createdServer = await dispatch(createServer(payload));
            const joinServerPayload = {
                user_id: owner.id,
                server_id: createdServer.id
            }
            await dispatch(joinServer(joinServerPayload))
            // console.log("FRONTEND ROUTE, createdserver", createdServer)
            // console.log('createserver component, owner: ', owner);
            if (createdServer) {
                reset();
                setHasSubmitted(false);
                hideForm();
                await dispatch(createChannel({ name: 'General', server_id: createdServer.id }))
                history.push(`/channels/${createdServer.id}`);
            }
        }
    }

    const reset = () => {
        setName("");
    };

    return (
        <>
            <form className="create-server" onSubmit={onSubmit}>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
                <h3>Create a server</h3>
                <p className="create-server-p">Your server is where you and your friends hang out. Make yours and start talking.</p>
                <label className="create-server-label">SERVER NAME</label>
                <input
                    className="create-server-input"
                    placeholder={`${owner.username}'s Server`}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="create-server-input"
                    placeholder={'URL to Server Picture'}
                    type="text"
                    value={serverPicUrl}
                    onChange={e => setServerPicUrl(e.target.value)}
                />
                <div className="create-server-bottom-div">
                    <button className="create-server-submit-btn" type="submit">Create Server</button>
                </div>
            </form>
        </>
    )
};

export default CreateServerForm;
