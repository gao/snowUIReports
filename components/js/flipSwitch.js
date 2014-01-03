var smr = smr || {};

(function($){
	
	// --------- Component Registration --------- //
	brite.registerView("flipSwitch",{
		emptyParent: true
	},{
		create:  function(data,config){
			return smr.render("tmpl-flipSwitch",{});
		},
			
		postDisplay:function(data,config){
			var view = this;
			var $e = view.$el;
			var defaultValue = true;
			
			//show default value
			showValue.call(view,defaultValue);
		},
		
		events : {
			//when click the switch button,change the value
			"click; .flipSwitch-buttons" : function(){
				var view = this;
				var $e = view.$el;
				if(!$e.hasClass("disable")){
					var value = $e.attr("data-value") == 'on' ? true : false;
					value = !value;
					showValue.call(view,value);
					if(view._changeCallback && $.isFunction(view._changeCallback)){
						view._changeCallback(value);
					}
				}
			}
		},
		
		setValue : function(value){
			var view = this;
			var $e = view.$el;
			var defaultValue = value;
			showValue.call(view,defaultValue);
		},
		
		onChange : function(changeCallback){
			this._changeCallback = changeCallback;
		}
		
	});	
	// --------- /Component Registration --------- //
	
	// --------- Component Private Methods --------- //
	function showValue(defaultValue){
		var $e = this.$element;
		var $leftButton = $e.find(".leftButton");
		var $rightButton = $e.find(".rightButton");
		var $text = $e.find(".flipSwitch-buttons .text");
		
		//clear 
		$e.find(".flipSwitch-buttons .button").removeClass("disSel");
		$text.removeClass("left right");
		if(defaultValue){
			$e.attr("data-value","on");
			//show label
			$text.html("On");
			$text.addClass("left");
			// add class disSel
			$rightButton.addClass("disSel");
		}else{
			$e.attr("data-value","off");
			$text.html("Off");
			$text.addClass("right");
			// add class disSel
			$leftButton.addClass("disSel");
		}
	}
	// --------- /Component Private Methods --------- //
})(jQuery);
