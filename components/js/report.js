var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _sectionConfigs = {
		"sectionOverview":{
			defaultView:"summary",
			views:{
				summary:{
					toolbar:{
						showExport:true,
						showPrint:true
					}
				},
				table:{
					toolbar:{
						showBreakdown:true,
						showViewRates:true,
						showExport:true,
						showPrint:true
					}
				},
				pie:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				bar:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				pivot:{
					toolbar:{
						showViewRates:true,
						showExport:true,
						showPrint:true
					}
				}
			}
		},
		"sectionVolume":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showExport:true,
				showPrint:true
			},
			views:{
				table:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				pie:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				bar:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				pivot:{
					toolbar:{
						showExport:true,
						showPrint:true
					}
				}
			}
		},
		"sectionEngagement":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showUniqueStats:true,
				showExport:true,
				showPrint:true
			},
			views:{
				table:true,
				pie:true,
				bar:true,
				pivot:{
					toolbar:{
						showUniqueStats:true,
						showExport:true,
						showPrint:true
					}
				}
			}
		},
		"sectionDisEngagement":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showExport:true,
				showPrint:true
			},
			views:{
				table:true,
				pie:true,
				bar:true,
				pivot:{
					toolbar:{
						showExport:true,
						showPrint:true
					}
				}
			}
		},
		"sectionSharing":{
			defaultView:"table",
			views:{
				table:{
					toolbar:{
						showBreakdown:true,
						showSubSection:true,
						showExport:true,
						showPrint:true
					}
				},
				pie:{
					toolbar:{
						showBreakdown:true,
						showSubSection:true,
						showExport:true,
						showPrint:true
					}
				},
				bar:{
					toolbar:{
						showBreakdown:true,
						showSubSection:true,
						showExport:true,
						showPrint:true
					}
				}
				/* 2013-06-12  hide the pivot in Sharing section
				,pivot:{
					toolbar:{
						showSubSection:true,
						showExport:true,
						showPrint:true
					}
				}
				*/
			}
		},
		"sectionFailures":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showExport:true,
				showPrint:true
			},
			views:{
				table:{
					toolbar:{
						showBreakdown:true,
						showViewRates:true,
						showExport:true,
						showPrint:true
					}
				},
				pie:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				bar:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showPrint:true
					}
				},
				pivot:{
					toolbar:{
						showViewRates:true,
						showExport:true,
						showPrint:true
					}
				}
			}
		},
		"sectionLinks":{
			defaultView:"table",
			defaultToolbar:{
				showExport:true,
				showSubSection: true,
				showPrint:true
			},
			views:{
				table:true,
				pie:true,
				bar:true
			}
		},
		"sectionConversions":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showExport:true,
				showPrint:true
			},
			views:{
				table:true,
				pie:true,
				bar:true,
				pivot:{
					toolbar:{
						showExport:true,
						showPrint:true
					}
				}
			}
		},
		"sectionComparison":{
			defaultView:"summary",
			defaultToolbar:{
				showViewRates:true,
				showExport:true,
				showPrint:true
			},
			views:{
				summary:true
			}
		},
		"sectionTrends":{
			defaultView:"summary",
			defaultToolbar:{
				showExport:true,
				showPrint:true
			},
			views:{
				summary:true
			}
 		},
 		"sectionDeliverabilityOverview":{
			defaultView:"summary",
			defaultToolbar:{
				showExport:true
			},
			views:{
				summary:true
			}
		},
		"sectionDefers":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showExport:true
			},
			views:{
				table:true,
				pie:true,
				bar:true
			}
		},
		"sectionEvents":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true,
				showExport:true
			},
			views:{
				table:true,
				pie:true,
				bar:true
			}
		},
		"sectionSMS":{
			defaultView:"summary",
			defaultToolbar:{
				showExport:true,
				showPrint:true
			},
			views:{
				summary:true,
				table:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showSubSection:true,
						showPrint:true
					}
				},
				pie:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showSubSection:true,
						showPrint:true
					}
				},
				bar:{
					toolbar:{
						showBreakdown:true,
						showExport:true,
						showSubSection:true,
						showPrint:true
				    }
				}
			}
 		},
		"sectionDomainDrilldown":{
			defaultView:"table",
			defaultToolbar:{
				showBreakdown:true
			},
			views:{
				table:true,
				pie:true,
				bar:true
			}
		},
 		"sectionAudienceOverview":{
			defaultView:"summary",
			views:{
				summary:{
					toolbar:{
						showExport:true
					}
				},
				table:{
					toolbar:{
						showBreakdown:true,
						showExport:true
					}
				},
				pie:{
					toolbar:{
						showBreakdown:true,
						showExport:true
					}
				},
				bar:{
					toolbar:{
						showBreakdown:true,
						showExport:true
					}
				}
			}
		},
		"sectionUserInsightOverview":{
			defaultView:"summary",
			defaultToolbar:{
				showViewRates:true,
				showExport:false,
				showPrint:false,
				showDateSelector:true,
				showOptions:true
			},
			views:{
				summary:true
			}
		},
		"sectionEmails":{
			defaultView:"summary",
			defaultToolbar:{
				showViewRates:true,
				showExport:false,
				showPrint:false,
				showDateSelector:true
			},
			views:{
				summary:true
			}
		}
	};
	// --------- /Component Private Properties --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("report",{
		},{
			
		create: function(data,config){
			var view = this;
			data = data || {};
			view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
			return smr.render("tmpl-report",{reportType:view.reportType});
		},
		
		postDisplay: function(data,config){
			var view = this;
			var $e = view.$el;
			data = data || {};
			var reportSection = data.reportSection || "sectionOverview";
			var reportType = view.reportType;
			view.mailingIds = data.mailingIds;
			view.mailingType = data.mailingType;
			view.viewName = data.viewName;
			view.breakDownBy = data.breakDownBy;
			view.startDate = data.startDate;
			view.endDate = data.endDate; 
			
			view.fromReportType = data.fromReportType; 
			view.domainName = data.domainName; 
			
			//pass fromReportType to the url for Domain DrillDown
			var opts = {
					fromReportType: view.fromReportType,
					domainName: view.domainName
			}
			
			//to check whether from left nav for MailingDetail Report
			if(view.mailingType == "mailingDetail" && view.mailingIds && view.mailingIds.length > 0){
				opts.fromLeftNav = false;
			}else{
				opts.fromLeftNav = true;
			}
			if(reportType==smr.REPORT_TYPE.AUDIENCE){
				if(view.mailingType == "audience" ){
					opts.fromLeftNav = false;
				}else{
					var set = smr.getSetAndType(view.reportType,"main").set;
					set.clear();
					opts.fromLeftNav = true;
				}
			}
			
			//pass the programMailingIds only for failure section
			if(typeof data.programMailingIds != "undefined" && data.programMailingIds != null){
				opts.programMailingIds = data.programMailingIds;
			}
			
			var $reportHeaderCtn = $e.find(".report-header");
			brite.display("reportHeader",$reportHeaderCtn,{"type":reportType,breakDownBy:view.breakDownBy,"domainName":view.domainName}).done(function(reportHeader){
				view.reportHeader = reportHeader;
				
				//select a default section and default view
				view.setSectionAndView(reportSection, $e.find(".reportHeader-nav-item[data-section='"+reportSection+"']"), opts, true);
				
				$e.delegate(".reportHeader-nav-item","click",function(){
					var $item = $(this);
					var section = $item.attr("data-section");
					opts.fromLeftNav=false;
					view.setSectionAndView(section,$item,opts);
				});
			});
		},
		
		setSectionAndView: function(section,$item,opts,isNewRequest){
			var view = this;
			var $e = view.$el;
			var $reportContentCtn = $e.find(".report-content");
			var $reportHeader = $e.find(".report-header .reportHeader");
			reportHeader = view.reportHeader;
			var reportType = view.reportType;
			var viewName = view.viewName;
			// set default section,By default show overview
			section = section;
			//set default view,By default show summary
			var sectionConfig = _sectionConfigs[section];
			var viewStr = "summary";
			if(typeof viewName!="undefined" && viewName != null && viewName != ""){
				viewStr = viewName;
			}else {
				if(sectionConfig){
					if(sectionConfig.defaultView){
						viewStr = sectionConfig.defaultView;
					}
			     }
			}

			//overview the reportHeader font style is different
			if(viewStr == "summary" && section != "sectionComparison" && section != "sectionTrends" && section != "sectionDeliverabilityDomains"){
				if(section == "sectionMailingDetail"){
					$e.find(".report-header .reportHeader .reportHeader-reportName").css("font-size","10.25pt");
					$e.find(".report-header .reportHeader .reportHeader-mailingSelector").css("font-size","10.25pt");
				}else{
					$e.find(".report-header .reportHeader .reportHeader-reportName").css("font-size","11pt");
					$e.find(".report-header .reportHeader .reportHeader-mailingSelector").css("font-size","11pt");
				}
				var $reportHeaderTop = $e.find(".report-header .reportHeader .reportHeader-top");
				$reportHeaderTop.css("margin-top","4px");
				if(smr.isMock()){
					$reportHeaderTop.css("margin-bottom","0px");
				}else{
					$reportHeaderTop.css("margin-bottom","8px");
				}
			}else{
				$e.find(".report-header .reportHeader .reportHeader-reportName").css("font-size","11.5pt");
				$e.find(".report-header .reportHeader .reportHeader-mailingSelector").css("font-size","11.5pt");
				$e.find(".report-header .reportHeader .edit").css("margin-top","0px");
			}
			var $reportHeaderTop = $e.find(".report-header .reportHeader .reportHeader-top");
			$reportHeaderTop.css("margin-top","4px");
			if(smr.isMock()){
				$reportHeaderTop.css("margin-bottom","4px");
			}else{
				$reportHeaderTop.css("margin-bottom","3px");
			}
				
			if(typeof $item == "undefined" || $item == null){
				$item = $e.find(".reportHeader-nav-item[data-section='"+section+"']");
			}
			reportHeader.setView(viewStr,section,sectionConfig);

			if (section){
				$item.parent().children().removeClass("sel");
				$item.parent().find("canvas").remove();
				$item.addClass("sel");
				if(brite.ua.hasCanvas()){
					if($item.size()>0){
						smr.drawNotch($item); 
					}
				}
				$reportHeader.trigger("reportHeaderSectionChange",{section:section});
				
				if(reportType == "userInsight"){
					var mailingSet = smr.getUserInsightSet(reportType,"main");
					mailingSet.attr("limit",true);
					$reportHeader.trigger("reportHeaderMailingSelectorChange");
					brite.display(section,$reportContentCtn,{view:viewStr,reportType:reportType,opts:opts,isNewRequest:isNewRequest});
				}else{
					getMailings.call(view).done(function(){
						$reportHeader.trigger("reportHeaderMailingSelectorChange");
						brite.display(section,$reportContentCtn,{view:viewStr,reportType:reportType,opts:opts,isNewRequest:isNewRequest});
					});
				}
				
				
				if(reportType != smr.REPORT_TYPE.DOMAINDRILLDOWN){
					//save report type and section
					smr.state("report","reportType",reportType);
					smr.state("report","section",section);
				}
			}else{
				alert("Section [" + $item.text() + "] not supported yet");
			}
		}
		
	});	
	// --------- /Component Registration --------- //
	
		// --------- Helper Functions --------- //
	function getMailings(){
		var view = this;
		var reportType = view.reportType;
		// When there are no mailing/programs/campaigns selected, we need to automatically select the last 30 days, and show them.
		var innerDfd = $.Deferred();
		var dfd = $.Deferred();
		var setType = smr.getSetAndType(reportType,"main");
		// get mailingIds params
		var mailingIds = view.mailingIds;
		var mailingType = view.mailingType;
		//startDate,endDate
		var startDate = view.startDate;
		var endDate = view.endDate; 
		var period  = null;
		var dateType = "inCustomDateRange";
		var includeSubOrg = setType.set.attr("includeSubOrg");

		//when have startDate and endDate, should use these
		
		if(startDate != null && endDate != null){
			if(smr.campaginOverViewMiddleDateType){
				dateType = (new String(smr.campaginOverViewMiddleDateType))+"";
			}
			period = smr.buildPeriod(dateType,startDate,endDate);
			smr.campaginOverViewMiddleDateType = null;
		}		
		
		if(mailingIds && mailingIds.length>0){
			var mailingSet = null;
			if(mailingType == "campaign"){
				mailingSet = smr.getCampaignSet(reportType,"main");
				smr.setDefaultSet(reportType,"main","campaign");
			}else if(mailingType == "program"){
				mailingSet = smr.getProgramSet(reportType,"main");
				smr.setDefaultSet(reportType,"main","program");
			}else if(mailingType == "mailingDetail"){
				mailingSet = smr.getMailingDetailSet(reportType,"main");
				smr.setDefaultSet(reportType,"main","mailingDetail");
			}else if(mailingType == "ABTest"){
				mailingSet = smr.getABTestSet(reportType,"main");
				smr.setDefaultSet(reportType,"main","ABTest");
			}else{
				mailingSet = smr.getMailingSet(reportType,"main");
				smr.setDefaultSet(reportType,"main","mailing");
			}
			if(startDate != null && endDate != null){
				mailingSet.period(period);
			} 
			if(smr.campaginOverViewMiddleinAchive != null){
				mailingSet.attr("includeArchive",smr.campaginOverViewMiddleinAchive);
				smr.campaginOverViewMiddleinAchive =null;
			}
			mailingSet.clear();

			if(mailingType == "program"){
				smr.getProgramsForFilterBox(null,null,null,null,mailingIds,includeSubOrg).done(function(data){
					innerDfd.resolve(data.items);
				});
			}else if(mailingType == "campaign"){
				smr.getCampaignsForFilterBox(null,null,null,null,reportType,includeSubOrg).done(function(data){
					var items = data.items;
					var newItems = [];
					for(var i = 0; i <items.length ; i++ ){
						for(var k in mailingIds){
							if(mailingIds[k]==items[i].id){
								newItems.push({id:items[i].id , name:items[i].campaign});
							}
						}
					}
					innerDfd.resolve(newItems);
				});
			}else if(mailingType == "mailingDetail"){
				smr.getMailingDetailsForFilterBox(reportType,null,null,true,"all",mailingIds[0]).done(function(data){
					innerDfd.resolve(data.items);
				});
			}else if(mailingType == "ABTest"){
				smr.getABTestMailingsForFilterBox(reportType,null,null,true).done(function(data){
					innerDfd.resolve(data.items);
				});
			}else{
				smr.getMailingsForFilterBox(null,null,null,null,reportType,mailingIds,includeSubOrg).done(function(data){
					innerDfd.resolve(data.items);
				});
			}

			innerDfd.done(function(data){
				smr.setDefaultSet(reportType,"main",mailingType);
				if(mailingType == "mailingDetail"){
					for(var i=0;i<data.length;i++){
						var obj = data[i];
						if(obj.id == mailingIds){
							mailingSet.add({id:obj.id,name:obj.name,mailingType:obj.type});
						}
					}
				}else if(mailingType == "ABTest"){
					for(var i=0;i<data.length;i++){
						var obj = data[i];
						if(obj.id == mailingIds){
							mailingSet.add({id:obj.id,name:obj.name});
						}
					}
				}else{
					for(var i=0;i<data.length;i++){
						var obj = data[i];
						mailingSet.add({id:obj.id,name:obj.name});
					}
				}
				
				// add limit Data
				if(startDate || reportType != smr.REPORT_TYPE.BATCH) mailingSet.attr("limit",true);
				
				//AB Test not have the date range
				if(reportType == smr.REPORT_TYPE.ABTEST){
					mailingSet.attr("limit",false);
				}
				
				dfd.resolve();
			});	
		}else{
			if(setType.type == "Mailing" && setType.set.list().length == 0 && !smr.firstReportInit[reportType]){
				if(reportType == smr.REPORT_TYPE.PROGRAM){
					smr.getProgramsForFilterBox(null,null,null,null,null,includeSubOrg).done(function(data){
						innerDfd.resolve(data.items);
					});
				}else{
					var dateRange = smr.getSetAndType(reportType,"main").set.period().getDateRange();
					smr.getMailingsForFilterBox(null,dateRange.startDate,dateRange.endDate,null,reportType,null,includeSubOrg).done(function(data){
						innerDfd.resolve(data.items);
					});
				}
				
				innerDfd.done(function(data){
					var mailingSet = smr.getMailingSet(reportType,"main");
					var type = "mailing";
					if(reportType == smr.REPORT_TYPE.PROGRAM){
						mailingSet = smr.getProgramSet(reportType,"main");
						type = "program";
					}
					smr.setDefaultSet(reportType,"main",type);
					if(startDate != null && endDate != null) mailingSet.period(period);
                    if (reportType == "campaignOverview") {
                        if(data.length > 10){
                            data = smr.newSort(data, "sent");
                            data = data.slice(0,10);
                        }
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            mailingSet.add({id:obj.id, name:obj.campaign});
                        }
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var obj = data[i];
                            mailingSet.add({id:obj.id, name:obj.name});
                        }
                    }
					
					// add limit Data
                    if(startDate || reportType != smr.REPORT_TYPE.BATCH) mailingSet.attr("limit",true);
                    
                    //AB Test not have the date range
                    if(reportType == smr.REPORT_TYPE.ABTEST){
						mailingSet.attr("limit",false);
					}
				
					dfd.resolve();
				});
				
				//set first init report true
				smr.firstReportInit[reportType] = true;
			}else{
				//By default when we open Deliverability Report, all ips should be selected 
				if(setType.type == "IP" && setType.set.list().length == 0 && !smr.firstReportInit[reportType]){
					smr.getVSGsForFilterBox(reportType,includeSubOrg).done(function(data){
						innerDfd.resolve(data.items);				
					});
					
					innerDfd.done(function(data){
						var mailingSet = smr.getIPSet(reportType,"main");
						smr.setDefaultSet(reportType,"main","ips");
						if(startDate != null && endDate != null) mailingSet.period(period);	
						var iptem = {};
						for(var k=0;k<data.length;k++){
							var ipsarr = data[k].ips;
							for(var i=0 ; i<ipsarr.length; i++ ){
								if(iptem[ipsarr[i]]==null){
									mailingSet.add({"id":ipsarr[i],"name":ipsarr[i]});
									iptem[ipsarr[i]]=false;
								}
							}
						}	
						smr.firstReportInit[reportType] = true;
						mailingSet.attr("limit",true);
						dfd.resolve();
					});
					
				}else if(setType.type == "VSG" && setType.set.list().length == 0 && !smr.firstReportInit[reportType]){
					smr.getVSGsForFilterBox(reportType,includeSubOrg).done(function(data){
						innerDfd.resolve(data.items);				
					});
					
					innerDfd.done(function(data){
						var mailingSet = smr.getVSGSet(reportType,"main");
						smr.setDefaultSet(reportType,"main","vsgs");
						if(startDate != null && endDate != null) mailingSet.period(period);	
						
						for(var k=0;k<data.length;k++){
							if(data[k].name=='<None>') continue;
							mailingSet.add({"id":data[k].name,"name":data[k].name});
						}	
						smr.firstReportInit[reportType] = true;
						mailingSet.attr("limit",true);
						dfd.resolve();
					});
					
				}else{
					dfd.resolve();
				}
			}
		}
		
		return dfd.promise();
	}
	// --------- /Helper Functions --------- //
})(jQuery);
