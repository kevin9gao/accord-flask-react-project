import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import CreateChannelForm from './CreateChannelForm'

const CreateChannelModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div>
                <button className='create-channel-btn' onClick={()=> setShowModal(true)}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateChannelForm hideForm={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )

}

export default CreateChannelModal;
