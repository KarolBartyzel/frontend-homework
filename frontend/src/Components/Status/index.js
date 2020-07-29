import React from 'react';
import PropTypes from 'prop-types';

import Loader from './../Loader';

import './index.css';

const Statuses = {
  IN_PROGRESS: 'In progress',
  SUCCESS: 'Success',
  FAIL: 'Fail'
};

function Status (props) {
  if (props.status === null) {
    return null;
  }
  if (props.status === Statuses.IN_PROGRESS) {
    return <Loader />;
  }
  if (props.status === Statuses.SUCCESS) {
    return <div
      className="status--success">Emails sent successfully</div>;
  }
  if (props.status === Statuses.FAIL) {
    return <div
      className="status--error">
      Failed to send emails to addresses
    </div>;
  }
}

Status.propTypes = {
  status: PropTypes.oneOf(Object.values(Statuses))
};

export { Statuses };
export default Status;
