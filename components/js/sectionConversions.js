var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function SectionConversions(){};
	smr.SectionConversions = SectionConversions; 
  
	SectionConversions.prototype.create = function(data,config){
		return smr.render("tmpl-sectionConversions",{});
	}
		
	SectionConversions.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		var reportType = view.reportType = data.reportType || view.reportType;
		
		view.metricName = data.metricName || "conversions";
		var metricName = view.metricName = data.metricName || view.metricName;
		
		var viewType = data.view || "table";
		view.deviceVal = true;
		
		var breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		breakDownType = breakDownType || "mailing";
		view.breakDownType = breakDownType;
		view.viewType = viewType;
		view.fetchVal = smr.fetchSingleMetricOrigin;
		
		// domain hide in Conversion section
		if(breakDownType == "domain"){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			if(reportType == smr.REPORT_TYPE.PROGRAM){
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
				breakDownType = "program";
			}else{
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Mailing");
				$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("default");
				breakDownType = "mailing";
			}
		}
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("isHide");
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='client']").addClass("isHide");
		if(reportType == smr.REPORT_TYPE.PROGRAM  || reportType == smr.REPORT_TYPE.BATCH  || reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='device']").removeClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='browser']").removeClass("isHide");
		}
		
		if(view.isNewRequest){
			smr.clearPivotViewCache(view.reportType,"conversions");
		}
		//show summary and view 
		showSummaryAndViewData.call(view,breakDownType,viewType,metricName,view.deviceVal);

	}
	
	
	SectionConversions.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE" : reportHeaderBreakDownChangeMethod,
			
			//event for summary dataitems change
			"STATSSUMMARY_DATAITEM_CHANGE" : statsSummaryDataItemChange, 
			
			//event for device change
			"REPORTHEADER_DEVICE_CHANGE" : reportHeaderDeviceChangeMethod,
			
			//event for pivot view trigger
			"STATSSUMMARY_STATUS_CHANGE": statsSummaryStatusChangeMetod,
			
			//event for Fetch All Metrics checkbox change
			"FETCH_ALLMETRICS_CHANGE": fetchAllMetricsChangeMethod
		}
	}

	// --------- /events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;
		viewType = viewName;
		view.viewType = viewType;
		
		var $deviceSelector = $e.closest(".report").find(".reportHeader-deviceSelector");
		var $deviceCheckbox = $deviceSelector.find("input[type='checkbox']");
		var breakDownType = view.breakDownType;
		
		if(breakDownType == "device"){
			$deviceSelector.show();
			$deviceCheckbox.attr("checked",view.deviceVal);
			deviceVal = view.deviceVal;
		}else{
			deviceVal = false;
			$deviceSelector.hide();
		}
		view.deviceVal = deviceVal;
		if(view.metricName=="conversionRate" || view.metricName=="convertToClick"){
			view.metricName="conversions";
		}
		showSummaryAndViewData.call(view,view.breakDownType,viewType,view.metricName,deviceVal);
		extra.complete = true;
	}
	
	function reportHeaderBreakDownChangeMethod(event){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
		
		var isHave = smr.checkIsHaveBreakdownValue(view.reportType,val);

		if(!isHave){
			breakDownType = val;
			view.breakDownType = val;
			var viewType = view.viewType;
			
			//display the deviceSelector
			var $deviceSelector = $e.closest(".report").find(".reportHeader-deviceSelector");
			var $deviceCheckbox = $deviceSelector.find("input[type='checkbox']");
			var deviceVal = false;
			
			if(breakDownType == "device"){
				$deviceSelector.show();
				$deviceCheckbox.attr("checked",true);
				deviceVal = true;
			}else{
				deviceVal = false;
				$deviceSelector.hide();
			}
			view.deviceVal = deviceVal;
			showSummaryAndViewData.call(view,breakDownType,viewType,view.metricName,deviceVal);
		}else{
			smr.goBackPreBreakdownValue($this,breakDownType);
		}
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
			showSummaryAndViewData.call(view,view.breakDownType,view.viewType,metric,view.deviceVal);
		}
	}
	
	function reportHeaderDeviceChangeMethod(e,extra){
		var view = this;
		var deviceVal = extra.value;
		view.deviceVal = deviceVal;
		showSummaryAndViewData.call(view,view.breakDownType,view.viewType,view.metricName,deviceVal);
	}
	
	function statsSummaryStatusChangeMetod(event,extra){
		var view = this;
		var pivotClickable = extra.clickable;
		if(extra.metric){
			view.metricName = extra.metric;
			view.pivotDataSummary = extra.summary
			showSummary.call(view,view.pivotDataSummary,"","pivot",view.metricName,pivotClickable);
		}else{
			showSummary.call(view,view.pivotDataSummary,"","pivot",view.metricName,pivotClickable);
		}
	}
	
	function fetchAllMetricsChangeMethod(event,extra){
		var view = this;
		var fetch = extra.fetchVal;
		if(fetch != null && typeof fetch != "undefined"){
			view.fetchVal = fetch;
		}
		showSummaryAndViewData.call(view,view.breakDownType,view.viewType,view.metricName);
	}
	// --------- /events --------- //
	
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //
	SectionConversions.prototype.destroy = function(){
		var $report = this.$el.closest(".report");
		//domain hide in Conversions section,so remove the isHide when go to other page
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
			$report.find(".reportHeader-pulldownSelector").hide();
		}
		$report.find(".reportHeader-breakdownCombobox .combobox .isHide").removeClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='device']").addClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='client']").addClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='browser']").addClass("isHide");
		
		//hide the Device checkbox
		$report.find(".reportHeader-deviceSelector").hide();
		smr.clearPivotViewCache(view.reportType,"conversions");
	}
	
	SectionConversions.prototype.getAllData = function(breakDownType){
		var view = this;
		var $e = view.$el;
		var dfd = $.Deferred();
		var $reportDataLoading = $e.closest(".report").find(".report-data-loading");
		if(view.viewType=="pivot"){
			$reportDataLoading = $e.closest(".report").find(".report-data-progressBar");
		}
		$reportDataLoading.show();
		view._breakDownType = breakDownType;
		if(view.viewType=="pivot"){
			smr.getBigDataSummary(view.reportType,"getConversions",view.metricName,null,null,view.isNewRequest, view.fetchVal).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0];
				}
				if(view.fetchVal){
					var includeSummaryTemp = smr.includeSummaryTemp[view.reportType]["getConversions"];
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
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0];
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}

		return dfd.promise();
	}
	// --------- Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	
	function showSummaryAndViewData(breakDownType,viewType,metricName,deviceVal){
		var view = this;
		var $e = view.$el;
		
		view.getAllData(breakDownType).done(function(dataAll){
			if(viewType=="pivot" && typeof dataAll=="undefined") dataAll = {};
			var dataSummary = dataAll.summary;
			if(breakDownType == "device") dataSummary = dataAll.deviceUsageData;
			if(breakDownType == "browser") dataSummary = dataAll.browserUsageData;
			showSummary.call(view,dataSummary,breakDownType,viewType,metricName);
			if(viewType=="table"){
				showTableData.call(view,dataAll,breakDownType,viewType,metricName,deviceVal);
			}else if(viewType=="pie"){
				showPieData.call(view,dataAll,breakDownType,viewType,metricName,deviceVal);
			}else if(viewType=="bar"){
				showBarData.call(view,dataAll,breakDownType,viewType,metricName,deviceVal);
			}else if(viewType=="pivot"){
				showPivotData.call(view,dataAll,breakDownType,viewType,metricName,deviceVal);
			}
		});
	}
	
	function showSummary(summaryData,breakDownType,viewType,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		if(viewType == "pie" || viewType == "bar"){
			var $byTitle = $e.find(".byTitle");
			$byTitle.removeClass("byTitle-table");
			$byTitle.html("").html("Conversions by " + smr.buildTitleValue(breakDownType));
		}else{
			var $byTitle = $e.find(".byTitle");
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}
		
		var $statsSummary = $e.find(".statsSummary");
		
		if(typeof summaryData == "undefined" || summaryData == null){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var isClickable = false;
			if(viewType == "pie" || viewType == "bar"){
				isClickable = true;
			}
			var stats = [];
			if(viewType == "pivot"){
				//isClickable = typeof pivotClickable!="undefined" ? pivotClickable :smr.fetchSingleMetric;
				isClickable = false;
				stats = [
							{name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions),isClickable:isClickable},
							{name:"conversionRate",label:"Conversion Rate",value:smr.checkNumber(summaryData.conversionRate),isRate:true,isClickable:isClickable},
							{name:"items",label:"Items",value:smr.checkNumber(summaryData.items),isClickable:isClickable},
							{name:"revenues",label:"Revenue",value:smr.checkNumber(summaryData.revenue),isClickable:isClickable,isConversionSymbol:true},
						    {name:"averageOrderValue",label:"Average Order Value",value:smr.checkNumber(summaryData.averageOrderValue),isClickable:isClickable,isConversionSymbol:true},
						    {name:"revenuePerEmail",label:"Revenue Per Email",value:smr.checkNumber(summaryData.revenuePerEmail),isClickable:isClickable,isConversionSymbol:true},
							{name:"convertToClick",label:"Convert-to-Click",value:smr.checkNumber(summaryData.convertToClick),isRate:true,isClickable:isClickable}
						];
				
			}else if(breakDownType == "device" || breakDownType == "browser"){
				stats = [
							{name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions),isClickable:isClickable},
							{name:"conversionsRate",label:"Conversion Rate",value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.conversions,summaryData.delivered)*100),isRate:true},
							{name:"revenues",label:"Revenue",value:smr.checkNumber(summaryData.revenue),isClickable:isClickable,isConversionSymbol:true},
							{name:"revenueRate",label:"Revenue Per Email",value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.revenue,summaryData.delivered)),isConversionSymbol:true},
							{name:"averageOrderValue",label:"Average Order Value",value:smr.formatToFixed(smr.formatDivisionNumber(summaryData.revenue,summaryData.conversions)),isClickable:false,isConversionSymbol:true}
						];
			}else{
				stats = [
							{name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions.count),isClickable:isClickable},
							{name:"conversions",label:"Conversion Rate",value:smr.checkNumber(summaryData.conversions.rate),isRate:true},
							{name:"items",label:"Items",value:smr.checkNumber(summaryData.conversions.items),isClickable:isClickable},
							{name:"revenues",label:"Revenue",value:smr.checkNumber(summaryData.conversions.revenue),isClickable:isClickable,isConversionSymbol:true},
						    {name:"averageOrderValue",label:"Average Order Value",value:smr.checkNumber(summaryData.conversions.averageOrderValue),isClickable:isClickable,isConversionSymbol:true},
						    {name:"revenuePerEmail",label:"Revenue Per Email",value:smr.checkNumber(summaryData.conversions.revenuePerEmail),isClickable:isClickable,isConversionSymbol:true},
							{name:"convertToClick",label:"Convert-to-Click",value:smr.checkNumber(summaryData.convertToClick.rate),isRate:true}
						];
			}

			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType,skipSortMetrics:true}).done(function(){
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
	
	function showTableData(dataAll,breakDownType,viewType,metricName,deviceVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $conversions = $e.find(".sectionConversions-view");
		
		var dataOrSummaryNodata = false;
		if(breakDownType == "device" || breakDownType == "browser"){
			dataOrSummaryNodata = false;
		}else{
			dataOrSummaryNodata = (dataAll.data == "undefined"  || typeof dataAll.summary == "undefined");
		}
		
		if(typeof dataAll == "undefined" || dataOrSummaryNodata ){
			$conversions.html("");
			$conversions.append("<div class='noData'>No Data!</div>");
		}else{
			$conversions.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;	
			var resultData = dataAll.data;
			var tableDataInfo ={ tableColumns: [], tableData:[], reportType:reportType, maxSize:12 };
			
			//change the column when different breakDownType
			if(breakDownType=="device"){
				dataSet = dataAll.deviceUsageData;
				tableDataInfo.maxSize=25;
				tableDataInfo.tableColumns.push({name:"category",label:"Category",combination:1,isAlignCenter:true});
				if(deviceVal)tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				tableDataInfo.tableColumns.push({name:"conversions",label:"Conversions"});
				tableDataInfo.tableColumns.push({name:"conversionsRate",label:"% of Conversions",isRate:true});
				tableDataInfo.tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true});
				tableDataInfo.tableColumns.push({name:"conversionsRate",label:"% of Revenue",isRate:true});
				tableDataInfo.tableColumns.push({name:"averageordervalue",label:"Average Conversion Size",isConversionSymbol:true});
				function pushDeviceDataToTableData(category,usageData,dataSummary,tableDataInfo){
					if(usageData && usageData!=null){
						var datas = usageData;
						for(var i = 0; i < datas.length; i++){
							var rowData = datas[i];
							if(!rowData.conversions && rowData.conversions==0) continue;
							resultData = {
									"Category":category,
									"Conversions":smr.checkNumber(rowData.conversions),
									"% of Conversions":smr.formatDivisionNumber(rowData.conversions,dataSummary.conversions)*100,
									"Revenue":smr.checkNumber(rowData.revenue),
									"% of Revenue":smr.formatDivisionNumber(rowData.revenue,dataSummary.revenue)*100,
									"Average Conversion Size":smr.formatDivisionNumber(rowData.revenue,rowData.conversions)
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
			} else if (breakDownType=="browser"){
				tableDataInfo.maxSize=25;
				dataSet = dataAll.browserUsageData;
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				tableDataInfo.tableColumns.push({name:"conversions",label:"Conversions"});
				tableDataInfo.tableColumns.push({name:"conversionsRate",label:"% of Conversions",isRate:true});
				tableDataInfo.tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true});
				tableDataInfo.tableColumns.push({name:"conversionsRate",label:"% of Revenue",isRate:true});
				tableDataInfo.tableColumns.push({name:"averageordervalue",label:"Average Conversion Size",isConversionSymbol:true});
				
				if(dataSet && dataSet.data && dataSet.data.length > 0){
					for(var i = 0; i < dataSet.data.length; i++){
						var rowData = dataSet.data[i];
						if(smr.checkNumber(rowData.conversions)==0) continue;
						resultData = {
								"Web Browser":rowData.browser,
								"Conversions":smr.checkNumber(rowData.conversions),
								"% of Conversions":smr.formatDivisionNumber(rowData.conversions,dataSet.conversions)*100,
								"Revenue":smr.checkNumber(rowData.revenue),
								"% of Revenue":smr.formatDivisionNumber(rowData.revenue,dataSet.revenue)*100,
								"Average Conversion Size":smr.formatDivisionNumber(rowData.revenue,rowData.conversions)
						};
						tableDataInfo.tableData.push(resultData);
					}
				}
				
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				tableDataInfo.tableColumns.push({name:"conversions",label:"Conversions"});
				tableDataInfo.tableColumns.push({name:"conversionsRate",label:"Conversion Rate",isRate:true});
				tableDataInfo.tableColumns.push({name:"items",label:"Items"});
				tableDataInfo.tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true});
				tableDataInfo.tableColumns.push({name:"averageordervalue",label:"Average Order Value",isConversionSymbol:true});
				tableDataInfo.tableColumns.push({name:"revenuePerEmail",label:"Revenue Per Email",isConversionSymbol:true});
				tableDataInfo.tableColumns.push({name:"converttoclick",label:"Convert-to-Click",isRate:true});
				for(var i = 0; i < resultData.length; i++){
					var rowData = resultData[i];
					if(rowData){
						var resultDataRow = {
								"Conversions" : smr.checkNumber(rowData.conversions.count),
								"Conversion Rate" : smr.checkNumber(rowData.conversions.rate),
								"Items" : smr.checkNumber(rowData.conversions.items),
								"Revenue" : smr.checkNumber(rowData.conversions.revenue),
								"Average Order Value" : smr.checkNumber(rowData.conversions.averageOrderValue),
								"Revenue Per Email" : smr.checkNumber(rowData.conversions.revenuePerEmail),
								"Convert-to-Click" : smr.checkNumber(rowData.convertToClick.rate)
						};
						resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
						tableDataInfo.tableData.push(resultDataRow);
					}
				}
			}
			
			
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.skipSortMetrics = true;
			if(breakDownType=="device")tableDataInfo.combinationDefaultNotSort=1;
			tableDataInfo.title="Conversions by "+title;
			tableDataInfo.smaclass="SMA-REPORT-CONVERSIONSDATATABLE";
			brite.display("dataTable",$conversions,tableDataInfo);
		}	
		
	}
	
	
	function showPieData(dataAll,breakDownType,viewType,metricName,deviceVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $conversions = $e.find(".sectionConversions-view");
		
		var dataOrSummaryNodata = false;
		if(breakDownType == "device" || breakDownType == "browser"){
			dataOrSummaryNodata = false;
		}else{
			dataOrSummaryNodata = (dataAll.data == "undefined"  || typeof dataAll.summary == "undefined");
		}
		
		if(typeof dataAll == "undefined" || dataOrSummaryNodata ){
			$conversions.html("");
			$conversions.append("<div class='noData'>No Data!</div>");
		}else{
			$conversions.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;	
			var resultData = dataAll.data;
			
			var dropDownListVal = [];
			if(breakDownType == "device" || breakDownType == "browser"){
				dropDownListVal = [{name:"conversions",labelName:"Conversions"},
				                   {name:"revenues",labelName:"Revenue"}];
				resultData = [];
			}else{
				dropDownListVal = [{name:"conversions",labelName:"Conversions"},
				                   {name:"items",labelName:"Items"},
				                   {name:"revenues",labelName:"Revenue"},
				                   {name:"averageOrderValue",labelName:"Average Order Value"},
				                   {name:"revenuePerEmail",labelName:"Revenue Per Email"}];
			}
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			var tableDataInfo ={ tableColumns: tableColumns, tableData:[], reportType:reportType, maxSize:20 };
			if (breakDownType == "device"){
				tableColumns.push({name:"Category",label:"Category",isDate:true,isMockDateVal:true,isAlignLeft:true,combination:1});
				if(deviceVal)tableColumns.push({name:"Date",label:"Device",isDate:true,isMockDateVal:true,isAlignLeft:true}); 
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			if(metricName == "conversions"){
				tableColumns.push({name:"conversions",label:"Conversions",isDropDown:true,dropDownList:dropDownListVal});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontoconversions",label:columnTitle+" Contribution to Conversions",isPieChart:true,sortable:false});
			}else if(metricName == "items"){
				tableColumns.push({name:"items",label:"Items",isDropDown:true,dropDownList:dropDownListVal});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontoitems",label:columnTitle+" Contribution to Items",isPieChart:true,sortable:false});
			}else if(metricName == "revenues"){
				tableColumns.push({name:"revenue",label:"Revenue",isDropDown:true,dropDownList:dropDownListVal});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontorevenues",label:columnTitle+" Contribution to Revenue",isPieChart:true,sortable:false});
			}else if(metricName == "averageOrderValue"){
				tableColumns.push({name:"averageOrderValue",label:"Average Order Value",isDropDown:true,dropDownList:dropDownListVal});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontoaverageOrderValue",label:columnTitle+" Contribution to Average Order Value",isPieChart:true,sortable:false});
			}else if(metricName == "revenuePerEmail"){
				tableColumns.push({name:"revenuePerEmail",label:"Revenue Per Email",isDropDown:true,dropDownList:dropDownListVal});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontorevenuePerEmail",label:columnTitle+" Contribution to Revenue Per Email",isPieChart:true,sortable:false});
			}
			
			if(breakDownType == "mailing"){
				tableDataInfo.maxSize = 10;
			}
			
			
			if(breakDownType=="browser"){
				dataSummary = dataAll.browserUsageData;
				if(dataSummary){
					$.each(dataSummary.data,function(i,item){
						if(item["conversions"] && item["conversions"]!=0){
							resultData.push(item);
						}
					});
					//resultData = dataSummary.data;
				}
			}else if(breakDownType=="device"){
				dataSummary = dataAll.deviceUsageData;
				if(dataSummary){
					if(deviceVal){
						if(dataSummary.desktopUsageData && dataSummary.desktopUsageData.data && dataSummary.desktopUsageData.data.length>0) {
							$.each(dataSummary.desktopUsageData.data,function(i,item){item.category="Computer"});
							resultData = resultData.concat(dataSummary.desktopUsageData.data);
						}
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
				$.each(resultData,function(i,item){
					if(!item["conversions"] || item["conversions"] ==0){
						delete resultData[i];
					}
				});
			}
			
			
			
			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					//build the tableData and pieData
					var resultDataRow = {};
					var percentChange = "";
					var percentVal = "";
					
					if(metricName == "conversions"){
						if(breakDownType=="device" || breakDownType=="browser"){
							var dataVal = smr.checkNumber(rowData[metricName]);
							var contributionTo = columnTitle + " Contribution to Conversions";
							percentChange = smr.formatToFixed(smr.formatDivisionNumber(dataVal,dataSummary[metricName])*100);
							resultDataRow["Conversions"] = dataVal;
							resultDataRow["%"] = percentChange;
							resultDataRow[contributionTo] = percentChange;
						}else{
							percentChange = smr.formatDivisionNumber(rowData.conversions.count,dataSummary.conversions.count)*100;
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Conversions";
							resultDataRow["Conversions"] = smr.checkNumber(rowData.conversions.count);
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}
					}else if(metricName == "items"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.items,dataSummary.conversions.items)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Items";
						resultDataRow["Items"] = smr.checkNumber(rowData.conversions.items);
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "revenues"){
						if(breakDownType=="device" || breakDownType=="browser"){
							var dataVal = smr.checkNumber(rowData.revenue);
							var contributionTo = columnTitle + " Contribution to Revenue";
							percentChange = smr.formatToFixed(smr.formatDivisionNumber(dataVal,dataSummary.revenue)*100);
							resultDataRow["Revenue"] = smr.checkNumber(rowData.revenue);
							resultDataRow["%"] = percentChange;
							resultDataRow[contributionTo] = percentChange;
						}else{
							percentChange = smr.formatDivisionNumber(rowData.conversions.revenue,dataSummary.conversions.revenue)*100;
							percentVal = smr.formatToFixed(percentChange);
							var contributionTo = columnTitle + " Contribution to Revenue";
							resultDataRow["Revenue"] = smr.checkNumber(rowData.conversions.revenue);
							resultDataRow["%"] = percentVal;
							resultDataRow[contributionTo] = percentVal;
						}
					}else if(metricName == "averageOrderValue"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.averageOrderValue,dataSummary.conversions.averageOrderValue)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Average Order Value";
						resultDataRow["Average Order Value"] = smr.checkNumber(rowData.conversions.averageOrderValue);
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}else if(metricName == "revenuePerEmail"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.revenuePerEmail,dataSummary.conversions.revenuePerEmail)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Revenue Per Email";
						resultDataRow["Revenue Per Email"] = smr.checkNumber(rowData.conversions.revenuePerEmail);
						resultDataRow["%"] = percentVal;
						resultDataRow[contributionTo] = percentVal;
					}
					
					//add the column data
					if (breakDownType == "device"){
						resultDataRow["Category"] = rowData.category;
						if(deviceVal)resultDataRow["Device"] = rowData.platform ? rowData.platform : "Unknown";
					}else{
						resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultDataRow);
				}
				
			}
			tableDataInfo.smaclass="SMA-REPORT-CONVERSIONSPIETABLE";
			tableDataInfo.skipSortMetrics = true;
			brite.display("pieChart",$conversions,tableDataInfo);
		}	
	}
	
	function showBarData(dataAll,breakDownType,viewType,metricName,deviceVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $conversions = $e.find(".sectionConversions-view");
		
		var dataOrSummaryNodata = false;
		if(breakDownType == "device" || breakDownType == "browser"){
			dataOrSummaryNodata = false;
		}else{
			dataOrSummaryNodata = (dataAll.data == "undefined"  || typeof dataAll.summary == "undefined");
		}
		
		if(typeof dataAll == "undefined" || dataOrSummaryNodata ){
			$conversions.html("");
			$conversions.append("<div class='noData'>No Data!</div>");
		}else{
			$conversions.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var dataSet = dataAll.data;
			var dataSummary = dataAll.summary;	
			var resultData = dataAll.data;
			
			var dropDownListVal = [];
			if(breakDownType == "device" || breakDownType == "browser"){
				dropDownListVal = [{name:"conversions",labelName:"Conversions"},
				                   {name:"revenues",labelName:"Revenue"}];
				resultData = [];
			}else{
				dropDownListVal = [{name:"conversions",labelName:"Conversions"},
				                   {name:"items",labelName:"Items"},
				                   {name:"revenues",labelName:"Revenue"},
				                   {name:"averageOrderValue",labelName:"Average Order Value"},
				                   {name:"revenuePerEmail",labelName:"Revenue Per Email"}];

			}
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			if(metricName == "conversions"){
				tableColumns = [
				                {name:"conversions",label:"Conversions",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"datecontributiontoconversions",label:columnTitle+" Contribution to Conversions",isBarChart:true,isRate:true,sortable:false}
				                ];
			}else if(metricName == "items"){
				tableColumns = [
				                {name:"items",label:"Items",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"datecontributiontoitems",label:columnTitle+" Contribution to Items",isBarChart:true,isRate:true,sortable:false}
				                ];
			}else if(metricName == "revenues"){
				tableColumns = [
				                {name:"revenues",label:"Revenue",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"datecontributiontorevenues",label:columnTitle+" Contribution to Revenue",isBarChart:true,isRate:true,sortable:false}
				                ];
			}else if(metricName == "averageOrderValue"){
				tableColumns = [
				                {name:"averageOrderValue",label:"Average Order Value",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"datecontributiontoaverageOrderValue",label:columnTitle+" Contribution to Average Order Value",isBarChart:true,isRate:true,sortable:false}
				                ];
			}else if(metricName == "revenuePerEmail"){
				tableColumns = [
				                {name:"revenuePerEmail",label:"Revenue Per Email",isDropDown:true,dropDownList:dropDownListVal},
				                {name:"datecontributiontorevenuePerEmail",label:columnTitle+" Contribution to Revenue Per Email",isBarChart:true,isRate:true,sortable:false}
				                ];
			}
			
			var tableDataInfo ={ tableColumns: tableColumns, tableData:[],  reportType:reportType };
			
			if (breakDownType == "device"){
				tableColumns.push({name:"Category",label:"Category",isDate:true,isMockDateVal:true,isAlignCenter:true,combination:1});
				if(deviceVal)tableDataInfo.tableColumns.push({name:"Date",label:"Device",isDate:true,isMockDateVal:true,isAlignLeft:true}); 
				tableDataInfo.combinationDefaultNotSort = true;
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			
			if(breakDownType=="browser"){
				dataSummary = dataAll.browserUsageData;
				if(dataSummary){
					$.each(dataSummary.data,function(i,item){
						if(item["conversions"] && item["conversions"]!=0){
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
						}
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
				$.each(resultData,function(i,item){
					if(!item["conversions"] || item["conversions"] ==0){
						delete resultData[i];
					}
				});
			}
			
			for(var i = 0; i < resultData.length; i++){
				var rowData = resultData[i];
				if(rowData){
					var resultDataRow = {};
					var percentChange = "";
					var percentVal = "";
					
					if(metricName == "conversions"){
						if(breakDownType=="device" || breakDownType=="browser"){
							var dataVal = smr.checkNumber(rowData[metricName]);
							var contributionTo = columnTitle + " Contribution to Conversions";
							percentChange = smr.formatDivisionNumber(dataVal,dataSummary[metricName])*100;
							resultDataRow["Conversions"] = dataVal;
							resultDataRow[contributionTo] = percentChange;
						}else{
							percentChange = smr.formatDivisionNumber(rowData.conversions.count,dataSummary.conversions.count)*100;
							var contributionTo = columnTitle + " Contribution to Conversions";
							resultDataRow["Conversions"] = smr.checkNumber(rowData.conversions.count);
							resultDataRow[contributionTo] = percentChange;
						}
						
					}else if(metricName == "items"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.items,dataSummary.conversions.items)*100;
						var contributionTo = columnTitle + " Contribution to Items";
						resultDataRow["Items"] = smr.checkNumber(rowData.conversions.items);
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "revenues"){
						if(breakDownType=="device" || breakDownType=="browser"){
							var dataVal = smr.checkNumber(rowData.revenue);
							var contributionTo = columnTitle + " Contribution to Revenue";
							percentChange =  smr.formatDivisionNumber(dataVal,dataSummary.revenue)*100;
							resultDataRow["Revenue"] = smr.checkNumber(rowData.revenue);
							resultDataRow[contributionTo] = percentChange;
						}else{
							percentChange = smr.formatDivisionNumber(rowData.conversions.revenue,dataSummary.conversions.revenue)*100;
							var contributionTo = columnTitle + " Contribution to Revenue";
							resultDataRow["Revenue"] = smr.checkNumber(rowData.conversions.revenue);
							resultDataRow[contributionTo] = percentChange;
						}
					}else if(metricName == "averageOrderValue"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.averageOrderValue,dataSummary.conversions.averageOrderValue)*100;
						var contributionTo = columnTitle + " Contribution to Average Order Value";
						resultDataRow["Average Order Value"] = smr.checkNumber(rowData.conversions.averageOrderValue);
						resultDataRow[contributionTo] = percentChange;
					}else if(metricName == "revenuePerEmail"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.revenuePerEmail,dataSummary.conversions.revenuePerEmail)*100;
						var contributionTo = columnTitle + " Contribution to Revenue Per Email";
						resultDataRow["Revenue Per Email"] = smr.checkNumber(rowData.conversions.revenuePerEmail);
						resultDataRow[contributionTo] = percentChange;
					}
					
					if (breakDownType == "device"){
						resultDataRow["Category"] = rowData.category;
						if(deviceVal)resultDataRow["Device"] = rowData.platform ? rowData.platform : "Unknown";
					}else{
						resultDataRow = smr.addTableColumnData(resultDataRow,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultDataRow);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-CONVERSIONSBARTABLE";
			brite.display("barChart",$conversions,{tableDataInfo:tableDataInfo});
		}	
	}
	
	function showPivotData(dataAll,breakDownType,viewType,metricName,deviceVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $conversions = $e.find(".sectionConversions-view");
	
		$conversions.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
		if(typeof dataAll == "undefined" || dataAll==null){
			dataAll = {};
		}
		var data = dataAll.data;
		var dataSummary = dataAll.summary;
		view.pivotDataSummary = dataSummary;
		var metricList = [];
		metricList.push({name:"conversions",labelName:"Conversions"});
		metricList.push({name:"conversionRate",labelName:"Conversion Rate"});
		metricList.push({name:"items",labelName:"Items"});
		metricList.push({name:"revenues",labelName:"Revenue"});
		metricList.push({name:"averageOrderValue",labelName:"Average Order Value"});
		metricList.push({name:"revenuePerEmail",labelName:"Revenue Per Email"});
		metricList.push({name:"convertToClick",labelName:"Convert-to-Click"});
		$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
		
		brite.display("pivotTable",$conversions,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
			metricList:metricList,metricName:metricName,section:"conversions",parentView:view});
		
	}
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("sectionConversions",{
		parent: ".sectionConversions-view",
		emptyParent: true
	},function(){
		return new smr.SectionConversions();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
