var todoStore = require('./todo.js').todoStore;

var userIdRef = '';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB9z5oe0OjvVWFfrgf0IV1swtaUS_GH0V4",
  authDomain: "odot-17123.firebaseapp.com",
  databaseURL: "https://odot-17123.firebaseio.com",
  storageBucket: "odot-17123.appspot.com",
};
firebase.initializeApp(config);

//##################//
//##AUTHENTICATION##//
//##################//

// Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const loginPage = document.getElementById('loginPage');
const todoPage = document.getElementById('todoPage');
const todoText = document.getElementById('todoText');
const addTodo = document.getElementById('addTodo');

// Login
btnLogin.addEventListener('click', e => {

  // Get email & password
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  // Sign in
  const promise = auth.signInWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message));

});

//Signup
btnSignUp.addEventListener('click', e => {

  // Get email & password
  // TODO: Check email syntax
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  const promise = auth.createUserWithEmailAndPassword(email,pass);
  promise
    .catch(e => console.log(e.message))
    .then(data => {
      console.log(data.uid);
    });
});

//Logout
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  todoPage.classList.add('hidden');
  loginPage.classList.remove('hidden');
})

//Realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser.email+' is logged in');
    console.log(firebaseUser.uid + 'this is userId');
    userIdRef = database.ref('todos/' + firebaseUser.uid);
    userIdRef.once('value').then((s) => todoStore.dispatch({type: 'login', todos: s.val()}))
    databaseListener = todoStore.subscribe(() => userIdRef.set(todoStore.getState()))
    todoPage.classList.remove('hidden');
    loginPage.classList.add('hidden');
  } else {
    console.log('Not logged in');
    databaseListener();
    userIdRef = '';
    todoStore.dispatch({type: 'logOut'})
    todoPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
  }
});

//############//
//##DATABASE##//
//############//

var database = firebase.database();
var databaseListener;

//############//
//##TODOPAGE##//
//############//
todoStore.subscribe( () => {
  var doneList = document.getElementById('done')
  var notDoneList = document.getElementById('notDone')
  doneList.innerHTML = ''
  notDoneList.innerHTML = ''
  todoStore.getState().map((todoObj, i) => {
    if(todoObj) {
      var newLi = document.createElement('li')
      newLi.innerHTML = todoObj.task
      newLi.addEventListener('click', e => todoStore.dispatch(
  {type:'toggleDone', index: i})
      )
    if (todoObj.done) {
        doneList.appendChild(newLi)
      } else {
        notDoneList.appendChild(newLi)
      }
    } else { return null}
    })
})

addTodo.addEventListener('click', e => {
  var text = todoText.value;
  todoStore.dispatch({type: 'addTodo', todo: {task: text, done: false}});
  todoText.value = '';
})
