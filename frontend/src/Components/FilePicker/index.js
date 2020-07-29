import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

function FilePicker (props) {
  const filePickerInputRef = React.useRef();

  async function addFiles (files) {
    const fileEntities = await Promise.all(
      files.map(async (file) => {
        const fileContent = await new Promise((resolve, reject) => {
          const fr = new FileReader();
          fr.onload = function () {
            resolve(fr.result);
          };
          fr.readAsText(file);
        });
        const emails = fileContent.replace(/\s+/g, ' ').trim().split(' ');
        return {
          name: file.name,
          emails
        };
      }
      ));
    props.addFiles(fileEntities);
  }

  function onFileDropped (event) {
    event.preventDefault();
    const files = [...event.dataTransfer.files];
    addFiles(files);
  }

  function onFileDraggedOver (event) {
    event.preventDefault();
  }

  function onFilePicked (event) {
    const files = [...event.target.files];
    addFiles(files);
  }

  function onUploadClicked () {
    filePickerInputRef.current.click();
  }

  return (
    <div
      className="file-picker"
      onDropCapture={onFileDropped}
      onDragOver={onFileDraggedOver}>
      <svg
        className="file-picker-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="43"
        viewBox="0 0 50 43"><path
          d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
      <p>Drag one or more files...</p>

      <input
        className="file-picker-input"
        ref={filePickerInputRef}
        type="file"
        multiple
        accept=".txt"
        onChange={onFilePicked} />
      <button
        className="file-picker-button"
        type="button"
        onClick={onUploadClicked}>Upload</button>
    </div>
  );
}

FilePicker.propTypes = {
  addFiles: PropTypes.func.isRequired,
};

export default FilePicker;
