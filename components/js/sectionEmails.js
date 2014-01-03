var smr = smr || {};

(function($){
	var _defaultStartDate="";
	var _defaultEndDate="";
	// --------- Component Interface Implementation ---------- //
	function SectionEmails(){};
	smr.SectionEmails = SectionEmails; 
	
	SectionEmails.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionEmails",{});
	};
		
	SectionEmails.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
	    var $report =  $e.closest(".report");
	    $report.find(".reportHeader").addClass("sectionUserInsightOverview-header");
	    
	    $report.find(".reportHeader-toggle").css('border-right',0);
	    
		view.reportType = data.reportType || smr.REPORT_TYPE.USERINSIGHT;
		view.isNewRequest = data.isNewRequest || false;
		view.viewRate = $e.closest(".report").find(".reportHeader-rateSwitch").find("[type=checkbox]").attr("checked") == "checked" ? true : false;
		view._filterDates = "after";
		view._filterRevenues = "D";
		view._pageCount = "25";
		view.showView(view.viewRate);
	};
	
	SectionEmails.prototype.events = {
		"click; .sectionTitle .collapsible": clickCollapsible,
		
		//reset the filter
		"click; .sectionEmails-tablePart .resetBtn":clickResetBtn,
		
		//view the Emails
		"click; .viewIcon":clickViewEmailsBtn
	};

	SectionEmails.prototype.parentEvents = {
		report:{
			//event for viewrate change
			"REPORTHEADER_VIEWRATE_CHANGE": reportHeaderViewRateChangeMethod,
			
			//event for Date Range change
			"REPORTHEADER_DATESELECT_CHANGE": reportHeaderDateselectChangeMethod
		}
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	// --------- events --------- //
	function clickResetBtn(event){
		var view = this;
		var $e = view.$el;
		
		var $emailFilterFields = $e.find(".email-filter-fields");
		$emailFilterFields.find(".mailingname").val('');
		$emailFilterFields.find(".cbox").each(function() { 
			$(this).attr("checked", false); 
		}); 
		$emailFilterFields.find(".dates").get(0).selectedIndex=0;
		$emailFilterFields.find(".revenues").get(0).selectedIndex=0;
		$emailFilterFields.find(".dateValue").val('   /  /    ');
		$emailFilterFields.find(".revenueValue").val('');
		var $message = $(".sectionTitle").find(".message");
		$message.hide();

		cleanView(view);
		showDataSection.call(view,view.dataAll);
	}
	
	function clickCollapsible(event){
		var $this = $(event.currentTarget);
		$this.hide();
		if($this.hasClass("exp")){
			$this.closest(".sectionTitle").find(".col").show();
			$this.closest(".sectionTitle").find(".reset").show();
			$this.closest(".sectionEmails-tablePart").find(".email-filter-fields").slideDown(300);
		}else{
			$this.closest(".sectionTitle").find(".exp").show();
			$this.closest(".sectionTitle").find(".reset").hide();
			$this.closest(".sectionEmails-tablePart").find(".email-filter-fields").slideUp(300);
		}
	}
	
	function clickViewEmailsBtn(event){
		var view = this;
		var $e = view.$el;
		var $target = $(event.currentTarget);
		var $mailingNameURL = $(event.currentTarget).parent().next();
		var showTitle = $mailingNameURL.find(".mailingNameURL").attr("title");
		if(typeof showTitle == 'undefined'){
			showTitle = $mailingNameURL.find(".mailingNameURL a").html();
		}else{
			showTitle = showTitle.substring(showTitle.indexOf("Name:")+5,showTitle.length);
		}
		var mailingId = $target.attr("data-value");
		var type = $target.attr("data-type");
		smr.getMailContent(mailingId,type).done(function(data){
			var data = data.items || [];
			var htmlValue = "";
			if(data[0]){
				htmlValue = data[0];
			}
			brite.display("viewEmailsPicker",$("body"),showTitle,htmlValue);
		});
	}
	
	function reportHeaderViewRateChangeMethod(event,extra){
		var view = this;
		cleanView(view);
		view.viewRate = extra.value;
		showSummary.call(view, view.dataAll, view.viewRate);
	}
	
	function reportHeaderDateselectChangeMethod(event,extra){
		var view = this;
		cleanView(view);
		view.showView(view.viewRate);
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	SectionEmails.prototype.getAllData = function(){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();

		smr.getUserInsightSummary("emails",view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items != null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionEmails.prototype.showView = function(viewRate){
		var view = this;
		var $e = view.$el;
		
		//clean first
		$e.bEmpty();
		html = smr.render("tmpl-sectionEmails",{});
		$e.append($(html));
		
		var reportType = view.reportType;
		var $content = $e.find(".sectionTitle");
		$content.append(smr.render("tmpl-email-dateView",{reportType:reportType}));
		
		view.getAllData().done(function(dataAll){
			view.dataAll = dataAll;
			showSummary.call(view,dataAll,viewRate);
			showDataSection.call(view,dataAll);
			registerEmailViewEvent.call(view,dataAll);
		});
		return true;
	}
	// --------- /Component Public API --------- //	
		
	
	// --------- Component Private Methods --------- //
	
	function showSummary(dataAll,viewRate){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		var $statsSummary = $e.find(".statsSummary");
		var $title = $e.closest(".report").find(".reportHeader .reportHeader-reportName");
		var $subTitle = $e.find(".subTitle");
		
		//first empty statsSummary
		$statsSummary.empty();
		
		if(typeof dataAll == "undefined" || typeof dataAll.summary=="undefined" || dataAll.summary==null){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var summaryData = dataAll.summary;
			var stats = [];
			
			//show the title and subtitle
			$title.html(summaryData.name);
			$subTitle.html(summaryData.email);
			if(viewRate){
				stats = [
							{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isRate:false},
							{name:"delivered",label:"Deliverey Rate",value:smr.checkNumber(summaryData.deliveryRate),isRate:true},
							{name:"opens",label:"Open Rate",value:smr.checkNumber(summaryData.openRate),isRate:true},
							{name:"clicks",label:"Click Rate",value:smr.checkNumber(summaryData.clickRate),isRate:true},
							{name:"unsubs",label:"Unsub Rate",value:smr.checkNumber(summaryData.unsubRate),isRate:true}
					  	];
			}else{
				stats = [
							{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isRate:false},
							{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered),isRate:false},
							{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.opens),isRate:false},
							{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clicks),isRate:false},
							{name:"unsubs",label:"Unsubs",value:smr.checkNumber(summaryData.unsubs),isRate:false}
					  	];
			}
		  	
		  	//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
			if(smr.conversionEnabled){
				if(viewRate){
					stats.push({name:"conversions",label:"Conversion Rate",value:smr.checkNumber(summaryData.conversionRate),isRate:true});
				}else{
					stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions),isRate:false});
				}
				stats.push({name:"revenue",label:"Revenue",value:smr.checkNumber(summaryData.revenue),isRate:false,isConversionSymbol:true});
			}
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:"table"});
		}
	}	
	
	
	function showDataSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionEmails-tablePart");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		var $sectionView = $e.find(".sectionEmails-tablePart .sectionView");
		
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || dataAll.data==null){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll;
			var dataList = dataAll.data;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"mailing",label:"Mailing",textAlignLeft:true,sortable:true,maxLength:30,ellipses:"right"});
			tableColumns.push({name:"date",label:"Date",textAlignLeft:true,sortable:true,isDate:true});
			tableColumns.push({name:"type",label:"Type",textAlignLeft:true,sortable:true});
			tableColumns.push({name:"subject",label:"Subject Line",textAlignLeft:true,sortable:true,maxLength:30,ellipses:"right"});
			tableColumns.push({name:"open",label:"Opened",textAlignLeft:false,isDraw:true});
			tableColumns.push({name:"click",label:"Clicked",textAlignLeft:false,isDraw:true});
			if(smr.conversionEnabled){
				tableColumns.push({name:"conversions",label:"Converted",textAlignLeft:false,isDraw:true});
				tableColumns.push({name:"revenue",label:"Revenue",isNum:true,isConversionSymbol:true,textAlignCenter:true,sortable:true});
			}
			
			var tableDataInfo ={
				tableColumns: tableColumns,
				tableData:[]
			};
			
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				var useProgramId = (rowData.type && rowData.type.toLowerCase()=="program"); 
				if(smr.conversionEnabled){
					resultData = {
						"mailing":rowData.mailingName,
						"id":rowData.id,
						"date" : rowData.date,
						"type" :doRenameTypeValue(rowData.type),
						"assetType": rowData.assetType,
						"subject" : rowData.subject,
						"open" : rowData.open,
						"click" : rowData.click,
						"conversions" : rowData.converted,
						"revenue" : smr.checkNumber(rowData.revenue),
						"useProgramId":useProgramId,
						"programName": rowData.programName,
						"programId":rowData.programId
					};
				}else{
					resultData = {
						"mailing":rowData.mailingName,
						"id":rowData.id,
						"date" : rowData.date,
						"type" :doRenameTypeValue(rowData.type),
						"assetType": rowData.assetType,
						"subject" : rowData.subject,
						"open" : rowData.open,
						"click" : rowData.click,
						"useProgramId":useProgramId,
						"programName": rowData.programName,
						"programId":rowData.programId
					};
				}
					
				tableData.push(resultData);
				tableDataInfo.tableData.push(resultData);
			}
			
			var filterDatas = filterData(view,tableData);
			$sectionView.html("<span>Emails: "+filterDatas.length+"</span>");
			var pagination = smr.Pagination(filterDatas);
			
			
			pagination.setPageCount(view._pageCount);
			// add the table thead
			renderTableThead.call(view,tableColumns,"dataSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,null);
			
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
					sortByDate(tableData,columnName,order);
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
				$e.find(".sectionEmails-tablePart .sectionContent .dataTable tbody").empty();
				pagination = smr.Pagination(filterData(view,tableData));
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,null);
			});
			
			// --------- pagiantion event --------- //
			$table.delegate(".pagination input[name='gotoPage']","keyup.pagination-goto", function(e) {
				if(e.which == 13){
					var pageNum = $(this).val();
					if(isNaN(pageNum)) {
						pageNum = 1;
					}
					renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,pageNum);
				}
			});
			
			$table.delegate(".pagination .gotoBtn","click.pagination-goto", function(e) {
				var pageNum = $table.find(".pagination input[name='gotoPage']").val();
				if(isNaN(pageNum)) {
					pageNum = 1;
				}
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,pageNum);
			});
			
			$table.delegate(".pagination select","change.pagination-pageCount", function(e) {
				var thisVal = $(this).val();
				var pageCount = "25";
				if(thisVal == "All"){
					pageCount = "all";
				}else{
					pageCount = $(this).val() * 1;
				}
				view._pageCount = pageCount;
				pagination.setPageCount(pageCount);
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,null);
			});

			$table.delegate(".pagination .nextEnd.action","click.next", function(e) {
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,pagination.getPageInfo().pageSize);
			});

			$table.delegate(".pagination .prevStart.action","click.prev", function(e) {
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,1);
			});
			
			$table.delegate(".pagination .prev.action","click.prev", function(e) {
				var pageNum = pagination.getPageInfo().pageNum;
				pageNum = pageNum - 1;
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,pageNum);
			});
			$table.delegate(".pagination .next.action","click.prev", function(e) {
				var pageNum = pagination.getPageInfo().pageNum;
				pageNum = pageNum + 1;
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,pageNum);
			});
			$table.delegate(".pagination .nums .pageNum","click.prev", function(e) {
				var pageNum = $(this).attr("data-num") * 1;
				renderTableTbody.call(view,tableColumns,tableData,"","dataSection",pagination,pageNum);
			});
		}
	}
	
	function renderTableThead(tableColumns,sectionType){
		var view = this;
		var $e = view.$el;
		var $table = $e.find(".sectionEmails-tablePart .sectionContent .dataTable");
		$table.find("thead tr").empty();
		$table.find("thead tr").append("<th><div></div></th>");
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = column.label;
			var columnName = column.name;
			var sortable = false;
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
		
			var tableThead = smr.render("tmpl-sectionContent-dataTable-tableThead-emails",{
				"label":columnLable,
				"column":columnName,
				"sortable":sortable
			});
			$table.find("thead tr").append(tableThead);
		}
	}
	
	function renderTableTbody(tableColumns,tableData,type,sectionType,pagination,pageNum){
		var view = this;
		var $e = view.$el;
		var $tbody = $e.find(".sectionEmails-tablePart .sectionContent .dataTable tbody");
		var reportType = view.reportType;
		if(pageNum==null || typeof pageNum == 'undefined') {
			pageNum = pagination.getPageInfo().pageNum;
		}
		pageInfo = pagination.go(pageNum);
		$tbody.empty();
		for(var i=0; i<pageInfo.pageList.length;i++) {
			var obj = pageInfo.pageList[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-sectionContent-dataTable-tableTbody-emails",{});
				var $thisTr = $(tableTbody);
				
				var isLastRow = false;
				if(i == (pageInfo.pageList.length -1)){
					isLastRow = true;
				}
				$thisTr.append("<td class='"+(isLastRow?"lastRowTd ":"")+"firstTd'><div class='viewIcon' data-value="+obj['id']+" data-type="+obj['type']+"></div></td>");
				for (var k = 0; k < tableColumns.length; k++) {
					var column = tableColumns[k];
					var columnName = "";
					var columnLabel = "";
					var isConversionSymbol = false;
					var isRate = false;
					var value = "";
					var haveTitle = false;
					var columnTitle  = "";
					var textAlignLeft = false;
					var textAlignCenter = false;
					var improvement = "unchange";
					var showOpen = false;
					var isDraw = false;
					var isNum = false;
					
					columnName = column.name;
					
					if(typeof column.label != "undefined"){
						columnLabel = column.label;
					}else{
						columnLabel = columnName;
					}
					
					if (typeof column.isRate != "undefined") {
						isRate = column.isRate;
					}
					
					if (typeof column.isNum != "undefined") {
						isNum = column.isNum;
					}
					
					if (typeof column.isConversionSymbol != "undefined") {
						isConversionSymbol = column.isConversionSymbol;
					}
					
					if (typeof column.textAlignLeft != "undefined") {
						textAlignLeft = column.textAlignLeft;
					}
					
					if (typeof column.textAlignCenter != "undefined") {
						textAlignCenter = column.textAlignCenter;
					}
					
					if (typeof column.isDraw != "undefined") {
						isDraw = column.isDraw;
					}
					
					//check whether display the title
					if (typeof column.haveTitle != "undefined") {
						haveTitle = column.haveTitle;
					}
					
					if(haveTitle){
						columnTitle = obj[columnName + " Title"];	
					}
					
					value = obj[columnName];
					
					//format the value to 2 decimal point
					if(isNum){
						if(typeof value == "undefined" || value == 'null'){
							return 0;
						}else{
							value = smr.formatNumber(parseFloat(value.toFixed("2")));
						}
					}
					
					if(isConversionSymbol && value == 0){
						isConversionSymbol = false;
						if(columnName == "revenue"){
							value ="";
						}
					}
					
					if (typeof column.showOpen != "undefined") {
						showOpen = column.showOpen;
						if(sortCloum) showOpen = sortCloum.showOpen? true :false;
					}
					
					var id = "";
					var assetType = "";
					var isMailingName = false;
					var mailingName = "";
					if(columnName == "mailing"){
						value = obj[columnName];
						id = obj["id"];
						isMailingName = true;
						assetType = obj["assetType"];
						mailingName = value;
					}
					
					
					if (typeof column.maxLength != "undefined") {
						var maxSize = column.maxLength;
						if(value != null && value.length > maxSize){
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
					
					var tableTbodyTd = smr.render("tmpl-sectionContent-dataTable-tableTbody-td-emails",{
						"value":value,
						"improvement":improvement,
						"isRate":isRate,
						"haveTitle":haveTitle,
						"isMailingName":isMailingName,
						"id":id,
						"assetType": assetType,
						"mailingName": mailingName,
						"columnTitle":columnTitle,
						"isConversionSymbol":isConversionSymbol,
						"conversionCurrency":smr.conversionCurrency,
						"isLastRow":isLastRow,
						"textAlignLeft":textAlignLeft,
						"textAlignCenter":textAlignCenter,
						"isDraw":isDraw,
						"isMock":smr.isMock(),
						"useProgramId" : obj["useProgramId"],
						"programName" : obj["programName"],
					    "programId":obj["programId"]
					});
					$thisTr.append(tableTbodyTd);
				}
				$tbody.append($thisTr);
			}
		}
		var pObj = $.extend({},pageInfo);
		$tbody.append(smr.render("tmpl-dataTable-pagination",pObj));
	}
	
	
	function registerEmailViewEvent(dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName
		var $emailView = $e.find(".sectionTitle");
		
		$emailView.find(".isCurrency").html(smr.conversionCurrency);
		
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		$emailView.delegate("input[name='mailingname']","keyup.mailingname",function(){
			var $this = $(this);
			view._filterName = $this.val();
			showDataSection.call(view,dataAll);
		});
		
		$emailView.delegate("input[name='opened']","change",function(){
			var $this = $(this);
			var value = $this.attr("checked") ? true : false;
			view._filterOpened = value;
			showDataSection.call(view,dataAll);
		});

		$emailView.delegate("input[name='clicked'] ","change",function(){
			var $this = $(this);
			var value = $this.attr("checked") ? true : false;
			view._filterClicked = value;
			showDataSection.call(view,dataAll);
		});
		
		$emailView.delegate("input[name='converted']","change",function(){
			var $this = $(this);
			var value = $this.attr("checked") ? true : false;
			view._filterConverted = value;
			showDataSection.call(view,dataAll);
		});
		
		$emailView.delegate("select[name='dates']","change",function(){
			var $this = $(this);
			view._filterDates = $this.val();
			if(typeof view._dateValue != "undefined"){
				showDataSection.call(view,dataAll);
			}
		});
		
		$emailView.delegate("select[name='revenues']","change",function(){
			var $this = $(this);
			view._filterRevenues = $this.val();
			if(typeof view._revenueValue != "undefined"){
				showDataSection.call(view,dataAll);
			}
		});
		
		
		$emailView.delegate("input[name='revenueValue']","keyup.revenueValue",function(){
			var $this = $(this);
			if(!isValidRevenue(this)){
				$(this).val(_defaultEndDate);
				view._revenueValue = undefined;
				return false;
			}else if($this.val() == ""){
				view._revenueValue = undefined;
			}else{
				view._revenueValue = $this.val();
			}
			showDataSection.call(view,dataAll);
		});
		
		$emailView.delegate("input[name='dateValue']","focus",function(e){
			var inputValue = "";
			if(isValidDate(this)){
				inputValue = $(this).val();
				_defaultStartDate = inputValue;
			}
		});
		
		$emailView.find("input[name='dateValue']").blur(function(e){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			if(!$(".dateSelect").is(":visible")){
				if(!isValidDate(this)){
					$(this).val(_defaultEndDate);
					view._dateValue = undefined;
					alert("Please enter a right date format!");
				}
			}
		});

		$emailView.delegate("input[name='dateValue']","click",function(e){
			var $this = $(this);
			
			var posX = $(e.target).offset().left;
			var posY = $(e.target).offset().top + 20;
			var $date = $(this);
			var preValue = "   /  /    ";
//			preValue = _defaultEndDate;
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
//			$date.val("");
			var changed = false;
			$this.unbind("keyup."+$this.attr("name"));
			$this.bind("keyup."+$this.attr("name"),function(){
				if(!changed){
					changed = true;
				}
			});
			brite.display("dateSelect",null,{posX:posX,posY:posY}).done(function(component){
				component.onChange(function(date){
					view._dateValue =getDateValue(date);
					$date.val(view._dateValue);
					showDataSection.call(view,dataAll);
				});
				
				component.onClose(function(){
					if(!changed){
						view._dateValue = undefined;
						$date.val(preValue);
					}else{
						if(!isValidDate($date)){
							alert("Please enter right date format!");
							view._dateValue = undefined;
							$date.val(preValue);
						}
					}
					showDataSection.call(view,dataAll);
				});
			});
		});
	}
	
	function getDateValue(date,preValue){
		var value = "mm/dd/yyyy";
		if(date && smr.isValidDate(date)){
			value = smr.formatDate(date,"MM/dd/yyyy");
		}
		if(preValue && preValue !='mm/dd/yyyy' && value == 'mm/dd/yyyy'){
			value = preValue;
		}
		return value;
	}

	function isValidDate(obj){
		  var vtime = $(obj).val();
		  var arr = vtime.split("/");
		  var str = arr[2]+"-"+arr[0]+"-"+arr[1];
		  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		  if(r==null){
		  	 return false;
		  }
		  var d= new Date(r[1], r[3]-1, r[4]);
		  var flag = d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4];
		  if(!flag){
			 return false;
		  }
		  return true;
	}
	
	function isValidRevenue(obj){
		  var v= $(obj).val();
		  var reg=/^[0-9]*\.?[0-9]*$/;
		  var $message = $(".sectionTitle").find(".message");
		  if(!reg.test(v)){
			$message.show();
			$message.html("Invalid Value.");
		     return false;
		   }
		  $message.hide();
		  return true;
	}
	
	function getColumnByName(columnName,tableColumns){
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = "";
			if (typeof column.name != "undefined") {
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
	
	function doRenameTypeValue(type){
		if(type == 'program' || type == 'Program' || type == 'PROGRAM'){
			return  'LCM';
		}else if(type == 'transactional' || type == 'Transactional'|| type == 'TRANSACTIONAL'){
			return 'Transactional';
		}else if(type == 'batch' || type == 'Batch'|| type == 'BATCH'){
			return "Batch";
		}else{
			return type;
		}
	}
	
	
	function filterData(view,tableData){
		var curruntList = new Array();
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var objNameTmp = obj['mailing'];
				if(obj['mailing']){
					objNameTmp = (obj['mailing']).toLowerCase();
				}
				var filterFlag = true;
				var filterNameTmp = view._filterName;
				if(view._filterName){
					filterNameTmp = view._filterName.toLowerCase();
					filterFlag = false;
				}
				
				if(filterNameTmp && (objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1 )){
					filterFlag = true;
				}
				
				var filterOpendTmp = view._filterOpened;
				if(filterOpendTmp && !obj['open']){
					filterFlag = false;
				}
				
				var filterClickTmp = view._filterClicked;
				if(filterClickTmp && !obj['click']){
					filterFlag = false;
				}
				
				var filterConvertedTmp = view._filterConverted;
				if(filterConvertedTmp && !obj['conversions']){
					filterFlag = false;
				}
				
				var filterDatesTmp = view._filterDates;
				var filterDateValueTmp = view._dateValue;
				if(typeof filterDateValueTmp != "undefined"){
					var n =new Date(filterDateValueTmp);
					if(filterDatesTmp == 'after'){
						if(pasreEnDate(obj['date']) <= myGetDateText(n)){
							filterFlag = false;
						}
					}else if(filterDatesTmp == 'on'){
						if(pasreEnDate(obj['date']) != myGetDateText(n)){
							filterFlag = false;
						}
					}else{
						if(pasreEnDate(obj['date']) >= myGetDateText(n)){
							filterFlag = false;
						}
					}
				}
				
				var filterRevenuesTmp = view._filterRevenues;
				if(typeof view._revenueValue != "undefined"){
					var filterRevenueValueTmp = parseFloat(view._revenueValue);
					if(filterRevenuesTmp == 'D'){
						if(filterRevenueValueTmp >= parseFloat(obj['revenue'])){
							filterFlag = false;
						}
					}else if(filterRevenuesTmp == 'A'){
						if(filterRevenueValueTmp != parseFloat(obj['revenue'])){
							filterFlag = false;
						}
					}else{
						if(filterRevenueValueTmp <= parseFloat(obj['revenue'])){
							filterFlag = false;
						}
					}
				}
				
				if(!filterFlag){
					continue;
				}
				curruntList.push(tableData[i]);
			}
		}
			return curruntList;
	}
	
	//can sort by string and number;
	function sortByDefault(arr,columnName,order){
		smr.newSort(arr,columnName,order); 
	}
	
	//FIXME can sort by date,for now just support dd-MM-yyyy, dd-MM-yy, MM/dd/yyyy
	function sortByDate(arr,columnName,order){
		arr.sort(function(a,b){
			var seconds1,seconds2;
			if(a[columnName].indexOf("-") >=0 ){
				var dArr1 = a[columnName].split("-");
				var dArr2 = b[columnName].split("-");
				if(a[columnName].trim().length == 9 && b[columnName].trim().length == 9){
		        	seconds1 = Date.parse(dArr1[1]+" "+dArr1[0]+","+"20"+dArr1[2]);
		        	seconds2 = Date.parse(dArr2[1]+" "+dArr2[0]+","+"20"+dArr2[2]);
		        }else{
		        	seconds1 = Date.parse(dArr1[1]+" "+dArr1[0]+","+dArr1[2]);
					seconds2 = Date.parse(dArr2[1]+" "+dArr2[0]+","+dArr2[2]);
		        }
			}else{
				seconds1 = Date.parse(a[columnName]);
				seconds2 = Date.parse(b[columnName]);
			}
			//if order true , sort by asc
			if(order){
				return seconds1 > seconds2 ? 1 : -1;
			}
			return  seconds1 < seconds2 ? 1 : -1;
		});
	}
	
	
	function pasreEnDate(dateStr) {  
	    try {  
	        if (!dateStr && (dateStr.trim().length != 11 || dateStr.trim().length != 9)) {  
	            return;  
	        }  
	        var yy  = "";
	        if(dateStr.trim().length==11){
	        	yy = dateStr.substring(7, 11);  
	        }else if(dateStr.trim().length==9){
	        	yy = "20" + dateStr.substring(7, 9);  
	        }
	        var mm = dateStr.substring(3, 6);  
	        var dd = dateStr.substring(0, 2);  
	        mm = mm.toUpperCase();  
	        var em = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");  
	        switch (mm) {  
	          case em[0]:  
	            mm = 1;  
	            break;  
	          case em[1]:  
	            mm = 2;  
	            break;  
	          case em[2]:  
	            mm = 3;  
	            break;  
	          case em[3]:  
	            mm = 4;  
	            break;  
	          case em[4]:  
	            mm = 5;  
	            break;  
	          case em[5]:  
	            mm = 6;  
	            break;  
	          case em[6]:  
	            mm = 7;  
	            break;  
	          case em[7]:  
	            mm = 8;  
	            break;  
	          case em[8]:  
	            mm = 9;  
	            break;  
	          case em[9]:  
	            mm = 10;  
	            break;  
	          case em[10]:  
	            mm = 11;  
	            break;  
	          case em[11]:  
	            mm = 12;  
	            break;  
	        }  
	        var now = new Date();  
	        var year = now.getFullYear();  
	        if (yy.length == 2) {  
	            yy = parseInt(yy,10);   
	                var miny = year - (2000 + yy);  
	                var maxy = year - (1900 + yy);  
	                if (miny > 0 || maxy < 100) {  
	                    yy = 1900 + yy;  
	                } else {  
	                    yy = 2000 + yy;  
	                }  
	        }  
	        var nd = mm + "/" + dd + "/" + yy;  
	        var date2 = new Date(nd);  
	        return myGetDateText(date2);  
	    }  
	    catch (e) {  
	        return "";  
	    }  
	}  
	
	function myGetDateText(date1) {  
	    var dateStr = "";  
	    if (date1) {  
	        dateStr = date1.getFullYear();  
	        var month = date1.getMonth() + 1;  
	        var day = date1.getDate();  
	        if (month < 10) {  
	            dateStr += "-0" + month;  
	        } else {  
	            dateStr += "-" + month;  
	        }  
	        if (day < 10) {  
	            dateStr += "-0" + day;  
	        } else {  
	            dateStr += "-" + day;  
	        }  
	    }  
	    return dateStr;  
	}  
	
	
	function cleanView(view){
		view._filterName = undefined;
		view._filterOpened = undefined;
		view._filterClicked = undefined;
		view._filterConverted = undefined;
		view._revenueValue = undefined;
		view._dateValue = undefined;
	}
	// --------- /Component Private Methods --------- //
	
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionEmails",{
		emptyParent: true
	},function(){
		return new smr.SectionEmails();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
