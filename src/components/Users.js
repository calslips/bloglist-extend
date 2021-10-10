import React from 'react';
import { connect } from 'react-redux';

const Users = ({ users }) => {

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
                <td>{user.name}</td>
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