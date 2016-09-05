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

(function() {

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
			//console.log(firebaseUser);
			todoPage.classList.remove('hidden');
			loginPage.classList.add('hidden');
		} else {
			console.log('Not logged in');
			todoPage.classList.add('hidden');
			loginPage.classList.remove('hidden');
		}
	});

	//############//
	//##DATABASE##//
	//############//

	var database = firebase.database();

	function createFirstList(userId) {
  	database.ref('todoList/' + userId).set({
    	'1': {
    		task: 'First task',
    		done: false
    	},
    	'2': {
    		task: 'Completed task',
    		done: true
    	}
  	});
	}

	//############//
	//##TODOPAGE##//
	//############//

}());