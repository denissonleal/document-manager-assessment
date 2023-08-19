import React, { useState, useEffect } from "react";
import FileUpload from './FileUpload'
import FileVersionsList from './FileVersionsList'

import "../resources/css/FileVersions.css";

function FileVersions() {
  const [data, setData] = useState([]);
  const filename = window.location.href.replace(/^http(s)?:\/\/[a-zA-Z0-9\.:]+\//, '');

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {

      const responseData = await (
        await fetch(`http://localhost:8001/api/file_versions?file_name=${filename}`)
      ).json();

      // set state when the data received
      setData(responseData);
    };

    dataFetch();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <h1>File Management: {filename}</h1>

        <FileUpload filename={filename}/>

        <h2>Found {data.length} File Versions</h2>
        <div>
          <FileVersionsList file_versions={data} />
        </div>
      </div>
    </div>
  );
}

export default FileVersions;
