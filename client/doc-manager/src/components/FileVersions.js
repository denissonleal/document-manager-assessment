import React, { useState, useEffect } from "react";
import FileUpload from './FileUpload'
import FileVersionsList from './FileVersionsList'

import "../resources/css/FileVersions.css";

function FileVersions() {
  const [data, setData] = useState([]);
  const filename = window.location.href.replace(/^http(s)?:\/\/[a-zA-Z0-9\.:]+\//, '');

  useEffect(() => {
    const dataFetch = async () => {
      const token = sessionStorage.getItem('authToken');
      // const authData = await (
      //   await fetch('http://localhost:8001/auth-token/', {
      //     method: 'GET',
      //     headers: {
      //       'Authorization': `Token ${token}`
      //     }
      //   })
      // ).json();
      // console.log(authData);

      const response = await fetch(
        `http://localhost:8001/api/file_versions?file_name=${filename}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        }
      );

      if (!response.ok) {
        window.location.href = '/login/';
        return;
      }

      const responseData = await response.json();

      setData(responseData);
    };

    dataFetch();
  }, []);

  return (
    <div>
      <div className="App-body">
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
      </div>
    </div>
  );
}

export default FileVersions;
