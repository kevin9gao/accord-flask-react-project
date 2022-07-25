import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditChannelForm from './EditChannelForm';

const EditChannelModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div>
                <button onClick={()=> setShowModal(true)}>Edit Channel</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannelForm hideForm={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )

}

export default EditChannelModal;
