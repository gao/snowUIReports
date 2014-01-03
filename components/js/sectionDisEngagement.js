var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _breakDownType;
	// --------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function SectionDisEngagement(){};
	smr.SectionDisEngagement = SectionDisEngagement; 
	
	SectionDisEngagement.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionDisEngagement",{});
	}
		
	SectionDisEngagement.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
		
		var viewName = data.view || "table";
		var reportType = view.reportType = data.reportType || view.reportType;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		view.viewName = viewName;
		view.isNewRequest = data.isNewRequest || false;
		view.metricName = data.metricName || "unsub";
		view.fetchVal = smr.fetchSingleMetricOrigin;
		
		// in lifecycle the unsub is unsubs
		if(reportType != smr.REPORT_TYPE.BATCH){
			view.metricName = "unsubs"
		}else{
			view.metricName = "unsub";
		}
		
		if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			view.metricName = "complaints";
		}

		var _breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_breakDownType = _breakDownType || "mailing";
		
		if(view.isNewRequest){
			smr.clearPivotViewCache(view.reportType,"disengagement");
		}
		
		view.showView(viewName,_breakDownType);
	}
	
	SectionDisEngagement.prototype.parentEvents = {
		report:{	
			//event for view change
			"REPORTHEADER_VIEW_CHANGE" : reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE" : reportHeaderBreakDownChangeMethod,
			
			//event for summary data item change
			"STATSSUMMARY_DATAITEM_CHANGE" : statsSummaryDataItemChange,
			
			//event for pivot view trigger
			"STATSSUMMARY_STATUS_CHANGE": statsSummaryStatusChangeMetod,
			
			//event for Fetch All Metrics checkbox change
			"FETCH_ALLMETRICS_CHANGE": fetchAllMetricsChangeMethod
		}
	}
	
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(e,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;
		view.viewName = viewName;
		if(view.metricName=="unsubRate")view.metricName="unsubs";
		if(view.metricName=="complaintRate")view.metricName="complaints";
		if(view.reportType == smr.REPORT_TYPE.BATCH && view.metricName == "unsubs"){
			view.metricName ="unsub";
		}
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(view.showView(viewName,_breakDownType)){
			extra.complete = true;
		}else{
			alert("Not support yet");
		}
	}
	
	function reportHeaderBreakDownChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
				
		var isHave = smr.checkIsHaveBreakdownValue(view.reportType,val);
		if(!isHave){
			_breakDownType = val;
			view.showView(view.viewName,_breakDownType);
		}else{
			smr.goBackPreBreakdownValue($this,_breakDownType);
		}
	}
	
	function statsSummaryDataItemChange(event,extra){
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
			view.showView(view.viewName,_breakDownType,metric);
		}
	}
	
	function statsSummaryStatusChangeMetod(event,extra){
		var view = this;
		var pivotClickable = extra.clickable;
		if(extra.metric){
			view.metricName = extra.metric;
			view.pivotDataSummary = extra.summary
			showSummary.call(view,"","pivot",view.pivotDataSummary,view.metricName,pivotClickable);
		}else{
			showSummary.call(view,"","pivot",view.pivotDataSummary,view.metricName,pivotClickable);
		}
	}
	
	function fetchAllMetricsChangeMethod(event,extra){
		var view = this;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		view.showView(view.viewName,_breakDownType,view.metricName);
	}
	// --------- /events --------- //
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionDisEngagement.prototype.getAllData = function(breakDownType){
		var view = this;
		var $e = view.$el;
		var dfd = $.Deferred();
		var $reportDataLoading = $e.closest(".report").find(".report-data-loading");
		if(view.viewName=="pivot"){
			$reportDataLoading = $e.closest(".report").find(".report-data-progressBar");
		}
		$reportDataLoading.show();
		
		if(view.viewName=="pivot"){
			var metricAliasName = view.metricName;
			if(view.metricName=="unsub" || view.metricName=="unsubs") metricAliasName="unSubs";	
			if(view.metricName=="unsubRate") metricAliasName="unSubRate";	
			smr.getBigDataSummary(view.reportType,"getDisEngagement",metricAliasName,null,null,view.isNewRequest, view.fetchVal).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0];
				}
				if(view.fetchVal){
					var includeSummaryTemp = smr.includeSummaryTemp[view.reportType]["getDisEngagement"];
					if(!includeSummaryTemp.include){
						dataSet.summary = includeSummaryTemp.summary;
					}else{
						includeSummaryTemp.summary = dataSet.summary;
					}
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}else{
			smr.getSummary(view.reportType,"common",breakDownType,view.isNewRequest).done(function(data){
				var dataSet = {};
				if(data.items!=null){
					dataSet = data.items[0];
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}
		return dfd.promise();
	}
	
	SectionDisEngagement.prototype.showView = function(viewName,breakDownType,metric){
		var view = this;
		var $e = view.$element;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(typeof breakDownType != 'undefined'){
			_breakDownType = breakDownType
		}else{
			_breakDownType = "mailing";
		}
		
		if(typeof metric != 'undefined'){
			view.metricName = metric
		}
		var metricName = view.metricName;
		
		//clean first
		$e.find(".statSummary").empty();
		$e.find(".sectionDisEngagement-view").empty();
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionDisEngagement-tableChart",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionDisEngagement-pieChart",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionDisEngagement-barChart",{});
		}else if(viewName == 'pivot'){
			html = smr.render("tmpl-sectionDisEngagement-pivotChart",{});
		}else{
			return false;
		}
		
		$e.find(".sectionDisEngagement-view").append($(html));
		
		view.getAllData(_breakDownType).done(function(dataAll){
			if(viewName == 'table'){
				showTableView.call(view,_breakDownType,dataAll);
			}else if(viewName == 'pie'){
				showPieView.call(view,_breakDownType,metricName,dataAll);
			}else if(viewName == 'bar'){
				showBarView.call(view,_breakDownType,metricName,dataAll);
			}else if(viewName == 'pivot'){
				showPivotView.call(view,metricName,dataAll);
			}
		});
		
		return true;
	}
	
	SectionDisEngagement.prototype.destroy = function(){
		var view = this;
		smr.clearPivotViewCache(view.reportType,"disengagement");
	};
	// --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	
	function showTableView(breakDownType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionDisEngagement = $e.find(".sectionDisEngagementTable")
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$sectionDisEngagement.html("");
			$sectionDisEngagement.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionDisEngagement.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			
			showSummary.call(view,breakDownType,"table",dataSummary);
			
			if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				var tableDataInfo ={
						tableColumns: [
			               {name:"complaints",label:"Complaints"},
			               {name:"complaints",label:"Complaint Rate",isRate:true}
		                ],
						tableData:[],
						reportType:reportType,
						maxSize:100
					};
			}else{
				var tableDataInfo ={
						tableColumns: [
			               {name:"unsub",label:"Unsubs"},
			               {name:"complaints",label:"Complaints"},
			               {name:"unsub",label:"Unsub Rate",isRate:true},
			               {name:"complaints",label:"Complaint Rate",isRate:true}
		                ],
						tableData:[],
						reportType:reportType,
						maxSize:40
					};
			}
			
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			var countStr = "unique";
			var rateStr = "uniqueRate";
			if(breakDownType=="target" || breakDownType=="domain"){
				countStr = "count";
				rateStr = "rate";
			}
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {};
					if(reportType == smr.REPORT_TYPE.BATCH){
						resultData = {
							"Unsubs": smr.checkNumber(rowData.unsub[countStr]),
					  		"Complaints": smr.checkNumber(rowData.complaints[countStr]), 
			  				"Unsub Rate": smr.checkNumber(rowData.unsub[rateStr]),
			  				"Complaint Rate": smr.checkNumber(rowData.complaints[rateStr])
						};
					}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
						if(breakDownType=="target" || breakDownType=="domain"){
							resultData = {
									"Complaints": smr.checkNumber(rowData.complaints.count),
									"Complaint Rate": smr.checkNumber(rowData.complaints.rate)
							};
						}else{
							resultData = {
									"Complaints": smr.checkNumber(rowData.uniqueComplaints.count),
									"Complaint Rate": smr.checkNumber(rowData.uniqueComplaints.rate)
							};
						}
					}else{
						if(breakDownType=="target" || breakDownType=="domain"){
							resultData = {
								"Unsubs": smr.checkNumber(rowData.unsubs.count),
								"Complaints": smr.checkNumber(rowData.complaints.count),
				  				"Unsub Rate": smr.checkNumber(rowData.unsubs.rate),
				  				"Complaint Rate": smr.checkNumber(rowData.complaints.rate)
							};
						}else{
							resultData = {
								"Unsubs": smr.checkNumber(rowData.uniqueUnsubs.count),
								"Complaints": smr.checkNumber(rowData.uniqueComplaints.count),
				  				"Unsub Rate": smr.checkNumber(rowData.uniqueUnsubs.rate),
				  				"Complaint Rate": smr.checkNumber(rowData.uniqueComplaints.rate)
							};
						}
					}
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.title="Dis-Engagement by "+title;
			tableDataInfo.smaclass="SMA-REPORT-DISENGAGEMENTDATATABLE";
			brite.display("dataTable",$e.find(".sectionDisEngagementTable"),tableDataInfo);	
		}
	}
	
	function showPieView(breakDownType,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionDisEngagement = $e.find(".sectionDisEngagementPie")
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$sectionDisEngagement.html("");
			$sectionDisEngagement.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionDisEngagement.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			
			showSummary.call(view,breakDownType,"pie",dataSummary,metricName);
			
			if(reportType == smr.REPORT_TYPE.BATCH){
				var dropDownListVal = [
							{name:"unsub",labelName:"Unsub"},
							{name:"complaints",labelName:"Complaints"}
				         ];
			}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				var dropDownListVal = [
							{name:"complaints",labelName:"Complaints"}
						];
			}else{
				var dropDownListVal = [
							{name:"unsubs",labelName:"Unsubs"},
							{name:"complaints",labelName:"Complaints"}
						];
			}

			//create the table th value
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			if(metricName == "unsub"){
				tableColumns =  [
			               {name:"unsub",label:"Unsub",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"rate",label:"%",isRate:true,defaultSort:true},
			               {name:"datecontributiontounsub",label:columnTitle+" Contribution to Unsub",isPieChart:true,sortable:false}
		               ];
			}else if(metricName == "unsubs"){
				tableColumns =  [
			               {name:"unsubs",label:"Unsubs",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"rate",label:"%",isRate:true,defaultSort:true},
			               {name:"datecontributiontounsubs",label:columnTitle+" Contribution to Unsubs",isPieChart:true,sortable:false}
		               ];
			}else{
				tableColumns =  [
			               {name:"complaints",label:"Complaints",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"rate",label:"%",isRate:true,defaultSort:true},
			               {name:"datecontributiontounsubs",label:columnTitle+" Contribution to Complaints",isPieChart:true,sortable:false}
		               ];
			}
			
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
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			var countStr = "unique";
			var propername = "unique" + metricName.substring(0,1).toUpperCase()+ metricName.substring(1);
			if(breakDownType=="target" || breakDownType=="domain"){
				countStr = "count";
				propername = metricName;
			}
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				//build the tableData
				var resultData = {};
				var percentChange = "";
				var percentVal = "";
				var dataVal = "";
				if(reportType == smr.REPORT_TYPE.BATCH){
					dataVal = smr.checkNumber(rowData[metricName][countStr]);
					percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName][countStr])*100;
					
					percentVal = smr.formatToFixed(percentChange);
					if(metricName == "unsub"){
						var contributionTo = columnTitle + " Contribution to Unsub";
						resultData["Unsub"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else{
						var contributionTo = columnTitle + " Contribution to Complaints";
						resultData["Complaints"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}
				}else{
					dataVal = smr.checkNumber(rowData[propername].count);
					percentChange = smr.formatDivisionNumber(dataVal,dataSummary[propername].count)*100;
					
					percentVal = smr.formatToFixed(percentChange);
					if(metricName == "unsubs"){
						var contributionTo = columnTitle + " Contribution to Unsubs";
						resultData["Unsubs"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else{
						var contributionTo = columnTitle + " Contribution to Complaints";
						resultData["Complaints"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}
					
				}
				
				//add the column data
				resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
				
				tableDataInfo.tableData.push(resultData);
			}
			tableDataInfo.smaclass="SMA-REPORT-DISENGAGEMENTPIETABLE";
			brite.display("pieChart",$e.find(".sectionDisEngagementPie"),tableDataInfo);	
		}
		
	}
	
	function showBarView(breakDownType,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionDisEngagement = $e.find(".sectionDisEngagementBar")
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$sectionDisEngagement.html("");
			$sectionDisEngagement.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionDisEngagement.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			
			showSummary.call(view,breakDownType,"bar",dataSummary,metricName);
			
			if(reportType == smr.REPORT_TYPE.BATCH){
				var dropDownListVal = [
							{name:"unsub",labelName:"Unsub"},
							{name:"complaints",labelName:"Complaints"}
				         ];
			}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				var dropDownListVal = [
							{name:"complaints",labelName:"Complaints"}
						];
			}else{
				var dropDownListVal = [
							{name:"unsubs",labelName:"Unsubs"},
							{name:"complaints",labelName:"Complaints"}
						];
			}
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);	
			var tableColumns = [];
			if(metricName == "unsub"){
				tableColumns =  [
			               {name:"unsub",label:"Unsub",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"Unsub",label:columnTitle+" Contribution to Unsub",isBarChart:true,sortable:false,isRate:true}
		               ];
			}else if(metricName == "unsubs"){
				tableColumns =  [
			               {name:"unsubs",label:"Unsubs",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"Unsubs",label:columnTitle+" Contribution to Unsubs",isBarChart:true,sortable:false,isRate:true}
		               ];
			}else{
				tableColumns =  [
			               {name:"complaints",label:"Complaints",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"Complaints",label:columnTitle+" Contribution to Complaints",isBarChart:true,sortable:false,isRate:true}
		               ];
			}
			
			var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
			};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			var countStr = "unique";
			var propername = "unique" + metricName.substring(0,1).toUpperCase()+ metricName.substring(1);
			if(breakDownType=="target" || breakDownType=="domain"){
				countStr = "count";
				propername = metricName;
			}
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var percentChange = "";
					var dataVal = "";
					var resultData = {};
					
					if(reportType == smr.REPORT_TYPE.BATCH){
						dataVal = smr.checkNumber(rowData[metricName][countStr]);
						percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName][countStr])*100;
						
						if(metricName == "unsub"){
							var contributionTo = columnTitle + " Contribution to Unsub";
							resultData["Unsub"] = dataVal;
							resultData[contributionTo] = percentChange;
						}else{
							var contributionTo = columnTitle + " Contribution to Complaints";
							resultData["Complaints"] = dataVal;
							resultData[contributionTo] = percentChange;
						}
						
					}else{
						dataVal = smr.checkNumber(rowData[propername].count);
						percentChange = smr.formatDivisionNumber(dataVal,dataSummary[propername].count)*100;
						
						if(metricName == "unsubs"){
							var contributionTo = columnTitle + " Contribution to Unsubs";
							resultData["Unsubs"] = dataVal;
							resultData[contributionTo] = percentChange;
						}else{
							var contributionTo = columnTitle + " Contribution to Complaints";
							resultData["Complaints"] = dataVal;
							resultData[contributionTo] = percentChange;
						}
					}
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-DISENGAGEMENTBARTABLE";
			brite.display("barChart",$e.find(".sectionDisEngagementBar"),{tableDataInfo:tableDataInfo});	
		}
		
	}
	
	function showPivotView(metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionEngagementPivot = $e.find(".sectionEngagementPivot");
		
		if(typeof dataAll == "undefined" || dataAll==null){
			dataAll = {};
		}
		
//		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
//			$sectionEngagementPivot.html("");
//			$sectionEngagementPivot.append("<div class='noData'>No Data!</div>");
//		}else{
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			view.pivotDataSummary = dataSummary;
			var metricList = [];
			if(reportType == smr.REPORT_TYPE.BATCH){
				metricList.push({name:"unsub",labelName:"Unsub"});
				metricList.push({name:"unsubRate",labelName:"Unsub Rate"});
			}else if(reportType == smr.REPORT_TYPE.PROGRAM){
				metricList.push({name:"unsubs",labelName:"Unsubs"});
				metricList.push({name:"unsubRate",labelName:"Unsub Rate"});
			}
			metricList.push({name:"complaints",labelName:"Complaints"});
			metricList.push({name:"complaintRate",labelName:"Complaint Rate"});
			$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
			
			brite.display("pivotTable",$sectionEngagementPivot,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
				metricList:metricList,uniqueStats:true,metricName:metricName,section:"disengagement",parentView:view});
			
			showSummary.call(view,"","pivot",dataSummary,metricName);
