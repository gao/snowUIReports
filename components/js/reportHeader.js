var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _section = null;
	// get the config from batch.html _sectionConfigs
	var _sectionConfig = null;
	// --------- /Component Private Properties --------- //

	// --------- Component Interface Implementation ---------- //
	function ReportHeader(){};
	smr.ReportHeader = ReportHeader; 
	
	ReportHeader.prototype.create = function(data,config){
		var type = data.type;
		var reportTitle = "";
		if(type == smr.REPORT_TYPE.DEVICEUSAGE){
			reportTitle = "Device Usage Report";
		}else{
			if(type == smr.REPORT_TYPE.TRANSACTIONAL){
				reportTitle = "Transactional Mailing Report";
			}else if(type == smr.REPORT_TYPE.BATCH){
				reportTitle = "Batch Mailing Report";
			}else if(type == smr.REPORT_TYPE.PROGRAM){
				reportTitle = "Lifecycle Programs Report";
			}else if(type == "campaignOverview"){
				reportTitle = "Campaign Overview";
			}else if(type == "deliverability"){
				reportTitle = "Deliverability Report";
			}else if(type == smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
				reportTitle = "Domains with the Most Failures";
			}else if(type == smr.REPORT_TYPE.DOMAINDRILLDOWN){
				reportTitle = "Domain Drilldown Report";
			}else if(type == smr.REPORT_TYPE.AUDIENCE){
				reportTitle = "Audience Report";
			}else if(type == smr.REPORT_TYPE.MAILINGDETAIL){
				reportTitle = "Mailing Detail Report";
			}else if(type == smr.REPORT_TYPE.ABTEST){
				reportTitle = "A/B Test Report";
			}else if(type == smr.REPORT_TYPE.USERINSIGHT){
				reportTitle = "User Insight";
			}
			reportTitle = reportTitle + ":";
		}

		var isNotThese = false;
		if(type != "campaignOverview" && type != smr.REPORT_TYPE.DELIVERABILITYDOMAINS && type != smr.REPORT_TYPE.MAILINGDETAIL && type != smr.REPORT_TYPE.ABTEST){
			isNotThese = true;
		}
		
		var isNotDUAndRA = true;
		if(type == smr.REPORT_TYPE.DEVICEUSAGE){
			isNotDUAndRA = false;
		}
		
		var showEditIcon = "false";
		if(type == smr.REPORT_TYPE.ABTEST || type == smr.REPORT_TYPE.MAILINGDETAIL || type == smr.REPORT_TYPE.USERINSIGHT){
			showEditIcon = "true";
		}

		return smr.render("tmpl-reportHeader",{"type":data.type,domainName:data.domainName,reportTitle:reportTitle,isNotThese:isNotThese,
			isNotDUAndRA:isNotDUAndRA,conversionEnabled:smr.conversionEnabled,showEditIcon:showEditIcon});
	}
		
	ReportHeader.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType = data.type;
		var $report = $e.closest(".report");
		var breakDownBy = data.breakDownBy;
		view.data = data;
		view.reportType = reportType;
		
		//bind a event for mailings count
		showTypeAndDate.call(view);
				
		//show combobox
		var $reportHeaderBreakdownCombobox = $e.find(".reportHeader-breakdownCombobox");
		var list=[
			{name:"Day",value:"day"},
			{name:"Week",value:"week"},
			{name:"Month",value:"month"},
			{name:"Quarter",value:"quarter"},
			{name:"Year",value:"year"},
			{name:"Mailing",value:"mailing"},
			{name:"Campaign",value:"campaign"},
			{name:"Domain",value:"domain"},
			{name:"Failure Detail Code",value:"failureDetailCode",isFailureDetailCode:true}
		];
		
		//only batch have target
		if(reportType == smr.REPORT_TYPE.BATCH){
			list.push({name:"Target",value:"target"});
		}
		var defaultValue = breakDownBy||"mailing";
			
		//only lifecycle have program
		if(reportType == smr.REPORT_TYPE.PROGRAM){
			list.push({name:"Program",value:"program"});
			list.push({value:"keyword",name:"Keyword",isSMSKeyword:true});
			list.push({value:"eventType",name:"Event Type",isEventType:true});
			defaultValue = breakDownBy|| "program";		
			defaultValue = defaultValue=="keyword" ? "program" : defaultValue;
		}

		if(reportType == smr.REPORT_TYPE.PROGRAM || reportType == smr.REPORT_TYPE.BATCH || reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			 list.push({name:"Device",value:"device",isHide:true});
			 list.push({name:"Mail Client",value:"client",isHide:true});
			 list.push({name:"Web Browser",value:"browser",isHide:true});
		 }
		
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
			list.push({name:"IP",value:"ip"});
			list.push({name:"Mailing Server Group",value:"vsg"});
			
			defaultValue = breakDownBy|| "domain";		
		}
		
		if(reportType == smr.REPORT_TYPE.DOMAINDRILLDOWN){
			list = [{name:"Failure Detail Code",value:"failureCode"},
			        {name:"Failure Category",value:"failureCategory"},
			        {name:"IP",value:"ip"},
			        {name:"Mailing Server Group",value:"vsg"} ];
			defaultValue = "failureCode";		
		}
		
		if(reportType == smr.REPORT_TYPE.AUDIENCE){
			list.push({name:"Engagement",value:"engagementBucket"});
			list.push({name:"Target",value:"target"});
			defaultValue = "domain";		
		}
		
		var set = smr.getSetAndType(reportType,"main").set;
		var hasSubOrgs = smr.hasSubOrgs[reportType] || false;
		var includeSubOrg = typeof set.attr("includeSubOrg")=="undefined" ? false : set.attr("includeSubOrg");
		if(hasSubOrgs && includeSubOrg && reportType != smr.REPORT_TYPE.AUDIENCE){
			list.push({name:"Organization",value:"org"});
			list.push({name:"Organization (Rollup)",value:"orgRollup"});
		}
		
		brite.display("combobox",$reportHeaderBreakdownCombobox,{list:list,defaultValue:defaultValue});
		
		// show switch button
		var $reportHeaderRateSwitch = $e.find(".reportHeader-rateSwitch");
		$reportHeaderRateSwitch.find("input[type='checkbox']").attr("checked",true);
		
		var $reportHeaderUniqueStatsSwitch = $e.find(".reportHeader-uniqueStatsSwitch");
		$reportHeaderUniqueStatsSwitch.find("input[type='checkbox']").attr("checked",true);
		
		// init hide all menus
		hideAllMenus.call(view);
		
		$report.unbind("click.reportHeaderDateSelectorClick").bind("click.reportHeaderDateSelectorClick",function(event){
			var $target = $(event.target);
			var $date_arrow = $target.closest(".date-arrow");
			var $reportHeaderdateSelector = $target.closest(".reportHeader-dateSelector");
			if($date_arrow.size()==0 && $reportHeaderdateSelector.size()==0 && !$target.hasClass("calendar-date") && !$target.hasClass("close"))$e.find(".reportHeader-dateSelector").hide();
		});
		
		//keep the search re id for user insight
		if(reportType == smr.REPORT_TYPE.USERINSIGHT){
			var set = smr.getSetAndType(view.reportType,"main").set;
			var curSearchVal = set.attr("UserInsightSearchRecipientId") || "";
			if(curSearchVal != ""){
				$report.find(".reportHeader-findUser .find-user-input").val(curSearchVal);
			}
		}
	}
	// --------- /Component Interface Implementation ---------- //
	
	ReportHeader.prototype.events = {
		
		"reportHeaderMailingSelectorChange" : function(){
			var view = this;
			showTypeAndDate.call(view);
		},
		
		"click; .reportHeader-top .edit" : clickReportHeaderTopEdit,
		
		"mouseover; .reportHeader-mailingSelector" : mouseoverReportHeaderMailingSelector,
		
		"click; .toolbar-item-content .btnPrint" : function(event){
			var view = this;
			var reportType = view.reportType;
			var $btnPrint = $(event.currentTarget);
			if($btnPrint.hasClass("disabled"))return;
			var $reportHeader_toolItems_right = $(".reportHeader-toolItems-right");
			if($("body").find(".drillDownDiv").size()==0){
				$btnPrint.addClass("sel");
				$btnPrint.find(".ico").addClass("sel");
				brite.display("drillDown",null,{$target:$btnPrint,"reportType":reportType},{emptyParent:false});
			}else{
				$btnPrint.removeClass("sel");
				$btnPrint.find(".ico").removeClass("sel");
				$("body").find(".drillDownDiv").remove();
			}
		},
		
		"reportHeaderSectionChange" : reportHeaderSectionChangeMethod,
		
		"click; .reportHeader-viewSelector .reportsHeader-viewButton:not(.sel)" : reportsHeaderViewButtonClick,
		
		"click; .reportHeader-breakdown .combobox .item" : function(event){
			var $this = $(event.currentTarget);
			$this.closest(".report").trigger("REPORTHEADER_BREAKDOWN_CHANGE");
		},
		
		"click; .reportHeader-subSection .combobox .item" : function(event){
			var $this = $(event.currentTarget);
			$this.closest(".report").trigger("REPORTHEADER_SUBSECTION_CHANGE");
		},
		
		"change; .reportHeader-rateSwitch input[type='checkbox']" : function(event){
			var $e = this.$el;
			var $this = $(event.currentTarget);
			var value = $this.attr("checked") ? true : false;
			$e.closest(".report").trigger("REPORTHEADER_VIEWRATE_CHANGE",{value:value});
		},
		
		"change; .reportHeader-showCountSwitch input[type='checkbox']" : function(event){
			var $e = this.$el;
			var $this = $(event.currentTarget);
			var value = $this.attr("checked") ? true : false;
			$e.closest(".report").trigger("REPORTHEADER_SHOWCOUNT_CHANGE",{value:value});
		},
		
		"change; .reportHeader-uniqueStatsSwitch input[type='checkbox']" : function(event){
			var $e = this.$el;
			var $this = $(event.currentTarget);
			var value = $this.attr("checked") ? true : false;
			$e.closest(".report").trigger("REPORTHEADER_UNIQUESTATS_CHANGE",{value:value});
		},
		
		"change; .reportHeader-deviceSwitch input[type='checkbox']" : function(event){
			var $e = this.$el;
			var $this = $(event.currentTarget);
			var value = $this.attr("checked") ? true : false;
			$e.closest(".report").trigger("REPORTHEADER_DEVICE_CHANGE",{value:value});
		},
		
		"change; .reportHeader-dynamicContentSwitch input[type='checkbox']" : function(event){
			var $e = this.$el;
			var $this = $(event.currentTarget);
			var value = $this.attr("checked") ? true : false;
			$e.closest(".report").trigger("REPORTHEADER_DYNAMICCONTENT_CHANGE",{value:value});
		},
		
		"blur; .reportHeader-period input[name='startDate'], .reportHeader-period input[name='endDate']" : function(event){
			var $this = $(event.currentTarget);
			var $e = this.$el;
			if($e.find(".dateSelect").size()==0)checkDateValue.call($this,$this.closest(".reportHeader-period"));
		},
		
		//pivot option click to show "btnOptions" event
		"click;  .toolbar-item-content .btnOptions":function(event){
			var view = this;
			var $target = $(event.currentTarget);
			brite.display("overviewOption",$target.parent(),{reportType:view.reportType},{emptyParent:false}).done(function(component){
				component.onClose(function(){
					view.$el.closest(".report").trigger("REPORTHEADER_OPTIONS_CHANGE",{});
				});
			});
		},
		
		"click; .reportHeader-period input[name='startDate'], .reportHeader-period input[name='endDate']" : function(event){
			var $this = $(event.currentTarget);
			var $reportHeaderDateSelect = $this.closest(".reportHeader-dateSelector").find(".reportHeaderDateSelect");
			var preValue = $this.val();			
			$reportHeaderDateSelect.empty();
			
			$this.closest(".reportHeader-period").find(".message").hide();
			
			var changed = false;
			$this.unbind("keyup."+$this.attr("name"));
			$this.bind("keyup."+$this.attr("name"),function(){
				if(!changed){
					changed = true;
				}
			});
			
			brite.display("dateSelect",$reportHeaderDateSelect,{posX:0,posY:0,useParent:true}).done(function(component){
				component.onChange(function(date){
					$this.val(getDateValue(date));
					checkDateValue.call($this,$this.closest(".reportHeader-period"));
				});				
				component.onClose(function(){
					if(!changed){
						$this.val(preValue);
					}else{
						checkDateValue.call($this,$this.closest(".reportHeader-period"));
					}
				});
			});
		},
	
		"click; .btnExport" : function(event){
			var view = this;
			var $this = $(event.currentTarget);
			if($this.hasClass("disabled"))return;
			$this.addClass("sel");
			$this.find(".ico").addClass("sel");
			brite.display("exportPicker",null,{reportType:view.reportType,$target:$this});
		},
		
		"click; .export" : clickExportMethod,
		
		"click; .print" : clickPrintMethod,
		
		"click; .reportHeader-period .date-arrow" : clickDateArrow,
		
		"click; .reportHeader-period .dateSelectorDone" : clickDateSelectorDone,
		
		"change; .reportHeader-period select[name='dateTypeSelect']" :function(event){
			var $this = $(event.currentTarget);
			var value = $this.val();
			var $inputor = $this.closest(".reportHeader-period").find(".reportHeader-dateSelector .inputor");
			var $reportHeaderDateSelect = $this.closest(".reportHeader-dateSelector").find(".reportHeaderDateSelect");
			if(value=="inCustomDateRange"){
				$inputor.show();
				$reportHeaderDateSelect.show();
			}else{
				$inputor.hide();
				$reportHeaderDateSelect.hide();
			}
		},
		
		"change; .reportHeader-clientSwitch input[type='checkbox']" : function(event){
			var $e = this.$el;
			var $this = $(event.currentTarget);
			var value = $this.attr("checked") ? true : false;
			$e.closest(".report").trigger("REPORTHEADER_CLIENT_CHANGE",{value:value});
		},
		
		"click; .reportHeader-findUser .user-next.active" : function(event){
			var view = this;
			var $e = view.$el;
			var $report = $e.closest(".report");
			var $this = $(event.currentTarget);
			var curNum = $this.closest(".user-page").find(".current-num").val();
			var set = smr.getSetAndType(view.reportType).set;
			set.attr("UserInsightShowIndex",parseInt(curNum)+1);
			smr.showReport($report.parent(),smr.REPORT_TYPE.USERINSIGHT);
		},
		
		"click; .reportHeader-findUser .user-prev.active" : function(event){
			var view = this;
			var $e = view.$el;
			var $report = $e.closest(".report");
			var $this = $(event.currentTarget);
			var curNum = $this.closest(".user-page").find(".current-num").val();
			var set = smr.getSetAndType(view.reportType).set;
			set.attr("UserInsightShowIndex",parseInt(curNum)-1);
			smr.showReport($report.parent(),smr.REPORT_TYPE.USERINSIGHT);
		},
		
		"click; .reportHeader-findUser .ico-find" : clickReportHeaderFindUser,
		
		"input; .reportHeader-findUser .find-user-input": function(event){
			var view = this;
			var $e = view.$el;
			var $report = $e.closest(".report");
			var $this = $(event.currentTarget);
			var val = $this.val();
			if(val == ""){
				var set = smr.getSetAndType(view.reportType).set;
				set.attr("UserInsightSearchRecipientId","");
			}
		}
		
	}
	
	ReportHeader.prototype.docEvents = {
		// bind the Enter key  for find user
		"keyup" : function(event){
			if(event.which == 13){
				clickReportHeaderFindUser.call(this);
			}
		}
	}
	
	// --------- events --------- //
	function clickReportHeaderTopEdit(){
		var view = this;
		var $e = view.$el;
		var data = view.data;
		var reportType = view.reportType;
		var $report = $e.closest(".report");
		var breakDownBy = data.breakDownBy;
			
		if($("body").children(".dataList").size()>0){
			$("body").children(".dataList").bComponent().close();
		}
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY || reportType == smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
			// we need to show the IP and VSG SelectionPicker
			brite.display("ipandVSGPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					smr.showReport($report.parent(),reportType);
				});
			});
		}else if(reportType==smr.REPORT_TYPE.AUDIENCE){
			brite.display("targetPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					smr.showReport($report.parent(),reportType,null,null,null,null,"audience");
				});
			});
		}else if(reportType == smr.REPORT_TYPE.MAILINGDETAIL){
			brite.display("mailingDetailPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					var itemList = smr.getSetAndType(reportType).set.list();
					//to make sure we have select the Mailing
					if(itemList && itemList.length > 0){
						var mailingIds = itemList[0].id;
						smr.showReport($report.parent(),reportType,null,null,null,[mailingIds],"mailingDetail");
						smr.allDateRangeShow = false;
					}
				});
			});
		}else if(reportType == smr.REPORT_TYPE.ABTEST){
			brite.display("abTestPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					var itemList = smr.getSetAndType(reportType).set.list();
					if(itemList && itemList.length > 0){
						var mailingIds = itemList[0].id;
						smr.showReport($report.parent(),reportType,"sectionABTest");
					}
				});
			});
		}else if(reportType == smr.REPORT_TYPE.USERINSIGHT){
			brite.display("userInsightPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					smr.getSetAndType(reportType).set.attr("UserInsightShowIndex",1);
					smr.showReport($report.parent(),smr.REPORT_TYPE.USERINSIGHT);
				});
			});
		}else{
			// we need to show the mailingPicker relative to this report (could be mulitple)
			// NOTE: now, we need to show the dialog as body, because of the shadow layer below it (which is added to the body)
			brite.display("mailingPicker",$("body"),{type:data.type,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					smr.showReport($report.parent(),reportType);
				});
			});
		}
	}
	
	function mouseoverReportHeaderMailingSelector(event){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		if(view.reportType == smr.REPORT_TYPE.AUDIENCE || view.reportType == smr.REPORT_TYPE.MAILINGDETAIL || view.reportType == smr.REPORT_TYPE.ABTEST || view.reportType == smr.REPORT_TYPE.USERINSIGHT){
			return;
		} 
		var $reportHeaderMailingSelector = $(event.currentTarget);
		var setAndType = smr.getSetAndType(reportType);
		var includeSubOrg = setAndType.set.attr("includeSubOrg");
		var list = setAndType.set.list();
		var tempList = [];
		if(setAndType.type=="Campaign" && includeSubOrg){
			var tempName = {};
			for(var i=0;i<list.length;i++){
				if(tempName[list[i].name]) continue;
				tempList.push(list[i]);
				tempName[list[i].name] = true;
			}
		}else if(setAndType.type=="Tag"){
			$.each(list,function(i,temp){
				tempList.push({id:temp.id,name:temp.pname + ": "+temp.name});
			});
		}else{
			tempList = list;	
		}
		brite.display("mailingSelector",$("body"),{
				list:tempList,
				$target:$reportHeaderMailingSelector,
				text:$reportHeaderMailingSelector.text()
			},{emptyParent:false});
	}
	
	function reportHeaderSectionChangeMethod(event,extra){
		var view = this;
		var $e = view.$el;
		var data = view.data;
		//show subSection combobox
		var $reportHeaderSubSectionCombobox = $e.find(".reportHeader-subSectionCombobox");
		var list = [];
		var defaultValue = "";
		var section = extra.section;
		if(section == "sectionLinks"){
			defaultValue = "clicks";
			if(smr.conversionEnabled){
				list.push({name:"Click",value:"clicks"});
				list.push({name:"Conversions",value:"conversions"});
				brite.display("combobox",$reportHeaderSubSectionCombobox,{list:list,defaultValue:defaultValue});
			}else{
				$e.closest(".report").find(".reportHeader-subSection").hide();
			}
		}else if(section == "sectionSharing"){
			defaultValue = "shareToSocial";
			list = [
				{name:"Share to Social",value:"shareToSocial"},
				{name:"Share Offers",value:"shareOffers"},
				{name:"Forward to Friend",value:"ftaf"}
			];
			brite.display("combobox",$reportHeaderSubSectionCombobox,{list:list,defaultValue:defaultValue});
		}else if(section == "sectionSMS"){
			defaultValue = "smsSent";
			list = [
				{name:"Sent",value:"smsSent"},
				{name:"Received",value:"smsReceived"}
			];
			brite.display("combobox",$reportHeaderSubSectionCombobox,{list:list,defaultValue:defaultValue});
		}	
	}
	
	function reportsHeaderViewButtonClick(event){
		var view = this;
		var $e = view.$el;
		var $report = $e.closest(".report");

		var $this = $(event.currentTarget);
		var viewName = $this.attr("data-view");
		//trigger the reportHeader-view-change event
		// the property complete to test if the show view success
		if(!$this.hasClass("viewButton-disabled")){
			var extra  = {complete:false,viewName:viewName};
			$this.closest(".report").trigger("REPORTHEADER_VIEW_CHANGE",extra);
			if(extra.complete){
				view.setView(viewName,_section,_sectionConfig);
			}
		}
			
		//overview the reportHeader font style is different
		if(viewName == "summary" && _section != "sectionComparison" && _section != "sectionTrends" && _section != "sectionDeliverabilityDomains"){
			if(_section == "sectionMailingDetail"){
				$report.find(".report-header .reportHeader .reportHeader-reportName").css("font-size","10.25pt");
				$report.find(".report-header .reportHeader .reportHeader-mailingSelector").css("font-size","10.25pt");
			}else{
				$report.find(".report-header .reportHeader .reportHeader-reportName").css("font-size","11pt");
				$report.find(".report-header .reportHeader .reportHeader-mailingSelector").css("font-size","11pt");
			}
			var $reportHeaderTop = $report.find(".report-header .reportHeader .reportHeader-top");
			$reportHeaderTop.css("margin-top","4px");
			if(smr.isMock()){
				$reportHeaderTop.css("margin-bottom","10px");
			}else{
				$reportHeaderTop.css("margin-bottom","8px");
			}
		}else{
			$report.find(".report-header .reportHeader .reportHeader-reportName").css("font-size","11.5pt");
			$report.find(".report-header .reportHeader .reportHeader-mailingSelector").css("font-size","11.5pt");
			$report.find(".report-header .reportHeader .edit").css("margin-top","0px");
		}
		var $reportHeaderTop = $report.find(".report-header .reportHeader .reportHeader-top");
		$reportHeaderTop.css("margin-top","4px");
		if(smr.isMock()){
			$reportHeaderTop.css("margin-bottom","4px");
		}else{
				$reportHeaderTop.css("margin-bottom","3px");
		}	
	}
	
	function clickExportMethod(){
		var view = this;
		if(view.reportType == smr.REPORT_TYPE.MAILINGDETAIL){
			var url = smr.reportPathPrefix + "mailingdetail/getMailingDetailReportAsExcel.do?";
			var setType = smr.getSetAndType(smr.REPORT_TYPE.MAILINGDETAIL);
			var dateRange = setType.set.period().getDateRange(); 
			var startDate = getDateValue(dateRange.startDate);
			var endDate = getDateValue(dateRange.endDate);
			var set = setType.set;
			var itemList = set.list();
			var mailingId  = itemList[0].id;
			url += "mailingId="+mailingId;
			url += "&startDate="+startDate;
			url += "&endDate="+endDate;
			window.open(url,"_self");
		}
	}
	
	function clickPrintMethod(event){
		var $this = $(event.currentTarget);
		if($this.hasClass("disabled"))return;
		var view = this;
		var $e = view.$el;
		var setType = smr.getSetAndType(smr.REPORT_TYPE.MAILINGDETAIL);
		var dateRange = setType.set.period().getDateRange(); 
		var startDate = getDateValue(dateRange.startDate);
		var endDate = getDateValue(dateRange.endDate);
		
		var set = setType.set;
		var itemList = set.list();
		var mailingId  = itemList[0].id;
		var mailingName  = itemList[0].name;
		var mailingType  = itemList[0].mailingType;
		var linkType = $e.closest(".report").find(".sectionMailingDetail .sectionMailingDetail-linkSection .sectionTitle .linkTypeSelect input[name='linkType']:checked").val();
		var targetType = $e.closest(".report").find(".sectionMailingDetail .sectionMailingDetail-targetSection .sectionTitle .targetTypeSelect input[name='targetType']:checked").val();
		if(smr.isMock()){
			window.open("/smr/mailingPrint.html?mailingId="+mailingId+"&mailingName="+mailingName+"&mailingType="+mailingType
						+"&startDate="+startDate+"&endDate="+endDate+"&linkType="+linkType+"&targetType="+targetType+"&allDateRangeShow="+smr.allDateRangeShow);
		}else{
			window.open("/sm/report/mailingdetailreport.do?mailingId="+mailingId+"&mailingName="+mailingName+"&mailingType="+mailingType
					    +"&startDate="+startDate+"&endDate="+endDate+"&linkType="+linkType+"&targetType="+targetType+"&allDateRangeShow="+smr.allDateRangeShow+"&print=true");
		}
	}
	
	function clickDateArrow(event){
		var view = this;
		var $this = $(event.currentTarget);
		if(view.reportType == smr.REPORT_TYPE.MAILINGDETAIL || view.reportType == smr.REPORT_TYPE.DEVICEUSAGE || view.reportType == smr.REPORT_TYPE.USERINSIGHT){
			var isUsi = view.$el.hasClass("sectionUserInsightOverview-header");
			var $reportHeader_dateSelector = $this.closest(".reportHeader-period").find(".reportHeader-dateSelector");
			if(!$reportHeader_dateSelector.is(":visible")){
				if(!isUsi){
					$this.addClass("date-arrow-on");
					$this.find("h3").show();
					$this.find("b").removeClass("arrowdown").addClass("arrowup");
				}
				var setType = smr.getSetAndType(view.reportType);
				if(view.reportType == smr.REPORT_TYPE.MAILINGDETAIL){
					if(smr.allDateRangeShow){
						$reportHeader_dateSelector.find("input[name='startDate']").val("");
						$reportHeader_dateSelector.find("input[name='endDate']").val("");
					}else{
						var dateRange = setType.set.period().getDateRange(); 
						$reportHeader_dateSelector.find("input[name='startDate']").val(getDateValue(dateRange.startDate));
						$reportHeader_dateSelector.find("input[name='endDate']").val(getDateValue(dateRange.endDate));
					}
				}else{
					var period = setType.set.period();
					var dateRange = period.getDateRange(); 
					var $inputor = $reportHeader_dateSelector.find(".inputor");
					var $reportHeaderDateSelect = $reportHeader_dateSelector.find(".reportHeaderDateSelect");
					if(period.dateType=="inCustomDateRange"){
						$inputor.show();
					}else{
						$inputor.hide();
						$reportHeaderDateSelect.hide().empty();
					}

					var reportType = view.reportType;
					if(reportType != smr.REPORT_TYPE.USERINSIGHT){
						$reportHeader_dateSelector.find("select[name='dateTypeSelect']").val(period.dateType);
					}
					$reportHeader_dateSelector.find("input[name='startDate']").val(getDateValue(dateRange.startDate));
					$reportHeader_dateSelector.find("input[name='endDate']").val(getDateValue(dateRange.endDate));
				}
					
				$reportHeader_dateSelector.show();
			}else{
				$this.removeClass("date-arrow-on");
				$this.find("h3").hide();
				$this.find("b").removeClass("arrowup").addClass("arrowdown");				
				$reportHeader_dateSelector.hide();
			}
		}
	}
	
	function clickDateSelectorDone(event){
		var view = this;
		var $e = view.$el;
		var $this = $(event.currentTarget);
		if($this.attr("disabled")) return;
		var $report = $e.closest(".report");
		var $dateInputs = $this.closest(".dateInputs");
		var $startDate = $dateInputs.find("input[name='startDate']");
		var $endDate = $dateInputs.find("input[name='endDate']");
		var $selector = $dateInputs.find("select[name='dateTypeSelect']");
		
		var period;
		if($selector.size()>0 && $selector.val()!="inCustomDateRange"){
			period = smr.buildPeriod($selector.val());
		}else{
			if(view.reportType == smr.REPORT_TYPE.MAILINGDETAIL){
				var sv = checkDateValue.call($startDate,$startDate.closest(".reportHeader-period"));
				var ev = checkDateValue.call($endDate,$endDate.closest(".reportHeader-period"));
				var $message = $this.closest(".reportHeader-period").find(".message");
				if(sv && ev){$message.hide();}else{$message.show(); return;}
			}
			var startDate = new Date(Date.parse($startDate.val()));
			var endDate = new Date(Date.parse($endDate.val()));
			period = smr.buildPeriod("inCustomDateRange",startDate,endDate);
		}
		var set = smr.getSetAndType(view.reportType).set;
		set.period(period);
		$this.closest(".reportHeader-period").find(".reportHeader-dateSelector").hide();
		if(view.reportType == smr.REPORT_TYPE.MAILINGDETAIL){
			var itemList = set.list();
			var mailingIds = [];
			for(var i=0;i<itemList.length;i++){
				mailingIds.push(itemList[i].id);
			}
			smr.showReport($report.parent(),view.reportType,null,null,null,mailingIds,"mailingDetail",null,null,null,startDate,endDate);
		}else if(view.reportType == smr.REPORT_TYPE.DEVICEUSAGE){
			smr.showReport($report.parent(),view.reportType,"sectionDeviceUsageOverview");
		}else if(view.reportType == "userInsight"){
			var $reportSelectDate = $(".reportHeader-selectdate");
			
			$reportHeaderPeriod = $reportSelectDate.find(".reportHeader-period");
			$reportHeaderDate = $reportHeaderPeriod.find(".reportHeader-date");
			if($selector.size()>0 && $selector.val()!="inCustomDateRange"){
				$reportHeaderDate.html($selector.find("option:selected").text());
			}else{
				var startDate = new Date(Date.parse($startDate.val()));
				var endDate = new Date(Date.parse($endDate.val()));
				$reportHeaderDate.html(smr.formatDate(startDate,"medium") +' - '+ smr.formatDate(endDate,"medium"));
			}
			
			$(".date-arrow").removeClass("date-arrow-on");
			$(".date-arrow").find("b").removeClass("arrowup").addClass("arrowdown");
			$e.closest(".report").trigger("REPORTHEADER_DATESELECT_CHANGE");
		}
	}
	
	function clickReportHeaderFindUser(event){
		var view = this;
		var $e = view.$el;
		var $report = $e.closest(".report");
		var $this = $report.find(".reportHeader-findUser .ico-find");
		var $email = $this.prev();
		var email = $email.val();
		if(email==null || email==""){
			$email.css("border","1px solid red");
			window.setTimeout(function(){$email.css("border","1px solid #ddd");},1000);
			var set = smr.getSetAndType(view.reportType).set;
			set.attr("UserInsightSearchRecipientId","");
		}else{
			smr.getUserInsightForFilterBox(email,0,25).done(function(data){
				var items = data.items[0].data;
				if(items && items.length>0 ){
					var set = smr.getSetAndType(view.reportType).set;
					set.clear();
					for(var i=0; i<items.length; i++){
						var item = items[i];
						//hide the dateAdded 2013-09-16
						//set.add({id:item.audienceId,name:item.recipientId,email:item.recipientId,dateAdded:item.dateAdded});
						set.add({id:item.audienceId,name:item.recipientId,email:item.recipientId});
					}
					set.attr("UserInsightShowIndex",1);
					set.attr("UserInsightSearchRecipientId",email);
					smr.showReport($report.parent(),smr.REPORT_TYPE.USERINSIGHT);
				}else{
					brite.display("ViewTips",$("body"),{content:"No user has been found!",title:"Message",doNotShowBtn:true});
				}
			});
		}
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	ReportHeader.prototype.setView = function(viewName,section,sectionConfig){
		var view = this;
		var $e = view.$el;
		hideAllMenus.call(view);
		if(typeof sectionConfig != 'undefined'){
			_sectionConfig = sectionConfig;
			_section = section;
			var views = _sectionConfig.views;
			//show views
			if(_sectionConfig.views){
				for(var viewStr in _sectionConfig.views){
					var showDataView = true;
					if(viewStr == "pivot"){
						if(smr.isOmniEnabled){
							if(section == "sectionFailures" && view.reportType == "deliverability"){
								showDataView = false;
							}else if(section == "sectionEngagement" && view.reportType == "audience"){
								showDataView = false;
							}
						}else{
							showDataView = false;
						}
					}

					if(showDataView){
						$e.find(".reportsHeader-viewButton[data-view='"+viewStr+"']").show();
					}
				}
				$e.find(".reportsHeader-viewButton").removeClass("first").removeClass("last");
				$e.find(".reportsHeader-viewButton:visible:first").addClass("first");
				$e.find(".reportsHeader-viewButton:visible:last").addClass("last");
			}
			
			var toolBarMenu = null;
			if(_sectionConfig.views && _sectionConfig.views[viewName]){
				if(_sectionConfig.views[viewName] == true){
					toolBarMenu = _sectionConfig.defaultToolbar || {};
				}else{
					toolBarMenu = _sectionConfig.views[viewName].toolbar || {};
				}
			}
			
			//if need to show Breakdown
			if(toolBarMenu.showBreakdown){
				$e.find(".reportHeader-breakdown").show();
			}
			//if need to show View Rates
			if(toolBarMenu.showViewRates){
				$e.find(".reportHeader-toggle").show();
			}
			//if need to show View DateSelector
			if(toolBarMenu.showDateSelector){
				$e.find(".reportHeader-selectdate").show();
			}
			
			//if need to show Unique Stats
			if(toolBarMenu.showUniqueStats){
				if(view.reportType != smr.REPORT_TYPE.AUDIENCE){
					$e.find(".reportHeader-uniqueStatsSelector").show();
				}
			}
			//if need to show SubSection
			if(toolBarMenu.showSubSection){
				if(_section == "sectionSharing" || (_section == "sectionLinks"  && smr.conversionEnabled) || _section == "sectionSMS"){
					$e.find(".reportHeader-subSection").show();
				}
			}
			//if need to show Export button
			if(toolBarMenu.showExport){
				$e.find(".btnExport").show();
			}
			
			//if need to show Options button
			if(toolBarMenu.showOptions){
				$e.find(".btnOptions").show();
			}else{
				$e.find(".btnOptions").hide();
			}
			
			//if need to show Breakdown
			if(toolBarMenu.showPrint){
				if(view.reportType != smr.REPORT_TYPE.DELIVERABILITY && view.reportType != smr.REPORT_TYPE.AUDIENCE){
					$e.find(".btnPrint").show();
				}
			}
			
		}else{
			//if sectionConfig is null, show a default view
			$e.find(".reportsHeader-viewButton[data-view='"+viewName+"']").show();
		}
		
		
		if(viewName == "pivot"){
			$e.find(".btnExport").addClass("disabled");
			$e.find(".btnPrint").addClass("disabled");
		}else{
			$e.find(".btnExport").removeClass("disabled");
			$e.find(".btnPrint").removeClass("disabled");
		}
		
		//in table view there a gap between statSummary and table,but pie and bar view not have
		var $statsSummary = $e.closest(".report").find(".statsSummary");
		if(viewName == "table"){
			$statsSummary.removeClass("pieOrBarView");
		}else{
			$statsSummary.removeClass("pieOrBarView");
			$statsSummary.addClass("pieOrBarView");
		}
		
		// set highlight button
		var $viewButton = $e.find(".reportHeader-viewSelector .reportsHeader-viewButton[data-view='"+viewName+"']");
		var $reportHeaderViewSelector = $e.find(".reportHeader-viewSelector");
		$reportHeaderViewSelector.find(".reportsHeader-viewButton").removeClass("sel");
		$reportHeaderViewSelector.find(".reportsHeader-viewButton").find(".ico").removeClass("sel");
		$viewButton.addClass("sel");
		$viewButton.find(".ico").addClass("sel");
	}
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showTypeAndDate(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $reportHeaderMailingSelectorCount = $e.find(".reportHeader-mailingSelector .count");
		var $reportHeaderMailingSelectorNeedS = $e.find(".reportHeader-mailingSelector .needS");
		var $reportHeaderMailingSelectorType = $e.find(".reportHeader-mailingSelector .type");
		var $reportHeaderMailingSelectorDate = $e.find(".reportHeader-mailingSelector .date");
		var $reportHeaderPeriod = $e.find(".reportHeader-period");
		var $reportHeaderDate = $reportHeaderPeriod.find(".reportHeader-date");
		var setType = smr.getSetAndType(reportType);
		var count = setType.set.list().length;
		//show mailings		
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
			var title = setType.type;
			if(setType.type=="VSG") title = "Mailing Server Group";
			$e.find(".reportHeader-mailingSelector").html("<span class='count'>"+count+"&nbsp;</span>" +
														  "<span class='type'>"+title+"</span>" +
														  (count>1?"<span class='needS'>s</span>":""));
		}else if(reportType == smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
			if(count==0){
				$e.find(".reportHeader-mailingSelector").html("All Mailing Server Groups");
			}else{
				$e.find(".reportHeader-mailingSelector").html("<span class='count'>"+count+"&nbsp;</span>" +
						"<span class='type'>Mailing Server Group</span>" +
						(count>1?"<span class='needS'>s</span>":""));
			}
		}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
			var selectorList = setType.set.list();
			if(selectorList[0]){
				$reportHeaderMailingSelectorNeedS.html(selectorList[0].name);
			}else{
				$reportHeaderMailingSelectorNeedS.html("");
			}
		}else if(reportType == smr.REPORT_TYPE.MAILINGDETAIL){
			var selectorList = setType.set.list();
			if(selectorList[0]){
				$reportHeaderMailingSelectorNeedS.html((selectorList[0].name && selectorList[0].name.length>30) ?selectorList[0].name.substring(0,27)+"..." : selectorList[0].name );
				$reportHeaderMailingSelectorNeedS.attr("title",selectorList[0].name);
			}else{
				$reportHeaderMailingSelectorNeedS.html("no name");
			}
		}else if(reportType == smr.REPORT_TYPE.USERINSIGHT){
			var selectorList = setType.set.list();
			var curNum = setType.set.attr("UserInsightShowIndex") || 1;
			var item = selectorList[curNum-1];
			if(item){
				$reportHeaderMailingSelectorNeedS.html((item.name && item.name.length>30) ?item.name.substring(0,27)+"..." : item.name );
				$reportHeaderMailingSelectorNeedS.attr("title",item.name)
				$e.find(".reportHeader-info .email").html(item.email);
				//hide the dateAdded 2013-09-16
				//$e.find(".reportHeader-info .info .dateAdded").html(item.dateAdded);
				var renderObj = {"currentNum":curNum, "total": selectorList.length , "hasControl":(selectorList.length>1), "haveNext":(curNum<selectorList.length),"havePrev":(curNum>1)};
				var html = smr.render("tmpl-reportHeader-userPage",renderObj);
				$e.find(".reportHeader-findUser .user-page").html(html);
			}else{
				$reportHeaderMailingSelectorNeedS.html("no name");
				$e.find(".reportHeader-info .email").html("no email");
				//$e.find(".reportHeader-info .info .dateAdded").html("-");
			}
		}else if(reportType == smr.REPORT_TYPE.ABTEST){
			var selectorList = setType.set.list();
			if(selectorList[0]){
				$reportHeaderMailingSelectorNeedS.html(selectorList[0].name);
			}else{
				$reportHeaderMailingSelectorNeedS.html("no name");
			}
		}else{
			var selectorType = setType.type;
			var list = setType.set.list();
			if(selectorType=="Campaign"){
				var includeSubOrg = setType.set.attr("includeSubOrg");
				if(includeSubOrg){
					var tempList = [];
					var tempName = {};
					for(var i=0;i<list.length;i++){
						if(tempName[list[i].name]) continue;
						tempList.push(list[i]);
						tempName[list[i].name] = true;
					}
					count = tempList.length;
				}
			}else if(selectorType=="Tag"){
				var tempList = [];
				var tempName = {};
				$.each(list,function(i,temp){
					if(tempName[temp.pid]) return;
					tempList.push(temp);
					tempName[temp.pid] = true;
				});
				count = tempList.length;
			}
			
			$reportHeaderMailingSelectorCount.html(count);
			if(count != 1){
				$reportHeaderMailingSelectorNeedS.show();
			}else{
				$reportHeaderMailingSelectorNeedS.hide();
			}
			if(reportType==smr.REPORT_TYPE.DOMAINDRILLDOWN){
				selectorType = setType.set.attr("domainType");
				if(selectorType == "VSG") selectorType="Mailing Server Group" ;
			}
			$reportHeaderMailingSelectorType.html(selectorType);
		}
		
		if(setType.set.attr("limit")){
			$reportHeaderPeriod.show();
			var dateRange = setType.set.period().getDateRange(); 
			
			if(reportType == smr.REPORT_TYPE.MAILINGDETAIL){
				if(smr.allDateRangeShow){
					$reportHeaderDate.html("All");
				}else{
					$reportHeaderDate.html(smr.formatDate(dateRange.startDate,"medium")+" - "+smr.formatDate(dateRange.endDate,"medium"));
				}
				var list = setType.set.list();
				var mailingType = list[0]? list[0].mailingType: "Batch";
				if(mailingType != "Transactional" && mailingType != "transactional" && mailingType != "Program" && mailingType != "program"){
					$reportHeaderDate.parent().hide();
				}else{
					$reportHeaderDate.parent().show();
				}
			}else{
				if(reportType == "userInsight"){
					var $reportSelectDate = $(".reportHeader-selectdate");
					$reportHeaderDate = $reportHeaderPeriod.find(".reportHeader-date");
					var period = setType.set.period();
					if(period.dateType=="inCustomDateRange"){
						$reportHeaderDate.html(smr.formatDate(dateRange.startDate,"medium")+" - "+smr.formatDate(dateRange.endDate,"medium"));
					}else{
						$reportHeaderDate.html($reportSelectDate.find("select.dateTypeSelect option[value='"+period.dateType+"']").html());
					}
				}else{
					$reportHeaderDate.html(smr.formatDate(dateRange.startDate,"medium")+" - "+smr.formatDate(dateRange.endDate,"medium"));
				}
			}
		}else{
			$reportHeaderPeriod.hide();
		}
	}
	
	function hideAllMenus(){
		var $e = this.$element;
		$e.find(".reportHeader-breakdown").hide();
		$e.find(".reportHeader-toggle").hide();
		$e.find(".reportHeader-uniqueStatsSelector").hide();
		$e.find(".reportsHeader-viewButton").hide();
		$e.find(".reportHeader-subSection").hide();
		$e.find(".btnExport").hide();
		$e.find(".btnPrint").hide();
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
	
	function checkDateValue($thisPeriod){
		var $this = this;
		
		var period = getPeriod($thisPeriod);
		
		var $message = $this.closest(".reportHeader-period").find(".message");
		if(!isValidDate(this)){
			$message.show();
			$message.html("Please enter a right date format!");
			$this.closest(".reportHeader-period").find(".dateSelectorDone").attr("disabled",true);
			return false;
		}else if(smr.isValidDate(period.startDate) && smr.isValidDate(period.endDate)){
			if(period.startDate * 1 > period.endDate * 1){
				$message.show();
				$message.html("Start date must be before end date.");
				$this.closest(".reportHeader-period").find(".dateSelectorDone").attr("disabled",true);
				return false;
			}
		}
		$this.closest(".reportHeader-period").find(".dateSelectorDone").attr("disabled",false);
		$message.hide();
		return true;
	}
	
	function getPeriod($this){
		var dateType = "inCustomDateRange";
		var startDate,endDate;
		var $startDate = $this.find("input[name='startDate']");
		var $endDate = $this.find("input[name='endDate']");
		startDate = new Date(Date.parse($startDate.val()));
		endDate = new Date(Date.parse($endDate.val()));
		return smr.buildPeriod(dateType,startDate,endDate);
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

	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("reportHeader",{
		emptyParent: true
	},function(){
		return new smr.ReportHeader();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
