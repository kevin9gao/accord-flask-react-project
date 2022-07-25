import React, { useState } from 'react';

import { Modal } from '../../context/Modal';
import CreateChannelForm from './CreateChannelForm';

const CreateChannelModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div>
                <button onClick={()=> setShowModal(true)}>Create Channel</button>
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
