var smr = smr || {};

(function($){	
	// --------- Component Registration --------- //
	brite.registerView("dataList",{
		emptyParent: false,
		parent: "body"
	},{
		create: function(data,config){
			var data = data || {};
			var width = data.width;
			var $target = data.$target;
			var left=0,top=0;
			if($target){
				left = $target.offset().left;
				top = $target.offset().top + $target.height() + 1;
			}
			return smr.render("tmpl-dataList",{width:width,left:left,top:top});
		},
			
		postDisplay:function(data,config){
			var view = this;
			var $e = view.$el;
			var data = data || {};
			var list = data.list || [];
			
			view.show(list);
			if(!data.showImmediate){
				$e.hide();
			}
		},
		
		close:function(){
			this.$el.bRemove();
		},
		
		show:function(list){
			var view = this;
			var $e = view.$el;
			var $main = $e.find(".dataList-main");
			$e.show();
			$main.empty();
			
			for(var i = 0;i < list.length; i++){
				var $item = $(smr.render("tmpl-dataList-item",list[i]));
				$main.append($item);
			}
		}
		
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
