var smr = smr || {};

(function($){

	// --------- Component Private Properties --------- //
	var _breakDownType;
	// --------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function SectionDefers(){};
	smr.SectionDefers = SectionDefers; 
	
	SectionDefers.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionDefers",{});
	};
		
	SectionDefers.prototype.postDisplay = function(data,config){
	    var $e = view.$el;
	    var view = this;
		
		var viewName = data.view || "table";
		view.viewName = viewName;
		view.reportType = data.reportType || smr.REPORT_TYPE.DELIVERABILITY;
		var reportType = view.reportType = data.reportType || view.reportType;
		view.isNewRequest = data.isNewRequest || false;
		view.metricName = data.metricName || "sent";

		var _breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_breakDownType = _breakDownType || "domain";

        //hide the mailing and campaign
        $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("isHide");
        $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='campaign']").addClass("isHide");
		
		view.showView(viewName,_breakDownType);
		
	};
	
	SectionDefers.prototype.parentEvents = {
		report:{	
			//event for view change
			"REPORTHEADER_VIEW_CHANGE" : function(e,extra){
				var view = this;
				var $e = view.$el;
				var viewName = extra.viewName;
				view.viewName = viewName;
				_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
				if(view.showView(viewName,_breakDownType)){
					extra.complete = true;
				}else{
					alert("Not support yet");
				}
			},
			
			//event for summary dataitem change
			"STATSSUMMARY_DATAITEM_CHANGE": function(event,extra){
				var view = this;
				var metric = extra.metricName;
				if(metric=="totalSent" || metric=="sent"){
					metric = "sent";
				}else{
					metric = "defers";
				}
				view.metricName = metric;
				view.showView(view.viewName,_breakDownType,metric);
			},
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE" :  function(){
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
		}
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //
	SectionDefers.prototype.getAllData = function(breakDownType){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"defers",breakDownType,view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionDefers.prototype.showView = function(viewName,breakDownType,metric){
		var view = this;
		var $e = view.$el;
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
		$e.find(".sectionDefers-view").empty();
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionDefers-tableChart",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionDefers-pieChart",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionDefers-barChart",{});
		}else{
			return false;
		}
		
		$e.find(".sectionDefers-view").append($(html));
		
		view.getAllData(_breakDownType).done(function(dataAll){
			if(viewName == 'table'){
				showTableView.call(view,_breakDownType,dataAll);
			}else if(viewName == 'pie'){
				showPieView.call(view,_breakDownType,metricName,dataAll);
			}else if(viewName == 'bar'){
				showBarView.call(view,_breakDownType,metricName,dataAll);
			}
		});
		
		return true;
	}
	
	// --------- /Component Public API --------- //	
		
	// --------- Component Private Methods --------- //
	
	function showTableView(breakDownType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $SectionDefers = $e.find(".sectionDefersTable");
		
		//show the summary status
		showSummary.call(view,breakDownType,"table",dataAll);
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || dataAll.data == null){
			$SectionDefers.html("");
			$SectionDefers.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionDefers.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			
			var tableDataInfo ={
					tableColumns: [
		               {name:"sent",label:"Sent"},
		               {name:"defers",label:"Defers"},
		               {name:"deferedRate",label:"Rate",isRate:true}
	                ],
					tableData:[],
					reportType:reportType,
					maxSize:60
				};
			//change the column when different breakDownType
			if(breakDownType=="vsg"){
				tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {};
					resultData = {
						"Sent": smr.checkNumber(rowData.sent.count),
				  		"Defers": smr.checkNumber(rowData.defers.count), 
		  				"Rate": smr.checkNumber(rowData.defers.rate)
					};
					//add the column data
					if(breakDownType=="vsg"){
						resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
					}else{
						resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					}
					tableDataInfo.tableData.push(resultData);
				}
			}
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.title= "Defers by "+title;
			tableDataInfo.smaclass="SMA-REPORT-DEFERSDATATABLE";
			brite.display("dataTable",$e.find(".sectionDefersTable"),tableDataInfo);	
		}
	}
	
	function showPieView(breakDownType,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $SectionDefers = $e.find(".sectionDefersPie");
		
		//show the summary status
		showSummary.call(view,breakDownType,"pie",dataAll,metricName);
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" || dataAll.data == null){
			$SectionDefers.html("");
			$SectionDefers.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionDefers.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			var dropDownListVal = [
						{name:"sent",labelName:"Sent"},
						{name:"defers",labelName:"Defers"}
			         ];

			//create the table th value
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			if(metricName == "sent"){
				tableColumns =  [
			               {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"rate",label:"%",isRate:true,defaultSort:true},
			               {name:"datecontributiontosent",label:columnTitle+" Contribution to Sent",isPieChart:true,sortable:false}
		               ];
			}else{
				tableColumns =  [
			               {name:"defers",label:"Defers",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"rate",label:"%",isRate:true,defaultSort:true},
			               {name:"datecontributiontodefers",label:columnTitle+" Contribution to Defers",isPieChart:true,sortable:false}
		               ];
			}
			
			var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
			};

			//change the column when different breakDownType
			if(breakDownType=="vsg"){
				tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				//build the tableData
				var resultData = {};
				var percentChange = "";
				var percentVal = "";
				var dataVal = "";
				
				var cloumName = (metricName == "sent"? "sent" : "defers");
				
				dataVal = smr.checkNumber(rowData[cloumName].count);
				percentChange = smr.formatDivisionNumber(dataVal,dataSummary[cloumName].count)*100;
				percentVal = parseFloat(percentChange.toFixed("2"));
				
				if(metricName == "sent"){
					var contributionTo = columnTitle + " Contribution to Sent";
					resultData["Sent"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}else{
					var contributionTo = columnTitle + " Contribution to Defers";
					resultData["Defers"] = dataVal;
					resultData["%"] = percentVal;
					resultData[contributionTo] = percentVal;
				}
				
				//add the column data
				if(breakDownType=="vsg"){
					resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
				}else{
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
				}
				
				tableDataInfo.tableData.push(resultData);
			}
			tableDataInfo.smaclass="SMA-REPORT-DEFERSPIETABLE";
			brite.display("pieChart",$e.find(".sectionDefersPie"),tableDataInfo);	
		}
		
	}
	
	function showBarView(breakDownType,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $SectionDefers = $e.find(".sectionDefersBar");
		
		//show the summary status
		showSummary.call(view,breakDownType,"bar",dataAll,metricName);
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" || dataAll.data == null){
			$SectionDefers.html("");
			$SectionDefers.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionDefers.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			var dropDownListVal = [
						{name:"sent",labelName:"Sent"},
						{name:"defers",labelName:"Defers"}
			         ];
			
			var columnTitle = smr.buildColumnTitleValue(breakDownType);	
			var tableColumns = [];
			
			if(metricName == "sent"){
				tableColumns =  [
			               {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"Sent",label:columnTitle+" Contribution to Sent",isBarChart:true,sortable:false,isRate:true}
		               ];
			}else{
				tableColumns =  [
			               {name:"defers",label:"Defers",isDropDown:true,dropDownList:dropDownListVal},
			               {name:"Defers",label:columnTitle+" Contribution to Defers",isBarChart:true,sortable:false,isRate:true}
		               ];
			}
			
			var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
			};
			
			//change the column when different breakDownType
			if(breakDownType=="vsg"){
				tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
			}else{
				tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			}
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var percentChange = "";
					var percentVal = "";
					var dataVal = "";
					var resultData = {};
					
					var cloumName = (metricName == "sent"? "sent" : "defers");
					
					dataVal = smr.checkNumber(rowData[cloumName].count);
					percentChange = smr.formatDivisionNumber(dataVal,dataSummary[cloumName].count)*100;
					percentVal = parseFloat(percentChange.toFixed("2"));
					
					if(metricName == "sent"){
						var contributionTo = columnTitle + " Contribution to Sent";
						resultData["Sent"] = dataVal;
						resultData[contributionTo] = percentVal;
					}else{
						var contributionTo = columnTitle + " Contribution to Defers";
						resultData["Defers"] = dataVal;
						resultData[contributionTo] = percentVal;
					}
						
					//add the column data
					if(breakDownType=="vsg"){
						resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
					}else{
						resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					}
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-DEFERSBARTABLE";
			brite.display("barChart",$e.find(".sectionDefersBar"),{tableDataInfo:tableDataInfo});	
		}
		
	}
	
	function showSummary(breakDownType,viewType,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		if(viewType == "pie" || viewType == "bar"){
			var $byTitle = $e.find(".byTitle");
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(breakDownType);
			$byTitle.html("").html("Defers by "+title);
		}else{
			var $byTitle = $e.find(".byTitle");
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}
		
		var $statsSummary = $e.find(".statsSummary");
		if(typeof dataAll == "undefined" || typeof dataAll.summary == "undefined"){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var summaryData = dataAll.summary;
			var stats = [];
			var isClickable = false;
			if(viewType == "pie" || viewType == "bar"){
				isClickable = true;
			}

			stats = [
				{name:"sent",label:"Sent",value: smr.checkNumber(summaryData.sent.count),isClickable:isClickable},
				{name:"defers",label:"Defers",value: smr.checkNumber(summaryData.defers.count),isClickable:isClickable},
				{name:"rate",label:"Rate",isRate:true,value: smr.checkNumber(summaryData.defers.rate),isClickable:false}
		  	];
			
			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType});
		}
	}	
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionDefers",{
		emptyParent: true
	},function(){
		return new smr.SectionDefers();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
