var smr = smr || {};

(function($){

	smr.isConversionReportEnabledForABTest = true;
	smr.conversionCurrencyForABTest = "$";
	// --------- Component Interface Implementation ---------- //
	function SectionABTest(){};
	smr.SectionABTest = SectionABTest; 
	
	SectionABTest.prototype.create = function(data,config){
		return smr.render("tmpl-sectionABTest",{});
	}
		
	SectionABTest.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.reDraw = false;
		view.isNewRequest = data.isNewRequest || false;
		view.reportType = smr.REPORT_TYPE.ABTEST;
		
		//remove the out border and change the content background
		$e.closest(".report-content").css("border","0px");
		$e.closest(".report-content").css("background","#F9F7F8");
		
        var list = smr.getSetAndType(view.reportType,"main").set.list();
        if(list && list.length>0){
        	showView.call(view);
        }else{
        	$e.find(".sectionABTest-gridSection input[name='showType']").attr("disabled",true);
        	var $relatedReport = $e.closest(".report");
        	brite.display("abTestPicker",$("body"),{type:data.type,$relatedReport:$relatedReport}).done(function(component){
        		component.onClose(function(){
        			var itemList = smr.getSetAndType(view.reportType).set.list();
        			if(itemList && itemList.length > 0){
        				var mailingIds = itemList[0].id;
        				smr.showReport($relatedReport.parent(),view.reportType,"sectionABTest");
        			}
        		});
        	});
        }
	}
	
	SectionABTest.prototype.events = {
		//change the show type counts or percentages
		"change; .sectionABTest-gridSection .showTypeSelect input[type='radio']": changeShowTypeSelect,
		
		//click the refresh button
		"click; .sectionABTest-headerSection .refresh" : refreshMethod
	}
	
	// --------- events --------- //
	function changeShowTypeSelect(event){
		var view = this;
		var $this = $(event.currentTarget);
		var showType = $this.val();
		view.showDataType = showType;
		view.getAllData().done(function(dataAll){
			showGridSection.call(view,dataAll,showType);
		});
	}
	
	function refreshMethod(){
		var view = this;
		showView.call(view);
	}
	// --------- /events --------- //
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionABTest.prototype.getAllData = function(){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getABTestSummary(view.reportType,this.isNewRequest).done(function(data){
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
	function showView(){
		var view = this;
		var $e = view.$el; 
		var showDataType = view.showDataType || "percent";
		
		//clean first
		$e.bEmpty();
		html = smr.render("tmpl-sectionABTest",{});
		$e.append($(html));
		var list = smr.getSetAndType(view.reportType,"main").set.list();
		if(list && list.length > 0){
			$e.find(".sectionABTest-gridSection input[name='showType']").removeAttr("disabled");
			view.getAllData().done(function(dataAll){
				showHeaderSection.call(view,dataAll);
				showGridSection.call(view,dataAll,showDataType);
				showBubbleChart.call(view,dataAll);
			});
		}else{alert($e.find(".sectionABTest-gridSection input[name='showType']").size());
			$e.find(".sectionABTest-gridSection input[name='showType']").attr("disabled",true);
		}
	}
	
	function showHeaderSection(data){
		var view = this;
		var $e = view.$el;
		var $headerSection = $e.find(".sectionABTest-headerSection");
		if(data==null || typeof data == "undefined" || typeof data.headerData == "undefined" || data.headerData==null){
			$headerSection.html("");
			$headerSection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = data.headerData;
			dataSummary.campaignEllipses = (dataSummary.campaign && dataSummary.campaign.length>40) ? dataSummary.campaign.substring(0,19)+"..." + dataSummary.campaign.substring(dataSummary.campaign.length-20): dataSummary.campaign;
			var showWinner = false;
			if(dataSummary.winnerCriteria || dataSummary.timeTillWinnerSelection){
				showWinner = true;
			}
			var $headerSectionRender = smr.render("tmpl-ABTest-headerSection",{summary:dataSummary,showWinner:showWinner});
			$headerSection.append($headerSectionRender);
		}
	}

	function showGridSection(dataAll,dataType){
		var view = this;
		var $e = view.$el;
		var $gridSection = $e.find(".sectionABTest-gridSection");
		var $input = $gridSection.find(".showTypeSelect input[value='"+dataType+"']").attr("checked",true);
		var $sectionContent = $gridSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		//empty table
		$table.find("thead tr").empty();
		$table.find("tbody").empty();
		
		if(typeof dataAll == "undefined" ||dataAll==null || typeof dataAll.data == "undefined" || dataAll.data==null || dataAll.data.length==0){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataList = dataAll.data;
			var dataSummary = dataAll;
			smr.isConversionReportEnabledForABTest = dataSummary.conversionReportEnabled;
			smr.conversionCurrencyForABTest = dataSummary.conversionCurrency;
			
			var sentValues = [];
			var deliveredValues = [];
			var opensValues = [];
			var clicksValues = [];
			var conversionsValues = [];
			var revenueValues = [];
			var unsubsValues = [];
			var complaintsValues = [];
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"splitName",label:"Split Name",maxLength:40,ellipses:"center",defaultSort:true,sortable:true,showHoverBox:true});
			if(dataType == "count"){
								
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData = {
							"mailingId":rowData.mailingId,
							"splitName":rowData.winner?rowData.splitName+" (Winner)":rowData.splitName,
							"subject":rowData.subject,
							"splitImage":rowData.splitImage,
							"launchDate" : rowData.launchDate? rowData.launchDate :"Pending",
							"sent" : smr.checkNumber(rowData.sent),
							"delivered" : smr.checkNumber(rowData.delivered),
							"opens" : smr.checkNumber(rowData.uniqueOpens),
							"clicks" : smr.checkNumber(rowData.uniqueClicks),
							"unsubs" : smr.checkNumber(rowData.uniqueUnsubs),
							"complaints" : smr.checkNumber(rowData.uniqueComplaints)
					};
					if(smr.isConversionReportEnabledForABTest){
						resultData.conversions = smr.checkNumber(rowData.conversionCount);
						resultData.revenue = smr.checkNumber(rowData.conversionRevenue);
						conversionsValues.push(resultData.conversions);
						revenueValues.push(resultData.revenue);
					}					
					sentValues.push(resultData.sent);
					deliveredValues.push(resultData.delivered);
					opensValues.push(resultData.opens);
					clicksValues.push(resultData.clicks);
					unsubsValues.push(resultData.unsubs);
					complaintsValues.push(resultData.complaints);
					
					tableData.push(resultData);
				}
				tableColumns.push({name:"launchDate",label:"Launched",isAlignLeft:true,sortable:true});
				tableColumns.push({name:"sent",label:"Sent",isRate:false,sortable:true,bestValue:getBestValue(true,sentValues)});
				tableColumns.push({name:"delivered",label:"Delivered",isRate:false,sortable:true,bestValue:getBestValue(true,deliveredValues)});
				tableColumns.push({name:"opens",label:"Opens",isRate:false,sortable:true,bestValue:getBestValue(true,opensValues)});
				tableColumns.push({name:"clicks",label:"Clicks",isRate:false,sortable:true,bestValue:getBestValue(true,clicksValues)});
				if(smr.isConversionReportEnabledForABTest){
					tableColumns.push({name:"conversions",label:"Conversions",isRate:false,sortable:true,bestValue:getBestValue(true,conversionsValues)});
					tableColumns.push({name:"revenue",label:"Revenue",isRate:false,sortable:true,isConversionSymbol:true,bestValue:getBestValue(true,revenueValues)});
				}
				tableColumns.push({name:"unsubs",label:"Unsubs",isRate:false,sortable:true,bestValue:getBestValue(false,unsubsValues)});
				tableColumns.push({name:"complaints",label:"Complaints",isRate:false,sortable:true,bestValue:getBestValue(false,complaintsValues)});
				
			}else{
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					
					resultData = {
							"mailingId":rowData.mailingId,
							"splitName":rowData.winner?rowData.splitName+" (Winner)":rowData.splitName,
							"subject":rowData.subject,
							"splitImage":rowData.splitImage,
							"launchDate" : rowData.launchDate? rowData.launchDate :"Pending",
							"sent" : smr.checkNumber(rowData.sent),
							"delivered" : smr.checkNumber(rowData.deliverability),
							"opens" : smr.checkNumber(rowData.uniqueOpenRate),
							"clicks" : smr.checkNumber(rowData.uniqueClickRate),
							"unsubs" : smr.checkNumber(rowData.uniqueUnsubRate),
							"complaints" : smr.checkNumber(rowData.uniqueComplaintRate)
					};
					if(smr.isConversionReportEnabledForABTest){
						resultData.conversions = smr.checkNumber(rowData.conversionRate);
						resultData.revenue = smr.checkNumber(rowData.revenuePerThousand);
						conversionsValues.push(resultData.conversions);
						revenueValues.push(resultData.revenue);
					}
					sentValues.push(resultData.sent);
					deliveredValues.push(resultData.delivered);
					opensValues.push(resultData.opens);
					clicksValues.push(resultData.clicks);
					unsubsValues.push(resultData.unsubs);
					complaintsValues.push(resultData.complaints);
					
					tableData.push(resultData);
				}
				tableColumns.push({name:"launchDate",label:"Launched",isAlignLeft:true,sortable:true});
				tableColumns.push({name:"sent",label:"Sent",isRate:false,sortable:true,bestValue:getBestValue(true,sentValues)});
				tableColumns.push({name:"delivered",label:"Delivered",isRate:true,sortable:true,bestValue:getBestValue(true,deliveredValues)});
				tableColumns.push({name:"opens",label:"Opens",isRate:true,sortable:true,bestValue:getBestValue(true,opensValues)});
				tableColumns.push({name:"clicks",label:"Clicks",isRate:true,sortable:true,bestValue:getBestValue(true,clicksValues)});
				if(smr.isConversionReportEnabledForABTest){
					tableColumns.push({name:"conversions",label:"Conversions",isRate:true,sortable:true,bestValue:getBestValue(true,conversionsValues)});
					tableColumns.push({name:"revenue",label:"RPM",isRate:false,sortable:true,isConversionSymbol:true,bestValue:getBestValue(true,revenueValues)});
				}
				tableColumns.push({name:"unsubs",label:"Unsubs",isRate:true,sortable:true,bestValue:getBestValue(false,unsubsValues)});
				tableColumns.push({name:"complaints",label:"Complaints",isRate:true,sortable:true,bestValue:getBestValue(false,complaintsValues)});
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns);
			
			// sort defaultColumn
			for(var i=0; i<tableColumns.length;i++){
				var column = tableColumns[i];
				if(column.defaultSort){
					var columnName = column.name;
					sortByDefault(tableData,columnName,true);
					break;
				}
			}
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"");
			
			//add the table tbody total
			var tableTotalData = [];
			var resultDateVal;
			if(dataType == "count"){
				resultDateVal = {
						"splitName":"Total",
						"launchDate" : "",
						"sent" : smr.checkNumber(dataSummary.sent),
						"delivered" : smr.checkNumber(dataSummary.delivered),
						"opens" : smr.checkNumber(dataSummary.uniqueOpens),
						"clicks" : smr.checkNumber(dataSummary.uniqueClicks),
						"unsubs" : smr.checkNumber(dataSummary.uniqueUnsubs),
						"complaints" : smr.checkNumber(dataSummary.uniqueComplaints)
				};
				if(smr.isConversionReportEnabledForABTest){
					resultDateVal.conversions = smr.checkNumber(dataSummary.conversionCount);
					resultDateVal.revenue = smr.checkNumber(dataSummary.conversionRevenue);
				}
			}else{					
				resultDateVal = {
						"splitName":"Total",
						"launchDate" : "",
						"sent" : smr.checkNumber(dataSummary.sent),
						"delivered" : smr.checkNumber(dataSummary.deliverability),
						"opens" : smr.checkNumber(dataSummary.uniqueOpenRate),
						"clicks" : smr.checkNumber(dataSummary.uniqueClickRate),
						"unsubs" : smr.checkNumber(dataSummary.uniqueUnsubRate),
						"complaints" : smr.checkNumber(dataSummary.uniqueComplaintRate)
				};
				if(smr.isConversionReportEnabledForABTest){
					resultDateVal.conversions = smr.checkNumber(dataSummary.conversionRate);
					resultDateVal.revenue = smr.checkNumber(dataSummary.revenuePerThousand);
				}
			}
			tableTotalData.push(resultDateVal);
			
			var mailingIds = "";
			$.each(dataList,function(i,item){
				if(i>0) mailingIds += "&"
				mailingIds += "mailingIds="+item.mailingId;
			});
			renderTableTbody.call(view,tableColumns,tableTotalData,"total",mailingIds);

			
			//first undelegate the event
			$table.undelegate("thead th.sortable","click");
			$table.find("thead th.sortable").each(function(){
				var $th = $(this);
				$th.css("width",$th.width());
			});
			$table.delegate("thead th.sortable","click",function(event){
				var e = event || window.event;  
				var elem = e.srcElement||e.target; 
				if($(elem).is("select")){
					return;
				}
				var $th = $(this);
				var columnName = $th.attr("data-column");
				var order = true;
				$table.find("th:not(:nth-child("+($th.index()+1)+"))").attr("data-order","");
				$table.find("th .ico").remove();
				$th.append("<div class='ico'></div>");
				$ico = $th.find(".ico");
				if($th.attr("data-order") == 'Desc'){
					order = false;
				}
				order = !order;
				sortByDefault(tableData,columnName,order);
				
				if(order){
					$th.attr("data-order","Asc");
					$ico.addClass("icoAsc");
					$ico.removeClass("icoDesc");
					$ico.html("&uarr;");
				}else{
					$th.attr("data-order","Desc")
					$ico.addClass("icoDesc");
					$ico.removeClass("icoAsc");
					$ico.html("&darr;");
				}
				$e.find(".sectionABTest-gridSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"");
				
				if(dataList.length && dataList.length > 1){
					renderTableTbody.call(view,tableColumns,tableTotalData,"total");
				}
			});
			
			var showHoverFlag = false;
			
			$table.delegate("td .icon-info-sign","mouseover",function(event){
				showHoverFlag = true;
				var $this = $(this);
				var index = parseInt($this.closest("tr").attr("index"));
				var dataObj = tableData[index];
				var value = dataObj.splitName;
				if(value.length>19){
					dataObj.ellipse = value.substring(0,10) + "..." + value.substring((value.length-10),value.length);
				}
				$container = $e.find(".gridHoverBoxContainer");
				var html = smr.render("tmpl-gridSection-table-td-hover",dataObj);		
				$container.empty().append(html);
				var offset = $e.closest(".smr.report").offset();
				var thisSpanOffset = $this.offset();
				var IE7offsetX = 0;
				var leftVal = (thisSpanOffset.left - offset.left)-IE7offsetX+$this.width() ;
				var topVal = thisSpanOffset.top-offset.top-($container.height()/2);
				$container.css({left: leftVal, top: topVal});
				if(showHoverFlag)$container.show();
			});
			
			$e.delegate("td .icon-info-sign","mouseleave",function(event){
				$container = $e.find(".gridHoverBoxContainer");
				$container.empty();
				$container.hide();
				showHoverFlag = false;
			});
			
			$e.delegate(".gridHoverBoxContainer","click",function(event){
				var $this = $(this);
				$this.empty();
				$this.hide();
			});
		}
	}

	
	function showBubbleChart(dataAll){
		var view = this;
		var $e = view.$el;
		var $sectionContent = $e.find(".sectionABTest-summary-Chart .sectionContent");
		if(typeof dataAll == "undefined" || dataAll==null || typeof dataAll.data == "undefined" || dataAll.data==null || dataAll.data.length==0){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataList = dataAll.data;
			var series = [];
			var xValues = [];
			var yValues = [];
			var maxReduis = [];
			
			$.each(dataList,function(i,data){
				var value = data.splitName;
				if(value.length>19){
					value = value.substring(0,10) + "..." + value.substring((value.length-10),value.length);
				}
				var serie = {
					 marker:{
				            symbol:'circle',
				            lineWidth:1,
				            states:{
				                hover:{
				                    enabled:false
				                }
				            }
				        },
				        name:value,
				        relname:data.splitName,
				        data: []
			     };
				$.each(dataList,function(j,it){
					if(i!=j){
						serie.data.push({x:0,y:0,marker:{radius:0}});
					}else{
						var radius = 5;
						if(smr.isConversionReportEnabledForABTest){
							if(it.conversionRate && dataAll.conversionRate && dataAll.conversionRate!=0){
								radius = smr.formatDivisionNumber(it.conversionRate,dataAll.conversionRate)*10;
							}else{
								radius = 5;
							}
							radius = radius<=1 ? 1 : radius;
						}
						maxReduis.push(parseInt(radius+""));
						serie.data.push({x:smr.checkNumber(it.uniqueOpenRate),
							y:smr.checkNumber(it.uniqueClickRate),
							marker:{radius:parseInt(radius+"")}});
					}
				});
				xValues.push(smr.checkNumber(data.uniqueOpenRate));
				yValues.push(smr.checkNumber(data.uniqueClickRate));
				
				series.push(serie);
			});
			
			function getMinValue(values){
				var minValue = 0;
				var min = Math.min.apply(Math,values);
				if(min > 5){
					if(min > 90){
						minValue = 90;
					}else{
						minValue =  min - 5;
					}
				}
				return minValue;
			}
			
			function getMaxValue(values){
				var maxValue = 100;
				var max = Math.max.apply(Math,values);
				if(max == 0){
					maxValue = 5;
				}else if(max > 0 && max < 100){
					if(max > 95){
						maxValue =  max;
					}else{
						maxValue =  max + 5;
					}
				}
				return maxValue;
			}
			
			var xmin = getMinValue(xValues);
			var ymin = getMinValue(yValues);
			var xmax = getMaxValue(xValues) + parseInt(((getMaxValue(xValues)/850)*2*Math.max.apply(Math,maxReduis))+"");
			var ymax = getMaxValue(yValues);
			
			var chart = new Highcharts.Chart({
			    chart: {
			        renderTo:$sectionContent.get(0),
			        defaultSeriesType:'scatter',
			        marginLeft:70,
			        marginRight:200,
			        backgroundColor:'#fff',
			        plotBackgroundColor:'#fff'
			    },
			    credits: {
			        enabled: false
			    },
			    title:{
					text: "Open and Click Performance",
					align: 'left',
					x:50,
					margin:10,
					style : {
						color: '#303030',
						fontSize: '10.5pt',
						fontWeight: 'bold',
						fontFamily: 'Arial'
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
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0,
					x:5,
					y:-10,
	                width: 180,
	                useHTML:true
				},
			    xAxis:{
			        minPadding:.075,
			        maxPadding:.075,
			        lineColor:'#999',
			        lineWidth:1,
			        tickColor:'#666',
			        tickLength:3,
			        labels:{
						formatter:function() {
			    			return this.value + "%";
						}
					},
			        title:{
			            text:'Open Rate',
			            style: {
			            	color: '#222',
			            	fontWeight: 'bold'
			            }
			        },
			        min:xmin,
			        max:xmax
			    },
			    yAxis:{
			        lineColor:'#999',
			        lineWidth:1,
			        tickColor:'#666',
			        tickWidth:1,
			        tickLength:3,
			        gridLineColor:'#ddd',
			        labels:{
						formatter:function() {
			    			return this.value + "%";
						}
					},
			        title:{
			            text:'Click Rate',
			            rotation: 270,
			            style: {
			            	color: '#222',
			            	fontWeight: 'bold'
			            }
			        },
			        min:ymin,
			        max:ymax
			    },
				tooltip: {
			        formatter: function() {
			            return '<span>' + this.series.options.relname + '</span><br/>' + '<span>Open Rate: ' + this.x + "%" + '</span><br/>' + '<span>Click Rate: ' + this.y + "%" + '</span><br/>';
			        }
			    },
			    series:	series
			    
			   },function(){
				   if(smr.isIE){$e.find(".highcharts-legend-item span").click().click();}
				   $e.find("div.highcharts-legend-item").each(function(i){
					   $(this).attr("title",dataList[i].splitName);
				   });
			   });
			   
			//here re-draw the chart if the chart width not match the content  
			var sectionContentWidth = $sectionContent.width();
			var sectionContentChartWidth = $sectionContent.find(".highcharts-container").width();
			var diffValue = sectionContentWidth - sectionContentChartWidth;
			if(diffValue > 5 && !view.reDraw){
				showView.call(view);
				view.reDraw = true;
			}
		}
	}
	
	
	function renderTableThead(tableColumns){
		var view = this;
		var $e = view.$el;
		var $table = $e.find(".sectionABTest-gridSection .sectionContent .dataTable");
		
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = column.label;
			var columnName = column.name;
			var sortable = false;
			
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
			
			if(typeof column.isBarAndValue != 'undefined'){
				isBarAndValue = column.isBarAndValue;
			}
			
			var tableThead = smr.render("tmpl-ABTest-dataTable-tableThead",{
				"label":columnLable,
				"column":columnName,
				"sortable":sortable
			});
			$table.find("thead tr").append(tableThead);
		}
	}
	
	function renderTableTbody(tableColumns,tableData,type,mailingIds){
		var view = this;
		var $e = view.$el;
		var $tbody = $e.find(".sectionABTest-gridSection .sectionContent .dataTable tbody");
		
		if(type == "total"){
			var tableTbody = smr.render("tmpl-ABTest-dataTable-tableTbody",{});
			var $thisTr = $(tableTbody);
			$thisTr.append("<td class='noBorder' colspan='"+tableColumns.length+"'></td>");
			$tbody.append($thisTr);
		}
		
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-ABTest-dataTable-tableTbody",{index:i});
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
					var isConversionSymbol = false;
					var value = "";
					var first = "";
					var haveTitle = false;
					var columnTitle  = "";
					var showHoverBox = false;
					var isTotalColumn = false;
					var haveBestVaule = false;
					var mailingId = obj.mailingId;
					var isAlignLeft = false;
					
					columnName = column.name;
					
					if(typeof column.label != "undefined"){
						columnLabel = column.label;
					}else{
						columnLabel = columnName;
					}
					
					if (typeof column.isRate != "undefined") {
						isRate = column.isRate;
					}
					
					if (typeof column.isConversionSymbol != "undefined") {
						isConversionSymbol = column.isConversionSymbol;
					}
					
					if(k == 0){
						first = "first";
					}
					
					//total should not show the bar
					if(type == "total"){
						isTotalColumn = true;
					}
					
					//check whether display the title
					if (typeof column.haveTitle != "undefined") {
						haveTitle = column.haveTitle;
					}
					
					if(haveTitle){
						columnTitle = obj[columnName + " Title"];	
					}
					
					//for link show hoverbox
					if (typeof column.showHoverBox != "undefined") {
						showHoverBox = column.showHoverBox;
					}
					
					if(haveTitle){
						columnTitle = obj[columnName + " Title"];	
					}
					
					value = obj[columnName];
					
					if (typeof column.bestValue != "undefined" && column.bestValue.value == value && column.bestValue.haveBestVaule && !isTotalColumn) {
						haveBestVaule = true;
					}else{
						haveBestVaule = false;
					}
					
					if(typeof value =="number") value = smr.formatNumber(value);
					
					if (typeof column.maxLength != "undefined") {
						var maxSize = column.maxLength;
						if(value!=null && value.length > maxSize){
							haveTitle = true;
							columnTitle = "Name:" + value;
							if(column.ellipses == "center"){
								var num = maxSize/2;
								value = value.substring(0,num) + "..." + value.substring((value.length-num),value.length);
							}else if(column.ellipses == "right"){
								value = value.substring(0,maxSize) + "...";
							}else if(column.ellipses == "left"){
								value = "..." + value.substring((value.length-maxSize),value.length);
							}
						}
					}
					
					//check whether text display align left
					if (typeof column.isAlignLeft != "undefined") {
						isAlignLeft = column.isAlignLeft;
					}
					
					var conversionCurrencyForABTest = smr.conversionCurrencyForABTest;
					var tableTbodyTd = smr.render("tmpl-ABTest-dataTable-tableTbody-td",{
						"first":first,
						"value":value,
						"isAlignLeft":isAlignLeft,
						"mailingId":mailingId,
						"isRate":isRate,
						"haveTitle":haveTitle,
						"columnTitle":columnTitle,
						"showHoverBox":showHoverBox,
						"isTotalColumn":isTotalColumn,
						"isLastRow":isLastRow,
						"isConversionSymbol":isConversionSymbol,
						"conversionCurrencyForABTest":conversionCurrencyForABTest,
						"haveBestVaule":haveBestVaule,
						"mailingIds":mailingIds,
						"isMock":smr.isMock()
					});
					$thisTr.append(tableTbodyTd);
				}
				$tbody.append($thisTr);
			}
		}
	}
	
	function getBestValue(ismax,array){
		var bv = [];
		var haveBestValue = false; 
		$.each(array,function(i,data){ 
			bv.push(data);
			if(data>0){
				haveBestValue= true;
			}
		});
		if(bv.length>0){
			if(ismax){
				return {value:Math.max.apply({},bv),haveBestVaule:haveBestValue};
			}else{
				return {value:Math.min.apply({},bv),haveBestVaule:haveBestValue};
			}
		}
		return {};
	}
	
	//can sort by string and number;
	function sortByDefault(arr,columnName,order){
		smr.newSort(arr,columnName,order); 
	}
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionABTest",{
		emptyParent: true
	},function(){
		return new smr.SectionABTest();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
