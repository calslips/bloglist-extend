import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notice }) => {
  if (notice === null) {
    return null;
  }

  let noticeStyle;

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  notice.error
    ? noticeStyle = error
    : noticeStyle = success;

  return <div className='notice' style={noticeStyle}>{notice.message}</div>;
};

Notification.propTypes = {
  notice: PropTypes.object
};

export default Notification;
