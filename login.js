let Lsubmit = document.getElementById("Lsubmit");

Lsubmit.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.getElementById("Lemail");
  let password = document.getElementById("Lpassword");
  console.log(email.value);
  console.log(password.value);
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user.email);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    location.replace("user.html");
    // ...
  } else {
    // User is signed out
    // ...
  }
});
