module.exports = function home(app, apiClient){
	app.get('/', function(req, res){
		// HACK: This sets the landing-page class on body
		// TODO: Add a proper system for setting page classes
		res.locals.landingPage = true;
		res.render('home.html');
	});
}