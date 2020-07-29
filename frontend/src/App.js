import React from 'react';

import FilePicker from './Components/FilePicker';
import FileList from './Components/FileList';
import Status, { Statuses } from './Components/Status';
import EmailList from './Components/EmailList';

import { sendEmails } from './Api';

import './App.css';

function App () {
  const [files, setFiles] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [errorEmails, setErrorEmails] = React.useState([]);

  React.useEffect(() => {
    if (files !== null) {
      setStatus(null);
      setErrorEmails([]);
    }
  }, [files]);

  function addFiles (newFiles) {
    if (files !== null) {
      setFiles([...files, ...newFiles]);
    } else {
      setFiles(newFiles);
    }
  }

  function onFormSubmit (event) {
    event.preventDefault();
    setErrorEmails([]);
    setStatus(Statuses.IN_PROGRESS);
    setTimeout(() => { // For Loading demonstration
      const uniqueEmails = [...new Set(files.flatMap((file) => file.emails))];
      sendEmails(uniqueEmails)
        .then(async (response) => {
          if (response.status === 200) {
            setFiles(null);
            setStatus(Statuses.SUCCESS);
          } else if (response.status === 500) {
            const { emails } = await response.json();
            setStatus(Statuses.FAIL);
            setErrorEmails([...emails]);
          }
        });
    }, [500]);
  }

  return (
    <div
      className="app">
      <form className="form" onSubmit={onFormSubmit}>
        <h2>Select files with emails</h2>
        <FilePicker
          addFiles={addFiles} />

        <h3>Uploaded files</h3>
        <FileList
          files={files}
          setFiles={setFiles} />

        <button
          className="form-submit"
          type="submit"
          title={status === Statuses.IN_PROGRESS ? 'Request is already in progress' : !files ? 'At least one file has to be picked' : ''}
          disabled={status === Statuses.IN_PROGRESS || files === null}>Send emails</button>

        <Status
          status={status} />
        <EmailList
          emails={errorEmails} />
      </form>
    </div>
  );
}

export default App;
