(function(global){
	var Site = global.Site || {};
	Site.Thread = {};
	Site.Thread.init = function(){
		var self = this;
		if(ID.areFeatures('query', 'attachListener')){
			var postNos = ID.query('.ref-link.no');
			ID.forEach(postNos, function(postNo){
				ID.attachListener(postNo, 'click', function(e){
					var num = ID.getElementData(postNo, 'num');
					self.highlightPost(num);
				});
			});

			var postVals = ID.query('.ref-link.val');
			ID.forEach(postVals, function(postVal){
				ID.attachListener(postVal, 'click', function(e){
					var num = ID.getElementData(postVal, 'num');
					// TODO: Add quoting (>> num in textarea)
				});
			});
		}
	};
	Site.Thread.highlightPost = function(num){
		// Empty
		var highlighted = ID.queryOne('.highlighted');
		var post = ID.queryOne('#p' + num);
		if(highlighted){
			ID.removeClass(highlighted, 'highlighted');
		}
		if(post){
			ID.addClass(post, 'highlighted');
		}
	};
	if(Site.addToQueue){
		Site.addToQueue(function ThreadInit(){
			Site.Thread.init();
		});
	}
	global.Site = Site;
})(window);