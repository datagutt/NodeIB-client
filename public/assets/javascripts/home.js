(function(global){
	var Site = global.Site || {};
	Site.Home = {};
	Site.Home.init = function(){
		var self = this;
		if(ID.areFeatures('query','queryOne')){
			var homeBackground = ID.queryOne('.bg-container');
			var msnry = new Masonry(homeBackground, {
				containerStyle: null,
				gutter: 0,
	            itemSelector: '.item',
				columnWidth: 1,
				transitionDuration: 0,
				isFitWidth: true
			})
		}
	};
	if(Site.addToQueue){
		Site.addToQueue(function ThreadInit(){
			Site.Home.init();
		});
	}
	global.Site = Site;
})(window);