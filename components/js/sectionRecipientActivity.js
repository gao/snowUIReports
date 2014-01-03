var smr = smr || {};

(function($){
	
	// --------- Component Interface Implementation ---------- //
	function SectionRecipientActivity(){};
	smr.SectionRecipientActivity = SectionRecipientActivity; 
	
	SectionRecipientActivity.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionRecipientActivity",{});
	};
		
	SectionRecipientActivity.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
	    
	    //remove the out border and change the content background
		$e.closest(".report-content").css("border","0px");
		$e.closest(".report-content").css("background","#F9F7F8");
	    
		view.reportType = data.reportType || smr.REPORT_TYPE.RECIPIENTACTIVITY;
		view.isNewRequest = data.isNewRequest || false;
		view.showView();
	};
	
	SectionRecipientActivity.prototype.events = {
		"click; .sectionTitle .collapsible": clickCollapsible
	};
	// --------- /Component Interface Implementation ---------- //
	
	// --------- events --------- //
	function clickCollapsible(event){
		var $this = $(event.currentTarget);
		$this.hide();
		if($this.hasClass("exp")){
			$this.closest(".sectionTitle").find(".col").show();
			$this.closest(".recipientPart").find(".sectionContent").slideUp(300,function(){ $(this).hide();});
		}else{
			$this.closest(".sectionTitle").find(".exp").show();
			$this.closest(".recipientPart").find(".sectionContent").slideDown(300,function(){ $(this).show();});
		}
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	SectionRecipientActivity.prototype.getAllData = function(){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();

		smr.getRecipientActivitySummary(view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items != null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionRecipientActivity.prototype.showView = function(){
		var view = this;
		var $e = view.$el;
		
		//clean first
		$e.bEmpty();
		html = smr.render("tmpl-sectionRecipientActivity",{});
		$e.append($(html));
		
		view.getAllData().done(function(dataAll){
			showSummary.call(view,dataAll);
			
			showSegmentSection.call(view,dataAll);
			
			showProgramSection.call(view,dataAll);
			
			showMessageSection.call(view,dataAll);
		});
		return true;
	}
	// --------- /Component Public API --------- //	
		
	
	// --------- Component Private Methods --------- //
	function showSummary(dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		var $statsSummary = $e.find(".statsSummary");
		var $title = $e.closest(".report").find(".reportHeader .reportHeader-reportName");
		var $subTitle = $e.find(".subTitle");
		if(typeof dataAll == "undefined"){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var summaryData = dataAll.summary;
			var stats = [];
			
			//show the title and subtitle
			$title.html(summaryData.name);
			$subTitle.html(summaryData.email);
			
			stats = [
				{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isRate:false},
				{name:"delivered",label:"Delivered",value:smr.checkNumber(summaryData.delivered),isRate:true},
				{name:"opens",label:"Opens",value:smr.checkNumber(summaryData.openRate),isRate:true},
				{name:"clicks",label:"Clicks",value:smr.checkNumber(summaryData.clickRate),isRate:true}
		  	];
		  	
		  	//only when conversionEnabled=true,should show Conversions, averageOrderValue and Revenue
			if(smr.conversionEnabled){
				stats.push({name:"conversions",label:"Conversions",value:smr.checkNumber(summaryData.conversions),isRate:false});
				stats.push({name:"revenue",label:"Revenue",value:smr.checkNumber(summaryData.revenue),isRate:false,isConversionSymbol:true});
			}
			stats.push({name:"share",label:"Share",value:smr.checkNumber(summaryData.share),isRate:false});
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:"table"});
		}
	}	
	
	function showSegmentSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionRecipientActivity-segmentSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.segmentData == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll;
			var dataList = dataAll.segmentData;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"segmention",label:"Segmentation",sortable:true});
			tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,sortable:true});
			tableColumns.push({name:"sentRate",label:"Sent",isRate:true,textAlignLeft:true,sortable:true});
			tableColumns.push({name:"openRate",label:"Open Rate",isRate:true,textAlignLeft:true,sortable:true});
			tableColumns.push({name:"clickRate",label:"Click Rate",isRate:true,textAlignLeft:true,sortable:true});
			if(smr.conversionEnabled){
				tableColumns.push({name:"conversionsRate",label:"Conversions",isRate:true,textAlignLeft:true,sortable:true});
				tableColumns.push({name:"revenue",label:"Revenue",isRate:true,textAlignLeft:true,sortable:true});
			}
				
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				if(smr.conversionEnabled){
					resultData = {
						"segmention":rowData.segmention,
						"segment" : rowData.segment,
						"sentRate" :rowData.sentRate,
						"openRate" : rowData.openRate,
						"clickRate" : rowData.clickRate,
						"conversionsRate" : rowData.conversionsRate,
						"revenue" : rowData.revenue
					};
				}else{
					resultData = {
						"segmention":rowData.segmention,
						"segment" : rowData.segment,
						"sentRate" :rowData.sentRate,
						"openRate" : rowData.openRate,
						"clickRate" : rowData.clickRate
					};
				}
					
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"segmentSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","segmentSection");

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
				$e.find(".sectionRecipientActivity-segmentSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"","segmentSection");
			});
		}
	}
	
	function showProgramSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionRecipientActivity-programSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.programData == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll;
			var dataList = dataAll.programData;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"launchDate",label:"Enter Date",sortable:true});
			tableColumns.push({name:"programName",label:"Program Name",textAlignLeft:true,sortable:true,maxLength:22,ellipses:"right"});
			tableColumns.push({name:"campaignName",label:"Campaign",textAlignLeft:true,sortable:true,maxLength:22,ellipses:"right"});
			tableColumns.push({name:"status",label:"Current Status",textAlignLeft:true,sortable:true,maxLength:22,ellipses:"right"});
			tableColumns.push({name:"open",label:"Opens",textAlignLeft:true,sortable:true});
			tableColumns.push({name:"click",label:"Clicks",textAlignLeft:true,sortable:true});
			if(smr.conversionEnabled){
				tableColumns.push({name:"conversions",label:"Conversions",textAlignLeft:true,sortable:true});
				tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,textAlignLeft:true,sortable:true});
			}
			
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				if(smr.conversionEnabled){
					resultData = {
						"launchDate":rowData.date,
						"programName" : rowData.programName,
						"campaignName" :rowData.campaignName,
						"status" : rowData.status,
						"open" : smr.checkNumber(rowData.open),
						"click" : smr.checkNumber(rowData.click),
						"conversions" : smr.checkNumber(rowData.conversions),
						"revenue" : smr.checkNumber(rowData.revenue)
					};
				}else{
					resultData = {
						"launchDate":rowData.date,
						"programName" : rowData.programName,
						"campaignName" :rowData.campaignName,
						"status" : rowData.status,
						"open" : smr.checkNumber(rowData.open),
						"click" : smr.checkNumber(rowData.click)
					};
				}
					
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"programSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","programSection");
			
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
				$e.find(".sectionRecipientActivity-programSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"","programSection");
			});
		}
	}
	
	function showMessageSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionRecipientActivity-messageSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.messageData == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll;
			var dataList = dataAll.messageData;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"type",label:"Type",textAlignLeft:true,sortable:true,maxLength:15,ellipses:"right"});
			tableColumns.push({name:"launchDate",label:"Date",textAlignLeft:true,sortable:true});
			tableColumns.push({name:"mailingName",label:"Mailing",textAlignLeft:true,sortable:true,maxLength:30,ellipses:"right"});
			tableColumns.push({name:"subject",label:"Subject Line",textAlignLeft:true,sortable:true,maxLength:30,ellipses:"right"});
			tableColumns.push({name:"open",label:"Opened",isCheckbox:true,textAlignLeft:true});
			tableColumns.push({name:"click",label:"Clicked",isCheckbox:true,textAlignLeft:true});
			if(smr.conversionEnabled){
				tableColumns.push({name:"converted",label:"Converted",isCheckbox:true,textAlignLeft:true});
				tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,textAlignLeft:true,sortable:true});
			}
			
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				if(smr.conversionEnabled){
					resultData = {
						"type":rowData.type,
						"launchDate" : rowData.date,
						"mailingName" :rowData.mailingName,
						"subject" : rowData.subject,
						"open" : rowData.open,
						"click" : rowData.click,
						"converted" : rowData.converted,
						"revenue" : smr.checkNumber(rowData.revenue)
					};
				}else{
					resultData = {
						"type":rowData.type,
						"launchDate" : rowData.date,
						"mailingName" :rowData.mailingName,
						"subject" : rowData.subject,
						"open" : rowData.open
					};
				}
				
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"messageSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","messageSection");
			
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
				$e.find(".sectionRecipientActivity-messageSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"","messageSection");
			});
			
		}
	}
	
	function renderTableThead(tableColumns,sectionType){
		var view = this;
		var $e = view.$el;
		var $table;
		if(sectionType == "segmentSection"){
			$table = $e.find(".sectionRecipientActivity-segmentSection .sectionContent .dataTable");
		}else if(sectionType == "programSection"){
			$table = $e.find(".sectionRecipientActivity-programSection .sectionContent .dataTable");
		}else if(sectionType == "messageSection"){
			$table = $e.find(".sectionRecipientActivity-messageSection .sectionContent .dataTable");
		}
		
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = column.label;
			var columnName = column.name;
			var sortable = false;
			
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
		
			var tableThead = smr.render("tmpl-sectionContent-dataTable-tableThead-recipient",{
				"label":columnLable,
				"column":columnName,
				"sortable":sortable
			});
			$table.find("thead tr").append(tableThead);
		}
	}
	
	function renderTableTbody(tableColumns,tableData,type,sectionType){
		var view = this;
		var $e = view.$el;
		var $tbody;
		if(sectionType == "segmentSection"){
			$tbody = $e.find(".sectionRecipientActivity-segmentSection .sectionContent .dataTable tbody");
		}else if(sectionType == "programSection"){
			$tbody = $e.find(".sectionRecipientActivity-programSection .sectionContent .dataTable tbody");
		}else if(sectionType == "messageSection"){
			$tbody = $e.find(".sectionRecipientActivity-messageSection .sectionContent .dataTable tbody");
		}
		
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-sectionContent-dataTable-tableTbody-recipient",{});
				var $thisTr = $(tableTbody);
				
				var isLastRow = false;
				if(i == (tableData.length -1)){
					isLastRow = true;
				}
					
				for (var k = 0; k < tableColumns.length; k++) {
					var column = tableColumns[k];
					var columnName = "";
					var columnLabel = "";
					var isConversionSymbol = false;
					var isRate = false;
					var value = "";
					var first = "";
					var haveTitle = false;
					var columnTitle  = "";
					var textAlignLeft = false;
					var isCheckbox = false;
					var improvement = "unchange";
					
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
					
					if (typeof column.textAlignLeft != "undefined") {
						textAlignLeft = column.textAlignLeft;
					}
					
					if (typeof column.isCheckbox != "undefined") {
						isCheckbox = column.isCheckbox;
					}
					
					if(k == 0){
						first = "first";
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
					if(isRate){
						value = smr.formatToFixed(value);
					}
					
					if(columnName != "segmention" && columnName != "segment" && columnName != "launchDate"){
						if(sectionType == "segmentSection"){
							if(value > 0){
								improvement = "improve";
							}else if(value < 0){
								improvement = "reduce";
							}
						}
						value = smr.formatNumber(value);
					}
					
					if(isConversionSymbol && value == 0){
						isConversionSymbol = false;
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
					
					var tableTbodyTd = smr.render("tmpl-sectionContent-dataTable-tableTbody-td-recipient",{
						"first":first,
						"value":value,
						"improvement":improvement,
						"isRate":isRate,
						"haveTitle":haveTitle,
						"columnTitle":columnTitle,
						"isConversionSymbol":isConversionSymbol,
						"conversionCurrency":smr.conversionCurrency,
						"isLastRow":isLastRow,
						"textAlignLeft":textAlignLeft,
						"isCheckbox":isCheckbox
					});
					$thisTr.append(tableTbodyTd);
				}
				$tbody.append($thisTr);
			}
		}
	}
	
	
	//can sort by string and number;
	function sortByDefault(arr,columnName,order){
		smr.newSort(arr,columnName,order); 
	}
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionRecipientActivity",{
		emptyParent: true
	},function(){
		return new smr.SectionRecipientActivity();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
