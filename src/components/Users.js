import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveUsers } from '../reducers/usersReducer';

const Users = ({ users }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveUsers());
  }, []);

  if (users === null) {
    return null;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th><strong>blogs created</strong></th>
          </tr>
        </thead>
        <tbody>
          {users
            .map((user) =>
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  const users = state.users;
  return { users };
};

const ConnectedUsers = connect(mapStateToProps)(Users);
export default ConnectedUsers;