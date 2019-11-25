// We assume that user is signed in in this file

var userData = {};

window.addEventListener('load', (event) => {
  if (!userSession.isUserSignedIn()) {
    alert('Error: user is not signed in');
  }

  // Read more in documentation
  // http://blockstack.github.io/blockstack.js/classes/usersession.html#loaduserdata
  userData = userSession.loadUserData();
  document.getElementById('user-data').innerHTML =
    JSON.stringify(userData, '\t', 2);
});
