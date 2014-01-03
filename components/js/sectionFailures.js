var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _breakDownType,_viewRate;
	// --------- /Component Private Properties --------- //
	
    // --------- Component Interface Implementation ---------- //
	function SectionFailures(){}
	smr.SectionFailures = SectionFailures; 

	SectionFailures.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionFailures",{});
	};
		
	SectionFailures.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
		
		var viewName = data.view || "table";
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		var reportType = view.reportType = data.reportType || view.reportType;
		
		view.viewName = viewName;
		view.isNewRequest = data.isNewRequest || false;
		view.metricName = data.metricName || "failures";
		view.programMailingIds = data.opts.programMailingIds || null;
		view.fetchVal = smr.fetchSingleMetricOrigin;
		
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		
		//show the Failure Code for breakdown
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .isFailureDetailCode").show();
		
		if(reportType != smr.REPORT_TYPE.DELIVERABILITY){
			_breakDownType = _breakDownType || "mailing";
		}else{
			_breakDownType = _breakDownType || "domain";
			//hide the mailing and campaign
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='campaign']").addClass("isHide");
		}
		
		
		//target only hide in Failure section
		if(_breakDownType == "target"){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			if(reportType == smr.REPORT_TYPE.PROGRAM){
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
				_breakDownType = "program";
			}else{
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Mailing");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("default");
				_breakDownType = "mailing";
			}
		}
		if(reportType == smr.REPORT_TYPE.BATCH){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='target']").addClass("isHide");
		}
		
		if(view.isNewRequest){
			smr.clearPivotViewCache(view.reportType,"failures");
		}

		
		view.showView(viewName,_breakDownType);
		
	};
	
	SectionFailures.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for viewrate change
			"REPORTHEADER_VIEWRATE_CHANGE": reportHeaderViewRateChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod,
			
			//event for pivot view trigger
			"STATSSUMMARY_STATUS_CHANGE": statsSummaryStatusChangeMetod,
			
			//event for Fetch All Metrics checkbox change
			"FETCH_ALLMETRICS_CHANGE": fetchAllMetricsChangeMethod
		}
	}
	
	SectionFailures.prototype.events={
		"click; .sectionFailuresTable .failureDetailCount" : doClickFailureDetailCount
	}
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;
		view.viewName = viewName;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(view.viewName=="bar" || view.viewName=="pie"){
			_viewRate = false;
			if(view.metricName == "failureRate"){
				view.metricName = "failures"; 
			}
			$e.closest(".report").find(".reportHeader-rateSwitch input").removeAttr("checked");
		}
		if(view.showView(viewName,_breakDownType,_viewRate)){
			extra.complete = true;
		}else{
			alert("Not support yet");
		}
	}
	
	function reportHeaderBreakDownChangeMethod(event){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
		
		//when breakdown is Failure Detail Code,hide the View Rates
		if(val == "failureDetailCode"){
			$e.closest(".report").find(".reportHeader-toggle").hide();
		}else{
			$e.closest(".report").find(".reportHeader-toggle").show();
		}
			
		var isHave = smr.checkIsHaveBreakdownValue(view.reportType,val);
		if(!isHave){
			_breakDownType = val;
			view.showView(view.viewName,_breakDownType,_viewRate);
		}else{
			smr.goBackPreBreakdownValue($this,_breakDownType);
		}
	}
	
	function reportHeaderViewRateChangeMethod(event,extra){
		var view = this;
		_viewRate = extra.value;
		var isNewRequest = (view.viewName=="pivot") ? false :null;
		view.showView(view.viewName,_breakDownType,_viewRate,undefined,isNewRequest,true);
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
		var view = this;
		var metric = extra.metricName;
		view.metricName = metric;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		if(view.viewName=="pivot" && extra.notShowPivotSummary && !view.fetchVal){
			var $pivotTable = view.$el.find(".pivotTable");
			$pivotTable.find(".pivotHeader").trigger("metricChange",extra);
			$pivotTable.find(".pivotTableMetric .metric-select").val(extra.metricName);
		}else{
			view.showView(view.viewName,_breakDownType,_viewRate,metric);
		}
	}
	
	function statsSummaryStatusChangeMetod(event,extra){
		var view = this;
		var pivotClickable = extra.clickable;
		if(extra.metric){
			view.metricName = extra.metric;
			view.pivotDataSummary = extra.summary
			showSummary.call(view,view.reportType,"",_viewRate,"pivot",view.pivotDataSummary,view.metricName,pivotClickable)
		}else{
			showSummary.call(view,view.reportType,"",_viewRate,"pivot",view.pivotDataSummary,view.metricName,pivotClickable);
		}
	}
	
	function fetchAllMetricsChangeMethod(event,extra){
		var view = this;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		view.showView(view.viewName,_breakDownType,_viewRate,view.metricName);
	}
	
	function doClickFailureDetailCount(event,extra){
		var view = this;
		var reportType = view.reportType;
		
		var $this = $(event.currentTarget);
		
		var failureType = $this.attr("data-value");
			
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
				
			//when programIds and programMailingIds are both present, just send programMailingIds as mailingIds,we should not add the programIds in url
			if(view.programMailingIds != null){
				programIds = "";
				programIds = "&mailingIds="+view.programMailingIds;
			}
		}
		
		var tagValueIds = "";
		if(reportType != smr.REPORT_TYPE.DELIVERABILITY){
			var tags = smr.getTagSet(reportType,"main").list();
			for(var i = 0; i < tags.length; i++){
				tagValueIds = tagValueIds + "&tagValueIds="+tags[i].id;
			}
		}
			
		var vsgAndIps = "";
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
			var setAndType = smr.getSetAndType(reportType);
			var paramName = setAndType.type=="VSG" ? "&mailingClassName=" : "&ipAddresses=";
			var vsgOrIps = setAndType.set.list();
			for(var i = 0; i < vsgOrIps.length; i++){
				vsgAndIps = vsgAndIps + paramName + vsgOrIps[i].id;
			}
				
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
			
		var drillDownFailureUrl = "report/drilldown.do?reportType=DrillDown_Failure" + mailingsId + campaignIds + programIds + tagValueIds + vsgAndIps + startDate + endDate +includeSubOrgFlag + "&mailingType=" + reportType + "&failureType=" + failureType;
			
		window.open(drillDownFailureUrl);
	}
	
	// --------- /events --------- //
	
    // --------- /Component Interface Implementation ---------- //

    // --------- Component Public API --------- //
	SectionFailures.prototype.getAllData = function(breakDownType,isNewRequest){
		var view = this;
		var $e = view.$el;
		if(breakDownType == "failureDetailCode"){
			if(view.reportType == smr.REPORT_TYPE.DELIVERABILITY){
				breakDownType = "failureCode";
			}else{
				breakDownType = "day";
			}
		}
		var dfd = $.Deferred();
		var $reportDataLoading = $e.closest(".report").find(".report-data-loading");
		if(view.viewName=="pivot"){
			$reportDataLoading = $e.closest(".report").find(".report-data-progressBar");
		}
		$reportDataLoading.show();

		if(view.viewName=="pivot"){
			smr.getBigDataSummary(view.reportType,"getFailures",view.metricName,_viewRate,null,isNewRequest==null ? view.isNewRequest : isNewRequest, view.fetchVal).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0];
				}
				if(view.fetchVal){
					var includeSummaryTemp = smr.includeSummaryTemp[view.reportType]["getFailures"];
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
		}else {
			smr.getSummary(view.reportType,"failure",breakDownType,view.isNewRequest,"",view.programMailingIds).done(function(data){
				var dataSet = {data:null,summary:null};
				if(data.items != null){
					dataSet = data.items[0];
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}
		return dfd.promise();
	};
	
	SectionFailures.prototype.showView = function(viewName,breakDownType,viewRate,metric,isNewRequest,isRateChange){
		var view = this;
		var $e = view.$element;
		var reportType = view.reportType;
		
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_viewRate = $e.closest(".report").find(".reportHeader-toggle input[type='checkbox']").attr("checked") ? true : false;
		if(typeof breakDownType != 'undefined'){
			_breakDownType = breakDownType
		}else{
			if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
				_breakDownType = "domain";
			}else{
				_breakDownType = "mailing";
			}
		}
		if(typeof viewRate != 'undefined'){
			_viewRate = viewRate;
		}
		if(typeof metric != 'undefined'){
			view.metricName = metric;
		}
		
		var metricName = view.metricName;
		
		//clean first
		$e.find(".statSummary").empty();
		$e.find(".sectionFailures-view").empty();
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionFailures-table",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionFailures-pie",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionFailures-bar",{});
		}else if(viewName == 'pivot'){
			html = smr.render("tmpl-sectionFailures-pivot",{});
		}else{
			return false;
		}
		
		$e.find(".sectionFailures-view").append($(html));
		
		if(typeof isRateChange!="undefined" && isRateChange && viewName == 'pivot' && !view.fetchVal){
			showPivotView.call(view,metricName,_viewRate,view.pivotAllData);
		}else{
			view.getAllData(_breakDownType,isNewRequest).done(function(dataAll){
				if(viewName == 'table'){
					showTableView.call(view,_breakDownType,_viewRate,dataAll);
				}else if(viewName == 'pie'){
					showPieView.call(view,_breakDownType,_viewRate,dataAll,metricName);
				}else if(viewName == 'bar'){
					showBarView.call(view,_breakDownType,_viewRate,dataAll,metricName);
				}else if(viewName == 'pivot'){
					showPivotView.call(view,metricName,_viewRate,dataAll)
				}
			});
		}
		
		return true;
	};
	
	SectionFailures.prototype.destroy = function(){
		var view = this;
		//hide the breakdown of  Failure Code,and set the default value to Mailing 
		this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .isFailureDetailCode").hide();
		if(_breakDownType == "failureDetailCode"){
			this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			if(view.reportType == smr.REPORT_TYPE.PROGRAM){
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
			}else if(view.reportType == smr.REPORT_TYPE.DELIVERABILITY){
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Domain");
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("default");
			}else{
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Mailing");
				this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("default");
			}
		}
		//target only hide in Failure section,so remove the isHide when go to other page
		this.$el.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='target']").removeClass("isHide");
		smr.clearPivotViewCache(view.reportType,"failures");
	};
    // --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	function showTableView(breakDownType,viewRate,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		showSummary.call(view,reportType,breakDownType,viewRate,"table",dataAll);
		
		if(breakDownType == "failureDetailCode"){
			if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
				var $sectionFailuresTable = $e.find(".sectionFailuresTable")
				if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || dataAll.data == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll.data[0];
					 
					var	tableColumns = [
							{name:"category",label:"Category",combination:1},
							{name:"code",label:"Code"},
							{name:"description",label:"Description"},
							{name:"count",label:"Count",isFailureDetailCount:true},
							{name:"rate",label:"Rate",isRate:true},
							{name:"percentageOfFailure",label:"% of Failure",isRate:true}
			            ];
					
					var tableDataInfo ={
							tableColumns: tableColumns,
							tableData:[]
						};
					
					var blockData = data.block.failuresByCode;
					if(blockData && blockData.length > 0){
						for(var i = 0; i < blockData.length; i++){
							var rowData = blockData[i];
							var code = rowData.code;
							var resultData = {
									"Category":"Block",
									"Code":smr.checkNumber(code),
									"Description":smr.checkNumber(rowData.description),
									"Count":smr.checkNumber(rowData.count),
									"Rate":smr.checkNumber(rowData.rate),
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							tableDataInfo.tableData.push(resultData);
						}
					}
					
					var hardBounceData = data.hardBounce.failuresByCode;
					if(hardBounceData && hardBounceData.length > 0){
						for(var i = 0; i < hardBounceData.length; i++){
							var rowData = hardBounceData[i];
							var code = rowData.code;
							var resultData = {
									"Category":"Hard Bounce",
									"Code":smr.checkNumber(code),
									"Description":smr.checkNumber(rowData.description),
									"Count":smr.checkNumber(rowData.count),
									"Rate":smr.checkNumber(rowData.rate),
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							tableDataInfo.tableData.push(resultData);
						}
					}
					
					var softBounceData = data.softBounce.failuresByCode;
					if(softBounceData && softBounceData.length > 0){
						for(var i = 0; i < softBounceData.length; i++){
							var rowData = softBounceData[i];
							var code = rowData.code;
							var resultData = {
									"Category":"Soft Bounce",
									"Code":smr.checkNumber(code),
									"Description":smr.checkNumber(rowData.description),
									"Count":smr.checkNumber(rowData.count),
									"Rate":smr.checkNumber(rowData.rate),
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							tableDataInfo.tableData.push(resultData);
						}
					}
					
					var technicalData = data.technical.failuresByCode;
					if(technicalData && technicalData.length > 0){
						for(var i = 0; i < technicalData.length; i++){
							var rowData = technicalData[i];
							var code = rowData.code;
							var resultData = {
									"Category":"Technical",
									"Code":smr.checkNumber(code),
									"Description":smr.checkNumber(rowData.description),
									"Count":smr.checkNumber(rowData.count),
									"Rate":smr.checkNumber(rowData.rate),
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							tableDataInfo.tableData.push(resultData);
						}
					}
					
					var unknownData = data.unknown.failuresByCode;
					if(unknownData && unknownData.length > 0){
						for(var i = 0; i < unknownData.length; i++){
							var rowData = unknownData[i];
							var code = rowData.code;
							var resultData = {
									"Category":"Unknown",
									"Code":smr.checkNumber(code),
									"Description":smr.checkNumber(rowData.description),
									"Count":smr.checkNumber(rowData.count),
									"Rate":smr.checkNumber(rowData.rate),
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							tableDataInfo.tableData.push(resultData);
						}
					}
					
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					var title = smr.buildTitleValue(breakDownType);
					tableDataInfo.title="Failures by "+title;
					tableDataInfo.smaclass="SMA-REPORT-FAILURESDATATABLE";
					brite.display("dataTable",$e.find(".sectionFailuresTable"),tableDataInfo);
				}
			}else{
				var $sectionFailuresTable = $e.find(".sectionFailuresTable")
				if(typeof dataAll == "undefined" || typeof dataAll.failureSummaryDetailCodeReportList == "undefined" || dataAll.failureSummaryDetailCodeReportList == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll.failureSummaryDetailCodeReportList;
					 
					var	tableColumns = [
							{name:"category",label:"Category",combination:1},
							{name:"detailCode",label:"Code"},
							{name:"detailDescription",label:"Description"},
							{name:"count",label:"Count",isFailureDetailCount:true},
							{name:"failureRate",label:"Rate",isRate:true},
							{name:"failurePercentage",label:"% of Failure",isRate:true}
			            ];
					
					var tableDataInfo ={
							tableColumns: tableColumns,
							tableData:[]
						};
					
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var code = rowData.detailCode;
							var resultData = {
									"Category":"",
									"Code":smr.checkNumber(code),
									"Description":smr.checkNumber(rowData.detailDescription),
									"Count":smr.checkNumber(rowData.count),
									"Rate":smr.checkNumber(rowData.failureRate),
									"% of Failure":smr.checkNumber(rowData.failurePercentage)
								};
							
							if(code >= 1000 && code <= 1999){
								resultData.Category = "Block";
							}else if(code >= 2000 && code <= 2999){
								resultData.Category = "Hard Bounce";
							}else if(code >= 3000 && code <= 3999){
								resultData.Category = "Soft Bounce";
							}else if(code >= 4000 && code <= 4999){
								resultData.Category = "Technical";
							}else if(code >= 9000 && code <= 9999){
								resultData.Category = "Unknown";
							}
							
							//tableDataInfo.tableData = [blockData, hardData, softData, technicalData, unknownData];
							tableDataInfo.tableData.push(resultData);
						}
					}
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					var title = smr.buildTitleValue(breakDownType);
					tableDataInfo.title="Failures by "+title;
					tableDataInfo.smaclass="SMA-REPORT-FAILURESDATATABLE";
					brite.display("dataTable",$e.find(".sectionFailuresTable"),tableDataInfo);
				}
			}
		}else{
			var $sectionFailuresTable = $e.find(".sectionFailuresTable")
			if(typeof dataAll == "undefined"){
				$sectionFailuresTable.html("");
				$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
			}else{
				var data = "";
				if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
					data = dataAll.data;
				}else{
					data = dataAll.failureSummaryReportInstanceList;
				}
				
				if(typeof data == "undefined" || data == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var tableColumns = [];
					var tableDataInfo ={
							tableColumns: tableColumns,
							tableData:[],
							reportType:reportType,
							maxSize:30
						};
					if(breakDownType == "mailing"){
						tableDataInfo.maxSize = 24;
					}
					
					//change the column when different breakDownType
					if(breakDownType=="domain"){
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType,true);
					}else if(breakDownType=="vsg"){
						tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
					}else{
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
					}
					
					if(viewRate){
						tableColumns.push({name:"failures",label:"Failures"});
						tableColumns.push({name:"failurerate",label:"Failure Rate",isRate:true});
						tableColumns.push({name:"block",label:"Block",isRate:true});
						tableColumns.push({name:"hard",label:"Hard Bounce",isRate:true});
						tableColumns.push({name:"soft",label:"Soft Bounce",isRate:true});
						tableColumns.push({name:"technical",label:"Technical",isRate:true});
						tableColumns.push({name:"unknown",label:"Unknown",isRate:true});
					}else{
						tableColumns.push({name:"failures",label:"Failures"});
						tableColumns.push({name:"failurerate",label:"Failure Rate",isRate:true});
						tableColumns.push({name:"block",label:"Block"});
						tableColumns.push({name:"hard",label:"Hard Bounce"});
						tableColumns.push({name:"soft",label:"Soft Bounce"});
						tableColumns.push({name:"technical",label:"Technical"});
						tableColumns.push({name:"unknown",label:"Unknown"});
					}
					
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var resultData = {};
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								if(viewRate){
									resultData = {
										"Failures":smr.checkNumber(rowData.failed.count),
										"Failure Rate":smr.checkNumber(rowData.failed.rate),
										"Block":smr.checkNumber(rowData.block.rate),
										"Hard Bounce":smr.checkNumber(rowData.hardBounce.rate),
										"Soft Bounce":smr.checkNumber(rowData.softBounce.rate),
										"Technical":smr.checkNumber(rowData.technical.rate),
										"Unknown":smr.checkNumber(rowData.unknown.rate)
									};
								}else{
									resultData = {
										"Failures":smr.checkNumber(rowData.failed.count),
										"Failure Rate":smr.checkNumber(rowData.failed.rate),
										"Block":smr.checkNumber(rowData.block.count),
										"Hard Bounce":smr.checkNumber(rowData.hardBounce.count),
										"Soft Bounce":smr.checkNumber(rowData.softBounce.count),
										"Technical":smr.checkNumber(rowData.technical.count),
										"Unknown":smr.checkNumber(rowData.unknown.count)
									};
								}
							}else{
								if(viewRate){
									resultData = {
										"Failures":smr.checkNumber(rowData.failed),
										"Failure Rate":smr.checkNumber(rowData.failedRate),
										"Block":smr.checkNumber(rowData.blockFailedRate),
										"Hard Bounce":smr.checkNumber(rowData.hbounceFailedRate),
										"Soft Bounce":smr.checkNumber(rowData.sbounceFailedRate),
										"Technical":smr.checkNumber(rowData.technicalFailedRate),
										"Unknown":smr.checkNumber(rowData.unknownFailedRate)
									};
								}else{
									resultData = {
										"Failures":smr.checkNumber(rowData.failed),
										"Failure Rate":smr.checkNumber(rowData.failedRate),
										"Block":smr.checkNumber(rowData.block),
										"Hard Bounce":smr.checkNumber(rowData.hbounce),
										"Soft Bounce":smr.checkNumber(rowData.sbounce),
										"Technical":smr.checkNumber(rowData.technical),
										"Unknown":smr.checkNumber(rowData.unknown)
									};
								}
							}
							//add the column data
							if(breakDownType=="vsg"){
								resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
							}else{
								resultData = addTableColumnDataForFailure(resultData,rowData,breakDownType,reportType);
							}
							
							tableDataInfo.tableData.push(resultData);
						}
					}
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					//add title
					var title = smr.buildTitleValue(breakDownType);
					tableDataInfo.title="Failures by "+title;
					tableDataInfo.smaclass="SMA-REPORT-FAILURESDATATABLE";
					brite.display("dataTable",$e.find(".sectionFailuresTable"),tableDataInfo);
				}
			}
		}
	}
	
	function showPieView(breakDownType,viewRate,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		showSummary.call(view,reportType,breakDownType,viewRate,"pie",dataAll,metricName);
		
		if(breakDownType == "failureDetailCode"){
			if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
				var $sectionFailuresTable = $e.find(".sectionFailuresPie")
				if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || dataAll.data == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll.data[0];
					
					var dropDownListVal = [
						                    {name:"failures",labelName:"Failures"},
						   					{name:"block",labelName:"Block"},
						   					{name:"hard",labelName:"Hard Bounce"},
						   					{name:"soft",labelName:"Soft Bounce"},
						   					{name:"technical",labelName:"Technical"},
						   					{name:"unknown",labelName:"Unknown"}
						   		         ];
		
					//show pie table
					var tableColumns = [];
		
					var tableDataInfo ={
						tableColumns: tableColumns,
						tableData:[],
						reportType:reportType
					};
					var failureData = [];
					var breakDownName = "Failure Detail Code";

					tableColumns.push({name:"Failure Detail Code",label:"Failure Detail Code",isDate:true,isMockDateVal:false});
						
					if(metricName == "failures"){
				    	tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
				        tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				        tableColumns.push({name:"failuredetailcodecontributiontofailures",label:"Failure detail code contribution to Failures",isPieChart:true,sortable:false});
				        failureData = failureData.concat(data["block"].failuresByCode);
				        failureData = failureData.concat(data["hardBounce"].failuresByCode);
				        failureData = failureData.concat(data["softBounce"].failuresByCode);
				        failureData = failureData.concat(data["technical"].failuresByCode);
				        failureData = failureData.concat(data["unknown"].failuresByCode);
					}else if(metricName == "block"){
			            tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontoblock",label:"Failure detail code contribution to Block",isPieChart:true,sortable:false});
			            failureData = data["block"].failuresByCode;
					}else if(metricName == "hard"){
			            tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontohard",label:"Failure detail code contribution to Hard Bounce",isPieChart:true,sortable:false});
			            failureData = data["hardBounce"].failuresByCode;
					}else if(metricName == "soft"){
			            tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontosoft",label:"Failure detail code contribution to Soft Bounce",isPieChart:true,sortable:false});
			            failureData = data["softBounce"].failuresByCode;
					}else if(metricName == "technical"){
			            tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontotechnical",label:"Failure detail code contribution to Technical",isPieChart:true,sortable:false});
			            failureData = data["technical"].failuresByCode;
					}else if(metricName == "unknown"){
			            tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontounknown",label:"Failure detail code contribution to Unknown",isPieChart:true,sortable:false});
			            failureData = data["unknown"].failuresByCode;
					}
						
					var sumDataCount = getSumDataCount(failureData);
					
					if(failureData){
						for(var i = 0; i < failureData.length; i++){
							var rowData = failureData[i];
							if(rowData != null){
								var resultData = {};
								var rValue = smr.checkNumber(rowData.count);
								var percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
								var percentVal = smr.formatToFixed(percentChange);						
									
								if(metricName == "failures"){
									resultData = {
										"Failures" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Failures" : percentVal
									};
								}else if(metricName == "block"){
									resultData = {
										"Block" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Block" : percentVal
									};
								}else if(metricName == "hard"){
									resultData = {
										"Hard Bounce" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Hard Bounce" : percentVal
									};
								}else if(metricName == "soft"){
									resultData = {
										"Soft Bounce" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Soft Bounce" : percentVal
									};
								}else if(metricName == "technical"){
									resultData = {
										"Technical" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Technical" : percentVal
									};
								}else if(metricName == "unknown"){
									resultData = {
										"Unknown" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Unknown" : percentVal
									};
								}
				
								resultData[breakDownName] = rowData.code+"";
				
								tableDataInfo.tableData.push(resultData);
							}
						}
						//check whether need to do sortMetrics
						tableDataInfo.skipSortMetrics = true;
						tableDataInfo.smaclass="SMA-REPORT-FAILURESPIETABLE";
						brite.display("pieChart",$e.find(".sectionFailuresPie"),tableDataInfo);
					}else{
						$sectionFailuresTable.html("");
						$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
					}
				}
			}else{
				var $sectionFailuresTable = $e.find(".sectionFailuresTable")
				if(typeof dataAll == "undefined" || typeof dataAll.failureSummaryDetailCodeReportList == "undefined" || dataAll.failureSummaryDetailCodeReportList == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll.failureSummaryDetailCodeReportList;
					
					var dropDownListVal = [
						                    {name:"failures",labelName:"Failures"},
						   					{name:"block",labelName:"Block"},
						   					{name:"hard",labelName:"Hard Bounce"},
						   					{name:"soft",labelName:"Soft Bounce"},
						   					{name:"technical",labelName:"Technical"},
						   					{name:"unknown",labelName:"Unknown"}
						   		         ];
		
					//show pie table
					var tableColumns = [];
		
					var tableDataInfo ={
						tableColumns: tableColumns,
						tableData:[],
						reportType:reportType
					};
					var failureData = [];
					var breakDownName = "Failure Detail Code";

					tableColumns.push({name:"Failure Detail Code",label:"Failure Detail Code",isDate:true,isMockDateVal:false});
					
					if(metricName == "failures"){
				    	tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
				        tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				        tableColumns.push({name:"failuredetailcodecontributiontofailures",label:"Failure detail code contribution to Failures",isPieChart:true,sortable:false});
					}else if(metricName == "block"){
			            tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontoblock",label:"Failure detail code contribution to Block",isPieChart:true,sortable:false});
					}else if(metricName == "hard"){
			            tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontohard",label:"Failure detail code contribution to Hard Bounce",isPieChart:true,sortable:false});
					}else if(metricName == "soft"){
			            tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontosoft",label:"Failure detail code contribution to Soft Bounce",isPieChart:true,sortable:false});
					}else if(metricName == "technical"){
			            tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontotechnical",label:"Failure detail code contribution to Technical",isPieChart:true,sortable:false});
					}else if(metricName == "unknown"){
			            tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
			            tableColumns.push({name:"failuredetailcodecontributiontounknown",label:"Failure detail code contribution to Unknown",isPieChart:true,sortable:false});
					}
					
					//compute the summary count
					var sumDataCount = 0;
					var eValue = 0;
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var code = rowData.detailCode;
							if(metricName == "failures"){
								eValue = smr.checkNumber(rowData.count);
								sumDataCount = sumDataCount + eValue;
							}else if(metricName == "block"){
								if(code >= 1000 && code <= 1999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "hard"){
								if(code >= 2000 && code <= 2999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "soft"){
								if(code >= 3000 && code <= 3999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "technical"){
								if(code >= 4000 && code <= 4999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "unknown"){
								if(code >= 9000 && code <= 9999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}
						}
					}
								
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var code = rowData.detailCode;
							var resultData = {};
							var rValue = "";
							var percentVal = "";	
								
							if(metricName == "failures"){
								rValue = smr.checkNumber(rowData.count);
								percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
								percentVal = smr.formatToFixed(percentChange);	
								resultData = {
									"Failures" : rValue,
									"%" : percentVal,
									"Failure detail code contribution to Failures" : percentVal
								};
								resultData[breakDownName] = code + "";
								tableDataInfo.tableData.push(resultData);
							}else if(metricName == "block"){
								if(code >= 1000 && code <= 1999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									percentVal = smr.formatToFixed(percentChange);
									resultData = {
											"Block" : rValue,
											"%" : percentVal,
											"Failure detail code contribution to Block" : percentVal
										};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "hard"){
								if(code >= 2000 && code <= 2999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									percentVal = smr.formatToFixed(percentChange);
									resultData = {
										"Hard Bounce" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Hard Bounce" : percentVal
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "soft"){
								if(code >= 3000 && code <= 3999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									percentVal = smr.formatToFixed(percentChange);
									resultData = {
										"Soft Bounce" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Soft Bounce" : percentVal
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "technical"){
								if(code >= 4000 && code <= 4999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									percentVal = smr.formatToFixed(percentChange);
									resultData = {
										"Technical" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Technical" : percentVal
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "unknown"){
								if(code >= 9000 && code <= 9999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									percentVal = smr.formatToFixed(percentChange);
									resultData = {
										"Unknown" : rValue,
										"%" : percentVal,
										"Failure detail code contribution to Unknown" : percentVal
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}
						}
					}
					
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-FAILURESPIETABLE";
					brite.display("pieChart",$e.find(".sectionFailuresPie"),tableDataInfo);
				}
			}
		}else{
			var $sectionFailuresTable = $e.find(".sectionFailuresPie")
			if(typeof dataAll == "undefined"){
				$sectionFailuresTable.html("");
				$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
			}else{
				var data = "";
				if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
					data = dataAll.data;
				}else{
					data = dataAll.failureSummaryReportInstanceList;
				}
				
				if(typeof data == "undefined" || data == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var dropDownListVal = [
					   		            {name:"failures",labelName:"Failures"},
					   					{name:"block",labelName:"Block"},
					   					{name:"hard",labelName:"Hard Bounce"},
					   					{name:"soft",labelName:"Soft Bounce"},
					   					{name:"technical",labelName:"Technical"},
					   					{name:"unknown",labelName:"Unknown"}
					   		         ];

					//show pie table
					var columnTitle = smr.buildColumnTitleValue(breakDownType);
					var tableColumns = [];

					var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType,
					    maxSize:20
					};
					if(breakDownType == "mailing"){
						tableDataInfo.maxSize = 12;
					}
					
					//change the column when different breakDownType
					if(breakDownType=="domain"){
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType,true);
					}else if(breakDownType=="vsg"){
						tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
					}else{
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
					}
					
					if(metricName == "failures"){
		                tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontofailures",label:columnTitle+" Contribution to Failures",isPieChart:true,sortable:false});
					}else if(metricName == "block"){
		                tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontoblock",label:columnTitle+" Contribution to Block",isPieChart:true,sortable:false});
					}else if(metricName == "hard"){
		                tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontohard",label:columnTitle+" Contribution to Hard Bounce",isPieChart:true,sortable:false});
					}else if(metricName == "soft"){
		                tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontosoft",label:columnTitle+" Contribution to Soft Bounce",isPieChart:true,sortable:false});
					}else if(metricName == "technical"){
		                tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontotechnical",label:columnTitle+" Contribution to Technical",isPieChart:true,sortable:false});
					}else if(metricName == "unknown"){
		                tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontounknown",label:columnTitle+" Contribution to Unknown",isPieChart:true,sortable:false});
					}
					
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						var resultData = {};
						var percentChange = "";
						var percentVal = "";
						var rValue = "";
						
						//build the tableData
						if(metricName == "failures"){
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								rValue = smr.checkNumber(rowData.failed.count);
								percentChange = smr.formatDivisionNumber(rowData.failed.count,dataAll.summary.failed.count)*100;
							}else{
								rValue = smr.checkNumber(rowData.failed);
								percentChange = smr.formatDivisionNumber(rowData.failed,dataAll.totalFailed)*100;
							}
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Failures";
							resultData["Failures"] = rValue;
							resultData["%"] = percentVal;
							resultData[contributionTo] = percentVal;
						}else if(metricName == "block"){
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								rValue = smr.checkNumber(rowData.block.count);
								percentChange = smr.formatDivisionNumber(rowData.block.count,dataAll.summary.block.count)*100;
							}else{
								rValue = smr.checkNumber(rowData.block);
								percentChange = smr.formatDivisionNumber(rowData.block,dataAll.totalBlock)*100;
							}
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Block";
							resultData["Block"] = rValue;
							resultData["%"] = percentVal;
							resultData[contributionTo] = percentVal;
						}else if(metricName == "hard"){
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								rValue = smr.checkNumber(rowData.hardBounce.count);
								percentChange = smr.formatDivisionNumber(rowData.hardBounce.count,dataAll.summary.hardBounce.count)*100;
							}else{
								rValue = smr.checkNumber(rowData.hbounce);
								percentChange = smr.formatDivisionNumber(rowData.hbounce,dataAll.totalHard)*100;
							}
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Hard Bounce";
							resultData["Hard Bounce"] = rValue;
							resultData["%"] = percentVal;
							resultData[contributionTo] = percentVal;
						}else if(metricName == "soft"){
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								rValue = smr.checkNumber(rowData.softBounce.count);
								percentChange = smr.formatDivisionNumber(rowData.softBounce.count,dataAll.summary.softBounce.count)*100;
							}else{
								rValue = smr.checkNumber(rowData.sbounce);
								percentChange = smr.formatDivisionNumber(rowData.sbounce,dataAll.totalSoft)*100;
							}
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Soft Bounce";
							resultData["Soft Bounce"] = rValue;
							resultData["%"] = percentVal;
							resultData[contributionTo] = percentVal;
						}else if(metricName == "technical"){
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								rValue = smr.checkNumber(rowData.technical.count);
								percentChange = smr.formatDivisionNumber(rowData.technical.count,dataAll.summary.technical.count)*100;
							}else{
								rValue = smr.checkNumber(rowData.technical);
								percentChange = smr.formatDivisionNumber(rowData.technical,dataAll.totalTechnical)*100;
							}
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Technical";
							resultData["Technical"] = rValue;
							resultData["%"] = percentVal;
							resultData[contributionTo] = percentVal;
						}else if(metricName == "unknown"){
							if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
								rValue = smr.checkNumber(rowData.unknown.count);
								percentChange = smr.formatDivisionNumber(rowData.unknown.count,dataAll.summary.unknown.count)*100;
							}else{
								rValue = smr.checkNumber(rowData.unknown);
								percentChange = smr.formatDivisionNumber(rowData.unknown,dataAll.totalUnknown)*100;
							}
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Unknown";
							resultData["Unknown"] = rValue;
							resultData["%"] = percentVal;
							resultData[contributionTo] = percentVal;
						}
						
						//add the column data
						if(breakDownType=="vsg"){
							resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
						}else{
							resultData = addTableColumnDataForFailure(resultData,rowData,breakDownType,reportType);
						}
						tableDataInfo.tableData.push(resultData);
					}
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-FAILURESPIETABLE";
					brite.display("pieChart",$e.find(".sectionFailuresPie"),tableDataInfo);
				}
			}
		}
					
	}
	
	function showBarView(breakDownType,viewRate,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		showSummary.call(view,reportType,breakDownType,viewRate,"bar",dataAll,metricName);
		
		if(breakDownType == "failureDetailCode"){
			if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
				var $sectionFailuresTable = $e.find(".sectionFailuresBar")
				if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || dataAll.data == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll.data[0];
					
					var dropDownListVal = [
						                    {name:"failures",labelName:"Failures"},
						   					{name:"block",labelName:"Block"},
						   					{name:"hard",labelName:"Hard Bounce"},
						   					{name:"soft",labelName:"Soft Bounce"},
						   					{name:"technical",labelName:"Technical"},
						   					{name:"unknown",labelName:"Unknown"}
						   		         ];
					var tableColumns = [];
					var tableDataInfo ={
						tableColumns: tableColumns,
						tableData:[],
						reportType:reportType
					};
					var failureData = [];
					var breakDownName = "Failure Detail Code";

					tableColumns.push({name:"Failure Detail Code",label:"Failure Detail Code",isDate:true,isMockDateVal:false});
						
					if(metricName == "failures"){
				    	tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
				        tableColumns.push({name:"failuredetailcodecontributiontofailures",label:"Failure detail code contribution to Failures",isBarChart:true,isRate:true,sortable:false});
				        failureData = failureData.concat(data["block"].failuresByCode);
				        failureData = failureData.concat(data["hardBounce"].failuresByCode);
				        failureData = failureData.concat(data["softBounce"].failuresByCode);
				        failureData = failureData.concat(data["technical"].failuresByCode);
				        failureData = failureData.concat(data["unknown"].failuresByCode);
					}else if(metricName == "block"){
			            tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontoblock",label:"Failure detail code contribution to Block",isBarChart:true,isRate:true,sortable:false});
			            failureData = data["block"].failuresByCode;
					}else if(metricName == "hard"){
			            tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontohard",label:"Failure detail code contribution to Hard Bounce",isBarChart:true,isRate:true,sortable:false});
			            failureData = data["hardBounce"].failuresByCode;
					}else if(metricName == "soft"){
			            tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontosoft",label:"Failure detail code contribution to Soft Bounce",isBarChart:true,isRate:true,sortable:false});
			            failureData = data["softBounce"].failuresByCode;
					}else if(metricName == "technical"){
			            tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontotechnical",label:"Failure detail code contribution to Technical",isBarChart:true,isRate:true,sortable:false});
			            failureData = data["technical"].failuresByCode;
					}else if(metricName == "unknown"){
			            tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontounknown",label:"Failure detail code contribution to Unknown",isBarChart:true,isRate:true,sortable:false});
			            failureData = data["unknown"].failuresByCode;
					}
						
					var sumDataCount = getSumDataCount(failureData);
					
					if(failureData){
						for(var i = 0; i < failureData.length; i++){
							var rowData = failureData[i];
							if(rowData != null){
								var resultData = {};
								var rValue = smr.checkNumber(rowData.count);
								var percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;						
									
								if(metricName == "failures"){
									resultData = {
										"Failures" : rValue,
										"Failure detail code contribution to Failures" : percentChange
									};
								}else if(metricName == "block"){
									resultData = {
										"Block" : rValue,
										"Failure detail code contribution to Block" : percentChange
									};
								}else if(metricName == "hard"){
									resultData = {
										"Hard Bounce" : rValue,
										"Failure detail code contribution to Hard Bounce" : percentChange
									};
								}else if(metricName == "soft"){
									resultData = {
										"Soft Bounce" : rValue,
										"Failure detail code contribution to Soft Bounce" : percentChange
									};
								}else if(metricName == "technical"){
									resultData = {
										"Technical" : rValue,
										"Failure detail code contribution to Technical" : percentChange
									};
								}else if(metricName == "unknown"){
									resultData = {
										"Unknown" : rValue,
										"Failure detail code contribution to Unknown" : percentChange
									};
								}
				
								resultData[breakDownName] = rowData.code+"";
				
								tableDataInfo.tableData.push(resultData);
							}
						}
						//check whether need to do sortMetrics
						tableDataInfo.skipSortMetrics = true;
						tableDataInfo.smaclass="SMA-REPORT-FAILURESBARTABLE";
						brite.display("barChart",$e.find(".sectionFailuresBar"),{tableDataInfo:tableDataInfo});
					}else{
						$sectionFailuresTable.html("");
						$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
					}
				}
			}else{
				var $sectionFailuresTable = $e.find(".sectionFailuresBar")
				if(typeof dataAll == "undefined" || typeof dataAll.failureSummaryDetailCodeReportList == "undefined" || dataAll.failureSummaryDetailCodeReportList == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll.failureSummaryDetailCodeReportList;
					
					var dropDownListVal = [
						                    {name:"failures",labelName:"Failures"},
						   					{name:"block",labelName:"Block"},
						   					{name:"hard",labelName:"Hard Bounce"},
						   					{name:"soft",labelName:"Soft Bounce"},
						   					{name:"technical",labelName:"Technical"},
						   					{name:"unknown",labelName:"Unknown"}
						   		         ];
		
					//show pie table
					var tableColumns = [];
		
					var tableDataInfo ={
						tableColumns: tableColumns,
						tableData:[],
						reportType:reportType
					};
					var failureData = [];
					var breakDownName = "Failure Detail Code";

					tableColumns.push({name:"Failure Detail Code",label:"Failure Detail Code",isDate:true,isMockDateVal:false});
					
					if(metricName == "failures"){
				    	tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
				        tableColumns.push({name:"failuredetailcodecontributiontofailures",label:"Failure detail code contribution to Failures",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "block"){
			            tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontoblock",label:"Failure detail code contribution to Block",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "hard"){
			            tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontohard",label:"Failure detail code contribution to Hard Bounce",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "soft"){
			            tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontosoft",label:"Failure detail code contribution to Soft Bounce",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "technical"){
			            tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontotechnical",label:"Failure detail code contribution to Technical",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "unknown"){
			            tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"failuredetailcodecontributiontounknown",label:"Failure detail code contribution to Unknown",isBarChart:true,isRate:true,sortable:false});
					}
					
					//compute the summary count
					var sumDataCount = 0;
					var eValue = 0;
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var code = rowData.detailCode;
							if(metricName == "failures"){
								eValue = smr.checkNumber(rowData.count);
								sumDataCount = sumDataCount + eValue;
							}else if(metricName == "block"){
								if(code >= 1000 && code <= 1999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "hard"){
								if(code >= 2000 && code <= 2999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "soft"){
								if(code >= 3000 && code <= 3999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "technical"){
								if(code >= 4000 && code <= 4999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}else if(metricName == "unknown"){
								if(code >= 9000 && code <= 9999){
									eValue = smr.checkNumber(rowData.count);
									sumDataCount = sumDataCount + eValue;
								}
							}
						}
					}
								
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var code = rowData.detailCode;
							var resultData = {};
							var rValue = "";
							var percentChange = "";	
								
							if(metricName == "failures"){
								rValue = smr.checkNumber(rowData.count);
								percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;	
								resultData = {
									"Failures" : rValue,
									"Failure detail code contribution to Failures" : percentChange
								};
								resultData[breakDownName] = code + "";
								tableDataInfo.tableData.push(resultData);
							}else if(metricName == "block"){
								if(code >= 1000 && code <= 1999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;	
									resultData = {
											"Block" : rValue,
											"Failure detail code contribution to Block" : percentChange
										};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "hard"){
								if(code >= 2000 && code <= 2999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									resultData = {
										"Hard Bounce" : rValue,
										"Failure detail code contribution to Hard Bounce" : percentChange
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "soft"){
								if(code >= 3000 && code <= 3999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									resultData = {
										"Soft Bounce" : rValue,
										"Failure detail code contribution to Soft Bounce" : percentChange
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "technical"){
								if(code >= 4000 && code <= 4999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									resultData = {
										"Technical" : rValue,
										"Failure detail code contribution to Technical" : percentChange
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}else if(metricName == "unknown"){
								if(code >= 9000 && code <= 9999){
									rValue = smr.checkNumber(rowData.count);
									percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
									resultData = {
										"Unknown" : rValue,
										"Failure detail code contribution to Unknown" : percentChange
									};
									resultData[breakDownName] = code + "";
									tableDataInfo.tableData.push(resultData);
								}
							}
						}
					}
					
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;	
					tableDataInfo.smaclass="SMA-REPORT-FAILURESBARTABLE";
					brite.display("barChart",$e.find(".sectionFailuresBar"),{tableDataInfo:tableDataInfo});
				}
			}
		}else{
			var $sectionFailures = $e.find(".sectionFailuresBar");
			if(typeof dataAll == "undefined"){
				$sectionFailures.html("");
				$sectionFailures.append("<div class='noData'>No Data!</div>");
			}else{
				var data = ";"
				if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
					data = dataAll.data;
				}else{
					data = dataAll.failureSummaryReportInstanceList;
				}
				
				if(typeof data == "undefined" || data == null){
					$sectionFailures.html("");
					$sectionFailures.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailures.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var property = "count";
					if(viewRate){
						property = "rate";
					}
					var dropDownListVal = [
				   		            {name:"failures",labelName:"Failures"},
				   					{name:"block",labelName:"Block"},
				   					{name:"hard",labelName:"Hard Bounce"},
				   					{name:"soft",labelName:"Soft Bounce"},
				   					{name:"technical",labelName:"Technical"},
				   					{name:"unknown",labelName:"Unknown"}
				   		         ];
					
					//show pie table
					var columnTitle = smr.buildColumnTitleValue(breakDownType);
					var tableColumns = [];
					
					var tableDataInfo ={
							tableColumns: tableColumns,
						    tableData:[],
						    reportType:reportType
						};
						
					//change the column when different breakDownType
					if(breakDownType=="domain"){
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType,true);
					}else if(breakDownType=="vsg"){
						tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
					}else{
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
					}
						
					if(metricName == "failures"){
		                tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontofailures",label:columnTitle+" Contribution to Failures",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "block"){
			            tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"datecontributiontoblock",label:columnTitle+" Contribution to Block",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "hard"){
				        tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
				        tableColumns.push({name:"datecontributiontohard",label:columnTitle+" Contribution to Hard Bounce",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "soft"){
		                tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontosoft",label:columnTitle+" Contribution to Soft Bounce",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "technical"){
		                tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontotechnical",label:columnTitle+" Contribution to Technical",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "unknown"){
		                tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontounknown",label:columnTitle+" Contribution to Unknown",isBarChart:true,isRate:true,sortable:false});
					}
					
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var resultData = {};
							var percentChange = "";
							var rValue = "";
							
							//build the tableData
							if(metricName == "failures"){
								if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
									rValue = smr.checkNumber(rowData.failed.count);
									percentChange = smr.formatDivisionNumber(rowData.failed.count,dataAll.summary.failed.count)*100;
								}else{
									rValue = smr.checkNumber(rowData.failed);
									percentChange = smr.formatDivisionNumber(rowData.failed,dataAll.totalFailed)*100;
								}
								var contributionTo = columnTitle + " Contribution to Failures";
								resultData["Failures"] = rValue;
								resultData[contributionTo] = percentChange;
							}else if(metricName == "block"){
								if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
									rValue = smr.checkNumber(rowData.block.count);
									percentChange = smr.formatDivisionNumber(rowData.block.count,dataAll.summary.block.count)*100;
								}else{
									rValue = smr.checkNumber(rowData.block);
									percentChange = smr.formatDivisionNumber(rowData.block,dataAll.totalBlock)*100;
								}
								var contributionTo = columnTitle + " Contribution to Block";
								resultData["Block"] = rValue;
								resultData[contributionTo] = percentChange;
							}else if(metricName == "hard"){
								if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
									rValue = smr.checkNumber(rowData.hardBounce.count);
									percentChange = smr.formatDivisionNumber(rowData.hardBounce.count,dataAll.summary.hardBounce.count)*100;
								}else{
									rValue = smr.checkNumber(rowData.hbounce);
									percentChange = smr.formatDivisionNumber(rowData.hbounce,dataAll.totalHard)*100;
								}
								var contributionTo = columnTitle + " Contribution to Hard Bounce";
								resultData["Hard Bounce"] = rValue;
								resultData[contributionTo] = percentChange;
							}else if(metricName == "soft"){
								if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
									rValue = smr.checkNumber(rowData.softBounce.count);
									percentChange = smr.formatDivisionNumber(rowData.softBounce.count,dataAll.summary.softBounce.count)*100;
								}else{
									rValue = smr.checkNumber(rowData.sbounce);
									percentChange = smr.formatDivisionNumber(rowData.sbounce,dataAll.totalSoft)*100;
								}
								var contributionTo = columnTitle + " Contribution to Soft Bounce";
								resultData["Soft Bounce"] = rValue;
								resultData[contributionTo] = percentChange;
							}else if(metricName == "technical"){
								if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
									rValue = smr.checkNumber(rowData.technical.count);
									percentChange = smr.formatDivisionNumber(rowData.technical.count,dataAll.summary.technical.count)*100;
								}else{
									rValue = smr.checkNumber(rowData.technical);
									percentChange = smr.formatDivisionNumber(rowData.technical,dataAll.totalTechnical)*100;
								}
								var contributionTo = columnTitle + " Contribution to Technical";
								resultData["Technical"] = rValue;
								resultData[contributionTo] = percentChange;
							}else if(metricName == "unknown"){
								if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
									rValue = smr.checkNumber(rowData.unknown.count);
									percentChange = smr.formatDivisionNumber(rowData.unknown.count,dataAll.summary.unknown.count)*100;
								}else{
									rValue = smr.checkNumber(rowData.unknown);
									percentChange = smr.formatDivisionNumber(rowData.unknown,dataAll.totalUnknown)*100;
								}
								var contributionTo = columnTitle + " Contribution to Unknown";
								resultData["Unknown"] = rValue;
								resultData[contributionTo] = percentChange;
							}
							
							//add the column data
							if(breakDownType=="vsg"){
								resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
							}else{
								resultData = addTableColumnDataForFailure(resultData,rowData,breakDownType,reportType);
							}
							tableDataInfo.tableData.push(resultData);
						}
					}
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-FAILURESBARTABLE";
					brite.display("barChart",$e.find(".sectionFailuresBar"),{tableDataInfo:tableDataInfo});
				}
			}
		}
	}
	
	function showPivotView(metricName,viewRate,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionFailuresPivot = $e.find(".sectionFailuresPivot");
		
		if(typeof dataAll == "undefined" || dataAll==null){
			dataAll = {};
		}
//		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
//			$sectionFailuresPivot.html("");
//			$sectionFailuresPivot.append("<div class='noData'>No Data!</div>");
//		}else{
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			view.pivotDataSummary = dataSummary;
			
			var metricList = [];			
			metricList.push({name:"failures",labelName:"Failures"});
			metricList.push({name:"failureRate",labelName:"Failure Rate"});
			metricList.push({name:"block",labelName:"Block"});
			metricList.push({name:"hard",labelName:"Hard Bounce"});
			metricList.push({name:"soft",labelName:"Soft Bounce"});
			metricList.push({name:"technical",labelName:"Technical"});
			metricList.push({name:"unknown",labelName:"Unknown"});
			$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
			
			brite.display("pivotTable",$sectionFailuresPivot,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
				metricList:metricList,viewRate:viewRate,metricName:metricName,section:"failures",parentView:view});
			
			showSummary.call(view,reportType,"",viewRate,"pivot",dataSummary,metricName)
