var smr = smr || {};

(function($){

	smr.isConversionReportEnabledForMDR = true;
	smr.conversionCurrencyForMDR = "$";
	// --------- Component Interface Implementation ---------- //
	function PrintMailingDetail(){};
	smr.PrintMailingDetail = PrintMailingDetail; 
	
	PrintMailingDetail.prototype.create = function(data,config){
		return smr.render("tmpl-sectionMailingDetail",data.opts);
	}
		
	PrintMailingDetail.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		view.reportType = smr.REPORT_TYPE.MAILINGDETAIL;
		view.targetDataType = data.opts.targetType || "rate";
		view.linkType = data.opts.linkType || "clicks";
		view.loadingType={"Summary":false,"MailingDetail":false,"LinkPerformance":false};
		
		showView.call(view,data.opts);
	}
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	PrintMailingDetail.prototype.getAllData = function(type,subType){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = view.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();

		smr.getMailingDetailSummary(view.reportType,type,this.isNewRequest,subType).done(function(data){
			view.loadingType[type] = true;
			var dataSet = {};
			if(data.items != null){
				dataSet = data.items[0];
			}
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
	function showView(data){
		var view = this;
		var $e = view.$el; 
		var targetDataType = view.targetDataType;
		var linkType = view.linkType;

		//clean first
		$e.bEmpty();
		html = smr.render("tmpl-sectionMailingDetail",data);
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
				smr.isConversionReportEnabledForMDR  = dataAll.conversionReportEnabled;
				smr.conversionCurrencyForMDR = dataAll.conversionCurrency;
				
				showLinkSection.call(view,dataAll,linkType);
			});
			
			registerEvent.call(view);
		}
	}
	
	function registerEvent(){
		var view = this;
		var $e = view.$el;
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
						{name:"sent",label:"Sent",value:smr.checkNumber(dataSummary.sent)},
						{name:"delivered",label:"Deliverability",value:smr.checkNumber(dataSummary.deliverability),isRate:true},
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
						"isShowHover":isShowHover
					})
				);
			}
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
						{name:"sent",label:"Sent",value:smr.checkNumber(dataSummary.sent)},
						{name:"delivered",label:"Deliverability",value:smr.checkNumber(dataSummary.deliverability),isRate:true},
						{name:"opens",label:"Opens",value:smr.checkNumber(dataSummary.uniqueOpens),isShowHover:true},
						{name:"opensRate",label:"Open Rate",value:smr.checkNumber(dataSummary.uniqueOpenRate),isRate:true,isShowHover:true},
						{name:"clicks",label:"Clicks",value:smr.checkNumber(dataSummary.uniqueClicks),isShowHover:true},
						{name:"clicksRate",label:"Click Rate",value:smr.checkNumber(dataSummary.uniqueClickRate),isRate:true,isShowHover:true},
						{name:"complaints",label:"Complaints",value:smr.checkNumber(dataSummary.uniqueComplaints),isShowHover:true}
		  			];
			}else{
				var summaryStats = [
						{name:"sent",label:"Sent",value:smr.checkNumber(dataSummary.sent)},
						{name:"delivered",label:"Deliverability",value:smr.checkNumber(dataSummary.deliverability),isRate:true},
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
					changeVal = smr.formatDivisionNumber((mailingVal - campaignVal),campaignVal);
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
				
				var $tr = smr.render("tmpl-mailingVSCampaignAveragesSection-dataTable-tr",{summaryObj :rowData, conversionCurrencyForMDR:smr.conversionCurrencyForMDR});
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
			$e.find(".sectionMailingDetail-targetSection .targetTypeSelect span[data-value!='"+dataType+"']").hide();
			$e.find(".sectionMailingDetail-targetSection .targetTypeSelect input").hide();
			if(dataList.length && dataList.length > 1){
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
			}
			
			//first undelegate the event
			$table.find("thead th.sortable").each(function(){
				var $th = $(this);
				$th.css("width",$th.width());
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
	
	function showLinkSection(dataAll,linkType){
		var view = this;
		var $e = view.$el;
		var $linkSection = $e.find(".sectionMailingDetail-linkSection");
		var $sectionContent = $linkSection.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		
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
							"ctr" : parseFloat((rowData.ctr).toFixed("1")),
							"uniqueClickPercentage" : uniqueClickPercentVal,
							"bar" : uniqueClickPercentVal,
							"linkUrl": rowData.url
					};
					
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
							"ctr" : parseFloat((rowData.ctr).toFixed("1")),
							"uniqueClickPercentage" : uniqueClickPercentVal,
							"conversionCount" : smr.checkNumber(rowData.conversionCount),
							"convertToClick" : parseFloat((rowData.convertToClick).toFixed("1")),
							"conversionRevenue" : smr.checkNumber(rowData.conversionRevenue),
							"conversionPercentage" : conversionPercentVal,
							"linkUrl": rowData.url
					};
					
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
			if(dataList.length && dataList.length>1){
				//add the table tbody total
				var tableTotalData = [];
				var resultDataVal;
				if(linkType == "clicks"){
					resultDataVal = {
							"linkName": "Total",
							"clicks" : smr.checkNumber(dataSummary.clicks),
							"uniqueClicks" : smr.checkNumber(dataSummary.uniqueClicks),
							"ctr" : parseFloat((dataSummary.ctr).toFixed("1")),
							"uniqueClickPercentage" : (dataList.length > 0) ? 100.0 : 0
					};
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
							"ctr" : parseFloat((dataSummary.ctr).toFixed("1")),
							"uniqueClickPercentage" : (dataList.length > 0) ? 100.0 : 0,
							"conversionCount" : smr.checkNumber(dataSummary.conversionCount),
							"convertToClick" : parseFloat((dataSummary.convertToClick).toFixed("1")),
							"conversionRevenue" : smr.checkNumber(dataSummary.conversionRevenue),
							"conversionPercentage" : (dataList.length > 0) ? 100.0 : 0
					};
				}
				tableTotalData.push(resultDataVal);
				renderTableTbody.call(view,tableColumns,tableTotalData,"total","linkSection");
			}
			
			$e.find(".sectionMailingDetail-linkSection .linkTypeSelect span[data-value!='"+linkType+"']").hide();
			$e.find(".sectionMailingDetail-linkSection .linkTypeSelect input").hide();
			
			
			$table.find("thead th.sortable").each(function(){
				var $th = $(this);
				$th.css("width",$th.width());
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
					
					if(columnName != "linkName" && columnName != "offerName" && columnName != "target"){
						value = smr.formatNumber(value);
					}
					
					if (typeof column.maxLength != "undefined") {
						var maxSize = column.maxLength;
						if(value.length > maxSize){
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
	brite.registerView("printMailingDetail",{
		emptyParent: true
	},function(){
		return new smr.PrintMailingDetail();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
