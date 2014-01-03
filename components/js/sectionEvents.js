var smr = smr || {};

(function($){
	
	// --------- Component Interface Implementation ---------- //
	function SectionEvents(){};  
	smr.SectionEvents = SectionEvents; 
	
	SectionEvents.prototype.create = function(data,config){
		return smr.render("tmpl-sectionEvents",{});
	}
		
	SectionEvents.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		var viewName = data.view || "table";
		view.viewName = viewName;	
		view.reportType = data.reportType || smr.REPORT_TYPE.PROGRAM;
		view.isNewRequest = data.isNewRequest || false;
		
		//in the Events , there is no breakdown by domain and mailing org and orgRollup
		var $report = $e.closest(".report");
		view.breakDownType = $report.find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").removeClass("default").addClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").removeClass("default").addClass("isHide");
		if(view.breakDownType == "domain" || view.breakDownType == "mailing" || view.breakDownType == "org" || view.breakDownType == "orgRollup"){
			$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
			$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
			view.breakDownType = "program";
		}
		
		var reportType = view.reportType;
		var set = smr.getSetAndType(reportType,"main").set;
		var hasSubOrgs = smr.hasSubOrgs[reportType] || false;
		var includeSubOrg = typeof set.attr("includeSubOrg")=="undefined" ? false : set.attr("includeSubOrg");
		if(hasSubOrgs && includeSubOrg){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='org']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='orgRollup']").addClass("isHide");
		}

		//show the breakdown by eventType
		$report.find(".reportHeader-breakdownCombobox .combobox .isEventType").show();		
		
		view.showView(viewName,view.breakDownType);
	};

	
	SectionEvents.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod
		}
	};
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;

		if(view.showView(viewName,view.breakDownType)){
			extra.complete = true;
			view.viewName = viewName;
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
			view.breakDownType = val;
			view.showView(view.viewName,view.breakDownType);
		}else{
			smr.goBackPreBreakdownValue($this,view.breakDownType);
		}
	}
	// --------- /events --------- //
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionEvents.prototype.getAllData = function(viewBy){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"programEvents",viewBy,view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionEvents.prototype.showView = function(viewName,breakDownType){
		var view = this;
		var $e = view.$element;
		
		//clean first
		$e.bEmpty();
		
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionEvents-tableChart",{});			
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionEvents-pieChart",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionEvents-barChart",{});
		}
		
		$e.append($(html));
		
		view.getAllData(view.breakDownType).done(function(dataAll){
			if(viewName == 'table'){
				showTableView.call(view,view.breakDownType,dataAll);
			}else if(viewName == 'pie'){
				showPieView.call(view,view.breakDownType,dataAll);
			}else if(viewName == 'bar'){
				showBarView.call(view,view.breakDownType,dataAll);
			}
		});
		
		return true;
	}
	
	SectionEvents.prototype.destroy = function(){
		var view = this;
		var $e = view.$el;
		var $report = $e.closest(".report");
		
		//when leave the Events, should hide the breakdown "eventType"
		$report.find(".reportHeader-breakdownCombobox .combobox .isEventType").hide();
		if(view.breakDownType == "eventType"){
			$report.find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
			$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
		}
		
		var reportType = view.reportType;
		var set = smr.getSetAndType(reportType,"main").set;
		var hasSubOrgs = smr.hasSubOrgs[reportType] || false;
		var includeSubOrg = typeof set.attr("includeSubOrg")=="undefined" ? false : set.attr("includeSubOrg");
		if(hasSubOrgs && includeSubOrg){
			$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='org']").removeClass("isHide");
			$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='orgRollup']").removeClass("isHide");
		}
		
		//when leave Events , should add the breakdown "domain" and "mailing"
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").removeClass("isHide");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").removeClass("isHide");
	}
	
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showTableView(breakDownType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionEvents = $e.find(".sectionEvents-table");
		
		if(typeof dataAll == "undefined" || dataAll.data==null ||typeof dataAll.data == "undefined"){
			$sectionEvents.html("");
			$sectionEvents.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionEvents.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			showSummary.call(view,breakDownType,"table",dataAll);
			
			var	tableColumns = [];
			if(breakDownType == "program"){
				tableColumns = [
						{name:"eventType",label:"Event Type",isAlignLeft:true},
						{name:"eventName",label:"Event Name",isAlignLeft:true},
						{name:"count",label:"Count"}
		            ];
			}else{
				tableColumns = [
						{name:"eventType",label:"Event Type",isAlignLeft:true},
						{name:"count",label:"Count"}
		            ];
			}
		            
		    var tableDataInfo ={
						tableColumns: tableColumns,
						tableData:[],
						reportType:reportType,
						maxSize:60
					};
					
			//change the column when different breakDownType
			if(breakDownType != "eventType"){
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				var resultData = {
						"Event Type":rowData.eventType,
						"Event Name":rowData.eventName,
						"Count":smr.checkNumber(rowData.count)
					};
				
				//add the column data
				if(breakDownType != "eventType"){
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
				}
				
				tableDataInfo.tableData.push(resultData);
			}
			
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.title="Events by "+title;
			tableDataInfo.smaclass="SMA-REPORT-EVENTSDATATABLE";
			brite.display("dataTable",$e.find(".sectionEvents-table"),tableDataInfo);	
		}
	}
	
	
	function showPieView(breakDownType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionEvents = $e.find(".sectionEvents-pie");
		
		if(typeof dataAll == "undefined" || dataAll.data==null || typeof dataAll.data == "undefined"){
			$sectionEvents.html("");
			$sectionEvents.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionEvents.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			
			showSummary.call(view,breakDownType,"pie",dataAll);
			
			var	tableColumns = [];
			var columnTitle = smr.buildColumnTitleValue(breakDownType);

            
		    var tableDataInfo ={
				tableColumns: tableColumns,
				tableData:[],
				reportType:reportType
			};
		    
			//change the column when different breakDownType
			if(breakDownType != "eventType"){
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			if(breakDownType == "program"){
				tableColumns.push({name:"eventType",label:"Event Type",isAlignLeft:true,isDate:true,maxSize:12});
				tableColumns.push({name:"eventName",label:"Event Name",isAlignLeft:true,isDate:true,maxSize:12});
				tableColumns.push({name:"count",label:"Events"});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontoclicks",label:columnTitle+" Contribution to Events",isPieChart:true,sortable:false});
			}else{
				tableColumns.push({name:"eventType",label:"Event Type",isAlignLeft:true,isDate:true,maxSize:12});
				tableColumns.push({name:"count",label:"Events"});
				tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
				tableColumns.push({name:"datecontributiontoclicks",label:columnTitle+" Contribution to Events",isPieChart:true,sortable:false});
			}

					

			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {};
					var percentChange = "";
					var percentVal = "";
						
					var contributionTo = columnTitle + " Contribution to Events";
					var dataVal = smr.checkNumber(rowData.count);
					percentChange = smr.formatDivisionNumber(dataVal,dataAll.count)*100;
					percentVal = smr.formatToFixed(percentChange);
							
					resultData["Event Type"] = rowData.eventType;	
					resultData["Events"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
					
					if(breakDownType == "program"){
						resultData["Event Name"] = rowData.eventName;	
					}
					
					//add the column data
					if(breakDownType != "eventType"){
						resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			
			tableDataInfo.smaclass="SMA-REPORT-EVENTSPIETABLE";
			tableDataInfo.skipSortMetrics = true;
			brite.display("pieChart",$e.find(".sectionEvents-pie"),tableDataInfo);	
		}
		
	}


	function showBarView(breakDownType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionEvents = $e.find(".sectionEvents-bar");
		
		if(typeof dataAll == "undefined" || dataAll.data==null || typeof dataAll.data == "undefined"){
			$sectionEvents.html("");
			$sectionEvents.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionEvents.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			
			showSummary.call(view,breakDownType,"bar",dataAll);
							
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			
			if(breakDownType == "program"){
				tableColumns = [
						{name:"eventType",label:"Event Type",isAlignLeft:true},
						{name:"eventName",label:"Event Name",isAlignLeft:true},
						{name:"count",label:"Events"},
						{name:"datecontributiontoclicks",label:columnTitle+" Contribution to Events",isBarChart:true,sortable:false,isRate:true}
		            ];
			}else{
				tableColumns = [
						{name:"eventType",label:"Event Type",isAlignLeft:true},
						{name:"count",label:"Events"},
						{name:"datecontributiontoclicks",label:columnTitle+" Contribution to Events",isBarChart:true,sortable:false,isRate:true}
		            ];
			}
			
			var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType,
					    maxSize:40
			};
			
			//change the column when different breakDownType
			if(breakDownType != "eventType"){
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {};
					var percentChange = "";
						
					var contributionTo = columnTitle + " Contribution to Events";
					var dataVal = smr.checkNumber(rowData.count);
					percentChange = smr.formatDivisionNumber(dataVal,dataAll.count)*100;
					
					resultData["Event Type"] = rowData.eventType;				
					resultData["Events"] = dataVal;
					resultData[contributionTo] = percentChange;
					
					if(breakDownType == "program"){
						resultData["Event Name"] = rowData.eventName;	
					}
					
					//add the column data
					if(breakDownType != "eventType"){
						resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			
			tableDataInfo.smaclass="SMA-REPORT-EVENTSBARTABLE";
			brite.display("barChart",$e.find(".sectionEvents-bar"),{tableDataInfo:tableDataInfo});	
		}
	}
	
	
	function showSummary(breakDownType,viewType,data){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $byTitle = $e.find(".byTitle");
		if(viewType == "table"){
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(breakDownType);
			$byTitle.html("Events by "+title);
		}
		
		var $statsSummary = $e.find(".statsSummary");
		var stats = [];
        stats = [
       		{name:"events",label:"Events",value: data.count,isClickable:false}
       	];
		
		brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType});
	}
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("sectionEvents",{
		emptyParent: true
	},function(){
		return new smr.SectionEvents();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
