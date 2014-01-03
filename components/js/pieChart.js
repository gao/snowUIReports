var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _maxPies = smr.maxPies;
	var _showOnlyTableData = [];
	// Highcharts default colors for the chart's series,When all colors are used, new colors are pulled from the start again.
	var _colors = ['#4572A7','#AA4643','#89A54E','#80699B','#3D96AE','#DB843D','#92A8CD','#A47D7C','#B5CA92',"#FFEC8B",
	               '#FFDAB9','#FFC125','#FFB5C5','#FF8C69','#FF83FA','#FF4500','#99FF66','#FF3030','#FF00FF',"#FF0000",
	               '#F4A460','#EEDC82','#DDA0DD','#CD3333','#ADFF2F','#AB82FF','#A2CD5A','#A6A6A6','#97FFFF',"#8B8B00",
	               '#8B7500','#8B4789','#8B2323','#8A2BE2','#6495ED','#5D478B','#54FF9F','#473C8B','#00FFFF',"#CCCCFF",
	               '#FF66FF','#CC33CC','#CC99FF','#FF00FF','#FFCC00','#CC66CC','#0099FF','#00CC99','#33FF33',"#CC6633",
	               ];
	// --------- /Component Private Properties --------- //

	// --------- Component Interface Implementation ---------- //
	function PieChart(){};
	smr.PieChart = PieChart; 
	
	PieChart.prototype.create = function(data,config){
		return smr.render("tmpl-pieChart",{maxPies:smr.maxPies,smaclass:data.smaclass});
	}
		
	PieChart.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		var tableColumns = data.tableColumns;
		var tableData = data.tableData;
		var reportType = data.reportType || "batch";
		view.maxSize = data.maxSize || 20;
		view.pieChartColumn = "";
		view.tableColumns = tableColumns;
		view.tableData = tableData;
		view.reportType = reportType;
		
		// sort defaultColumn
		for(var i=0; i<tableColumns.length;i++){
			var column = tableColumns[i];
			if(column.defaultSort){
				var columnName = column.label;
				if(columnName == "undefined"){
					columnName = column.name;
				}
				if(column.isDate){
					if(column.isMockDateVal){
						sortByDefault(tableData,columnName,false);
					}else{
						sortByDate(tableData,columnName,true);
					}	
				}else{
					sortByDefault(tableData,columnName,false);
				}
				break;
			}
		}
		
		// set  sort defaultColumn
		for(var i=0; i<tableColumns.length;i++){
			var column = tableColumns[i];
			if(column.isPieChart){
				var columnName = column.label;
				if(columnName == "undefined"){
					columnName = column.name;
				}
				view.pieChartColumn = columnName;
				break;
			}
		}
		
		// init _showOnlyTableData
		_showOnlyTableData = processData(tableColumns,tableData,_maxPies);
		//refresh table
		view.refresh(tableColumns,_showOnlyTableData,reportType,data.skipSortMetrics,view.maxSize);
	
	}
	// --------- /Component Interface Implementation ---------- //
	
	PieChart.prototype.events = {		
		// --------- table column event --------- //
		"click; .pie-dataShow thead th.sortable" : function(event){
			var view = this;
			var $e = view.$el;
			var $table = $e.find(".pie-dataShow");
			
			var e = event || window.event;  
			var elem = e.srcElement||e.target; 
			if($(elem).is("select")){
				return;
			}
			var $th = $(e.currentTarget);
			var columnName = $th.attr("data-column");
			var column = getColumnByName(columnName,view.tableColumns);
			var order = true;
			$table.find("th:not(:nth-child("+($th.index()+1)+"))").attr("data-order","");
			$table.find("th .ico").remove();
			$th.append("<div class='ico'></div>");
			$ico = $th.find(".ico");
			if($th.attr("data-order") == 'Desc'){
				order = false;
			}
			order = !order;
			
			if(column.isDate){
				if(column.isMockDateVal){
					sortByDefault(_showOnlyTableData,columnName,order);
				}else{
					sortByDate(_showOnlyTableData,columnName,order);
				}
			}else{
				sortByDefault(_showOnlyTableData,columnName,order);
			}
			
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
			refreshTable($table,view.tableColumns,view.reportType,_showOnlyTableData,view.maxSize);
			//show pieChart
			showPieChart.call(view,_showOnlyTableData);
		},
		
		"change; .pie-dataShow thead th select[name='dropDownSelectMetric']" : function(event){
			var $this = $(event.currentTarget);
			var name = $this.val();
			var extra  = {metricName:name};
			$this.closest(".report").trigger("STATSSUMMARY_DATAITEM_CHANGE",extra);
		},
		// --------- /table column event --------- //
		
		//change showOnly
		"change; .showOnly select[name='showOnly']" : function(event){
			var view = this;
			var $e = view.$el;
			var value = $(event.currentTarget).val();
			if(value == 'all'){
				_maxPies = view.tableData.length;
			}else{
				_maxPies = value * 1;
			}
			smr.maxPies = value;
			
			_showOnlyTableData = processData(view.tableColumns,view.tableData,_maxPies);
			refreshTable($e.find(".pie-dataShow"),view.tableColumns,view.reportType,_showOnlyTableData,view.maxSize);
			//show pieChart
			showPieChart.call(view,_showOnlyTableData);
		}
	}
	
	// --------- Component Public API --------- //
	PieChart.prototype.refresh = function(tableColumns,tableData,reportType,skipSortMetrics,maxSize){
		var view = this;
		var $e = view.$el;
		
		//check whether need to do sortMetrics
		if(typeof skipSortMetrics == "undefined" || !skipSortMetrics){
			tableColumns = smr.sortMetrics(tableColumns);
		}
		var $table = $e.find(".pie-dataShow");
		var $tbody = $table.find("tbody");
		
		var tableTbodytr = smr.render("tmpl-pieChart-tableTbody-tr",{});
		$tbody.append(tableTbodytr);
		
		var $tbodytablethead= $tbody.find(".pieChartTable-data-table thead tr");
		for (var n = 0; n < tableColumns.length; n++) {
			var column = tableColumns[n];
			var columnLable = "";
			if (typeof column.label != "undefined") {
				columnLable = column.label;
			} else {
				columnLable = column;
			}
			var sortable = true;
			var isPieChart = false;
			var isDropDown = false;
			var isByDomain = false;
			
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
			if(typeof column.isPieChart != 'undefined'){
				isPieChart = column.isPieChart;
			}
			if(typeof column.isDropDown != 'undefined'){
				isDropDown = column.isDropDown;
			}
			if(isPieChart){
				sortable = false;
			}
			if (typeof column.isByDomain != "undefined" && column.isByDomain) {
				isByDomain = true;
				sortable = false;
			}
			
			var labelCss = smr.formatNameToCss(columnLable);
			var tableThead = smr.render("tmpl-pieChart-tableThead",{
				"label":columnLable,
				"labelCss":labelCss,
				"column":columnLable,
				"sortable":sortable,
				"isPieChart":isPieChart,
				"isDropDown":isDropDown,
				"dropDownList":column.dropDownList,
				"isByDomain":isByDomain
			});
			
			if(n!=tableColumns.length-1){
				$tbodytablethead.append(tableThead);
			}else{
				$table.find("tbody .pie-chartDiv-head").html(columnLable);
			}
						
			//$e.find(".pie-dataShow thead tr").append(tableThead);
		}

		$table.find("tbody .pieChartTable-data-table-td").width($tbodytablethead.width());		
		refreshTable($table,tableColumns,reportType,tableData,maxSize);
		
		//show pieChart
		showPieChart.call(view,tableData);
	}
	// --------- Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function refreshTable($table,tableColumns,reportType,tableData,maxSize) {
		var $tbody = $table.find("tbody");
		//$tbody.empty();
		
		var $tbodytable= $tbody.find(".pieChartTable-data-tbody");
		$tbodytable.empty();
		
		if(tableData.length==0){
			$tbodytable.append(smr.render("tmpl-pieChart-tableTbody-NoData",{}));
		}
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				obj.i = i+1;
				var tableTbody = smr.render("tmpl-pieChart-tableTbody",{
					"index":obj.i,
					"colorVal":_colors[i%_colors.length]
				});
				var $thisTr = $(tableTbody);

				for (var k = 0; k < tableColumns.length; k++) {
					var column = tableColumns[k];
					var columnName = "";
					var columnLabel = "";
					var columnTitle  = "";
					var isRate = false;
					var isPieChart = false;
					var isDate = false;
					var isConversionSymbol = false;
					var haveTitle = false;
					var isDomianDrilldown =false;
					var isAlignLeft = false;
					var hasOrgTitle = false;
					var isBindData = false;
					var bindData = {};
					var columnMaxSize = column.maxSize ? column.maxSize : maxSize;
					
					if (typeof column.name != "undefined") {
						columnName = column.name;
					} else {
						columnName = column;
					}
					//check whether display as a pie
					if (typeof column.isPieChart != "undefined") {
						isPieChart = column.isPieChart;
					}
					//check whether display the % for the value
					if (typeof column.isRate != "undefined") {
						isRate = column.isRate;
					}
					if (typeof column.isDate != "undefined") {
						isDate = column.isDate;
					}
					
					//check whether display the title
					if (typeof column.haveTitle != "undefined") {
						haveTitle = column.haveTitle;
					}
					//check whether text display align left
					if (typeof column.isAlignLeft != "undefined") {
						isAlignLeft = column.isAlignLeft;
					}
					
					if(typeof column.label != "undefined"){
						columnLabel = column.label;
					}else{
						columnLabel = columnName;
					}

					if (typeof column.isConversionSymbol != "undefined") {
						isConversionSymbol = column.isConversionSymbol;
					}
					
					if(column.isDomianDrilldown){
						isDomianDrilldown = true;
					}
					if (typeof column.isBindData != "undefined") {
						isBindData = column.isBindData;
					}
					
					var value = "";
					var mailingId = "";
					var startDate = null;
					var endDate = null;
					var isMailingName = false;
					var isBatchType = false;
					if(columnLabel == "Mailing"){
						if(typeof obj[columnLabel].value == 'undefined'){
							value = obj[columnLabel];
						}else{
							value = obj[columnLabel].value;
							if(reportType == smr.REPORT_TYPE.BATCH){
								mailingId = obj[columnLabel].mailingId;
								isMailingName = true;
								isBatchType = true;
							}else{
								mailingId = obj[columnLabel].mailingId;
								isMailingName = true;
								var dateRange = smr.getSetAndType(reportType,"main").set.period().getDateRange();
								if(dateRange.startDate){
									startDate = smr.formatDate(dateRange.startDate);
								}
								if(dateRange.endDate){
									endDate = smr.formatDate(dateRange.endDate);
								}
							}
						}
					}else{
						if(isBindData && obj[columnLabel]!="Others"){
							value = obj[columnLabel].value;
							bindData = obj[columnLabel].data;
						}else{
							value = obj[columnLabel];
						}
					}
					
					var isDomainColumn = false;
					if(columnLabel == "Domain"){
						isDomainColumn = true;
					}
					
					if(!isDate) {
						value = smr.formatNumber(value);
					}

					// show the title for the column
					if(haveTitle){
						if(value == "Others"){
							columnTitle = "Others URL";
						}else{
							columnTitle = obj[columnLabel+" Title"];
						}
					}
					
					
					// when length > maxSize add elipse to the text and then have a hover for the full name
					if(value.length > columnMaxSize){
						haveTitle = true;
						columnTitle = "Name:" + value + " " + columnTitle;
						var num = columnMaxSize/2;
						value = value.substring(0,num) + "..." + value.substring((value.length-num),value.length);
					}
					
					if(column.hasOrgTitle && value != "Others"){
						haveTitle = true;
						if(columnTitle.length>0){
							columnTitle += "\n" + "Organization: "+obj["organization"];
						}else{
							columnTitle += "Organization: "+obj["organization"];
						}
					}
					
					var isUseClassMailingNameURL = false;
					if(isMailingName || (isDomianDrilldown && value != "other")){
						isUseClassMailingNameURL = true;
					}
					var tableTbodyTd = smr.render("tmpl-pieChart-tableTbody-td",{
						"value":value,
						"isRate":isRate,
						"isConversionSymbol":isConversionSymbol,
						"isPieChart":isPieChart,
						"lengthVal": i == 0 ? tableData.length + 1 : false,
						"haveTitle":haveTitle,
						"columnTitle":columnTitle,
						"isMailingName":isMailingName,
						"isAlignLeft":isAlignLeft,
						"mailingId":mailingId,
						"startDate":startDate,
						"endDate":endDate,
						"isBatchType":isBatchType,
						"isDomianDrilldown": value=="Others"? false: isDomianDrilldown,
						"isDomainColumn":isDomainColumn,
						"reportType":reportType,
						"isUseClassMailingNameURL":isUseClassMailingNameURL,
						"conversionCurrency":smr.conversionCurrency,
						"isMock":smr.isMock()
					});
					
					var $tableTbodyTd = $(tableTbodyTd);
					if(isBindData && value!="Others"){
						$tableTbodyTd.addClass("bindData").data("bindData",bindData);
					}
					if(!isPieChart){
						$thisTr.append($tableTbodyTd);
					}
				}
				$tbodytable.append($thisTr);
			}else{
				var tableTbody = smr.render("tmpl-pieChart-tableTbodyEmpty",{});
				var $thisTr = $(tableTbody);
				$tbody.append($thisTr);
			}
		}
		//auto tr
