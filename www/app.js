(function() {

	// Initialize Firebase
	var config = {
    apiKey: "AIzaSyB9z5oe0OjvVWFfrgf0IV1swtaUS_GH0V4",
    authDomain: "odot-17123.firebaseapp.com",
    databaseURL: "https://odot-17123.firebaseio.com",
    storageBucket: "odot-17123.appspot.com",
  };
	firebase.initializeApp(config);

	// Get elements
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

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

}());