import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import loginService from '../services/login';
import { setNotice } from '../reducers/noticeReducer';
import PropTypes from 'prop-types';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );

      login(user);
      dispatch(setNotice(`${user.name} logged in successfully`, 5, 'success'));
    } catch (exception) {
      dispatch(setNotice('Invalid username or password', 5, 'fail'));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func
};

export default LoginForm;
