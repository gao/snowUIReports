var smr = smr || {};

(function($){
	
	// --------- Component Registration --------- //
	brite.registerView("mailingSelector",{
		emptyParent:false,
		parent:"body"
	},{
		create : function(data,config){
			var data = data || {};
			var width = data.width;
			var $target = data.$target;
			var text = data.text;
			var left=0,top=0;
			if($target){
				left = $target.offset().left;
				top = $target.offset().top-4;
				this.cleft = left;
				this.ctop = top;
			}
			return smr.render("tmpl-mailingSelector",{text:text,left:left,top:top});
		},
			
		postDisplay : function(data,config){
			var view = this;
			var $e = view.$el;
			var data = data || {};
			var list = data.list || [];
			this.uid = brite.uuid(16);
			
			view.show(list);
			view.mailingSelectorW = $e.find(".mailingSelector-main").width();
			view.mailingSelectorH = $e.find(".mailingSelector-main").height();

		},
		
		events : {
			//if mouse over top right part close the selector
			"mouseover" : function(event){
				if($(event.target).hasClass("mailingSelector-main")){
					this.close();
				}
			}
		},
		
		docEvents: {
			"mousemove; body" : function(e){
				var view = this;
				if(e.pageX <= view.cleft || e.pageX >= (view.cleft + view.mailingSelectorW)){
					view.close();
				}
				if(e.pageY <= view.ctop ||  e.pageY >= (view.ctop + view.mailingSelectorH)){
					view.close();
				}
			}
		},
		
		close : function(){
			this.$el.bRemove();
		},
		
		show : function(list){
			var view = this;
			var $e = view.$el;
			var $main = $e.find(".mailingSelector-items");
			$main.empty();
			
			for(var i = 0;i < list.length; i++){
				var $item = $(smr.render("tmpl-mailingSelector-item",list[i]));
				$main.append($item);
			}
		}
	});
	// --------- /Component Registration --------- //
	
})(jQuery);
