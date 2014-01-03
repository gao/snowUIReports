var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _tempPrevSet = null;
	var _defaultStartDate = "";
	var _defaultEndDate = "";
	//--------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function ViewEmailsPicker(){};
	smr.ViewEmailsPicker = ViewEmailsPicker; 	
	
	ViewEmailsPicker.prototype.build = function(data,config){
		data = data || {};
		$("body").append("<div id='notTransparentScreen'></div>");
		var titleStr = data;
		var $html = smr.render("tmpl-viewEmailsPicker",{extTitle:titleStr});
		var $e = $($html);
        return $e;
	}
		
	ViewEmailsPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		data = data || {};
		
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".viewEmailsPicker-top").addClass("IE9PickerHeader-background");
		//show default view
		showTargetView.call(view,config);
	
	}
	// --------- /Component Interface Implementation ---------- //
	
	ViewEmailsPicker.prototype.events = {
		"click; .viewEmailsPicker-top .close" : clickBtnCancelMethod,
		
		"click; .viewEmailsPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//drag event,dialog move
		"bdragmove; .viewEmailsPicker-top" : bdragmoveViewEmailsPickerTopMethod,
		
		"bdragend; .viewEmailsPicker-top" : bdragendViewEmailsPickerTopMethod
	}
	
	ViewEmailsPicker.prototype.docEvents = {
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
	
	function bdragmoveViewEmailsPickerTopMethod(event){
		var view = this;
		var $e = view.$el;
			
		var pos = $e.offset();
	    var newX = pos.left + event.bextra.deltaX;
	    var newY = pos.top + event.bextra.deltaY;
		if(newX < 0){
			newX = 0;
		}
		if(newX > $(window).width()){
			newX = $(window).width()-1;
		}
		if(newY < 0){
			newY = 0;
		}
		if(newY > $(window).height()){
			newY = $(window).height()-2;
		}
	        
		$e.offset({
			left:newX,
			top:newY
		});
	}
	
	function bdragendViewEmailsPickerTopMethod(event){
		var view = this;
		var $e = view.$el;
		var pos = $e.offset();
	    var newX = pos.left;
	    var newY = pos.top;
		smr.saveMailingPickerUIStates("PosXY",{left:newX,top:newY});
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	
	ViewEmailsPicker.prototype.close = function(){
		var view = this;
		this.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
				
	}
	
	ViewEmailsPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	// --------- /Component Public API --------- //
		
	// --------- Component Private Methods --------- //
	function showTargetView(data){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName;
		var $content = $e.find(".viewEmailsPicker-content");
		$content.empty();
		$content.html(data.data);
	}
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("viewEmailsPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.ViewEmailsPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
