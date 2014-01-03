var smr = smr || {};

(function($){

    // --------- Component Registration --------- //
    brite.registerView("statsSummary", {
            emptyParent : true
        },{
        	create : function(data,config){
        		return smr.render("tmpl-statsSummary",{});
        	},
        		
        	postDisplay : function(data,config){
        		var view = this;
        		
        		//check whether need to do sortMetrics
        		var isSkipSortMetrics = false;
        		if(data.skipSortMetrics){
        			isSkipSortMetrics = data.skipSortMetrics;
        		}
        		//show the stats
        		view.refreshStats(data.stats,data.viewType,isSkipSortMetrics);
        	},

        	refreshStats : function(stats,viewType,isSkipdoSortMetrics){
        		var $e = this.$element;
        		var isFirst = false;

        		if(!isSkipdoSortMetrics){
        			stats = smr.sortMetrics(stats);
        		}

        		for (var i = 0; i < stats.length; i++) {
        			var obj = stats[i];
        			var name = obj.name;
        			var label = obj.label;
        			var value = smr.formatNumber(obj.value);
        			if(typeof obj.label == 'undefined'){
        				label = name;
        			}
        			
        			var haveTitle = false;
        			var titleVal = "";
        			if(typeof obj.title != 'undefined'){
        				titleVal = obj.title;
        				haveTitle = true;
        			}

        			var isRate = false;
        			if(i == 0){
        				isFirst = true;
        			}else{
        				isFirst = false;
        			}
        			
        			//check whether it is a rate
        			if(obj.isRate){
        				isRate = true;
        			}else{
        				isRate = false;
        			}
        			
        			//check whether it is can click
        			if(obj.isClickable){
        				isClickable = true;
        			}else{
        				isClickable = false;
        			}
        			
        			//check whether it is selected
        			var isSelectedItem = false;
        			if(obj.isSelectedItem){
        				isSelectedItem = true;
        			}
        			
        			var isConversionSymbol = false;
        			if (typeof obj.isConversionSymbol != "undefined") {
        				isConversionSymbol = obj.isConversionSymbol;
        			}
        			
        			if(viewType == "table"){
        				isSelectedItem = false;
        				isClickable = false;
        			}
        			
        			var isByDomain = false;
        			if (typeof obj.isByDomain != "undefined" && obj.isByDomain) {
        				isByDomain = true;
        				isClickable = false;
        			}
        			
        			$e.append(smr.render("tmpl-statsSummary-dataItem",{
        					"name":name,
        					"label":label,
        					"val":value,
        					"isFirst":isFirst,
        					"isRate":isRate,
        					"isClickable":isClickable,
        					"isSelectedItem":isSelectedItem,
        					"isConversionSymbol":isConversionSymbol,
        					"conversionCurrency":smr.conversionCurrency,
        					"isByDomain":isByDomain,
        					"viewType":viewType,
        					"haveTitle":haveTitle,
        					"titleVal":titleVal
        					})
        			);
        		}
        		$e.append("<div class='cb'></div>");
        		
        		if(brite.ua.hasCanvas()){
        			if($e.find(".dataItem.sel").size()>0){
        				var $item = $e.find(".dataItem.sel");
        				smr.drawNotch($item);
        			}
        		}
        		
        		
        		//trigger metric click event
        		$e.delegate(".clickable","click",function(event,ex){
        			var $this = $(this);
        			var name = $this.attr("data-value");
        			var $canvas = $this.parent().find(".dataItem canvas").clone();
        			$this.parent().find(".dataItem").removeClass("sel");
        			$this.parent().find(".dataItem canvas").remove();
        			$this.addClass("sel");
            		if(brite.ua.hasCanvas()){
            			smr.drawNotch($this);
            		}
            		if(ex && ex.noNeedTrigger) return;
        			var extra  = {metricName:name,notShowPivotSummary:true};
        			$this.closest(".report").trigger("STATSSUMMARY_DATAITEM_CHANGE",extra);
        		});
        	}
        });
    // --------- Component Registration --------- //


})(jQuery);
