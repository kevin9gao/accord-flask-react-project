import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import {Link, NavLink } from 'react-router-dom';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='button'
                onClick={() => setShowModal(true)}>Log In
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>Don't have an account?  Sign up here!</NavLink>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
