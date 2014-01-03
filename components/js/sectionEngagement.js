var smr = smr || {};

(function($){
	// --------- Component Private Properties --------- //
	var _breakDownType;
	// --------- /Component Private Properties --------- //
	
    // --------- Component Interface Implementation ---------- //
	function SectionEngagement(){};
  
	smr.SectionEngagement = SectionEngagement; 

	SectionEngagement.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionEngagement",{});
	};
		
	SectionEngagement.prototype.postDisplay = function(data,config){
	    var view = this;
	    var $e = view.$el;
	    
	    view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
	    view.isNewRequest = data.isNewRequest || false;
	    view.fetchVal = smr.fetchSingleMetricOrigin;
	    
	    var uniqueStats = false;
		view.clientVal = true;
		view.deviceVal = true;
	    var viewType = data.view || "table";
	    view.viewType = viewType;
	    _breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		
	    if(view.reportType == smr.REPORT_TYPE.AUDIENCE){
	    	view.metricName = data.metricName || "active";
	    	
	    	_breakDownType = _breakDownType || "domain";
	    	
	    	if(_breakDownType == "engagementBucket"){
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Domain");
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("default");
				_breakDownType = "domain";
			}
	    	
	    	//hide the engagementBucket mailing and campaign
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='engagementBucket']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='campaign']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("isHide");
			//show the target
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='target']").removeClass("isHide");
	    }else{
	    	
	    	$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='device']").removeClass("isHide");
	    	$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='client']").removeClass("isHide");
	    	$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='browser']").removeClass("isHide");
	    	
	    	view.metricName = data.metricName || "opens";
	    	var $uniqueStatsSelector = $e.closest(".report").find(".reportHeader-uniqueStatsSelector input[type='checkbox']");
		    uniqueStats = $uniqueStatsSelector.attr("checked") ? true : false;
			
		    _breakDownType = _breakDownType || "mailing";
			
			if(_breakDownType == "target" || _breakDownType == "domain"){
				$uniqueStatsSelector.attr("disabled",true);
				$uniqueStatsSelector.attr("checked",false);
				uniqueStats = false;
			}
			view.uniqueStats = uniqueStats;
	    }
	    
		if(view.isNewRequest){
			smr.clearPivotViewCache(view.reportType,"engagement");
		}

		//show view
		view.showView(viewType,_breakDownType,uniqueStats);
	};
	
	SectionEngagement.prototype.parentEvents = {
		report:{	
			//event for view change	
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for client change	
			"REPORTHEADER_CLIENT_CHANGE" : reportHeaderClientChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE" : reportHeaderBreakDownChangeMethod,
			
			//event for unique states change
			"REPORTHEADER_UNIQUESTATS_CHANGE": reportHeaderUniqueStatsChangeMethod,
			
			//event for device change
			"REPORTHEADER_DEVICE_CHANGE": reportHeaderDeviceChangeMethod,
			
			//event for dataitem change
			"STATSSUMMARY_DATAITEM_CHANGE": statsSummaryDataItemChange,
			
			//event for pivot view trigger
			"STATSSUMMARY_STATUS_CHANGE":  statsSummaryStatusChangeMetod,
			
			//event for Fetch All Metrics checkbox change
			"FETCH_ALLMETRICS_CHANGE": fetchAllMetricsChangeMethod
		}
	}
	
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(e,extra){
		var view = this;
		var $e = view.$el;
		var $uniqueStatsSelector = $e.closest(".report").find(".reportHeader-uniqueStatsSelector input[type='checkbox']");
		var viewName = extra.viewName;
		viewType = viewName;
		view.viewType = viewName;
		
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(view.reportType == smr.REPORT_TYPE.AUDIENCE){
			if( _breakDownType=="day" || _breakDownType=="week" || _breakDownType=="month" || _breakDownType=="quarter"|| _breakDownType=="year"){
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Domain");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("default");
				_breakDownType = "domain";
			}
			
			if(viewName == "pie" || viewName == "bar"){
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='day']").addClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='week']").addClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='month']").addClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='quarter']").addClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='year']").addClass("isHide");
			}else{
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='day']").removeClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='week']").removeClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='month']").removeClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='quarter']").removeClass("isHide");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='year']").removeClass("isHide");
			}
		}
		
		if(view.reportType != smr.REPORT_TYPE.AUDIENCE){
			view.uniqueStats = $uniqueStatsSelector.attr("checked") ? true : false;
		}
		
		var $deviceSelector = $e.closest(".report").find(".reportHeader-deviceSelector");
		var $clientSelector = $e.closest(".report").find(".reportHeader-clientSelector");
		var $deviceCheckbox = $deviceSelector.find("input[type='checkbox']");
		var $clientCheckbox = $clientSelector.find("input[type='checkbox']");
		var deviceVal = false;
		var clientVal = false;
		
		if(_breakDownType == "device"){
			$deviceSelector.show();
			$deviceCheckbox.attr("checked",view.deviceVal);
			deviceVal = view.deviceVal;
		}else{
			$deviceSelector.hide();
			deviceVal = false;
		}
		if(_breakDownType == "client"){
			$clientSelector.show();
			$clientCheckbox.attr("checked",view.clientVal);
			clientVal = view.clientVal;
		}else{
			$clientSelector.hide();
		}
		view.deviceVal = deviceVal;
		view.clientVal = clientVal;
		if(view.metricName=="openRate" || view.metricName=="clickRate" || view.metricName=="clickToOpen"){
			view.metricName = "opens";
		}
		view.showView(viewType,_breakDownType,view.uniqueStats,null,deviceVal,clientVal);
		extra.complete = true;
	}
	
	function reportHeaderClientChangeMethod(e,extra){
		var view = this;
		var clientVal = extra.value;
		view.clientVal = clientVal;
		view.showView(view.viewType,_breakDownType,view.uniqueStats,null,null,clientVal);
	}
	
	function reportHeaderBreakDownChangeMethod(event,ex){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var reportType = view.reportType;
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
		var isHave = smr.checkIsHaveBreakdownValue(reportType,val);
		if(!isHave){
			breakDownType = val;
			var deviceVal=false;
			var clientVal = false;
			
			if(view.reportType != smr.REPORT_TYPE.AUDIENCE){
				//disable uniqueStatsSwitch if value is target
				var $uniqueStatsSwitch = $this.find(".reportHeader-uniqueStatsSelector input[type='checkbox']");
				var $uniqueStatsLabel = $this.find(".reportHeader-uniqueStatsSelector label");
				if(breakDownType == "target" || breakDownType == "domain" || breakDownType == "device" || breakDownType == "client" || breakDownType == "browser"){
					$uniqueStatsSwitch.attr("disabled",true);
					$uniqueStatsSwitch.attr("checked",false);
					$uniqueStatsLabel.addClass("disable");
					view.uniqueStats = false;
				}else{
					$uniqueStatsSwitch.removeAttr("disabled");
					$uniqueStatsLabel.removeClass("disable");
					//set the default to checked
					$uniqueStatsSwitch.attr("checked",true);
					view.uniqueStats = true;
				}
				
				//display the deviceSelector
				var $deviceSelector = $e.closest(".report").find(".reportHeader-deviceSelector");
				var $clientSelector = $e.closest(".report").find(".reportHeader-clientSelector");
				var $deviceCheckbox = $deviceSelector.find("input[type='checkbox']");
				var $clientCheckbox = $clientSelector.find("input[type='checkbox']");

				if(breakDownType == "device"){
					$deviceSelector.show();
					$deviceCheckbox.attr("checked",true);
					deviceVal = true;
				}else{
					deviceVal = false;
					$deviceSelector.hide();
				}
				if(breakDownType == "client"){
					$clientSelector.show();
					$clientCheckbox.attr("checked",true);
					clientVal = true;
				}else{
					$clientSelector.hide();
				}
				
				if(view.viewType != "table"){
					if(breakDownType == "browser" || breakDownType == "client"){
						view.metricName = "opens";
					}
				}
			}else{
				if(breakDownType=="day" || breakDownType=="week" || breakDownType=="month" || breakDownType=="quarter" || breakDownType=="year"){
					if(view.viewType=="pie" || view.viewType=="bar"){
						view.viewType = "table";
						var $viewButton = $e.closest(".report").find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='table']");
						var $reportHeaderViewSelector = $e.closest(".report").find(".reportHeader-viewSelector");
						$reportHeaderViewSelector.find(".reportsHeader-viewButton").removeClass("sel").find(".ico").removeClass("sel");
						$viewButton.addClass("sel").find(".ico").addClass("sel");
					}
				}
			}
			_breakDownType = breakDownType;
			view.deviceVal = deviceVal;
			view.clientVal = clientVal;
			view.showView(view.viewType,_breakDownType,view.uniqueStats,null,deviceVal,clientVal);
		}else{
			smr.goBackPreBreakdownValue($this,breakDownType);
		}
	}
	
	function reportHeaderUniqueStatsChangeMethod(e,extra){
		var view = this;
		var uniqueStats = extra.value;
		view.uniqueStats = uniqueStats;
		view.showView(view.viewType,_breakDownType,uniqueStats,null,null,null,true);
	}
	
	function reportHeaderDeviceChangeMethod(e,extra){
		var view = this;
		var deviceVal = extra.value;
		view.deviceVal = deviceVal;
		view.showView(view.viewType,_breakDownType,view.uniqueStats,null,deviceVal);
	}
	
	function statsSummaryDataItemChange(e,extra){
		var view = this;
		var metric = extra.metricName;
		view.metricName = metric;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		if(view.viewType=="pivot" && extra.notShowPivotSummary && !view.fetchVal){
			var $pivotTable = view.$el.find(".pivotTable");
			$pivotTable.find(".pivotHeader").trigger("metricChange",extra);
			$pivotTable.find(".pivotTableMetric .metric-select").val(extra.metricName);
		}else{
			view.showView(view.viewType,_breakDownType,view.uniqueStats,metric,view.deviceVal,view.clientVal);
		}
	}
	
	function statsSummaryStatusChangeMetod(event,extra){
		var view = this;
		var pivotClickable = extra.clickable;
		if(extra.metric){
			view.metricName = extra.metric;
			view.pivotDataSummary = extra.summary
			showSummary.call(view,_breakDownType,view.uniqueStats,"pivot",view.pivotDataSummary,view.metricName,pivotClickable);
		}else{
			showSummary.call(view,_breakDownType,view.uniqueStats,"pivot",view.pivotDataSummary,view.metricName,pivotClickable);
		}
	}
	
	function fetchAllMetricsChangeMethod(event,extra){
		var view = this;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		view.showView(view.viewType,_breakDownType,view.uniqueStats,null);
	}
	// ---------/ events --------- //
	
    // --------- /Component Interface Implementation ---------- //

    // --------- Component Public API --------- //
	SectionEngagement.prototype.destroy = function(){
		var $report = this.$el.closest(".report");
		var view = this;
		if(view._breakDownType == "device"||view._breakDownType == "client"||view._breakDownType == "browser"){
			$report.find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			if(view.reportType == smr.REPORT_TYPE.PROGRAM){
				$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
				$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
			}else if(view.reportType == smr.REPORT_TYPE.DELIVERABILITY){
				$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Domain");
				$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("default");
			}else{
				$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Mailing");
				$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("default");
			}
			//remove disable for show unique stats
			$report.find(".reportHeader-uniqueStatsSelector input[type='checkbox']").removeAttr("disabled");
			$report.find(".reportHeader-uniqueStatsSelector input[type='checkbox']").attr("checked",true);
			$report.find(".reportHeader-uniqueStatsSelector label").removeClass("disable");
		}
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='device']").addClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='client']").addClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='browser']").addClass("isHide");
		
		//hide the Device checkbox
		$report.find(".reportHeader-clientSelector").hide();
		$report.find(".reportHeader-deviceSelector").hide();
		
		smr.clearPivotViewCache(view.reportType,"engagement");
	}
	
	SectionEngagement.prototype.getAllData = function(breakDownType){
		var view = this;
		var $e = view.$el;
		var dfd = $.Deferred();
		var $reportDataLoading = $e.closest(".report").find(".report-data-loading");
		if(view.viewType=="pivot"){
			$reportDataLoading = $e.closest(".report").find(".report-data-progressBar");
		}
		$reportDataLoading.show();

		view._breakDownType = breakDownType;
		var typeVal = "common";
		if(view.reportType == smr.REPORT_TYPE.AUDIENCE){
			typeVal = "audience";
		}
		if(view.viewType=="pivot"){
			smr.getBigDataSummary(view.reportType,"getEngagement",view.metricName,null,view.uniqueStats,view.isNewRequest, view.fetchVal).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0] || {};
				}
				if(view.fetchVal){
					var includeSummaryTemp = smr.includeSummaryTemp[view.reportType]["getEngagement"];
					if(!includeSummaryTemp.include){
						dataSet.summary = includeSummaryTemp.summary;
					}else{
						includeSummaryTemp.summary = dataSet.summary;
					}
				}
				view.pivotAllData = dataSet;
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}else{
			smr.getSummary(view.reportType,typeVal,breakDownType,view.isNewRequest).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0];
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}
		return dfd.promise();
	}
	
	SectionEngagement.prototype.showView = function(viewName,breakDownType,uniqueStats,metric,deviceVal,clientVal,isUniqueChange){
		var view = this;
		var $e = view.$element;
		
		//clean first
		$e.bEmpty();
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionEngagement-table",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionEngagement-pie",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionEngagement-bar",{});
		}else if(viewName == 'pivot'){
			html = smr.render("tmpl-sectionEngagement-pivot",{});
		}else{
			return false;
		}
		
		if(typeof metric != 'undefined' && metric != null){
			view.metricName = metric
		}
		
		var metricName = view.metricName;
		
		$e.append($(html));
		if(typeof isUniqueChange!="undefined" && isUniqueChange && viewName == 'pivot' && !view.fetchVal){
			showSummary.call(view,breakDownType,uniqueStats,"pivot",view.pivotAllData.summary,metricName);
			showPivotView.call(view,breakDownType,uniqueStats,view.pivotAllData,metricName);
		} else{
			view.getAllData(breakDownType).done(function(dataAll){
				var dataEAll = dataAll;
				var dataSummary = dataAll.summary;
				if(view.reportType==smr.REPORT_TYPE.AUDIENCE){
					dataSummary = dataAll.engagementData;
					dataEAll = dataAll.engagementData;
				}else if(breakDownType=="client"){
					dataSummary = dataAll.clientUsageData;
				}else if(breakDownType=="browser"){
					dataSummary = dataAll.browserUsageData;
				}else if(breakDownType=="device"){
					dataSummary = dataAll.deviceUsageData;
				}
				if(viewName == 'table'){
					showSummary.call(view,breakDownType,uniqueStats,"table",dataSummary,metricName);
					showTableView.call(view,breakDownType,uniqueStats,dataEAll,deviceVal,clientVal);
				}else if(viewName == 'pie'){
					showSummary.call(view,breakDownType,uniqueStats,"pie",dataSummary,metricName);
					showPieView.call(view,breakDownType,uniqueStats,dataEAll,metricName,deviceVal,clientVal);
				}else if(viewName == 'bar'){
					showSummary.call(view,breakDownType,uniqueStats,"bar",dataSummary,metricName);
					showBarView.call(view,breakDownType,uniqueStats,dataEAll,metricName,deviceVal,clientVal);
				}else if(viewName == 'pivot'){
					showSummary.call(view,breakDownType,uniqueStats,"pivot",dataSummary,metricName);
					showPivotView.call(view,breakDownType,uniqueStats,dataEAll,metricName);
				}
			});
		}
		if(view.reportType==smr.REPORT_TYPE.AUDIENCE){
			if(breakDownType=="day" || breakDownType=="week" || breakDownType=="month" || breakDownType=="quarter" || breakDownType=="year"){
			}else{
				$e.closest(".report").find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='pie']").removeClass("viewButton-disabled");
				$e.closest(".report").find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='bar']").removeClass("viewButton-disabled");
			}
		}
		
		return true;
	};
    // --------- /Component Public API --------- //
	
	
	function showSummary(breakDownType,uniqueStats,viewType,summaryData,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var isSkipdoSortMetrics = false;
		var $byTitle = $e.find(".byTitle");
		if(viewType == "table" || viewType == "pivot"){
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(breakDownType);
			$byTitle.html("Engagement by "+title);
		}
		
		var $statsSummary = $e.find(".statsSummary");
		if(typeof summaryData == "undefined" || summaryData==null){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var isClickable = false;
			if(viewType == "pie" || viewType == "bar" ){
				isClickable = true;
			}
			if(viewType == "pivot"){
				//isClickable = typeof pivotClickable!="undefined" ? pivotClickable :smr.fetchSingleMetric;
				isClickable = false;
			}
			var stats = [];
			if(viewType=="pivot"){
				stats = [
						{name:"opens",label:"Opens",value:uniqueStats ? smr.checkNumber(summaryData.uniqueOpens) : smr.checkNumber(summaryData.opens),isClickable:isClickable},
						{name:"openRate",label:"Open %",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.uniqueOpenRate) : smr.checkNumber(summaryData.openRate),isClickable:isClickable},
						{name:"clicks",label:"Clicks",value:uniqueStats ? smr.checkNumber(summaryData.uniqueClicks) : smr.checkNumber(summaryData.clicks),isClickable:isClickable},
						{name:"clickRate",label:"Click %",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.uniqueClickRate) : smr.checkNumber(summaryData.clickRate),isClickable:isClickable},
						{name:"clickToOpen",label:"Click-to-Open",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.uniqueClickToOpen) : smr.checkNumber(summaryData.clickToOpen),isClickable:isClickable}
					  ];
				isSkipdoSortMetrics = true;
			}else if(breakDownType=="device"){
				stats = [
							{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens),isClickable:isClickable},
							{name:"opens",label:"Open %",isRate:true,value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.opens,summaryData.delivered)*100)},
							{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks),isClickable:isClickable},
							{name:"clicks",label:"Click %",isRate:true,value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.clicks,summaryData.delivered)*100)},
							{name:"clickToOpen",label:"Click-to-Open",isRate:true,value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.clicks,summaryData.opens)*100)}
					  	];
			}else if(breakDownType=="client"||breakDownType=="browser"){
				stats = [
							{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens),isClickable:isClickable},
							{name:"opens",label:"Open %",isRate:true,value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.opens,summaryData.delivered)*100)}
					  	];
			}else  if(reportType == smr.REPORT_TYPE.BATCH){
				stats = [
							{name:"opens",label:"Opens",value:uniqueStats? smr.checkNumber(summaryData.opens.unique) : smr.checkNumber(summaryData.opens.count),isClickable:isClickable},
							{name:"opens",label:"Open %",isRate:true,value:uniqueStats? smr.checkNumber(summaryData.opens.uniqueRate) : smr.checkNumber(summaryData.opens.rate)},
							{name:"clicks",label:"Clicks",value:uniqueStats ? smr.checkNumber(summaryData.clicks.unique) : smr.checkNumber(summaryData.clicks.count),isClickable:isClickable},
							{name:"clicks",label:"Click %",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.clicks.uniqueRate) : smr.checkNumber(summaryData.clicks.rate)},
							{name:"clickToOpen",label:"Click-to-Open",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.clickToOpen.uniqueRate) : smr.checkNumber(summaryData.clickToOpen.rate)}
					  	];
				
			}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL || reportType == smr.REPORT_TYPE.PROGRAM){
				stats = [
							{name:"opens",label:"Opens",value:uniqueStats ? smr.checkNumber(summaryData.uniqueOpens.count) : smr.checkNumber(summaryData.opens.count),isClickable:isClickable},
							{name:"opens",label:"Open %",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.uniqueOpens.rate) : smr.checkNumber(summaryData.opens.rate)},
							{name:"clicks",label:"Clicks",value:uniqueStats ? smr.checkNumber(summaryData.uniqueClicks.count) : smr.checkNumber(summaryData.clicks.count),isClickable:isClickable},
							{name:"clicks",label:"Click %",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.uniqueClicks.rate) : smr.checkNumber(summaryData.clicks.rate)},
							{name:"clickToOpen",label:"Click-to-Open",isRate:true,value:uniqueStats ? smr.checkNumber(summaryData.clickToOpen.uniqueRate) : smr.checkNumber(summaryData.clickToOpen.rate)}
					  	];
			}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
				stats = [
							{name:"active",label:"Active",value:smr.checkNumber(summaryData.active),isClickable:isClickable},
							{name:"risk",label:"Lapsed",value:smr.checkNumber(summaryData.lapsed),isClickable:isClickable},
							{name:"inactive",label:"Inactive",value: smr.checkNumber(summaryData.inactive),isClickable:isClickable},
							{name:"total",label:"Total",value:smr.checkNumber(summaryData.total),isClickable:isClickable}
					  	];
			}
			
			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType,skipSortMetrics:isSkipdoSortMetrics}).done(function(){
				//in table view there a gap between statSummary and table,but pie and bar view not have
				var $statsSummary = $e.find(".statsSummary");
				if(viewType == "table"|| viewType == "pivot"){
					$statsSummary.removeClass("pieOrBarView");
				}else{
					$statsSummary.removeClass("pieOrBarView");
					$statsSummary.addClass("pieOrBarView");
				}
			});
		}
	}
	
	function showPivotView(breakDownType,uniqueStats,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionEngagementPivot = $e.find(".sectionEngagement-pivot");
		
		if(typeof dataAll == "undefined" || dataAll==null){
			dataAll = {};
		}

		var data = dataAll.data;
		var dataSummary = dataAll.summary;
		view.pivotDataSummary = dataSummary;
		
		var metricList = [];
		metricList.push({name:"opens",labelName:"Opens"});
		metricList.push({name:"openRate",labelName:"Open %"});
		metricList.push({name:"clicks",labelName:"Clicks"});
		metricList.push({name:"clickRate",labelName:"Click %"});
		metricList.push({name:"clickToOpen",labelName:"Click-to-Open"});
		
		$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
		
		brite.display("pivotTable",$sectionEngagementPivot,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
			metricList:metricList,uniqueStats:uniqueStats,metricName:metricName,section:"engagement",parentView:view});
	}
	
	function showTableView(breakDownType,uniqueStats,dataAll,deviceVal,clientVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $engagement = $e.find(".sectionEngagement-table");
		
		var dataOrSummaryNodata = false;
		if(breakDownType == "device" || breakDownType=="client" || breakDownType == "browser"){
			dataOrSummaryNodata = false;
		}else{
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				dataOrSummaryNodata = (dataAll.data == "undefined");
			}else{
				dataOrSummaryNodata = (dataAll.data == "undefined"  || typeof dataAll.summary == "undefined");
			}
		}
		
		if(typeof dataAll == "undefined" || dataAll==null || dataOrSummaryNodata ){
			$engagement.html("");
			$engagement.append("<div class='noData'>No Data!</div>");
		}else{
			$engagement.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			if(breakDownType=="device"){
				var dataSet = dataAll.deviceUsageData;
				
				var	tableColumns = [];
				tableColumns.push({name:"category",label:"Category",combination:1,isAlignCenter:true});
				if(deviceVal)tableColumns.push({name:"device",label:"Device",isAlignLeft:true});
				tableColumns.push({name:"opens",label:"Opens"});
				tableColumns.push({name:"percentageOfOpens",label:"% of Opens",isRate:true});
				tableColumns.push({name:"clicks",label:"Clicks"});
				tableColumns.push({name:"percentageOfClicks",label:"% of Clicks",isRate:true});
				tableColumns.push({name:"clickToOpenRate",label:"Click-to-open Rate",isRate:true});
				
				var tableDataInfo ={ tableColumns: tableColumns, tableData:[] };
				function pushDeviceDataToTableData(category,usageData,dataSummary,tableDataInfo){
					if(usageData && usageData!=null ){
						var datas = usageData;
						for(var i = 0; i < datas.length; i++){
							var rowData = datas[i];
							var resultData = {
									"Category":category,
									"Opens":smr.checkNumber(rowData.opens),
									"% of Opens":smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100,
									"Clicks":smr.checkNumber(rowData.clicks),
									"% of Clicks":smr.formatDivisionNumber(rowData.clicks,dataSummary.clicks)*100,
									"Click-to-open Rate":smr.formatDivisionNumber(rowData.clicks,rowData.opens)*100
							};
							if(deviceVal)resultData.Device = rowData.platform?rowData.platform:"Unknown";
							tableDataInfo.tableData.push(resultData);
						}
					}
				}
				
				//sometimes the dataSet can be null when no mailing select
				if(dataSet){
					if(deviceVal){
						if(dataSet.desktopUsageData && dataSet.desktopUsageData.data && dataSet.desktopUsageData.data.length>0){
							pushDeviceDataToTableData("Computer",dataSet.desktopUsageData.data,dataSet,tableDataInfo);
						}
						if(dataSet.mobileUsageData && dataSet.mobileUsageData.data && dataSet.mobileUsageData.data.length>0){
							pushDeviceDataToTableData("Phone",dataSet.mobileUsageData.data,dataSet,tableDataInfo);
						}
						if(dataSet.tabletUsageData && dataSet.tabletUsageData.data && dataSet.tabletUsageData.data.length>0){
							pushDeviceDataToTableData("Tablet",dataSet.tabletUsageData.data,dataSet,tableDataInfo);
						}
						if(dataSet.others && dataSet.others.data && dataSet.others.data.length>0){
							pushDeviceDataToTableData("Other",dataSet.others.data,dataSet,tableDataInfo);	
						}
					}else{
						if(dataSet.desktopUsageData && dataSet.desktopUsageData.data && dataSet.desktopUsageData.data.length>0){
							pushDeviceDataToTableData("Computer",[dataSet.desktopUsageData],dataSet,tableDataInfo);
						}
						if(dataSet.mobileUsageData && dataSet.mobileUsageData.data && dataSet.mobileUsageData.data.length>0){
							pushDeviceDataToTableData("Phone",[dataSet.mobileUsageData],dataSet,tableDataInfo);
						}
						if(dataSet.tabletUsageData && dataSet.tabletUsageData.data && dataSet.tabletUsageData.data.length>0){
							pushDeviceDataToTableData("Tablet",[dataSet.tabletUsageData],dataSet,tableDataInfo);
						}
						if(dataSet.others && dataSet.others.data && dataSet.others.data.length>0){
							pushDeviceDataToTableData("Other",[dataSet.others],dataSet,tableDataInfo);
						}
					}
				}
				//check whether need to do sortMetrics
				tableDataInfo.skipSortMetrics = true;
				tableDataInfo.combinationDefaultNotSort=1;
				var title = smr.buildTitleValue(breakDownType);
				tableDataInfo.title="Engagement by "+title;
				tableDataInfo.smaclass="SMA-REPORT-ENGAGEMENTDATATABLE";
				brite.display("dataTable",$engagement,tableDataInfo);
				
			}else if(breakDownType=="client"){
				var dataSet = dataAll.clientUsageData;
				var	tableColumns = [];
				
				tableColumns.push({name:"category",label:"Category",combination:1,showOpen:(clientVal?true:false),openName:"showOpen",isAlignCenter:true});
				if(clientVal)tableColumns.push({name:"client",label:"Client",isAlignLeft:true,isBindData:true});
				tableColumns.push({name:"opens",label:"Opens"});
				tableColumns.push({name:"percentageOfOpens",label:"% of Opens",isRate:true});
			
				
				var tableDataInfo ={ tableColumns: tableColumns, tableData:[] };
				function pushDataToTableData(category,usageData,dataSummary,tableDataInfo){
					if(usageData && usageData!=null){
						var datas = usageData;
						for(var i = 0; i < datas.length; i++){
							var rowData = datas[i];
							var resultData = {
									"Category":category,
									"showOpen":smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100,
									"Opens":smr.checkNumber(rowData.opens),
									"% of Opens":smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100
							};
							if(clientVal)resultData.Client = {value:rowData.client?rowData.client:"Unknown",data:{versions:rowData.versions,opens:smr.checkNumber(rowData.opens)}};
							tableDataInfo.tableData.push(resultData);
						}
					}
				}
				
				//sometimes the dataSet can be null when no mailing select
				if(dataSet){
					if(clientVal){
						if(dataSet.desktopClientUsageData && dataSet.desktopClientUsageData.data && dataSet.desktopClientUsageData.data.length>0){
							pushDataToTableData("Computer",dataSet.desktopClientUsageData.data,dataSet,tableDataInfo);
						}
						if(dataSet.mobileClientUsageData && dataSet.mobileClientUsageData.data && dataSet.mobileClientUsageData.data.length>0){
							pushDataToTableData("Mobile",dataSet.mobileClientUsageData.data,dataSet,tableDataInfo);
						}
						if(dataSet.webClientUsageData && dataSet.webClientUsageData.data && dataSet.webClientUsageData.data.length>0){
							pushDataToTableData("Webmail",dataSet.webClientUsageData.data,dataSet,tableDataInfo);
						}
						if(dataSet.others && dataSet.others.data && dataSet.others.data.length>0){
							pushDataToTableData("Other",dataSet.others.data,dataSet,tableDataInfo);	
						}
					}else{
						if(dataSet.desktopClientUsageData && dataSet.desktopClientUsageData.data && dataSet.desktopClientUsageData.data.length>0){
							pushDataToTableData("Computer",[dataSet.desktopClientUsageData],dataSet,tableDataInfo);
						}
						if(dataSet.mobileClientUsageData && dataSet.mobileClientUsageData.data && dataSet.mobileClientUsageData.data.length>0){
							pushDataToTableData("Mobile",[dataSet.mobileClientUsageData],dataSet,tableDataInfo);
						}
						if(dataSet.webClientUsageData && dataSet.webClientUsageData.data && dataSet.webClientUsageData.data.length>0){
							pushDataToTableData("Webmail",[dataSet.webClientUsageData],dataSet,tableDataInfo);
						}
						if(dataSet.others && dataSet.others.data && dataSet.others.data.length>0){
							pushDataToTableData("Other",[dataSet.others],dataSet,tableDataInfo);	
						}
					}
				}
				
				//check whether need to do sortMetrics
				tableDataInfo.skipSortMetrics = true;
				tableDataInfo.combinationDefaultNotSort=1;
				var title = smr.buildTitleValue(breakDownType);
				tableDataInfo.title="Engagement by "+title;
				tableDataInfo.smaclass="SMA-REPORT-ENGAGEMENTDATATABLE";
				
				brite.display("dataTable",$engagement,tableDataInfo).done(function(){
					$engagement.delegate("td.bindData","mouseover",function(){
						var $this = $(this)
						var name = $.trim($this.find("span").html());
						var data = $this.data("bindData");
						if(data && data.versions && data.versions.length>0){
							data.name = name;
							data.hasData = true;
							$.each(data.versions,function(i,version){
								version.percent = (smr.formatDivisionNumber(version.opens,data.opens)*100).toFixed("1");
							});
						}else{
							data={hasData:false};
						}
						$container = $e.find(".versionHoverBoxContainer");
			        	var html = smr.render("tmpl-sectionEngagement-versionSection-table-td-hover",data);
						$container.empty().append(html);
						var offset = $e.closest(".smr.report").offset() ;
						var thisSpanOffset = $this.offset();
						var IE7offsetX = 0;
						var container_height = $container.height();
						$container.css({left:(thisSpanOffset.left - offset.left)-IE7offsetX , top:thisSpanOffset.top-offset.top-container_height});
						$container.show();
					});
					
					$engagement.delegate("td.bindData","mouseleave",function(){
						var $this = $(this)
						$e.find(".versionHoverBoxContainer").empty().hide();
					});
				});
				
			}else if(breakDownType=="browser"){
				var dataSet = dataAll.browserUsageData;
				var	tableColumns = [
						{name:"browser",label:"Browser",combination:0},
						{name:"opens",label:"Opens"},
						{name:"percentageOfOpens",label:"% of Opens",isRate:true}
		            ];
				var tableDataInfo ={ tableColumns: tableColumns, tableData:[] };
				if(dataSet && dataSet.data && dataSet.data.length > 0){
					for(var i = 0; i < dataSet.data.length; i++){
						var rowData = dataSet.data[i];
						if(smr.checkNumber(rowData.opens)==0) continue;
						var resultData = {
							"Browser":rowData.browser,
							"Opens":smr.checkNumber(rowData.opens),
							"% of Opens":smr.formatDivisionNumber(rowData.opens,dataSet.opens)*100
						};
						tableDataInfo.tableData.push(resultData);
					}
				}
				//check whether need to do sortMetrics
				tableDataInfo.skipSortMetrics = true;
				tableDataInfo.combinationDefaultNotSort=1;
				var title = smr.buildTitleValue(breakDownType);
				tableDataInfo.title="Engagement by "+title;
				tableDataInfo.smaclass="SMA-REPORT-ENGAGEMENTDATATABLE";
				brite.display("dataTable",$engagement,tableDataInfo);
			}else{
				var dataSet = dataAll.data;
				var resultData = [];
				for(var i=0; i<dataSet.length;i++){
					resultData.push(dataSet[i]);
				}
				
				var tableDataInfo = {};
				if(reportType == smr.REPORT_TYPE.AUDIENCE){
					tableDataInfo ={
							tableColumns: [
							               {name:"active",label:"Active"},
							               {name:"risk",label:"Lapsed"},
							               {name:"inactive",label:"Inactive"},
							               {name:"total",label:"Total"}
							               ],
							               tableData:[],
							               reportType:reportType,
							               maxSize:38
					};
				}else{
					tableDataInfo ={
							tableColumns: [
							               {name:"opens",label:"Opens"},
							               {name:"opens",label:"Open %",isRate:true},
							               {name:"clicks",label:"Clicks"},
							               {name:"clicks",label:"Click %",isRate:true},
							               {name:"clickToOpen",label:"Click-to-Open",isRate:true}
							               ],
							               tableData:[],
							               reportType:reportType,
							               maxSize:38
					};
				}
				
				
				//change the column when different breakDownType
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				
				for(var i = 0; i < resultData.length; i++){
					var rowData = resultData[i];
					if(rowData){
						var resultDataRow = [];
						if(reportType == smr.REPORT_TYPE.BATCH){
							resultDataRow = {
									"Opens": uniqueStats ? smr.checkNumber(rowData.opens.unique) : smr.checkNumber(rowData.opens.count),
									"Open %": uniqueStats ? smr.checkNumber(rowData.opens.uniqueRate) : smr.checkNumber(rowData.opens.rate),
									"Clicks": uniqueStats ? smr.checkNumber(rowData.clicks.unique) : smr.checkNumber(rowData.clicks.count), 
									"Click %": uniqueStats ? smr.checkNumber(rowData.clicks.uniqueRate) : smr.checkNumber(rowData.clicks.rate),
									"Click-to-Open": uniqueStats ? smr.checkNumber(rowData.clickToOpen.uniqueRate) : smr.checkNumber(rowData.clickToOpen.rate)
							};
						}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL || reportType == smr.REPORT_TYPE.PROGRAM){
							resultDataRow = {
									"Opens": uniqueStats ? smr.checkNumber(rowData.uniqueOpens.count) : smr.checkNumber(rowData.opens.count),
									"Open %": uniqueStats ? smr.checkNumber(rowData.uniqueOpens.rate) : smr.checkNumber(rowData.opens.rate),
									"Clicks": uniqueStats ? smr.checkNumber(rowData.uniqueClicks.count) : smr.checkNumber(rowData.clicks.count), 
									"Click %": uniqueStats ? smr.checkNumber(rowData.uniqueClicks.rate) : smr.checkNumber(rowData.clicks.rate),
									"Click-to-Open": uniqueStats ? smr.checkNumber(rowData.clickToOpen.uniqueRate) : smr.checkNumber(rowData.clickToOpen.rate)
							};
						}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
							resultDataRow = {
									"Active": smr.checkNumber(rowData.active),
									"Lapsed": smr.checkNumber(rowData.lapsed),
									"Inactive": smr.checkNumber(rowData.inactive),
									"Total": smr.checkNumber(rowData.total)
							};
						}
						
						//add the column data
						resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
						
						tableDataInfo.tableData.push(resultDataRow);
					}
				}
				var title = smr.buildTitleValue(breakDownType);
				tableDataInfo.title="Engagement by "+title;
				tableDataInfo.smaclass="SMA-REPORT-ENGAGEMENTDATATABLE";
				brite.display("dataTable",$engagement,tableDataInfo);
			}
		}
	}
	
	function showBarView(breakDownType,uniqueStats,dataAll,metricName,deviceVal,clientVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $engagement = $e.find(".sectionEngagement-bar");
		
		var dataOrSummaryNodata = false;
		if(breakDownType == "device" || breakDownType == "browser"  || breakDownType=="client"){
			dataOrSummaryNodata = false;
		}else{
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				dataOrSummaryNodata = (dataAll.data == "undefined");
			}else{
				dataOrSummaryNodata = (dataAll.data == "undefined"  || typeof dataAll.summary == "undefined");
			}
		}
		
		if(typeof dataAll == "undefined" || dataAll==null || dataOrSummaryNodata){
			$engagement.html("");
			$engagement.append("<div class='noData'>No Data!</div>");
		}else{
			$engagement.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;
			
			var resultData = [];
			
			if(breakDownType=="client"){
				dataSummary = dataAll.clientUsageData;
				if(dataSummary){
					if(clientVal){
						if(dataSummary.desktopClientUsageData && dataSummary.desktopClientUsageData.data && dataSummary.desktopClientUsageData.data.length>0){
							$.each(dataSummary.desktopClientUsageData.data,function(i,item){item.category="Computer"});
							resultData = resultData.concat(dataSummary.desktopClientUsageData.data);
						}
						if(dataSummary.mobileClientUsageData && dataSummary.mobileClientUsageData.data && dataSummary.mobileClientUsageData.data.length>0){
							$.each(dataSummary.mobileClientUsageData.data,function(i,item){item.category="Mobile"});
							resultData = resultData.concat(dataSummary.mobileClientUsageData.data);
						}
						if(dataSummary.webClientUsageData && dataSummary.webClientUsageData.data && dataSummary.webClientUsageData.data.length>0){
							$.each(dataSummary.webClientUsageData.data,function(i,item){item.category="Webmail"});
							resultData = resultData.concat(dataSummary.webClientUsageData.data);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							$.each(dataSummary.others.data,function(i,item){item.category="Other"});
							resultData = resultData.concat(dataSummary.others.data);
						}
					}else{
						if(dataSummary.desktopClientUsageData && dataSummary.desktopClientUsageData.data && dataSummary.desktopClientUsageData.data.length>0){
							dataSummary.desktopClientUsageData.category="Computer";
							resultData = resultData.concat([dataSummary.desktopClientUsageData]);
						}
						if(dataSummary.mobileClientUsageData && dataSummary.mobileClientUsageData.data && dataSummary.mobileClientUsageData.data.length>0){
							dataSummary.mobileClientUsageData.category="Mobile";
							resultData = resultData.concat([dataSummary.mobileClientUsageData]);
						}
						if(dataSummary.webClientUsageData && dataSummary.webClientUsageData.data && dataSummary.webClientUsageData.data.length>0){
							dataSummary.webClientUsageData.category="Webmail";
							resultData = resultData.concat([dataSummary.webClientUsageData]);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							dataSummary.others.category="Other";
							resultData = resultData.concat([dataSummary.others]);
						}
					}
				}
			}else if(breakDownType=="browser"){
				dataSummary = dataAll.browserUsageData;
				if(dataSummary){
					$.each(dataSummary.data,function(i,item){
						if(item["opens"] && item["opens"]!=0){
							resultData.push(item);
						}
					});
				}
			}else if(breakDownType=="device"){
				dataSummary = dataAll.deviceUsageData;
				if(dataSummary){
					if(deviceVal){
						if(dataSummary.desktopUsageData && dataSummary.desktopUsageData.data && dataSummary.desktopUsageData.data.length>0) {
							$.each(dataSummary.desktopUsageData.data,function(i,item){item.category="Computer"});
							resultData = resultData.concat(dataSummary.desktopUsageData.data);
						};
						if(dataSummary.mobileUsageData && dataSummary.mobileUsageData.data && dataSummary.mobileUsageData.data.length>0){
							$.each(dataSummary.mobileUsageData.data,function(i,item){item.category="Phone"});
							resultData = resultData.concat(dataSummary.mobileUsageData.data);
						}
						if(dataSummary.tabletUsageData && dataSummary.tabletUsageData.data && dataSummary.tabletUsageData.data.length>0){
							$.each(dataSummary.tabletUsageData.data,function(i,item){item.category="Tablet"});
							resultData = resultData.concat(dataSummary.tabletUsageData.data);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							$.each(dataSummary.others.data,function(i,item){item.category="Other"});
							resultData = resultData.concat(dataSummary.others.data);
						}
					}else{
						if(dataSummary.desktopUsageData && dataSummary.desktopUsageData.data && dataSummary.desktopUsageData.data.length>0) {
							dataSummary.desktopUsageData.category = "Computer";
							resultData = resultData.concat([dataSummary.desktopUsageData]);	
						}
						if(dataSummary.mobileUsageData && dataSummary.mobileUsageData.data && dataSummary.mobileUsageData.data.length>0){
							dataSummary.mobileUsageData.category = "Phone";
							resultData = resultData.concat([dataSummary.mobileUsageData]);
						}
						if(dataSummary.tabletUsageData && dataSummary.tabletUsageData.data && dataSummary.tabletUsageData.data.length>0){
							dataSummary.tabletUsageData.category = "Tablet";
							resultData = resultData.concat([dataSummary.tabletUsageData]);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							dataSummary.others.category = "Other";
							resultData = resultData.concat([dataSummary.others]);
						}
					}
				}
			}else{
				for(var i=0; i<dataSet.length;i++){
					resultData.push(dataSet[i]);
				}
			}
			
			if(view.reportType == smr.REPORT_TYPE.AUDIENCE){
				dataSummary = dataAll;
			}
			
			var dropDownListVal = [];
			var tableColumns = [];
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				dropDownListVal = [
				   		            {name:"active",labelName:"Active"},
				   					{name:"risk",labelName:"Lapsed"},
				   					{name:"inactive",labelName:"Inactive"},
				   					{name:"total",labelName:"Total"}
				   		         ];
				
				if(metricName == "active"){
					tableColumns =  [
				               {name:"active",label:"Active",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"active",label:columnTitle+" Contribution to Active",isBarChart:true,sortable:false,isRate:true}
			               ];
				}else if(metricName == "risk"){
					tableColumns =  [
				               {name:"risk",label:"Lapsed",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"risk",label:columnTitle+" Contribution to Lapsed",isBarChart:true,sortable:false,isRate:true}
			               ];
				}else if(metricName == "inactive"){
					tableColumns =  [
						       {name:"inactive",label:"Inactive",isDropDown:true,dropDownList:dropDownListVal},
						       {name:"inactive",label:columnTitle+" Contribution to Inactive",isBarChart:true,sortable:false,isRate:true}
					       ];
				}else if(metricName == "total"){
					tableColumns =  [
					           {name:"total",label:"Total",isDropDown:true,dropDownList:dropDownListVal},
					           {name:"total",label:columnTitle+" Contribution to Total",isBarChart:true,sortable:false,isRate:true}
						   ];
				}
			}else{
				dropDownListVal = [{name:"opens",labelName:"Opens"},{name:"clicks",labelName:"Clicks"}];
				if(breakDownType=="browser" || breakDownType=="client"){
					dropDownListVal = [{name:"opens",labelName:"Opens"}];
				}
				
				if(metricName == "opens"){
					tableColumns =  [
				               {name:"opens",label:"Opens",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"Opens",label:columnTitle+" Contribution to Opens",isBarChart:true,sortable:false,isRate:true}
			               ];
				}else if(metricName == "clicks"){
					tableColumns =  [
				               {name:"clicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"Clicks",label:columnTitle+" Contribution to Clicks",isBarChart:true,sortable:false,isRate:true}
			               ];
				}
			}
			
			var tableDataInfo ={ tableColumns: tableColumns, tableData:[],  reportType:reportType };
			//change the column when different breakDownType
			if(breakDownType == "client"){
				tableColumns.push({name:"Category",label:"Category",isDate:true,isMockDateVal:true,isAlignCenter:true,combination:1,showOpen:(clientVal?true:false),openName:"showOpen"});
				if(clientVal)tableDataInfo.tableColumns.push({name:"Date",label:"Client",isDate:true,isMockDateVal:true,isAlignLeft:true,isBindData:true}); 
				tableDataInfo.combinationDefaultNotSort = true;
			}else if(breakDownType == "device"){
				tableColumns.push({name:"Category",label:"Category",isDate:true,isMockDateVal:true,isAlignCenter:true,combination:1});
				if(deviceVal)tableDataInfo.tableColumns.push({name:"Date",label:"Device",isDate:true,isMockDateVal:true,isAlignLeft:true}); 
				tableDataInfo.combinationDefaultNotSort = true;
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			if(breakDownType=="device"||breakDownType=="client"||breakDownType=="browser")uniqueStats=false;
			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					var resultDataRow = {};
					var percentChange = "";
					var dataVal = "";

					if(reportType == smr.REPORT_TYPE.BATCH){
						if(uniqueStats){
							dataVal = smr.checkNumber(rowData[metricName].unique);
							percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName].unique)*100;
						}else{
							if(breakDownType=="device"||breakDownType=="client"||breakDownType=="browser"){
								dataVal = smr.checkNumber(rowData[metricName]);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName])*100;
							}else{
								dataVal = smr.checkNumber(rowData[metricName].count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName].count)*100;
							}
						}
						
						if(metricName == "opens"){
							var contributionTo = columnTitle + " Contribution to Opens";
							resultDataRow["Opens"] = dataVal;
							resultDataRow["showOpen"] = percentChange;
							resultDataRow[contributionTo] = percentChange;
						}else if(metricName == "clicks"){
							var contributionTo = columnTitle + " Contribution to Clicks";
							resultDataRow["Clicks"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}
					}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL || reportType == smr.REPORT_TYPE.PROGRAM){
						if(uniqueStats){
							if(metricName == "opens"){
								dataVal = smr.checkNumber(rowData.uniqueOpens.count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary.uniqueOpens.count)*100;
							}else if(metricName == "clicks") {
								dataVal = smr.checkNumber(rowData.uniqueClicks.count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary.uniqueClicks.count)*100;
							}
						}else{
							if(breakDownType=="device"||breakDownType=="client"||breakDownType=="browser"){
								dataVal = smr.checkNumber(rowData[metricName]);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName])*100;
							}else{
								dataVal = smr.checkNumber(rowData[metricName].count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName].count)*100;
							}
						}
						
						if(metricName == "opens"){
							var contributionTo = columnTitle + " Contribution to Opens";
							resultDataRow["Opens"] = dataVal;
							resultDataRow["showOpen"] = percentChange;
							resultDataRow[contributionTo] = percentChange;
						}else if(metricName == "clicks"){
							var contributionTo = columnTitle + " Contribution to Clicks";
							resultDataRow["Clicks"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}
					}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
						var cloName = metricName;
						if(metricName=="risk") cloName="lapsed";
						dataVal = smr.checkNumber(rowData[cloName]);
						percentChange = smr.formatDivisionNumber(dataVal,dataSummary[cloName])*100;
						
						if(metricName == "active"){
							var contributionTo = columnTitle + " Contribution to Active";
							resultDataRow["Active"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}else if(metricName == "risk"){
							var contributionTo = columnTitle + " Contribution to Lapsed";
							resultDataRow["Lapsed"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}else if(metricName == "inactive"){
							var contributionTo = columnTitle + " Contribution to Inactive";
							resultDataRow["Inactive"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}else if(metricName == "total"){
							var contributionTo = columnTitle + " Contribution to Total";
							resultDataRow["Total"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}
					}
					
					//add the column data
					if(breakDownType == "client"){
						resultDataRow["Category"] = rowData.category;
						if(clientVal)resultDataRow["Client"] = {value:rowData.client?rowData.client:"Unknown",data:{versions:rowData.versions,opens:smr.checkNumber(rowData.opens)}};
					}else if(breakDownType == "device"){
						resultDataRow["Category"] = rowData.category ;
						if(deviceVal)resultDataRow["Device"] = rowData.platform ? rowData.platform : "Unknown";
					}else{
						resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultDataRow);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-ENGAGEMENTBARTABLE";
			brite.display("barChart",$engagement,{tableDataInfo:tableDataInfo}).done(function(){
				$engagement.delegate("td.bindData","mouseover",function(){
					var $this = $(this)
					var name = $.trim($this.find("span").html());
					var data = $this.data("bindData");
					if(data && data.versions && data.versions.length>0){
						data.name = name;
						data.hasData = true;
						$.each(data.versions,function(i,version){
							version.percent = (smr.formatDivisionNumber(version.opens,data.opens)*100).toFixed("1");
						});
					}else{
						data={hasData:false};
					}
					$container = $e.find(".versionHoverBoxContainer");
		        	var html = smr.render("tmpl-sectionEngagement-versionSection-table-td-hover",data);
					$container.empty().append(html);
					var offset = $e.closest(".smr.report").offset() ;
					var thisSpanOffset = $this.offset();
					var IE7offsetX = 0;
					var container_height = $container.height();
					$container.css({left:(thisSpanOffset.left - offset.left)-IE7offsetX , top:thisSpanOffset.top-offset.top-container_height});
					$container.show();
				});
				
				$engagement.delegate("td.bindData","mouseleave",function(){
					var $this = $(this)
					$e.find(".versionHoverBoxContainer").empty().hide();
				});
			});
		}
	}
	
	function showPieView(breakDownType,uniqueStats,dataAll,metricName,deviceVal,clientVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $engagement = $e.find(".sectionEngagement-pie");
		
		var dataOrSummaryNodata = false;
		if(breakDownType == "device" || breakDownType == "browser"  || breakDownType=="client"){
			dataOrSummaryNodata = false;
		}else{
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				dataOrSummaryNodata = (dataAll.data == "undefined");
			}else{
				dataOrSummaryNodata = (dataAll.data == "undefined"  || typeof dataAll.summary == "undefined");
			}
		}
		
		if(typeof dataAll == "undefined" || dataAll==null || dataOrSummaryNodata){
			$engagement.html("");
			$engagement.append("<div class='noData'>No Data!</div>");
		}else{
			$engagement.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;
			var resultData = [];
			
			if(breakDownType=="client"){
				dataSummary = dataAll.clientUsageData;
				if(dataSummary){
					if(clientVal){
						if(dataSummary.desktopClientUsageData && dataSummary.desktopClientUsageData.data && dataSummary.desktopClientUsageData.data.length>0){
							$.each(dataSummary.desktopClientUsageData.data,function(i,item){item.category="Computer"});
							resultData = resultData.concat(dataSummary.desktopClientUsageData.data);
						}
						if(dataSummary.mobileClientUsageData && dataSummary.mobileClientUsageData.data && dataSummary.mobileClientUsageData.data.length>0){
							$.each(dataSummary.mobileClientUsageData.data,function(i,item){item.category="Mobile"});
							resultData = resultData.concat(dataSummary.mobileClientUsageData.data);
						}
						if(dataSummary.webClientUsageData && dataSummary.webClientUsageData.data && dataSummary.webClientUsageData.data.length>0){
							$.each(dataSummary.webClientUsageData.data,function(i,item){item.category="Webmail"});
							resultData = resultData.concat(dataSummary.webClientUsageData.data);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							$.each(dataSummary.others.data,function(i,item){item.category="Other"});
							resultData = resultData.concat(dataSummary.others.data);
						}
					}else{
						if(dataSummary.desktopClientUsageData && dataSummary.desktopClientUsageData.data && dataSummary.desktopClientUsageData.data.length>0){
							dataSummary.desktopClientUsageData.category="Computer";
							resultData = resultData.concat([dataSummary.desktopClientUsageData]);
						}
						if(dataSummary.mobileClientUsageData && dataSummary.mobileClientUsageData.data && dataSummary.mobileClientUsageData.data.length>0){
							dataSummary.mobileClientUsageData.category="Mobile";
							resultData = resultData.concat([dataSummary.mobileClientUsageData]);
						}
						if(dataSummary.webClientUsageData && dataSummary.webClientUsageData.data && dataSummary.webClientUsageData.data.length>0){
							dataSummary.webClientUsageData.category="Webmail";
							resultData = resultData.concat([dataSummary.webClientUsageData]);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							dataSummary.others.category="Other";
							resultData = resultData.concat([dataSummary.others]);
						}
					}
				}
			}else if(breakDownType=="browser"){
				dataSummary = dataAll.browserUsageData;
				if(dataSummary){
					$.each(dataSummary.data,function(i,item){
						if(item["opens"] && item["opens"]!=0){
							resultData.push(item);
						}
					});
				}
			}else if(breakDownType=="device"){
				dataSummary = dataAll.deviceUsageData;
				if(dataSummary){
					if(deviceVal){
						if(dataSummary.desktopUsageData && dataSummary.desktopUsageData.data && dataSummary.desktopUsageData.data.length>0) {
							$.each(dataSummary.desktopUsageData.data,function(i,item){item.category="Computer"});
							resultData = resultData.concat(dataSummary.desktopUsageData.data);
						};
						if(dataSummary.mobileUsageData && dataSummary.mobileUsageData.data && dataSummary.mobileUsageData.data.length>0){
							$.each(dataSummary.mobileUsageData.data,function(i,item){item.category="Phone"});
							resultData = resultData.concat(dataSummary.mobileUsageData.data);
						}
						if(dataSummary.tabletUsageData && dataSummary.tabletUsageData.data && dataSummary.tabletUsageData.data.length>0){
							$.each(dataSummary.tabletUsageData.data,function(i,item){item.category="Tablet"});
							resultData = resultData.concat(dataSummary.tabletUsageData.data);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							$.each(dataSummary.others.data,function(i,item){item.category="Other"});
							resultData = resultData.concat(dataSummary.others.data);
						}
					}else{
						if(dataSummary.desktopUsageData && dataSummary.desktopUsageData.data && dataSummary.desktopUsageData.data.length>0) {
							dataSummary.desktopUsageData.category = "Computer";
							resultData = resultData.concat([dataSummary.desktopUsageData]);	
						}
						if(dataSummary.mobileUsageData && dataSummary.mobileUsageData.data && dataSummary.mobileUsageData.data.length>0){
							dataSummary.mobileUsageData.category = "Phone";
							resultData = resultData.concat([dataSummary.mobileUsageData]);
						}
						if(dataSummary.tabletUsageData && dataSummary.tabletUsageData.data && dataSummary.tabletUsageData.data.length>0){
							dataSummary.tabletUsageData.category = "Tablet";
							resultData = resultData.concat([dataSummary.tabletUsageData]);
						}
						if(dataSummary.others && dataSummary.others.data && dataSummary.others.data.length>0){
							dataSummary.others.category = "Other";
							resultData = resultData.concat([dataSummary.others]);
						}
					}
				}
			}else{
				for(var i=0; i<dataSet.length;i++){
					resultData.push(dataSet[i]);
				}
			}
			
			if(view.reportType == smr.REPORT_TYPE.AUDIENCE){
				dataSummary = dataAll;
			}
			
			var dropDownListVal = [];
			var tableColumns = [];
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				dropDownListVal = [
				   		            {name:"active",labelName:"Active"},
				   					{name:"risk",labelName:"Lapsed"},
				   					{name:"inactive",labelName:"Inactive"},
				   					{name:"total",labelName:"Total"}
				   		         ];
				
				if(metricName == "active"){
					tableColumns =  [
				               {name:"active",label:"Active",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"rate",label:"%",isRate:true,defaultSort:true},
				               {name:"datecontributiontoactive",label:columnTitle+" Contribution to Active",isPieChart:true,sortable:false}
			               ];
				}else if(metricName == "risk"){
					tableColumns =  [
				               {name:"risk",label:"Lapsed",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"rate",label:"%",isRate:true,defaultSort:true},
				               {name:"datecontributiontorisk",label:columnTitle+" Contribution to Lapsed",isPieChart:true,sortable:false}
			               ];
				}else if(metricName == "inactive"){
					tableColumns =  [
						       {name:"inactive",label:"Inactive",isDropDown:true,dropDownList:dropDownListVal},
						       {name:"rate",label:"%",isRate:true,defaultSort:true},
						       {name:"datecontributiontoinactive",label:columnTitle+" Contribution to Inactive",isPieChart:true,sortable:false}
					       ];
				}else if(metricName == "total"){
					tableColumns =  [
					           {name:"total",label:"Total",isDropDown:true,dropDownList:dropDownListVal},
					           {name:"rate",label:"%",isRate:true,defaultSort:true},
					           {name:"datecontributiontototal",label:columnTitle+" Contribution to Total",isPieChart:true,sortable:false}
						   ];
				}
			}else{
				dropDownListVal = [{name:"opens",labelName:"Opens"},{name:"clicks",labelName:"Clicks"}];
				if(breakDownType=="browser" || breakDownType=="client"){
					dropDownListVal = [{name:"opens",labelName:"Opens"}];
				}
				if(metricName == "opens"){
					var tableColumns = [];
					tableColumns.push({name:"opens",label:"Opens",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontoopens",label:columnTitle+" Contribution to Opens",isPieChart:true,sortable:false});
				}else if(metricName == "clicks"){
					tableColumns =  [
				               {name:"clicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal},
				               {name:"rate",label:"%",isRate:true,defaultSort:true},
				               {name:"datecontributiontoclicks",label:columnTitle+" Contribution to Clicks",isPieChart:true,sortable:false}
			               ];
				}
				
			}
			var tableDataInfo ={ tableColumns: tableColumns, tableData:[], reportType:reportType, maxSize:20 };
			if(breakDownType == "mailing"){
				tableDataInfo.maxSize = 12;
			}
			//change the column when different breakDownType
			if(breakDownType == "client"){
				tableColumns.push({name:"Category",label:"Category",isDate:true,isMockDateVal:true,isAlignLeft:true,combination:1});
				if(clientVal)tableDataInfo.tableColumns.push({name:"Date",label:"Client",isDate:true,isMockDateVal:true,isAlignLeft:true,isBindData:true});  
			}else if (breakDownType == "device"){
				tableColumns.push({name:"Category",label:"Category",isDate:true,isMockDateVal:true,isAlignLeft:true,combination:1});
				if(deviceVal)tableDataInfo.tableColumns.push({name:"Date",label:"Device",isDate:true,isMockDateVal:true,isAlignLeft:true}); 
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			if(breakDownType=="device"||breakDownType=="client"||breakDownType=="browser")uniqueStats=false;
			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					//build the tableData
					var resultDataRow = {};
					var percentChange = "";
					var percentVal = "";
					var dataVal = "";

					if(reportType == smr.REPORT_TYPE.BATCH){
						if(uniqueStats){
							dataVal = smr.checkNumber(rowData[metricName].unique);
							percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName].unique)*100;
						}else{
							if(breakDownType=="device"||breakDownType=="client"||breakDownType=="browser"){
								dataVal = smr.checkNumber(rowData[metricName]);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName])*100;
							}else{
								dataVal = smr.checkNumber(rowData[metricName].count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName].count)*100;
							}
						}
						
						percentVal = smr.formatToFixed(percentChange);
						
						if(metricName == "opens"){
							var contributionTo = columnTitle + " Contribution to Opens";
							resultDataRow["Opens"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}else if(metricName == "clicks"){
							var contributionTo = columnTitle + " Contribution to Clicks";
							resultDataRow["Clicks"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}
					}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL || reportType == smr.REPORT_TYPE.PROGRAM){
						if(uniqueStats){
							if(metricName == "opens"){
								dataVal = smr.checkNumber(rowData.uniqueOpens.count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary.uniqueOpens.count)*100;
							}else if(metricName == "clicks") {
								dataVal = smr.checkNumber(rowData.uniqueClicks.count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary.uniqueClicks.count)*100;
							}
						}else{
							if(breakDownType=="device"||breakDownType=="client"||breakDownType=="browser"){
								dataVal = smr.checkNumber(rowData[metricName]);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName])*100;
							}else{
								dataVal = smr.checkNumber(rowData[metricName].count);
								percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName].count)*100;
							}
						}
						percentVal = smr.formatToFixed(percentChange);
						
						if(metricName == "opens"){
							var contributionTo = columnTitle + " Contribution to Opens";
							if((breakDownType == "device" && deviceVal) || (breakDownType == "client" && clientVal) )  resultDataRow["Category"] = rowData["category"];
							resultDataRow["Opens"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}else if(metricName == "clicks"){
							var contributionTo = columnTitle + " Contribution to Clicks";
							if((breakDownType == "device" && deviceVal) || (breakDownType == "client" && clientVal) )  resultDataRow["Category"] = rowData["category"];
							resultDataRow["Clicks"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}
					}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
						var cloName = metricName;
						if(cloName=="risk") cloName="lapsed";
						
						dataVal = smr.checkNumber(rowData[cloName]);
						percentChange = smr.formatDivisionNumber(dataVal,dataSummary[cloName])*100;
						percentVal = smr.formatToFixed(percentChange);
						
						if(metricName == "active"){
							var contributionTo = columnTitle + " Contribution to Active";
							resultDataRow["Active"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}else if(metricName == "risk"){
							var contributionTo = columnTitle + " Contribution to Lapsed";
							resultDataRow["Lapsed"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}else if(metricName == "inactive"){
							var contributionTo = columnTitle + " Contribution to Inactive";
							resultDataRow["Inactive"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}else if(metricName == "total"){
							var contributionTo = columnTitle + " Contribution to Total";
							resultDataRow["Total"] = dataVal;
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}
					}
					
					//add the column data
					if(breakDownType == "client"){
						resultDataRow["Category"] = rowData.category;
						if(clientVal)resultDataRow["Client"] = {value:rowData.client?rowData.client:"Unknown",data:{versions:rowData.versions,opens:smr.checkNumber(rowData.opens)}};
					}else if (breakDownType == "device"){
						resultDataRow["Category"] = rowData.category;
						if(deviceVal)resultDataRow["Device"] = rowData.platform ? rowData.platform : "Unknown";
					}else{
						resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultDataRow);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-ENGAGEMENTPIETABLE";
			brite.display("pieChart",$engagement,tableDataInfo).done(function(){
				$engagement.delegate("td.bindData","mouseover",function(){
					var $this = $(this)
					var name = $.trim($this.find("span").html());
					var data = $this.data("bindData");
					if(data && data.versions && data.versions.length>0){
						data.name = name;
						data.hasData = true;
						$.each(data.versions,function(i,version){
							version.percent = (smr.formatDivisionNumber(version.opens,data.opens)*100).toFixed("1");
						});
					}else{
						data={hasData:false};
					}
					$container = $e.find(".versionHoverBoxContainer");
		        	var html = smr.render("tmpl-sectionEngagement-versionSection-table-td-hover",data);
					$container.empty().append(html);
					var offset = $e.closest(".smr.report").offset() ;
					var thisSpanOffset = $this.offset();
					var IE7offsetX = 0;
					var container_height = $container.height();
					$container.css({left:(thisSpanOffset.left - offset.left)-IE7offsetX , top:thisSpanOffset.top-offset.top-container_height});
					$container.show();
				});
				
				$engagement.delegate("td.bindData","mouseleave",function(){
					var $this = $(this)
					$e.find(".versionHoverBoxContainer").empty().hide();
				});
			});
		}
	}
	
	// --------- /Component Private Methods --------- //

    // --------- Component Registration --------- //
    brite.registerView("sectionEngagement", {
            emptyParent : true
        },
        function () {
            return new smr.SectionEngagement();
        });
    // --------- Component Registration --------- //
})(jQuery);
