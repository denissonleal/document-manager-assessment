import ApiUrl from '../constants/ApiUrl';
import React, { useState, useEffect } from "react";
import CreateFile from './CreateFile'
import FileUpload from './FileUpload'
import FileVersionsList from './FileVersionsList'
import TopBar from './TopBar'
import "../resources/css/FileVersions.css";

function FileVersions() {
  const [data, setData] = useState([]);
  const filename = window.location.href.replace(/^http(s)?:\/\/[a-zA-Z0-9\.:]+\//, '');

  useEffect(() => {
    const dataFetch = async () => {
      const token = sessionStorage.getItem('authToken');

      const response = await fetch(
        process.env.REACT_APP_API_URL + ApiUrl.FILE_VERSIONS + `?file_name=${filename}`,
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
      <TopBar/>

      <div className="App-body">
        <div className="container">
          <div className="row justify-content-md-center">
            <h1>File Management: {filename}</h1>

            {filename && <FileUpload filename={filename}/>}
            {!filename && <CreateFile/>}

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
