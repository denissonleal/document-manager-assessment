import React, { useState } from 'react';

function CreateFile() {
  const [filename, setFilename] = useState('');

  const handleFilenameChange = (e) => {
    let tmpFilename = e.target.value;
    tmpFilename = tmpFilename.replace(/[^a-zA-Z0-9_/-/.]/g, '-');
    tmpFilename = tmpFilename.replace(/-+/g, '-');
    tmpFilename = tmpFilename.replace(/\/+/g, '/');

    setFilename(tmpFilename)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    window.location.href = '/' + filename.replace(/^\/|\/$/g, '');
  };

  return (
    <div className="container pb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="filename" className="form-label">Filename:</label>
          <input
            type="text"
            className="form-control"
            id="filename"
            value={filename}
            onChange={handleFilenameChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default CreateFile;
