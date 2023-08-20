import moment from 'moment';

function FileVersionsList(props) {
  const file_versions = props.file_versions;

  return file_versions.map((file_version) => (
    <div className="file-version" key={file_version.id}>
      <h5>
        File Name: <a
          target="_blank"
          href={"http://localhost:8001/api/file_versions/" + file_version.id}
        >
          {file_version.file_name}
        </a>
      </h5>
      <div className="row align-items-start">
        <div className="col-2">ID: {file_version.id}</div>
        <div className="col-2">Version: {file_version.version_number}</div>
        <div className="col-8">Created: {moment(file_version.created_at).fromNow()}</div>
      </div>
    </div>
  ));
}

export default FileVersionsList;
