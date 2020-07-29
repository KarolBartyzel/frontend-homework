import React from 'react';
import PropTypes from 'prop-types';

import FileDetails from './FileDetails';

import './index.css';

function FileList (props) {
  function removeFile (fileIndex) {
    return () => {
      const newFiles = [...props.files];
      newFiles.splice(fileIndex, 1);
      props.setFiles(newFiles);
    };
  }

  return (
    <ul
      className="files">
      {props.files && props.files.map((file, index) => <FileDetails
        key={index}
        filename={file.name}
        emails={file.emails}
        removeFile={removeFile(index)} />)}
    </ul>
  );
}

FileList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    emails: PropTypes.arrayOf(PropTypes.string).isRequired
  })).isRequired,
  setFiles: PropTypes.func.isRequired
};

export default FileList;
