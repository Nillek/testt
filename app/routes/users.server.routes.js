// Load the module dependencies
const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'signup' routes 
    app.route('/api/auth/signup').post(users.signup);

    // Set up the 'signin' routes 
    app.route('/api/auth/signin').post(users.signin);

    // Set up the 'signout' route
    app.route('/api/auth/signout').get(users.signout);

	// Set up the Facebook OAuth routes 
	app.get('/api/oauth/facebook', passport.authenticate('facebook', {
		failureRedirect: '/signin'
	}));
	app.get('/api/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));
	// Set up the Google OAuth routes 
	app.get('/api/oauth/google', passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		],
		failureRedirect: '/signin'
	}));
	app.get('/api/oauth/google/callback', passport.authenticate('google', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));
};