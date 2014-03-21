var apiController = require('../../controllers/api');
var middleware = require('../middleware');
var passport = require('passport');


function api (app) {
	app.get('/api', apiController.getApi);
	app.get('/api/lastfm', apiController.getLastfm);
	app.get('/api/nyt', apiController.getNewYorkTimes);
	app.get('/api/aviary', apiController.getAviary);
	app.get('/api/paypal', apiController.getPayPal);
	app.get('/api/paypal/success', apiController.getPayPalSuccess);
	app.get('/api/paypal/cancel', apiController.getPayPalCancel);
	app.get('/api/steam', apiController.getSteam);
	app.get('/api/scraping', apiController.getScraping);
	app.get('/api/twilio', apiController.getTwilio);
	app.post('/api/twilio', apiController.postTwilio);
	app.get('/api/clockwork', apiController.getClockwork);
	app.post('/api/clockwork', apiController.postClockwork);
	app.get('/api/foursquare', middleware.isAuthenticated, middleware.isAuthorized, apiController.getFoursquare);
	app.get('/api/tumblr', middleware.isAuthenticated, middleware.isAuthorized, apiController.getTumblr);
	app.get('/api/facebook', middleware.isAuthenticated, middleware.isAuthorized, apiController.getFacebook);
	app.get('/api/github', middleware.isAuthenticated, middleware.isAuthorized, apiController.getGithub);
	app.get('/api/twitter', middleware.isAuthenticated, middleware.isAuthorized, apiController.getTwitter);
	app.get('/api/venmo', middleware.isAuthenticated, middleware.isAuthorized, apiController.getVenmo);
	app.post('/api/venmo', middleware.isAuthenticated, middleware.isAuthorized, apiController.postVenmo);
	app.get('/api/linkedin', middleware.isAuthenticated, middleware.isAuthorized, apiController.getLinkedin);

  /**
   * OAuth routes for sign-in.
   */

   app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
   app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
   	res.redirect(req.session.returnTo || '/');
   });
   app.get('/auth/github', passport.authenticate('github'));
   app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
   	res.redirect(req.session.returnTo || '/');
   });
   app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
   app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
   	res.redirect(req.session.returnTo || '/');
   });
   app.get('/auth/twitter', passport.authenticate('twitter'));
   app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
   	res.redirect(req.session.returnTo || '/');
   });
   app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
   app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
   	res.redirect(req.session.returnTo || '/');
   });

  /**
   * OAuth routes for API examples that require authorization.
   */

   app.get('/auth/foursquare', passport.authorize('foursquare'));
   app.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), function(req, res) {
   	res.redirect('/api/foursquare');
   });
   app.get('/auth/tumblr', passport.authorize('tumblr'));
   app.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), function(req, res) {
   	res.redirect('/api/tumblr');
   });
   app.get('/auth/venmo', passport.authorize('venmo', { scope: 'make_payments access_profile access_balance access_email access_phone' }));
   app.get('/auth/venmo/callback', passport.authorize('venmo', { failureRedirect: '/api' }), function(req, res) {
   	res.redirect('/api/venmo');
   });
}

module.exports = api;