import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditServerForm from './EditServerForm';

import '../Channels/ChannelsNavBar.css'

const EditServerModal = ({ server }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            
            <div>
                <button className='drp-server-btn' onClick={()=> setShowModal(true)}>Edit Server</button>
                <i className="fa-solid fa-pen-to-square"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditServerForm server={server} hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    )

}

export default EditServerModal;

