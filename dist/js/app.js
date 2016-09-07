(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var todoStore = require('./todo.js').todoStore;

var userId = '';

function createTodo (todoText) { 

	// Create new div element with todoText
  var newTodo = document.createElement("div"); 
  var newText = document.createTextNode(todoText); 
  newTodo.appendChild(newText); 

  // add the newly created element and its content into the DOM 
  var currentDiv = document.getElementById("todoList");
  var emptyDiv = document.getElementById('emptyTodo');
  currentDiv.insertBefore(newTodo, emptyDiv);

}



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
      createFirstList(data.uid);
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
    userId = firebaseUser.uid;
    console.log(userId)
    todoPage.classList.remove('hidden');
    loginPage.classList.add('hidden');
  } else {
    console.log('Not logged in');
    userId = '';
    console.log(userId);
    todoPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
  }
});

//############//
//##DATABASE##//
//############//

var database = firebase.database();


//############//
//##TODOPAGE##//
//############//



},{"./todo.js":2}],2:[function(require,module,exports){
todos = (state, action) => {

  var state = (typeof state !== 'undefined' ? state : [])
  switch (action.type) {
    case 'addTodo':
      return state.concat(action.todo)
    case 'toggleDone':
      state[action.index].done = !state[action.index].done
      return state
    case 'logOut':
      return state = []
    case 'login':
      return state.concat(action.todos)
    default:
      return state
  }
}

store = (reducer) => {
  var state
  var listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  dispatch({});

  return {getState, dispatch, subscribe}
}
exports.store = store
exports.todos = todos
exports.todoStore = store(todos)

},{}]},{},[1])