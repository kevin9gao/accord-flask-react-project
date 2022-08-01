import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import JoinServerForm from './JoinServerForm';
import './ServerDiscover.css'


function JoinServerModal({ server }) {
    const [showModal, setShowModal] = useState(false);
    const [alreadyJoined, setAlreadyJoined] = useState(false)



    return (
        <>
            <div className='server-card'>
                <button className='server-card-button' onClick={() => setShowModal(true)}>
                <img className='server-photo' src={server.server_pic_url} alt='server' />
                <div className='server-card-name'>{server.name}</div>
                </button>
            </div>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <JoinServerForm server={server} hideForm={() => setShowModal(false)} setAlreadyJoined={setAlreadyJoined} alreadyJoined={alreadyJoined} />
                </Modal>
            )}
        </>
    );
}

export default JoinServerModal;
