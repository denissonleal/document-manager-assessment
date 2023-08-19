function FileVersionsList(props) {
  const file_versions = props.file_versions;

  return file_versions.map((file_version) => (
    <div className="file-version" key={file_version.id}>
      <h4>
        File Name: <a
          target="_blank"
          href={"http://localhost:8001/api/file_versions/" + file_version.id}
        >
          {file_version.file_name}
        </a>
      </h4>
      <p>
        ID: {file_version.id} Version: {file_version.version_number}
      </p>
    </div>
  ));
}

export default FileVersionsList;
