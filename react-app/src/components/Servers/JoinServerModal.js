import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import JoinServerForm from './JoinServerForm';


function JoinServerModal({ server }) {
    const [showModal, setShowModal] = useState(false);
    const [alreadyJoined, setAlreadyJoined] = useState(false)



    return (
        <>
            <button className='button'
                onClick={() => setShowModal(true)}
            >
                {server.name}
            </button>
            <img src={server.server_pic_url}/>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <JoinServerForm server={server} hideForm={() => setShowModal(false)} setAlreadyJoined={setAlreadyJoined} alreadyJoined={alreadyJoined} />
                </Modal>
            )}
        </>
    );
}

export default JoinServerModal;
