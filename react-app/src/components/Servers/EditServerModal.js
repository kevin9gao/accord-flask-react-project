import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditServerForm from './EditServerForm';

const EditServerModal = ({ server }) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            
            <div>
                <button onClick={()=> setShowModal(true)}>Edit Server</button>
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

