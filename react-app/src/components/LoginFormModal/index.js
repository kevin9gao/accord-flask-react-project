import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import {Link, NavLink } from 'react-router-dom';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    // const onLoginFormSubmit = e => {
    //     e.preventDefault();
    //     handleClose();
    // }

    return (
        <>
            <button className='button'
                onClick={() => setShowModal(true)}>Log In
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                    <NavLink className='form-misc' to='/sign-up' exact={true} activeClassName='active'>
                    <button className='close-button' onClick={handleClose}>Don't have an account?  Sign up here!</button>
                    </NavLink>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
