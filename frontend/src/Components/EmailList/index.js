import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function EmailList (props) {
  return (
    <ul className="email-list">
      {props.emails.map((email) => (
        <li key={email} className="email">{email}</li>
      ))}
    </ul>
  );
}

EmailList.propTypes = {
  emails: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default EmailList;
