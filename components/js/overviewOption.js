var smr = smr || {};

(function($){
	
	var _closeCallBack;
	// --------- Component Registration --------- //
	brite.registerView("overviewOption",{
		emptyParent:false,
		parent:"body"
	},{
		create : function(data,config){
			return smr.render("tmpl-overviewOption",{left:-120,top:2,sortByOptions:null,readonly:true});
		},
			
		postDisplay : function(data,config){
			var view = this;
			var $e = view.$el;
			
			var data      = data || {};
			var overviewOptionColumns = smr.userInsightSegmentsOptions;
		    var domainSet = smr.getSetAndType("userInsight","main").set;
		    var set = smr.getSetAndType("userInsight").set;
			var overviewOptionSet = set.attr("overviewOption");
			var overviewOptions = [];
			var defaultOptions = smr.defaultUserInsightOptions;
			
			overviewOptions = overviewOptionColumns;
			domainSet.attr("overviewDate",overviewOptions);
			overviewOptionSet = defaultOptions;
			set.attr("overviewDefaultDate",overviewOptionSet);
			
			view.$overviewOptionMain = $e.find(".overviewOption-main");
			view.$overviewOptionHead = $e.find(".overviewOption-header");
			view.$overviewOptionContent = $e.find(".overviewOption-content");
			view.$overviewOptionItems = $e.find(".overviewOption-items");
			view.$overviewOptionHead.css("left",(view.$overviewOptionContent.width()-view.$overviewOptionHead.width()-13));
			
			view.show();
		},
		
		events : {
			"click; .overviewOption-header" : function(){
				this.close();
			},
			
			"click; .overviewOption-content .reset" : function(){
				this.reset();
			},
			
			"click; .overviewOption-content .cancel" : function(){
				this.close();
			}
		},
		
		
		close : function(){
			var view = this;
			var overviewOption = view.getoverviewOptions();
			smr.getSetAndType("userInsight","main").set.attr("overviewSelected",overviewOption);
			_closeCallback();
			view.$el.bRemove();
		},
		
		reset : function(){
			var view = this;
			view.doResetOptions();  
		},
		
		onClose: function(closeCallback){
			_closeCallback = closeCallback;
		},
		
		show : function(){
			var view = this;
			var $e = view.$el;
			var overviewOption = smr.getSetAndType("userInsight","main").set.attr("overviewDate");
			var overviewSelected =smr.getSetAndType("userInsight","main").set.attr("overviewSelected");
			if (typeof overviewSelected == "undefined") {
				overviewSelected = smr.getSetAndType("userInsight").set.attr("overviewDefaultDate");
			}
			view.$overviewOptionItems.empty();
			$.each(overviewOption,function(i,item){
				if(brite.array.getIndex(overviewSelected,"label",item.label)>-1){
		          item.checked=true;
		        }else{
		          item.checked=false;
		        }
				
				var value = item.label;
				if(value && value.length > 24){
					item.labelName = value.substring(0,21)+"...";
					item.ellipsis = true;
				}else{
					item.labelName = value;
				}
				var $html = $(smr.render("tmpl-overviewOption-item",item));
				$html.find("input").attr("data-id",item.id);
				view.$overviewOptionItems.append($html);
			});
		},
		
		getoverviewOptions: function(){
			var view = this;
			var $e = view.$el;
			var overviewSelect=[];
			$e.find(".overviewOption-items input:checked").each(function(){
				var $this = $(this);
				overviewSelect.push({id:$this.attr("data-id"),"label":this.value});
			});
			return overviewSelect;
		},
		
		doResetOptions: function(){
			var view = this;
		    var $e = view.$el;
		    var overviewOption =smr.getSetAndType("userInsight").set.attr("overviewDefaultDate");
		    $e.find(".overviewOption-items input:checkbox").each(function(){
				if(brite.array.getIndex(overviewOption,"label",this.value)>-1){
			    	this.checked=true;
			    }else{
			        this.checked=false;
			    }
		 	});
		 }
	});
	// --------- /Component Registration --------- //
	
})(jQuery);
