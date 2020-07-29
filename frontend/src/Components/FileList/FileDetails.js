import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function FileDetails (props) {
  return (
    <li
      className="file-details">
      {`${props.filename} (${props.emails.length} emails)`}
      <button
        className="file-details-remove"
        type="button"
        onClick={props.removeFile}>{'\u274C'}</button>
    </li>
  );
}

FileDetails.propTypes = {
  filename: PropTypes.string.isRequired,
  emails: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFile: PropTypes.func.isRequired,
};

export default FileDetails;
