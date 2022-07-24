import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadServers } from '../../store/servers';

import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';

const ServerNavBar = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div>
                <button onClick={() => setShowModal(true)}>Create Server</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateServerForm hideForm={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
};

export default ServerNavBar;
