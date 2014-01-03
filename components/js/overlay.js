var smr = smr || {};

(function($){
	
	// --------- Component Registration --------- //
	brite.registerView("overlay",{
		emptyParent: false,
		parent: "body"
	},{
		create:  function(data,config){
			var view = this;
			var data = data || {};
			var width = data.width;
			var right=3,top=100;
			var $width=$(window).width();
			var $height=$(window).height();
			right=($width-280)/2;
			top=($height-200)/2;

			var renderData = {width:width,right:right,top:top};
			var	html = smr.render("tmpl-overlay",renderData);
			$("body").append("<div id='notTransparentScreen'></div>");
			return html;
		},
		
		events : {
			"click; div.close" : function(){
				this.close();
			}
		},
		
		close : function(selected){
			this.$el.bRemove();
			$("body").find("#notTransparentScreen").remove();
		}
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
