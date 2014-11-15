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

			if(ID.areFeatures('getHtml', 'setHtml')){
				var postBodys = ID.query('.post-body');
				// Could be done better?
				ID.forEach(postBodys, function(postBody){
					var postHtml = ID.getHtml(postBody);
					var pattern = /(&gt;&gt;)(\d+)+/g;
					var newContent = postHtml.replace(pattern, function(match, text){
						var id = match.replace('&gt;&gt;', '');
						return '<a href="#p' + id + '">' + match + '</a>';
					});
					ID.setHtml(postBody, newContent);
				});
			}

			var postVals = ID.query('.ref-link.val');
			// Different IDs are used (thread-form, reply-form), so i do this hacky selector instead
			var textarea = ID.queryOne('.pure-form textarea[name="comment"]');
			ID.forEach(postVals, function(postVal){
				ID.attachListener(postVal, 'click', function(e){
					var num = ID.getElementData(postVal, 'num');
					if(ID.insertAtCaret){
						ID.insertAtCaret(textarea, '>>' + num + '\n');
					}else if(ID.areFeatures('setInputValue')){
						ID.setInputValue(textarea, '>>' + num + '\n');
					}
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
				if(ID.insertAtCaret){
					ID.insertAtCaret(textarea, '>>' + num + '\n');
				}else if(ID.areFeatures('setInputValue')){
					ID.setInputValue(textarea, '>>' + num + '\n');
				}
				textarea.focus();
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