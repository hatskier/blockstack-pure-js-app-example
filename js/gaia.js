// Read more in documentation
// http://blockstack.github.io/blockstack.js/classes/usersession.html#putfile
function saveFileToGaia() {
  var fileDetails = getFileDetailsFromForm();
  console.log(fileDetails);
  userSession.putFile(fileDetails.name, fileDetails.content, {
    encrypt: fileDetails.encrypt,
    // contentType (You can set a Content-Type header for unencrypted data)
    // sign (You can sign the data with using Users Private Key)
  }).then(function() {
    alert('File: ' + fileDetails.name + ' saved');
  });
}

// Read more in documentation
// http://blockstack.github.io/blockstack.js/classes/usersession.html#listfiles
function listGaiaFiles() {
  var files = [];
  userSession.listFiles(function(filename) {
    files.push(filename);
    return true; // to continue files listing
  }).then(function(filesCount) {
    console.log('Files count: ' + filesCount);
    showFilesList(files);
  });
}

// Read more in documentation
// http://blockstack.github.io/blockstack.js/classes/usersession.html#getfileurl
function listGaiaFilesWithURLs() {
  var files = {};

  var promises = [];
  userSession.listFiles(function(filename) {
    promises.push(
      userSession.getFileUrl(filename).then(function(fileUrl) {
        files[filename] = fileUrl;
      })
    );
    return true;
  }).then(function(filesCount) {
    console.log('Files count: ' + filesCount);
    Promise.all(promises).then(function() {
      showFileListWithUrls(files);
    });
  })
}

// Read more in documentation
// http://blockstack.github.io/blockstack.js/classes/usersession.html#getfile
function getFileFromGaia() {
  var fileDetails = getFileDetailsToReadFromForm();
  userSession.getFile(fileDetails.name, {
    decrypt: fileDetails.decrypt,
    // You also can set these options (read more in docs):
    // app (you can get files from other app)
    // username (you can get other users' files, but you need to know their username)
    // verify (you can check if files signature is valid)
    // zoneFileLookupURL (The URL to use for zonefile lookup)
  }).then(function(content) {
    showFileContent(content);
  }).catch(function(err) {
    console.error(err);
    alert('Error occured, check console');
  });
}

function showFilesList(files) {
  document.getElementById('files-list').innerHTML = JSON.stringify(files, '\t', 2);
}

function showFileListWithUrls(files) {
  document.getElementById('files-list-with-urls').innerHTML = JSON.stringify(files, '\t', 2);
}

function showFileContent(content) {
  document.getElementById('file-content').innerHTML = content;
}

function getFileDetailsToReadFromForm() {
  return {
    name: document.getElementById('filename-to-get').value,
    decrypt: (document.getElementById('decrypt').value == 'Yes'),
  };
}

function getFileDetailsFromForm() {
  return {
    name: document.getElementById('filename').value,
    content: document.getElementById('content').value,
    encrypt: (document.getElementById('access').value == 'Private'),
  };
}