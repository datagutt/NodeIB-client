var qs = require('qs'),
	apiUrl = 'http://localhost:3000',
	request = require('request-json'),
	client = request.newClient(apiUrl);
function makeRequest(method, url, params, _callback){
	client[method](url, params, function(err, response, json){
		if(!checkResponse(err, response, _callback)) return;

		_callback(null, json);
	})
}
function checkResponse(err, apiRes, next){
    if(err) return next(err);

    if(apiRes && [500, 401, 404].indexOf(apiRes.statusCode) > -1){
        next(new Error(JSON.stringify(apiRes.body)));
        return false;
    }
    return true;
}
module.exports = {
	getBoards: function(_callback){
		var route = '/boards';

		makeRequest('get', route, null, _callback);
	},
	getBoard: function(shortname, _callback){
		var route = '/board/';

		if(shortname){
			route += shortname;
		}

		makeRequest('get', route, null, _callback);
	},
	getThread: function(thread, page, _callback){
		var route = '/thread/';

		if(thread){
			route += thread;
		}

		if(page){
			route += '/' + page;
		}

		makeRequest('get', route, null, _callback);
	},
	getIndexThreads: function(board, page, _callback){
		var route = '/threads/';

		if(board){
			route += board;
		}else{
			route += 'all';
		}

		if(page){
			route += '/' + page;
		}

		makeRequest('get', route, null, _callback);
	},
	getTotalThreads: function(board, _callback){
		var route = '/totalThreads/';

		if(board){
			route += board;
		}else{
			route += 'all';
		}

		makeRequest('get', route, null, _callback);
	},
	newThread: function(params, _callback){
		var route = '/newThread';

		if(!params){
			params = {};
		}

		makeRequest('post', route, params, _callback);
	},
	newReply: function(params, _callback){
		var route = '/newReply';

		if(!params){
			params = {};
		}

		makeRequest('post', route, params, _callback);
	}
};
