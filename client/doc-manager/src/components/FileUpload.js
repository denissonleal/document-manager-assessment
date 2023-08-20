import React, { useState, useEffect } from "react";

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [successSubmition, setSuccessSubmition] = useState(false);
  const [failSubmition, setFailSubmition] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const filename = props.filename;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const saveFile = async () => {
    let formData = new FormData();
    const token = sessionStorage.getItem('authToken');

    setSuccessSubmition(false);
    setFailSubmition(false);
    setSubmiting(true);
    formData.append("file_name", filename);
    formData.append("file", selectedFile);

    try {
      const response = await fetch('http://localhost:8001/api/file_versions/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Token ${token}`
        },
      });

      setSubmiting(false);
      if (response.ok) {
        setSuccessSubmition(true);
        window.location.reload();
      } else {
        setFailSubmition(true);
      }
    } catch (error) {
      setFailSubmition(true);
    }
  }

  return (
    <div className="container pb-4 pt-1">
      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label>Upload document:</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <button
              type="button"
              onClick={saveFile}
              className="btn btn-primary float-left mt-2"
              disabled={submiting}
            >
              {submiting ? 'Sending...' : 'Send new document'}
            </button>

            {successSubmition && (
              <div className="alert alert-success" role="alert">
                Successfully submitted file!
              </div>
            )}

            {failSubmition && (
              <div className="alert alert-danger" role="alert">
                Error message!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
