import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notification = ({ notice, category }) => {
  if (notice === null) {
    return null;
  }

  const style = {
    color: category === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };

  return (
    <>
      {notice &&
        (<div className='notice' style={style}>{notice}</div>)}
    </>
  );
};

Notification.propTypes = {
  notice: PropTypes.string,
  category: PropTypes.string
};

const mapStateToProps = (state) => {
  const [notice, category] = state.notification;
  return {
    notice,
    category
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