//		var $tr = $("<tr class='autoTr'></tr>");
//		for(var i =0 ; i < tableColumns.length;i++){
//			var $td = $("<td class='noBottomBorder'></td>");
//			$tr.append($td);
//		}
//		$tbody.append($tr);
	}
	
	
	function showPieChart(tableData) {
		var $e = this.$element;
		var $dataShow = $e.find(".pie-dataShow");
		var pieColumn = this.pieChartColumn || "%";
		var dataVal = tableData;
		var dataArray = [];
		var dataHaveValNum = 0;
		var dataZeroValNum = 0;
		for(var i=0;i<dataVal.length;i++){
			if(dataVal[i]){
				dataHaveValNum = dataHaveValNum + 1;
				var arr = {
						name:"",
						y:"",
						color:""
				};
				
				arr.name = "target"+(i+1);
				arr.y = dataVal[i][pieColumn];
				if(arr.y == 0){
					dataZeroValNum = dataZeroValNum + 1;
				}
				arr.color = _colors[i%_colors.length];
//				arr.push("target"+(i+1));
//				arr.push(dataVal[i][pieColumn]);
				dataArray.push(arr);
			}
		}
		
		//When we have 0 everywhere we should show a "no data to display"
		if(dataHaveValNum != dataZeroValNum){
			var chart1 = new Highcharts.Chart({
				 chart: {
		         renderTo: $e.find('.pie-chartDiv').get(0),
		         plotBackgroundColor: null,
		         plotBorderWidth: null,
		         plotShadow: false,
				 backgroundColor: 'rgba(0,0,0,0)'
		      },
			   title: {
		         text: ''
		      },
		      tooltip: {
		         formatter: function() {
		            return this.y +' %';
		         }
		      },
			  credits: {
				enabled: false
			  },
		      plotOptions: {
		         pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		               enabled: true,
					   color: '#000000',
					   style:{
	                		fontWeight:'bold'
	            	   },
		               formatter: function() {
		                  return  this.y +' %';
		               }
		            },
					point:{
						events:{
							mouseOver:function(){
								var name = this.name;
								$dataShow.find(".indexNum").each(function(){
									var $this = $(this);
									var targetName = $this.attr("data-target");
									if(name == targetName){
										$this.closest("tr").find("td:not(.noBottomBorder)").each(function(){
											var $thisTd = $(this);
											$thisTd.addClass("sel");
										})
									}
								});
							},
							mouseOut:function(){
								var name = this.name;
								$dataShow.find(".indexNum").each(function(){
									var $this = $(this);
									var targetName = $this.attr("data-target");
									if(name == targetName){
										$this.closest("tr").find("td:not(.noBottomBorder)").each(function(){
											var $thisTd = $(this);
											$thisTd.removeClass("sel");
										})
									}
								});
							}
						}
					}
					
		         }
		      },
		       series: [{
		         type: 'pie',
		         data: dataArray
		      }]
			});
		}else{
			$e.find('.pie-chartDiv').html('<div class="pieChartNoData"></div>');
		}
		
	}
	
	function processData(tableColumns,tableData,maxPies){
		_maxPies = maxPies;
		var returnTableData = [];
		if(_maxPies >= tableData.length){
			returnTableData = tableData;
		}else{
			var totalPercentage=0;
			returnTableData = tableData.slice(0,_maxPies-1);
			
			//2012-12-20 merge fix from 7.1 to 7.2
			for (var i=0;i<(_maxPies-1);i++){
			   totalPercentage += returnTableData[i]['%'];
			}
			
			var otherObj = {};
			for(var i=_maxPies-1; i<tableData.length;i++){
				for(var key in tableData[i]){
					var column = getColumnByName(key,tableColumns);
					if(column != null){
						var columnName = key;
						if(typeof otherObj[columnName] == 'undefined'){
							if(column.isDate){
								otherObj[columnName] = 'Others';
							}else{
								otherObj[columnName] = tableData[i][columnName];
							}
						}else{
							if(!column.isDate){
								if(tableData[i][columnName] == 'N/A'){
									//otherObj[columnName] += 0;
								}else if(columnName == '%' || columnName.indexOf(' Contribution to ') >= 0 ){
									//2012-12-20 merge fix from 7.1 to 7.2
                           			otherObj[columnName] = 100 - totalPercentage;
                           			//added a condition to check if percentaged for all is 0 then percentage for others column can not be >0
                           			if(otherObj[columnName] < 0 || totalPercentage == 0){
                              			otherObj[columnName] = 0;
                          			}
							   	}else{
									if(otherObj[columnName] == "N/A"){
										otherObj[columnName] = 0;
									}
									otherObj[columnName] += tableData[i][columnName];
								}
								// here limited to 2 digits after the decimal points  
								if((otherObj[columnName]+"").indexOf("N/A")==-1){
									otherObj[columnName] = parseFloat(otherObj[columnName].toFixed("2"));
								}
							}
						}
						
					}else{
						//for color value
						if(typeof otherObj[key] == 'undefined'){
							otherObj[key]= tableData[i][key];
						}
					}
				}
			}
			returnTableData.push(otherObj);
		}
		return $.extend(true,[],returnTableData);
		
	}
	
	// --------- Helper Functions --------- //
	function getColumnByName(columnName,tableColumns){
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = "";
			if (typeof column.label != "undefined") {
				columnLable = column.label;
			} else if (typeof column.name != "undefined") {
				columnLable = column.name;
			} else {
				columnLable = column;
			}
			if(columnName == columnLable){
				return column;
			}
		}
		return null;
	}
	
	//can sort by string and number;
	function sortByDefault(arr,columnName,order){
		smr.newSort(arr,columnName,order); 
	}
	//FIXME can sort by date,for now just support yyyy-MM-dd, MM/dd/yyyy
	function sortByDate(arr,columnName,order){
		arr.sort(function(a,b){
			var seconds1,seconds2;
			if(a[columnName].indexOf("-") >=0 ){
				var dArr1 = a[columnName].split("-");
				var dArr2 = b[columnName].split("-");
				seconds1 = Date.parse(dArr1[1]+"/"+dArr1[2]+"/"+dArr1[0]);
				seconds2 = Date.parse(dArr2[1]+"/"+dArr2[2]+"/"+dArr2[0]);
			}else if(a[columnName].indexOf("/") >=0){
				seconds1 = Date.parse(a[columnName]);
				seconds2 = Date.parse(b[columnName]);
			}else{
				//if a is not a date
				seconds1 = a[columnName];
				seconds2 = b[columnName];
			}
			//if order true , sort by asc
			if(order){
				return seconds1 < seconds2 ? 1 : -1;
			}
			return  seconds1 > seconds2 ? 1 : -1;
		});
	}
	
	// --------- /Helper Functions --------- //

	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerComponent("pieChart", {
		emptyParent: true
	},function(){
		return new smr.PieChart();
	});
	// --------- /Component Registration --------- //
})(jQuery);
