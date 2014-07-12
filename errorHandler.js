function renderError(req, res, next, errorMessage){
	res.render('error.html', {
		errorMessage: errorMEssage
	});
}
module.exports = function(err, req, res, next){
	if(err.code === 'ECONNREFUSED'){
		return renderError(req, res, 'Could not connect to the API!');
	}
	renderError(req, res, next, 'Unknown error. Maybe this will help: ' + error.toString());
};