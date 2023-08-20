import moment from 'moment';

function FileVersionsList(props) {
  const file_versions = props.file_versions;

  const download = async (event) =>{
    const document_id = event.target.getAttribute('data-id');
    const filename = event.target.getAttribute('data-filename');
    const token = sessionStorage.getItem('authToken');

    fetch(`http://localhost:8001/api/file_versions/${document_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, // Se necessário
      },
    })
    .then(response => {
      if (!response.ok) {
        alert('Error downloading file')
        throw new Error('Error downloading file');
      }
      return response.blob();
    })
    .then(blobData => {
      const url = window.URL.createObjectURL(new Blob([blobData]));
      const link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Erro:', error);
    });
  };

  return file_versions.map((file_version) => (
    <div className="file-version">
      <h5>
        File Name: <a
          href={"/" + file_version.file_name}
        >
          {file_version.file_name}
        </a>
      </h5>
      <div className="row align-items-start">
        <div className="col-2">ID: {file_version.id}</div>
        <div className="col-2">Version: {file_version.version_number}</div>
        <div className="col-5">Created: {moment(file_version.created_at).fromNow()}</div>
        {/* <div className="col-2"><a href={"http://localhost:8001/api/file_versions/" + file_version.id} target="_blank">Download</a></div> */}
        <div className="col-3">
            <button
              type="button"
              onClick={download}
              data-id={file_version.id}
              data-filename={file_version.file_name}
              className="btn btn-primary"
            >
              Download
            </button>
          </div>
      </div>
    </div>
  ));
}

export default FileVersionsList;
