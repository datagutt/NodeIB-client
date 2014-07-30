function renderError(req, res, next, errorMessage){
	res.status(500);
	res.render('error.html', {
		errorMessage: errorMessage
	}, next);
}
module.exports = function(err, req, res, next){
	if(err.code === 'ECONNREFUSED'){
		return renderError(req, res, next, 'Could not connect to the API!');
	}
	renderError(req, res, next, 'Unknown error. The sarver said: ' + err.toString());
};