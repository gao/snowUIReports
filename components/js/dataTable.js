var smr = smr || {};

(function($){

	// --------- Component Interface Implementation ---------- //
	function DataTable(){};
	smr.DataTable = DataTable; 
  
	DataTable.prototype.create = function(data,config){
		return smr.render("tmpl-dataTable",{title:data.title,smaclass:data.smaclass});
	}
		
	DataTable.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.tableColumnsCount = data.tableColumns.length;
		
		//refresh table
		view.refresh(data);
	}
	// --------- /Component Interface Implementation ---------- //
	
	DataTable.prototype.events = {
		"mouseout; td[rowspan],td.first" : function(event){
			var $td = $(event.currentTarget);
			var $tr = $td.closest("tr");
			var value = $tr.attr("data-combine-value");
			var $table = $tr.closest("table");
			$table.find("tr").find("td").removeClass("over");
		},
		
		"mouseover; td[rowspan],td.first":function(event){
			var view = this;
			var $td = $(event.currentTarget);
			var $tr = $td.closest("tr");
			var value = $tr.attr("data-combine-value");
			var $table = $tr.closest("table");
			var rowspan = parseInt(($td.attr("rowspan")||"1"));
			var td_index = $td.index();
			var tr_index = $tr.index()+1;
			$table.find("tr").each(function(i){
				if(tr_index <=i  && i<tr_index+rowspan ){
					var $tds = $(this).find("td");
					var tdscount = $tds.size();
					var gap = view.tableColumnsCount-tdscount;
					$tds.each(function(k){
						if(k>=(td_index-gap))$(this).addClass("over");
					});
				}
			});
		}
	}
	
	// --------- Component Public API --------- //
	DataTable.prototype.refresh = function(data){
		var $e = this.$el;
		var tableColumns = data.tableColumns;
		var tableData = data.tableData;
		var reportType = data.reportType || "batch";
		var maxSize = data.maxSize || 30;
		var view = this;
		var combinations = [];
		view.combinationDefaultNotSort = data.combinationDefaultNotSort?true:false;
		
		//check whether need to do sortMetrics
		if(typeof data.skipSortMetrics == "undefined" || !data.skipSortMetrics){
			tableColumns = smr.sortMetrics(tableColumns);
		}
		
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
			var sortable = true;
			var isBarChart = false;
			var isDropDown = false;
			var isTableOfBarView = false;
			var isByDomain = false;
			
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
			if(typeof column.isBarChart != 'undefined'){
				isBarChart = column.isBarChart;
			}
			if(typeof column.isDropDown != 'undefined'){
				isDropDown = column.isDropDown;
			}
			if(column.combination > 0){
				combinations.push(column);
			}
			if (typeof column.isByDomain != "undefined" && column.isByDomain) {
				isByDomain = true;
				sortable = false;
			}
			
			//control the second column width of the bar table
			if(typeof data.isTableOfBarView != 'undefined'){
				if(i == 1){
					isTableOfBarView = data.isTableOfBarView;
				}
			}
			
			var labelCss = smr.formatNameToCss(columnLable);
			var tableThead = smr.render("tmpl-dataTable-tableThead",{
				"label":columnLable,
				"labelCss":labelCss,
				"column":columnLable,
				"sortable":sortable,
				"isBarChart":isBarChart,
				"isDropDown":isDropDown,
				"dropDownList":column.dropDownList,
				"isTableOfBarView":isTableOfBarView,
				"isByDomain":isByDomain
			});
			$e.find(".dataTable thead tr").append(tableThead);
		}
		
		//sort combinations
		view.combinations = combinations;
		if(view.combinations.length > 0 && !view.combinationDefaultNotSort){
			tableData.sort(function(a,b){
				return a[view.combinations[0].label] > b[view.combinations[0].label] ? 1 : -1
			});
		}

		var $table = $e.find(".dataTable");
		var pagination = smr.Pagination(tableData);
		// when there is no need to show row control , then we set the page count to "all" 
		if (data.doNotShowRowControl){
			pagination.setPageCount("all");
			refreshTable($table,tableColumns,reportType,maxSize,pagination,null,{doNotShowRowControl:true});
		} else {
			refreshTable($table,tableColumns,reportType,maxSize,pagination,null);
		}
		
		// --------- table column event --------- //
		$table.delegate("thead th.sortable","click",function(event){
			var e = event || window.event;  
			var elem = e.srcElement||e.target; 
			if($(elem).is("select")){
				return;
			}
			var $th = $(this);
			var columnName = $th.attr("data-column");
			var column = getColumnByName(columnName,tableColumns);
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
					sortByDefault(tableData,columnName,order);
				}else{
					sortByDate(tableData,columnName,order);
				}
			}else{
				sortByDefault(tableData,columnName,order);
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
			pagination = smr.Pagination(tableData);			
			if (data.doNotShowRowControl){
				pagination.setPageCount("all");
				refreshTable($table,tableColumns,reportType,maxSize,pagination,null,{doNotShowRowControl:true});
			} else {
				refreshTable($table,tableColumns,reportType,maxSize,pagination,null);
			}
		});
		
		$table.delegate("thead th select[name='dropDownSelectMetric']","change",function(){
			var $this = $(this);
			var name = $this.val();
			var extra  = {metricName:name};
			$this.closest(".report").trigger("STATSSUMMARY_DATAITEM_CHANGE",extra);
		});
		
		$table.delegate("td.showhover","mouseover",function(event){
			var $this = $(this);
			var $thisparent = $this.closest(".showhover");
			var name = $thisparent.attr("data-name");
			var value = $thisparent.attr("data-value");
			var dataObj = {
			    name:name,
			    value:value
			};
			var html = smr.render("tmpl-section-table-td-hover",dataObj);
			$container = $e.find(".hoverBoxContainer");
			$container.empty().hide();
			$container.css("min-width",$thisparent.width()+25);
			$container.append(html);
			var offset = $e.closest(".smr.report").offset() ;
			var thisSpanOffset = $(this).offset();
			var IE7offsetX = 0;
			$container.css({left:(thisSpanOffset.left - offset.left)-IE7offsetX+$this.width() , top:thisSpanOffset.top-offset.top});
			$container.show();
		});
		
		$table.delegate("td.showhover","mouseleave",function(event){
			$e.find(".hoverBoxContainer").empty().hide();
		});
			
		$e.delegate(".hoverBoxContainer","mouseleave",function(event){
			var $this = $(this);
			$this.empty();
			$this.hide();
		});

		// --------- /table column event --------- //

		// --------- pagiantion event --------- //
		$table.delegate(".pagination input[name='gotoPage']","keyup.pagination-goto", function(e) {
			if(e.which == 13){
				var pageNum = $(this).val();
				if(isNaN(pageNum)) {
					pageNum = 1;
				}
				refreshTable($table,tableColumns,reportType,maxSize,pagination,pageNum);
			}
		});
		
		$table.delegate(".pagination .gotoBtn","click.pagination-goto", function(e) {
			var pageNum = $table.find(".pagination input[name='gotoPage']").val();
			if(isNaN(pageNum)) {
				pageNum = 1;
			}
			refreshTable($table,tableColumns,reportType,maxSize,pagination,pageNum);
		});
		
		$table.delegate(".pagination select","change.pagination-pageCount", function(e) {
			var thisVal = $(this).val();
			var pageCount = "25";
			if(thisVal == "All"){
				pageCount = "all";
			}else{
				pageCount = $(this).val() * 1;
			}
			
			pagination.setPageCount(pageCount);
			refreshTable($table,tableColumns,reportType,maxSize,pagination,null);
		});

		$table.delegate(".pagination .nextEnd.action","click.next", function(e) {
			refreshTable($table,tableColumns,reportType,maxSize,pagination,pagination.getPageInfo().pageSize);
		});

		$table.delegate(".pagination .prevStart.action","click.prev", function(e) {
			refreshTable($table,tableColumns,reportType,maxSize,pagination,1);
		});
		
		$table.delegate(".pagination .prev.action","click.prev", function(e) {
			var pageNum = pagination.getPageInfo().pageNum;
			pageNum = pageNum - 1;
			refreshTable($table,tableColumns,reportType,maxSize,pagination,pageNum);
		});
		$table.delegate(".pagination .next.action","click.prev", function(e) {
			var pageNum = pagination.getPageInfo().pageNum;
			pageNum = pageNum + 1;
			refreshTable($table,tableColumns,reportType,maxSize,pagination,pageNum);
		});
		$table.delegate(".pagination .nums .pageNum","click.prev", function(e) {
			var pageNum = $(this).attr("data-num") * 1;
			refreshTable($table,tableColumns,reportType,maxSize,pagination,pageNum);
		});
		// --------- /pagiantion event --------- //
	}
	// --------- Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function refreshTable($table,tableColumns,reportType,maxSize,pagination,pageNum,option) {
		var $tbody = $table.find("tbody");
		
		var sortCloumName = $table.find("th[data-order='Asc'],th[data-order='Desc']").attr("data-column");
		var sortCloum = null;
		if(sortCloumName){
			sortCloum = getColumnByName(sortCloumName,tableColumns);
		}
		
		if(pageNum==null || typeof pageNum == 'undefined') {
			pageNum = pagination.getPageInfo().pageNum;
		}
		pageInfo = pagination.go(pageNum);
		$tbody.empty();
		
		var combineValue = {};
		var combineIndex = 1;
		for(var i=0; i<pageInfo.pageList.length;i++) {
			var obj = pageInfo.pageList[i];
			if (obj) {
				
				var tableTbody = smr.render("tmpl-dataTable-tableTbody",{});
				var $thisTr = $(tableTbody);
				
				for (var k = 0; k < tableColumns.length; k++) {
					var column = tableColumns[k];
					var columnName = "";
					var columnLabel = "";
					var columnTitle  = "";
					var isRate = false;
					var isBarChart = false;
					var isDate = false;
					var isConversionSymbol = false;
					var haveTitle = false;
					var isCombination = false;
					var combinationTD = false;
					var first = "";
					var isAlignLeft = false;
					var isAlignCenter = false;
					var isFailureDetailCount = false;
					var failureType = "";
					var failureCategory = "";
					var isDomianDrilldown = false;
					var hasOrgTitle = false;
					var isLeftEllipse = false;
					var showHoverBox = false;
					var hoverBoxVal = "";
					var mailingName = "";
					var isBindData = false;
					var bindData = {};
					var showOpen = false;
					var openName = "showOpen"; 
					var opens = 0;
					
					if (typeof column.name != "undefined") {
						columnName = column.name;
					} else {
						columnName = column;
					}
					//check whether display as a bar
					if (typeof column.isBarChart != "undefined") {
						isBarChart = column.isBarChart;
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
					
					if (typeof column.isAlignCenter != "undefined") {
						isAlignCenter = column.isAlignCenter;
					}
					
					//check whether is the isFailureDetailCount
					if (typeof column.isFailureDetailCount != "undefined") {
						isFailureDetailCount = column.isFailureDetailCount;
						failureType = obj["Code"];
						failureCategory = obj["Category"];
					}
					
					//check whether display the HoverBox
					if (typeof column.showHoverBox != "undefined") {
						showHoverBox = column.showHoverBox;
					}
					
					if(typeof column.label != "undefined"){
						columnLabel = column.label;
					}else{
						columnLabel = columnName;
					}

					if (typeof column.isConversionSymbol != "undefined") {
						isConversionSymbol = column.isConversionSymbol;
					}
					
					// show the title for the column
					if(haveTitle){
						columnTitle = obj[columnLabel+" Title"];
					}
					
					// show the title for the column
					if(showHoverBox){
						hoverBoxVal = obj["Subject"];
					}
					
					if(column.isDomianDrilldown){
						isDomianDrilldown = true;
					}
					
					if (typeof column.isBindData != "undefined") {
						isBindData = column.isBindData;
					}
					
					if (typeof column.showOpen != "undefined") {
						showOpen = column.showOpen;
						if(sortCloum) showOpen = sortCloum.showOpen? true :false;
					}
					if (typeof column.openName != "undefined") {
						openName = column.openName;
					}
					
					var value = "";
					var mailingId = "";
					var startDate = null;
					var endDate = null;
					var isMailingName = false;
					var isBatchType = false;
					if(columnLabel == "Mailing" || columnLabel == "Mailing Name"){
						value = obj[columnLabel].value;
						mailingName = value;
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
					}else{
						if(isBindData){
							value = obj[columnLabel].value;
							bindData = obj[columnLabel].data;
						}else if(showOpen){
							value = obj[columnLabel];
							//opens = obj[openName];
						}else{
							value = obj[columnLabel];
						}
					}
					
					var isDomainColumn = false;
					if(columnLabel == "Domain"){
						isDomainColumn = true;
					}
					
					if(column.combination > 0){
						if(value == combineValue[column.label]){
							isCombination = true;
						}else{
							combineValue[column.label] = value;
							combineIndex = 1;
							combinationTD = true;
							if(showOpen)opens = parseFloat(pageInfo.pageList[i][openName]);
							for(var t = i + 1; t < pageInfo.pageList.length; t++){
								if(pageInfo.pageList[t][columnLabel] == combineValue[column.label]){
									if(showOpen)opens += parseFloat(pageInfo.pageList[t][openName]);
									combineIndex++;
								}else{
									break;
								}
							}
						}
						first = "first";
					}else{
						if(k == 0){
							first = "first";
						}
					}
					
					if(isBarChart){
						if(!isFinite(value)){
							value=0;
						}
					}
					
					// when length > 20 add elipse to the text and then have a hover for the full name
					if(value.length > maxSize){
						haveTitle = true;
						columnTitle = "Name:" + value + " " + columnTitle;
						if(column.isLeftEllipse){
							value = "..." + value.substring((value.length-maxSize),value.length);
						}else{
							var num = maxSize/2;
							value = value.substring(0,num) + "..." + value.substring((value.length-num),value.length);
						}
					}
					
					if(column.hasOrgTitle){
						haveTitle = true;
						if(columnTitle.length>0){
							columnTitle += "\n" + "Organization: "+obj["organization"];
						}else{
							columnTitle += "Organization: "+obj["organization"];
						}
					}
					
					if((isRate || isConversionSymbol) && value!="null" && value!="N/A"){
						value = smr.formatToFixed(value);
					}
					
					if(!isDate && columnLabel != "Code"  && value!="null" && value!="N/A") {
						value = smr.formatNumber(value);
					}
					
					// when showHoverBox, do not show the title
					if(showHoverBox){
						haveTitle = false;
					}
					
					var isDomianDrilldownAndOtherCheck = false;
					if(isDomianDrilldown && !(value == "other" || value == "others" || value == "Other" || value == "Others")){
						isDomianDrilldownAndOtherCheck = true;
					}
					
					var isUseClassMailingNameURL = false;
					if(isMailingName || (isDomianDrilldown && value != "other")){
						isUseClassMailingNameURL = true;
					}
					
					var tableTbodyTd = smr.render("tmpl-dataTable-tableTbody-td",{
						"first":first,
						"value":value,
						"isRate":isRate,
						"isConversionSymbol":isConversionSymbol,
						"isBarChart":isBarChart,
						"haveTitle":haveTitle,
						"columnTitle":columnTitle,
						"isCombination":isCombination,
						"combineRowspan":combineIndex,
						"combinationTD":combinationTD,
						"isAlignLeft":isAlignLeft,
						"isAlignCenter":isAlignCenter,
						"isFailureDetailCount":isFailureDetailCount,
						"failureType":failureType,
						"failureCategory":failureCategory,
						"isMailingName":isMailingName,
						"mailingId":mailingId,
						"startDate":startDate,
						"endDate":endDate,
						"isBatchType":isBatchType,
						"isDomianDrilldown":isDomianDrilldown,
						"isDomainColumn":isDomainColumn,
						"reportType":reportType,
						"hoverBoxVal":hoverBoxVal,
						"mailingName":mailingName,
						"showHoverBox":showHoverBox,
						"isBindData":isBindData,	
						"showOpen":showOpen,	
						"opens":opens.toFixed("2"),	
						"isDomianDrilldownAndOtherCheck":isDomianDrilldownAndOtherCheck,
						"isUseClassMailingNameURL":isUseClassMailingNameURL,
						"conversionCurrency":smr.conversionCurrency,
						"isMock":smr.isMock()
					});
					var $tableTbodyTd = $(tableTbodyTd);
					$thisTr.append($tableTbodyTd);
					if(isBindData){
						$tableTbodyTd.data("bindData",bindData);
					}
					$thisTr.attr("data-combine-value",combineValue[column.label]);

				}
				$tbody.append($thisTr);
			}
		}
		
		var doNotShowRowControl =  (option && option.doNotShowRowControl)? true :false;
		if(!doNotShowRowControl){
			var pObj = $.extend({},pageInfo);
			$tbody.append(smr.render("tmpl-dataTable-pagination",pObj));
		}
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
			}else{
				seconds1 = Date.parse(a[columnName]);
				seconds2 = Date.parse(b[columnName]);
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
	brite.registerView("dataTable", {
		emptyParent: true
	},function(){
		return new smr.DataTable();
	});
	// --------- /Component Registration --------- //
	
})(jQuery);
