(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])