import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import LoginFormDiscover from './LoginFormDiscover';

function LoginFormDiscoverModal() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);


    return (
        <>
            <button
                className='login-here-button'
                onClick={() => setShowModal(true)}>Log In Here!
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginFormDiscover />
                    <NavLink className='form-misc' to='/sign-up' exact={true} activeClassName='active'>
                        <button className='close-button' onClick={handleClose}>Don't have an account?  Sign up here!</button>
                    </NavLink>
                </Modal>
            )}
        </>
    );
}

export default LoginFormDiscoverModal;
