let timeoutID;

export const setNotice = (noticeContent, duration, category) => {
  clearTimeout(timeoutID);
  return (dispatch) => {
    dispatch({
      type: 'POST_NOTICE',
      notification: noticeContent,
      category
    });
    timeoutID = setTimeout(() => {
      dispatch(clearNotice());
    }, duration * 1000);
  };
};

const clearNotice = () => {
  return {
    type: 'CLEAR_NOTICE',
    notification: []
  };
};

const noticeReducer = (state = [], action) => {
  switch (action.type) {
  case 'POST_NOTICE':
    return [action.notification, action.category];
  case 'CLEAR_NOTICE':
    return [];
  default:
    return state;
  }
};

export default noticeReducer;