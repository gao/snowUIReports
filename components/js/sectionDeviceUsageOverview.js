var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _viewBy = "day";
	var _showName = "opens";
	var colorVals = ["#189fc6","#6cc927","#DF1044"];
	// --------- /Component Private Properties --------- //

	// --------- Component Interface Implementation ---------- //
	function SectionDeviceUsageOverview(){};
	smr.SectionDeviceUsageOverview = SectionDeviceUsageOverview; 
	
	SectionDeviceUsageOverview.prototype.create = function(data,config){
		return smr.render("tmpl-sectionDeviceUsageOverview",{});
	}
		
	SectionDeviceUsageOverview.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		
		var set = smr.getSetAndType(smr.REPORT_TYPE.DEVICEUSAGE).set;
		_viewBy = set.attr("viewBy") || "day";
		_showName = set.attr("showName") || "opens";
		showView.call(view,_viewBy,_showName);
			
		//show combobox
		var $graphTypeCombobox = $e.find(".graphTypeList");
		var list=[
			{name:"Opens",value:"opens"},
			{name:"Clicks",value:"clicks"}
		];
		brite.display("combobox",$graphTypeCombobox,{list:list,defaultValue:_showName});

	}
	
	SectionDeviceUsageOverview.prototype.events = {	
		"click; .viewBy .action" :function(event){
			var $this = $(event.currentTarget);
			$this.closest(".viewBy").find(".action").removeClass("selected");
			$this.addClass("selected");
		},
			
		"click; .viewBy.head .action": function(event){
			var view = this;
			var $this = $(event.currentTarget);
			var set = smr.getSetAndType(smr.REPORT_TYPE.DEVICEUSAGE).set;
			_viewBy = $this.attr("data-view");
			set.attr("viewBy",_viewBy);
			showView.call(view,_viewBy,_showName);
		},
			
		"click; .graphTypeList .combobox .item" : function(event){
			var view = this;
			var $this = $(event.currentTarget);
			var set = smr.getSetAndType(smr.REPORT_TYPE.DEVICEUSAGE).set;
			_showName = $this.closest(".graphTypeList .combobox").attr("data-value");
			set.attr("showName",_showName);
			showView.call(view,_viewBy,_showName);
		},
		
		"click; .sectionTitle .collapsible": clickCollapsible
	}
	
	// --------- events --------- //
	function clickCollapsible(event){
		var $this = $(event.currentTarget);
		$this.hide();
		if($this.hasClass("exp")){
			$this.closest(".sectionTitle").find(".col").show();
			$this.closest(".deviceUsagePart").find(".sectionContent").slideUp(300,function(){ $(this).hide();});
		}else{
			$this.closest(".sectionTitle").find(".exp").show();
			$this.closest(".deviceUsagePart").find(".sectionContent").slideDown(300,function(){ $(this).show();});
		}
	}
	// --------- /events --------- //
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionDeviceUsageOverview.prototype.getAllData = function(viewBy){
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getDeviceUsageSummary("deviceUsage",viewBy,this.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items != null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showView(by,graphName){
		var view = this;
		var $e = view.$el; 
		_showName = graphName || _showName;
		
		view.getAllData(by).done(function(dataAll){
			showTopPartChart.call(view,by,_showName,dataAll);	
			showOverviewTablePart.call(view,dataAll);
			showPhoneUsageSection.call(view,dataAll);
			showTabletUsageSection.call(view,dataAll);
		});
	}
	
	function showTopPartChart(by,showName,dataAll){
		var view = this;
		var $e = view.$el;
		
		var $chart = $e.find(".sectionDeviceUsageOverview-chart");
		by = by || "day";
		$e.find(".viewBy .action[data-view='"+by+"']").addClass("selected").siblings().removeClass("selected");
		if(typeof dataAll == "undefined" || typeof dataAll.deviceShareData == "undefined" || dataAll.deviceShareData == null){
			$chart.html("");
			$chart.append("<div class='noData'>No Data!</div>");
		}else{
			$chart.empty();
			$chart.append("<div class='deviceUsageOVChart'></div>");
			var graphData = dataAll.deviceShareData.data;
			var dataSummary = dataAll.deviceShareData;
			
			var categories = [];
	        smr.newSort(graphData, "date", true);
	        
	        var desktopObj = {
				name: "Desktop",
				data: [],
				color: colorVals[0]
			};
			var phoneObj = {
				name: "Phone",
				data: [],
				color: colorVals[1]
			};
			var tabletObj = {
				name: "Tablet",
				data: [],
				color: colorVals[2]
			};
			
			for (var i = 0; i < graphData.length; i++) {
				var dataObj = graphData[i];
				if(showName == "opens"){
					var totalOpens = dataObj.desktopOpens + dataObj.mobileOpens + dataObj.tabletOpens;
					if(totalOpens==0) continue;
					var desktopOpensPercent = smr.formatDivisionNumber(dataObj.desktopOpens,totalOpens)*100;
					var desktopOpensPercentVal = parseFloat(desktopOpensPercent.toFixed("1"));
					var mobileOpensPercent = smr.formatDivisionNumber(dataObj.mobileOpens,totalOpens)*100;
					var mobileOpensPercentVal = parseFloat(mobileOpensPercent.toFixed("1"));
					var tabletOpensPercent = smr.formatDivisionNumber(dataObj.tabletOpens,totalOpens)*100;
					var tabletOpensPercentVal = parseFloat(tabletOpensPercent.toFixed("1"));
					desktopObj.data.push(desktopOpensPercentVal);
					phoneObj.data.push(mobileOpensPercentVal);
					tabletObj.data.push(tabletOpensPercentVal);
				}else if(showName == "clicks"){
					var totalClicks = dataObj.desktopClicks + dataObj.mobileClicks + dataObj.tabletClicks;
					if(totalClicks==0) continue;
					var desktopClicksPercent = smr.formatDivisionNumber(dataObj.desktopClicks,totalClicks)*100;
					var desktopClicksPercentVal = parseFloat(desktopClicksPercent.toFixed("1"));
					var mobileClicksPercent = smr.formatDivisionNumber(dataObj.mobileClicks,totalClicks)*100;
					var mobileClicksPercentVal = parseFloat(mobileClicksPercent.toFixed("1"));
					var tabletClicksPercent = smr.formatDivisionNumber(dataObj.tabletClicks,totalClicks)*100;
					var tabletClicksPercentVal = parseFloat(tabletClicksPercent.toFixed("1"));
					desktopObj.data.push(desktopClicksPercentVal);
					phoneObj.data.push(mobileClicksPercentVal);
					tabletObj.data.push(tabletClicksPercentVal);
				}
				categories.push(dataObj.date);
			}
			
			var desktopMax = Math.max.apply(Math,desktopObj.data);
			var phoneMax = Math.max.apply(Math,phoneObj.data);
			var tabletMax = Math.max.apply(Math,tabletObj.data);
			var maxVal = Math.max.apply(Math,[desktopMax,phoneMax,tabletMax]);

			var fstChart = new Highcharts.Chart({
				chart: {
					renderTo: $chart.find('.deviceUsageOVChart').get(0),
					defaultSeriesType: 'line',
					height: 250,
					marginLeft: 60,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: null
				},
				xAxis: {
					categories:categories,
					tickWidth: 0,
					title: {
						text: null
					},
					labels: {
						rotation: 325,
						step:Math.ceil(categories.length / 31),
						x: -1,
						y: 28
					}
				},
				yAxis: {
					lineWidth: 1,
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
					min:0,
					max: (maxVal > 95 ? 100 : null)
				},
				credits: {
					enabled: false
				},
				tooltip: {
			        formatter: function() {
						var yVal = this.y;
						yVal = yVal + "%";
			            return '<span>' + this.x + '</span><br/>' + '<span>' + this.series.name + ': <b>' + smr.formatNumber(yVal) + '</b></span>';
			        },
			        borderColor: showName.lineColor
			    },
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0,
					x:70,
					y:-20,
	                width: 160
				},
				series: [desktopObj,phoneObj,tabletObj]
			});
		}
	}

    function showOverviewTablePart(dataAll){
		var view = this;
		var $e = view.$el;
		
		var $section = $e.find(".sectionDeviceUsageOverview-overviewTable");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.deviceUsageData == "undefined" || dataAll.deviceUsageData == null){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			//first empty table
			$table.find("tr:not(:first)").remove();
			
			var data = dataAll.deviceShareData;
			
			var tableColumn = [
			                   {name:"desktop",label:"Desktop",opensValue:data.desktopOpens},
			                   {name:"phone",label:"Phone",opensValue:data.mobileOpens},
			                   {name:"tablet",label:"Tablet",opensValue:data.tabletOpens}
			                   ];
			//The rows shall appear in descending order to the highest share of opens.
			smr.newSort(tableColumn,"opensValue",false);
			
			for(var i = 0; i < tableColumn.length; i++){
				var row = tableColumn[i];
				var dataObj;
				var openCount = "";
				var clickCount = "";
				var openPercentChange = "";
				var clickPercentChange ="";
				var clickToOpenPercentChange = "";
				var openPercentVal = "";
				var clickPercentVal = "";
				var clickToOpenPercentVal = "";
				var totalOpens = data.desktopOpens + data.mobileOpens + data.tabletOpens;
				var totalClicks = data.desktopClicks + data.mobileClicks + data.tabletClicks;
				if(row.name == "desktop"){
					openCount = smr.formatNumber(data.desktopOpens);
					openPercentChange = smr.formatDivisionNumber(data.desktopOpens,totalOpens)*100;
					openPercentVal = parseFloat(openPercentChange.toFixed("1"));
					
					clickCount = smr.formatNumber(data.desktopClicks);
					clickPercentChange = smr.formatDivisionNumber(data.desktopClicks,totalClicks)*100;
					clickPercentVal = parseFloat(clickPercentChange.toFixed("1"));
					
					clickToOpenPercentChange = smr.formatDivisionNumber(data.desktopClicks,data.desktopOpens)*100;
					clickToOpenPercentVal = parseFloat(clickToOpenPercentChange.toFixed("1"));
				}else if(row.name == "phone"){
					openCount = smr.formatNumber(data.mobileOpens);
					openPercentChange = smr.formatDivisionNumber(data.mobileOpens,totalOpens)*100;
					openPercentVal = parseFloat(openPercentChange.toFixed("1"));
					
					clickCount = smr.formatNumber(data.mobileClicks);
					clickPercentChange = smr.formatDivisionNumber(data.mobileClicks,totalClicks)*100;
					clickPercentVal = parseFloat(clickPercentChange.toFixed("1"));
					
					clickToOpenPercentChange = smr.formatDivisionNumber(data.mobileClicks,data.mobileOpens)*100;
					clickToOpenPercentVal = parseFloat(clickToOpenPercentChange.toFixed("1"));
				}else if(row.name == "tablet"){
					openCount = smr.formatNumber(data.tabletOpens);
					openPercentChange = smr.formatDivisionNumber(data.tabletOpens,totalOpens)*100;
					openPercentVal = parseFloat(openPercentChange.toFixed("1"));
					
					clickCount = smr.formatNumber(data.tabletClicks);
					clickPercentChange = smr.formatDivisionNumber(data.tabletClicks,totalClicks)*100;
					clickPercentVal = parseFloat(clickPercentChange.toFixed("1"));
					
					clickToOpenPercentChange = smr.formatDivisionNumber(data.tabletClicks,data.tabletOpens)*100;
					clickToOpenPercentVal = parseFloat(clickToOpenPercentChange.toFixed("1"));
				}
				
				var rowData = {
						"colorVal":(row.name == "desktop") ? colorVals[0] : (row.name == "phone") ? colorVals[1] : colorVals[2],
						"label":row.label,
						"openShare":openPercentVal,
						"openCount":openCount,
						"clickShare":clickPercentVal,
						"clickCount":clickCount,
						"clickToOpen": clickToOpenPercentVal
				};
				
				var $tr = smr.render("tmpl-overviewTable-dataTable-tr",{summaryObj : rowData});
				$table.append($tr);
			}
		}	
	}
	
	function showPhoneUsageSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionDeviceUsageOverview-phoneUsageSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.deviceUsageData == "undefined" || dataAll.deviceUsageData == null || typeof dataAll.deviceUsageData.mobileUsageData == "undefined" || dataAll.deviceUsageData.mobileUsageData == null){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			//empty table
			$table.find("thead tr").empty();
			$table.find("tbody").empty();
			
			var dataSummary = dataAll.deviceUsageData.mobileUsageData;
			var dataList = dataAll.deviceUsageData.mobileUsageData.data;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"platform",label:"Platform"});
			tableColumns.push({name:"opens",label:"Opens"});
			tableColumns.push({name:"opensPercent",label:"%",isRate:true,isBarAndValue:true});
			tableColumns.push({name:"clicks",label:"Clicks"});
			tableColumns.push({name:"clicksPercent",label:"%",isRate:true,isBarAndValue:true});
			
			//sort by opens as default
			smr.newSort(dataList,"opens",false);
				
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				var opensPercent = smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100;
				var opensPercentVal = parseFloat(opensPercent.toFixed("1"));
				var clicksPercent = smr.formatDivisionNumber(rowData.clicks,dataSummary.clicks)*100;
				var clicksPercentVal = parseFloat(clicksPercent.toFixed("1"));
				resultData = {
						"platform":rowData.platform,
						"opens" : smr.checkNumber(rowData.opens),
						"opensPercent" :opensPercentVal,
						"clicks" : smr.checkNumber(rowData.clicks),
						"clicksPercent" : clicksPercentVal
				};
					
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"phoneUsageSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","phoneUsageSection");

			//add the table tbody total
			if(dataList.length && dataList.length>1){
				var tableTotalData = [];
				var resultDataVal = {
							"platform":"Total",
							"opens" : smr.checkNumber(dataSummary.opens),
							"opensPercent" : (dataList.length > 0) ? 100.0 : 0,
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"clicksPercent" : (dataList.length > 0) ? 100.0 : 0
					};
				tableTotalData.push(resultDataVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","phoneUsageSection");
			}
		}
	}
	
	function showTabletUsageSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionDeviceUsageOverview-tabletUsageSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.deviceUsageData == "undefined" || dataAll.deviceUsageData == null || typeof dataAll.deviceUsageData.tabletUsageData == "undefined" || dataAll.deviceUsageData.tabletUsageData == null){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			//empty table
			$table.find("thead tr").empty();
			$table.find("tbody").empty();
			
			var dataSummary = dataAll.deviceUsageData.tabletUsageData;
			var dataList = dataAll.deviceUsageData.tabletUsageData.data;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"platform",label:"Platform"});
			tableColumns.push({name:"opens",label:"Opens"});
			tableColumns.push({name:"opensPercent",label:"%",isRate:true,isBarAndValue:true});
			tableColumns.push({name:"clicks",label:"Clicks"});
			tableColumns.push({name:"clicksPercent",label:"%",isRate:true,isBarAndValue:true});
			
			//sort by opens as default
			smr.newSort(dataList,"opens",false);
				
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				var opensPercent = smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100;
				var opensPercentVal = parseFloat(opensPercent.toFixed("1"));
				var clicksPercent = smr.formatDivisionNumber(rowData.clicks,dataSummary.clicks)*100;
				var clicksPercentVal = parseFloat(clicksPercent.toFixed("1"));
				resultData = {
						"platform":rowData.platform,
						"opens" : smr.checkNumber(rowData.opens),
						"opensPercent" :opensPercentVal,
						"clicks" : smr.checkNumber(rowData.clicks),
						"clicksPercent" : clicksPercentVal
				};
					
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"tabletUsageSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","tabletUsageSection");
			

			//add the table tbody total
			if(dataList.length && dataList.length>1){
				var tableTotalData = [];
				var resultDataVal = {
							"platform":"Total",
							"opens" : smr.checkNumber(dataSummary.opens),
							"opensPercent" : (dataList.length > 0) ? 100.0 : 0,
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"clicksPercent" : (dataList.length > 0) ? 100.0 : 0
					};
				tableTotalData.push(resultDataVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","tabletUsageSection");
			}
		}
	}
	
	function renderTableThead(tableColumns,sectionType){
		var view = this;
		var $e = view.$el;
		var $table;
		if(sectionType == "phoneUsageSection"){
			$table = $e.find(".sectionDeviceUsageOverview-phoneUsageSection .sectionContent .dataTable");
		}else if(sectionType == "tabletUsageSection"){
			$table = $e.find(".sectionDeviceUsageOverview-tabletUsageSection .sectionContent .dataTable");
		}
		
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = column.label;
			var columnName = column.name;
			var isBarChart = false;
			var sortable = false;
			var isBarAndValue = false;
			
			if(typeof column.isBarChart != 'undefined'){
				isBarChart = column.isBarChart;
			}
			
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
			
			if(typeof column.isBarAndValue != 'undefined'){
				isBarAndValue = column.isBarAndValue;
			}
			
			var tableThead = smr.render("tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableThead",{
				"label":columnLable,
				"column":columnName,
				"isBarChart":isBarChart,
				"sortable":sortable,
				"isBarAndValue":isBarAndValue
			});
			$table.find("thead tr").append(tableThead);
		}
	}
	
	function renderTableTbody(tableColumns,tableData,type,sectionType){
		var view = this;
		var $e = view.$el;
		var $tbody;
		if(sectionType == "phoneUsageSection"){
			$tbody = $e.find(".sectionDeviceUsageOverview-phoneUsageSection .sectionContent .dataTable tbody");
		}else if(sectionType == "tabletUsageSection"){
			$tbody = $e.find(".sectionDeviceUsageOverview-tabletUsageSection .sectionContent .dataTable tbody");
		}
		
		if(type == "total"){
			var tableTbody = smr.render("tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody",{});
			var $thisTr = $(tableTbody);
			$thisTr.append("<td class='noBorder' colspan='"+tableColumns.length+"'></td>");
			$tbody.append($thisTr);
		}
		
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody",{});
				var $thisTr = $(tableTbody);
				
				var isLastRow = false;
				if(i == (tableData.length -1)){
					isLastRow = true;
				}
					
				for (var k = 0; k < tableColumns.length; k++) {
					var column = tableColumns[k];
					var columnName = "";
					var columnLabel = "";
					var isRate = false;
					var value = "";
					var first = "";
					var isBarAndValue = false;
					var isTotalColumn = false;
					
					columnName = column.name;
					
					if(typeof column.label != "undefined"){
						columnLabel = column.label;
					}else{
						columnLabel = columnName;
					}
					
					if (typeof column.isRate != "undefined") {
						isRate = column.isRate;
					}
					
					if(k == 0){
						first = "first";
					}

					if(typeof column.isBarAndValue != 'undefined'){
						isBarAndValue = column.isBarAndValue;
					}
					
					//total should not show the bar
					if(type == "total"){
						isTotalColumn = true;
					}
					
					value = obj[columnName];
					
					if(columnName != "platform"){
						value = smr.formatNumber(value);
					}
					
					
					var tableTbodyTd = smr.render("tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody-td",{
						"first":first,
						"value":value,
						"isRate":isRate,
						"isBarAndValue":isBarAndValue,
						"isTotalColumn":isTotalColumn,
						"isLastRow":isLastRow
					});
					$thisTr.append(tableTbodyTd);
				}
				$tbody.append($thisTr);
			}
		}
	}
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionDeviceUsageOverview",{
		emptyParent: true
	},function(){
		return new smr.SectionDeviceUsageOverview();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