//		}
	}
	
	function showSummary(breakDownType,viewType,summaryData,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var isSkipdoSortMetrics = false;
		if(viewType == "pie" || viewType == "bar"){
			var $byTitle = $e.find(".byTitle");
			$byTitle.removeClass("byTitle-table");
			$byTitle.html("Dis-Engagement by " + smr.buildTitleValue(breakDownType));
		}else{
			var $byTitle = $e.find(".byTitle");
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics"); 
		}
		
		var $statsSummary = $e.find(".statsSummary");
		if(typeof summaryData == "undefined" || summaryData==null){
			$statsSummary.html("<div class='noData'>No Data!</div>");
			return;
		}
		
		var stats = [];
		var isClickable = false;
		if(viewType == "pie" || viewType == "bar"){
			isClickable = true;
		}
		if(viewType == "pivot"){
			//isClickable = typeof pivotClickable!="undefined" ? pivotClickable :smr.fetchSingleMetric;
			isClickable = false;
		}
		if(viewType == "pivot"){
			isSkipdoSortMetrics = true;
			if(reportType == smr.REPORT_TYPE.BATCH){
				stats.push({name:"unsub",label:"Unsub",value: smr.checkNumber(summaryData.uniqueUnsubs),isClickable:isClickable});
			    stats.push({name:"unsubRate",label:"Unsub Rate",isRate:true,value: smr.checkNumber(summaryData.uniqueUnsubRate),isClickable:isClickable});
			}else if(reportType == smr.REPORT_TYPE.PROGRAM){
				stats.push({name:"unsubs",label:"Unsubs",value: smr.checkNumber(summaryData.uniqueUnsubs),isClickable:isClickable});
			    stats.push({name:"unsubRate",label:"Unsub Rate",isRate:true,value: smr.checkNumber(summaryData.uniqueUnsubRate),isClickable:isClickable});
			}
		    stats.push({name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.uniqueComplaints),isClickable:isClickable});
		    stats.push({name:"complaintRate",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.uniqueComplaintRate),isClickable:isClickable});
		}else if(reportType == smr.REPORT_TYPE.BATCH){
			if(breakDownType=="target" || breakDownType=="domain"){
				stats = [
				         {name:"unsub",label:"Unsub",value: smr.checkNumber(summaryData.unsub.count),isClickable:isClickable},
				         {name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.complaints.count),isClickable:isClickable},
				         {name:"unsub",label:"Unsub Rate",isRate:true,value: smr.checkNumber(summaryData.unsub.rate),isClickable:false},
				         {name:"complaints",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.complaints.rate),isClickable:false}
				         ];
			}else{
				stats = [
				         {name:"unsub",label:"Unsub",value: smr.checkNumber(summaryData.unsub.unique),isClickable:isClickable},
				         {name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.complaints.unique),isClickable:isClickable},
				         {name:"unsub",label:"Unsub Rate",isRate:true,value: smr.checkNumber(summaryData.unsub.uniqueRate),isClickable:false},
				         {name:"complaints",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.complaints.uniqueRate),isClickable:false}
				         ];
			}
		}else if(reportType == smr.REPORT_TYPE.PROGRAM){
			if(breakDownType=="target" || breakDownType=="domain"){
				stats = [
							{name:"unsubs",label:"Unsubs",value: smr.checkNumber(summaryData.unsubs.count),isClickable:isClickable},
							{name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.complaints.count),isClickable:isClickable},
							{name:"unsubs",label:"Unsub Rate",isRate:true,value: smr.checkNumber(summaryData.unsubs.rate),isClickable:false},
							{name:"complaints",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.complaints.rate),isClickable:false}
					  	];
			}else{
				stats = [
							{name:"unsubs",label:"Unsubs",value: smr.checkNumber(summaryData.uniqueUnsubs.count),isClickable:isClickable},
							{name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.uniqueComplaints.count),isClickable:isClickable},
							{name:"unsubs",label:"Unsub Rate",isRate:true,value: smr.checkNumber(summaryData.uniqueUnsubs.rate),isClickable:false},
							{name:"complaints",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.uniqueComplaints.rate),isClickable:false}
					  	];
			}
		}else{
			if(breakDownType=="target" || breakDownType=="domain"){
				stats = [	
				         	{name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.complaints.count),isClickable:isClickable},
							{name:"complaints",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.complaints.rate),isClickable:false}
					  	];
			}else{
				stats = [	
				         	{name:"complaints",label:"Complaints",value: smr.checkNumber(summaryData.uniqueComplaints.count),isClickable:isClickable},
							{name:"complaints",label:"Complaint Rate",isRate:true,value: smr.checkNumber(summaryData.uniqueComplaints.rate),isClickable:false}
					  	];
			}
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
			if(viewType == "table" || viewType == "pivot"){
				$statsSummary.removeClass("pieOrBarView");
			}else{
				$statsSummary.removeClass("pieOrBarView");
				$statsSummary.addClass("pieOrBarView");
			}
		});
	}
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("sectionDisEngagement",{
		emptyParent: true
	},function(){
		return new smr.SectionDisEngagement();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
