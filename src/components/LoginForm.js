import React, { useState } from 'react';
import loginService from '../services/login';
import PropTypes from 'prop-types';

const LoginForm = ({ notification, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );

      login(user);
      notification(`${user.name} logged in successfully`);
    } catch (exception) {
      notification('Invalid username or password', true);
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
  notification: PropTypes.func,
  login: PropTypes.func
};

export default LoginForm;
