(function(global){
	var Site = global.Site || {};
	Site.Thread = {};
	Site.Thread.init = function(){
		var self = this;
		if(ID.areFeatures('query', 'queryOne', 'attachListener', 'getElementData')){
			var postNos = ID.query('.ref-link.no');
			ID.forEach(postNos, function(postNo){
				ID.attachListener(postNo, 'click', function(e){
					var num = ID.getElementData(postNo, 'num');
					self.highlightPost(num);
				});
			});

			var postVals = ID.query('.ref-link.val');
			// Different IDs are used (thread-form, reply-form), so i do this hacky selector instead
			var textarea = ID.queryOne('.pure-form textarea[name="comment"]');
			ID.forEach(postVals, function(postVal){
				ID.attachListener(postVal, 'click', function(e){
					var num = ID.getElementData(postVal, 'num');
					ID.setInputValue(textarea, '>>' + num + '\n');
					textarea.focus();
				});
			});

			var matches = window.location.hash.match(/^#(i)?(\d+)$/);
			if(!matches){
				return;
			}

			var doInsert = typeof matches[1] != 'undefined';
			var num = matches[2];

			if(doInsert && (textarea && !textarea.value)){
				ID.setInputValue(textarea, '>>' + num + '\n');
				textarea.focus();
				return;
			}

			self.highlightPost(num);
		}
	};
	Site.Thread.highlightPost = function(num){
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