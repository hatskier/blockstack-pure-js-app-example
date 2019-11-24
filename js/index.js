function signIn() {
  userSession.redirectToSignIn();
}

function doMainActionWhenUserIsSignedIn() {
  alert('Yay, you are signed in');
  location.href = 'signedin.html';
}

window.addEventListener('load', (event) => {
  if (userSession.isUserSignedIn()) {
    doMainActionWhenUserIsSignedIn();
  } else if ((userSession.isSignInPending())) {
    userSession.handlePendingSignIn().then(function() {
      doMainActionWhenUserIsSignedIn();
    });
  }
});
