var smr = smr || {};

(function($){

	
	// --------- Component Interface Implementation ---------- //
	function ViewTips(){};
	smr.ViewTips = ViewTips; 	
	
	ViewTips.prototype.build = function(data,config){
		data = data || {};
		$("body").append("<div id='notTransparentScreen'></div>");
		return smr.render("tmpl-viewTips",data);
	}
		
	ViewTips.prototype.postDisplay = function(data,config){
		var view = this;
		var windowWidth = $(window).width();
		var thisWidth = view.$el.width();
		view.$el.css("left",(windowWidth-thisWidth)/2);
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".viewTips-top").addClass("IE9PickerHeader-background");
	
	}
	// --------- /Component Interface Implementation ---------- //
	
	ViewTips.prototype.events = {
		"click; .viewTips-top .close" : clickBtnCancelMethod
	}
	
	ViewTips.prototype.docEvents = {
		// bind the Esc key
		"keyup" : function(event){
			if(event.which == 27){
				this.close();
			}
		}
	}
	
	// --------- events --------- //
	function clickBtnCancelMethod(){
		var view = this;
		view.close();
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	
	ViewTips.prototype.close = function(){
		var view = this;
		this.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
	}
	
	ViewTips.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	// --------- /Component Public API --------- //
		
	
	// --------- Component Registration --------- //
	brite.registerView("ViewTips",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.ViewTips();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
