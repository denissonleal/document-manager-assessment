import React, { useState, useEffect } from "react";

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const filename = props.filename;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const saveFile = async () =>{
    let formData = new FormData();

    formData.append("file_name", filename);
    formData.append("file", selectedFile);

    try {
      const response = await fetch('http://localhost:8001/api/file_versions/', {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        console.log('Upload successful!');
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div className="container">
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
            >
              Send new document
            </button>

              {/* {status ? <h2>{status}</h2>:null} */}

          </form>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
