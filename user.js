var uuid;
var db = firebase.firestore();
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // User is signed out, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User

    location.replace("index.html");
    // ...
  } else {
    // User is signed in
    // ...
    var uid = user.uid;
    uuid = user.uid;
    let email = document.getElementById("heyEmail");
    let todos = document.getElementById("todos");
    email.innerText = `Hey ${user.email}`;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        console.log(doc.data().todos);
        let todoList = doc.data().todos;
        todoList.forEach((element) => {
          if (element.completed == false) {
            console.log(element.name);
            let html = `<div class="todo-element">
            <h2>${element.name}</h2>
            <a href="" class="todo-button pending">Pending</a>
          </div>`;
            todos.innerHTML += html;
          } else {
            console.log(element.name);
            let html = `<div class="todo-element">
            <h2>${element.name}</h2>
            <a href="" class="todo-button">Completed</a>
          </div>`;
            todos.innerHTML += html;
          }
        });
        // Change Todo
        let changeTodo = document.querySelectorAll(".todo-button");

        let changeTodoArray = Array.from(changeTodo);

        for (let index = 0; index < changeTodoArray.length; index++) {
          const element = changeTodoArray[index];
          element.addEventListener("click", (e) => {
            e.preventDefault();
            if (element.getAttribute("class") == "todo-button pending") {
              console.log("Pending");
              let todoName = element.parentElement.firstElementChild.innerText;
              //Fetch Todos
              let todoListNew = todoList;
              todoListNew.forEach((element) => {
                if (todoName == element.name) {
                  element.completed = true;
                  console.log(todoListNew);
                  return db
                    .collection("users")
                    .doc(uuid)
                    .set({
                      todos: todoListNew,
                    })
                    .then(() => {
                      location.reload();
                    });
                }
              });
            } else {
              console.log("Not Pending");
              let todoName = element.parentElement.firstElementChild.innerText;
              //Fetch Todos
              let todoListNew = todoList;
              todoListNew.forEach((element) => {
                if (todoName == element.name) {
                  element.completed = false;
                  console.log(todoListNew);
                  return db
                    .collection("users")
                    .doc(uuid)
                    .set({
                      todos: todoListNew,
                    })
                    .then(() => {
                      location.reload();
                    });
                }
              });
            }
          });
        }
      });
  }
});

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      location.replace("index.html");
    })
    .catch((error) => {
      // An error happened.
    });
}

// DB

const TAdd = document.getElementById("TAdd");

TAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const TName = document.getElementById("TName");
  const TDate = document.getElementById("TDate");
  let oldTodos;
  let todoObject = {
    name: TName.value,
    date: TDate.value,
    completed: false,
  };
  db.collection("users")
    .doc(uuid)
    .get()
    .then((doc) => {
      console.log(doc.data().todos);
      oldTodos = doc.data().todos;
      oldTodos.push(todoObject);
      return db.collection("users").doc(uuid).set({
        todos: oldTodos,
      });
    });
});

// Modal

var modal = document.getElementById("todoModal");
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function (e) {
  e.preventDefault();
  modal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
