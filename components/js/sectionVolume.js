var smr = smr || {};

(function($){
    // --------- Component Interface Implementation ---------- //
	function SectionVolume(){}
	smr.SectionVolume = SectionVolume; 

	SectionVolume.prototype.create = function(data,config){
		return smr.render("tmpl-sectionVolume",{});
	};
		
	SectionVolume.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		
		view.isNewRequest = data.isNewRequest || false;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		var reportType = view.reportType = data.reportType || view.reportType;
		
		view.metricName = data.metricName || "delivered";
		var metricName = view.metricName = data.metricName || view.metricName;
		
		var viewType = data.view || "table";
		var breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		breakDownType = breakDownType || "mailing";
		view.breakDownType = breakDownType;
		view.viewType = viewType;
		view.fetchVal = smr.fetchSingleMetricOrigin;
		
		if(view.isNewRequest){
			smr.clearPivotViewCache(view.reportType,"volume");
		}

		//show summary and view
		showSummaryAndViewData.call(view,breakDownType,viewType,metricName);
	};
	
	SectionVolume.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod,
			
			"STATSSUMMARY_STATUS_CHANGE":  statsSummaryStatusChangeMetod,
			
			//event for Fetch All Metrics checkbox change
			"FETCH_ALLMETRICS_CHANGE": fetchAllMetricsChangeMethod
		}
	}
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var viewName = extra.viewName;
		viewType = viewName;
		view.viewType = viewType;
		if(viewType!="pivot" && view.metricName=="deliveryRate"){
			view.metricName = "delivered";
		}
		showSummaryAndViewData.call(view,view.breakDownType,viewType,view.metricName);
		extra.complete = true;
	}
		
	function reportHeaderBreakDownChangeMethod(event){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var metricName = view.metricName;
			
		var $reportContentCtn = $e.closest(".report").find(".report-content");
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
		if(val == "domain"){
			if(metricName == "targeted" || metricName == "invalid" || metricName == "triggered" || metricName == "deliveryRate"){
				view.metricName = "delivered";
			}
		}
		var isHave = smr.checkIsHaveBreakdownValue(view.reportType,val);

		if(!isHave){
			breakDownType = val;
			showSummaryAndViewData.call(view,breakDownType,view.viewType,metricName);
		}else{
			smr.goBackPreBreakdownValue($this,breakDownType);
		}
		view.breakDownType = breakDownType;
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
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
			showSummaryAndViewData.call(view,view.breakDownType,view.viewType,metric);
		}
	}
	
	function statsSummaryStatusChangeMetod(event,extra){
		var view = this;
		var pivotClickable = extra.clickable;
		if(extra.metric){
			view.metricName = extra.metric;
			view.pivotDataSummary = extra.summary
			showSummary.call(view,view.pivotDataSummary,view.breakDownType,"pivot",view.metricName,pivotClickable);
		}else{
			showSummary.call(view,view.pivotDataSummary,view.breakDownType,"pivot",view.metricName,pivotClickable);
		}
	}
	
	function fetchAllMetricsChangeMethod(event, extra){
		var view = this;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		showSummaryAndViewData.call(view,view.breakDownType, view.viewType, view.metricName);
	}
	// --------- events --------- //
	
    // --------- /Component Interface Implementation ---------- //

    // --------- Component Public API --------- //
	SectionVolume.prototype.getAllData = function(breakDownType){
		var view = this;
		var $e = view.$el;
		var dfd = $.Deferred();
		var $reportDataLoading = $e.closest(".report").find(".report-data-loading");
		if(view.viewType=="pivot"){
			$reportDataLoading = $e.closest(".report").find(".report-data-progressBar");
		}
		$reportDataLoading.show();

		if(view.viewType == "pivot"){
			smr.getBigDataSummary(view.reportType,"getVolume",view.metricName,null,null,view.isNewRequest, view.fetchVal).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0] || {};
				}
				if(view.fetchVal){
					var includeSummaryTemp = smr.includeSummaryTemp[view.reportType]["getVolume"];
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
	};
	
	SectionVolume.prototype.destroy = function(){
		var view = this;
		smr.clearPivotViewCache(view.reportType,"volume");
	};
	
    // --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	function showSummaryAndViewData(breakDownType,viewType,metricName){
		var view = this;
		var $e = view.$el;
		
		view.getAllData(breakDownType).done(function(dataAll){
			showSummary.call(view,dataAll.summary,breakDownType,viewType,metricName);
			if(viewType == "table"){
				showTableView.call(view,dataAll,breakDownType,viewType,metricName);
			}else if(viewType == "pie"){
				showPieView.call(view,dataAll,breakDownType,viewType,metricName);
			}else if(viewType == "bar"){
				showBarView.call(view,dataAll,breakDownType,viewType,metricName);
			}else if(viewType == "pivot"){
				showPivotView.call(view,dataAll,breakDownType,viewType,metricName);
			}
		});
	}
	
	function showSummary(summaryData,breakDownType,viewType,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $byTitle = $e.find(".byTitle");
		if(viewType == "table" || viewType == "pivot"){
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(breakDownType);
			$byTitle.html("Volume by "+title);
		}
		
		var $statsSummary = $e.find(".statsSummary");
		
		var isByDomain = false;
		if(breakDownType == "domain"){
			isByDomain = true;
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
				view.pivotDataSummary = summaryData;
				//isClickable = typeof pivotClickable!="undefined" ? pivotClickable :smr.fetchSingleMetric;
				isClickable = false;
			}
			
			var stats = [];
			if(viewType == "pivot"){
				if(reportType == smr.REPORT_TYPE.BATCH){
					stats.push({name:"targeted",label:"Targeted",value:smr.checkNumber(summaryData.targeted),isClickable:isClickable,isByDomain:isByDomain});
				}else{
					stats.push({name:"triggered",label:"Triggered",value:smr.checkNumber(summaryData.targeted),isClickable:isClickable,isByDomain:isByDomain});
				}
				
				stats.push({name:"invalid",label:"Invalid",value:smr.checkNumber(summaryData.invalid),isClickable:isClickable,isByDomain:isByDomain});
				stats.push({name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isClickable:isClickable});
				stats.push({name:"failed",label:"Failed",value:smr.checkNumber(summaryData.failed),isClickable:isClickable});
				stats.push({name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered),isClickable:isClickable});
				stats.push({name:"deliveryRate",label:"Delivery Rate",value:smr.checkNumber(summaryData.deliveryRate),isRate:true,isClickable:isClickable});

			}else{
				if(reportType == smr.REPORT_TYPE.BATCH){
					stats = [
								{name:"targeted",label:"Targeted",value:smr.checkNumber(summaryData.targeted.count),isClickable:isClickable,isByDomain:isByDomain},
								{name:"invalid",label:"Invalid",value:smr.checkNumber(summaryData.invalid.count),isClickable:isClickable,isByDomain:isByDomain},
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isClickable:isClickable},
								{name:"failed",label:"Failed",value:smr.checkNumber(summaryData.failed.count),isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.count),isClickable:isClickable},
								{name:"delivered",label:"Delivery Rate",value:smr.checkNumber(summaryData.delivered.rate),isRate:true}
				  			];
				}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL || reportType == smr.REPORT_TYPE.PROGRAM){
					stats = [
					         	{name:"triggered",label:"Triggered",value:smr.checkNumber(summaryData.triggered.count),isClickable:isClickable,isByDomain:isByDomain},
								{name:"invalid",label:"Invalid",value:smr.checkNumber(summaryData.invalid.count),isClickable:isClickable,isByDomain:isByDomain},
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isClickable:isClickable},
								{name:"failed",label:"Failed",value:smr.checkNumber(summaryData.failed.count),isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.count),isClickable:isClickable},
								{name:"delivered",label:"Delivery Rate",value:smr.checkNumber(summaryData.delivered.rate),isRate:true}
				  			];
				}
			}
			
			
			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}

			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType}).done(function(){
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
	}
	
	function showPieView(dataAll,breakDownType,viewType,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $volume = $e.find(".sectionVolume-view");
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$volume.html("");
			$volume.append("<div class='noData'>No Data!</div>");
		}else{
			$volume.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var resultData = dataAll.data;
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;
			var isByDomain = (breakDownType == "domain");
			var isBatch = (reportType == smr.REPORT_TYPE.BATCH);
			
			var dropDownListVal = [
			                       {name:isBatch?"targeted":"triggered",labelName:isBatch?"Targeted":"Triggered",isByDomain:isByDomain},
			                       {name:"delivered",labelName:"Delivered"},
			                       {name:"sent",labelName:"Sent"},
			                       {name:"invalid",labelName:"Invalid",isByDomain:isByDomain},
			                       {name:"failed",labelName:"Failed"}
			                       ];
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			if(metricName == "targeted"){
				tableColumns = [
				                {name:"targeted",label:"Targeted",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"rate",label:"%",isRate:true,defaultSort:true},
				                {name:"datecontributiontotargeted",label:columnTitle+" Contribution to Targeted",isPieChart:true,sortable:false}
				                ];
			}else if(metricName == "triggered"){
				tableColumns = [
				                {name:"triggered",label:"Triggered",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"rate",label:"%",isRate:true,defaultSort:true},
				                {name:"datecontributiontotriggered",label:columnTitle+" Contribution to Triggered",isPieChart:true,sortable:false}
				                ];
			}else if(metricName == "delivered"){
				tableColumns = [
				                {name:"delivered",label:"Delivered",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"rate",label:"%",isRate:true,defaultSort:true},
				                {name:"datecontributiontodelivered",label:columnTitle+" Contribution to Delivered",isPieChart:true,sortable:false}
				                ];
			}else if(metricName == "sent"){
				tableColumns = [
				                {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"rate",label:"%",isRate:true,defaultSort:true},
				                {name:"datecontributiontosent",label:columnTitle+" Contribution to Sent",isPieChart:true,sortable:false}
				                ];
			}else if(metricName == "invalid"){
				tableColumns = [
				                {name:"invalid",label:"Invalid",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"rate",label:"%",isRate:true,defaultSort:true},
				                {name:"datecontributiontoinvalid",label:columnTitle+" Contribution to Invalid",isPieChart:true,sortable:false}
				                ];
			}else if(metricName == "failed"){
				tableColumns = [
				                {name:"failed",label:"Failed",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"rate",label:"%",isRate:true,defaultSort:true},
				                {name:"datecontributiontofailed",label:columnTitle+" Contribution to Failed",isPieChart:true,sortable:false}
				                ];
			}
			
			var tableDataInfo ={
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType,
					maxSize:breakDownType == "mailing" ? 12: 20
			};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					//build the tableData and pieData
					var resultDataRow = {};
					var percentChange = "";
					var percentVal = "";
					var dataVal = "";
					
					percentChange = smr.formatDivisionNumber(rowData[metricName].count,dataSummary[metricName].count)*100;
					percentVal = smr.formatToFixed(percentChange);
					dataVal = smr.checkNumber(rowData[metricName].count);
					
					if(metricName == "targeted"){
						var contributionTo = columnTitle + " Contribution to Targeted";
						resultDataRow["Targeted"] = dataVal;
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "triggered"){
						var contributionTo = columnTitle + " Contribution to Triggered";
						resultDataRow["Triggered"] = dataVal;
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "delivered"){
						var contributionTo = columnTitle + " Contribution to Delivered";
						resultDataRow["Delivered"] = dataVal;
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "sent"){
						var contributionTo = columnTitle + " Contribution to Sent";
						resultDataRow["Sent"] = dataVal;
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "invalid"){
						var contributionTo = columnTitle + " Contribution to Invalid";
						resultDataRow["Invalid"] = dataVal;
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "failed"){
						var contributionTo = columnTitle + " Contribution to Failed";
						resultDataRow["Failed"] = dataVal;
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}
					
					//add the column data
					resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					tableDataInfo.tableData.push(resultDataRow);
				}
				
			}
			tableDataInfo.smaclass="SMA-REPORT-VOLUMEPIETABLE";
			brite.display("pieChart",$volume,tableDataInfo);
		}
	}
	
	function showTableView(dataAll,breakDownType,viewType,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $volume = $e.find(".sectionVolume-view");
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$volume.html("");
			$volume.append("<div class='noData'>No Data!</div>");
		}else{
			$volume.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var resultData = dataAll.data;
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;
			var isByDomain = (breakDownType == "domain");
			var isBatch = (reportType == smr.REPORT_TYPE.BATCH);
			
			var tableDataInfo ={tableColumns:[],tableData:[],reportType:reportType,maxSize:30};
			if(isBatch){
				tableDataInfo.tableColumns.push({name:"Targeted",label:"Targeted",isByDomain:isByDomain});
			}else{
				tableDataInfo.tableColumns.push({name:"Triggered",label:"Triggered",isByDomain:isByDomain});
			}
			tableDataInfo.tableColumns.push({name:"Invalid",label:"Invalid",isByDomain:isByDomain});
			tableDataInfo.tableColumns.push({name:"Sent",label:"Sent"});
			tableDataInfo.tableColumns.push({name:"Failed",label:"Failed"});
			tableDataInfo.tableColumns.push({name:"Delivered",label:"Delivered"});
			tableDataInfo.tableColumns.push({name:"Delivered",label:"Delivery Rate",isRate:true});

			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);

			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					var resultDataRow = {};
					if(isBatch){
						resultDataRow["Targeted"] = isByDomain ? "" : smr.checkNumber(rowData.targeted.count);
					}else{
						resultDataRow["Triggered"] = isByDomain ? "" : smr.checkNumber(rowData.triggered.count);
					}
				    resultDataRow["Invalid"] = isByDomain ? "" : smr.checkNumber(rowData.invalid.count);
				    resultDataRow["Sent"] = smr.checkNumber(rowData.sent.count);
				    resultDataRow["Failed"] = smr.checkNumber(rowData.failed.count);
				    resultDataRow["Delivered"] = smr.checkNumber(rowData.delivered.count);
				    resultDataRow["Delivery Rate"] = smr.checkNumber(rowData.delivered.rate);
					
					//add the column data
					resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					tableDataInfo.tableData.push(resultDataRow);
				}
			}
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.title="Volume by "+title;
			tableDataInfo.smaclass="SMA-REPORT-VOLUMEDATATABLE";
			brite.display("dataTable",$volume,tableDataInfo);
		}
	}
	
	function showBarView(dataAll,breakDownType,viewType,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $volume = $e.find(".sectionVolume-view");
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$volume.html("");
			$volume.append("<div class='noData'>No Data!</div>");
		}else{
			$volume.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var resultData = dataAll.data;
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;
			var isByDomain = (breakDownType == "domain");
			var isBatch = (reportType == smr.REPORT_TYPE.BATCH);
			var dropDownListVal = [
			                       {name:isBatch?"targeted":"triggered",labelName:isBatch?"Targeted":"Triggered",isByDomain:isByDomain},
			                       {name:"delivered",labelName:"Delivered"},
			                       {name:"sent",labelName:"Sent"},
			                       {name:"invalid",labelName:"Invalid",isByDomain:isByDomain},
			                       {name:"failed",labelName:"Failed"}
			                       ];
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			if(metricName == "targeted"){
				tableColumns = [
				                {name:"targeted",label:"Targeted",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"targeted",label:columnTitle + " Contribution to Targeted",isBarChart:true,isRate:true}
				                ];
			}else if(metricName == "triggered"){
				tableColumns = [
				                {name:"triggered",label:"Triggered",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"triggered",label:columnTitle + " Contribution to Triggered",isBarChart:true,isRate:true}
				                ];
			}else if(metricName == "delivered"){
				tableColumns = [
				                {name:"delivered",label:"Delivered",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"delivered",label:columnTitle + " Contribution to Delivered",isBarChart:true,isRate:true}
				                ];
			}else if(metricName == "sent"){
				tableColumns = [
				                {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"sent",label:columnTitle + " Contribution to Sent",isBarChart:true,isRate:true}
				                ];
			}else if(metricName == "invalid"){
				tableColumns = [
				                {name:"invalid",label:"Invalid",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"invalid",label:columnTitle + " Contribution to Invalid",isBarChart:true,isRate:true}
				                ];
			}else if(metricName == "failed"){
				tableColumns = [
				                {name:"failed",label:"Failed",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"failed",label:columnTitle + " Contribution to Failed",isBarChart:true,isRate:true}
				                ];
			}
			
			var tableDataInfo ={
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType
			};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					var resultDataRow = {};
					var percentChange = "";
					var dataVal = "";
					
					percentChange = smr.formatDivisionNumber(rowData[metricName].count,dataSummary[metricName].count)*100;
					dataVal = smr.checkNumber(rowData[metricName].count);
					
					if(metricName == "targeted"){
						var contributionTo = columnTitle + " Contribution to Targeted";
						resultDataRow["Targeted"] = dataVal;
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "triggered"){
						var contributionTo = columnTitle + " Contribution to Triggered";
						resultDataRow["Triggered"] = dataVal;
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "delivered"){
						var contributionTo = columnTitle + " Contribution to Delivered";
						resultDataRow["Delivered"] = dataVal;
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "sent"){
						var contributionTo = columnTitle + " Contribution to Sent";
						resultDataRow["Sent"] = dataVal;
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "invalid"){
						var contributionTo = columnTitle + " Contribution to Invalid";
						resultDataRow["Invalid"] = dataVal;
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "failed"){
						var contributionTo = columnTitle + " Contribution to Failed";
						resultDataRow["Failed"] = dataVal;
						resultDataRow[contributionTo] = percentChange;
					}
					
					//add the column data
					resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					tableDataInfo.tableData.push(resultDataRow);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-VOLUMEBARTABLE";
			brite.display("barChart",$volume,{tableDataInfo:tableDataInfo});
		}
	}
	
	
	function showPivotView(dataAll,breakDownType,viewType,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $volume = $e.find(".sectionVolume-view");

		$volume.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
		var isBatch = (reportType == smr.REPORT_TYPE.BATCH);

		var data = dataAll.data;
		var viewRate = $e.closest(".report").find(".reportHeader-toggle input[type='checkbox']").attr("checked") ? true : false;
		var metricList = [];
		if(isBatch){
			metricList.push({name:"targeted",labelName:"Targeted"});
		}else{
			metricList.push({name:"triggered",labelName:"Triggered"});
		}
		metricList.push({name:"invalid",labelName:"Invalid"});
		metricList.push({name:"sent",labelName:"Sent"});
		metricList.push({name:"failed",labelName:"Failed"});
		metricList.push({name:"delivered",labelName:"Delivered"});
		metricList.push({name:"deliveryRate",labelName:"Delivery Rate"});
		
		$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
		
		brite.display("pivotTable",$volume,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
			metricList:metricList,metricName:metricName,section:"volume",parentView:view});
	}
	
	// --------- /Component Private Methods --------- //


    // --------- Component Registration --------- //
    brite.registerView("sectionVolume", {
            emptyParent : true
        },
        function () {
            return new smr.SectionVolume();
        });
    // --------- Component Registration --------- //

})(jQuery);