//		}
	}
	
	function showSummary(reportType,breakDownType,viewRate,viewType,data,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		var $byTitle = $e.find(".byTitle");
		if(viewType == "table" || viewType=="pivot"){
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(breakDownType);
			$byTitle.html("Failures by "+title);
		}
		
		var $statsSummary = $e.find(".statsSummary");
		var summaryData = "";
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
			summaryData = data.summary;
		}else{
			summaryData = data;
		}
		if(typeof viewRate != 'undefined'){
			_viewRate = viewRate;
		}
		
		if(typeof summaryData == "undefined" || summaryData == null){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var isClickable = false;
			if(viewType == "pie" || viewType == "bar"){
				isClickable = true;
			}
			if(viewType == "pivot"){
				//isClickable = typeof pivotClickable!="undefined" ? pivotClickable :smr.fetchSingleMetric;
				isClickable = false;
			}
			var stats = [];
			if(viewRate){
				if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
					stats = [
								{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.failed.count),isClickable:isClickable},
								{name:"failures",label:"Failure Rate",value:smr.checkNumber(summaryData.failed.rate),isRate:true},
								{name:"block",label:"Block",value:smr.checkNumber(summaryData.block.rate),isClickable:isClickable,isRate:true},
								{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.hardBounce.rate),isClickable:isClickable,isRate:true},
								{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.softBounce.rate),isClickable:isClickable,isRate:true},
								{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.technical.rate),isClickable:isClickable,isRate:true},
								{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.unknown.rate),isClickable:isClickable,isRate:true}
						  	];
				}else if(viewType == "pivot"){
					stats = [
								{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.failures),isClickable:isClickable},
								{name:"failureRate",label:"Failure Rate",value:smr.checkNumber(summaryData.failureRate),isRate:true,isClickable:isClickable},
								{name:"block",label:"Block",value:smr.checkNumber(summaryData.blockRate),isClickable:isClickable,isRate:true},
								{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.hardRate),isClickable:isClickable,isRate:true},
								{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.softRate),isClickable:isClickable,isRate:true},
								{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.technicalRate),isClickable:isClickable,isRate:true},
								{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.unknownRate),isClickable:isClickable,isRate:true}
						  	];
				}else {
						stats = [
								{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.totalFailed),isClickable:isClickable},
								{name:"failures",label:"Failure Rate",value:smr.checkNumber(summaryData.totalFailureRate),isRate:true},
								{name:"block",label:"Block",value:smr.checkNumber(summaryData.totalBlockRate),isClickable:isClickable,isRate:true},
								{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.totalHardRate),isClickable:isClickable,isRate:true},
								{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.totalSoftRate),isClickable:isClickable,isRate:true},
								{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.totalTechnicalRate),isClickable:isClickable,isRate:true},
								{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.totalUnknownRate),isClickable:isClickable,isRate:true}
						  	];
				}
			}else{
				if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
					stats = [
								{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.failed.count),isClickable:isClickable},
								{name:"failures",label:"Failure Rate",value:smr.checkNumber(summaryData.failed.rate),isRate:true},
								{name:"block",label:"Block",value:smr.checkNumber(summaryData.block.count),isClickable:isClickable},
								{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.hardBounce.count),isClickable:isClickable},
								{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.softBounce.count),isClickable:isClickable},
								{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.technical.count),isClickable:isClickable},
								{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.unknown.count),isClickable:isClickable}
						  	];
				}else if(viewType == "pivot"){
					stats = [
								{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.failures),isClickable:isClickable},
								{name:"failureRate",label:"Failure Rate",value:smr.checkNumber(summaryData.failureRate),isRate:true,isClickable:isClickable},
								{name:"block",label:"Block",value:smr.checkNumber(summaryData.block),isClickable:isClickable},
								{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.hard),isClickable:isClickable},
								{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.soft),isClickable:isClickable},
								{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.technical),isClickable:isClickable},
								{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.unknown),isClickable:isClickable}
						  	];
				}else {
					stats = [
								{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.totalFailed),isClickable:isClickable},
								{name:"failures",label:"Failure Rate",value:smr.checkNumber(summaryData.totalFailureRate),isRate:true},
								{name:"block",label:"Block",value:smr.checkNumber(summaryData.totalBlock),isClickable:isClickable},
								{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.totalHard),isClickable:isClickable},
								{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.totalSoft),isClickable:isClickable},
								{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.totalTechnical),isClickable:isClickable},
								{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.totalUnknown),isClickable:isClickable}
						  	];
				}
			}
			
			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType,skipSortMetrics:true}).done(function(){
				if(viewType == "table" || viewType == "pivot"){
					$statsSummary.removeClass("pieOrBarView");
				}else{
					$statsSummary.removeClass("pieOrBarView");
					$statsSummary.addClass("pieOrBarView");
				}
			});
		}
	}
	
	function addTableColumnDataForFailure(resultDataRow,rowData,breakDownType,reportType){
		var includeSubOrg = smr.getSetAndType(reportType).set.attr("includeSubOrg");
		if(breakDownType == "mailing"){
			if(reportType == smr.REPORT_TYPE.PROGRAM){
				resultDataRow.Mailing = {value:(rowData.mailingName ? rowData.mailingName : "no name")};
			}else{
				resultDataRow.Mailing = {value:(rowData.mailingName ? rowData.mailingName : "no name"),mailingId:rowData.mailingId};
			}
			resultDataRow.Subject =  rowData.mailingSubject ? rowData.mailingSubject : "no subject";
			if(includeSubOrg) resultDataRow.organization = rowData.organization ? rowData.organization : "no organization";
		}else if(breakDownType == "target"){
			resultDataRow.Target = rowData.target ? rowData.target : "no name";
			if(includeSubOrg) resultDataRow.organization = rowData.organization ? rowData.organization : "no organization";
		}else if(breakDownType == "campaign"){
			resultDataRow.Campaign = rowData.campaignName ? rowData.campaignName : "no name";
		}else if(breakDownType == "domain"){
			resultDataRow.Domain = rowData.domain ? rowData.domain : "no name";
		}else if(breakDownType == "program"){
			resultDataRow.Program = rowData.programName ? rowData.programName : "no name";
			if(includeSubOrg) resultDataRow.organization = rowData.organization ? rowData.organization : "no organization";
		}else if(breakDownType == "ip"){
			resultDataRow.IP = rowData.vsgIp ? rowData.vsgIp : "no name";
		}else if(breakDownType == "vsg"){
			resultDataRow.Vsg = rowData.vsg ? rowData.vsg : "no name";
		}else if(breakDownType == "org"){
			resultDataRow.Organization = rowData.organization ? rowData.organization : "no name";
		}else if(breakDownType == "orgRollup"){
			resultDataRow["Organization (Rollup)"] = rowData.organization ? rowData.organization : "no name";
		}else{
			resultDataRow.Date = rowData.date ? rowData.date : "no date";
		}
		return resultDataRow;
	}
	
	function getSumDataCount(data){
		var dataSumCount = 0;
		if(data != null){
			for(var i = 0;i <data.length; i++){
				if(data[i] != null){
					dataSumCount += smr.checkNumber(data[i].count);
				}
			}
		}
		return dataSumCount;
	}
	
	// --------- /Component Private Methods --------- //

    // --------- Component Registration --------- //
    brite.registerView("sectionFailures", {
            emptyParent : true
        },
        function () {
            return new smr.SectionFailures();
        });
    // --------- Component Registration --------- //
})(jQuery);
