// We assume that user is signed in in this file

var userData = {};

function signOut() {
  // We pass url to redirect after signing out
  blockstack.signUserOut('index.html');
}

window.addEventListener('load', (event) => {
  if (!userSession.isUserSignedIn()) {
    alert('Error: user is not signed in');
  }

  userData = userSession.loadUserData();
  document.getElementById('user-data').innerHTML =
    JSON.stringify(userData, '\t', 2); // null and 2 for nice formatting
});

