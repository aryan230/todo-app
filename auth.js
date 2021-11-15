let submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  console.log(email.value);
  console.log(password.value);
  var db = firebase.firestore();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(userCredential);
      return db.collection("users").doc(user.uid).set({
        todos: [],
      });
    })
    .then(() => {
      console.log("ADDED");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
});
