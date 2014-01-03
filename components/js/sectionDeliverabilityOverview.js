var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _viewBy = "day";
	// --------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function SectionDeliverabilityOverview(){};  
	smr.SectionDeliverabilityOverview = SectionDeliverabilityOverview; 
	
	SectionDeliverabilityOverview.prototype.create = function(data,config){
		return smr.render("tmpl-sectionDeliverabilityOverview",{});
	}
		
	SectionDeliverabilityOverview.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.reportType = data.reportType || smr.REPORT_TYPE.DELIVERABILITY;
		view.isNewRequest = data.isNewRequest || false;
		view.showView(_viewBy);
	}
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionDeliverabilityOverview.prototype.getAllData = function(viewBy){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"deliverabilityOverview",viewBy,view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionDeliverabilityOverview.prototype.showView = function(viewBy){
		var view = this;
		var $e = view.$el;
		_breakDownType = $e.closest(".report").find(".reportHeader-breakdownCombobox .combobox .default").attr("data-value");
		if(typeof breakDownType != 'undefined'){
			_viewBy = viewBy;
		}else{
			_viewBy = "day";
		}

		//clean first
		$e.bEmpty();
		var html = smr.render("tmpl-sectionDeliverabilityOverview-summary",{reportType:view.reportType, viewBy:_viewBy, isMock:smr.isMock()});
		$e.append($(html));
		
		view.getAllData(_viewBy).done(function(dataAll){
			showSummaryView.call(view,_viewBy,dataAll);
		});
		
		return true;
	}
	
	SectionDeliverabilityOverview.prototype.events = {
		"click; .viewBy .action" : function(event){
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
	}
	
	// --------- /Component Public API --------- //
	
	// --------- Component Private Methods --------- //
	
	function showSummaryView(by,dataAll){
		var view = this;
		var $e = view.$el; 
		
		showSummaryChartPart.call(view,by,dataAll.data);
		showBottomSummaryPart.call(view,by,dataAll);
	}
	
	function showSummaryChartPart(by,data){
		var view = this;
		var $e = view.$el;
		var $container = $e.find(".sectionDeliverabilityOverviewSummary-chart .chart-content");
		if(typeof data == "undefined" || data == null){
			$container.html("");
			$container.append("<div class='noData'>No Data!</div>");
		}else{
			by = by || "day";

			//clear container
			$container.empty();
			$container.append("<div class='fstCon'></div><div class='secCon'></div>");
			
			//init series
			var deliverabilityObj = {
				name: "Deliverability",
				data: [],
				color: "#6cc927",
				minVal:0
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
			for (var i = 0; i < data.length; i++) {
				//When sent is zero for a data point on the graph, the data point should be omitted from the graph
				if(data[i].sent && data[i].sent.count > 0){
					categories.push(data[i].date);
					deliverabilityObj.data.push(smr.checkNumber(data[i].delivered.rate));
					deliveredObj.data.push(smr.checkNumber(data[i].delivered.count));
					failedObj.data.push(smr.checkNumber(data[i].failed.count));
				}
			}
			
			//get the min value
			var minValue = 0;
			var min = Math.min.apply(Math,deliverabilityObj.data);
			if(min > 5){
				if(min > 90){
					minValue = 90;
				}else{
					minValue =  min - 5;
				}
			}
			deliverabilityObj.minVal = minValue;
			deliverabilityObj.maxVal = Math.max.apply(Math,deliverabilityObj.data);
			
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
					text: "Deliverability",
					align: 'left',
					x:50,
					margin:9,
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
							return smr.formatNumber(this.value,"short") + "%";
						}
					},
					max: ((deliverabilityObj.maxVal >= 95)  ? 100 : null),
					min: deliverabilityObj.minVal
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
					enabled: false
				},
				series: [deliverabilityObj]
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
		}
	}
	
	function showBottomSummaryPart(by,dataAll){
		var view = this;
		var $e = view.$el;
		var $summary = $e.find(".sectionDeliverabilityOverviewSummary-bottom");
		var $lefttable = $e.find(".sectionDeliverabilityOverviewSummary-bottom-left table");
		var $righttable = $e.find(".sectionDeliverabilityOverviewSummary-bottom-right table");
		by = by || "day";
		
		var dataSummary = dataAll.summary;
		var data = dataAll.data;
		
		if(typeof data == "undefined" || data == null){
			data = [];
		}
		
		//first init
		$lefttable.find("tr:not(:first)").remove();
		$righttable.find("tr:not(:first)").remove();
		
		var dataColumn = {
				delivered:[],
				failed:[],
				block:[],
				hardBounce:[],
				softBounce:[],
				technical:[],
				unknown:[]
		};
		
		for(var m=0 ; m<data.length; m++){
			var dataVal = data[m];
			dataColumn.delivered.push(dataVal.delivered.rate);
			dataColumn.failed.push(dataVal.failed.rate);
			dataColumn.block.push(dataVal.block.rate);
			dataColumn.hardBounce.push(dataVal.hardBounce.rate);
			dataColumn.softBounce.push(dataVal.softBounce.rate);
			dataColumn.technical.push(dataVal.technical.rate);
			dataColumn.unknown.push(dataVal.unknown.rate);
		}
		
		//show left
		var metricNames = [];
			metricNames = [
			   				{label:'Sent',name:'sent'},
			   				{label:'Delivered',name:'delivered'},
			   				{label:'Failures',name:'failed',clickable:true},
			   				{label:'Block',name:'block',indentable:true},
			   				{label:'Hard Bounce',name:'hardBounce',indentable:true},
			   				{label:'Soft Bounce',name:'softBounce',indentable:true},
			   				{label:'Technical',name:'technical',indentable:true},
			   				{label:'Unknown',name:'unknown',indentable:true}
			     		];
			
			for(var i=0 ; i<metricNames.length; i++){
				var summaryObj = $.extend({},metricNames[i]);
				var metricName = metricNames[i].name;
				
				if(summaryObj.name == "sent"){
					summaryObj.count = smr.formatNumber(dataSummary.sent.count);
					summaryObj.rate = "";
				}else{
					summaryObj.count = smr.formatNumber(dataSummary[metricName].count);
					summaryObj.rate = smr.checkNumber(dataSummary[metricName].rate) + "%";
				}
				
				var $tr = smr.render("tmpl-sectionDeliverabilityOverview-summary-leftTable-tr",{summaryObj:summaryObj});
				$lefttable.append($tr);
				//var widthVal = $lefttable.find(".rateTrend").width();

				if(summaryObj.name != "sent"){
					var myvalues = dataColumn[metricName];
					$lefttable.find("."+metricName).sparkline(myvalues, {type:'line', lineColor:'#058DC7',fillColor:'#E2F4F7',spotRadius:0,width:'80px',height:'20px',lineWidth:'2'});
				}
			}
		
		//event
		var reportComponent = $e.bComponent("report");
		$summary.find("table").delegate("td .metric","click",function(){
			var $metric = $(this);
			var metric = $(this).attr("data-metric");
			if(metric == "failed"){
				reportComponent.setSectionAndView("sectionFailures",null,{metric:metric});
			}else{
				alert("Not Implement yet");
			}
		});
		
		//show right
		var dataFaliures = dataSummary.topFailuresByDomain;
		//sorted in descending order by rate
		if(typeof dataFaliures == "undefined" || dataFaliures == null){
			//do nothing
		}else{
			var startDate = null;
			var endDate = null;
			var dateRange = smr.getSetAndType(smr.REPORT_TYPE.DELIVERABILITY,"main").set.period().getDateRange();
			if(dateRange.startDate){
				startDate = smr.formatDate(dateRange.startDate);
			}
			if(dateRange.endDate){
				endDate = smr.formatDate(dateRange.endDate);
			}
			
			for(var i=0 ; i<dataFaliures.length; i++){
				if(i > 9){ //only show 10 highest failure rates
					break;
				}else{
					var dataObj = dataFaliures[i];
					var summaryObj = {
						domainName: dataObj.domain,
						count: smr.formatNumber(dataObj.count),
						rate: dataObj.rate + '%',
						startDate: startDate,
						endDate: endDate
					};
					
					var $tr = smr.render("tmpl-sectionDeliverabilityOverview-summary-table-tr",{summaryObj:summaryObj, isMock:smr.isMock()});
					$righttable.append($tr);
				}
			}	
		}
	}
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("sectionDeliverabilityOverview",{
		emptyParent: true
	},function(){
		return new smr.SectionDeliverabilityOverview();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
