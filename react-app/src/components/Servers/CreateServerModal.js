import { useState } from 'react';
import './ServersNavBar.css';
import './ServerModal.css'
import { Modal } from '../../context/Modal';
import CreateServerForm from './CreateServerForm';

const CreateServerModal = () => {
    const [ showModal, setShowModal ] = useState(false);

    return (
        <div>
            <div id='modal-content create-server-div'>
                <button id='create-server' onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-circle-plus"></i>
                </button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateServerForm hideForm={() => setShowModal(false)}/>
                </Modal>
            )}
        </div>
    )
};

export default CreateServerModal;
