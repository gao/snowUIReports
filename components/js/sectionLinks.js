var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var dataType = "clicks";
	// --------- /Component Private Properties --------- //
	
    // --------- Component Interface Implementation ---------- //
	function SectionLinks(){}
	smr.SectionLinks = SectionLinks; 
  
	SectionLinks.prototype.create = function(data,config){
		return smr.render("tmpl-sectionLinks",{});
	};
		
	SectionLinks.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		var viewType = data.view || "table";
		
		view.metricName = data.metricName || "totalClicks";
		var metricName = view.metricName = data.metricName || view.metricName;
		
		dataType = $e.closest(".report").find(".reportHeader-subSectionCombobox .combobox .default").attr("data-value");
		if(typeof dataType == 'undefined'){
			dataType = "clicks";
		}else if(dataType != "clicks" && dataType != "conversions"){
			dataType = "clicks";
		}
		
		if(dataType == "conversions"){
			view.metricName = "conversionCount";
			metricName = view.metricName;
		}
		
		view.dataType = dataType;
		view.viewType = viewType;
		view.dynamicContentVal = false;
		
		//show the Dynamic Content Selector
		if(dataType == "clicks"){
			$e.closest(".report").find(".reportHeader-dynamicContentSelector").show();
			var $dynamicContentSelector = $e.closest(".report").find(".reportHeader-dynamicContentSelector input[type='checkbox']");
			view.dynamicContentVal = $dynamicContentSelector.attr("checked") ? true : false;
		}else{
			$e.closest(".report").find(".reportHeader-dynamicContentSelector").hide();
		}

		//show summary and view
		showSummaryAndViewData.call(view,dataType,viewType,metricName,view.dynamicContentVal);
	};
	
	SectionLinks.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for subSection change
			"REPORTHEADER_SUBSECTION_CHANGE" : reportHeaderSubSectionChangeMethod,
			
			//event for dynamic content change
			"REPORTHEADER_DYNAMICCONTENT_CHANGE" : reportHeaderDynamicContentChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod
		}
	};
	
	SectionLinks.prototype.destroy = function(){
		var $report = this.$el.closest(".report");
		$report.find(".reportHeader-dynamicContentSelector").hide();
	}
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;
		view.viewType = viewName;
			
		showSummaryAndViewData.call(view,view.dataType,view.viewType,view.metricName,view.dynamicContentVal);
		extra.complete = true;
	}
	
	function reportHeaderSubSectionChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-subSectionCombobox .combobox").attr("data-value");
		dataType = val;
		if(dataType == "conversions"){
			view.metricName = "conversionCount";
			$e.closest(".report").find(".reportHeader-dynamicContentSelector").hide();
		}else{
			view.metricName = "totalClicks"
			$e.closest(".report").find(".reportHeader-dynamicContentSelector").show();
		}
			
		view.dataType = dataType;
		showSummaryAndViewData.call(view,dataType,view.viewType,view.metricName,view.dynamicContentVal);
	}
	
	function reportHeaderDynamicContentChangeMethod(event,extra){
		var view = this;
		var dynamicContentVal = extra.value;
		view.dynamicContentVal = dynamicContentVal;
		showSummaryAndViewData.call(view,dataType,view.viewType,view.metricName,view.dynamicContentVal);
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
		var view = this;
		var metric = extra.metricName;
		view.metricName = metric;
		showSummaryAndViewData.call(view,view.dataType,view.viewType,metric,view.dynamicContentVal);
	}
	// --------- events --------- //
	
    // --------- /Component Interface Implementation ---------- //
    

    // --------- Component Public API --------- //	
	SectionLinks.prototype.getAllData = function(dataType){
		var dfd = $.Deferred();
		var view = this;
		var reportType = view.reportType;
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		if(dataType == "clicks"){
			smr.getSummary(reportType,"links","",view.isNewRequest,null,null,view.dynamicContentVal).done(function(data){
				var dataSet = {};
				if(data.items!=null){
					dataSet = data.items[0];
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}else{
			smr.getSummary(reportType,"linksConversion","",view.isNewRequest).done(function(data){
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
    // --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	function showSummaryAndViewData(dataType,viewType,metricName,dynamicContentVal){
		var view = this;
		var $e = view.$el;
		
		view.getAllData(dataType).done(function(dataAll){
			showSummary.call(view,dataAll,dataType,viewType,metricName);
			showData.call(view,dataAll,dataType,viewType,metricName,dynamicContentVal);
		});
	}
	
	function showSummary(data,dataType,viewType,metricName){
		var view = this;
		var $e = view.$el;
		var summaryData = data;
		var $statsSummary = $e.find(".statsSummary");
		
		if(typeof summaryData == "undefined"){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var isClickable = false;
			if(viewType == "pie" || viewType == "bar"){
				isClickable = true;
			}

			var stats = [];
			if(dataType == "clicks"){
				if(view.dynamicContentVal){
					stats = [
						{name:"uniqueClicks",label:"Unique Clicks",value:smr.checkNumber(summaryData.totalUniqueClicks),isClickable:isClickable},
						{name:"uniqueClicks",label:"Unique Click Rate",value:(summaryData.totalUniqueClickRate == -1 ? "N/A" : smr.checkNumber(summaryData.totalUniqueClickRate)),isRate:true},
		             	{name:"totalClicks",label:"Clicks",value:smr.checkNumber(summaryData.totalClicks),isClickable:isClickable},
						{name:"totalClicks",label:"Click Rate",value:(summaryData.totalClickRate == -1 ? "N/A" : smr.checkNumber(summaryData.totalClickRate)),isRate:true}		
		  			];
				}else{
					stats = [
						{name:"uniqueClicks",label:"Unique Clicks",value:smr.checkNumber(summaryData.totalUniqueClicks),isClickable:isClickable},
						{name:"uniqueClicks",label:"Unique Click Rate",value:smr.checkNumber(summaryData.totalUniqueClickRate),isRate:true},
		             	{name:"totalClicks",label:"Clicks",value:smr.checkNumber(summaryData.totalClicks),isClickable:isClickable},
						{name:"totalClicks",label:"Click Rate",value:smr.checkNumber(summaryData.totalClickRate),isRate:true}		
		  			];
				}
				
			}else{
				stats = [
				    {name:"conversionCount",label:"Coversions",value:smr.checkNumber(summaryData.totalConversionCount),isClickable:isClickable},
				    {name:"covertToClicks",label:"Convert-to-Click",value:smr.checkNumber(summaryData.totalConversionToClickRate),isRate:true},
				    {name:"revenues",label:"Revenue",value:smr.checkNumber(summaryData.totalRevenue),isClickable:isClickable,isConversionSymbol:true},
				    {name:"averageOrderValue",label:"Average Order Value",value:smr.checkNumber(summaryData.totalAverageOrderValue),isClickable:isClickable,isConversionSymbol:true},
				    {name:"items",label:"Items",value:smr.checkNumber(summaryData.totalItems),isClickable:isClickable}
	  			];
			}
			
			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}

			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType,skipSortMetrics:true});
		}
	}
	
	function showData(data,dataType,viewType,metricName,dynamicContentVal){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $links = $e.find(".sectionLinks-view");
		
		if(typeof data == "undefined"){
			$links.html("");
			$links.append("<div class='noData'>No Data!</div>");
		}else{
			$links.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var dataSet = "";
			var resultData = [];
			if(dataType == "clicks"){
				dataSet = data.namedLinkList;
				var dropDownListVal = [
		   		            {name:"totalClicks",labelName:"Clicks"},
		   					{name:"uniqueClicks",labelName:"Unique Clicks"}
		   		         ];
			}else{
				dataSet = data.conversionDataList;
				var dropDownListVal = [
		   		            {name:"conversionCount",labelName:"Coversions"},
		   		            {name:"revenues",labelName:"Revenue"},
		   		            {name:"averageOrderValue",labelName:"Average Order Value"},
		   		            {name:"items",labelName:"Items"}
		   		         ];
			}

			for(var i=0; i<dataSet.length;i++){
				resultData.push(dataSet[i]);
			}
			
			if(viewType == "table"){
				var tableColumns = [];
				var tableDataInfo ={
						tableData:[],
						reportType:reportType,
						maxSize:12
				};
				if(view.reportType != smr.REPORT_TYPE.PROGRAM){
					tableDataInfo.maxSize = 16;
				}
				if(dataType == "clicks"){
					tableColumns.push({name:"Link Name",label:"Link Name",haveTitle:true});
					tableColumns.push({name:"Mailing Name",label:"Mailing Name",showHoverBox:true,isAlignLeft:true});
					if(reportType==smr.REPORT_TYPE.PROGRAM){
						tableColumns.push({name:"Program Name",label:"Program Name",isAlignLeft:true});
					}
					tableColumns.push({name:"Type",label:"Type",isAlignLeft:true});
					if(dynamicContentVal){
						tableColumns.push("Insertions");
					}
					tableColumns.push("Unique Clicks");
					tableColumns.push({name:"Rate",label:"Unique Rate",isRate:true});
					tableColumns.push("Total Clicks");
					tableColumns.push({name:"Rate",label:"Click Rate",isRate:true});
					tableColumns.push({name:"Rate",label:"% of Clicks",isRate:true});
				}else{
					tableColumns.push({name:"Link Name",label:"Link Name",haveTitle:true});
					tableColumns.push({name:"Mailing Name",label:"Mailing Name",showHoverBox:true,isAlignLeft:true});
					if(reportType==smr.REPORT_TYPE.PROGRAM){
						tableColumns.push({name:"Program Name",label:"Program Name",isAlignLeft:true});
					}
					tableColumns.push({name:"Conversion",label:"Conversions"});
					tableColumns.push({name:"Rate",label:"Convert To Click",isRate:true});
					tableColumns.push({name:"Revenues",label:"Revenue"});
					tableColumns.push("Average Order Value");
					tableColumns.push("Total Items");
				}
				tableDataInfo.tableColumns = tableColumns;
				

				for(var i = 0; i < resultData.length; i++){
					var rowData = resultData[i];
					if(rowData){
						var resultDataRow = {};
						if(dataType == "clicks"){
							resultDataRow ={
								"Link Name" : rowData.linkName,
								"Mailing Name" : {value:rowData.mailingName,mailingId:rowData.mailingId},
								"Program Name" : rowData.program?rowData.program:"no name",
								"Type" : rowData.templateType,
								"Total Clicks" : smr.checkNumber(rowData.totalClicks),
								"Unique Clicks" : smr.checkNumber(rowData.uniqueClicks),
								"% of Clicks" : smr.formatDivisionNumber(rowData.totalClicks,data.totalClicks)*100,
								"Link Name Title" : "URL:"+rowData.linkUrl,
								"Subject" : rowData.mailingSubject
							};
							if(dynamicContentVal){
								var insertionCount = smr.checkNumber(rowData.insertionCount);
								if(insertionCount != 0 && insertionCount != -1){
									resultDataRow["Insertions"] = insertionCount;
									resultDataRow["Click Rate"] = smr.formatDivisionNumber(rowData.totalClicks,insertionCount)*100;
									resultDataRow["Unique Rate"] = smr.formatDivisionNumber(rowData.uniqueClicks,insertionCount)*100;
								}else{
									resultDataRow["Insertions"] = "N/A";
									resultDataRow["Click Rate"] = "N/A";
									resultDataRow["Unique Rate"] = "N/A";
								}
							}else{
								resultDataRow["Click Rate"] = smr.checkNumber(rowData.clickRate);
								resultDataRow["Unique Rate"] = smr.checkNumber(rowData.uniqueClicksRate);
							}
						}else{
							resultDataRow ={
								"Link Name" : rowData.linkName,
								"Mailing Name" : {value:rowData.mailingName,mailingId:rowData.mailingId},
								"Program Name" : rowData.program?rowData.program:"no name",
								"Conversions" : smr.checkNumber(rowData.conversionCount),
								"Convert To Click" : smr.checkNumber(rowData.covertToClicks),
								"Revenue" : smr.checkNumber(rowData.revenue),
								"Average Order Value" : smr.checkNumber(rowData.averageOrderValue),
								"Total Items" : smr.checkNumber(rowData.items),
								"Link Name Title" : "URL:"+rowData.linkUrl,
								"Subject" : rowData.mailingSubject
							};
						}
						
						tableDataInfo.tableData.push(resultDataRow);
					}
				}
				//check whether need to do sortMetrics
				tableDataInfo.skipSortMetrics = true;
				tableDataInfo.smaclass="SMA-REPORT-LINKSDATATABLE";
				brite.display("dataTable",$links,tableDataInfo);
				
			}else if(viewType == "bar"){
				var tableColumns = [];
				
				if(dataType == "clicks"){
					if(metricName == "totalClicks"){
						tableColumns.push({name:"Link Name",label:"Link Name",haveTitle:true});
						if(dynamicContentVal){
							tableColumns.push("Insertions");
						}
						tableColumns.push({name:"totalClicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal});
						tableColumns.push({name:"rate",label:"Link Contribution to Clicks",isBarChart:true,isRate:true});
					}else if(metricName == "uniqueClicks"){
						tableColumns.push({name:"Link Name",label:"Link Name",haveTitle:true});
						if(dynamicContentVal){
							tableColumns.push("Insertions");
						}
						tableColumns.push({name:"uniqueClicks",label:"Unique Clicks",isDropDown:true,dropDownList:dropDownListVal});
						tableColumns.push({name:"rate",label:"Link Contribution to Unique Clicks",isBarChart:true,isRate:true});
					}
				}else{
					if(metricName == "conversionCount"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",haveTitle:true},
					                {name:"Conversion",label:"Conversions",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"Link Contribution to Conversions",isBarChart:true,isRate:true}
					              ];
					}else if(metricName == "revenues"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",haveTitle:true},
					                {name:"revenues",label:"Revenue",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"Link Contribution to Revenue",isBarChart:true,isRate:true}
					              ];
					}else if(metricName == "averageOrderValue"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",haveTitle:true},
					                {name:"averageOrderValue",label:"Average Order Value",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"Link Contribution to Average Order Value",isBarChart:true,isRate:true}
					              ];
					}else if(metricName == "items"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",haveTitle:true},
					                {name:"items",label:"Items",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"Link Contribution to Items",isBarChart:true,isRate:true}
					              ];
					}
				}
				
				var tableDataInfo ={
					tableColumns: tableColumns,
				    tableData:[]
				};
				 
				for(var i = 0; i < resultData.length; i++){
					var rowData = resultData[i];
					if(rowData){
						var resultDataRow = {};
						var percentChange = "";
						
						if(dataType == "clicks"){
							if(metricName == "totalClicks"){
								percentChange = smr.formatDivisionNumber(rowData.totalClicks,data.totalClicks)*100;
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Clicks" : smr.checkNumber(rowData.totalClicks),
										"Link Contribution to Clicks" : percentChange
									};
							}else if(metricName == "uniqueClicks"){
								percentChange = smr.formatDivisionNumber(rowData.uniqueClicks,data.totalUniqueClicks)*100;
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Unique Clicks" : smr.checkNumber(rowData.uniqueClicks),
										"Link Contribution to Unique Clicks" : percentChange
									};
							}
							if(dynamicContentVal){
								var insertionCount = smr.checkNumber(rowData.insertionCount);
								if(insertionCount != 0 && insertionCount != -1){
									resultDataRow["Insertions"] = insertionCount;
								}else{
									resultDataRow["Insertions"] = "N/A";
								}
							}
						}else{
							if(metricName == "conversionCount"){
								percentChange = smr.formatDivisionNumber(rowData.conversionCount,data.totalConversionCount)*100;
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Conversions" : smr.checkNumber(rowData.conversionCount),
										"Link Contribution to Conversions" : percentChange
									};
							}else if(metricName == "revenues"){
								percentChange = smr.formatDivisionNumber(rowData.revenue,data.totalRevenue)*100;
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Revenue" : smr.checkNumber(rowData.revenue),
										"Link Contribution to Revenue" : percentChange
									};
							}else if(metricName == "averageOrderValue"){
								percentChange = smr.formatDivisionNumber(rowData.averageOrderValue,data.totalAverageOrderValue)*100;
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Average Order Value" : smr.checkNumber(rowData.averageOrderValue),
										"Link Contribution to Average Order Value" : percentChange
									};
							}else if(metricName == "items"){
								percentChange = smr.formatDivisionNumber(rowData.items,data.totalItems)*100;
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Items" : smr.checkNumber(rowData.items),
										"Link Contribution to Items" : percentChange
									};
							}
						}
						
						tableDataInfo.tableData.push(resultDataRow);
					}
				}
				//check whether need to do sortMetrics
				tableDataInfo.skipSortMetrics = true;
				tableDataInfo.smaclass="SMA-REPORT-LINKSBARTABLE";
				brite.display("barChart",$links,{tableDataInfo:tableDataInfo});
				
			}else if(viewType == "pie"){
				var tableColumns = [];
				
				if(dataType == "clicks"){
					if(metricName == "totalClicks"){
						tableColumns.push({name:"Link Name",label:"Link Name",isDate:true,haveTitle:true});
						if(dynamicContentVal){
							tableColumns.push("Insertions");
						}
						tableColumns.push({name:"totalClicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal});
						tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
						tableColumns.push({name:"rate",label:"Link Contribution to Clicks",isPieChart:true,sortable:false});
					}else if(metricName == "uniqueClicks"){
						tableColumns.push({name:"Link Name",label:"Link Name",isDate:true,haveTitle:true});
						if(dynamicContentVal){
							tableColumns.push("Insertions");
						}
						tableColumns.push({name:"uniqueClicks",label:"Unique Clicks",isDropDown:true,dropDownList:dropDownListVal});
						tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
						tableColumns.push({name:"rate",label:"Link Contribution to Unique Clicks",isPieChart:true,sortable:false});
					}
				}else{
					if(metricName == "conversionCount"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",isDate:true,haveTitle:true},
					                {name:"Conversion",label:"Conversions",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"%",isRate:true,defaultSort:true},
					                {name:"rate",label:"Link Contribution to Conversions",isPieChart:true,sortable:false}
					              ];
					}else if(metricName == "revenues"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",isDate:true,haveTitle:true},
					                {name:"revenues",label:"Revenue",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"%",isRate:true,defaultSort:true},
					                {name:"rate",label:"Link Contribution to Revenue",isPieChart:true,sortable:false}
					              ];
					}else if(metricName == "averageOrderValue"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",isDate:true,haveTitle:true},
					                {name:"averageOrderValue",label:"Average Order Value",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"%",isRate:true,defaultSort:true},
					                {name:"rate",label:"Link Contribution to Average Order Value",isPieChart:true,sortable:false}
					              ];
					}else if(metricName == "items"){
						tableColumns = [
					                {name:"Link Name",label:"Link Name",isDate:true,haveTitle:true},
					                {name:"items",label:"Items",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"rate",label:"%",isRate:true,defaultSort:true},
					                {name:"rate",label:"Link Contribution to Items",isPieChart:true,sortable:false}
					              ];
					}
				}
				
				var tableDataInfo ={
					tableColumns: tableColumns,
				    tableData:[],
				    maxSize:16
				};
				
				for(var i = 0; i < resultData.length; i++){
					var rowData = resultData[i];
					if(rowData){
						//build the tableData and pieData
						var resultDataRow = {};
						var percentChange = "";
						var percentVal = "";
						
						if(dataType == "clicks"){
							if(metricName == "totalClicks"){
								percentChange = smr.formatDivisionNumber(rowData.totalClicks,data.totalClicks)*100;
								percentVal = smr.formatToFixed(percentChange);
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Clicks" : smr.checkNumber(rowData.totalClicks),
										"%" : percentVal,
										"Link Contribution to Clicks" : percentVal
									};
							}else if(metricName == "uniqueClicks"){
								percentChange = smr.formatDivisionNumber(rowData.uniqueClicks,data.totalUniqueClicks)*100;
								percentVal = smr.formatToFixed(percentChange);
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Unique Clicks" : smr.checkNumber(rowData.uniqueClicks),
										"%" : percentVal,
										"Link Contribution to Unique Clicks" : percentVal
									};
							}
							if(dynamicContentVal){
								var insertionCount = smr.checkNumber(rowData.insertionCount);
								if(insertionCount != 0 && insertionCount != -1){
									resultDataRow["Insertions"] = insertionCount;
								}else{
									resultDataRow["Insertions"] = "N/A";
								}
							}
						}else{
							if(metricName == "conversionCount"){
								percentChange = smr.formatDivisionNumber(rowData.conversionCount,data.totalConversionCount)*100;
								percentVal = smr.formatToFixed(percentChange);
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Conversions" : smr.checkNumber(rowData.conversionCount),
										"%" : percentVal,
										"Link Contribution to Conversions" : percentVal
									};
							}else if(metricName == "revenues"){
								percentChange = smr.formatDivisionNumber(rowData.revenue,data.totalRevenue)*100;
								percentVal = smr.formatToFixed(percentChange);
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Revenue" : smr.checkNumber(rowData.revenue),
										"%" : percentVal,
										"Link Contribution to Revenue" : percentVal
									};
							}else if(metricName == "averageOrderValue"){
								percentChange = smr.formatDivisionNumber(rowData.averageOrderValue,data.totalAverageOrderValue)*100;
								percentVal = smr.formatToFixed(percentChange);
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Average Order Value" : smr.checkNumber(rowData.averageOrderValue),
										"%" : percentVal,
										"Link Contribution to Average Order Value" : percentVal
									};
							}else if(metricName == "items"){
								percentChange = smr.formatDivisionNumber(rowData.items,data.totalItems)*100;
								percentVal = smr.formatToFixed(percentChange);
								resultDataRow = {
										"Link Name" : rowData.linkName,
										"Link Name Title" : "URL:"+rowData.linkUrl,
										"Items" : smr.checkNumber(rowData.items),
										"%" : percentVal,
										"Link Contribution to Items" : percentVal
									};
							}
						}
						
						tableDataInfo.tableData.push(resultDataRow);
					}
				}
				//check whether need to do sortMetrics
				tableDataInfo.skipSortMetrics = true;
				tableDataInfo.smaclass="SMA-REPORT-LINKSPIETABLE";
				brite.display("pieChart",$links,tableDataInfo);
			}	
		}	
	}
	// --------- /Component Private Methods --------- //

    // --------- Component Registration --------- //
    brite.registerView("sectionLinks", {
            parent : ".sectionLinks-view",
            emptyParent : true
        },
        function () {
            return new smr.SectionLinks();
        });
    // --------- Component Registration --------- //

})(jQuery);
