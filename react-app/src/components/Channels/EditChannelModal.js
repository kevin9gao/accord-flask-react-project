import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import EditChannelForm from './EditChannelForm';

const EditChannelModal = ({channel, setChannelExists}) => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>

            <div>
                <button className='edit-channel-btn' onClick={()=> setShowModal(true)}>
                <i className="fa-solid fa-gear"></i>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditChannelForm channel={channel} hideForm={() => setShowModal(false)} setChannelExists={setChannelExists}/>
                </Modal>
            )}
        </div>
    )

}

export default EditChannelModal;
