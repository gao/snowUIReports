var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _isShow = false;
	// --------- /Component Private Properties --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("combobox",{
		emptyParent: true
	},
	{
		create: function(data,config){
			data = data || {};
			var list = data.list || [];
			var defaultValue = data.defaultValue;
			var defaultItem = {};
			for(var i=0 ; i < list.length; i++){
				var item = list[i]
				if(defaultValue == item.value){
					defaultItem.name = item.name;
					defaultItem.value = item.value;
					break;
				}
			}
			var html = smr.render("tmpl-combobox",{list:list,defaultItem:defaultItem});
			var $html = $(html);
			$html.append("<div class='comboboxScreener'></div>");
			return $html;
		},
			
		postDisplay:function(data,config){
			var view = this;
			var $e = view.$el;
			
			//set the position
			var $list = $e.find(".combobox-list");
			$list.hide();
		},
		
		events:{
			"mouseover; .item" : function(event){
				var $item = $(event.currentTarget);
				this.$el.find(".combobox-list .item").removeClass('selected');
				$item.addClass('selected');
			},
			
			"click; .item" : function(event){
				var $items = $(event.currentTarget);
				selectItem.call(this,$items);
			},
			
			"click; .combobox-button" : function(){
				if(_isShow){
					hide.call(this);
				}else{
					show.call(this);
				}
			},
			
			"click; .comboboxScreener" : function(){
				hide.call(this);
			}
		}
	});		
	// --------- /Component Registration --------- //
	
			
	// --------- Component Private Methods --------- //
	function show(){
		var $e = this.$el;
		var $list = $e.find(".combobox-list");
		$list.css("top",$e.height());
		$list.show();
		$e.find(".combobox-list .item").removeClass('selected');
		$e.find(".item.default").addClass("selected");
		$e.find(".comboboxScreener").show();
		_isShow = true;
	}
	
	function hide(){
		var $e = this.$el;
		$e.find(".combobox-list").hide();
		$e.find(".comboboxScreener").hide();
		_isShow = false;
	}
	
	function selectItem($item){
		var $e = this.$el;
		$e.find(".combobox-list .item").removeClass('default');
		$item.addClass('default');
		$e.attr("data-value",$item.attr("data-value"));
		$e.find(".combobox-button label").text($item.text());
		hide.call(this);
	}
	// --------- /Component Private Methods --------- //
})(jQuery);
