var smr = smr || {};

(function($){

	// --------- Component Private Properties --------- //
	var _breakDownType;
	// --------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function SectionDomainDrilldown(){};
	smr.SectionDomainDrilldown = SectionDomainDrilldown; 
	
	SectionDomainDrilldown.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionDomainDrilldown",{});
	};
		
	SectionDomainDrilldown.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
		
		var viewName = data.view || "table";
		view.viewName = viewName;
		view.reportType =  data.reportType || smr.REPORT_TYPE.DOMAINDRILLDOWN;
		view.isNewRequest = data.isNewRequest || false;
		view.metricName = data.metricName || "failures";
		view.fromReportType = data.opts.fromReportType || 'batch';
		view.domainName = data.opts.domainName;

		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		_breakDownType = _breakDownType || "failureCode";

		view.showView(viewName,_breakDownType);
		
	};
	
	SectionDomainDrilldown.prototype.parentEvents = {
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
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod,
			
			//event for click failure detail count change	
			"DO_CLICK_FAILUREDETAILCOUNT" : doSelectFailureDetailCountMethod
		}
	}
	
	// --------- events --------- //
	function reportHeaderBreakDownChangeMethod(event){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
				
		_breakDownType = val;
		view.showView(view.viewName,_breakDownType);
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
		var view = this;
		var metric = extra.metricName;
		view.metricName = metric;
		
		view.showView(view.viewName,_breakDownType,metric);
	}
	
	function doSelectFailureDetailCountMethod(event){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		var reportType = view.reportType;
		$this.find(".failureDetailCount").click(function(){
			var fromReportType = view.fromReportType;
			var failureType = $(this).attr("data-value");
			var failureCategory = $(this).attr("data-category");
			
			var setAndtype= smr.getSetAndType(view.reportType,"main");
			var set = setAndtype.set;
			var domainIdsType = set.attr("domainIdsType");
			if(domainIdsType=="vsgIp") domainIdsType = "ipAddresses";
			if(domainIdsType=="vsg")   domainIdsType = "mailingClassName";
			
			var mailingsId = "";
			var mainIds = set.list();
			for(var i=0;i<mainIds.length;i++){
				mailingsId = mailingsId + "&"+domainIdsType+"=" + mainIds[i].id;
			}
			
			var tagValueIds = "";
			var tags = smr.getTagSet(reportType,"main").list();
			for(var i = 0; i < tags.length; i++){
				tagValueIds = tagValueIds + "&tagValueIds="+tags[i].id;
			}
			
			var startDate="",endDate="";
			var dateRange = set.period().getDateRange();
			var limit = set.attr("limit");
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

			var drillDownFailureUrl = "report/drilldown.do?reportType=DrillDown_Failure" + mailingsId + tagValueIds + startDate + endDate + includeSubOrgFlag + "&mailingType=" + fromReportType + "&domainName=" + view.domainName;
			if(_breakDownType == "failureCode"){
				drillDownFailureUrl = drillDownFailureUrl + "&failureType=" + failureType;
			}else{
				var categoryVal = "";
				if(failureCategory == "Block"){
					categoryVal = 1;
				}else if(failureCategory == "Hard Bounce"){
					categoryVal = 2;
				}else if(failureCategory == "Soft Bounce"){
					categoryVal = 3;
				}else if(failureCategory == "Technical"){
					categoryVal = 4;
				}else if(failureCategory == "Unknown"){
					categoryVal = 9;
				} 
				drillDownFailureUrl = drillDownFailureUrl + "&failureCategory=" + categoryVal;
			}
			window.open(drillDownFailureUrl);
		});
	}
	// ---------/events --------- //
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //
	SectionDomainDrilldown.prototype.getAllData = function(breakDownType){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"domainDrilldown",breakDownType,view.isNewRequest,view.fromReportType).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionDomainDrilldown.prototype.showView = function(viewName,breakDownType,metric){
		var view = this;
		var $e = view.$element;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(typeof breakDownType != 'undefined'){
			_breakDownType = breakDownType
		}else{
			_breakDownType = "failureCode";
		}
		
		if(typeof metric != 'undefined'){
			view.metricName = metric
		}
		var metricName = view.metricName;
		
		//clean first
		$e.find(".statSummary").empty();
		$e.find(".sectionDomainDrilldown-view").empty();
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionDomainDrilldown-tableChart",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionDomainDrilldown-pieChart",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionDomainDrilldown-barChart",{});
		}else{
			return false;
		}
		
		$e.find(".sectionDomainDrilldown-view").append($(html));
		
		view.getAllData(_breakDownType).done(function(dataAll){
			if(viewName == 'table'){
				showTableView.call(view,_breakDownType,dataAll);
			}else if(viewName == 'pie'){
				showPieView.call(view,_breakDownType,dataAll,metricName);
			}else if(viewName == 'bar'){
				showBarView.call(view,_breakDownType,dataAll,metricName);
			}
			registerEvent.call(view,viewName);
		});
		
		return true;
	}
	
	SectionDomainDrilldown.prototype.destroy = function(){
		this.$el.closest(".report").unbind("dataItemMetricClickable."+this.uid);
		this.$el.closest(".report").unbind("reportHeaderBreakdownCombobox."+this.uid);
	}
	// --------- /Component Public API --------- //	
		
	// --------- Component Private Methods --------- //
	function registerEvent(viewName){
		var view = this;
		var $e = view.$element;
		unregisterEvent.call(this);
		
		//bind the breakdown change,the default value is mailing
		$e.closest(".report").bind("reportHeaderBreakdownCombobox."+this.uid,function(){
			var $reportContentCtn = $e.closest(".report").find(".report-content");
			var $this = $(this);
			var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
			
			var isHave = smr.checkIsHaveBreakdownValue(view.reportType,val);
			if(!isHave){
				_breakDownType = val;
				view.showView(viewName,_breakDownType);
			}else{
				smr.goBackPreBreakdownValue($this,_breakDownType);
			}
		});
		
		if(viewName == "pie" || viewName == "bar"){
			$e.closest(".report").bind("dataItemMetricClickable."+this.uid,function(e,extra){
				var metric = extra.metricName;
				view.metricName = metric;
				
				view.showView(viewName,_breakDownType,metric);
			});
		}
	}
	
	function unregisterEvent(){
	  	this.$el.closest(".report").unbind("reportHeaderBreakdownCombobox."+this.uid);
	  	this.$el.closest(".report").unbind("dataItemMetricClickable."+this.uid);
	}
	
	function showTableView(breakDownType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var fromReportType = view.fromReportType;
		showSummary.call(view,reportType,breakDownType,"table",dataAll);
		var title = smr.buildTitleValue(breakDownType);
		title = "Domain Drilldown by "+title;
		if(breakDownType == "failureCode"){
				var $sectionFailuresTable = $e.find(".sectionDomainDrilldownTable")
				if(typeof dataAll == "undefined"  || dataAll == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var data = dataAll;
					 
					var	tableColumns = [];
					tableColumns.push({name:"category",label:"Category",combination:1});
					tableColumns.push({name:"code",label:"Code"});
					tableColumns.push({name:"description",label:"Description"});
					tableColumns.push({name:"count",label:"Count",isFailureDetailCount:true});
					if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
						tableColumns.push({name:"rate",label:"Rate",isRate:true});
					}
					tableColumns.push({name:"percentageOfFailure",label:"% of Failure",isRate:true});
					
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
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
								resultData.Rate= smr.checkNumber(rowData.rate);
							}
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
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
								resultData.Rate= smr.checkNumber(rowData.rate);
							}
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
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
								resultData.Rate= smr.checkNumber(rowData.rate);
							}
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
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
								resultData.Rate= smr.checkNumber(rowData.rate);
							}
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
									"% of Failure":smr.checkNumber(rowData.percentageOfFailure)
								};
							if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
								resultData.Rate= smr.checkNumber(rowData.rate);
							}
							tableDataInfo.tableData.push(resultData);
						}
					}
					
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.doNotShowRowControl = true;
					tableDataInfo.title=title;
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNDATATABLE";
					brite.display("dataTable",$e.find(".sectionDomainDrilldownTable"),tableDataInfo).done(function(){
						$e.closest(".report").trigger("DO_CLICK_FAILUREDETAILCOUNT");
					});
				}
		}else if(breakDownType == "failureCategory"){
			var $sectionFailuresTable = $e.find(".sectionDomainDrilldownTable")
			if(typeof dataAll == "undefined"){
				$sectionFailuresTable.html("");
				$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
			}else{
				var data = dataAll;				
				if(typeof data == "undefined" || data == null){
					$sectionFailuresTable.html("");
					$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
				}else{
					$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
					var tableColumns = [];
					var tableDataInfo ={
							tableColumns: tableColumns,
							tableData:[],
							reportType:reportType
						};
					
					//change the column when different breakDownType
					//tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
					tableColumns.push({name:"category",label:"Category",combination:1});
					tableColumns.push({name:"count",label:"Count",isFailureDetailCount:true});
					if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
						tableColumns.push({name:"rate",label:"Rate",isRate:true});
					}
					tableColumns.push({name:"percentageOfFailure",label:"% of Failure",isRate:true});

					var categorys = [{name:"block",stufix:"Block"},
									 {name:"hardBounce",stufix:"Hard Bounce"},
									 {name:"softBounce",stufix:"Soft Bounce"},
									 {name:"technical",stufix:"Technical"},
									 {name:"unknown",stufix:"Unknown"}];
                    for(var i =0 ; i < categorys.length ; i++ ){
                    	var rowDataCount = data[categorys[i].name].count;
                    	var	resultData = {
                    			"Category":categorys[i].stufix,
                    			"Count":smr.checkNumber(rowDataCount),
                    			"% of Failure":smr.formatDivisionNumber(rowDataCount,data.failed.count)*100
                    	};
                    	if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
                    		resultData.Rate= smr.formatDivisionNumber(rowDataCount,data.sent)*100
                    	}
                    	tableDataInfo.tableData.push(resultData);
                    }
					
                    tableDataInfo.skipSortMetrics = true;
                    tableDataInfo.doNotShowRowControl = true;
                    tableDataInfo.title=title;
                    tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNDATATABLE";
					brite.display("dataTable",$e.find(".sectionDomainDrilldownTable"),tableDataInfo).done(function(){
						$e.closest(".report").trigger("reportFailureDetailCountClick");
					});
				}
			}
		}else{
			var data = dataAll.data;
			
			var tableDataInfo ={
					tableColumns: [],
					tableData:[],
					reportType:reportType,
					maxSize:60
			};
			
			tableDataInfo.tableColumns.push({name:"failures",label:"Failures"});
			if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
				tableDataInfo.tableColumns.push({name:"failures",label:"Failures Rate",isRate:true});
			}
			tableDataInfo.tableColumns.push({name:"block",label:"Block"});
			tableDataInfo.tableColumns.push({name:"hard",label:"Hard Bounce"});
			tableDataInfo.tableColumns.push({name:"soft",label:"Soft Bounce"});
			tableDataInfo.tableColumns.push({name:"technical",label:"Technical"});
			tableDataInfo.tableColumns.push({name:"unknown",label:"Unknown"});

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
							"Failures":smr.checkNumber(rowData.failed.count),
							"Block":smr.checkNumber(rowData.block.count),
							"Hard Bounce":smr.checkNumber(rowData.hardBounce.count),
							"Soft Bounce":smr.checkNumber(rowData.softBounce.count),
							"Technical":smr.checkNumber(rowData.technical.count),
							"Unknown":smr.checkNumber(rowData.unknown.count)
					};
					if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
						resultData["Failures Rate"] = smr.checkNumber(rowData.failed.rate);
					}
					if(breakDownType=="vsg"){
						resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
					}else{
						resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					}
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.title=title;
			tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNDATATABLE";
			brite.display("dataTable",$e.find(".sectionDomainDrilldownTable"),tableDataInfo).done(function(){
				$e.closest(".report").trigger("reportFailureDetailCountClick");
			});
		}
	}
	
	function showPieView(breakDownType,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		showSummary.call(view,reportType,breakDownType,"pie",dataAll,metricName);
		var $sectionFailuresTable = $e.find(".sectionDomainDrilldownPie")
		
		if(typeof dataAll == "undefined"){
			$sectionFailuresTable.html("");
			$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
		}else{
			var data = dataAll;
			
			if(typeof data == "undefined" || data == null){
				$sectionFailuresTable.html("");
				$sectionFailuresTable.append("<div class='noData'>No Data!</div>");
			}else{
				$sectionFailuresTable.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
				if(breakDownType == "failureCode"){
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
					
					for(var i = 0; i < failureData.length; i++){
						var rowData = failureData[i];
						var resultData = {};
						var rValue = smr.checkNumber(rowData.count);
						var percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
						var percentVal = parseFloat(percentChange.toFixed("2"));						
						
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
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;		
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNPIETABLE";
					brite.display("pieChart",$e.find(".sectionDomainDrilldownPie"),tableDataInfo);
				}else if(breakDownType == "failureCategory"){
					var dropDownListVal = [{name:"failures",labelName:"Failures"}];

					var tableColumns = [];					
					var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
					};
					
					tableColumns.push({name:"Failure Category",label:"Failure Category",isDate:true,isMockDateVal:false});
	                tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
	                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
	                tableColumns.push({name:"failuredetailcodecontributiontofailures",label:"Failure Category Contribution to Failures",isPieChart:true,sortable:false});
					
					breakDownName = "Failure Category";
					var categorys = [{name:"block",stufix:"Block"},
									 {name:"hardBounce",stufix:"Hard Bounce"},
									 {name:"softBounce",stufix:"Soft Bounce"},
									 {name:"technical",stufix:"Technical"},
									 {name:"unknown",stufix:"Unknown"}];
					var sumDataCount = 0;
					for(var i = 0; i < categorys.length; i++){
						var rowData = data[categorys[i].name];
						sumDataCount += smr.checkNumber(rowData.count);
					}
					
					for(var i = 0; i < categorys.length; i++){
						var rowData = data[categorys[i].name];
						var rValue = smr.checkNumber(rowData.count);
						var percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
						var percentVal = parseFloat(percentChange.toFixed("2"));
						var resultData = {
								"Failure Category":categorys[i].stufix,
								"Failures" : rValue,
								"%" : percentVal,
								"Failure Category Contribution to Failures" : percentVal
							};
						tableDataInfo.tableData.push(resultData);
					}
					
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNPIETABLE";
					brite.display("pieChart",$e.find(".sectionDomainDrilldownPie"),tableDataInfo);
				}else{
					data = dataAll.data;
					var dropDownListVal = [
					   		            {name:"failures",labelName:"Failures"},
					   					{name:"block",labelName:"Block"},
					   					{name:"hard",labelName:"Hard Bounce"},
					   					{name:"soft",labelName:"Soft Bounce"},
					   					{name:"technical",labelName:"Technical"},
					   					{name:"unknown",labelName:"Unknown"}
					   		         ];

					var tableColumns = [];
					var labelPreFix = (breakDownType == "vsg" ? "Mailing Server Group" : "IP" );
					var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
					};
					
					if(breakDownType=="vsg"){
						tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
					}else{
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
					}

					
					if(metricName == "failures"){
		                tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontofailures",label:labelPreFix +" Contribution to Failures",isPieChart:true,sortable:false});
					}else if(metricName == "block"){
		                tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontoblock",label:labelPreFix +" Contribution to Block",isPieChart:true,sortable:false});
					}else if(metricName == "hard"){
		                tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontohard",label:labelPreFix +" Contribution to Hard Bounce",isPieChart:true,sortable:false});
					}else if(metricName == "soft"){
		                tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontosoft",label:labelPreFix +" Contribution to Soft Bounce",isPieChart:true,sortable:false});
					}else if(metricName == "technical"){
		                tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontotechnical",label:labelPreFix +" Contribution to Technical",isPieChart:true,sortable:false});
					}else if(metricName == "unknown"){
		                tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"rate",label:"%",isRate:true,defaultSort:true});
		                tableColumns.push({name:"datecontributiontounknown",label:labelPreFix +" Contribution to Unknown",isPieChart:true,sortable:false});
					}
					
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						var resultData = {};
						var percentChange = "";
						var percentVal = "";
						var rValue = "";
						if(metricName == "failures"){
							rValue = smr.checkNumber(rowData.failed.count);
							percentChange = smr.formatDivisionNumber(rowData.failed.count,dataAll.failed.count)*100;
							percentVal = parseFloat(percentChange.toFixed("2"));
							resultData = {
								"Failures" : rValue,
								"%" : percentVal
							};
							resultData[labelPreFix +" Contribution to Failures"]=percentVal;
						}else if(metricName == "block"){
							rValue = smr.checkNumber(rowData.block.count);
							percentChange = smr.formatDivisionNumber(rowData.block.count,dataAll.block.count)*100;
							percentVal = parseFloat(percentChange.toFixed("2"));
							resultData = {
								"Block" : rValue,
								"%" : percentVal
							};
							resultData[labelPreFix +" Contribution to Block"]=percentVal;
						}else if(metricName == "hard"){
							rValue = smr.checkNumber(rowData.hardBounce.count);
							percentChange = smr.formatDivisionNumber(rowData.hardBounce.count,dataAll.hardBounce.count)*100;
							percentVal = parseFloat(percentChange.toFixed("2"));
							resultData = {
								"Hard Bounce" : rValue,
								"%" : percentVal
							};
							resultData[labelPreFix +" Contribution to Hard Bounce"]=percentVal;
						}else if(metricName == "soft"){
							rValue = smr.checkNumber(rowData.softBounce.count);
							percentChange = smr.formatDivisionNumber(rowData.softBounce.count,dataAll.softBounce.count)*100;
							percentVal = parseFloat(percentChange.toFixed("2"));
							resultData = {
								"Soft Bounce" : rValue,
								"%" : percentVal
							};
							resultData[labelPreFix +" Contribution to Soft Bounce"]=percentVal;
						}else if(metricName == "technical"){
							rValue = smr.checkNumber(rowData.technical.count);
							percentChange = smr.formatDivisionNumber(rowData.technical.count,dataAll.technical.count)*100;
							percentVal = parseFloat(percentChange.toFixed("2"));
							resultData = {
								"Technical" : rValue,
								"%" : percentVal
							};
							resultData[labelPreFix +" Contribution to Technical"]=percentVal;
						}else if(metricName == "unknown"){
							rValue = smr.checkNumber(rowData.unknown.count);
							percentChange = smr.formatDivisionNumber(rowData.unknown.count,dataAll.unknown.count)*100;
							percentVal = parseFloat(percentChange.toFixed("2"));
							resultData = {
								"Unknown" : rValue,
								"%" : percentVal
							};
							resultData[labelPreFix +" Contribution to Unknown"]=percentVal;
						}
						if(breakDownType=="vsg"){
							resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
						}else{
							resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
						}
						tableDataInfo.tableData.push(resultData);
					}
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNPIETABLE";
					brite.display("pieChart",$e.find(".sectionDomainDrilldownPie"),tableDataInfo);
			
				}
			}
		}			
	}
	
	function showBarView(breakDownType,dataAll,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		showSummary.call(view,reportType,breakDownType,"bar",dataAll,metricName);
		var $sectionFailures = $e.find(".sectionDomainDrilldownBar")
		
		if(typeof dataAll == "undefined"){
			$sectionFailures.html("");
			$sectionFailures.append("<div class='noData'>No Data!</div>");
		}else{
			var data = dataAll;
			
			if(typeof data == "undefined" || data == null){
				$sectionFailures.html("");
				$sectionFailures.append("<div class='noData'>No Data!</div>");
			}else{
				$sectionFailures.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
				if(breakDownType == "failureCode"){
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
					for(var i = 0; i < failureData.length; i++){
						var rowData = failureData[i];
						if(rowData){
							var resultData = {};
							var rValue = smr.checkNumber(rowData.count);
							var percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
							var percentVal = parseFloat(percentChange.toFixed("2"));
							
							//build the tableData
							if(metricName == "failures"){
								resultData = {
									"Failures" : rValue,
									"Failure detail code contribution to Failures" : percentVal
								};
							}else if(metricName == "block"){
								resultData = {
									"Block" : rValue,
									"Failure detail code contribution to Block" : percentVal
								};
							}else if(metricName == "hard"){
								resultData = {
									"Hard Bounce" : rValue,
									"Failure detail code contribution to Hard Bounce" : percentVal
								};
							}else if(metricName == "soft"){
								resultData = {
									"Soft Bounce" : rValue,
									"Failure detail code contribution to Soft Bounce" : percentVal
								};
							}else if(metricName == "technical"){
	
								resultData = {
									"Technical" : rValue,
									"Failure detail code contribution to Technical" : percentVal
								};
							}else if(metricName == "unknown"){
								resultData = {
									"Unknown" : rValue,
									"Failure detail code contribution to Unknown" : percentVal
								};
							}
							resultData[breakDownName] = rowData.code+"";
							
							tableDataInfo.tableData.push(resultData);
						}
					}
					//check whether need to do sortMetrics
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNBARTABLE";
					brite.display("barChart",$e.find(".sectionDomainDrilldownBar"),{tableDataInfo:tableDataInfo});
				} else if(breakDownType=="failureCategory"){
					var dropDownListVal = [{name:"failures",labelName:"Failures"}];

					var tableColumns = [];					
					var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
					};
					
					tableColumns.push({name:"Failure Category",label:"Failure Category",isDate:true,isMockDateVal:true});
	                tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
	                tableColumns.push({name:"failuredetailcodecontributiontofailures",label:"Failure Category Contribution to Failures",isBarChart:true,isRate:true,sortable:false});
					
					var categorys = [{name:"block",stufix:"Block"},
									 {name:"hardBounce",stufix:"Hard Bounce"},
									 {name:"softBounce",stufix:"Soft Bounce"},
									 {name:"technical",stufix:"Technical"},
									 {name:"unknown",stufix:"Unknown"}];
					
					var sumDataCount = 0;
					for(var i = 0; i < categorys.length; i++){
						var rowData = data[categorys[i].name];
						sumDataCount += smr.checkNumber(rowData.count);
					}
					
					for(var i = 0; i < categorys.length; i++){
						var rowData = data[categorys[i].name];
						var rValue = smr.checkNumber(rowData.count);
						var percentChange = smr.formatDivisionNumber(rowData.count,sumDataCount)*100;
						var percentVal = parseFloat(percentChange.toFixed("2"));
						var resultData = {
								"Failure Category":categorys[i].stufix,
								"Failures" : rValue,
								"Failure Category Contribution to Failures" : percentVal
							};
						tableDataInfo.tableData.push(resultData);
					}
					
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNBARTABLE";
					brite.display("barChart",$e.find(".sectionDomainDrilldownBar"),{tableDataInfo:tableDataInfo});
				} else{
					data = dataAll.data;
					var dropDownListVal = [{name:"failures",labelName:"Failures"},
						   					{name:"block",labelName:"Block"},
						   					{name:"hard",labelName:"Hard Bounce"},
						   					{name:"soft",labelName:"Soft Bounce"},
						   					{name:"technical",labelName:"Technical"},
						   					{name:"unknown",labelName:"Unknown"}];
							
					var tableColumns = [];
					
					var tableDataInfo ={
							tableColumns: tableColumns,
						    tableData:[],
						    reportType:reportType
						};
						
					var labelPreFix = (breakDownType == "vsg" ? "Mailing Server Group" : "IP" );
					if(breakDownType=="vsg"){
						tableDataInfo.tableColumns.push({name:"Date",label:"Mailing Server Group",isDate:true,isMockDateVal:true,isAlignLeft:true});
					}else{
						tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
					}
						
					if(metricName == "failures"){
		                tableColumns.push({name:"Failures",label:"Failures",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontofailures",label:labelPreFix+" Contribution to Failures",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "block"){
			            tableColumns.push({name:"Block",label:"Block",isDropDown:true,dropDownList:dropDownListVal});
			            tableColumns.push({name:"datecontributiontoblock",label:labelPreFix+" Contribution to Block",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "hard"){
				        tableColumns.push({name:"Hard Bounce",label:"Hard Bounce",isDropDown:true,dropDownList:dropDownListVal});
				        tableColumns.push({name:"datecontributiontohard",label:labelPreFix+" Contribution to Hard Bounce",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "soft"){
		                tableColumns.push({name:"Soft Bounce",label:"Soft Bounce",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontosoft",label:labelPreFix+" Contribution to Soft Bounce",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "technical"){
		                tableColumns.push({name:"Technical",label:"Technical",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontotechnical",label:labelPreFix+" Contribution to Technical",isBarChart:true,isRate:true,sortable:false});
					}else if(metricName == "unknown"){
		                tableColumns.push({name:"Unknown",label:"Unknown",isDropDown:true,dropDownList:dropDownListVal});
		                tableColumns.push({name:"datecontributiontounknown",label:labelPreFix+" Contribution to Unknown",isBarChart:true,isRate:true,sortable:false});
					}
					
					for(var i = 0; i < data.length; i++){
						var rowData = data[i];
						if(rowData){
							var resultData = {};
							var percentChange = "";
							var percentVal = "";
							var rValue = "";

							if(metricName == "failures"){
								rValue = smr.checkNumber(rowData.failed.count);
								percentChange = smr.formatDivisionNumber(rowData.failed.count,dataAll.failed.count)*100;
								percentVal = parseFloat(percentChange.toFixed("2"));
								resultData = {
									"Failures" : rValue
								};
								resultData[labelPreFix+" Contribution to Failures"]=percentVal;
							}else if(metricName == "block"){
								rValue = smr.checkNumber(rowData.block.count);
								percentChange = smr.formatDivisionNumber(rowData.block.count,dataAll.block.count)*100;
								percentVal = parseFloat(percentChange.toFixed("2"));
								resultData = {
									"Block" : rValue
								};
								resultData[labelPreFix+" Contribution to Block"]=percentVal;
							}else if(metricName == "hard"){
								rValue = smr.checkNumber(rowData.hardBounce.count);
								percentChange = smr.formatDivisionNumber(rowData.hardBounce.count,dataAll.hardBounce.count)*100;
								percentVal = parseFloat(percentChange.toFixed("2"));
								resultData = {
									"Hard Bounce" : rValue
								};
								resultData[labelPreFix+" Contribution to Hard Bounce"]=percentVal;
							}else if(metricName == "soft"){
								rValue = smr.checkNumber(rowData.softBounce.count);
								percentChange = smr.formatDivisionNumber(rowData.softBounce.count,dataAll.softBounce.count)*100;
								percentVal = parseFloat(percentChange.toFixed("2"));
								resultData = {
									"Soft Bounce" : rValue
								};
								resultData[labelPreFix+" Contribution to Soft Bounce"]=percentVal;
							}else if(metricName == "technical"){
								rValue = smr.checkNumber(rowData.technical.count);
								percentChange = smr.formatDivisionNumber(rowData.technical.count,dataAll.technical.count)*100;
								percentVal = parseFloat(percentChange.toFixed("2"));
								resultData = {
									"Technical" : rValue
								};
								resultData[labelPreFix+" Contribution to Technical"]=percentVal;
							}else if(metricName == "unknown"){
								rValue = smr.checkNumber(rowData.unknown.count);
								percentChange = smr.formatDivisionNumber(rowData.unknown.count,dataAll.unknown.count)*100;
								percentVal = parseFloat(percentChange.toFixed("2"));
								resultData = {
									"Unknown" : rValue
								};
								resultData[labelPreFix+" Contribution to Unknown"]=percentVal;
							}
							if(breakDownType=="vsg"){
								resultData["Mailing Server Group"] = rowData.vsg ? rowData.vsg : "no name";
							}else{
								resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
							}
							tableDataInfo.tableData.push(resultData);
						}
					}
					tableDataInfo.skipSortMetrics = true;
					tableDataInfo.smaclass="SMA-REPORT-DOMAINDRILLDOWNBARTABLE";
					brite.display("barChart",$e.find(".sectionDomainDrilldownBar"),{tableDataInfo:tableDataInfo});
				}
			}
		}
	}
	
	function showSummary(reportType,breakDownType,viewType,data,metricName){
		var view = this;
		var fromReportType = view.fromReportType;
		
		var $e = view.$el;
		if(viewType == "pie" || viewType == "bar"){
			var $byTitle = $e.find(".byTitle");
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(breakDownType);
			$byTitle.html("").html("Domain Drilldown by "+title);
		}else{
			var $byTitle = $e.find(".byTitle");
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}
		var $statsSummary = $e.find(".statsSummary");
		var summaryData = data;
		
		
		if(typeof summaryData == "undefined"){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var isClickable = false;
			if(viewType == "pie" || viewType == "bar"){
				isClickable = true;
				if(breakDownType=="failureCategory") isClickable= false;
			}

			var tempFailuresRate = smr.checkNumber(summaryData.failed.rate);
			stats = [];
			stats.push({name:"failures",label:"Failures",value:smr.checkNumber(summaryData.failed.count),isClickable:isClickable});
			if(fromReportType!=smr.REPORT_TYPE.DELIVERABILITYDOMAINS){ 
				stats.push({name:"failuresrate",label:"Failure Rate",value:tempFailuresRate>=10?tempFailuresRate.toFixed("1"):tempFailuresRate.toFixed("2"),isRate:true});
			}
			stats.push({name:"block",label:"Block",value:smr.checkNumber(summaryData.block.count),isClickable:isClickable});
			stats.push({name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.hardBounce.count),isClickable:isClickable});
			stats.push({name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.softBounce.count),isClickable:isClickable});
			stats.push({name:"technical",label:"Technical",value:smr.checkNumber(summaryData.technical.count),isClickable:isClickable});
			stats.push({name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.unknown.count),isClickable:isClickable});
			
			for(var i=0;i<stats.length;i++){
				var mName = stats[i].name;
				if(metricName == mName && stats[i].isClickable){
					stats[i].isSelectedItem = true;
				}
			}
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType,skipSortMetrics:true});
		}
	}
	
	function getSumDataCount(data){
		var dataSumCount = 0;
		for(var i = 0;i <data.length; i++){
			dataSumCount += smr.checkNumber(data[i].count);
		}
		return dataSumCount;
	}
	
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionDomainDrilldown",{
		emptyParent: true
	},function(){
		return new smr.SectionDomainDrilldown();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
