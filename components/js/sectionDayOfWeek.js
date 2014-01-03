var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var colorVals = ["#189fc6","#6cc927","#DF1044"];
	var _categories = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	// --------- /Component Private Properties --------- //

	// --------- Component Interface Implementation ---------- //
	function SectionDayOfWeek(){};
	smr.SectionDayOfWeek = SectionDayOfWeek; 
	
	SectionDayOfWeek.prototype.create = function(data,config){
		return smr.render("tmpl-sectionDayOfWeek",{});
	}
		
	SectionDayOfWeek.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		
		$e.closest(".report").find(".reportHeader-toolItems .toolbar-item.reportHeader-showCount").show();
		
		var $showCountSelector = $e.closest(".report").find(".reportHeader-toolItems .toolbar-item.reportHeader-showCount input[type='checkbox']");
		view.dataType = $showCountSelector.attr("checked") ? "count" : "rate";
		
		showView.call(view,view.dataType);
	}
	
	SectionDayOfWeek.prototype.parentEvents = {	
		report:{
			//event for showCount change
			"REPORTHEADER_SHOWCOUNT_CHANGE": function(event,extra){
				var view = this;
				if(extra.value){
					view.dataType = "count";
				}else{
					view.dataType = "rate";
				}
				showView.call(view,view.dataType);
			}
		}
	}
	
	SectionDayOfWeek.prototype.destroy = function(){
		var view = this;
		var $e = view.$el;
		$e.closest(".report").find(".reportHeader-toolItems .toolbar-item.reportHeader-showCount").hide();
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionDayOfWeek.prototype.getAllData = function(viewBy){
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getDeviceUsageSummary("deviceUsage",null,this.isNewRequest).done(function(data){
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
	function showView(by){
		var view = this;
		var $e = view.$el; 
		
		view.getAllData(by).done(function(dataAll){
			showChart.call(view,by,"opens",dataAll);
			showTable.call(view,by,"opens",dataAll);
			showChart.call(view,by,"clicks",dataAll);
			showTable.call(view,by,"clicks",dataAll);
		});
	}
	
	function showChart(by,showName,dataAll){
		var view = this;
		var $e = view.$el;
		
		var $chart = $e.find(".openChart");
		if(showName == "clicks"){
			$chart = $e.find(".clickChart");
		}
		
		if(typeof dataAll == "undefined" || typeof dataAll.dayOfWeekData == "undefined" || dataAll.dayOfWeekData == null){
			$chart.html("");
			$chart.append("<div class='noData'>No Data!</div>");
		}else{
			$chart.empty();
			$chart.append("<div class='dayOfWeekChart'></div>");
			var graphData = dataAll.dayOfWeekData.data;
			var dataSummary = dataAll.dayOfWeekData;
	        
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
			for (var n = 0; n < _categories.length; n++) {
				var dayName = _categories[n];
				var haveDay = false;
				for (var i = 0; i < graphData.length; i++) {
					var dataObj = graphData[i];
					var dataObjDay = dataObj.day
					if(dayName == dataObjDay.replace(/\s/g, "")){
						if(by == "rate"){
							if(showName == "opens"){
								var totalOpens = dataObj.desktopOpens + dataObj.mobileOpens + dataObj.tabletOpens;
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
						}else{
							if(showName == "opens"){
								desktopObj.data.push(dataObj.desktopOpens);
								phoneObj.data.push(dataObj.mobileOpens);
								tabletObj.data.push(dataObj.tabletOpens);
							}else if(showName == "clicks"){
								desktopObj.data.push(dataObj.desktopClicks);
								phoneObj.data.push(dataObj.mobileClicks);
								tabletObj.data.push(dataObj.tabletClicks);
							}
						}
						
						haveDay = true;
					}
				}
				
				if(!haveDay){
					desktopObj.data.push(0);
					phoneObj.data.push(0);
					tabletObj.data.push(0);
				}
			}

			var fstChart = new Highcharts.Chart({
				chart: {
					renderTo: $chart.find('.dayOfWeekChart').get(0),
					defaultSeriesType: 'line',
					height: 250,
					marginLeft: 60,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: null
				},
				xAxis: {
					categories:_categories,
					tickWidth: 0,
					title: {
						text: null
					},
					labels: {
						x: -1,
						y: 20
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
							if(by == "rate"){
								showVal = showVal + "%";
							}
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
						if(by == "rate"){
							yVal = yVal + "%";
						}
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
	
	function showTable(by,showName,dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionDayOfWeek-openPart");
		if(showName == "clicks"){
			$section = $e.find(".sectionDayOfWeek-clickPart");
		}
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.dayOfWeekData == "undefined" || dataAll.dayOfWeekData == null){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			//empty table
			$table.find("thead tr").empty();
			$table.find("tbody").empty();
			
			var dataSummary = dataAll.dayOfWeekData;
			var dataList = dataAll.dayOfWeekData.data;
			
			var tableColumns = [{name:"deviceType",label:"Device Type"}];
			var tableData = [];
			
			for(var i=0; i<_categories.length;i++) {
				var day = _categories[i];
				if(by == "rate"){
					tableColumns.push({name:day,label:day,isRate:true});
				}else{
					tableColumns.push({name:day,label:day});
				}
			}
			
			// add the table thead
			if(showName == "opens"){
				renderTableThead.call(view,tableColumns,"openSectionTable");
			}else{
				renderTableThead.call(view,tableColumns,"clickSectionTable");
			}
			
			var tableRows = [
			    {name:"desktop",label:"Desktop"},
			    {name:"phone",label:"Phone"},
			    {name:"tablet",label:"Tablet"}
			];
			
			for(var i = 0; i < tableRows.length; i++){
				var rowObj = tableRows[i];
				var resultData = {};
				resultData["deviceType"] = rowObj.label;
				
				for (var n = 0; n < _categories.length; n++) {
					var dayName = _categories[n];
					var haveDay = false;
					
					for(var j=0; j<dataList.length;j++) {
						var rowData = dataList[j];
						var rowDataDay = rowData.day;
						if(dayName == rowDataDay.replace(/\s/g, "")){
							if(showName == "opens"){
								if(by == "rate"){
									var totalOpens = rowData.desktopOpens + rowData.mobileOpens + rowData.tabletOpens;
									if(rowObj.name == "desktop"){
										var percentChange = smr.formatDivisionNumber(rowData.desktopOpens,totalOpens)*100;
										var percentVal = parseFloat(percentChange.toFixed("1"));
										resultData[dayName] = percentVal;
									}else if(rowObj.name == "phone"){
										var percentChange = smr.formatDivisionNumber(rowData.mobileOpens,totalOpens)*100;
										var percentVal = parseFloat(percentChange.toFixed("1"));
										resultData[dayName] = percentVal;
									}else if(rowObj.name == "tablet"){
										var percentChange = smr.formatDivisionNumber(rowData.tabletOpens,totalOpens)*100;
										var percentVal = parseFloat(percentChange.toFixed("1"));
										resultData[dayName] = percentVal;
									}
								}else{
									if(rowObj.name == "desktop"){
										resultData[dayName] = rowData.desktopOpens;
									}else if(rowObj.name == "phone"){
										resultData[dayName] = rowData.mobileOpens;
									}else if(rowObj.name == "tablet"){
										resultData[dayName] = rowData.tabletOpens;
									}
								}
							}else{
								if(by == "rate"){
									var totalClicks = rowData.desktopClicks + rowData.mobileClicks + rowData.tabletClicks;
									if(rowObj.name == "desktop"){
										var percentChange = smr.formatDivisionNumber(rowData.desktopClicks,totalClicks)*100;
										var percentVal = parseFloat(percentChange.toFixed("1"));
										resultData[dayName] = percentVal;
									}else if(rowObj.name == "phone"){
										var percentChange = smr.formatDivisionNumber(rowData.mobileClicks,totalClicks)*100;
										var percentVal = parseFloat(percentChange.toFixed("1"));
										resultData[dayName] = percentVal;
									}else if(rowObj.name == "tablet"){
										var percentChange = smr.formatDivisionNumber(rowData.tabletClicks,totalClicks)*100;
										var percentVal = parseFloat(percentChange.toFixed("1"));
										resultData[dayName] = percentVal;
									}
								}else{
									if(rowObj.name == "desktop"){
										resultData[dayName] = rowData.desktopClicks;
									}else if(rowObj.name == "phone"){
										resultData[dayName] = rowData.mobileClicks;
									}else if(rowObj.name == "tablet"){
										resultData[dayName] = rowData.tabletClicks;
									}
								}
							}
						}
						haveDay = true;
					}
					
					if(!haveDay){
						resultData[dayName] = 0;
					}
				}
				
				tableData.push(resultData);
			}
			
			//add the table tbody
			if(showName == "opens"){
				renderTableTbody.call(view,tableColumns,tableData,"openSectionTable");
			}else{
				renderTableTbody.call(view,tableColumns,tableData,"clickSectionTable");
			}
			
		}
	}
	
	function renderTableThead(tableColumns,sectionType){
		var view = this;
		var $e = view.$el;
		var $table;
		if(sectionType == "openSectionTable"){
			$table = $e.find(".sectionDayOfWeek-openPart .sectionContent .dataTable");
		}else if(sectionType == "clickSectionTable"){
			$table = $e.find(".sectionDayOfWeek-clickPart .sectionContent .dataTable");
		}
		
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = column.label;
			var columnName = column.name;
			
			var tableThead = smr.render("tmpl-sectionDayOfWeek-sectionContent-dataTable-tableThead",{
				"label":columnLable,
				"column":columnName
			});
			$table.find("thead tr").append(tableThead);
		}
	}
	
	function renderTableTbody(tableColumns,tableData,sectionType){
		var view = this;
		var $e = view.$el;
		var $tbody;
		if(sectionType == "openSectionTable"){
			$tbody = $e.find(".sectionDayOfWeek-openPart .sectionContent .dataTable tbody");
		}else if(sectionType == "clickSectionTable"){
			$tbody = $e.find(".sectionDayOfWeek-clickPart .sectionContent .dataTable tbody");
		}
		
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-sectionDayOfWeek-sectionContent-dataTable-tableTbody",{});
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
					var colorVal = "";
					
					columnName = column.name;
					
					if(typeof column.label != "undefined"){
						columnLabel = column.label;
					}else{
						columnLabel = columnName;
					}
					
					if (typeof column.isRate != "undefined") {
						isRate = column.isRate;
					}
					
					value = obj[columnName];
					
					if(k == 0){
						first = "first";
						if(value == "Desktop"){
							colorVal = colorVals[0];
						}else if(value == "Phone"){
							colorVal = colorVals[1];
						}else if(value == "Tablet"){
							colorVal = colorVals[2];
						}
						
					}
					
					if(columnName != "deviceType"){
						value = smr.formatNumber(value);
					}
					
					
					var tableTbodyTd = smr.render("tmpl-sectionDayOfWeek-sectionContent-dataTable-tableTbody-td",{
						"first":first,
						"colorVal":colorVal,
						"value":value,
						"isRate":isRate,
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
	brite.registerView("sectionDayOfWeek",{
		emptyParent: true
	},function(){
		return new smr.SectionDayOfWeek();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
