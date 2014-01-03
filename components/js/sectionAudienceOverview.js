var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _breakDownType;
	var _viewBy = "day";
	// --------- /Component Private Properties --------- //
	
    // --------- Component Interface Implementation ---------- //
	function SectionAudienceOverview(){};
	smr.SectionAudienceOverview = SectionAudienceOverview; 
	
	SectionAudienceOverview.prototype.create = function(data,config){
		var $html = smr.render("tmpl-sectionAudienceOverview",{});
		var $e = $($html);
        return $e;
	};
		
	SectionAudienceOverview.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$element;
		data = data || {};
		var viewName = data.view || "summary";
		view.viewName = viewName;
		view.reportType = data.reportType || smr.REPORT_TYPE.AUDIENCE;
		view.metricName = data.metricName || "total";
		view.isNewRequest = data.isNewRequest || false;
		
		//hide the target mailing and campaign
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='target']").addClass("isHide");
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='campaign']").addClass("isHide");
		$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='mailing']").addClass("isHide");
		//show the engagementBucket
        var set = smr.getSetAndType(view.reportType,"main").set;
        var list = set.list();
		var dataSourceType = list[0] ? list[0].dataSourceType: "ids";
		if(dataSourceType!="eds"){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='engagementBucket']").removeClass("isHide");
		}else{
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='engagementBucket']").addClass("isHide");
		}
		if(!data.opts.fromLeftNav){
			view.showView(viewName,_viewBy);
		}else{
			$e.closest(".report").find(".reportHeader-mailingSelector .needS").html("no name");
			brite.display("targetPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					view.showView(viewName,_viewBy);
				});
			});
		}
	};
	
	SectionAudienceOverview.prototype.events = {
			
			"click; .viewBy .action" : function(event){
				var $this = $(event.currentTarget);
				$this.closest(".viewBy").find(".action").removeClass("selected");
				$this.addClass("selected");
			},
			
			"click; .viewBy.head .action" : function(event){
				var view = this;
				var $e = view.$el;
				var $this = $(event.currentTarget);
				var viewBy = $this.attr("data-view");
				_viewBy = viewBy;
				//redraw chart
				view.getAllData(viewBy).done(function(data){
					showSummaryView.call(view,viewBy,data);
				});
			}
	};
	
	SectionAudienceOverview.prototype.parentEvents = {
		report:{
			//event for view change
			"REPORTHEADER_VIEW_CHANGE": reportHeaderViewChangeMethod,
			
			//event for breakdown change
			"REPORTHEADER_BREAKDOWN_CHANGE": reportHeaderBreakDownChangeMethod,
			
			//event for statSummary box change
			"STATSSUMMARY_DATAITEM_CHANGE":  statsSummaryDataItemChangeMetod
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
		
		if(_breakDownType == "target" || _breakDownType=="day" || _breakDownType=="week" || _breakDownType=="month" || _breakDownType=="quarter"|| _breakDownType=="year"){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").removeClass("default");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .combobox-button label").html("Domain");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='domain']").addClass("default");
			_breakDownType = "domain";
		}
		
		if(viewName == "pie" || viewName == "bar"){
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='day']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='week']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='month']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='quarter']").addClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='year']").addClass("isHide");
		}else{
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='day']").removeClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='week']").removeClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='month']").removeClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='quarter']").removeClass("isHide");
			$e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .item[data-value='year']").removeClass("isHide");
		}

		if(viewName == "summary"){
			viewByOrBreakDownType = _viewBy;
		}else{
			viewByOrBreakDownType = _breakDownType;
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
		var viewName = view.viewName;
		var val = $this.find(".reportHeader-breakdownCombobox .combobox").attr("data-value");
		_breakDownType = val;
		if(val=="day" || val=="week" || val=="month" || val=="quarter" || val=="year"){
			if(viewName=="pie" || viewName=="bar"){
				viewName = "table";
				var $viewButton = $e.closest(".report").find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='table']");
				var $reportHeaderViewSelector = $e.closest(".report").find(".reportHeader-viewSelector");
				$reportHeaderViewSelector.find(".reportsHeader-viewButton").removeClass("sel").find(".ico").removeClass("sel");
				$viewButton.addClass("sel").find(".ico").addClass("sel");
			}
		}
		view.showView(viewName,_breakDownType);
	}
	
	function statsSummaryDataItemChangeMetod(event,extra){
		var metric = extra.metricName;
		view.metricName = metric;
		view.showView(view.viewName,_breakDownType,metric);
	}
	
	// --------- /events --------- //
	
	
    // --------- /Component Interface Implementation ---------- //

    // --------- Component Public API --------- //
	SectionAudienceOverview.prototype.getAllData = function(viewBy){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"audience",viewBy,view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	};
	
	SectionAudienceOverview.prototype.showView = function(viewName,breakDownType,metric){
		var view = this;
		var $e = view.$el;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(typeof breakDownType != 'undefined'){
			if(viewName == 'summary'){
				_viewBy = breakDownType;
			}else{
				_breakDownType = breakDownType;
			}
		}else{
			_breakDownType = "day";
		}
		
		if(typeof metric != 'undefined'){
			view.metricName = metric;
		}
		var metricName = view.metricName;
		//clean first
		$e.bEmpty();
		var html;
		if(viewName == 'summary'){
			html = smr.render("tmpl-sectionAudienceOverviewSummary",{reportType:view.reportType,viewBy:_viewBy});
		}else if(viewName == 'table'){
			html = smr.render("tmpl-sectionAudienceOverview-table",{});
		}else if(viewName == 'pie'){
			html = smr.render("tmpl-sectionAudienceOverview-pie",{});
		}else if(viewName == 'bar'){
			html = smr.render("tmpl-sectionAudienceOverview-bar",{});
		}else{
			return false;
		}

		$e.append($(html));
		var _Brby = _viewBy;
		if(viewName == 'summary'){
			view.getAllData(_viewBy).done(function(dataAll){
				showSummaryView.call(view,_viewBy,dataAll);
			});
		}else {
			_Brby = _breakDownType;
			view.getAllData(_breakDownType).done(function(dataAll){
				if(viewName == 'table'){
					showTableView.call(view,_breakDownType,dataAll.totalData);
				}else if(viewName == 'pie'){
					showPieView.call(view,_breakDownType,metricName,dataAll.totalData);
				}else if(viewName == 'bar'){
					showBarView.call(view,_breakDownType,metricName,dataAll.totalData);
				}
			});
		}
		if((_Brby=="day" || _Brby=="week" || _Brby=="month" || _Brby=="quarter" || _Brby=="year") && viewName != 'summary'){
		}else{
			$e.closest(".report").find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='pie']").removeClass("viewButton-disabled");
			$e.closest(".report").find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='bar']").removeClass("viewButton-disabled");
		}
		
		return true;
	};
	
    // --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	
	function showBarView(by,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var SectionAudienceOverviewC = $e.bComponent("sectionAudienceOverview");
		var reportType = view.reportType;
		var $SectionAudienceOverview = $e.find(".sectionAudienceOverviewBar-table");
		
		if(typeof dataAll == "undefined" || dataAll==null || typeof dataAll.data == "undefined" || dataAll.data==null ){
			$SectionAudienceOverview.html("");
			$SectionAudienceOverview.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionAudienceOverview.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll;
			
			var dropDownListVal = [{name:"total",labelName:"Total"}];
			
			//show summary
			showStatSummaryPart.call(view,by,"bar",dataSummary,metricName);
			var columnTitle = smr.buildColumnTitleValue(by)+" Contribution to Total";
			
			//change the column when click statSummary box
			var tableColumns = [];
			if(metricName == "total"){
				tableColumns = [
			                {name:"total",label:"Total",isDropDown:false,dropDownList:dropDownListVal},
			                {name:"total",label:columnTitle,isBarChart:true,isRate:true}
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
					var percentVal = "";
					var dataVal = "";
					
					if(metricName == "total"){
						percentChange = rowData.percentageOfTotal;
						percentVal = parseFloat(percentChange.toFixed("2"));
						dataVal = smr.checkNumber(rowData[metricName]);
						resultData = {
								"Total" : dataVal
							};
						resultData[columnTitle] = percentVal;
					}else if(metricName == "change"){
						percentChange = rowData.percentageChange;
						percentVal = parseFloat(percentChange.toFixed("2"));
						dataVal = smr.checkNumber(rowData[metricName]);
						resultData = {
								"Change" : dataVal
							};
						resultData[columnTitle] = percentVal;
					}
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,by,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-AUDIENCEOVERVIEWBARTABLE";
			brite.display("barChart",$e.find(".sectionAudienceOverviewBar-table"),{tableDataInfo:tableDataInfo});
		}
	}
	
	function showPieView(by,metricName,dataAll){
		var view = this;
		var $e = view.$el;
		var SectionAudienceOverviewC = $e.bComponent("sectionAudienceOverview");
		var reportType = view.reportType;
		var $SectionAudienceOverview = $e.find(".sectionAudienceOverviewPie-pie");
		
		if(typeof dataAll == "undefined" || dataAll==null || typeof dataAll.data == "undefined" || dataAll.data==null){
			$SectionAudienceOverview.html("");
			$SectionAudienceOverview.append("<div class='noData'>No Data!</div>");
		}else{
			$SectionAudienceOverview.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			var dataSummary = dataAll;
			
			var dropDownListVal = [{name:"total",labelName:"Total"}];
			
			//show summary
			showStatSummaryPart.call(view,by,"pie",dataSummary,metricName);
			
			var columnTitle = smr.buildColumnTitleValue(by)+" Contribution to Total";
			//show pie table
			var tableColumns = [];
			if(metricName == "total"){
				tableColumns = [
			                {name:"total",label:"Total",isDropDown:false,dropDownList:dropDownListVal},
			                {name:"rate",label:"%",isRate:true,defaultSort:true},
			                {name:"datecontributiontototal",label:columnTitle,isPieChart:true,sortable:false}
			              ];
			}
			
			var tableDataInfo ={
				tableColumns: tableColumns,
			    tableData:[],
				reportType:reportType,
				maxSize: 20
			};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,by);

			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				//build the tableData
				var resultData = {};
				var percentChange = "";
				var percentVal = "";
				var dataVal = "";
				
				if(metricName == "total"){
					percentChange = rowData.percentageOfTotal;
					percentVal = parseFloat(percentChange.toFixed("2"));
					dataVal = smr.checkNumber(rowData[metricName]);
					resultData = {
							"Total" : dataVal,
							"%" : percentVal
						};
					resultData[columnTitle] = percentVal;
				}else if(metricName == "change"){
					percentChange = rowData.percentageChange;
					percentVal = parseFloat(percentChange.toFixed("2"));
					dataVal = smr.checkNumber(rowData[metricName]);
					resultData = {
							"Change" : dataVal,
							"%" : percentVal
						};
					resultData[columnTitle] = percentVal;
				}
				
				//add the column data
				resultData = smr.addTableColumnData(resultData,rowData,by,reportType);
				
				tableDataInfo.tableData.push(resultData);
			}
			tableDataInfo.smaclass="SMA-REPORT-AUDIENCEOVERVIEWPIETABLE";
			brite.display("pieChart",$e.find(".sectionAudienceOverviewPie-pie"),tableDataInfo);
		}
	}
	
	function showTableView(by,dataAll){
		var view = this;
		var $e = view.$el;
		var SectionAudienceOverviewC = $e.bComponent("sectionAudienceOverview");
		var reportType = view.reportType;
		var $SectionAudienceOverview = $e.find(".sectionAudienceOverviewTable-table");
		
		if(typeof dataAll == "undefined" || dataAll==null || typeof dataAll.data == "undefined" || dataAll.data==null ){
			$SectionAudienceOverview.html("");
			$SectionAudienceOverview.append("<div class='noData'>No Data!</div>");
		}else{
			var data = dataAll.data;
			var dataSummary = dataAll;
			$SectionAudienceOverview.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			//show summary
			showStatSummaryPart.call(view,by,"table",dataSummary);
			
			//show table
			var tableColumns = [];   
			var tableDataInfo = {
					tableColumns: tableColumns,
					tableData:[],
					reportType:reportType,
					maxSize:20
				};
			
			//change the column when different breakDownType
			tableDataInfo = smr.addTableColumn(tableDataInfo,by);
			
			tableColumns.push({name:"% Change",isRate:true});
			tableColumns.push({name:"Change"});
			tableColumns.push({name:"Total"});
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {
							"% Change" : rowData.percentageChange!=null? smr.checkNumber(rowData.percentageChange):"null",	
							"Change" : smr.checkNumber(rowData.change),
							"Total" : smr.checkNumber(rowData.total)
					};
					
					//add the column data
					resultData = smr.addTableColumnData(resultData,rowData,by,reportType);
					
					tableDataInfo.tableData.push(resultData);
				}
			}	
			var title = smr.buildTitleValue(by);
			tableDataInfo.skipSortMetrics = true;
			tableDataInfo.title="Overview by "+title;
			tableDataInfo.smaclass="SMA-REPORT-AUDIENCEOVERVIEWDATATABLE";
			brite.display("dataTable",$e.find(".sectionAudienceOverviewTable-table"),tableDataInfo);
		}
	}
	
	function showSummaryView(by,dataAll){
		var view = this;
		var $e = view.$el; 
		
		showSummaryChartPart.call(view,by,dataAll.totalData?dataAll.totalData.data : null);
		
		showBottomSummaryPart.call(view,by,dataAll);
	}
	
	function showStatSummaryPart(by,viewType,data,metricName){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $byTitle = $e.find(".byTitle");
		if(viewType == "table"){
			$byTitle.addClass("byTitle-table");
			$byTitle.html("Summary Statistics");
		}else{
			$byTitle.removeClass("byTitle-table");
			var title = smr.buildTitleValue(by);
			$byTitle.html("Overview by "+title);
		}
		
		var $statsSummary = $e.find(".statsSummary");
		by = by || "day";
		
		var isClickable = false;
		if(viewType == "pie" || viewType == "bar"){
			isClickable = true;
		}

		var summaryData = data;
		var stats = [];
		
		stats.push({name:"%change",label:"% Change",value:smr.checkNumber(summaryData.totalPercentageChange),isRate:true});
		stats.push({name:"change",label:"Change",value:smr.checkNumber(summaryData.totalSizeChange),isClickable:false});
		stats.push({name:"total",label:"Total",value:smr.checkNumber(summaryData.totalSize),isClickable:isClickable});

		
		for(var i=0;i<stats.length;i++){
			var mName = stats[i].name;
			if(metricName == mName && stats[i].isClickable){
				stats[i].isSelectedItem = true;
			}
		}
		
		brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType,skipSortMetrics:true}).done(function(){
			//in table view there a gap between statSummary and table,but pie and bar view not have
			var $statsSummary = $e.find(".statsSummary");
			if(viewType == "table"){
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
		var $container = $e.find(".sectionAudienceOverviewSummary-chart .chart-content");
		
		if(typeof data == "undefined" || data==null){
			$container.html("");
			$container.append("<div class='noData'>No Data!</div>");
		}else{
			by = by || "day";

			//clear container
			$container.empty();
			$container.append("<div class='fstCon'></div><div class='secCon'></div>");
			
			//init series
			var audienceObj = {
				name: "Audience Size",
				data: [],
				color: "#6cc927"
			};
			
			var categories = [];
			for (var i = 0; i < data.length; i++) {
				categories.push(data[i].date);
				audienceObj.data.push(smr.checkNumber(data[i].total));
			}
			
			
			//the first chart
			var fstChart = new Highcharts.Chart({
				chart: {
					renderTo: $container.find('.fstCon').get(0),
					defaultSeriesType: 'line',
					height: 200,
					marginLeft: 60,
					marginRight: 60,
					spacingTop:0,
					spacingBottom:6,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: "Audience",
					align: 'left',
					x:50,
					margin:1,
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
							var showVal = smr.formatNumber(this.value,"short");
							return showVal;
						}
					},
					allowDecimals:false
				},
				credits: {
					enabled: false
				},
				tooltip: {
			        formatter: function() {
						var yVal = this.y;
			            return '<span>' + this.x + '</span><br/>' + '<span>' + this.series.name + ': <b>' + smr.formatNumber(yVal) + '</b></span>';
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
				series: [audienceObj]
			});
			
		}
		
	}
	
	function showBottomSummaryPart(by,data){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;

		var $summaryBottom = $e.find(".sectionAudienceOverviewSummary-bottom");
		var $totalSize = $summaryBottom.find(".totalSize");
		var $engagementSpanTitle = $summaryBottom.find(".spanTitle.engagementBreakDown");
		var $engagementBreakDownTable = $summaryBottom.find(".sectionAudienceOverviewSummary-engagementBreakDown table");
		var $top5ISPsTable = $summaryBottom.find(".sectionAudienceOverviewSummary-top5ISPs table");
		var $addressLifetimeSpanTitle = $summaryBottom.find(".spanTitle.addressLifetimeBreakDown");
		var $addressLifetimeTable = $summaryBottom.find(".sectionAudienceOverviewSummary-addressLifetime table");
		
		if(typeof data == "undefined"){
			$summaryBottom.html("");
			$summaryBottom.append("<div class='noData'>No Data!</div>");
		}else{
			//first init 
			$totalSize.find("span").remove();
			$engagementBreakDownTable.find("tr:not(:first)").remove();
			$top5ISPsTable.find("tr:not(:first)").remove();
			$addressLifetimeTable.find("tr:not(:first)").remove();
			
			//display the Total Size
			var arrow = function(v1){
	            if(v1>0.1){
	                return "up";
	            }else if(v1<-0.1){
	                return "down";
	            }else{
	                return "no";
	            }
	        };
	        if(typeof data.totalData != "undefined" && data.totalData!=null){
	        	var totalSizeData = {
	        			"total":smr.formatNumber(data.totalData.totalSize),
	        			"percentChange":smr.checkNumber(data.totalData.totalPercentageChange),
	        			"arrowVal" : arrow(data.totalData.totalPercentageChange)
	        	}
	        	var $totalSizeRender = smr.render("tmpl-sectionAudienceOverviewSummary-bottom-totalSize",{summary:totalSizeData});
	        	$totalSize.append($totalSizeRender);
	        }
			
			//Show one for Active, At Risk, and Inactive engagement buckets
			//display the Engagement BreakDown ,here the 'lapsed' is the same as 'At Risk' indicated in PRD
	        var set = smr.getSetAndType(reportType,"main").set;
	        var list = set.list();
			var dataSourceType = list[0]? list[0].dataSourceType : "ids";
			if(dataSourceType=="eds"){
				$engagementSpanTitle.hide();
				$engagementBreakDownTable.hide();
				$e.closest(".report").find(".reportHeader .reportHeader-nav .reportHeader-nav-item[data-section='sectionEngagement']").hide();
			}else{
				$engagementSpanTitle.show();
				$engagementBreakDownTable.show();
				$e.closest(".report").find(".reportHeader .reportHeader-nav .reportHeader-nav-item[data-section='sectionEngagement']").show();
		        if(typeof data.engagementData != "undefined" && data.engagementData!=null){
					var engData = data.engagementData;
					var engagementNames= ["active","lapsed" ,"inactive"] ;
					for(var i=0 ; i<engagementNames.length; i++){
						var eData = engagementNames[i];
						var className = smr.formatNameToCss(eData);
				        
						var engagementData = {
							"count": smr.formatNumber(engData[eData]),
							"percentChange":engData[eData+"PercentageChange"]!=null?smr.formatNumber(engData[eData+"PercentageChange"]):null,
							"totalPercent": smr.formatNumber(engData[eData+"PercentageOfTotal"]),
							"className": className,
							"arrowVal" : arrow(smr.formatNumber(engData[eData+"PercentageChange"]))
						};
						if(eData=="active"){
							engagementData.name="Active";
						}else if(eData=="inactive"){
							engagementData.name="Inactive";
						}else{
							engagementData.name="Lapsed";
						}
						
						var myvalues = [];
						var sparkData = engData.data;
						for(var j=0 ; j<sparkData.length; j++){
							myvalues.push(sparkData[j][eData]);
						}
						
						var $tr = smr.render("tmpl-sectionAudienceOverviewSummary-bottom-tr",{summaryObj:engagementData});
						$engagementBreakDownTable.append($tr);
						var _width = $engagementBreakDownTable.find("."+className).width();
						$engagementBreakDownTable.find("."+className).sparkline(myvalues, {type:'line', lineColor:'#058DC7',fillColor:'#E2F4F7',spotRadius:0,width:_width+'px',height:'20px',lineWidth:'2'});
					}
		        }
			}
			
			//display the Top 5 ISPs, use the 'domainData'
	        if(typeof data.domainData != "undefined" && data.domainData!=null){
				var topISPsData = data.domainData;
				for(var i=0 ; i<topISPsData.length; i++){
					var tData = topISPsData[i];
					var className = smr.formatNameToCss(tData.domain);
					var topData = {
						"name":	tData.domain,
						"count": smr.formatNumber(tData.activeCount),
						"percentChange": tData.percentageChange!=null ? tData.percentageChange : null,
						"totalPercent": tData.percentageOfTotal,
						"className": className,
						"arrowVal" : arrow(tData.percentageChange)
					};
					
					var myvalues = [];
					var sparkData = tData.data;
					for(var j=0 ; j<sparkData.length; j++){
						myvalues.push(sparkData[j].activeCount);
					}
					
					var $trISPs = smr.render("tmpl-sectionAudienceOverviewSummary-bottom-tr",{summaryObj:topData});
					$top5ISPsTable.append($trISPs);
					var _width = $top5ISPsTable.find("."+className).width();
					$top5ISPsTable.find("."+className).sparkline(myvalues, {type:'line', lineColor:'#058DC7',fillColor:'#E2F4F7',spotRadius:0,width:_width+'px',height:'20px',lineWidth:'2'});
				}
	        }
			//display the Address Lifetime,use the 'addressLifetimeData'
	        if(dataSourceType=="eds"){
	        	$addressLifetimeSpanTitle.hide();
	        	$addressLifetimeTable.hide();
	        }else{
	        	$addressLifetimeSpanTitle.show();
	        	$addressLifetimeTable.show();
	        	if(typeof data.addressLifetimeData != "undefined" && data.addressLifetimeData!=null){
	        		var addressLifetimeData = sortAddressLifetimeData(data.addressLifetimeData);
	        		for(var i=0 ; i<addressLifetimeData.length; i++){
	        			var aData = addressLifetimeData[i];
	        			var className = smr.formatNameToCss(aData.bucketName);
	        			var medianVal = aData.median;
	        			var medianValue = "";
	        			if(medianVal == null){
	        				medianValue = null;
	        			}else{
	        				if(medianVal < 60){
		        				medianValue = medianVal;
		        				if(medianValue == 1 || medianValue == 0){
		        					medianValue = medianValue + " day";
		        				}else{
		        					medianValue = medianValue + " days";
		        				}
		        			}else if(medianVal >= 60 && medianVal < 365){
		        				medianValue = (medianVal/30).toFixed("0") + " months";
		        			}else if(medianVal >= 365){
		        				medianValue = medianVal/365;
		        				if(medianValue == 1){
		        					medianValue = medianValue.toFixed("1") + " year";
		        				}else{
		        					medianValue = medianValue.toFixed("1") + " years";
		        				}
		        			}
	        			}
	        			
	        			
	        			var showName = "";
	        			if(aData.bucketName=="lapsed"){
	        				showName ="Lapsed";
	        			}else if(aData.bucketName=="inactive"){
	        				showName ="Inactive";
	        			}else if(aData.bucketName=="active"){
	        				showName ="Active";
	        			}else if(aData.bucketName=="total"){
	        				showName ="All";
	        			}
	        			var topData = {
	        					"name":	showName,
	        					"median": medianValue,
	        					"className": className
	        			};
	        			
	        			var myvalues = [];
	        			var sparkData = aData.data;
	        			if(sparkData){
	        				for(var j=0 ; j<sparkData.length; j++){
		        				myvalues.push(sparkData[j].count);
		        			}
	        			}
	        			
	        			var myvalues2 = [];
	        			if(aData.distribution){
	        				myvalues2 = aData.distribution;
	        			}
	        			
	        			var $trLifetime = smr.render("tmpl-sectionAudienceOverviewSummary-bottom-lifetime-tr",{summaryObj:topData});
	        			$addressLifetimeTable.append($trLifetime);
	        			
	        			$addressLifetimeTable.find(".sparkBar."+className).sparkline(myvalues2, {type:'bar', barColor: 'blue'});
	        			$addressLifetimeTable.find(".sparkLine."+className).sparkline(myvalues, {type:'line', lineColor:'#058DC7',fillColor:'#E2F4F7',spotRadius:0,width:'300px',height:'20px',lineWidth:'2'});
	        		}
	        	}
	        }
		}
	}
	
	function sortAddressLifetimeData(data){
		var temp = [];
		for(var i=0 ; i<data.length; i++){
			if(data[i].bucketName=="active") temp.push(data[i]);
		}
		for(var i=0 ; i<data.length; i++){
			if(data[i].bucketName=="lapsed") temp.push(data[i]);
		}
		for(var i=0 ; i<data.length; i++){
			if(data[i].bucketName=="inactive") temp.push(data[i]);
		}
		for(var i=0 ; i<data.length; i++){
			if(data[i].bucketName=="total") temp.push(data[i]);
		}
		return temp;
	}
	// --------- /Component Private Methods --------- //

    // --------- Component Registration --------- //
    brite.registerView("sectionAudienceOverview", {
            emptyParent : true
        },
        function () {
            return new smr.SectionAudienceOverview();
        });
    // --------- Component Registration --------- //
	
})(jQuery);
