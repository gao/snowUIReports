var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _viewRate;
	var _breakDownType = "day";
	var _subSection = "smsSent";
	var _viewName = "summary";
	// --------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function SectionSMS(){};  
	smr.SectionSMS = SectionSMS; 
	
	SectionSMS.prototype.create = function(data,config){
		return smr.render("tmpl-sectionSMS",{});
	}
		
	SectionSMS.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		var viewName = data.view || "summary";
		view.viewName = viewName;
		view.metricName = data.metricName || "sent";		
		view.reportType = data.reportType || smr.REPORT_TYPE.PROGRAM;
		view.isNewRequest = data.isNewRequest || false;
		
		//in the SMS , there is no breakdown by domain
		var $report = $e.closest(".report");
		_breakDownType = $report.find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").removeClass("default").addClass("isHide");
		if(_breakDownType=="domain"){
			$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
			$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
			_breakDownType == "program";
		}
		
		//in the overview , the breakDown just have "day","week","month","quarter" , if not set default to "day"
		if(viewName == "summary"){
			_breakDownType = (_breakDownType=="day"||_breakDownType=="week"
				||_breakDownType=="month"||_breakDownType=="quarter") ? _breakDownType : "day";
		}
		
		view.showView(viewName,_breakDownType);
	};
	
	SectionSMS.prototype.events = {
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
			
			//redraw chart
			view.getAllData(viewBy).done(function(data){
				showSummaryView.call(view,viewBy,data);
			});
		}
	};
	
	SectionSMS.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for subSection change
			"REPORTHEADER_SUBSECTION_CHANGE" : reportHeaderSubSectionChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod
		}
	};
	
	// --------- events --------- //
	function reportHeaderViewChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var viewName = extra.viewName;
		view.viewName = viewName;
		var viewByOrBreakDownType = "";
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");

		if(viewName == "summary"){
			viewByOrBreakDownType = (_breakDownType=="day"||_breakDownType=="week"
				||_breakDownType=="month"||_breakDownType=="quarter") ? _breakDownType : "day";
		}else{
			viewByOrBreakDownType = _breakDownType;
		}
			
		if(view.showView(viewName,viewByOrBreakDownType)){
			extra.complete = true;
			_viewName = viewName;
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
			view.showView(_viewName,_breakDownType,_subSection,view.metricName);
		}else{
			smr.goBackPreBreakdownValue($this,_breakDownType);
		}
	}
	
	function reportHeaderSubSectionChangeMethod(event,extra){
		var view = this;
		var $this = $(event.currentTarget);
		var val = $this.find(".reportHeader-subSectionCombobox .combobox").attr("data-value");
		_subSection = val;
		var metric = "sent";
		//when change the sub_section , set the default metricName to view
		if(_subSection =="smsSent"){
			$this.find(".reportHeader-breakdownCombobox .combobox .isSMSKeyword").hide();
			$this.find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").removeClass("default").removeClass("isHide");
			if(_breakDownType=="keyword") {
				_breakDownType = "program";
				$this.find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
				$this.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
				$this.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
			}
			view.metricName = metric = "sent";
		}else{
			$this.find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").removeClass("default").addClass("isHide");
			if(_breakDownType=="mailing"){
				_breakDownType = "program";
				$this.find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
				$this.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
				$this.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
			}
			$this.find(".reportHeader-breakdownCombobox .combobox .isSMSKeyword").show();				
			view.metricName = metric = "keyword";
		}
			
		view.showView(_viewName,_breakDownType,_subSection,metric);
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
		var view = this;
		var metric = extra.metricName;
		view.metricName = metric;				
		view.showView(_viewName,_breakDownType,_subSection,metric);
	}
	// --------- /events --------- //
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionSMS.prototype.getAllData = function(viewBy){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"sms",viewBy,view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionSMS.prototype.showView = function(viewName,breakDownType,subSection,metric){
		var view = this;
		var $e = view.$element;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");		
		
		//_viewRate = $e.closest(".report").find(".reportHeader-toggle input[type='checkbox']").attr("checked") ? true : false;
		
		if(typeof breakDownType != 'undefined'){
			_breakDownType = breakDownType;
		}else{
			_breakDownType = _breakDownType || "day";
		}
		
		if(typeof subSection != 'undefined'){
			_subSection = subSection;
		}else{
			_subSection = _subSection || "smsSent";
		}
		
		//if(typeof viewRate != 'undefined'){
		//	_viewRate = viewRate;
		//}

		if(typeof metric != 'undefined'){
			view.metricName = metric;
		}
		var metricName = view.metricName;
		
		//clean first
		$e.bEmpty();
		
		var html;
		if(viewName == 'table'){
			html = smr.render("tmpl-sectionSMS-tableChart",{});			
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionSMS-pieChart",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionSMS-barChart",{});
		}else{
			html = smr.render("tmpl-sectionSMS-summary",{reportType:view.reportType,viewBy:_breakDownType});
		}
		
		$e.append($(html));
		
		view.getAllData(_breakDownType).done(function(dataAll){
			if(viewName == 'table'){
				showTableView.call(view,_breakDownType,_subSection,dataAll);
			}else if(viewName == 'pie'){
				showPieView.call(view,_breakDownType,_subSection,metricName,dataAll);
			}else if(viewName == 'bar'){
				showBarView.call(view,_breakDownType,_subSection,metricName,dataAll);
			}else{
				showSummaryView.call(view,_breakDownType,dataAll);
			}
		});
		
		return true;
	}
	
	SectionSMS.prototype.destroy = function(){
		var view = this;
		var $report = this.$el.closest(".report");
		
		//when leave the SMS, should hide the breakdown "keyword"
		$report.find(".reportHeader-breakdownCombobox .combobox .isSMSKeyword").hide();
		if(_breakDownType == "keyword"){
			$report.find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			$report.find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Program");
			$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='program']").addClass("default");
		}
		
		//when leave SMS , should add the breakdown "domain"
		$report.find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").removeClass("isHide");
	}
	
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showSummaryView(by,dataAll){
		var view = this;
		var $e = view.$el; 
		
		showSummaryChartPart.call(view,by,dataAll.data);		
		showBottomSummaryPart.call(view,by,dataAll.summary);
	}
	
	function showSummaryChartPart(by,data){
		var view = this;
		var $e = view.$el;
		var $container = $e.find(".sectionSMSSummary-chart .chart-content");
		if(typeof data == "undefined" || data == null || data.length==0){
			$container.html("");
			$container.append("<div class='noData'>No Data!</div>");
		}else{
			by = by || "day";

			//clear container
			$container.empty();
			$container.append("<div class='fstCon'></div>");
			
			//init series
			var sentObj = {
					name: "Sent",
					data: [],
					color: "#6cc927"
			};
			var receivedObj = {
					name: "Received",
					data: [],
					color: "#189fc6"
			};

			var categories = [];
			for (var i = 0; i < data.length; i++) {
				categories.push(data[i].date);
				if(data[i].sentSection && data[i].sentSection.sent && data[i].sentSection.sent != ""){
					sentObj.data.push(smr.checkNumber(data[i].sentSection.sent));
				}else{
					sentObj.data.push(null);
				}
				if(data[i].receivedSection && data[i].receivedSection.received && data[i].receivedSection.received != ""){
					receivedObj.data.push(smr.checkNumber(data[i].receivedSection.received));
				}else{
					receivedObj.data.push(null);
				}
			}

			//the first chart
			var fstChart = new Highcharts.Chart({
				chart: {
					renderTo: $container.find('.fstCon').get(0),
					defaultSeriesType: 'line',
					height: 250,
					marginLeft: 60,
					marginRight: 60,
					spacingTop:0,
					spacingBottom:6,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: "SMS",
					align: 'left',
					x:50,
					margin:6,
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
						enabled: true,
						rotation: 325,
						step:Math.ceil(categories.length / 31),
						x: -1,
						y: 20,
						formatter:function() {
							var date = this.value;
							if(by == "day" || by == "week"){
								date = smr.formatDate(smr.parseDate(this.value),"MM-dd")
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
						text: null
					},
					labels:{
						formatter:function() {
							return smr.formatNumber(this.value,"short");
						}
					}
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
					y:-5
				},
				series: [sentObj,receivedObj]
			});
		}
	}
	
	function showBottomSummaryPart(by,data){
		var view = this;
		var $e = view.$el;
		var $summary = $e.find(".sectionSMSSummary-bottom");
		var $lefttable = $e.find(".sectionSMSSummary-bottom-left table");
		var $righttable = $e.find(".sectionSMSSummary-bottom-right table");
		by = by || "day";
		
		//first init
		$lefttable.find("tr:not(:first)").remove();
		$righttable.find("tr:not(:first)").remove();
		var haveData = true;
		if(!data){
			data = {};
			haveData = false;
		}
		
		var summaryObj = {};
		summaryObj.haveData = haveData;
		summaryObj.sent = smr.formatNumber(smr.checkNumber(data.sent));
		summaryObj.failed = smr.formatNumber(smr.checkNumber(data.failed));
		summaryObj.delivered = smr.formatNumber(smr.checkNumber(data.delivered));
		summaryObj.received = smr.formatNumber(smr.checkNumber(data.received));
		summaryObj.failedRate = smr.checkNumber(data.failedRate);
		summaryObj.deliveredRate = smr.checkNumber(data.deliveredRate);
		
		var $trLeft = smr.render("tmpl-sectionSMS-summary-sent-table-tr",{haveData:haveData,summaryObj:summaryObj});
		$lefttable.append($($trLeft));

		var $trRight = smr.render("tmpl-sectionSMS-summary-received-table-tr",{haveData:haveData,summaryObj:summaryObj});
		$righttable.append($($trRight));	
	}
	
	function showTableView(breakDownType,subSection,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $SectionSMS = $e.find(".sectionSMS-table");
		
		if(typeof dataAll == "undefined" || dataAll.data==null ||typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$SectionSMS.html("");
			$SectionSMS.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionSMS.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			
			showSummary.call(view,breakDownType,"table",dataSummary,subSection);
			
			var tableDataInfo={};
			var sectionName="sentSection";
			if(subSection == "smsSent"){
				tableDataInfo ={
						tableColumns: [
						               {name:"sent",label:"Sent"},
						               {name:"failed",label:"Failed"},
						               {name:"delivered",label:"Delivered"},
						               {name:"deliveredRate",label:"Delivery Rate",isRate:true}
						               ],
						tableData:[],
						reportType:reportType,
						maxSize:60
				};
				if(breakDownType == "mailing"){
					tableDataInfo.maxSize = 46;
				}
			} else {
				if(breakDownType=="keyword"){
					tableDataInfo ={
							tableColumns: [
							               {name:"received",label:"Received"},
							               {name:"%",label:"%"}
							              ],
							               tableData:[],
							               reportType:reportType,
							               maxSize:60
					};
				}else{
					tableDataInfo ={
							tableColumns: [
							               {name:"keyword",label:"Keyword"}
//							               {name:"stop",label:"STOP"},
//							               {name:"help",label:"HELP"},
//							               {name:"errors",label:"Errors"}
							               ],
							               tableData:[],
							               reportType:reportType,
							               maxSize:60
					};	
				}
				sectionName="receivedSection";
			}
			
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			var showData = (breakDownType=="keyword"? data[0].receivedSection.keyWords : data);
			
			for(var i = 0; i < showData.length; i++){
				var rowData = showData[i];
				if(rowData){
					var resultData = {};
                    if(subSection == "smsSent"){
                    	if(rowData[sectionName]==null || rowData[sectionName]=="") continue;
                    	resultData = {
                    			"Sent": smr.checkNumber(rowData[sectionName].sent),
                    			"Failed": smr.checkNumber(rowData[sectionName].failed), 
                    			"Delivered": smr.checkNumber(rowData[sectionName].delivered),
                    			"Delivery Rate": smr.checkNumber(rowData[sectionName].deliveredRate)
                    	};
                    }else{
                    	if(breakDownType=="keyword"){
                    		resultData = {
                    				"Received": smr.checkNumber(rowData.count),
                    				"%": smr.checkNumber(rowData.rate)
                    		};
                    	}else{
                    		if(rowData[sectionName]==null || rowData[sectionName]=="") continue;
                    		resultData = {
                    				"Keyword": smr.checkNumber(rowData[sectionName].keywordMessageCount)
//                    				"STOP": smr.checkNumber(rowData[sectionName].stopCount), 
//                    				"HELP": smr.checkNumber(rowData[sectionName].helpCount), 
//                    				"Errors": smr.checkNumber(rowData[sectionName].errorCount)
                    		};
                    	}
                    }
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			var title = smr.buildTitleValue(breakDownType);
			tableDataInfo.title="SMS by "+title;
			tableDataInfo.smaclass="SMA-REPORT-SMSDATATABLE";
			brite.display("dataTable",$e.find(".sectionSMS-table"),tableDataInfo);	
		}
	}
	
	
	function showPieView(breakDownType,subSection,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $SectionSMS = $e.find(".sectionSMS-pie");
		
		if(typeof dataAll == "undefined" || dataAll.data==null || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$SectionSMS.html("");
			$SectionSMS.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionSMS.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			var summaryObj = getSummaryObj(dataSummary);
			
			showSummary.call(view,breakDownType,"pie",dataSummary,subSection,metricName);
			
			var dropDownListVal = [];
			var sectionName="sentSection";
			if(subSection=="smsSent"){
				dropDownListVal = [
						           {name:"sent",labelName:"Sent"},
						           {name:"failed",labelName:"Failed"},
						           {name:"delivered",labelName:"Delivered"}
				                  ];
			}else{
				if(breakDownType=="keyword"){
					dropDownListVal = [
						               {name:"received",labelName:"Received"}
					                  ];
				}else{
					dropDownListVal = [
					                   {name:"keyword",labelName:"Keyword"}
//					                   {name:"stop",labelName:"STOP"},
//					                   {name:"help",labelName:"HELP"},
//					                   {name:"errors",labelName:"Errors"}
					                   ];
				}
				sectionName="receivedSection";
			}
			

			//create the table th value
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			var cloumName = metricName;
			if(metricName == "sent"){
				tableColumns =  [
					               {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"rate",label:"%",isRate:true,defaultSort:true},
					               {name:"datecontributiontosent",label:columnTitle+" Contribution to Sent",isPieChart:true,sortable:false}
					            ];
			}else if(metricName=="failed"){
				tableColumns =  [
					               {name:"failed",label:"Failed",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"rate",label:"%",isRate:true,defaultSort:true},
					               {name:"datecontributiontofailed",label:columnTitle+" Contribution to Failed",isPieChart:true,sortable:false}
					            ];
				
			}else if(metricName=="delivered"){
				tableColumns =  [
					               {name:"delivered",label:"Delivered",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"rate",label:"%",isRate:true,defaultSort:true},
					               {name:"datecontributiontodelivered",label:columnTitle+" Contribution to Delivered",isPieChart:true,sortable:false}
					            ];
				
			}else if(metricName=="keyword" && breakDownType!="keyword"){
				tableColumns =  [
				                 {name:"keyword",label:"Keyword",isDropDown:true,dropDownList:dropDownListVal},
				                 {name:"rate",label:"%",isRate:true,defaultSort:true},
				                 {name:"datecontributiontokeyword",label:columnTitle+" Contribution to Keyword",isPieChart:true,sortable:false}
				                 ];
				cloumName = "keywordMessageCount";
			}else if(metricName=="stop"){
//				tableColumns =  [
//					               {name:"stop",label:"STOP",isDropDown:true,dropDownList:dropDownListVal},
//					               {name:"rate",label:"%",isRate:true,defaultSort:true},
//					               {name:"datecontributiontostop",label:columnTitle+" Contribution to STOP",isPieChart:true,sortable:false}
//				                ];
//				cloumName = "stopCount";
			}else if(metricName=="help"){
//				tableColumns =  [
//					               {name:"help",label:"HELP",isDropDown:true,dropDownList:dropDownListVal},
//					               {name:"rate",label:"%",isRate:true,defaultSort:true},
//					               {name:"datecontributiontohelp",label:columnTitle+" Contribution to HELP",isPieChart:true,sortable:false}
//				                ];
//				cloumName = "helpCount";
			}else if(metricName=="errors"){
//				tableColumns =  [
//					               {name:"errors",label:"Errors",isDropDown:true,dropDownList:dropDownListVal},
//					               {name:"rate",label:"%",isRate:true,defaultSort:true},
//					               {name:"datecontributiontoerrors",label:columnTitle+" Contribution to Errors",isPieChart:true,sortable:false}
//				                ];
//				cloumName = "errorCount";
			}else{
				tableColumns =  [
				                 {name:"received",label:"Received",isDropDown:true,dropDownList:dropDownListVal},
				                 {name:"rate",label:"%",isRate:true,defaultSort:true},
				                 {name:"datecontributiontoreceived",label:columnTitle+" Contribution to Received",isPieChart:true,sortable:false}
				                 ];
			}
			
			var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType,
					    maxSize:20
			};
			if(breakDownType == "mailing"){
				tableDataInfo.maxSize = 14;
			}

			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			var showData = (breakDownType=="keyword"? data[0].receivedSection.keyWords : data);

			for(var i = 0; i < showData.length; i++){
				var rowData = showData[i];
				//build the tableData
				var resultData = {};
				var percentChange = "";
				var percentVal = "";
				var dataVal = "";
				if(rowData){
					if(breakDownType=="keyword"){
						dataVal = smr.checkNumber(rowData.count);
						percentChange = smr.checkNumber(rowData.rate);
						percentVal = smr.formatToFixed(percentChange);
					}else{
						if(rowData[sectionName]!=null && rowData[sectionName]!=""){
							dataVal = smr.checkNumber(rowData[sectionName][cloumName]);
							percentChange = smr.formatDivisionNumber(dataVal,summaryObj[metricName])*100;
							percentVal = smr.formatToFixed(percentChange);
						}else{
							continue;
						}
					}						
					
					if(metricName == "sent"){
						var contributionTo = columnTitle + " Contribution to Sent";
						resultData["Sent"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "failed"){
						var contributionTo = columnTitle + " Contribution to Failed";
						resultData["Failed"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "delivered"){
						var contributionTo = columnTitle + " Contribution to Delivered";
						resultData["Delivered"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "keyword" && breakDownType!="keyword"){
						var contributionTo = columnTitle + " Contribution to Keyword";
						resultData["Keyword"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}else if(metricName == "stop"){
						// var contributionTo = columnTitle + " Contribution to STOP";
						// resultData["STOP"] = dataVal;
						// resultData["%"] = percentVal;
						// resultData[contributionTo] = percentVal;
					}else if(metricName == "help"){
						// var contributionTo = columnTitle + " Contribution to HELP";
						// resultData["HELP"] = dataVal;
						// resultData["%"] = percentVal;
						// resultData[contributionTo] = percentVal;
					}else if(metricName == "errors"){
						// var contributionTo = columnTitle + " Contribution to Errors";
						// resultData["Errors"] = dataVal;
						// resultData["%"] = percentVal;
						// resultData[contributionTo] = percentVal;
					}else{
						var contributionTo = columnTitle + " Contribution to Received";
						resultData["Received"] = dataVal;
						resultData["%"] = percentVal;
						resultData[contributionTo] = percentVal;
					}
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-SMSPIETABLE";
			brite.display("pieChart",$e.find(".sectionSMS-pie"),tableDataInfo);	
		}
		
	}

	function showBarView(breakDownType,subSection,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $SectionSMS = $e.find(".sectionSMS-bar");
		
		if(typeof dataAll == "undefined" || dataAll.data==null || typeof dataAll.data == "undefined"  || typeof dataAll.summary == "undefined" ){
			$SectionSMS.html("");
			$SectionSMS.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionSMS.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll.summary;
			var summaryObj = getSummaryObj(dataSummary);
			
			showSummary.call(view,breakDownType,"bar",dataSummary,subSection,metricName);
			
			var dropDownListVal = [];
			var sectionName="sentSection";
			if(subSection=="smsSent"){
				dropDownListVal = [
						           {name:"sent",labelName:"Sent"},
						           {name:"failed",labelName:"Failed"},
						           {name:"delivered",labelName:"Delivered"}
				                  ];
			} else {
				if(breakDownType=="keyword"){
					dropDownListVal = [
						               {name:"received",labelName:"Received"}
					                  ];
				}else{
					dropDownListVal = [
					                   {name:"keyword",labelName:"Keyword"}
//					                   {name:"stop",labelName:"STOP"},
//					                   {name:"help",labelName:"HELP"},
//					                   {name:"errors",labelName:"Errors"}
					                   ];
				}
				sectionName="receivedSection";
			}
							
			var columnTitle = smr.buildColumnTitleValue(breakDownType);
			var tableColumns = [];
			var cloumName = metricName;
			if(metricName == "sent"){
				tableColumns =  [
					               {name:"sent",label:"Sent",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"Sent",label:columnTitle+" Contribution to Sent",isBarChart:true,sortable:false,isRate:true}
					            ];
			}else if(metricName=="failed"){
				tableColumns =  [
					               {name:"failed",label:"Failed",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"Failed",label:columnTitle+" Contribution to Failed",isBarChart:true,sortable:false,isRate:true}
					            ];
				
			}else if(metricName=="delivered"){
				tableColumns =  [
					               {name:"delivered",label:"Delivered",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"Delivered",label:columnTitle+" Contribution to Delivered",isBarChart:true,sortable:false,isRate:true}
					            ];
				
			}else if(metricName=="keyword" && breakDownType!="keyword"){
				tableColumns =  [
					               {name:"keyword",label:"Keyword",isDropDown:true,dropDownList:dropDownListVal},
					               {name:"Keyword",label:columnTitle+" Contribution to Keyword",isBarChart:true,sortable:false,isRate:true}
				                ];
				cloumName = "keywordMessageCount";
			}else if(metricName=="stop"){
//				tableColumns =  [
//					               {name:"stop",label:"STOP",isDropDown:true,dropDownList:dropDownListVal},
//					               {name:"STOP",label:columnTitle+" Contribution to STOP",isBarChart:true,sortable:false,isRate:true}
//				                ];
//				cloumName = "stopCount";
			}else if(metricName=="help"){
//				tableColumns =  [
//					               {name:"help",label:"HELP",isDropDown:true,dropDownList:dropDownListVal},
//					               {name:"HELP",label:columnTitle+" Contribution to HELP",isBarChart:true,sortable:false,isRate:true}
//				                ];
//				cloumName = "helpCount";
			}else if(metricName=="errors"){
//				tableColumns =  [
//					               {name:"errors",label:"Errors",isDropDown:true,dropDownList:dropDownListVal},
//					               {name:"Errors",label:columnTitle+" Contribution to Errors",isBarChart:true,sortable:false,isRate:true}
//				                ];
//				cloumName = "errorCount";
			}else{
				tableColumns =  [
					                {name:"received",label:"Received",isDropDown:true,dropDownList:dropDownListVal},
					                {name:"Received",label:columnTitle+" Contribution to Received",isBarChart:true,sortable:false,isRate:true}
				                 ];
			}
			
			
			var tableDataInfo ={
						tableColumns: tableColumns,
					    tableData:[],
					    reportType:reportType
			};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,breakDownType);
			
			var showData = (breakDownType=="keyword"? data[0].receivedSection.keyWords : data);
			
			for(var i = 0; i < showData.length; i++){
				var rowData = showData[i];
				if(rowData){
					var percentChange = "";
					var dataVal = "";
					var resultData = {};
					
					if(breakDownType=="keyword"){
						dataVal = smr.checkNumber(rowData.count);
						percentChange = smr.checkNumber(rowData.rate);
					}else{
						if(rowData[sectionName]==null || rowData[sectionName]=="") continue;
						dataVal = smr.checkNumber(rowData[sectionName][cloumName]);
						percentChange = smr.formatDivisionNumber(dataVal,summaryObj[metricName])*100;
					}	
					
					if(metricName == "sent"){
						var contributionTo = columnTitle + " Contribution to Sent";
						resultData["Sent"] = dataVal;
						resultData[contributionTo] = percentChange;
					}else if(metricName == "failed"){
						var contributionTo = columnTitle + " Contribution to Failed";
						resultData["Failed"] = dataVal;
						resultData[contributionTo] = percentChange;
					}else if(metricName == "delivered"){
						var contributionTo = columnTitle + " Contribution to Delivered";
						resultData["Delivered"] = dataVal;
						resultData[contributionTo] = percentChange;
					}else if(metricName == "keyword" && breakDownType!="keyword"){
						var contributionTo = columnTitle + " Contribution to Keyword";
						resultData["Keyword"] = dataVal;
						resultData[contributionTo] = percentChange;
					}else if(metricName == "stop"){
						// var contributionTo = columnTitle + " Contribution to STOP";
						// resultData["STOP"] = dataVal;
						// resultData[contributionTo] = percentChange;
					}else if(metricName == "help"){
						// var contributionTo = columnTitle + " Contribution to HELP";
						// resultData["HELP"] = dataVal;
						// resultData[contributionTo] = percentChange;
					}else if(metricName == "errors"){
						// var contributionTo = columnTitle + " Contribution to Errors";
						// resultData["Errors"] = dataVal;
						// resultData[contributionTo] = percentChange;
					}else{
						var contributionTo = columnTitle + " Contribution to Received";
						resultData["Received"] = dataVal;
						resultData[contributionTo] = percentChange;
					}
						
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,breakDownType,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-SMSBARTABLE";
			brite.display("barChart",$e.find(".sectionSMS-bar"),{tableDataInfo:tableDataInfo});	
		}
		
	}
	
	
	function showSummary(breakDownType,viewType,data,subSection,metricName){
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
			$byTitle.html("SMS by "+title);
		}
		
		//var summaryObj = getSummaryObj(data);
				
		var $statsSummary = $e.find(".statsSummary");
		var stats = [];
		var isClickable = false;
		if(viewType == "pie" || viewType == "bar"){
			isClickable = true;
		}
		if(breakDownType=="keyword"){
			isClickable = false;
		}
        if(subSection == "smsSent"){
        	stats = [
        	         {name:"sent",label:"Sent",value: data.sent,isClickable:isClickable},
        	         {name:"failed",label:"Failed",value: data.failed,isClickable:isClickable},
        	         {name:"delivered",label:"Delivered",value: data.delivered,isClickable:isClickable},
        	         {name:"deliveredRate",label:"Delivery Rate",isRate:true,value: data.deliveredRate,isClickable:false}
        	         ];
        }else{
        	stats = [
        	         {name:"received",label:"Received",value: data.received,isClickable:false},
        	         {name:"keyword",label:"Keyword",value: data.totalKeywordRequests,isClickable:isClickable}
//        	         {name:"stop",label:"STOP",value: data.stopCount,isClickable:isClickable},
//        	         {name:"help",label:"HELP",value: data.helpCount,isClickable:isClickable},
//        	         {name:"errors",label:"Errors",value: data.errorCount,isClickable:isClickable}
        	         ];
        }
		
		for(var i=0;i<stats.length;i++){
			var mName = stats[i].name;
			if(metricName == mName && stats[i].isClickable){
				stats[i].isSelectedItem = true;
			}
		}
		
		brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType});
	}
	
	function getSummaryObj(data){
		var summaryObj = {};
		var summaryData = data || {};
		
		summaryObj.sent = smr.checkNumber(summaryData.sent);
		summaryObj.failed = smr.checkNumber(summaryData.failed);
		summaryObj.failedRate = smr.checkNumber(summaryData.failedRate);
		summaryObj.delivered = smr.checkNumber(summaryData.delivered);
		summaryObj.deliveredRate = smr.checkNumber(summaryData.deliveredRate);
		summaryObj.received = smr.checkNumber(summaryData.received);
		
		summaryObj.keyword = smr.checkNumber(summaryData.totalKeywordRequests);
		summaryObj.keywordRate = smr.checkNumber(summaryData.totalKeywordRequestsRate);
		
		summaryObj.stop = smr.checkNumber(summaryData.stopCount);
		summaryObj.stopRate = smr.checkNumber(summaryData.stopRate);
		
		summaryObj.help = smr.checkNumber(summaryData.helpCount);
		summaryObj.helpRate = smr.checkNumber(summaryData.helpRate);
		
		summaryObj.errors = smr.checkNumber(summaryData.errorCount);
		summaryObj.errorsRate = smr.checkNumber(summaryData.errorRate);
		
		return summaryObj;
	}
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("sectionSMS",{
		emptyParent: true
	},function(){
		return new smr.SectionSMS();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
