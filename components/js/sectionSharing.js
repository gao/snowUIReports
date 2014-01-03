var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _breakDownType;
	var _subSection;
	// --------- /Component Private Properties --------- //
	
    // --------- Component Interface Implementation ---------- //
	function SectionSharing(){}
	smr.SectionSharing = SectionSharing; 
  
	SectionSharing.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionSharing",{});
	};
		
	SectionSharing.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
		
		var viewName = data.view || "table";
		view.viewName = viewName;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		var reportType = view.reportType = data.reportType || view.reportType;
		view.isNewRequest = data.isNewRequest || false;
		view.metricName = data.metricName || "totalShares";
		
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_breakDownType = _breakDownType || "mailing";
		
		//target domain only hide in Sharing section
		if(_breakDownType == "target" || _breakDownType == "domain"){
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
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='target']").addClass("isHide");
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("isHide");
		
		view.showView(viewName,_breakDownType);
	};
	
	SectionSharing.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for subSection change
			"REPORTHEADER_SUBSECTION_CHANGE" : reportHeaderSubSectionChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod
			
			/* 2013-06-12  hide the pivot in Sharing section
			,"STATSSUMMARY_STATUS_CHANGE": function(event,extra){
				var view = this;
				var pivotClickable = extra.clickable;
				showSummary.call(view,"",_subSection,"pivot",view.pivotDataSummary,view.metricName,pivotClickable);
			}*/
		}
	};
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;
		view.viewName = viewName;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_subSection = $e.closest(".report").find(".reportHeader-subSectionCombobox .combobox .default").attr("data-value");
			
		if(view.showView(viewName,_breakDownType,_subSection)){
			extra.complete = true;
		}else{
			alert("Not support yet");
		}
	}
	
	function reportHeaderBreakDownChangeMethod(event){
		var view = this;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
			
		var isHave = smr.checkIsHaveBreakdownValue(view.reportType,val);
		if(!isHave){
			_breakDownType = val;
			view.showView(view.viewName,_breakDownType,_subSection);
		}else{
			smr.goBackPreBreakdownValue($this,_breakDownType);
		}
	}
	
	function reportHeaderSubSectionChangeMethod(event,extra){
		var view = this;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-subSectionCombobox .combobox").attr("data-value");
		_subSection = val;
		if(view.viewName == "pivot"){
			if(_subSection == 'ftaf'){
				view.metricName = "forwaders";
			}else{
				view.metricName = "sharers";
			}
		}else{
			if(_subSection == 'ftaf'){
				view.metricName = "totalForwaders";
			}else{
				view.metricName = "totalShares";
			}
		}
		
		view.showView(view.viewName,_breakDownType,_subSection);
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
		var view = this;
		var metric = extra.metricName;
		//2013-06-12  hide the pivot in Sharing section
		//metric = rebuildMetricName(metric,view.viewName);
		view.metricName = metric;
		view.showView(view.viewName,_breakDownType,_subSection,metric);
	}
	// --------- /events --------- //
	
    // --------- /Component Interface Implementation ---------- //

    // --------- Component Public API --------- //
	SectionSharing.prototype.getAllData = function(breakDownType,subSection){
		var dfd = $.Deferred();
		var view = this;
		var reportName = "sharing";
		var actionName = "getShares";
		if(subSection == 'ftaf'){
			reportName = "sharingFtaf";
			actionName = "getFTAF";
		}
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		
		if(view.viewName=="pivot"){
			smr.getBigDataSummary(view.reportType,actionName,view.isNewRequest).done(function(data){
				var dataSet = {};
				if(data.items!=null){
					dataSet = data.items[0] || {};
				}
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}else{
			smr.getSummary(view.reportType,reportName,_breakDownType,view.isNewRequest).done(function(data){
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
	
	SectionSharing.prototype.showView = function(viewName,breakDownType,subSection,metric){
		var view = this;
		var $e = view.$el;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_subSection = $e.closest(".report").find(".reportHeader-subSectionCombobox .combobox .default").attr("data-value");
		if(typeof breakDownType != 'undefined'){
			_breakDownType = breakDownType;
		}else{
			_breakDownType = "mailing";
		}
		if(typeof subSection != 'undefined'){
			_subSection = subSection;
		}else{
			_subSection = "shareToSocial";
		}
		if(typeof metric != 'undefined'){
			//2013-06-12  hide the pivot in Sharing section
		    //metric = rebuildMetricName(metric,viewName);
			view.metricName = metric;
		}
		
		//2013-06-12  hide the pivot in Sharing section
		//var metricName = rebuildMetricName(view.metricName,viewName);
		var metricName = view.metricName;
		
		//clean first
		$e.find(".statSummary").empty();
		$e.find(".sectionSharing-view").empty();
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionSharing-table",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionSharing-pie",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionSharing-bar",{});
		}else if(viewName == 'pivot'){
			html = smr.render("tmpl-sectionSharing-pivot",{});
		}else{
			return false;
		}
		
		$e.find(".sectionSharing-view").append($(html));
		
		view.getAllData(_breakDownType,_subSection).done(function(dataAll){
			if(viewName == 'table'){
				showTableView.call(view,_breakDownType,_subSection,dataAll);
			}else if(viewName == 'pie'){
				showPieView.call(view,_breakDownType,_subSection,dataAll,metricName);
			}else if(viewName == 'bar'){
				showBarView.call(view,_breakDownType,_subSection,dataAll,metricName);
			}else if(viewName == 'pivot'){
				showPivotView.call(view,metricName,_subSection,dataAll)
			}
		});
		
		return true;
	};
	
	SectionSharing.prototype.destroy = function(){
		var view = this;
		var $e = view.$el;
		//target and domain only hide in Sharing section,so remove the isHide when go to other page
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='target']").removeClass("isHide");
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").removeClass("isHide");
	};
    // --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showTableView(breakDownType,subSection,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var data = "";
		var $sectionSharing = $e.find(".sectionSharingTable")
		
		if(typeof dataAll == "undefined"){
			$sectionSharing.html("");
			$sectionSharing.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionSharing.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			showSummary.call(view,breakDownType,subSection,"table",dataAll);
			
			var tableDataInfo;
			var tableColumns = [];
			
			if(subSection == "shareToSocial"){
				data = dataAll.offerPerformances;
				tableDataInfo ={
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType,
					maxSize:90
				};
				if(breakDownType == "mailing"){
					tableDataInfo.maxSize = 50;
				}
				
				//change the column when different breakDownType
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				
				tableColumns.push({name:"Sharers",label:"Sharers"});
				tableColumns.push({name:"totalShareCount",label:"Share Count"});
				tableColumns.push({name:"totalClicks",label:"Clicks"});
				
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					if(rowData){
						var resultData = {
							"Sharers":smr.checkNumber(rowData.offerShares),
							"Share Count":smr.checkNumber(rowData.totalOfferShareCount),
							"Clicks":smr.checkNumber(rowData.totalOfferClicks)
						};
						
						//add the column data
						resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
						
						tableDataInfo.tableData.push(resultData);
					}
				}
			}else if(subSection == "shareOffers"){
				data = dataAll.offerNamePerformances;
				if(typeof data == "undefined"){
					data= "";
				}
				tableDataInfo ={
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType,
					maxSize:80
				};
				if(breakDownType == "mailing"){
					tableDataInfo.maxSize = 46;
				}
				
				//change the column when different breakDownType
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				
				tableColumns.push({name:"Offer",label:"Offer",isAlignLeft:true});
				tableColumns.push({name:"Sharers",label:"Sharers"});
				tableColumns.push({name:"totalShareCount",label:"Share Count"});
				tableColumns.push({name:"totalClicks",label:"Clicks"});
				
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					if(rowData){
						var resultData = {
								"Offer":rowData.offerName,
								"Share Count":smr.checkNumber(rowData.totalOfferShareCount),
								"Sharers":smr.checkNumber(rowData.offerShares),
								"Clicks":smr.checkNumber(rowData.totalOfferClicks)
						};
						
						//add the column data
						resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
						
						tableDataInfo.tableData.push(resultData);
					}
				}
			}else if(subSection == "ftaf"){
				data = dataAll.ftafPerformanceList;
				tableDataInfo ={
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType,
					maxSize:50
				};
				if(breakDownType == "mailing"){
					tableDataInfo.maxSize = 26;
				}
				
				//change the column when different breakDownType
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
				
				tableColumns.push({name:"Forwarders",label:"Forwarders"});
				tableColumns.push({name:"Forwarded Messages",label:"Forwarded Messages"});
				tableColumns.push({name:"Clickers",label:"Clickers"});
				tableColumns.push({name:"Openers",label:"Openers"});
				tableColumns.push({name:"Subscribers",label:"Subscribers"});
				tableColumns.push({name:"Viral Factor",label:"Viral Factor"});
				
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					if(rowData){
						var resultData = {
							"Forwarders":smr.checkNumber(rowData.forwaders),
							"Forwarded Messages":smr.checkNumber(rowData.forwarededMessages),
							"Viral Factor":smr.checkNumber(rowData.viralFactor),
							"Openers":smr.checkNumber(rowData.openers),
							"Clickers":smr.checkNumber(rowData.clickers),
							"Subscribers":smr.checkNumber(rowData.subscribers)
						};
						
						//add the column data
						resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
						
						tableDataInfo.tableData.push(resultData);
					}
				}
			}
			//check whether need to do sortMetrics
			tableDataInfo.skipSortMetrics = true;
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.title="Sharing by "+title;
			tableDataInfo.smaclass="SMA-REPORT-SHARINGDATATABLE";
			brite.display("dataTable",$e.find(".sectionSharingTable"),tableDataInfo);
		}
	}
	
	function showPieView(breakDownType,subSection,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var data = "";
		var $sectionSharing = $e.find(".sectionSharingPie")
		
		if(typeof dataAll == "undefined"){
			$sectionSharing.html("");
			$sectionSharing.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionSharing.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			if(subSection == 'ftaf'){
				var dropDownListVal = [
		   		            {name:"totalForwadedMessages",labelName:"Forwarded Messages"},
		   					{name:"totalForwaders",labelName:"Forwarders"},
		   					{name:"totalClicks",labelName:"Clickers"},
		   					{name:"totalOpeners",labelName:"Openers"},
		   					{name:"totalSubscribers",labelName:"Subscribers"}
		   		         ];
			}else{
				var dropDownListVal = [
		   		            {name:"totalShares",labelName:"Sharers"},
		   		            {name:"totalShareCount",labelName:"Share Count"},
		   		            {name:"totalClicks",labelName:"Clicks"}
		   		         ];
			}
			
			showSummary.call(view,breakDownType,subSection,"pie",dataAll,metricName);
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];

			var tableDataInfo ={
				tableColumns: tableColumns,
			    tableData:[],
			    reportType:reportType,
			    maxSize:20
			};
			if(breakDownType == "mailing"){
				tableDataInfo.maxSize = 10;
			}
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			if(subSection == 'ftaf'){
				data = dataAll.ftafPerformanceList;
				
				if(metricName == "totalForwadedMessages"){
					tableColumns.push({name:"Forwarded Messages",label:"Forwarded Messages",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontototalforwardedmessages",label:columnTitle+" Contribution to Forwarded Messages",isPieChart:true,sortable:false});
				}else if(metricName == "totalForwaders"){
					tableColumns.push({name:"Forwarders",label:"Forwarders",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontoforwarders",label:columnTitle+" Contribution to Forwarders",isPieChart:true,sortable:false});
				}else if(metricName == "totalOpeners"){
					tableColumns.push({name:"Openers",label:"Openers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontoopeners",label:columnTitle+" Contribution to Openers",isPieChart:true,sortable:false});
				}else if(metricName == "totalClicks"){
					tableColumns.push({name:"Clickers",label:"Clickers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontoclickers",label:columnTitle+" Contribution to Clickers",isPieChart:true,sortable:false});
				}else if(metricName == "totalSubscribers"){
					tableColumns.push({name:"Subscribers",label:"Subscribers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontosubscribers",label:columnTitle+" Contribution to Subscribers",isPieChart:true,sortable:false});
				}
				
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					var resultData = {};
					var percentChange = "";
					var percentVal = "";
					if(metricName == "totalForwadedMessages"){
						percentChange = smr.formatDivisionNumber(rowData.forwarededMessages,dataAll.totalForwadedMessages)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Forwarded Messages";
						resultData["Forwarded Messages"] = smr.checkNumber(rowData.forwarededMessages);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "totalForwaders"){
						percentChange = smr.formatDivisionNumber(rowData.forwaders,dataAll.totalForwaders)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Forwarders";
						resultData["Forwarders"] = smr.checkNumber(rowData.forwaders);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "totalOpeners"){
						percentChange = smr.formatDivisionNumber(rowData.openers,dataAll.totalOpeners)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Openers";
						resultData["Openers"] = smr.checkNumber(rowData.openers);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "totalClicks"){
						percentChange = smr.formatDivisionNumber(rowData.clickers,dataAll.totalClicks)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Clickers";
						resultData["Clickers"] = smr.checkNumber(rowData.clickers);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "totalSubscribers"){
						percentChange = smr.formatDivisionNumber(rowData.subscribers,dataAll.totalSubscribers)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Subscribers";
						resultData["Subscribers"] = smr.checkNumber(rowData.subscribers);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}
					
					//add the column data
					resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}else{
				if(subSection == "shareToSocial"){
					data = dataAll.offerPerformances;
				}else{
					data = dataAll.offerNamePerformances;
				}
				if(typeof data == "undefined"){
					data= "";
				}
				
				if(metricName == "totalShares"){
					tableColumns.push({name:"Sharers",label:"Sharers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontosharers",label:columnTitle+" Contribution to Sharers",isPieChart:true,sortable:false});
				}else if(metricName == "totalShareCount"){
					tableColumns.push({name:"Share Count",label:"Share Count",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontosharecount",label:columnTitle+" Contribution to Share Count",isPieChart:true,sortable:false});
				}else if(metricName == "totalClicks"){
					tableColumns.push({name:"Clicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
					tableColumns.push({name:"datecontributiontoclicks",label:columnTitle+" Contribution to Clicks",isPieChart:true,sortable:false});
				}
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					
					var resultData = {};
					var percentChange = "";
					var percentVal = "";
					if(metricName == "totalShares"){
						percentChange = smr.formatDivisionNumber(rowData.offerShares,dataAll.shares)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Sharers";
						resultData["Sharers"] = smr.checkNumber(rowData.offerShares);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "totalShareCount"){
						percentChange = smr.formatDivisionNumber(rowData.totalOfferShareCount,dataAll.totalShareCount)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Share Count";
						resultData["Share Count"] = smr.checkNumber(rowData.totalOfferShareCount);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "totalClicks"){
						percentChange = smr.formatDivisionNumber(rowData.totalOfferClicks,dataAll.totalClicks)*100;
						percentVal = smr.formatToFixed(percentChange);
						var contributionTo = columnTitle + " Contribution to Clicks";
						resultData["Clicks"] = smr.checkNumber(rowData.totalOfferClicks);
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}
					
					//add the column data
					resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			
			//check whether need to do sortMetrics
			tableDataInfo.skipSortMetrics = true;
			
			tableDataInfo.smaclass="SMA-REPORT-SHARINGPIETABLE";
			brite.display("pieChart",$e.find(".sectionSharingPie"),tableDataInfo);
		}
	}
	
	function showBarView(breakDownType,subSection,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var data = "";
		var $sectionSharing = $e.find(".sectionSharingBar")
		
		if(typeof dataAll == "undefined"){
			$sectionSharing.html("");
			$sectionSharing.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionSharing.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			showSummary.call(view,breakDownType,subSection,"bar",dataAll,metricName);
			
			if(subSection == 'ftaf'){
				var dropDownListVal = [
		   		             {name:"totalForwadedMessages",labelName:"Forwarded Messages"},
		   		             {name:"totalForwaders",labelName:"Forwarders"},
		   		             {name:"totalClicks",labelName:"Clickers"},
		   		             {name:"totalOpeners",labelName:"Openers"},
		   		             {name:"totalSubscribers",labelName:"Subscribers"}
		   		         ];
			}else{
				var dropDownListVal = [
		   		            {name:"totalShares",labelName:"Sharers"},
		   		            {name:"totalShareCount",labelName:"Share Count"},
		   		            {name:"totalClicks",labelName:"Clicks"}
		   		         ];
			}
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			var tableDataInfo ={
				tableColumns: tableColumns,
			    tableData:[],
			    reportType:reportType
			};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			if(subSection == 'ftaf'){
				data = dataAll.ftafPerformanceList;
				
				if(metricName == "totalForwadedMessages"){
					tableColumns.push({name:"Forwarded Messages",label:"Forwarded Messages",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontototalforwardedmessages",label:columnTitle+" Contribution to Forwarded Messages",isBarChart:true,isRate:true,sortable:false});
				}else if(metricName == "totalForwaders"){
					tableColumns.push({name:"Forwarders",label:"Forwarders",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontoforwarders",label:columnTitle+" Contribution to Forwarders",isBarChart:true,isRate:true,sortable:false});
				}else if(metricName == "totalOpeners"){
					tableColumns.push({name:"Openers",label:"Openers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontoopeners",label:columnTitle+" Contribution to Openers",isBarChart:true,isRate:true,sortable:false});
				}else if(metricName == "totalClicks"){
					tableColumns.push({name:"Clickers",label:"Clickers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontoclickers",label:columnTitle+" Contribution to Clickers",isBarChart:true,isRate:true,sortable:false});
				}else if(metricName == "totalSubscribers"){
					tableColumns.push({name:"Subscribers",label:"Subscribers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontosubscribers",label:columnTitle+" Contribution to Subscribers",isBarChart:true,isRate:true,sortable:false});
				}
				
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					if(rowData){
						var resultData = {};
						var percentChange = "";
						
						if(metricName == "totalForwadedMessages"){
							percentChange = smr.formatDivisionNumber(rowData.forwarededMessages,dataAll.totalForwadedMessages)*100;
							var contributionTo = columnTitle + " Contribution to Forwarded Messages";
							resultData["Forwarded Messages"] = smr.checkNumber(rowData.forwarededMessages);
							resultData[contributionTo] = percentChange;
						}else if(metricName == "totalForwaders"){
							percentChange = smr.formatDivisionNumber(rowData.forwaders,dataAll.totalForwaders)*100;
							var contributionTo = columnTitle + " Contribution to Forwarders";
							resultData["Forwarders"] = smr.checkNumber(rowData.forwaders);
							resultData[contributionTo] = percentChange;
						}else if(metricName == "totalOpeners"){
							percentChange = smr.formatDivisionNumber(rowData.openers,dataAll.totalOpeners)*100;
							var contributionTo = columnTitle + " Contribution to Openers";
							resultData["Openers"] = smr.checkNumber(rowData.openers);
							resultData[contributionTo] = percentChange;
						}else if(metricName == "totalClicks"){
							percentChange = smr.formatDivisionNumber(rowData.clickers,dataAll.totalClicks)*100;
							var contributionTo = columnTitle + " Contribution to Clickers";
							resultData["Clickers"] = smr.checkNumber(rowData.clickers);
							resultData[contributionTo] = percentChange;
						}else if(metricName == "totalSubscribers"){
							percentChange = smr.formatDivisionNumber(rowData.subscribers,dataAll.totalSubscribers)*100;
							var contributionTo = columnTitle + " Contribution to Subscribers";
							resultData["Subscribers"] = smr.checkNumber(rowData.subscribers);
							resultData[contributionTo] = percentChange;
						}
						
						//add the column data
						resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
						
						tableDataInfo.tableData.push(resultData);
					}
				}
			}else{
				if(subSection == "shareToSocial"){
					data = dataAll.offerPerformances;
				}else{
					data = dataAll.offerNamePerformances;
				}
				if(typeof data == "undefined"){
					data= "";
				}
				if(metricName == "totalShares"){
					tableColumns.push({name:"Sharers",label:"Sharers",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontoshares",label:columnTitle+" Contribution to Sharers",isBarChart:true,isRate:true});
				}else if(metricName == "totalShareCount"){
					tableColumns.push({name:"Share Count",label:"Share Count",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontosharecount",label:columnTitle+" Contribution to Share Count",isBarChart:true,isRate:true});
				}else if(metricName == "totalClicks"){
					tableColumns.push({name:"Clicks",label:"Clicks",isDropDown:true,dropDownList:dropDownListVal});
					tableColumns.push({name:"datecontributiontoclicks",label:columnTitle+" Contribution to Clicks",isBarChart:true,isRate:true});
				}
				
				for(var i = 0; i < data.length; i++){
					var rowData = data[i];
					if(rowData){
						var resultData = {};
						var percentChange = "";
						if(metricName == "totalShares"){
							percentChange = smr.formatDivisionNumber(rowData.offerShares,dataAll.shares)*100;
							var contributionTo = columnTitle + " Contribution to Sharers";
							resultData["Sharers"] = smr.checkNumber(rowData.offerShares);
							resultData[contributionTo] = percentChange;
						}else if(metricName == "totalShareCount"){
							percentChange = smr.formatDivisionNumber(rowData.totalOfferShareCount,dataAll.totalShareCount)*100;
							var contributionTo = columnTitle + " Contribution to Share Count";
							resultData["Share Count"] = smr.checkNumber(rowData.totalOfferShareCount);
							resultData[contributionTo] = percentChange;
						}else if(metricName == "totalClicks"){
							percentChange = smr.formatDivisionNumber(rowData.totalOfferClicks,dataAll.totalClicks)*100;
							var contributionTo = columnTitle + " Contribution to Clicks";
							resultData["Clicks"] = smr.checkNumber(rowData.totalOfferClicks);
							resultData[contributionTo] = percentChange;
						}
						
						//add the column data
						resultData = addTableColumnDataForSharing(resultData,rowData,breakDownType,reportType);
						
						tableDataInfo.tableData.push(resultData);
					}
				}
			}	
			//check whether need to do sortMetrics
			tableDataInfo.skipSortMetrics = true;
			tableDataInfo.smaclass="SMA-REPORT-SHARINGBARTABLE";
			brite.display("barChart",$e.find(".sectionSharingBar"),{tableDataInfo:tableDataInfo});
		}
	}
	
	function showPivotView(metricName,subSection,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionSharingPivot = $e.find(".sectionSharingPivot");
		if(typeof dataAll == "undefined" || dataAll==null){
			dataAll = {};
		}
//		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || typeof dataAll.summary == "undefined"){
//			$sectionSharingPivot.html("");
//			$sectionSharingPivot.append("<div class='noData'>No Data!</div>");
//		}else{
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			view.pivotDataSummary = dataSummary;
			
			var metricList = [];	
			if(subSection == 'ftaf'){
				metricList.push({name:"forwaders",labelName:"Forwarders"});
				metricList.push({name:"forwardedMessages",labelName:"Forwarded Messages"});
				metricList.push({name:"clickers",labelName:"Clickers"});
				metricList.push({name:"openers",labelName:"Openers"});
				metricList.push({name:"subscribers",labelName:"Subscribers"});
			}else{
				metricList.push({name:"sharers",labelName:"Sharers"});
				metricList.push({name:"shareCount",labelName:"Share Count"});
				metricList.push({name:"clicks",labelName:"Clicks"});
			}
			metricName = rebuildMetricName(metricName,"pivot");
			$.each(metricList,function(i,item){if(item.name==metricName)item.selected = true;});
			
			if(subSection == 'ftaf'){
				brite.display("pivotTable",$sectionSharingPivot,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
					metricList:metricList,metricName:metricName,section:"sharingFTAF"});
			}else{
				brite.display("pivotTable",$sectionSharingPivot,{dataAll:data,reportType:reportType,isNewRequest:view.isNewRequest,
					metricList:metricList,metricName:metricName,section:"sharing"});
			}
			
			showSummary.call(view,"",subSection,"pivot",dataSummary,metricName);
//		}
	}
	
	function showSummary(breakDownType,subSection,viewType,data,metricName,pivotClickable){
		var view = this;
		var $e = view.$el;
		
		if(viewType == "table"){
			$e.find(".byTitle").show();
			var $byTitle = $e.find(".byTitle");
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$e.find(".byTitle").hide();
		}
		
		var isClickable = false;
		if(viewType == "pie" || viewType == "bar"){
			isClickable = true;
		}
		if(viewType == "pivot"){
			isClickable = pivotClickable?true:false;
		}
		
		var $statsSummary = $e.find(".statsSummary");
		if(typeof data == "undefined" || data==null){
			$statsSummary.html("No Data!");
			return;
		}

		var summaryData = data;
		var stats = [];
		if(viewType == "pivot"){
			if(subSection == "ftaf"){
				stats.push({name:"forwaders",label:"Forwarders",value:smr.checkNumber(summaryData.forwaders),isClickable:isClickable});
				stats.push({name:"forwardedMessages",label:"Forwarded Messages",value:smr.checkNumber(summaryData.forwardedMessages),isClickable:isClickable});
				stats.push({name:"clickers",label:"Clickers",value:smr.checkNumber(summaryData.clickers),isClickable:isClickable});
				stats.push({name:"openers",label:"Openers",value:smr.checkNumber(summaryData.openers),isClickable:isClickable});
				stats.push({name:"subscribers",label:"Subscribers",value:smr.checkNumber(summaryData.subscribers),isClickable:isClickable});
			}else{
				stats.push({name:"sharers",label:"Sharers",value:smr.checkNumber(summaryData.sharers),isClickable:isClickable});
				stats.push({name:"shareCount",label:"Share Count",value:smr.checkNumber(summaryData.shareCount),isClickable:isClickable});
				stats.push({name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks),isClickable:isClickable});
			}
		}else{
			if(subSection == "ftaf"){
				stats.push({name:"totalForwaders",label:"Forwarders",value:smr.checkNumber(summaryData.totalForwaders),isClickable:isClickable});
				stats.push({name:"totalForwadedMessages",label:"Forwarded Messages",value:smr.checkNumber(summaryData.totalForwadedMessages),isClickable:isClickable});
				stats.push({name:"totalClicks",label:"Clickers",value:smr.checkNumber(summaryData.totalClicks),isClickable:isClickable});
				stats.push({name:"totalOpeners",label:"Openers",value:smr.checkNumber(summaryData.totalOpeners),isClickable:isClickable});
				stats.push({name:"totalSubscribers",label:"Subscribers",value:smr.checkNumber(summaryData.totalSubscribers),isClickable:isClickable});
			}else{
				stats.push({name:"totalShares",label:"Sharers",value:smr.checkNumber(summaryData.shares),isClickable:isClickable});
				stats.push({name:"totalShareCount",label:"Share Count",value:smr.checkNumber(summaryData.totalShareCount),isClickable:isClickable});
				stats.push({name:"totalClicks",label:"Clicks",value:smr.checkNumber(summaryData.totalClicks),isClickable:isClickable});
			}
		}
		
		//2013-06-12  hide the pivot in Sharing section
		//metricName = rebuildMetricName(metricName,viewType);
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
	
	function addTableColumnDataForSharing(resultDataRow,rowData,breakDownType,reportType){
		var includeSubOrg = smr.getSetAndType(reportType).set.attr("includeSubOrg");
		if(breakDownType == "mailing"){
			if(reportType == smr.REPORT_TYPE.PROGRAM){
				resultDataRow.Mailing = {value:(rowData.mailingName ? rowData.mailingName : "no name")};
			}else{
				resultDataRow.Mailing = {value:(rowData.mailingName ? rowData.mailingName : "no name"),mailingId:rowData.mailingId};
			}
			resultDataRow.Subject =  rowData.mailingSubject ? rowData.mailingSubject : "no subject";
			if(includeSubOrg) resultDataRow.organization = rowData.organization ? rowData.organization : "no organization";
		}else if(breakDownType == "campaign"){
			resultDataRow.Campaign = rowData.campaignName ? rowData.campaignName : "no name";
		}else if(breakDownType == "program"){
			resultDataRow.Program = rowData.programName ? rowData.programName : "no name";
			if(includeSubOrg) resultDataRow.organization = rowData.organization ? rowData.organization : "no organization";
		}else if(breakDownType == "org"){
			resultDataRow.Organization = rowData.organization ? rowData.organization : "no name";
		}else if(breakDownType == "orgRollup"){
			resultDataRow["Organization (Rollup)"] = rowData.organization ? rowData.organization : "no name";
		}else{
			resultDataRow.Date = rowData.date ? rowData.date : (rowData.aggDate ? rowData.aggDate : "no date");
		}
		return resultDataRow;
	}
	
	function rebuildMetricName(metricName,viewType){
		if(viewType == "pivot"){
			if(metricName == "totalForwadedMessages"){
				metricName = "forwardedMessages";
			}else if(metricName == "totalForwaders"){
				metricName = "forwaders";
			}else if(metricName == "totalOpeners"){
				metricName = "openers";
			}else if(metricName == "totalClicks"){
				metricName = "clickers";
			}else if(metricName == "totalSubscribers"){
				metricName = "subscribers";
			}else if(metricName == "totalShares"){
				metricName = "sharers";				
			}else if(metricName == "totalShareCount"){
				metricName = "shareCount";
			}else if(metricName == "totalClicks"){
				metricName = "clicks";	
			}else{
				metricName = metricName;
			}
		}else{
			if(metricName == "forwardedMessages"){
				metricName = "totalForwadedMessages";
			}else if(metricName == "forwaders"){
				metricName = "totalForwaders";
			}else if(metricName == "openers"){
				metricName = "totalOpeners";
			}else if(metricName == "clickers"){
				metricName = "totalClicks";
			}else if(metricName == "subscribers"){
				metricName = "totalSubscribers";
			}else if(metricName == "sharers"){
				metricName = "totalShares";				
			}else if(metricName == "shareCount"){
				metricName = "totalShareCount";
			}else if(metricName == "clicks"){
				metricName = "totalClicks";	
			}else{
				metricName = metricName;
			}
		}
		
		return metricName;
	}
	// --------- /Component Private Methods --------- //


    // --------- Component Registration --------- //
    brite.registerView("sectionSharing", {
            emptyParent : true
        },
        function () {
            return new smr.SectionSharing();
        });
    // --------- Component Registration --------- //
})(jQuery);
