var smr = smr || {};

(function($){
	// --------- Component Registration --------- //
	brite.registerView("drillDown",{
		emptyParent: false,
		parent: "body"
	},{
		create: function(data,config){
			var data = data || {};
			var width = data.width;
			var $target = data.$target;
			var right=0,top=0;
			if($target){
				right = 25;
				top = $target.offset().top + $target.height() + 4;
			}
			
			var reportType = data.reportType || smr.REPORT_TYPE.BATCH;
			var isNotTransactional = true;
			if(reportType== smr.REPORT_TYPE.TRANSACTIONAL){
				isNotTransactional = false;
			}
			
			//here only support the server side
			var isShowDelivered = false;
			if(!smr.isMock()){
				if (sm.Constants.SUCCESS_LOG_ENABLED == true){
					isShowDelivered = true;
				}
			}
			
			var conversionEnabled = false;
			if(smr.conversionEnabled){
				conversionEnabled = true;
			}
			
			//first empty the drillDown
			$("body").find(".drillDownDiv").remove();
			$("body").find("#transparentScreenForDrillDown").remove();
			
			var $html = $(smr.render("tmpl-drillDown",{right:right, top:top, isNotTransactional:isNotTransactional, isShowDelivered:isShowDelivered, conversionEnabled:conversionEnabled}));
			$("body").append("<div id='transparentScreenForDrillDown'></div>");
			return $html;
		},
			
		postDisplay: function(data,config){
			var view = this;
			var $e = view.$el;
			var data = data || {};
			view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		},
		
		events : {
			"click; .drillDown-content .itemColumnLink" : clickDrillDown
		},
		
		docEvents: {
			"click; #transparentScreenForDrillDown" : function(){
				this.close();
			}
		},
		
		close : function(){
			this.$el.bRemove();
			var $btnPrint = $("body").find(".reportHeader-toolbar .btnPrint");
			$btnPrint.removeClass("sel");
			$btnPrint.find(".ico").removeClass("sel");
			
			//sometimes there will have many tabs in server side
			$("body").find(".drillDownDiv").remove();
			$("body").find("#transparentScreenForDrillDown").remove();
		}
	});	
	// --------- /Component Registration --------- //
	
	// --------- events --------- //
	function clickDrillDown(event){
		var view = this;
		var reportType = view.reportType;
		var $this = $(event.currentTarget);
		var drillDownVal = $this.attr("data-value");
				
		var mailingsId = "";
		var mainIds = smr.getMailingSet(reportType,"main").list();
		for(var i=0;i<mainIds.length;i++){
			mailingsId = mailingsId + "&mailingIds=" + mainIds[i].id;
		}
				
		var campaignIds = "";
		var campaigns = smr.getCampaignSet(reportType,"main").list();
		for(var i = 0; i < campaigns.length; i++){
			campaignIds = campaignIds + "&campaignIds="+campaigns[i].id;
		}
				
		var programIds = "";
		if(reportType == smr.REPORT_TYPE.PROGRAM){
			var programs = smr.getProgramSet(reportType,"main").list();
			for(var i = 0; i < programs.length; i++){
				programIds = programIds + "&programIds="+programs[i].id;
			}
		}
		
		var tagValueIds = "";
		var tags = smr.getTagSet(reportType,"main").list();
		for(var i = 0; i < tags.length; i++){
			tagValueIds = tagValueIds + "&tagValueIds="+tags[i].id;
		}
				
		var startDate="",endDate="";
		var dateRange = smr.getSetAndType(reportType,"main").set.period().getDateRange();
		var limit = smr.getSetAndType(reportType,"main").set.attr("limit");
		if(limit){
			if(dateRange.startDate){
				startDate = "&startDate="+smr.formatDate(dateRange.startDate);
			}
			if(dateRange.endDate){
				endDate = "&endDate="+smr.formatDate(dateRange.endDate);
			}
		}
				
		var includeSubOrgFlag = "";
		var includeSubOrg = smr.getSetAndType(reportType,"main").set.attr("includeSubOrg");
		if(includeSubOrg){
			includeSubOrgFlag += "&includeSubOrg="+includeSubOrg;
		}
				
		var drillDownUrl = "report/drilldown.do?reportType=DrillDown_" + drillDownVal + mailingsId + campaignIds + programIds + tagValueIds + startDate + endDate + includeSubOrgFlag + "&mailingType=" + reportType;
				
		window.open(drillDownUrl);
				
		view.close();
	}
	
	// --------- /events --------- //
	
})(jQuery);
