function FileVersionsList(props) {
  const file_versions = props.file_versions;

  return file_versions.map((file_version) => (
    <div className="file-version" key={file_version.id}>
      <h3>File Name: {file_version.file_name}</h3>
      <p>
        ID: {file_version.id} Version: {file_version.version_number}
      </p>
    </div>
  ));
}

export default FileVersionsList;
