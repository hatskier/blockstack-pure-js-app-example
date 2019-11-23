function signIn() {
  blockstack.redirectToSignIn();
}

function doMainActionWhenUserIsSignedIn() {
  alert('Yay, you are signed in');
  location.href = 'signedin.html';
}

window.addEventListener('load', (event) => {
  if (blockstack.isUserSignedIn()) {
    doMainActionWhenUserIsSignedIn();
  } else if ((blockstack.isSignInPending())) {
    blockstack.handlePendingSignIn().then(function() {
      doMainActionWhenUserIsSignedIn();
    });
  }
});
