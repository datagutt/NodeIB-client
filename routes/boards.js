module.exports = function boards(app, apiClient){

	app.get('/boards', function(req, res){
		apiClient.getBoards(function(err, boards){
			 res.render('boards.html', {
				 'boards': boards
			 });
		});
	});
}