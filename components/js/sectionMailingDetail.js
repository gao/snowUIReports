var smr = smr || {};

(function($){

	smr.isConversionReportEnabledForMDR = true;
	smr.conversionCurrencyForMDR = "$";
	// --------- Component Interface Implementation ---------- //
	function SectionMailingDetail(){};
	smr.SectionMailingDetail = SectionMailingDetail; 
	
	SectionMailingDetail.prototype.create = function(data,config){
		return smr.render("tmpl-sectionMailingDetail",{});
	}
		
	SectionMailingDetail.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		view.reportType = smr.REPORT_TYPE.MAILINGDETAIL;
		view.targetDataType = "rate";
		view.linkType = "clicks";
		view.dynamicContentVal = false;
		view.loadingType={"Summary":false,"MailingDetail":false,"LinkPerformance":false};
		
		//remove the out border and change the content background
		$e.closest(".report-content").css("border","0px");
		$e.closest(".report-content").css("background","#F9F7F8");
		
		var $relatedReport = $e.closest(".report");
		if(!data.opts.fromLeftNav){
			showView.call(view);
		}else{
			$e.closest(".report").find(".reportHeader-mailingSelector .needS").html("no name");
			$e.closest(".report").find(".maildetail-period .date-arrow").hide();
			brite.display("mailingDetailPicker",$("body"),{type:view.reportType,$relatedReport:$e.closest(".report")}).done(function(component){
				component.onClose(function(){
					//showView.call(view);
					var itemList = smr.getSetAndType(view.reportType).set.list();
					if(itemList && itemList.length > 0){
						var mailingIds = itemList[0].id;
						smr.showReport($e.closest(".report").parent(),view.reportType,null,null,null,[mailingIds],"mailingDetail");
						smr.allDateRangeShow = false;
					}
				});
			});
		}
	}
	
	SectionMailingDetail.prototype.events = {
		"click; .sectionMailingDetail-linkSection .btn.overlayReport": clickBtnOverlayReport,
		
		"click; .sectionMailingDetail-failureSection .btn.failureDetailReport": clickBtnFailureDetailReport,
		
		"click; .sectionTitle .collapsible": clickCollapsible,
		
		"change; .sectionMailingDetail-targetSection .targetTypeSelect input[type='radio']": changeTargetTypeSelect,
		
		"change; .sectionMailingDetail-linkSection .dynamicContentSelector input[type='checkbox']": changeDynamicContentSelect,
		
		"change; .sectionMailingDetail-linkSection .linkTypeSelect input[type='radio']": changeLinkTypeSelect
	}
	
	// --------- events --------- //
	function clickBtnOverlayReport(event){
		if(smr.isMock()){
			brite.display("overlay",null,{$target:$(event.currentTarget)});
		}else{
			var setList = smr.getSet(smr.REPORT_TYPE.MAILINGDETAIL,"main","mailingDetail").list();
			var mailingId = setList[0].id;
			javascript:sm.comp.PopupMgr.displayOverlayReportDialog('/sm/singlereport.do?reportType=trackingreport&showOverlayOnly=true&mailingId='+mailingId);
		}
	}
	
	function clickBtnFailureDetailReport(event){
		if(smr.isMock()){
			console.log("--clickBtnFailureDetailReport--");
		}else{
			var setList = smr.getSet(smr.REPORT_TYPE.MAILINGDETAIL,"main","mailingDetail").list();
			var mailingId = setList[0].id;
			var mailingType = setList[0].mailingType;
			if(mailingType == "Transactional" || mailingType == "transactional"){
				javascript:sm.comp.tab.TabMgr.openTab('TRANSACTIONAL_MAILING_REPORT',"mailingIds="+mailingId+"&sectionName=sectionFailures&breakDownBy=failureDetailCode&viewName=table");
			}else if(mailingType == "Program" || mailingType == "program"){
				javascript:sm.comp.tab.TabMgr.openTab('PROGRAM_REPORT',"mailingIds="+mailingId+"&sectionName=sectionFailures&breakDownBy=failureDetailCode&viewName=table");
			}else{
				javascript:sm.comp.tab.TabMgr.openTab('BATCH_MAILING_REPORT',"mailingIds="+mailingId+"&sectionName=sectionFailures&breakDownBy=failureDetailCode&viewName=table");
			}
		}
	}
	
	function clickCollapsible(event){
		var $this = $(event.currentTarget);
		$this.hide();
		if($this.hasClass("exp")){
			$this.closest(".sectionTitle").find(".col").show();
			$this.closest(".mailingDetailPart").find(".sectionContent").slideUp(300,function(){ $(this).hide();});
			$this.closest(".mailingDetailPart").find(".toolBarMD").hide();
		}else{
			$this.closest(".sectionTitle").find(".exp").show();
			$this.closest(".mailingDetailPart").find(".sectionContent").slideDown(300,function(){ $(this).show();});
			$this.closest(".mailingDetailPart").find(".toolBarMD").show();
		}
	}
	
	function changeTargetTypeSelect(event){
		var view = this;
		var $this = $(event.currentTarget);
		var targetType = $this.val();
		view.targetDataType = targetType;
		view.getAllData("MailingDetail").done(function(dataAll){
			showTargetSection.call(view,dataAll,targetType);
		});
	}
	
	function changeLinkTypeSelect(event){
		var view = this;
		var $e = view.$el;
		var $input = $(event.currentTarget);
		var linkType = $input.val();
		view.linkType = linkType;
		if(linkType == "clicks" || linkType == "both"){
			$e.find(".dynamicContentSelector").show();
		}else{
			$e.find(".dynamicContentSelector").hide();
		}
		view.getAllData("LinkPerformance",view.linkType).done(function(dataAll){
			showLinkSection.call(view,dataAll,view.linkType,view.dynamicContentVal);
		});
	}
	
	function changeDynamicContentSelect(event){
		var view = this;
		var $input = $(event.currentTarget);
		var dynamicContentVal = $input.attr("checked") ? true : false;
		view.dynamicContentVal = dynamicContentVal;
		view.getAllData("LinkPerformance",view.linkType).done(function(dataAll){
			showLinkSection.call(view,dataAll,view.linkType,dynamicContentVal);
		});
	}
	// --------- /events --------- //
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionMailingDetail.prototype.getAllData = function(type,subType){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getMailingDetailSummary(view.reportType,type,view.isNewRequest,subType,view.dynamicContentVal).done(function(data){
			view.loadingType[type] = true;
			var dataSet = {};
			if(data.items != null){
				dataSet = data.items[0];
			}
			
			//when all section loading success will remove the "loading..."
			var hideFlag = true;
			for(k in view.loadingType){
				if(!view.loadingType[k]) hideFlag= false;
			}
			if(hideFlag){$reportDataLoading.hide();}
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showView(){
		var view = this;
		var $e = view.$el; 
		var targetDataType = view.targetDataType;
		var linkType = view.linkType;
		
		//clean first
		$e.bEmpty();
		html = smr.render("tmpl-sectionMailingDetail",{});
		$e.append($(html));
		
		var setList = smr.getSet(smr.REPORT_TYPE.MAILINGDETAIL,"main","mailingDetail").list();
		//to make sure we have select the Mailing
		if(setList && setList.length > 0){
			var mailingType = setList[0].mailingType;
			if(mailingType == "Transactional" || mailingType == "transactional" || mailingType == "Program" || mailingType == "program"){
				$e.find(".sectionMailingDetail-summaryConversionSection").hide();
				$e.find(".sectionMailingDetail-summaryConversionSectionForTransactional").show();
				
				//Target performance section is displayed for batch mailings only
				$e.find(".sectionMailingDetail-targetSection").hide();
			}else{
				$e.find(".sectionMailingDetail-summaryConversionSection").show();
				$e.find(".sectionMailingDetail-summaryConversionSectionForTransactional").hide();
				
				//Target performance section is displayed for batch mailings only
				if(mailingType == "Batch" || mailingType == "batch"){
					$e.find(".sectionMailingDetail-targetSection").show();
				}
			}
			
			//get data for summary and vs.campaign average
			view.getAllData("Summary").done(function(dataAll){
				smr.isConversionReportEnabledForMDR  = dataAll.conversionReportEnabled;
				smr.conversionCurrencyForMDR = dataAll.conversionCurrency;
				
				showHeaderSection.call(view,dataAll);
				if(mailingType == "Transactional" || mailingType == "transactional" || mailingType == "Program" || mailingType == "program"){
					showSummarySectionForTransactional.call(view,dataAll,mailingType);
					showConversionSectionForTransactional.call(view,dataAll);
				}else{
					showSummarySection.call(view,dataAll);
					showConversionSection.call(view,dataAll);
				}
				
				//"Mailing vs campiagn Section" should not get displayed for mailing having no campiagn
				if(dataAll.campaign){
					$e.find(".sectionMailingDetail-mailingVSCampaignAveragesSection").show();
					showMailingVSCampaignAveragesSection.call(view,dataAll,mailingType);
				}else{
					$e.find(".sectionMailingDetail-mailingVSCampaignAveragesSection").hide();
				}
				
			});
			
			//get data for target Failure  Share  FTAF
			view.getAllData("MailingDetail").done(function(dataAll){
				smr.isConversionReportEnabledForMDR  = dataAll.conversionReportEnabled;
				smr.conversionCurrencyForMDR = dataAll.conversionCurrency;
				
				//get data for target 
				showTargetSection.call(view,dataAll,targetDataType);
				
				//get data for Failure
				showFailureSection.call(view,dataAll);
				
				//get data for Share
				showShareSection.call(view,dataAll);
				
				//get data for FTAF
				showFTAFSection.call(view,dataAll);
			});
			
			//get data for Link
			view.getAllData("LinkPerformance",linkType).done(function(dataAll){
				showLinkSection.call(view,dataAll,linkType,view.dynamicContentVal);
			});
			
			//get data for Device Usage
			view.getAllData("DeviceUsage").done(function(dataAll){
				showDeviceUsageSection.call(view,dataAll);
			});
		}
	}
	
	function showHeaderSection(data){
		var view = this;
		var $e = view.$el;
		var $headerSection = $e.find(".sectionMailingDetail-headerSection");
		var $subjectLine = $e.find(".sectionMailingDetail-subjectLine .titleVal");
		
		if(typeof data == "undefined" || typeof data.headerData == "undefined"){
			$headerSection.html("");
			$headerSection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = data.headerData;
			
			//display Subject Line
			var subjectEllipses = (dataSummary.mailingSubject && dataSummary.mailingSubject.length>155) ? dataSummary.mailingSubject.substring(0,152)+"..." : dataSummary.mailingSubject;
			var $subjectLineRender = smr.render("tmpl-subjectLine",{subject:dataSummary.mailingSubject,subjectEllipses:subjectEllipses});
			$subjectLine.append($subjectLineRender);
			
			//display the headerSection
			var headerData = {
					"campaign": dataSummary.campaignName,
					"campaignEllipses": (dataSummary.campaignName && dataSummary.campaignName.length>20) ? dataSummary.campaignName.substring(0,17)+"..." : dataSummary.campaignName,
					"mailingType":dataSummary.mailingType,
					"status" : dataSummary.status,
					"reportGenerated": dataSummary.reportGeneratedTime,
					"launchDate": dataSummary.launchTime,
					"elapsedTime" : dataSummary.elapsedTime
			}
			
			var $headerSectionRender = smr.render("tmpl-headerSection",{summary:headerData});
			$headerSection.append($headerSectionRender);
			
			//bind the event for refresh button
			$headerSection.delegate("span.refresh", "click", function(){
				var $this = $(this);
				view.targetDataType = "rate";
				view.linkType = "clicks";
				view.dynamicContentVal = false;
				view.loadingType={"Summary":false,"MailingDetail":false,"LinkPerformance":false};
				showView.call(view);
			});
		}
	}
	
	function showSummarySection(data){
		var view = this;
		var $e = view.$el;
		var $summarySection = $e.find(".sectionMailingDetail-summarySection .statsSummaryItems");
		
		if(typeof data == "undefined"){
			$summarySection.html("");
			$summarySection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = data;
			
			//display the Summary Statistic Section
			var summaryStats = [
						{name:"sent",label:"Sent",value:smr.checkNumber(dataSummary.sent),isShowHover:true},
						{name:"delivered",label:"Deliverability",value:smr.checkNumber(dataSummary.deliverability),isRate:true,isShowHover:true},
						{name:"opens",label:"Opens",value:smr.checkNumber(dataSummary.uniqueOpens),isShowHover:true},
						{name:"opensRate",label:"Open Rate",value:smr.checkNumber(dataSummary.uniqueOpenRate),isRate:true,isShowHover:true},
						{name:"clicks",label:"Clicks",value:smr.checkNumber(dataSummary.uniqueClicks),isShowHover:true},
						{name:"clicksRate",label:"Click Rate",value:smr.checkNumber(dataSummary.uniqueClickRate),isRate:true,isShowHover:true},
						{name:"unsubs",label:"Unsubs",value:smr.checkNumber(dataSummary.uniqueUnsubs),isShowHover:true},
						{name:"complaints",label:"Complaints",value:smr.checkNumber(dataSummary.uniqueComplaints),isShowHover:true}
		  			];
			
			for (var i = 0; i < summaryStats.length; i++) {
				var obj = summaryStats[i];
				var name = obj.name;
				var label = obj.label;
				var value = obj.value;
				
				var isFirst = false;
				var isLeftSpace = false;
				if(i%2 == 0){
					isFirst = true;
					if(i != 0){
						isLeftSpace = true;
					}
				}else{
					isFirst = false;
					isLeftSpace = false;
				}
				
				var isRate = false;
				if(obj.isRate){
					isRate = true;
					value = parseFloat(value.toFixed("1"));
				}else{
					isRate = false;
					value = smr.formatNumber(value);
				}
				
				var isShowHover = false;
				if(obj.isShowHover){
					isShowHover = true;
				}else{
					isShowHover = false;
				}
				
				$summarySection.append(smr.render("tmpl-statistic-dataItem",{
						"name":name,
						"label":label,
						"val":value,
						"isFirst":isFirst,
						"isRate":isRate,
						"isLeftSpace":isLeftSpace,
						"conversionCurrencyForMDR":smr.conversionCurrencyForMDR,
						"isShowHover":isShowHover
					})
				);
			}
			
			//implement the hover 
			$e.find(".statsSummaryItems .showhover").hover(
		        function(event){
		        	var $this = $(this);
		        	var itemName = $this.attr("data-value");
		        	var dataObj = {};
		        	if(itemName == "opens" || itemName == "opensRate"){
		        		$this.closest(".statsSummaryItems").find(".dataItem").each(function(){
		        			var $thisDiv = $(this);
		        			var divVal = $thisDiv.attr("data-value");
		        			if(divVal == "opens" || divVal == "opensRate"){
		        				$thisDiv.addClass("hoveredDiv");
		        			}else{
		        				$thisDiv.removeClass("hoveredDiv");
		        			}
		        		});
		        		dataObj = {
		        					title:"Opens",
			        				name1:"Opens",
			        				value1:smr.formatNumber(dataSummary.opens),
			        				name2:"Open Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.openRate).toFixed("1"))+"%",
			        				name3:"Opens",
			        				value3:smr.formatNumber(dataSummary.uniqueOpens),
			        				name4:"Open Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.uniqueOpenRate).toFixed("1"))+"%"
			        		}
		        	}else if(itemName == "clicks" || itemName == "clicksRate"){
		        		$this.closest(".statsSummaryItems").find(".dataItem").each(function(){
		        			var $thisDiv = $(this);
		        			var divVal = $thisDiv.attr("data-value");
		        			if(divVal == "clicks" || divVal == "clicksRate"){
		        				$thisDiv.addClass("hoveredDiv");
		        			}else{
		        				$thisDiv.removeClass("hoveredDiv");
		        			}
		        		});
		        		dataObj = {
		        					title:"Clicks",
			        				name1:"Clicks",
			        				value1:smr.formatNumber(dataSummary.clicks),
			        				name2:"Click Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.clickRate).toFixed("1"))+"%",
			        				name3:"Clicks",
			        				value3:smr.formatNumber(dataSummary.uniqueClicks),
			        				name4:"Click Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.uniqueClickRate).toFixed("1"))+"%"
			        		}
		        	}else if(itemName == "unsubs" || itemName == "complaints"){
		        		$this.closest(".statsSummaryItems").find(".dataItem").each(function(){
		        			var $thisDiv = $(this);
		        			var divVal = $thisDiv.attr("data-value");
		        			if(divVal == "unsubs" || divVal == "complaints"){
		        				$thisDiv.addClass("hoveredDiv");
		        			}else{
		        				$thisDiv.removeClass("hoveredDiv");
		        			}
		        		});
		        		dataObj = {
		        					title1:"Unique Unsubs",
		        					title2:"Unique Complaints",
			        				name1:"Unsubs",
			        				value1:smr.formatNumber(dataSummary.uniqueUnsubs),
			        				name2:"Unsub Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.uniqueUnsubRate).toFixed("2"))+"%",
			        				name3:"Complaints",
			        				value3:smr.formatNumber(dataSummary.uniqueComplaints),
			        				name4:"Complaint Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.uniqueComplaintRate).toFixed("2"))+"%"
			        		}
		        	}else if(itemName == "sent" || itemName == "delivered"){
		        		$this.closest(".statsSummaryItems").find(".dataItem").each(function(){
		        			var $thisDiv = $(this);
		        			var divVal = $thisDiv.attr("data-value");
		        			if(divVal == "sent" || divVal == "delivered"){
		        				$thisDiv.addClass("hoveredDiv");
		        			}else{
		        				$thisDiv.removeClass("hoveredDiv");
		        			}
		        		});
		        		dataObj = {
		        					title1:"Volume",
		        					title2:"Failures",
			        				name1:"Sent",
			        				value1:smr.formatNumber(dataSummary.sent),
			        				name2:"Delivered",
			        				value2:smr.formatNumber(dataSummary.delivered),
			        				name3:"Count",
			        				value3:smr.formatNumber(dataSummary.failed),
			        				name4:"Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.failureRate).toFixed("2"))+"%"
			        		}
		        	}
		        		
		        	$container = $e.find(".hoverItemContainer");
		        	$container.empty();
		        	var html = smr.render("tmpl-statsSummaryItems-dataItem-hover",dataObj);
		        	var $hoverBox = $(html)
		        	var $hoverDiv = $hoverBox.find(".hoverDiv");
		        	$hoverBox.css("opacity","0");
		        	$container.append($hoverBox);
		        		
		        	var lastLeft = 0;
		        	var disVal = -25;
		        	if(itemName == "opensRate" || itemName == "clicksRate" || itemName == "complaints" || itemName == "delivered"){
		        		lastLeft = 65;
		        	}
		        	
		        	var offset = $e.closest(".smr.report").offset() ;
		        	var thisSpanOffset = $(this).offset();
		        	var IE7offsetX = 0;
		        	var leftVal = (thisSpanOffset.left - offset.left - lastLeft)-IE7offsetX;
		        	var topVal = thisSpanOffset.top-offset.top + disVal;
		        	$container.css({left: leftVal, top: topVal});
		        		
		        	$hoverBox.css("opacity","1");
//		        	$hoverDiv.bTransition({transition:"all 0.6s ease",transform:"translate(50px,0px)",onTimeout:true});
		        	$container.show();
		        	//$container.animate({left: leftVal-1},600);
		        		
		        },function(event){}       	
			);
			
			$e.find(".hoverItemContainer").mouseleave(
				function(event){
					var $this = $(this);
			        $this.closest(".sectionMailingDetail").find(".statsSummaryItems .dataItem").each(function(){
		        		var $thisDiv = $(this);
	        			$thisDiv.removeClass("hoveredDiv");
		        	});
		        	
		        	$this.empty();
			        $this.hide();
	       		}
			);
		}
	}
	
	function showSummarySectionForTransactional(data,mailingType){
		var view = this;
		var $e = view.$el;
		var $summarySection = $e.find(".sectionMailingDetail-summarySectionForTransactional .summarySectionForTransactionalTable .dataTableForTransactional");
		
		if(typeof data == "undefined" || typeof data.data == "undefined"){
			$summarySection.html("");
			$summarySection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = data;
			var dataList = data.data;
			
			var dataColumn = {
					delivered:[],
					sent:[],
					opens:[],
					opensRate:[],
					clicks:[],
					clicksRate:[],
					unsubs:[],
					complaints:[]
			};
			
			for(var m=0 ; m<dataList.length; m++){
				var dataVal = dataList[m];
				dataColumn.delivered.push(dataVal.deliverability);
				dataColumn.sent.push(dataVal.sent);
				dataColumn.opens.push(dataVal.opens);
				dataColumn.opensRate.push(dataVal.openRate);
				dataColumn.clicks.push(dataVal.clicks);
				dataColumn.clicksRate.push(dataVal.clickRate);
				dataColumn.unsubs.push(dataVal.unsubs);
				dataColumn.complaints.push(dataVal.complaints);
			}
			
			//display the Summary Statistic Section
			var summaryStats = [];
			if(mailingType == "Transactional" || mailingType == "transactional"){
				var summaryStats = [
						{name:"sent",label:"Sent",value:smr.checkNumber(dataSummary.sent),isShowHover:true},
						{name:"delivered",label:"Deliverability",value:smr.checkNumber(dataSummary.deliverability),isRate:true,isShowHover:true},
						{name:"opens",label:"Opens",value:smr.checkNumber(dataSummary.uniqueOpens),isShowHover:true},
						{name:"opensRate",label:"Open Rate",value:smr.checkNumber(dataSummary.uniqueOpenRate),isRate:true,isShowHover:true},
						{name:"clicks",label:"Clicks",value:smr.checkNumber(dataSummary.uniqueClicks),isShowHover:true},
						{name:"clicksRate",label:"Click Rate",value:smr.checkNumber(dataSummary.uniqueClickRate),isRate:true,isShowHover:true},
						{name:"complaints",label:"Complaints",value:smr.checkNumber(dataSummary.uniqueComplaints),isShowHover:true}
		  			];
			}else{
				var summaryStats = [
						{name:"sent",label:"Sent",value:smr.checkNumber(dataSummary.sent),isShowHover:true},
						{name:"delivered",label:"Deliverability",value:smr.checkNumber(dataSummary.deliverability),isRate:true,isShowHover:true},
						{name:"opens",label:"Opens",value:smr.checkNumber(dataSummary.uniqueOpens),isShowHover:true},
						{name:"opensRate",label:"Open Rate",value:smr.checkNumber(dataSummary.uniqueOpenRate),isRate:true,isShowHover:true},
						{name:"clicks",label:"Clicks",value:smr.checkNumber(dataSummary.uniqueClicks),isShowHover:true},
						{name:"clicksRate",label:"Click Rate",value:smr.checkNumber(dataSummary.uniqueClickRate),isRate:true,isShowHover:true},
						{name:"unsubs",label:"Unsubs",value:smr.checkNumber(dataSummary.uniqueUnsubs),isShowHover:true},
						{name:"complaints",label:"Complaints",value:smr.checkNumber(dataSummary.uniqueComplaints),isShowHover:true}
		  			];
			}
			
			
			for (var i = 0; i < summaryStats.length; i++) {
				var obj = summaryStats[i];
				var name = obj.name;
				var label = obj.label;
				var value = obj.value;
				
				var isHaveLine = true;
				if(i%2 == 0){
					isHaveLine = false;
				}
				
				if(i == summaryStats.length -1){
					isHaveLine = false;
				}
				
				var isRate = false;
				if(obj.isRate){
					isRate = true;
					value = parseFloat(value.toFixed("1"));
				}else{
					isRate = false;
					value = smr.formatNumber(value);
				}
				
				var isShowHover = false;
				if(obj.isShowHover){
					isShowHover = true;
				}else{
					isShowHover = false;
				}
				
				var summaryObj = {
					"name":name,
					"label":label,
					"value":value,
					"isRate":isRate,
					"isHaveLine":isHaveLine,
					"conversionCurrencyForMDR":smr.conversionCurrencyForMDR,
					"isShowHover":isShowHover
				}
				
				$summarySection.append(smr.render("tmpl-sectionContent-dataTable-tr",{summaryObj:summaryObj}));
				
				var myvalues = dataColumn[name];
				$summarySection.find("."+name).sparkline(myvalues, {type:'line', lineColor:'#4c9cc4',fillColor:'#d3e9f4',spotRadius:0,width:'96%',height:'14px',lineWidth:'2'});
			}
			
			$e.find(".summarySectionForTransactionalTable .showhover").hover(
				function(event){
					var $this = $(this);
					var itemName = $this.attr("data-value");
					
					var dataObj = {};
		        	if(itemName == "opens" || itemName == "opensRate"){
		        		$this.closest(".dataTableForTransactional").find("td").each(function(){
		        			var $thisTd = $(this);
		        			var tdVal = $thisTd.attr("data-value");
		        			if(tdVal == "opens" || tdVal == "opensRate"){
		        				$thisTd.addClass("hoveredTd");
		        			}else{
		        				$thisTd.removeClass("hoveredTd");
		        			}
		        		});
		        		dataObj = {
		        					title:"Opens",
			        				name1:"Opens",
			        				value1:smr.formatNumber(dataSummary.opens),
			        				name2:"Open Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.openRate).toFixed("1"))+"%",
			        				name3:"Opens",
			        				value3:smr.formatNumber(dataSummary.uniqueOpens),
			        				name4:"Open Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.uniqueOpenRate).toFixed("1"))+"%"
			        		}
		        	}else if(itemName == "clicks" || itemName == "clicksRate"){
		        		$this.closest(".dataTableForTransactional").find("td").each(function(){
		        			var $thisTd = $(this);
		        			var tdVal = $thisTd.attr("data-value");
		        			if(tdVal == "clicks" || tdVal == "clicksRate"){
		        				$thisTd.addClass("hoveredTd");
		        			}else{
		        				$thisTd.removeClass("hoveredTd");
		        			}
		        		});
		        		dataObj = {
		        					title:"Clicks",
			        				name1:"Clicks",
			        				value1:smr.formatNumber(dataSummary.clicks),
			        				name2:"Click Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.clickRate).toFixed("1"))+"%",
			        				name3:"Clicks",
			        				value3:smr.formatNumber(dataSummary.uniqueClicks),
			        				name4:"Click Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.uniqueClickRate).toFixed("1"))+"%"
			        		}
		        	}else if(itemName == "unsubs" || itemName == "complaints"){
		        		$this.closest(".dataTableForTransactional").find("td").each(function(){
		        			var $thisTd = $(this);
		        			var tdVal = $thisTd.attr("data-value");
		        			if(tdVal == "unsubs" || tdVal == "complaints"){
		        				$thisTd.addClass("hoveredTd");
		        			}else{
		        				$thisTd.removeClass("hoveredTd");
		        			}
		        		});
		        		if(mailingType == "Transactional" || mailingType == "transactional"){
		        			dataObj = {
		        					title:null,
		        					title1:"Unique Complaints",
		        					title2:null,
			        				name1:"Complaints",
			        				value1:smr.formatNumber(dataSummary.uniqueComplaints),
			        				name2:"Complaint Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.uniqueComplaintRate).toFixed("2"))+"%"
			        		}
		        		}else{
		        			dataObj = {
		        					title:null,
		        					title1:"Unique Unsubs",
		        					title2:"Unique Complaints",
			        				name1:"Unsubs",
			        				value1:smr.formatNumber(dataSummary.uniqueUnsubs),
			        				name2:"Unsub Rate",
			        				value2:parseFloat(smr.checkNumber(dataSummary.uniqueUnsubRate).toFixed("2"))+"%",
			        				name3:"Complaints",
			        				value3:smr.formatNumber(dataSummary.uniqueComplaints),
			        				name4:"Complaint Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.uniqueComplaintRate).toFixed("2"))+"%"
			        		}
		        		}
		        		
		        	}else if(itemName == "sent" || itemName == "delivered"){
		        		$this.closest(".dataTableForTransactional").find("td").each(function(){
		        			var $thisDiv = $(this);
		        			var divVal = $thisDiv.attr("data-value");
		        			if(divVal == "sent" || divVal == "delivered"){
		        				$thisDiv.addClass("hoveredTd");
		        			}else{
		        				$thisDiv.removeClass("hoveredTd");
		        			}
		        		});
		        		dataObj = {
		        					title:null,
		        					title1:"Volume",
		        					title2:"Failures",
			        				name1:"Sent",
			        				value1:smr.formatNumber(dataSummary.sent),
			        				name2:"Delivered",
			        				value2:smr.formatNumber(dataSummary.delivered),
			        				name3:"Count",
			        				value3:smr.formatNumber(dataSummary.failed),
			        				name4:"Rate",
			        				value4:parseFloat(smr.checkNumber(dataSummary.failureRate).toFixed("2"))+"%"
			        		}
		        	}
		        	
		        	dataObj.showUniquePart = true;
		        	if(dataObj.title == null && dataObj.title2){
		        		dataObj.showUniquePart = false;
		        	}
		        	
		        	$container = $e.find(".hoverItemContainer");
		        	$container.empty();
		        	var html = smr.render("tmpl-statsSummaryItemsForTransactional-hover",dataObj);
		        	var $hoverBox = $(html)
		        	var $hoverDiv = $hoverBox.find(".hoverDiv");
		        	$hoverBox.css("opacity","0");
		        	$container.append($hoverBox);
		        	
		        	var disVal = 30;
		        	if(itemName == "opensRate" || itemName == "clicksRate" || itemName == "complaints" || itemName == "delivered"){
		        		disVal = 50;
		        	}
		        	
		        	if(mailingType == "Transactional" || mailingType == "transactional"){
		        		if(itemName == "complaints"){
		        			disVal = 28;
		        		}
		        	}
		        		
		        	var offset = $e.closest(".smr.report").offset() ;
		        	var thisSpanOffset = $(this).offset();
		        	var IE7offsetX = 0;
		        	var leftVal = (thisSpanOffset.left - offset.left + 70)-IE7offsetX;
		        	var topVal = thisSpanOffset.top-offset.top-disVal;
		        	$container.css({left: leftVal, top: topVal});
		        		
		        	$hoverBox.css("opacity","1");
//		        	$hoverDiv.bTransition({transition:"all 0.6s ease",transform:"translate(50px,0px)",onTimeout:true});
		        	$container.show();
		        	//$container.animate({left: leftVal-1},600);
				}
				,function(event){
					var $this = $(this);
		        	$container = $e.find(".hoverItemContainer");
		        	$container.empty();
		        	$container.hide();
		        	 		        	
		        	$this.closest(".dataTableForTransactional").find("td").each(function(){
	        			var $thisTd = $(this);
	        			$thisTd.removeClass("hoveredTd");
	        		});
				}  
			);
			
			$e.find(".hoverItemContainer").mouseleave(
				function(event){
					var $this = $(this);
			        $this.closest(".sectionMailingDetail").find(".summarySectionForTransactionalTable .dataTableForTransactional").find("td").each(function(){
		        		var $thisTd = $(this);
		        		$thisTd.removeClass("hoveredTd");
		        	});
		        	
		        	$this.empty();
			        $this.hide();
	       		}
			);
			
		}
	}
	
	function showConversionSection(data){
		var view = this;
		var $e = view.$el;
		var $conversionSection = $e.find(".sectionMailingDetail-conversionSection .statsSummaryItems");
		
		if(typeof data == "undefined"){
			$conversionSection.html("");
			$conversionSection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = data;
			
			//display the Conversion Section (Only shown if conversions reporting is enabled)
			if(smr.isConversionReportEnabledForMDR){
				var conversionStats = [
									{name:"count",label:"Count",value:smr.checkNumber(dataSummary.conversionCount)},
									{name:"rate",label:"Rate",value:smr.checkNumber(dataSummary.conversionRate),isRate:true},
									{name:"revenue",label:"Revenue",value:smr.checkNumber(dataSummary.conversionRevenue),isConversionSymbol:true},
									{name:"averageOrderValue",label:"Average Order",value:smr.checkNumber(dataSummary.averageOrderValue),isConversionSymbol:true},
									{name:"revenuePerEmail",label:"RPM",value:smr.checkNumber(dataSummary.revenuePerThousand),isConversionSymbol:true},
									{name:"convertToClick",label:"Convert-to-Click",value:smr.checkNumber(dataSummary.convertToClick),isRate:true},
									{name:"itemsPerOrder",label:"Items Per Order",value:smr.checkNumber(dataSummary.itemsPerOrder)},
									{name:"totalItems",label:"Total Items",value:smr.checkNumber(dataSummary.totalItems)}
					  			];
				for (var i = 0; i < conversionStats.length; i++) {
					var obj = conversionStats[i];
					var name = obj.name;
					var label = obj.label;
					var value = obj.value;
					
					var isFirst = false;
					var isLeftSpace = false;
					if(i%2 == 0){
						isFirst = true;
						if(i != 0){
							isLeftSpace = true;
						}
					}else{
						isFirst = false;
						isLeftSpace = false;
					}
					
					var isRate = false;
					if(obj.isRate){
						isRate = true;
						value = parseFloat(value.toFixed("1"));
					}else{
						isRate = false;
						value = smr.formatNumber(value);
					}
					
					var isConversionSymbol = false;
					if (typeof obj.isConversionSymbol != "undefined") {
						isConversionSymbol = obj.isConversionSymbol;
					}
					
					$conversionSection.append(smr.render("tmpl-statistic-dataItem",{
							"name":name,
							"label":label,
							"val":value,
							"isFirst":isFirst,
							"isRate":isRate,
							"isLeftSpace":isLeftSpace,
							"conversionCurrencyForMDR":smr.conversionCurrencyForMDR,
							"isConversionSymbol":isConversionSymbol
						})
					);
				}
			}else{
				$e.find(".sectionMailingDetail-conversionSection").hide();
			}
		}
	}
	
	function showConversionSectionForTransactional(data){
		var view = this;
		var $e = view.$el;
		var $conversionSection = $e.find(".sectionMailingDetail-conversionSectionForTransactional .conversionSectionForTransactionalTable .dataTableForTransactional");
		
		if(typeof data == "undefined" || typeof data.data == "undefined"){
			$conversionSection.html("");
			$conversionSection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = data;
			var dataList = data.data;
			
			var dataColumn = {
					count:[],
					rate:[],
					revenue:[],
					averageOrderValue:[],
					revenuePerEmail:[],
					convertToClick:[],
					itemsPerOrder:[],
					totalItems:[]
			};
			
			for(var m=0 ; m<dataList.length; m++){
				var dataVal = dataList[m];
				dataColumn.count.push(dataVal.conversionCount);
				dataColumn.rate.push(dataVal.conversionRate);
				dataColumn.revenue.push(dataVal.conversionRevenue);
				dataColumn.averageOrderValue.push(dataVal.averageOrderValue);
				dataColumn.revenuePerEmail.push(dataVal.revenuePerThousand);
				dataColumn.convertToClick.push(dataVal.convertToClick);
				dataColumn.itemsPerOrder.push(dataVal.itemsPerOrder);
				dataColumn.totalItems.push(dataVal.totalItems);
			}
			
			//display the Conversion Section (Only shown if conversions reporting is enabled)
			if(smr.isConversionReportEnabledForMDR){
				var conversionStats = [
									{name:"count",label:"Count",value:smr.checkNumber(dataSummary.conversionCount)},
									{name:"rate",label:"Rate",value:smr.checkNumber(dataSummary.conversionRate),isRate:true},
									{name:"revenue",label:"Revenue",value:smr.checkNumber(dataSummary.conversionRevenue),isConversionSymbol:true},
									{name:"averageOrderValue",label:"Average Order",value:smr.checkNumber(dataSummary.averageOrderValue),isConversionSymbol:true},
									{name:"revenuePerEmail",label:"RPM",value:smr.checkNumber(dataSummary.revenuePerThousand),isConversionSymbol:true},
									{name:"convertToClick",label:"Convert-to-Click",value:smr.checkNumber(dataSummary.convertToClick),isRate:true},
									{name:"itemsPerOrder",label:"Items Per Order",value:smr.checkNumber(dataSummary.itemsPerOrder)},
									{name:"totalItems",label:"Total Items",value:smr.checkNumber(dataSummary.totalItems)}
					  			];
				for (var i = 0; i < conversionStats.length; i++) {
					var obj = conversionStats[i];
					var name = obj.name;
					var label = obj.label;
					var value = obj.value;
					
					var isHaveLine = true;
					if(i%2 == 0){
						isHaveLine = false;
					}
					
					if(i == conversionStats.length -1){
						isHaveLine = false;
					}
					
					var isRate = false;
					if(obj.isRate){
						isRate = true;
						value = parseFloat(value.toFixed("1"));
					}else{
						isRate = false;
						value = smr.formatNumber(value);
					}
					
					var isConversionSymbol = false;
					if (typeof obj.isConversionSymbol != "undefined") {
						isConversionSymbol = obj.isConversionSymbol;
					}
					
					var summaryObj = {
							"name":name,
							"label":label,
							"value":value,
							"isRate":isRate,
							"isHaveLine":isHaveLine,
							"isConversionSymbol":isConversionSymbol,
							"conversionCurrencyForMDR":smr.conversionCurrencyForMDR
						}
						
					$conversionSection.append(smr.render("tmpl-sectionContent-dataTable-tr",{summaryObj:summaryObj}));
					
					var myvalues = dataColumn[name];
					$conversionSection.find("."+name).sparkline(myvalues, {type:'line', lineColor:'#4c9cc4',fillColor:'#d3e9f4',spotRadius:0,width:'96%',height:'14px',lineWidth:'2'});
				}
			}else{
				$e.find(".sectionMailingDetail-conversionSectionForTransactional").hide();
			}
		}
	}
	
	function showMailingVSCampaignAveragesSection(dataAll,mailingType){
		var view = this;
		var $e = view.$el;
		var $mailingVSCampaignAveragesSection = $e.find(".sectionMailingDetail-mailingVSCampaignAveragesSection");
		var $sectionContent = $mailingVSCampaignAveragesSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable tbody");
		
		if(typeof dataAll == "undefined" || typeof dataAll.campaign == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var mailingData = dataAll;
			var campaignData = dataAll.campaign;
			
			var tableColumn = [];
			if(smr.isConversionReportEnabledForMDR){
				tableColumn = [
				                   {name:"deliverability",label:"Deliverability",isRate:true},
				                   {name:"uniqueOpenRate",label:"Open Rate",isRate:true},
				                   {name:"uniqueClickRate",label:"Click Rate",isRate:true},
				                   {name:"uniqueClickToOpen",label:"Click-to-Open",isRate:true},
				                   {name:"conversionRate",label:"Conversion Rate",isRate:true},
				                   {name:"revenuePerThousand",label:"RPM",isConversionSymbol:true}
				                   ];
				if(mailingType != "Transactional" && mailingType != "transactional"){
					tableColumn.push({name:"uniqueUnsubRate",label:"Unsub Rate",isRate:true});
				}
				tableColumn.push({name:"uniqueComplaintRate",label:"Complaint Rate",isRate:true});
			}else{
				tableColumn = [
				                   {name:"deliverability",label:"Deliverability",isRate:true},
				                   {name:"uniqueOpenRate",label:"Open Rate",isRate:true},
				                   {name:"uniqueClickRate",label:"Click Rate",isRate:true},
				                   {name:"uniqueClickToOpen",label:"Click-to-Open",isRate:true}
				                   ];
				if(mailingType != "Transactional" && mailingType != "transactional"){
					tableColumn.push({name:"uniqueUnsubRate",label:"Unsub Rate",isRate:true});
				}
				tableColumn.push({name:"uniqueComplaintRate",label:"Complaint Rate",isRate:true});
			}
			
			
			for(var i = 0; i < tableColumn.length; i++){
				var row = tableColumn[i];
				var rowData = {
						"label":row.label,
						"isRate":row.isRate,
						"isCurrencySymbol":row.isConversionSymbol
				};
				var mailingVal = mailingData[row.name];
				var campaignVal = campaignData[row.name];
				
				var changeVal = mailingVal - campaignVal;
				if(row.name == "revenuePerThousand"){
					changeVal = smr.formatDivisionNumber((mailingVal - campaignVal),campaignVal)*100;
				}
				rowData.changeVal = changeVal.toFixed("2");
				
				if(row.name == "uniqueUnsubRate" || row.name == "uniqueComplaintRate"){
					//Improvement is use Less Than
					if(changeVal > 0){
						rowData.improvement = "reduce";
					}else if(changeVal == 0){
						rowData.improvement = "unchange";
					}else{
						rowData.improvement = "improve";
					}
				}else{
					//Improvement is use Greater  Than
					if(changeVal > 0){
						rowData.improvement = "improve";
					}else if(changeVal == 0){
						rowData.improvement = "unchange";
					}else{
						rowData.improvement = "reduce";
					}
				}
				
				if(row.isRate){
					rowData.mailingVal = mailingVal.toFixed("2");
					rowData.campaignVal = campaignVal.toFixed("2");
				}else{
					rowData.mailingVal = smr.formatNumber(mailingVal);
					rowData.campaignVal = smr.formatNumber(campaignVal);
				}
				
				if(rowData.changeVal < 0){
					rowData.barWidth = -1 * rowData.changeVal;
				}else{
					rowData.barWidth = rowData.changeVal;
				}
				
				rowData.isForTransactional = false;
				if(mailingType == "Transactional" || mailingType == "transactional"){
					rowData.isForTransactional = true;
				}
				
				var $tr = smr.render("tmpl-mailingVSCampaignAveragesSection-dataTable-tr",{summaryObj : rowData, conversionCurrencyForMDR:smr.conversionCurrencyForMDR});
				$table.append($tr);
			}
		}
	}
	
	function showTargetSection(dataAll,dataType){
		var view = this;
		var $e = view.$el;
		var $targetSection = $e.find(".sectionMailingDetail-targetSection");
		var $sectionContent = $targetSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		//empty table
		$table.find("thead tr").empty();
		$table.find("tbody").empty();
		
		if(typeof dataAll == "undefined" || typeof dataAll.targetPerformance == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataList = dataAll.targetPerformance.data;
			var dataSummary = dataAll.targetPerformance;
			
			var tableColumns = [];
			var tableData = [];
			tableColumns.push({name:"target",label:"Target",maxLength:30,ellipses:"center",defaultSort:true,sortable:true});
			if(dataType == "count"){
				tableColumns.push({name:"sent",label:"Sent",isRate:false,sortable:true});
				tableColumns.push({name:"failed",label:"Failed",isRate:false,sortable:true});
				tableColumns.push({name:"opens",label:"Opens",isRate:false,sortable:true});
				tableColumns.push({name:"clicks",label:"Clicks",isRate:false,sortable:true});
				if(smr.isConversionReportEnabledForMDR){
					tableColumns.push({name:"conversions",label:"Conversions",isRate:false,sortable:true});
					tableColumns.push({name:"revenue",label:"Revenue",isRate:false,isConversionSymbol:true,sortable:true});
				}
				tableColumns.push({name:"unsubs",label:"Unsubs",isRate:false,sortable:true});
				tableColumns.push({name:"complaints",label:"Complaints",isRate:false,sortable:true});
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					resultData = {
							"target":rowData.targetName,
							"sent" : smr.checkNumber(rowData.sent),
							"failed" : smr.checkNumber(rowData.failed),
							"opens" : smr.checkNumber(rowData.opens),
							"clicks" : smr.checkNumber(rowData.clicks),
							"unsubs" : smr.checkNumber(rowData.unsubs),
							"complaints" : smr.checkNumber(rowData.complaints)
					};
					
					if(smr.isConversionReportEnabledForMDR){
						resultData["conversions"] = smr.checkNumber(rowData.conversionCount);
						resultData["revenue"] = smr.checkNumber(rowData.conversionRevenue);
					}
					tableData.push(resultData);
				}
				
			}else if(dataType == "percent"){
				tableColumns.push({name:"sent",label:"Sent",isRate:true,sortable:true});
				tableColumns.push({name:"failed",label:"Failed %",isRate:true,sortable:true});
				tableColumns.push({name:"opens",label:"Open %",isRate:true,sortable:true});
				tableColumns.push({name:"clicks",label:"Click %",isRate:true,sortable:true});
				if(smr.isConversionReportEnabledForMDR){
					tableColumns.push({name:"conversions",label:"Conversion %",isRate:true,sortable:true});
					tableColumns.push({name:"revenue",label:"Revenue %",isRate:true,sortable:true});
				}
				tableColumns.push({name:"unsubs",label:"Unsub %",isRate:true,sortable:true});
				tableColumns.push({name:"complaints",label:"Complaint %",isRate:true,sortable:true});
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					resultData = {
							"target":rowData.targetName,
							"sent" : parseFloat((smr.formatDivisionNumber(rowData.sent,dataSummary.sent)*100).toFixed("1")),
							"failed" : parseFloat((smr.formatDivisionNumber(rowData.failed,dataSummary.failed)*100).toFixed("1")),
							"opens" : parseFloat((smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100).toFixed("1")),
							"clicks" : parseFloat((smr.formatDivisionNumber(rowData.clicks,dataSummary.clicks)*100).toFixed("1")),
							"unsubs" : parseFloat((smr.formatDivisionNumber(rowData.unsubs,dataSummary.unsubs)*100).toFixed("1")),
							"complaints" : parseFloat((smr.formatDivisionNumber(rowData.complaints,dataSummary.complaints)*100).toFixed("1"))
					};
					
					if(smr.isConversionReportEnabledForMDR){
						resultData["conversions"] = parseFloat((smr.formatDivisionNumber(rowData.conversionCount,dataSummary.conversionCount)*100).toFixed("1"));
						resultData["revenue"] = parseFloat((smr.formatDivisionNumber(rowData.conversionRevenue,dataSummary.conversionRevenue)*100).toFixed("1"));
					}
					
					tableData.push(resultData);
				}
			}else{
				//for rate
				tableColumns.push({name:"sent",label:"Sent",isRate:false,sortable:true});
				tableColumns.push({name:"failed",label:"Failed Rate",isRate:true,sortable:true});
				tableColumns.push({name:"opens",label:"Open Rate",isRate:true,sortable:true});
				tableColumns.push({name:"clicks",label:"Click Rate",isRate:true,sortable:true});
				if(smr.isConversionReportEnabledForMDR){
					tableColumns.push({name:"conversions",label:"Conversion Rate",isRate:true,sortable:true});
					tableColumns.push({name:"revenue",label:"Revenue (RPM)",isRate:false,isConversionSymbol:true,sortable:true});
				}
				tableColumns.push({name:"unsubs",label:"Unsub Rate",isRate:true,sortable:true});
				tableColumns.push({name:"complaints",label:"Complaint Rate",isRate:true,sortable:true});
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					resultData = {
							"target":rowData.targetName,
							"sent" : smr.checkNumber(rowData.sent),
							"failed" : parseFloat(smr.checkNumber(rowData.failureRate).toFixed("2")),
							"opens" : parseFloat(smr.checkNumber(rowData.openRate).toFixed("2")),
							"clicks" : parseFloat(smr.checkNumber(rowData.clickRate).toFixed("2")),
							"unsubs" : parseFloat(smr.checkNumber(rowData.unsubRate).toFixed("2")),
							"complaints" : parseFloat(smr.checkNumber(rowData.complaintRate).toFixed("2"))
					};
					
					if(smr.isConversionReportEnabledForMDR){
						resultData["conversions"] = parseFloat(smr.checkNumber(rowData.conversionRate).toFixed("2"));
						resultData["revenue"] = parseFloat(smr.checkNumber(rowData.revenuePerThousand).toFixed("2"));
					}
					
					tableData.push(resultData);
				}
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"targetSection");
			
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
			renderTableTbody.call(view,tableColumns,tableData,"","targetSection");
			
			//add the table tbody total
			if(dataList.length && dataList.length > 1){
				$e.find(".sectionMailingDetail-targetSection .targetTypeSelect").show();
				var tableTotalData = [];
				var resultDateVal;
				if(dataType == "count"){
					resultDateVal = {
							"target":"Total",
							"sent" : smr.checkNumber(dataSummary.sent),
							"failed" : smr.checkNumber(dataSummary.failed),
							"opens" : smr.checkNumber(dataSummary.opens),
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"unsubs" : smr.checkNumber(dataSummary.unsubs),
							"complaints" : smr.checkNumber(dataSummary.complaints)
					};
					
					if(smr.isConversionReportEnabledForMDR){
						resultDateVal["conversions"] =  smr.checkNumber(dataSummary.conversionCount);
						resultDateVal["revenue"] =  smr.checkNumber(dataSummary.conversionRevenue);
					}
					
					
				}else if(dataType == "percent"){
					resultDateVal = {
							"target":"Total",
							"sent" : 100,
							"failed" : 100,
							"opens" : 100,
							"clicks" : 100,
							"unsubs" : 100,
							"complaints" : 100
					};
					
					if(smr.isConversionReportEnabledForMDR){
						resultDateVal["conversions"] =  100;
						resultDateVal["revenue"] =  100;
					}
				}else{
					resultDateVal = {
							"target":"Total",
							"sent" : smr.checkNumber(dataSummary.sent),
							"failed" : parseFloat(smr.checkNumber(dataSummary.failureRate).toFixed("2")),
							"opens" : parseFloat(smr.checkNumber(dataSummary.openRate).toFixed("2")),
							"clicks" : parseFloat(smr.checkNumber(dataSummary.clickRate).toFixed("2")),
							"unsubs" : parseFloat(smr.checkNumber(dataSummary.unsubRate).toFixed("2")),
							"complaints" : parseFloat(smr.checkNumber(dataSummary.complaintRate).toFixed("2"))
					};
					
					if(smr.isConversionReportEnabledForMDR){
						resultDateVal["conversions"] =  parseFloat(smr.checkNumber(dataSummary.conversionRate).toFixed("2"));
						resultDateVal["revenue"] =  parseFloat(smr.checkNumber(dataSummary.revenuePerThousand).toFixed("2"));
					}
				}
				tableTotalData.push(resultDateVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","targetSection");
			}else{
				if(dataList.length && dataList.length==1){
					$e.find(".sectionMailingDetail-targetSection .targetTypeSelect").show();
					$e.find(".sectionMailingDetail-targetSection .targetTypeSelect input[value='percent']").hide();
					$e.find(".sectionMailingDetail-targetSection .targetTypeSelect span.targetType-percent").hide();
				}else{
					$e.find(".sectionMailingDetail-targetSection .targetTypeSelect").hide();
				}
			}
			
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
				$e.find(".sectionMailingDetail-targetSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"","targetSection");
				
				if(dataList.length && dataList.length > 1){
					renderTableTbody.call(view,tableColumns,tableTotalData,"total","targetSection");
				}
			});
		}
	}
	
	function showFailureSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $failureSection = $e.find(".sectionMailingDetail-failureSection");
		var $sectionContent = $failureSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.failureDetail == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var data = dataAll.failureDetail;
			
			var tableColumn = [
			                   {name:"block",label:"Block"},
			                   {name:"hardBounce",label:"Hard Bounce"},
			                   {name:"softBounce",label:"Soft Bounce"},
			                   {name:"technical",label:"Technical"},
			                   {name:"unknown",label:"Unknown"}
			                   ];
			
			
			for(var i = 0; i < tableColumn.length; i++){
				var row = tableColumn[i];
				var dataObj = data[row.name]
				                   
				var percentChange = smr.formatDivisionNumber(dataObj.count,data.failures)*100;
				var percentVal = parseFloat(percentChange.toFixed("2"));
				var rowData = {
						"label":row.label,
						"count":dataObj.count,
						"rate":dataObj.rate,
						"percentageOfFailure": percentVal
				};
				
				var $tr = smr.render("tmpl-failureSection-dataTable-tr",{summaryObj : rowData});
				$table.append($tr);
			}
		}
	}
	
	function showLinkSection(dataAll,linkType,dynamicContentVal){
		var view = this;
		var $e = view.$el;
		var $linkSection = $e.find(".sectionMailingDetail-linkSection");
		var $sectionContent = $linkSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		smr.isConversionReportEnabledForMDR  = dataAll.conversionReportEnabled;
		smr.conversionCurrencyForMDR = dataAll.conversionCurrency;
		
		if(!smr.isConversionReportEnabledForMDR){
			$linkSection.find(".conversionReportPart").hide();
		}else{
			$linkSection.find(".conversionReportPart").show();
		}
		
		//empty table
		$table.find("thead tr").empty();
		$table.find("tbody").empty();
		
		if(typeof dataAll == "undefined" || typeof dataAll.links == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataList = dataAll.links;
			var dataSummary = dataAll;
			
			var tableColumns = [];
			var tableData = [];
			
			if(linkType == "clicks"){
				//only select Clicks
				tableColumns.push({name:"linkName",label:"Link Name",showHoverBox:true,sortable:true,maxLength:40,ellipses:"right"});
				if(dynamicContentVal){
					tableColumns.push({name:"insertionCount",label:"Insertions",sortable:true});
				}
				tableColumns.push({name:"clicks",label:"Total Clicks",defaultSort:true,sortable:true});
				tableColumns.push({name:"uniqueClicks",label:"Unique Clicks",sortable:true});
				tableColumns.push({name:"ctr",label:"CTR",isRate:true,sortable:true});
				tableColumns.push({name:"uniqueClickPercentage",label:"% of Clicks",isRate:true,sortable:true});
				tableColumns.push({name:"bar",label:"",isBarChart:true,isRate:true});
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					var uniqueClickPercent = smr.formatDivisionNumber(rowData.uniqueClicks,dataSummary.uniqueClicks)*100;
					var uniqueClickPercentVal = parseFloat(uniqueClickPercent.toFixed("1"));
					resultData = {
							"linkName":rowData.linkName,
							"clicks" : smr.checkNumber(rowData.clicks),
							"uniqueClicks" : smr.checkNumber(rowData.uniqueClicks),
							"uniqueClickPercentage" : uniqueClickPercentVal,
							"bar" : uniqueClickPercentVal,
							"linkUrl": rowData.url
					};
					
					if(dynamicContentVal){
						var insertionCount = smr.checkNumber(rowData.insertionCount);
						if(insertionCount != 0  && insertionCount != -1){
							resultData["insertionCount"] = insertionCount;
							var ctr = smr.formatDivisionNumber(rowData.uniqueClicks,insertionCount)*100;
							resultData["ctr"] = parseFloat(ctr.toFixed("1"));
						}else{
							resultData["insertionCount"] = "N/A";
							resultData["ctr"] = "N/A";
						}
					}else{
						resultData["ctr"] = parseFloat((rowData.ctr).toFixed("1"));
					}
					
					tableData.push(resultData);
				}
			}else if(linkType == "conversions"){
				//only select Conversion
				tableColumns.push({name:"linkName",label:"Link Name",showHoverBox:true,sortable:true,maxLength:40,ellipses:"right"});
				tableColumns.push({name:"conversionCount",label:"Conversion",defaultSort:true,sortable:true});
				tableColumns.push({name:"convertToClick",label:"Convert-to-Click",isRate:true,sortable:true});
				tableColumns.push({name:"conversionRevenue",label:"Revenue",isConversionSymbol:true,sortable:true});
				tableColumns.push({name:"averageOrderValue",label:"Average Order",isConversionSymbol:true,sortable:true});
				tableColumns.push({name:"conversionPercentage",label:"% of Conversions",isRate:true,sortable:true});
				tableColumns.push({name:"bar",label:"",isBarChart:true,isRate:true});
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					var conversionPercent = smr.formatDivisionNumber(rowData.conversionCount,dataSummary.conversionCount)*100;
					var conversionPercentVal = parseFloat(conversionPercent.toFixed("1"));
					resultData = {
							"linkName":rowData.linkName,
							"conversionCount" : smr.checkNumber(rowData.conversionCount),
							"convertToClick" : parseFloat((rowData.convertToClick).toFixed("1")),
							"conversionRevenue" : smr.checkNumber(rowData.conversionRevenue),
							"averageOrderValue" : rowData.averageOrderValue>=10 ? parseFloat((rowData.averageOrderValue).toFixed("0")) : parseFloat((rowData.averageOrderValue).toFixed("2")),
							"conversionPercentage" : conversionPercentVal,
							"bar" : conversionPercentVal,
							"linkUrl": rowData.url
					};
					
					tableData.push(resultData);
				}
			}else if(linkType == "both"){
				//both select Clicks and Conversion
				tableColumns.push({name:"linkName",label:"Link Name",showHoverBox:true,sortable:true,maxLength:30,ellipses:"right"});
				if(dynamicContentVal){
					tableColumns.push({name:"insertionCount",label:"Insertions",sortable:true});
				}
				tableColumns.push({name:"clicks",label:"Total Clicks",defaultSort:true,sortable:true});
				tableColumns.push({name:"uniqueClicks",label:"Unique Clicks",sortable:true});
				tableColumns.push({name:"ctr",label:"CTR",isRate:true,sortable:true});
				tableColumns.push({name:"uniqueClickPercentage",label:"% of Clicks",isRate:true,sortable:true});
				tableColumns.push({name:"conversionCount",label:"Conversion",sortable:true});
				tableColumns.push({name:"convertToClick",label:"Convert-to-Click",isRate:true,sortable:true});
				tableColumns.push({name:"conversionRevenue",label:"Revenue",isConversionSymbol:true,sortable:true});
				tableColumns.push({name:"conversionPercentage",label:"% of Conversions",isRate:true,sortable:true});
				
				for(var i=0; i<dataList.length;i++) {
					var rowData = dataList[i];
					var resultData;
					var uniqueClickPercent = smr.formatDivisionNumber(rowData.uniqueClicks,dataSummary.uniqueClicks)*100;
					var uniqueClickPercentVal = parseFloat(uniqueClickPercent.toFixed("1"));
					var conversionPercent = smr.formatDivisionNumber(rowData.conversionCount,dataSummary.conversionCount)*100;
					var conversionPercentVal = parseFloat(conversionPercent.toFixed("1"));
					resultData = {
							"linkName":rowData.linkName,
							"clicks" : smr.checkNumber(rowData.clicks),
							"uniqueClicks" : smr.checkNumber(rowData.uniqueClicks),
							"uniqueClickPercentage" : uniqueClickPercentVal,
							"conversionCount" : smr.checkNumber(rowData.conversionCount),
							"convertToClick" : parseFloat((rowData.convertToClick).toFixed("1")),
							"conversionRevenue" : smr.checkNumber(rowData.conversionRevenue),
							"conversionPercentage" : conversionPercentVal,
							"linkUrl": rowData.url
					};
					
					if(dynamicContentVal){
						var insertionCount = smr.checkNumber(rowData.insertionCount);
						if(insertionCount != 0  && insertionCount != -1){
							resultData["insertionCount"] = insertionCount;
							var ctr = smr.formatDivisionNumber(rowData.uniqueClicks,insertionCount)*100;
							resultData["ctr"] = parseFloat(ctr.toFixed("1"));
						}else{
							resultData["insertionCount"] = "N/A";
							resultData["ctr"] = "N/A";
						}
					}else{
						resultData["ctr"] = parseFloat((rowData.ctr).toFixed("1"));
					}
					
					tableData.push(resultData);
				}
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"linkSection");
			
			// sort defaultColumn
			for(var i=0; i<tableColumns.length;i++){
				var column = tableColumns[i];
				if(column.defaultSort){
					var columnName = column.name;
					sortByDefault(tableData,columnName,false);
					break;
				}
			}
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","linkSection");
			
			//add the table tbody total
			if(dataList.length && dataList.length>1){
				var tableTotalData = [];
				var resultDataVal;
				if(linkType == "clicks"){
					resultDataVal = {
							"linkName": "Total",
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"uniqueClicks" : smr.checkNumber(dataSummary.uniqueClicks),
							"uniqueClickPercentage" : (dataList.length > 0) ? 100.0 : 0
					};
					if(dynamicContentVal){
						var insertionCount = smr.checkNumber(dataSummary.insertionCount);
						if(insertionCount != 0  && insertionCount != -1){
							resultDataVal["insertionCount"] = insertionCount;
							var ctr = smr.formatDivisionNumber(dataSummary.uniqueClicks,insertionCount)*100;
							resultDataVal["ctr"] = parseFloat(ctr.toFixed("1"));
						}else{
							resultDataVal["insertionCount"] = "N/A";
							resultDataVal["ctr"] = "N/A";
						}
					}else{
						resultDataVal["ctr"] = parseFloat((dataSummary.ctr).toFixed("1"));
					}
				}else if(linkType =="conversions"){
					resultDataVal = {
							"linkName": "Total",
							"conversionCount" : smr.checkNumber(dataSummary.conversionCount),
							"convertToClick" : parseFloat((dataSummary.convertToClick).toFixed("1")),
							"conversionRevenue" : smr.checkNumber(dataSummary.conversionRevenue),
							"averageOrderValue" : dataSummary.averageOrderValue>=10 ? parseFloat((dataSummary.averageOrderValue).toFixed("0")) : parseFloat((dataSummary.averageOrderValue).toFixed("2")),
							"conversionPercentage" :(dataList.length > 0) ? 100.0 : 0
					};
				}else if(linkType == "both"){
					resultDataVal = {
							"linkName": "Total",
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"uniqueClicks" : smr.checkNumber(dataSummary.uniqueClicks),
							"uniqueClickPercentage" : (dataList.length > 0) ? 100.0 : 0,
							"conversionCount" : smr.checkNumber(dataSummary.conversionCount),
							"convertToClick" : parseFloat((dataSummary.convertToClick).toFixed("1")),
							"conversionRevenue" : smr.checkNumber(dataSummary.conversionRevenue),
							"conversionPercentage" : (dataList.length > 0) ? 100.0 : 0
					};
					
					if(dynamicContentVal){
						var insertionCount = smr.checkNumber(dataSummary.insertionCount);
						if(insertionCount != 0  && insertionCount != -1){
							resultDataVal["insertionCount"] = insertionCount;
							var ctr = smr.formatDivisionNumber(dataSummary.uniqueClicks,insertionCount)*100;
							resultDataVal["ctr"] = parseFloat(ctr.toFixed("1"));
						}else{
							resultDataVal["insertionCount"] = "N/A";
							resultDataVal["ctr"] = "N/A";
						}
					}else{
						resultDataVal["ctr"] = parseFloat((dataSummary.ctr).toFixed("1"));
					}
				}
				tableTotalData.push(resultDataVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","linkSection");
			}
			
			//first undelegate the event
			$table.undelegate("thead th.sortable","click");
			$table.undelegate("td.showhover","mouseover");
			$e.undelegate(".linkHoverBoxContainer","mouseout");
			$e.undelegate(".linkHoverBoxContainer","click");
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
				$e.find(".sectionMailingDetail-linkSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"","linkSection");
				
				if(dataList.length && dataList.length>1){
					renderTableTbody.call(view,tableColumns,tableTotalData,"total","linkSection");
				}
			});
			
			$table.delegate("td.showhover","mouseover",function(event){
				var $this = $(this);
			    var $thisparent = $this.closest(".showhover");
			    var linkName = $thisparent.attr("data-name");
			    var linkUrl = $thisparent.attr("data-value");
			    var dataObj = {
			    		name:linkName,
			    		linkUrl:linkUrl
			    };
			    var html = smr.render("tmpl-linkSection-table-td-hover",dataObj);
			    $container = $e.find(".linkHoverBoxContainer");
			    $container.css("min-width",$thisparent.width()+25);
			    $container.append(html);
			    var offset = $e.closest(".smr.report").offset() ;
			    var thisSpanOffset = $(this).offset();
			    var IE7offsetX = 0;
			    $container.css({left:(thisSpanOffset.left - offset.left)-IE7offsetX , top:thisSpanOffset.top-offset.top-25});
			    $container.show();
			});
			
			$e.delegate(".linkHoverBoxContainer","mouseleave",function(event){
				var $this = $(this);
				$this.empty();
				$this.hide();
			});
			
			$e.delegate(".linkHoverBoxContainer","click",function(event){
				var $this = $(this);
				$this.empty();
				$this.hide();
			});
		}
	}
	
	function showShareSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $summarySection = $e.find(".sectionMailingDetail-shareSection .statsSummaryItems");
		
		if(typeof dataAll == "undefined" || typeof dataAll.sharePerformance == "undefined"){
			$summarySection.html("");
			$summarySection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll.sharePerformance;
			var offerDataList = dataAll.sharePerformance.shareOffers;
			
			//display the Summary Statistic Section
			var summaryStats = [
						{name:"sharePanelViews",label:"Share Panel Views",value:smr.checkNumber(dataSummary.sharePanelViews)},
						{name:"clicks",label:"Clicks",value:smr.checkNumber(dataSummary.clicks)},
						{name:"clickRate",label:"Click Rate",value:smr.checkNumber(dataSummary.clickRate),isRate:true}
		  			];
			
			for (var i = 0; i < summaryStats.length; i++) {
				var obj = summaryStats[i];
				var name = obj.name;
				var label = obj.label;
				var value = obj.value;
				
				var isFirst = false;
				var isLeftSpace = false;
				if(i == 0 || i == 1){
					isFirst = true;
					if(i != 0){
						isLeftSpace = true;
					}
				}else{
					isFirst = false;
					isLeftSpace = false;
				}
				
				var haveRightRadius = false;
				if(i == 0){
					haveRightRadius = true;
				}
				
				var isRate = false;
				if(obj.isRate){
					isRate = true;
					value = parseFloat(value.toFixed("1"));
				}else{
					isRate = false;
					value = smr.formatNumber(value);
				}
				
				$summarySection.append(smr.render("tmpl-statistic-dataItem",{
						"name":name,
						"label":label,
						"val":value,
						"isFirst":isFirst,
						"isRate":isRate,
						"isLeftSpace":isLeftSpace,
						"conversionCurrencyForMDR":smr.conversionCurrencyForMDR,
						"haveRightRadius":haveRightRadius
					})
				);
			}
			
			//display the Share Offers Performance
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"offerName",label:"Offer"});
			tableColumns.push({name:"shares",label:"Shares"});
			tableColumns.push({name:"offerSharesPercent",label:"%",isRate:true});
			tableColumns.push({name:"offerSharesPercentBar",label:"",isBarChart:true,isRate:true});
			tableColumns.push({name:"clicks",label:"Clicks"});
			tableColumns.push({name:"offerClicksPercent",label:"%",isRate:true});
			tableColumns.push({name:"offerClicksPercentBar",label:"",isBarChart:true,isRate:true});
				
			for(var i=0; i<offerDataList.length;i++) {
				var rowData = offerDataList[i];
				var resultData;
				var offerSharesPercent = smr.formatDivisionNumber(rowData.shares,dataSummary.shares)*100;
				var offerSharesPercentVal = parseFloat(offerSharesPercent.toFixed("1"));
				var offerClicksPercent = smr.formatDivisionNumber(rowData.clicks,dataSummary.clicks)*100;
				var offerClicksPercentVal = parseFloat(offerClicksPercent.toFixed("1"));
				resultData = {
						"offerName":rowData.offerName,
						"shares" : smr.checkNumber(rowData.shares),
						"offerSharesPercent" :offerSharesPercentVal,
						"offerSharesPercentBar" : offerSharesPercentVal,
						"clicks" : smr.checkNumber(rowData.clicks),
						"offerClicksPercent" : offerClicksPercentVal,
						"offerClicksPercentBar" : offerClicksPercentVal
				};
					
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"shareOfferSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","shareOfferSection");
			
			if(offerDataList.length && offerDataList.length>1){
				//add the table tbody total
				var tableTotalData = [];
				var resultDataVal;
				resultDataVal = {
						"offerName":"Total",
						"shares" : smr.checkNumber(dataSummary.shares),
						"offerSharesPercent" : (offerDataList.length > 0) ? 100.0 : 0,
								"clicks" : smr.checkNumber(dataSummary.clicks),
								"offerClicksPercent" : (offerDataList.length > 0) ? 100.0 : 0
				};
				tableTotalData.push(resultDataVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","shareOfferSection");
			}
			
		}
	}
	
	function showFTAFSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $summarySection = $e.find(".sectionMailingDetail-ftafSection .statsSummaryItems");
		
		if(typeof dataAll == "undefined" || typeof dataAll.FTAFPerformance == "undefined"){
			$summarySection.html("");
			$summarySection.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll.FTAFPerformance;
			
			//display the Summary Statistic Section
			var summaryStats = [
						{name:"forwards",label:"Forwarders",value:smr.checkNumber(dataSummary.forwards)},
						{name:"messagesSent",label:"Messages Sent",value:smr.checkNumber(dataSummary.messagesSent)},
						{name:"opens",label:"Opens",value:smr.checkNumber(dataSummary.opens)},
						{name:"openRate",label:"Open Rate",value:smr.checkNumber(dataSummary.openRate),isRate:true},
						{name:"clicks",label:"Clicks",value:smr.checkNumber(dataSummary.clicks)},
						{name:"clickRate",label:"Click Rate",value:smr.checkNumber(dataSummary.clickRate),isRate:true}
		  			];
			
			for (var i = 0; i < summaryStats.length; i++) {
				var obj = summaryStats[i];
				var name = obj.name;
				var label = obj.label;
				var value = obj.value;
				
				var isFirst = false;
				var isLeftSpace = false;
				if(i%2 == 0){
					isFirst = true;
					if(i != 0){
						isLeftSpace = true;
					}
				}else{
					isFirst = false;
					isLeftSpace = false;
				}
				
				var isRate = false;
				if(obj.isRate){
					isRate = true;
					value = parseFloat(value.toFixed("2"));
				}else{
					isRate = false;
					value = smr.formatNumber(value);
				}
				
				$summarySection.append(smr.render("tmpl-statistic-dataItem",{
						"name":name,
						"label":label,
						"val":value,
						"isFirst":isFirst,
						"isRate":isRate,
						"conversionCurrencyForMDR":smr.conversionCurrencyForMDR,
						"isLeftSpace":isLeftSpace
					})
				);
			}
		}
	}
	
	
	function showDeviceUsageSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $deviceUsageSection = $e.find(".sectionMailingDetail-deviceUsageSection");
		var $sectionContent = $deviceUsageSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined"){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataSummary = dataAll;
			var dataList = dataAll.data;
			
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"deviceType",label:"Device Type"});
			tableColumns.push({name:"opens",label:"Opens"});
			tableColumns.push({name:"opensPercent",label:"%",isRate:true,isBarAndValue:true});
			tableColumns.push({name:"clicks",label:"Clicks"});
			tableColumns.push({name:"clicksPercent",label:"%",isRate:true,isBarAndValue:true});
			tableColumns.push({name:"clickToOpen",label:"Click-to-Open",isRate:true});
				
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				var opensPercent = smr.formatDivisionNumber(rowData.opens,dataSummary.opens)*100;
				var opensPercentVal = parseFloat(opensPercent.toFixed("1"));
				var clicksPercent = smr.formatDivisionNumber(rowData.clicks,dataSummary.clicks)*100;
				var clicksPercentVal = parseFloat(clicksPercent.toFixed("1"));
				resultData = {
						"deviceType":rowData.deviceType,
						"opens" : smr.checkNumber(rowData.opens),
						"opensPercent" :opensPercentVal,
						"clicks" : smr.checkNumber(rowData.clicks),
						"clicksPercent" : clicksPercentVal,
						"clickToOpen" : smr.checkNumber(rowData.clickToOpen)
				};
					
				tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"deviceUsageSection");
			
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","deviceUsageSection");
			

			//add the table tbody total
			if(dataList.length && dataList.length>1){
				var tableTotalData = [];
				var resultDataVal = {
							"deviceType":"Total",
							"opens" : smr.checkNumber(dataSummary.opens),
							"opensPercent" : (dataList.length > 0) ? 100.0 : 0,
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"clicksPercent" : (dataList.length > 0) ? 100.0 : 0,
							"clickToOpen" : smr.checkNumber(dataSummary.clickToOpen)
					};
				tableTotalData.push(resultDataVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","deviceUsageSection");
			}
		}
	}
	
	
	function renderTableThead(tableColumns,sectionType){
		var view = this;
		var $e = view.$el;
		var $table;
		if(sectionType == "linkSection"){
			$table = $e.find(".sectionMailingDetail-linkSection .sectionContent .dataTable");
		}else if(sectionType == "targetSection"){
			$table = $e.find(".sectionMailingDetail-targetSection .sectionContent .dataTable");
		}else if(sectionType == "shareOfferSection"){
			$table = $e.find(".sectionMailingDetail-shareSection .sectionContent .shareOffersSectionTable .dataTable");
		}else if(sectionType == "shareChannelSection"){
			$table = $e.find(".sectionMailingDetail-shareSection .sectionContent .shareChannelSectionTable .dataTable");
		}else if(sectionType == "deviceUsageSection"){
			$table = $e.find(".sectionMailingDetail-deviceUsageSection .sectionContent .dataTable");
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
			
			var tableThead = smr.render("tmpl-sectionContent-dataTable-tableThead",{
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
		if(sectionType == "linkSection"){
			$tbody = $e.find(".sectionMailingDetail-linkSection .sectionContent .dataTable tbody");
		}else if(sectionType == "targetSection"){
			$tbody = $e.find(".sectionMailingDetail-targetSection .sectionContent .dataTable tbody");
		}else if(sectionType == "shareOfferSection"){
			$tbody = $e.find(".sectionMailingDetail-shareSection .sectionContent .shareOffersSectionTable .dataTable tbody");
		}else if(sectionType == "shareChannelSection"){
			$tbody = $e.find(".sectionMailingDetail-shareSection .sectionContent .shareChannelSectionTable .dataTable tbody");
		}else if(sectionType == "deviceUsageSection"){
			$tbody = $e.find(".sectionMailingDetail-deviceUsageSection .sectionContent .dataTable tbody");
		}
		
		if(type == "total"){
			var tableTbody = smr.render("tmpl-sectionContent-dataTable-tableTbody",{});
			var $thisTr = $(tableTbody);
			$thisTr.append("<td class='noBorder' colspan='"+tableColumns.length+"'></td>");
			$tbody.append($thisTr);
		}
		
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-sectionContent-dataTable-tableTbody",{});
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
					var isBarChart = false;
					var columnTitle  = "";
					var showHoverBox = false;
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
					
					if (typeof column.isConversionSymbol != "undefined") {
						isConversionSymbol = column.isConversionSymbol;
					}
					
					if(k == 0){
						first = "first";
					}
					
					//check whether display as a bar
					if (typeof column.isBarChart != "undefined") {
						isBarChart = column.isBarChart;
					}
					
					if(typeof column.isBarAndValue != 'undefined'){
						isBarAndValue = column.isBarAndValue;
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
					var linkUrl = "";
					if(showHoverBox){
						linkUrl = obj["linkUrl"];	
					}
					
					if(haveTitle){
						columnTitle = obj[columnName + " Title"];	
					}
					
					value = obj[columnName];
					
					if(columnName != "linkName" && columnName != "offerName" && columnName != "target" && columnName != "deviceType"){
						value = smr.formatNumber(value);
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
					
					var tableTbodyTd = smr.render("tmpl-sectionContent-dataTable-tableTbody-td",{
						"first":first,
						"value":value,
						"isRate":isRate,
						"isBarChart":isBarChart,
						"haveTitle":haveTitle,
						"columnTitle":columnTitle,
						"linkUrl":linkUrl,
						"showHoverBox":showHoverBox,
						"isBarAndValue":isBarAndValue,
						"isTotalColumn":isTotalColumn,
						"isConversionSymbol":isConversionSymbol,
						"conversionCurrencyForMDR":smr.conversionCurrencyForMDR,
						"isLastRow":isLastRow
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
	brite.registerView("sectionMailingDetail",{
		emptyParent: true
	},function(){
		return new smr.SectionMailingDetail();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
