import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signup } from '../../store/session';
import LoginFormDiscoverModal from './LoginFormDiscoverModal';
import './SignUp.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setErrors([]);
      return dispatch(signup(username, email, password))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
      })
      // const data = await dispatch(signup(username, email, password));
      // if (data) {
      //   setErrors(data)
    }
    return setErrors(['Repeat password field must be the same as the Password field.']);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/discover' />;
  }

  return (
    <div className='signup-container'>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <h2>
            Create an account
          </h2>
        </div>
        <div className='shift-right'>
          <label>User Name</label>
          <div className='shift-right'>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
        </div>
        <div className='shift-right'>
          <label>Email</label>
          <div className='shift-right'>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          </div>
        </div>
        <div className='shift-right'>
          <label>Password</label>
          <div className='shift-right'>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
          </div>
        </div>
        <div className='shift-right'>
          <label>Repeat Password</label>
          <div className='shift-right'>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
          </div>
          <div className='shift-right'>
            <button className='signup-button' type='submit'>Sign Up</button>
          </div>
        </div>
      </form>
      <div>Already have an account?
        <LoginFormDiscoverModal />
      </div>
    </div>
  );
};

export default SignUpForm;
