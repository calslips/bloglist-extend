import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigation = ({ logout }) => {
  const navStyle = {
    backgroundColor: 'lightgrey',
    padding: 5,
    marginBottom: 5
  };
  const padding = {
    paddingRight: 5
  };

  const user = useSelector((state) => state.user);

  return (
    <div style={navStyle}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <span>{user.name} logged in <button onClick={logout}>logout</button></span>
    </div>
  );
};

export default Navigation;