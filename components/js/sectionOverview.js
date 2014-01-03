var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _breakDownType,_viewRate;
	var _viewBy = "day";
	// --------- /Component Private Properties --------- //
	
    // --------- Component Interface Implementation ---------- //
	function SectionOverview(){};
	smr.SectionOverview = SectionOverview; 
	
	SectionOverview.prototype.create = function(data,config){
		return smr.render("tmpl-sectionOverview",{});
	};
		
	SectionOverview.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		data = data || {};
		view.reDraw = false;
		var viewName = data.view || "summary";
		view.viewName = viewName;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		view.fetchVal = smr.fetchSingleMetricOrigin;
		
		view.metricName = data.metricName || "opens";
		view.isNewRequest = data.isNewRequest || false;
		
		if(view.isNewRequest){
			smr.clearPivotViewCache(view.reportType,"overview");
		}
		view.showView(viewName,_viewBy);
	};
	
	SectionOverview.prototype.events = {
		// to set viewBy action highlignt
		"click; .viewBy .action": function(event){
			var $this = $(event.currentTarget);
			$this.closest(".viewBy").find(".action").removeClass("selected");
			$this.addClass("selected");
		},
			
		"click; .viewBy.head .action": function(event){
			var view = this;
			var $this = $(event.currentTarget);
			var viewBy = $this.attr("data-view");
			_viewBy = viewBy;
			view.getAllData(viewBy).done(function(data){
				showSummaryView.call(view,viewBy,data);
			});
		}
		
	};
	
	SectionOverview.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for viewrate change
			"REPORTHEADER_VIEWRATE_CHANGE": reportHeaderViewRateChangeMethod,
			
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
		var $e = view.$el;
		var viewName = extra.viewName;
		view.viewName = viewName;
		var viewByOrBreakDownType = "";
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
	
		if(viewName == "summary"){
			viewByOrBreakDownType = _viewBy;
		}else{
			viewByOrBreakDownType = _breakDownType;
		}
		
		if(view.metricName=="averageOrderValue"){
			view.metricName = "revenue";
		}
		if(_viewRate && viewName=="pivot" && view.metricName == "revenue"){
			view.metricName = "averageOrderValue";
		}
		
		//for LCM REPORT, when change to pivot view ,check the view.metricName to 'unsub'
		if(view.reportType == smr.REPORT_TYPE.PROGRAM && viewName=="pivot" && view.metricName == "unsubs"){
			view.metricName = "unsub";
		}
		
		//for LCM REPORT, when change to other view(not pivot view) ,check the view.metricName to 'unsubs'
		if(view.reportType == smr.REPORT_TYPE.PROGRAM && viewName!="pivot" && view.metricName=="unsub"){
			view.metricName="unsubs"; 
		}
		
		if(view.showView(viewName,viewByOrBreakDownType)){
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
		if(!_viewRate && view.viewName=="pivot" && view.metricName == "averageOrderValue"){
			view.metricName = "revenue";
		}
		if(_viewRate && view.viewName=="pivot" && view.metricName == "revenue"){
			view.metricName = "averageOrderValue";
		}
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
			showStatSummaryPart.call(view,"",_viewRate,"pivot",view.pivotDataSummary,view.metricName,pivotClickable);
		}else{
			showStatSummaryPart.call(view,"",_viewRate,"pivot",view.pivotDataSummary,view.metricName,pivotClickable);
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
	
	// --------- /events --------- //
	
    // --------- /Component Interface Implementation ---------- //

    // --------- Component Public API --------- //
	SectionOverview.prototype.getAllData = function(breakDownType,isNewRequest){
		var view = this;
		var $e = view.$el;
		var dfd = $.Deferred();
		var $reportDataLoading = $e.closest(".report").find(".report-data-loading");
		if(view.viewName=="pivot"){
			$reportDataLoading = $e.closest(".report").find(".report-data-progressBar");
		}
		$reportDataLoading.show();
		if(view.viewName=="pivot"){
			smr.getBigDataSummary(view.reportType,"getOverview",view.metricName,_viewRate,null,isNewRequest==null ? view.isNewRequest : isNewRequest, view.fetchVal).done(function(data){
				var dataSet = {};
				if(data.items!=null && data.items.length > 0){
					dataSet = data.items[0];
				}
				if(view.fetchVal){
					var includeSummaryTemp = smr.includeSummaryTemp[view.reportType]["getOverview"];
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
	
	SectionOverview.prototype.showView = function(viewName,breakDownType,viewRate,metric,isNewRequest,isRateChange){
		var view = this;
		var $e = view.$el;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_viewRate = $e.closest(".report").find(".reportHeader-toggle input[type='checkbox']").attr("checked") ? true : false;
		if(typeof breakDownType != 'undefined'){
			if(viewName == 'summary'){
				_viewBy = breakDownType;
			}else{
				_breakDownType = breakDownType;
			}
		}else{
			_breakDownType = "day";
		}
		
		if(typeof viewRate != 'undefined'){
			_viewRate = viewRate;
		}
		
		if(typeof metric != 'undefined'){
			view.metricName = metric;
		}
		var metricName = view.metricName;
		//clean first
		$e.bEmpty();
		var html;
		if(viewName == 'summary'){
			html = smr.render("tmpl-sectionOverviewSummary",{reportType:view.reportType,viewBy:_viewBy});
		}else if(viewName == 'table'){
			html = smr.render("tmpl-sectionOverview-table",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionOverview-pie",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionOverview-bar",{});
		}else if(viewName == 'pivot'){
			html = smr.render("tmpl-sectionOverview-pivot",{});
		}else{
			return false;
		}

		$e.append($(html));
		if(viewName == 'summary'){
			view.getAllData(_viewBy).done(function(dataAll){
				showSummaryView.call(view,_viewBy,dataAll);
			});
		}else {
			if(typeof isRateChange!="undefined" && isRateChange && viewName == 'pivot' && !view.fetchVal){
				showPivotView.call(view,metricName,_viewRate,view.pivotAllData);
			}else{
				view.getAllData(_breakDownType,isNewRequest).done(function(dataAll){
					if(viewName == 'table'){
						showTableView.call(view,_breakDownType,_viewRate,dataAll);
					}else if(viewName == 'pie'){
						showPieView.call(view,_breakDownType,false,metricName,dataAll);
					}else if(viewName == 'bar'){
						showBarView.call(view,_breakDownType,false,metricName,dataAll);
					}else if(viewName == 'pivot'){
						showPivotView.call(view,metricName,_viewRate,dataAll);
					}
				});
			}
		}
		
		return true;
	};
	
	SectionOverview.prototype.destroy = function(){
		var view = this;
		smr.clearPivotViewCache(view.reportType,"overview");
	};
    // --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //	
	function showBarView(by,viewRate,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var sectionOverviewC = $e.bComponent("sectionOverview");
		var reportType = view.reportType;
		var $sectionOverview = $e.find(".sectionOverviewBar-table");
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
			$sectionOverview.html("");
			$sectionOverview.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionOverview.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			
			if(reportType == smr.REPORT_TYPE.BATCH){
				var dropDownListVal = [
				            {name:"sent",labelName:"Sent"},
							{name:"delivered",labelName:"Delivered"},
							{name:"opens",labelName:"Opens"},
							{name:"clicks",labelName:"Clicks"},
							{name:"unsub",labelName:"Unsub"}
				         ];
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					dropDownListVal.push({name:"conversions",labelName:"Conversions"});
					dropDownListVal.push({name:"revenue",labelName:"Revenue"});
				}
			}else{
				var dropDownListVal = [
							{name:"sent",labelName:"Sent"},
							{name:"delivered",labelName:"Delivered"},
							{name:"opens",labelName:"Opens"},
							{name:"clicks",labelName:"Clicks"}
						];
				if(reportType == smr.REPORT_TYPE.PROGRAM){
					dropDownListVal.push({name:"unsubs",labelName:"Unsubs"});
				}
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					dropDownListVal.push({name:"conversions",labelName:"Conversions"});
					dropDownListVal.push({name:"revenue",labelName:"Revenue"});
				}
			}
			
			//show summary
			showStatSummaryPart.call(view,by,viewRate,"bar",dataSummary,metricName);
			
			//change the column when click statSummary box
			var columnTitle = smr.buildColumnTitleValue(by);
			var tableColumns = [];
			if(metricName == "opens"){
				tableColumns = [
			                {name:"opens",label:"Opens",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"opens",label:columnTitle+" Contribution to Opens",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "delivered"){
				tableColumns = [
			                {name:"delivered",label:"Delivered",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"delivered",label:columnTitle+" Contribution to Delivered",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "sent"){
				tableColumns = [
			                {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"sent",label:columnTitle+" Contribution to Sent",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "clicks"){
				tableColumns = [
			                {name:"clicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"clicks",label:columnTitle+" Contribution to Clicks",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "unsub"){
				tableColumns = [
			                {name:"unsub",label:"Unsub",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"unsub",label:columnTitle+" Contribution to Unsub",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "unsubs"){
				tableColumns = [
			                {name:"unsubs",label:"Unsubs",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"unsubs",label:columnTitle+" Contribution to Unsubs",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "conversions"){
				tableColumns = [
			                {name:"conversions",label:"Conversions",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"conversions",label:columnTitle+" Contribution to Conversions",isBarChart:true,isRate:true}
			              ];
			}else if(metricName == "revenue"){
				tableColumns = [
			                {name:"revenue",label:"Revenue",isDropDown:true,dropDownList:dropDownListVal,isConversionSymbol:true},
			                {name:"revenue",label:columnTitle+" Contribution to Revenue",isBarChart:true,isRate:true}
			              ];
			}
			
			var tableDataInfo ={
				tableColumns: tableColumns,
			    tableData:[],
				reportType:reportType
			};
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,by);
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {};
					var percentChange = "";
					var dataVal = "";
					
					if(metricName == "revenue"){
						percentChange = smr.formatDivisionNumber(rowData.conversions.revenue,dataSummary.conversions.revenue)*100;
						dataVal = smr.checkNumber(rowData.conversions.revenue);
					}else if(metricName == "opens" || metricName == "clicks" || metricName == "unsubs" || metricName == "unsub"){
						//By domain breakdown has no unique metrices
						if(_breakDownType == "domain"){
							percentChange = smr.formatDivisionNumber(rowData[metricName].count,dataSummary[metricName].count)*100;
							dataVal = smr.checkNumber(rowData[metricName].count);
						}else{
							if(reportType == smr.REPORT_TYPE.BATCH){
								percentChange = smr.formatDivisionNumber(rowData[metricName].unique,dataSummary[metricName].unique)*100;
								dataVal = smr.checkNumber(rowData[metricName].unique);
							}else{
								var nameM  = "unique" + metricName.substring(0,1).toUpperCase( ) + metricName.substring(1);
								percentChange = smr.formatDivisionNumber(rowData[nameM].count,dataSummary[nameM].count)*100;
								dataVal = smr.checkNumber(rowData[nameM].count);
							}
						}
					}else{
						percentChange = smr.formatDivisionNumber(rowData[metricName].count,dataSummary[metricName].count)*100;
						dataVal = smr.checkNumber(rowData[metricName].count);
					}
					
					if(metricName == "opens"){
						var contributionTo = columnTitle + " Contribution to Opens";
							resultData["Opens"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "delivered"){
						var contributionTo = columnTitle + " Contribution to Delivered";
							resultData["Delivered"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "sent"){
						var contributionTo = columnTitle + " Contribution to Sent";
							resultData["Sent"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "clicks"){
						var contributionTo = columnTitle + " Contribution to Clicks";
							resultData["Clicks"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "unsub"){
						var contributionTo = columnTitle + " Contribution to Unsub";
							resultData["Unsub"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "unsubs"){
						var contributionTo = columnTitle + " Contribution to Unsubs";
							resultData["Unsubs"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "conversions"){
						var contributionTo = columnTitle + " Contribution to Conversions";
							resultData["Conversions"] = dataVal;
							resultData[contributionTo] = percentChange;
					}else if(metricName == "revenue"){
						var contributionTo = columnTitle + " Contribution to Revenue";
							resultData["Revenue"] = dataVal;
							resultData[contributionTo] = percentChange;
					}
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,by,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-OVERVIEWBARTABLE";
			brite.display("barChart",$e.find(".sectionOverviewBar-table"),{tableDataInfo:tableDataInfo});
		}
	}
	
	function showPieView(by,viewRate,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var sectionOverviewC = $e.bComponent("sectionOverview");
		var reportType = view.reportType;
		var $sectionOverview = $e.find(".sectionOverviewPie-pie");
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
			$sectionOverview.html("");
			$sectionOverview.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionOverview.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			
			if(reportType == smr.REPORT_TYPE.BATCH){
				var dropDownListVal = [
				            {name:"sent",labelName:"Sent"},
							{name:"delivered",labelName:"Delivered"},
							{name:"opens",labelName:"Opens"},
							{name:"clicks",labelName:"Clicks"},
							{name:"unsub",labelName:"Unsub"}
				         ];
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					dropDownListVal.push({name:"conversions",labelName:"Conversions"});
					dropDownListVal.push({name:"revenue",labelName:"Revenue"});
				}
			}else{
				var dropDownListVal = [
							{name:"sent",labelName:"Sent"},
							{name:"delivered",labelName:"Delivered"},
							{name:"opens",labelName:"Opens"},
							{name:"clicks",labelName:"Clicks"}
						];
				if(reportType == smr.REPORT_TYPE.PROGRAM){
					dropDownListVal.push({name:"unsubs",labelName:"Unsubs"});
				}
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					dropDownListVal.push({name:"conversions",labelName:"Conversions"});
					dropDownListVal.push({name:"revenue",labelName:"Revenue"});
				}
			}
			
			//show summary
			showStatSummaryPart.call(view,by,viewRate,"pie",dataSummary,metricName);
			
			//show pie table
			var tableColumns = [];
			var columnTitle = smr.buildColumnTitleValue(by);
			if(metricName == "opens"){
				tableColumns = [
			                {name:"opens",label:"Opens",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontoopens",label:columnTitle+" Contribution to Opens",isPieChart:true,sortable:false}
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
			}else if(metricName == "clicks"){
				tableColumns = [
			                {name:"clicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontoclicks",label:columnTitle+" Contribution to Clicks",isPieChart:true,sortable:false}
			              ];
			}else if(metricName == "unsub"){
				tableColumns = [
			                {name:"unsub",label:"Unsub",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontounsub",label:columnTitle+" Contribution to Unsub",isPieChart:true,sortable:false}
			              ];
			}else if(metricName == "unsubs"){
				tableColumns = [
			                {name:"unsubs",label:"Unsubs",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontounsubs",label:columnTitle+" Contribution to Unsubs",isPieChart:true,sortable:false}
			              ];
			}else if(metricName == "conversions"){
				tableColumns = [
			                {name:"conversions",label:"Conversions",isDropDown:true,dropDownList:dropDownListVal},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontoconversions",label:columnTitle+" Contribution to Conversions",isPieChart:true,sortable:false}
			              ];
			}else if(metricName == "revenue"){
				tableColumns = [
			                {name:"revenue",label:"Revenue",isDropDown:true,dropDownList:dropDownListVal,isConversionSymbol:true},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontorevenue",label:columnTitle+" Contribution to Revenue",isPieChart:true,sortable:false}
			              ];
			}
			
			var tableDataInfo ={
				tableColumns: tableColumns,
			    tableData:[],
				reportType:reportType,
				maxSize: 20
			};
			if(by == "mailing"){
				tableDataInfo.maxSize = 12;
			}
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,by);

			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				//build the tableData
				var resultData = {};
				var percentChange = "";
				var percentVal = "";
				var dataVal = "";
				
				if(metricName == "revenue"){
					percentChange = smr.formatDivisionNumber(rowData.conversions.revenue,dataSummary.conversions.revenue)*100;
					percentVal = smr.formatToFixed(percentChange);
					dataVal = smr.checkNumber(rowData.conversions.revenue);
				}else if(metricName == "opens" || metricName == "clicks" || metricName == "unsubs" || metricName == "unsub"){
					//By domain breakdown has no unique metrices
					if(_breakDownType == "domain"){
						percentChange = smr.formatDivisionNumber(rowData[metricName].count,dataSummary[metricName].count)*100;
						percentVal = smr.formatToFixed(percentChange);
						dataVal = smr.checkNumber(rowData[metricName].count);
					}else{
						if(reportType == smr.REPORT_TYPE.BATCH){
							percentChange = smr.formatDivisionNumber(rowData[metricName].unique,dataSummary[metricName].unique)*100;
							percentVal = smr.formatToFixed(percentChange);
							dataVal = smr.checkNumber(rowData[metricName].unique);
						}else{
							var nameM  = "unique" + metricName.substring(0,1).toUpperCase( ) + metricName.substring(1);
							percentChange = smr.formatDivisionNumber(rowData[nameM].count,dataSummary[nameM].count)*100;
							percentVal = smr.formatToFixed(percentChange);
							dataVal = smr.checkNumber(rowData[nameM].count);
						}
					}
				}else{
					percentChange = smr.formatDivisionNumber(rowData[metricName].count,dataSummary[metricName].count)*100;
					percentVal = smr.formatToFixed(percentChange);
					dataVal = smr.checkNumber(rowData[metricName].count);
				}
				
				if(metricName == "opens"){
					var contributionTo = columnTitle + " Contribution to Opens";
					resultData["Opens"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "delivered"){
					var contributionTo = columnTitle + " Contribution to Delivered";
					resultData["Delivered"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "sent"){
					var contributionTo = columnTitle + " Contribution to Sent";
					resultData["Sent"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "clicks"){
					var contributionTo = columnTitle + " Contribution to Clicks";
					resultData["Clicks"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "unsub"){
					var contributionTo = columnTitle + " Contribution to Unsub";
					resultData["Unsub"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "unsubs"){
					var contributionTo = columnTitle + " Contribution to Unsubs";
					resultData["Unsubs"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "conversions"){
					var contributionTo = columnTitle + " Contribution to Conversions";
					resultData["Conversions"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else if(metricName == "revenue"){
					var contributionTo = columnTitle + " Contribution to Revenue";
					resultData["Revenue"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}
				
				//add the column data
				resultData = smr.addTableColumnData(resultData,rowData,by,reportType);
				
				tableDataInfo.tableData.push(resultData);
			}
			tableDataInfo.smaclass="SMA-REPORT-OVERVIEWPIETABLE";
			brite.display("pieChart",$e.find(".sectionOverviewPie-pie"),tableDataInfo);
		}
	}
	
	function showTableView(by,viewRate,dataAll){
		var view = this;
		var $e = view.$el;
		var sectionOverviewC = $e.bComponent("sectionOverview");
		var reportType = view.reportType;
		var $sectionOverview = $e.find(".sectionOverviewTable-table");
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
			$sectionOverview.html("");
			$sectionOverview.append("<div class='noData'>No Data!</div>");
		}else{
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			$sectionOverview.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			//show summary
			showStatSummaryPart.call(view,by,viewRate,"table",dataSummary);
			//show table
			var tableColumns;
			if(reportType == smr.REPORT_TYPE.BATCH){
				if(viewRate){
					tableColumns = [
		                {name:"Sent",isRate:false},
		                {name:"Delivered",isRate:viewRate},
		                {name:"Opens",isRate:viewRate},
		                {name:"Clicks",isRate:viewRate},
		                {name:"Unsub",isRate:viewRate}
	                ];
					//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
					if(smr.conversionEnabled){
						tableColumns.push({name:"Conversions",isRate:viewRate});
						tableColumns.push({name:"Average Order Value",isRate:false,isConversionSymbol:true});
					}
				}else{
					tableColumns = [
		                {name:"Sent",isRate:false},
		                {name:"Delivered",isRate:viewRate},
		                {name:"Opens",isRate:viewRate},
		                {name:"Clicks",isRate:viewRate},
		                {name:"Unsub",isRate:viewRate}
	                ];
					//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
					if(smr.conversionEnabled){
						tableColumns.push({name:"Conversions",isRate:viewRate});
						tableColumns.push({name:"Revenue",isRate:false,isConversionSymbol:true});
					}
				}
			}else{
				if(viewRate){
					tableColumns = [
		                {name:"Sent",isRate:false},
		                {name:"Delivered",isRate:viewRate},
		                {name:"Opens",isRate:viewRate},
		                {name:"Clicks",isRate:viewRate}
	                ];
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						tableColumns.push({name:"Unsubs",isRate:viewRate});
					}
					//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
					if(smr.conversionEnabled){
						tableColumns.push({name:"Conversions",isRate:viewRate});
						tableColumns.push({name:"Average Order Value",isRate:false,isConversionSymbol:true});
					}
				}else{
					tableColumns = [
		                {name:"Sent",isRate:false},
		                {name:"Delivered",isRate:viewRate},
		                {name:"Opens",isRate:viewRate},
		                {name:"Clicks",isRate:viewRate}
	                ];
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						tableColumns.push({name:"Unsubs",isRate:viewRate});
					}
					//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
					if(smr.conversionEnabled){
						tableColumns.push({name:"Conversions",isRate:viewRate});
						tableColumns.push({name:"Revenue",isRate:false,isConversionSymbol:true});
					}
				}
				
			}
			var tableDataInfo = {
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType,
					maxSize:20
				};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,by);
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData;
					
					if(reportType == smr.REPORT_TYPE.BATCH){
						if(viewRate){
							//By domain breakdown has no unique metrices
							if(_breakDownType == "domain"){
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.rate),
										"Opens" : smr.checkNumber(rowData.opens.rate),
										"Clicks" : smr.checkNumber(rowData.clicks.rate),
										"Unsub" : smr.checkNumber(rowData.unsub.rate)
								};
							}else{
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.rate),
										"Opens" : smr.checkNumber(rowData.opens.uniqueRate),
										"Clicks" : smr.checkNumber(rowData.clicks.uniqueRate),
										"Unsub" : smr.checkNumber(rowData.unsub.uniqueRate)
								};
							}
							
							//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
							if(smr.conversionEnabled){
								resultData["Conversions"] =  smr.checkNumber(rowData.conversions.rate);
								resultData["Average Order Value"] =  smr.checkNumber(rowData.conversions.averageOrderValue);
							}
						}else{
							//By domain breakdown has no unique metrices
							if(_breakDownType == "domain"){
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.count),
										"Opens" : smr.checkNumber(rowData.opens.count),
										"Clicks" : smr.checkNumber(rowData.clicks.count),
										"Unsub" : smr.checkNumber(rowData.unsub.count)
								};
							}else{
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.count),
										"Opens" : smr.checkNumber(rowData.opens.unique),
										"Clicks" : smr.checkNumber(rowData.clicks.unique),
										"Unsub" : smr.checkNumber(rowData.unsub.unique)
								};
							}
							
							//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
							if(smr.conversionEnabled){
								resultData["Conversions"] =  smr.checkNumber(rowData.conversions.count);
								resultData["Revenue"] =  smr.checkNumber(rowData.conversions.revenue);
							}
						}
						
					}else{
						if(viewRate){
							//By domain breakdown has no unique metrices
							if(_breakDownType == "domain"){
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.rate),
										"Opens" : smr.checkNumber(rowData.opens.rate),
										"Clicks" : smr.checkNumber(rowData.clicks.rate)
								};
								if(reportType == smr.REPORT_TYPE.PROGRAM){
									resultData.Unsubs = smr.checkNumber(rowData.unsubs.rate);
								}
							}else{
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.rate),
										"Opens" : smr.checkNumber(rowData.uniqueOpens.rate),
										"Clicks" : smr.checkNumber(rowData.uniqueClicks.rate)
								};
								if(reportType == smr.REPORT_TYPE.PROGRAM){
									resultData.Unsubs = smr.checkNumber(rowData.uniqueUnsubs.rate);
								}
							}
							
							//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
							if(smr.conversionEnabled){
								resultData["Conversions"] =  smr.checkNumber(rowData.conversions.rate);
								resultData["Average Order Value"] =  smr.checkNumber(rowData.conversions.averageOrderValue);
							}
						}else{
							//By domain breakdown has no unique metrices
							if(_breakDownType == "domain"){
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.count),
										"Opens" : smr.checkNumber(rowData.opens.count),
										"Clicks" : smr.checkNumber(rowData.clicks.count)
								};
								if(reportType == smr.REPORT_TYPE.PROGRAM){
									resultData.Unsubs = smr.checkNumber(rowData.unsubs.count);
								}
							}else{
								resultData = {
										"Sent" : smr.checkNumber(rowData.sent.count),
										"Delivered" : smr.checkNumber(rowData.delivered.count),
										"Opens" : smr.checkNumber(rowData.uniqueOpens.count),
										"Clicks" : smr.checkNumber(rowData.uniqueClicks.count)
								};
								if(reportType == smr.REPORT_TYPE.PROGRAM){
									resultData.Unsubs = smr.checkNumber(rowData.uniqueUnsubs.count);
								}
							}
							
							//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
							if(smr.conversionEnabled){
								resultData["Conversions"] =  smr.checkNumber(rowData.conversions.count);
								resultData["Revenue"] =  smr.checkNumber(rowData.conversions.revenue);
							}
						}
					}
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,by,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}	
			var title = smr.buildTitleValue(by);
			tableDataInfo.title="Overview by "+title;
			tableDataInfo.smaclass="SMA-REPORT-OVERVIEWDATATABLE";
			brite.display("dataTable",$e.find(".sectionOverviewTable-table"),tableDataInfo);
		}
	}
	
	function showPivotView(metricName,viewRate,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionOverviewPivot = $e.find(".sectionOverviewPivot-pivot");
		
		if(typeof dataAll == "undefined" || dataAll==null){
			dataAll = {};
		}
		
//		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
//			$sectionOverviewPivot.html("");
//			$sectionOverviewPivot.append("<div class='noData'>No Data!</div>");
//		}else{
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			view.pivotDataSummary = dataSummary;
			
			var metricList = [];
			var rateStuffix = viewRate ?" Rate":"";
			metricList.push({name:"sent",labelName:"Sent"});
			metricList.push({name:"delivered",labelName:"Delivered"+rateStuffix});
			metricList.push({name:"opens",labelName:(viewRate ? "Open Rate" : "Opens")});
			metricList.push({name:"clicks",labelName:(viewRate ? "Click Rate" : "Clicks")});
			
			if(reportType == smr.REPORT_TYPE.BATCH){
				metricList.push({name:"unsub",labelName:"Unsub"+rateStuffix});
			}else if(reportType == smr.REPORT_TYPE.PROGRAM){
				metricList.push({name:"unsub",labelName:(viewRate ? "Unsub Rate" : "Unsubs")});
			}
			
			if(smr.conversionEnabled){
				metricList.push({name:"conversions",labelName:(viewRate ? "Conversion Rate" : "Conversions")});
				if(viewRate){
					metricList.push({name:"averageOrderValue",labelName:"Average Order Value"});
				}else{
					metricList.push({name:"revenue",labelName:"Revenue"});
				}
			}
			$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
			
			showStatSummaryPart.call(view,"",viewRate,"pivot",dataSummary,metricName);
			
			brite.display("pivotTable",$sectionOverviewPivot,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
				metricList:metricList,viewRate:viewRate,metricName:metricName,section:"overview",parentView:view});
//		}
	}
	
	function showSummaryView(by,dataAll){
		var view = this;
		
		showSummaryChartPart.call(view,by,dataAll.data);
		
		showBottomSummaryPart.call(view,by,dataAll.summary);
	}
	
	function showStatSummaryPart(by,viewRate,viewType,data,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $byTitle = $e.find(".byTitle");
		if(viewType == "table" || viewType=="pivot"){
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(by);
			$byTitle.html("Overview by "+title);
		}
		
		var $statsSummary = $e.find(".statsSummary");
		if(typeof data == "undefined" || data==null){
			$statsSummary.html("<div class='noData'>No Data!</div>");
			return;
		}
		by = by || "day";
		viewRate = viewRate || false;
		
		var isClickable = false;
		if(viewType == "pie" || viewType == "bar"){
			if(!viewRate) isClickable = true;
		}
		if(viewType == "pivot"){
			//isClickable = typeof pivotClickable!="undefined" ? pivotClickable :smr.fetchSingleMetric;
			isClickable = false;
		}

		var summaryData = data;
		var stats;
		if(viewType == "pivot"){
			if(viewRate){
				stats = [
							{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isRate:false,isClickable:isClickable},
							{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.deliveryRate),isRate:viewRate,isClickable:isClickable},
							{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.openRate),isRate:viewRate,isClickable:isClickable},
							{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clickRate),isRate:viewRate,isClickable:isClickable}
			  			];
			  	
			  	if(reportType == smr.REPORT_TYPE.BATCH){
			  		stats.push({name:"unsub",label:"Unsub",value:smr.checkNumber(summaryData.unsubRate),isRate:viewRate,isClickable:isClickable});
			  	}else if(reportType == smr.REPORT_TYPE.PROGRAM){
					stats.push({name:"unsub",label:"Unsubs",value:smr.checkNumber(summaryData.unsubRate),isRate:viewRate,isClickable:isClickable});
				}	
			  	
				if(smr.conversionEnabled){
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversionRate),isRate:viewRate,isClickable:isClickable});
					stats.push({name:"averageOrderValue",label:"Average Order Value",value:smr.checkNumber(summaryData.averageOrderValue),isRate:false,isConversionSymbol:true,isClickable:isClickable});
				}
			}else{
				stats = [
							{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isRate:false,isClickable:isClickable},
							{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered),isRate:viewRate,isClickable:isClickable},
							{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens),isRate:viewRate,isClickable:isClickable},
							{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks),isRate:viewRate,isClickable:isClickable}
			  			];
			  	
			  	if(reportType == smr.REPORT_TYPE.BATCH){
			  		stats.push({name:"unsub",label:"Unsub",value:smr.checkNumber(summaryData.unsubs),isRate:viewRate,isClickable:isClickable});
			  	}else if(reportType == smr.REPORT_TYPE.PROGRAM){
					stats.push({name:"unsub",label:"Unsubs",value:smr.checkNumber(summaryData.unsubs),isRate:viewRate,isClickable:isClickable});
				}	
			  	
				if(smr.conversionEnabled){
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions),isRate:viewRate,isClickable:isClickable});
					stats.push({name:"revenue",label:"Revenue",value:smr.checkNumber(summaryData.revenue),isRate:viewRate,isClickable:isClickable,isConversionSymbol:true});
				}
			}
		}else if(reportType == smr.REPORT_TYPE.BATCH){
			if(viewRate){
				//By domain breakdown has no unique metrices
				if(_breakDownType == "domain"){
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.rate),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens.rate),isRate:viewRate,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks.rate),isRate:viewRate,isClickable:isClickable},
								{name:"unsub",label:"Unsub",value:smr.checkNumber(summaryData.unsub.rate),isRate:viewRate,isClickable:isClickable}
				  			];
				}else{
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.rate),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens.uniqueRate),isRate:viewRate,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks.uniqueRate),isRate:viewRate,isClickable:isClickable},
								{name:"unsub",label:"Unsub",value:smr.checkNumber(summaryData.unsub.uniqueRate),isRate:viewRate,isClickable:isClickable}
				  			];
				}
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions.rate),isRate:viewRate,isClickable:isClickable});
					stats.push({name:"averageOrderValue",label:"Average Order Value",value:smr.checkNumber(summaryData.conversions.averageOrderValue),isRate:false,isConversionSymbol:true,isClickable:isClickable});
				}
			}else{
				//By domain breakdown has no unique metrices
				if(_breakDownType == "domain"){
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.count),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens.count),isRate:viewRate,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks.count),isRate:viewRate,isClickable:isClickable},
								{name:"unsub",label:"Unsub",value:smr.checkNumber(summaryData.unsub.count),isRate:viewRate,isClickable:isClickable}
				  			];
				}else{
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.count),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens.unique),isRate:viewRate,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks.unique),isRate:viewRate,isClickable:isClickable},
								{name:"unsub",label:"Unsub",value:smr.checkNumber(summaryData.unsub.unique),isRate:viewRate,isClickable:isClickable}
				  			];
				}
				
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions.count),isRate:viewRate,isClickable:isClickable});
					stats.push({name:"revenue",label:"Revenue",value:smr.checkNumber(summaryData.conversions.revenue),isRate:viewRate,isClickable:isClickable,isConversionSymbol:true});
				}
			}
		}else{
			if(viewRate){
				//By domain breakdown has no unique metrices
				if(_breakDownType == "domain"){
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.rate),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens.rate),isRate:viewRate,isSelectedItem:true,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks.rate),isRate:viewRate,isClickable:isClickable}
				  			];
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						stats.push({name:"unsubs",label:"Unsubs",value:smr.checkNumber(summaryData.unsubs.rate),isRate:viewRate,isClickable:isClickable});
					}
				}else{
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.rate),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.uniqueOpens.rate),isRate:viewRate,isSelectedItem:true,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.uniqueClicks.rate),isRate:viewRate,isClickable:isClickable}
				  			];
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						stats.push({name:"unsubs",label:"Unsubs",value:smr.checkNumber(summaryData.uniqueUnsubs.rate),isRate:viewRate});
					}
				}
				
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions.rate),isRate:viewRate,isClickable:isClickable});
					stats.push({name:"averageOrderValue",label:"Average Order Value",value:smr.checkNumber(summaryData.conversions.averageOrderValue),isRate:false,isConversionSymbol:true,isClickable:isClickable});
				}
			}else{
				//By domain breakdown has no unique metrices
				if(_breakDownType == "domain"){
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.count),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens.count),isRate:viewRate,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks.count),isRate:viewRate,isClickable:isClickable}
				  			];
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						stats.push({name:"unsubs",label:"Unsubs",value:smr.checkNumber(summaryData.unsubs.count),isRate:viewRate,isClickable:isClickable});
					}
				}else{
					stats = [
								{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent.count),isRate:false,isClickable:isClickable},
								{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered.count),isRate:viewRate,isClickable:isClickable},
								{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.uniqueOpens.count),isRate:viewRate,isClickable:isClickable},
								{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.uniqueClicks.count),isRate:viewRate,isClickable:isClickable}
				  			];
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						stats.push({name:"unsubs",label:"Unsubs",value:smr.checkNumber(summaryData.uniqueUnsubs.count),isRate:viewRate,isClickable:isClickable});
					}
				}
				
				//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
				if(smr.conversionEnabled){
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions.count),isRate:viewRate,isClickable:isClickable});
					stats.push({name:"revenue",label:"Revenue",value:smr.checkNumber(summaryData.conversions.revenue),isRate:viewRate,isClickable:isClickable,isConversionSymbol:true});
				}
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
	
	function showSummaryChartPart(by,data){
		var view = this;
		var $e = view.$el;
		var $container = $e.find(".sectionOverviewSummary-chart .chart-content");
		if(typeof data == "undefined"){
			$container.html("");
			$container.append("<div class='noData'>No Data!</div>");
		}else{
			by = by || "day";

			//clear container
			$container.empty();
			$container.append("<div class='fstCon'></div><div class='secCon'></div>");
			
			//init series
			var openObj = {
				name: "Open Rate",
				data: [],
				color: "#6cc927"
			};
			var clickObj = {
				name: "Click Rate",
				data: [],
				color: "#189fc6"
			};
			
			var deliveredObj = {
				name: "Delivered",
				data: [],
				color: {
			        linearGradient: ["0%", "0%", "0%", "100%"],
			        stops: [
	                    [0, '#C5EFFC'],
	                    [1, '#1FA0C9']
	                ]
			    },
			    borderColor:"#0d9ac5"
			};
			
			var failedObj = {
					name: "Failed",
					data: [],
					color: {
				        linearGradient: ["0%", "0%", "0%", "100%"],
				        stops: [
		                    [0, '#FF6965'],
		                    [1, '#AA4643']
		                ]
				    },
				    borderColor:"#6E2D2B"
			};
			
			var categories = [];
			if(view.reportType == smr.REPORT_TYPE.BATCH){
				for (var i = 0; i < data.length; i++) {
					categories.push(data[i].date);
					openObj.data.push(smr.checkNumber(data[i].opens.uniqueRate));
					clickObj.data.push(smr.checkNumber(data[i].clicks.uniqueRate));
					deliveredObj.data.push(smr.checkNumber(data[i].delivered.count));
					failedObj.data.push(smr.checkNumber(data[i].failed.count));
				}
			}else{
				for (var i = 0; i < data.length; i++) {
					categories.push(data[i].date);
					openObj.data.push(smr.checkNumber(data[i].uniqueOpens.rate));
					clickObj.data.push(smr.checkNumber(data[i].uniqueClicks.rate));
					deliveredObj.data.push(smr.checkNumber(data[i].delivered.count));
					failedObj.data.push(smr.checkNumber(data[i].failed.count));
				}
			}
			
			
			//the first chart
			var fstChart = new Highcharts.Chart({
				chart: {
					renderTo: $container.find('.fstCon').get(0),
					defaultSeriesType: 'line',
					height: 150,
					marginLeft: 60,
					marginRight: 60,
					spacingTop:0,
					spacingBottom:6,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: "Open & Click Rates",
					align: 'left',
					x:50,
					margin:0,
					style : {
						color: '#303030',
						fontSize: '10.5pt',
						fontWeight: 'bold',
						fontFamily: 'Arial'
					}
				},
				xAxis: {
					categories:categories,
					gridLineWidth:1,
					gridLineColor:'#cccccc',
					tickWidth: 0,
					title: {
						text: null
					},
					labels: {
						enabled: false,
						rotation: 325,
						x: -1,
						y: 28
					}
				},
				yAxis: {
					lineWidth: 1,
					gridLineWidth:1,
					gridLineColor:'#e6e6e6',
					title: {
						text: null
					},
					labels:{
						formatter:function() {
							var showVal = smr.formatNumber(this.value,"short");
							showVal = showVal + "%";
							return showVal;
						}
					},
					min:0
				},
				credits: {
					enabled: false
				},
				tooltip: {
			        formatter: function() {
						var yVal = this.y;
						var val = (yVal >= 10) ? Highcharts.numberFormat(yVal, 1) : Highcharts.numberFormat(yVal, 2);
						yVal = val + "%";
			            return '<span>' + this.x + '</span><br/>' + '<span>' + this.series.name + ': <b>' + yVal + '</b></span>';
			        }
			    },
				plotOptions: {
					line: {
						marker: {
							enabled:true,
							symbol:'circle',
							lineColor: '#FFFFFF',
				            lineWidth: 2
						}
					}
				},
				legend: {
					verticalAlign: 'top',
					borderWidth: 0,
					symbolWidth: 30,
					x:-20,
					y:-2
				},
				series: [openObj, clickObj]
			});
			
			//the second chart
			var secChart = new Highcharts.Chart({
				chart: {
					renderTo: $container.find('.secCon').get(0),
					defaultSeriesType: 'column',
					height: 130,
					marginLeft: 60,
					marginRight: 60,
					spacingTop:0,
					spacingBottom:6,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: "Delivered & Failed",
					align: 'left',
					margin:9,
					x:50,
					style : {
						color: '#303030',
						fontSize: '10.5pt',
						fontWeight: 'bold',
						fontFamily: 'Arial'
					}
				},
				xAxis: {
					categories:categories,
					gridLineWidth:1,
					gridLineColor:'#cccccc',
					tickLength:0,
					title: {
						text: null
					},
					labels: {
						rotation: 325,
						step:Math.ceil(categories.length / 31),
						x: -1,
						y: 20,
						formatter:function() {
							var date = this.value;
							if(by == "day" || by == "week"){
								if(this.value!=0){
									date = smr.formatDate(smr.parseDate(this.value),"MM-dd")
								}else{
									date = "null";
								}
							}
							return date;
						}
					}
				},
				yAxis: {
					lineWidth: 1,
					gridLineWidth:1,
					gridLineColor:'#e6e6e6',
					title: {
						text: null,
						rotation: 0,
						x: 0
					},
					labels:{
						formatter:function() {
							return smr.formatNumber(this.value,"short");
						}
					},
					min:0
				},
				credits: {
					enabled: false
				},
				tooltip: {
			        formatter: function() {
			            return '<span>' + this.x + '</span><br/>' + '<span>' + this.series.name + ': <b>' + smr.formatNumber(this.y) + '</b></span>';
			        }
			    },
				plotOptions: {
					column: {
						borderRadius: 2,
						stacking: 'normal'
					}
				},
				legend: {
					enabled: false
				},
				series: [failedObj,deliveredObj]
			});
			
			//here re-draw the chart if the chart width not match the content  
			var containerWidth = $container.find(".fstCon").width();
			var containerChartWidth = $container.find(".fstCon .highcharts-container").width();
			var diffValue = containerWidth - containerChartWidth;
			if(diffValue > 5 && !view.reDraw){
				view.showView(view.viewName,_viewBy);
				view.reDraw = true;
			}
		}
		
	}
	
	function showBottomSummaryPart(by,data){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $summary = $e.find(".sectionOverviewSummary-summary");
		var $table = $summary.find("table");
		var $funnel = $e.find(".sectionOverviewSummary-funnel");
		
		if(typeof data == "undefined"){
			$funnel.html("");
			$funnel.append("<div class='noData'>No Data!</div>");
		}else{
			//first init
			$table.find("tr:not(:first)").remove();
			$funnel.children(":not(.spanTitle)").remove();
			by = by || "day";

			//show table
			var tableData = getTableData(data,reportType);
			var barBreak = false;
			var rateBreak = false;
			var barValues = [];
			for(var i=0 ; i<tableData.length; i++){
				var summaryObj = tableData[i];
				if(!barBreak && !summaryObj.isBar){
					var $tr = smr.render("tmpl-sectionOverviewSummary-summary-breakTr-tr",{});
					$table.append($tr);
					barBreak = true;
				}
				if(reportType == smr.REPORT_TYPE.BATCH || reportType == smr.REPORT_TYPE.PROGRAM){
					if(!rateBreak && summaryObj.label == "Unsub"){
						//brite.log.info(summaryObj);
						var $tr = smr.render("tmpl-sectionOverviewSummary-summary-breakTr-tr",{});
						$table.append($tr);
						rateBreak = true;
					}
				}else{
					if(!rateBreak && summaryObj.label == "Complaints"){
						//brite.log.info(summaryObj);
						var $tr = smr.render("tmpl-sectionOverviewSummary-summary-breakTr-tr",{});
						$table.append($tr);
						rateBreak = true;
					}
				}
				var showName = false;
				if(summaryObj.name == "unsub" || summaryObj.name == "unsubs" || summaryObj.name == "complaints" || summaryObj.name == "clickToOpen"){
					showName = true;
				}
				var $tr = smr.render("tmpl-sectionOverviewSummary-summary-tr",{summaryObj:summaryObj, reportType:reportType, conversionCurrency:smr.conversionCurrency, showName:showName});
				$table.append($tr);
				
				if(summaryObj.isRate == false){
					$td = $table.find("tr[data-metric='"+summaryObj.name+"'] td.rate");
					//show bottom item
					var clickToOpenValue = smr.checkNumber(data.clickToOpen.uniqueRate);
					var clickToOpen = {label:"Click-To-Open",value:clickToOpenValue+"%",metric:"clickToOpen"};
					var $clickToOpen = smr.render("tmpl-sectionOverviewSummary-funnel-item",clickToOpen);
					$td.append($clickToOpen);
					
					var convertToClickValue = smr.checkNumber(data.convertToClick.rate);
					var convertToClick = {label:"Convert-To-Click",value:convertToClickValue+"%",metric:"convertToClick"};
					var $convertToClick = smr.render("tmpl-sectionOverviewSummary-funnel-item",convertToClick);
					$td.append($convertToClick);
				}
				
				if(summaryObj.isBar){
					barValues.push({name:summaryObj.name,value:summaryObj.value});
				}
			}
			
			if(brite.ua.hasCanvas()){
				for(var i = 0; i < barValues.length; i++){
					if(i + 1 == barValues.length){
						barValues[i].value2 = 0;
					}else{
						barValues[i].value2 = barValues[i+1].value;
					}
					drawBar($table,barValues[i]);
				}
			}
			
			//event
			var reportComponent = $e.bComponent("report");
			$summary.find("table").delegate("td .metric","click",function(){
				var $metric = $(this);
				var metric = $(this).attr("data-metric");
				if(metric == "sent"){
					reportComponent.setSectionAndView("sectionVolume",null,{metric:metric});
				}else if(metric == "delivered"){
					reportComponent.setSectionAndView("sectionFailures",null,{metric:metric});
				}else if(metric == "clicks" || metric == "opens" || metric == "clickToOpen"){
					reportComponent.setSectionAndView("sectionEngagement",null,{metric:metric});
				}else if(metric == "unsub" || metric == "unsubs" || metric == "complaints"){
					reportComponent.setSectionAndView("sectionDisEngagement",null,{metric:metric});
				}else if(metric == "revenue" || metric == "conversions" || metric == "convertToClick"){
					reportComponent.setSectionAndView("sectionConversions",null,{metric:metric});
				}else{
					alert("Not Implement yet");
				}
			});
			
		}	
	}
	
	// --------- Helper Functions ---------- //	
	function getTableData(data,reportType){
		var batchTableNames = [];
		//only when conversionEnabled=true,should show Conversions and Revenue
		if(smr.conversionEnabled){
			batchTableNames = [
			   				{label:'Sent',name:'sent',isBar:true,clickable:true},
			   				{label:'Delivered',name:'delivered',isBar:true,clickable:true},
			   				{label:'Opens',name:'opens',isBar:true,clickable:true,uniqueOn:true},
			   				{label:'Clicks',name:'clicks',isBar:true,clickable:true,uniqueOn:true},
			   				{label:'Conversions',name:'conversions',isBar:true,clickable:true},
			   				{label:'Revenue',name:'revenue',isRate:false,clickable:true,isConversionSymbol:true},
			   				{label:'Unsub',name:'unsub',uniqueOn:true,clickable:true},
			   				{label:'Complaints',name:'complaints',uniqueOn:true,clickable:true}
			     		];
		}else{
			batchTableNames = [
			   				{label:'Sent',name:'sent',isBar:true,clickable:true},
			   				{label:'Delivered',name:'delivered',isBar:true,clickable:true},
			   				{label:'Opens',name:'opens',isBar:true,clickable:true,uniqueOn:true},
			   				{label:'Clicks',name:'clicks',isBar:true,clickable:true,uniqueOn:true},
			   				{label:'Click-To-Open',name:'clickToOpen',clickable:true,uniqueOn:true},
			   				{label:'Unsub',name:'unsub',uniqueOn:true,clickable:true},
			   				{label:'Complaints',name:'complaints',uniqueOn:true,clickable:true}
			     		];
		}
		//only when conversionEnabled=true,should show Conversions and Revenue
		var transactionalTableNames = [];
		if(smr.conversionEnabled){
			transactionalTableNames = [
	           				{label:'Sent',name:'sent',isBar:true,clickable:true},
	           				{label:'Delivered',name:'delivered',isBar:true,clickable:true},
	           				{label:'Opens',name:'opens',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Clicks',name:'clicks',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Conversions',name:'conversions',isBar:true,clickable:true},
			   				{label:'Revenue',name:'revenue',isRate:false,clickable:true,isConversionSymbol:true},
	           				//{label:'Unsub',name:'unsubs',uniqueOn:true,clickable:true},
	           				{label:'Complaints',name:'complaints',uniqueOn:true,clickable:true}
	           		];
		}else{
			transactionalTableNames = [
	           				{label:'Sent',name:'sent',isBar:true,clickable:true},
	           				{label:'Delivered',name:'delivered',isBar:true,clickable:true},
	           				{label:'Opens',name:'opens',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Clicks',name:'clicks',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Click-To-Open',name:'clickToOpen',clickable:true,uniqueOn:true},
	           				//{label:'Unsub',name:'unsubs',uniqueOn:true,clickable:true},
	           				{label:'Complaints',name:'complaints',uniqueOn:true,clickable:true}
	           		];
		}
		
		//only when conversionEnabled=true,should show Conversions and Revenue
		var programTableNames = [];
		if(smr.conversionEnabled){
			programTableNames = [
	           				{label:'Sent',name:'sent',isBar:true,clickable:true},
	           				{label:'Delivered',name:'delivered',isBar:true,clickable:true},
	           				{label:'Opens',name:'opens',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Clicks',name:'clicks',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Conversions',name:'conversions',isBar:true,clickable:true},
			   				{label:'Revenue',name:'revenue',isRate:false,clickable:true,isConversionSymbol:true},
	           				{label:'Unsub',name:'unsubs',uniqueOn:true,clickable:true},
	           				{label:'Complaints',name:'complaints',uniqueOn:true,clickable:true}
	           		];
		}else{
			programTableNames = [
	           				{label:'Sent',name:'sent',isBar:true,clickable:true},
	           				{label:'Delivered',name:'delivered',isBar:true,clickable:true},
	           				{label:'Opens',name:'opens',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Clicks',name:'clicks',isBar:true,clickable:true,uniqueOn:true},
	           				{label:'Click-To-Open',name:'clickToOpen',clickable:true,uniqueOn:true},
	           				{label:'Unsub',name:'unsubs',uniqueOn:true,clickable:true},
	           				{label:'Complaints',name:'complaints',uniqueOn:true,clickable:true}
	           		];
		}

		var tableNames = batchTableNames;
		if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			tableNames = transactionalTableNames;
		}else if(reportType == smr.REPORT_TYPE.PROGRAM){
			tableNames = programTableNames;
		}
		
		var tableData = [];
		for(var i=0; i<tableNames.length; i++){
			var obj = "";
			var summaryObj = $.extend({},tableNames[i]);
			if(summaryObj.uniqueOn){
				var objName = tableNames[i].name;
				if(objName == "clickToOpen"){
					obj = data[objName];
					summaryObj.count = "";
					summaryObj.value = smr.checkNumber(obj.uniqueRate);
				}else{
					if(reportType == smr.REPORT_TYPE.BATCH){
						obj = data[objName];
						summaryObj.count = smr.formatNumber(obj.unique);
						summaryObj.value = smr.checkNumber(obj.uniqueRate);
					}else{
						var uName = "unique" + objName.substring(0,1).toUpperCase() + objName.substring(1);
						obj = data[uName];
						summaryObj.count = smr.formatNumber(obj.count);
						summaryObj.value = smr.checkNumber(obj.rate);
					}
				}
				
			}else{
				//right now in the new data format,we did not have revenue,it have put into the conversions
				if(summaryObj.name == "revenue"){
					obj = data["conversions"];
					summaryObj.count = smr.formatNumber(obj.revenue);
					summaryObj.value = null;
				}else{
					obj = data[tableNames[i].name];
					summaryObj.count = smr.formatNumber(obj.count);
					summaryObj.value = smr.checkNumber(obj.rate);
				}
			}
			if(summaryObj.name == "sent"){
				summaryObj.value = 100;
			}
			//FIXME for now, just use i to test up or down
			summaryObj.upOrDown = i % 2 ? true : false;
			
			if(summaryObj.value != null){
				summaryObj.rate = summaryObj.value + "%";
			}else{
				summaryObj.rate = "";
			}
			
			tableData.push(summaryObj);
		}
		
		return tableData;
	}	
	
	function drawBar($table,metric){
		var $tr = $table.find("tr[data-metric='"+metric.name+"']");
		var $bar = $tr.find(".funnel-bar .bar");
		$bar.append("<canvas width=0 height=0 ></canvas>");
		$bar.css("width","100%");
		var gtx = brite.gtx($bar.find("canvas"));
		gtx.fitParent();
		var width = gtx.canvas().width;
		var height = gtx.canvas().height;
		var gradient = gtx.createLinearGradient(0, 5, width, 5);
	    gradient.addColorStop(0.0, "#B7E7F6");
	    gradient.addColorStop(0.5, "#38AACD");
	    gradient.addColorStop(1.00, "#B7E7F6");
	    var maxLeft = 1;
	    var left1 = width * (1 - metric.value/100) / 2 + 1;
	    var left2 = width * (1 - metric.value2/100) / 2;
	    if(left1 > width - 1 - left1 ){
	    	left1 = width/2 - maxLeft;
	    }
	    if(left2 > width - 1 - left2 ){
	    	left2 = width/2 - maxLeft;
	    }
	    
		gtx.beginPath();
		gtx.moveTo(left1, 1);
		gtx.lineTo(left2, height-1);
		gtx.lineTo(width - 1 - left2 ,height-1);
		gtx.lineTo(width - 1 - left1 ,1);
		gtx.closePath();
		gtx.fillStyle(gradient);
		gtx.lineWidth(2);
		gtx.strokeStyle("#0e9ac5");
		gtx.stroke();
		gtx.fill();
	}
	// --------- /Helper Functions ---------- //
	// --------- /Component Private Methods --------- //

    // --------- Component Registration --------- //
    brite.registerView("sectionOverview", {
            emptyParent : true
        },
        function () {
            return new smr.SectionOverview();
        });
    // --------- Component Registration --------- //
	
})(jQuery);
