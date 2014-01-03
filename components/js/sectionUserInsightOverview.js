var smr = smr || {};

(function($){

	smr.userInsightSegmentsOptions = [];
	smr.defaultUserInsightOptions = [];
	
	// --------- Component Interface Implementation ---------- //
	function SectionUserInsightOverview(){};
	smr.SectionUserInsightOverview = SectionUserInsightOverview; 
	
	SectionUserInsightOverview.prototype.create = function(data,config){
		return smr.render("tmpl-sectionUserInsightOverview",{});
	};
		
	SectionUserInsightOverview.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
	    
	    var $report =  $e.closest(".report");
	    var $segmentComparisonSection = $report.find(".sectionUserInsightOverview-segmentComparisonSection");
	    view.reportType = data.reportType || smr.REPORT_TYPE.USERINSIGHT;
		view.isNewRequest = data.isNewRequest || false;
		// hide this for now, revert to one request
		//view.loadingType={"common":false, "segmentation":false, "programs":false};
		view.loadingType={"common":false, "programs":false};
		$e.closest(".report").find(".reportHeader").addClass("sectionUserInsightOverview-header");
		view.viewRate = $e.closest(".report").find(".reportHeader-rateSwitch").find("[type=checkbox]").attr("checked") == "checked" ? true : false;
	    
	    
	    //do not show segment
	    if(!smr.showSegment){
	    	$report.find(".btnOptions").hide();
	    	$segmentComparisonSection.addClass("hideSegmentSection");
	    	view.showView(view.viewRate);
	    }else{
	    	view.getAllData("segments",true).done(function(segments){
				smr.userInsightSegmentsOptions = segments;
				smr.defaultUserInsightOptions = [];
				$.each(segments,function(i,item){
					item.name = item.label = item.segmentName;
					if(item.isCore)smr.defaultUserInsightOptions.push(item);
				});
				
				$segmentComparisonSection.removeClass("hideSegmentSection");
				$report.find(".btnOptions").show();
			    $report.find(".btnOptions").css('border-right',0);
			    $report.find(".reportHeader-toggle").css('border-right','1px solid #C5C5C5');
			    
			    //2 is for Actual Difference From Segment as default,  1 is for % Difference From Segment 
				view.type = 2;
				//flag is for View Segment Value, default is unchecked
				view.flag = false;	
						
				view.showView(view.viewRate);
			});
	    }
	};
	
	SectionUserInsightOverview.prototype.events = {
		"btap;.sectionTitle .collapsible": clickCollapsible,
		
		"btap;.sectionTitle .toolbar :radio": function(e){
			var view = this;
			var type = $(e.target).val();
			view.type = type;
			showSegmentGroupComparison.call(view,view.segmentDataAll,view.type,view.flag,view.viewRate);
		},
	
		"change; .sectionTitle .toolbar :checkbox": function(e){
			var view = this;
			var $this = $(e.currentTarget);
			var value = $this.attr("checked") ? true : false;
			view.flag = value;
			showSegmentGroupComparison.call(view,view.segmentDataAll,view.type,view.flag,view.viewRate);
		}
	};
	
	SectionUserInsightOverview.prototype.parentEvents = {
			report:{
				//event for viewrate change
				"REPORTHEADER_VIEWRATE_CHANGE": reportHeaderViewRateChangeMethod,
				
				//event for date range change
				"REPORTHEADER_DATESELECT_CHANGE": reportHeaderDateSelectChangeMethod,
				
				//event for options change
				"REPORTHEADER_OPTIONS_CHANGE": reportHeaderOptionChangeMethod
			}
	}
	// --------- /Component Interface Implementation ---------- //
	
	// --------- events --------- //
	function clickCollapsible(event){
		var $this = $(event.currentTarget);
		$this.hide();
		
		if($this.hasClass("exp")){
			$this.closest(".sectionTitle").find(".col").show();
			$this.closest(".userInsightPart").find(".sectionContent").slideUp(300,function(){ $(this).hide();});
			$this.closest(".userInsightPart").find(".toolbar").hide();
		}else{
			$this.closest(".sectionTitle").find(".exp").show();
			$this.closest(".userInsightPart").find(".sectionContent").slideDown(300,function(){ $(this).show();});
			$this.closest(".userInsightPart").find(".toolbar").show();
		}
	}
	function reportHeaderViewRateChangeMethod(event,extra){
		var view = this;
		view.viewRate = extra.value;
		view.showView(view.viewRate, true);
	}
	
	function reportHeaderDateSelectChangeMethod(event,extra){
		var view = this;
		view.showView(view.viewRate);
	}
	
	function reportHeaderOptionChangeMethod(event){
		var view = this;
		view.showView(view.viewRate);
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	SectionUserInsightOverview.prototype.getAllData = function(type){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		
		if(type != "segments"){
			smr.getUserInsightSummary(type,view.isNewRequest).done(function(data){
				view.loadingType[type] = true;
				var dataSet = {};
				if(data.items != null){
					//cause we will have segmentation and summary two request, right now revert to one request, so segmentation is not use now
					if(type == "common" || type == "segmentation"){
						dataSet = data.items[0];
					}else{
						dataSet = data.items;
					}
				}else{
					if(type == "programs") dataSet = [];
				}
				var hideFlag = true;
				for(k in view.loadingType){
					if(!view.loadingType[k]) hideFlag = false;
				}
				if(hideFlag){
					$reportDataLoading.hide();
				}
				dfd.resolve(dataSet);
			});
		}else{
			smr.getUserInsightSegments(type,view.isNewRequest).done(function(data){
				var dataSet = data.items || [];
				$reportDataLoading.hide();
				dfd.resolve(dataSet);
			});
		}
		return dfd.promise();
	}
	
	SectionUserInsightOverview.prototype.showView = function(viewRate, isViewRateChange){
		var view = this;
		var $e = view.$el;
		//clean first
		$e.bEmpty();
		html = smr.render("tmpl-sectionUserInsightOverview",{});
		$e.append($(html));
		$(".reportHeader-toggle").css('left',380);
		
	    if(smr.showSegment){
	    	if(view.flag){
				$e.find(".showAverageSegment input[type=checkbox]").attr("checked",true);
			}else{
				$e.find(".showAverageSegment input[type=checkbox]").attr("checked",false);
			}
			
			$e.find(".toolbar input[type=radio]").each(function(){
				var $this = $(this);
				if($this.val() == view.type){
					$this.attr("checked",true);
				}else{
					$this.removeAttr("checked");
				}
			});
			
			$e.find(".userImageSegmentList").removeClass("noSegmentList");
			$e.find(".userImageSegmentList .segmentList").removeClass("hideItNow");
			$e.find(".sectionUserInsightOverview-segmentComparisonSection").removeClass("hideSegmentSection");
	    }else{
	    	$e.find(".userImageSegmentList").addClass("noSegmentList");
	    	$e.find(".userImageSegmentList .segmentList").addClass("hideItNow");
	    	$e.find(".sectionUserInsightOverview-segmentComparisonSection").addClass("hideSegmentSection");
	    }
		
		if(isViewRateChange){
			//show User Overview Image And List
			showUserOverviewImageAndList.call(view,view.segmentDataAll);
			
			//show User Overview Engagement And Conversion Score
			showUserOverviewEngagementAndConversionScore.call(view,view.commonDataAll);
				
			//show Summary Statistics
			showSummary.call(view, view.commonDataAll, view.viewRate);
				
			//show Summary Statistics Comparison
			showSummaryStatisticsComparisonSection.call(view, view.commonDataAll, viewRate);
				
			//show Segment Group Comparison 
			if(smr.showSegment){
				showSegmentGroupComparison.call(view, view.segmentDataAll, view.type, view.flag, viewRate);
			}

			//show LCM Programs Section
			showProgramSection.call(view, view.programsDataAll);
		}else{
			view.getAllData("common").done(function(dataAll){
				view.commonDataAll = dataAll;
				//show User Overview Engagement And Conversion Score
				showUserOverviewEngagementAndConversionScore.call(view,dataAll);
				
				//show Summary Statistics
				showSummary.call(view,dataAll,viewRate);
				
				//show Summary Statistics Comparison
				showSummaryStatisticsComparisonSection.call(view,dataAll,viewRate);
				
				//hide it for now , two request for summary and segmentation
				//view.getAllData("segmentation").done(function(segmentDataAll){
					view.segmentDataAll = dataAll;
					//show User Overview Image And List
					showUserOverviewImageAndList.call(view,view.segmentDataAll);
					
					//show Segment Group Comparison 
					if(smr.showSegment){
						showSegmentGroupComparison.call(view,view.segmentDataAll,view.type,view.flag,viewRate);
					}
				//});
			});
			
			view.getAllData("programs").done(function(dataAll){
				view.programsDataAll = dataAll;
				//show LCM Programs Section
				showProgramSection.call(view,dataAll);
			});
		}
		
		return true;
	}
	// --------- /Component Public API --------- //	
		
	
	// --------- Component Private Methods --------- //
	function showUserOverviewEngagementAndConversionScore(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionUserInsightOverview-userOverviewSection .userScore");
		var $engagementScore = $section.find(".engagementScore");
		var $engagementShape = $engagementScore.find(".engagementShape");
		
		if(typeof dataAll == "undefined"){
			$section.html("");
			$section.append("<div class='noData'>No Data!</div>");
		}else{
			var summary = dataAll.summary;
			var avgData = dataAll.avgData;
			
			if(dataAll.summary && dataAll.avgData){
				//show the Engagement Score part
				var engagementScore = smr.formatToFixed(smr.formatDivisionNumber(summary.engagementScore - avgData.engagementScore, avgData.engagementScore)*100);
				if(summary.engagementScore - avgData.engagementScore>0){
					$engagementScore.addClass("higher");
					$engagementScore.find(".engagementContent .compare").html("higher than ");
					$engagementScore.find(".compare-span .compare").html("&gt;");
				}else if (summary.engagementScore - avgData.engagementScore==0){
					$engagementScore.addClass("equal");
					$engagementScore.find(".engagementContent .compare").html("");
					$engagementScore.find(".compare-span").html("<span>is</span>");
				}else{
					$engagementScore.addClass("lower");
					$engagementScore.find(".engagementContent .compare").html("lower than ");
					$engagementScore.find(".compare-span .compare").html("&lt;");
				}
				
				var showEngagementScore = (engagementScore<0) ? engagementScore*(-1) : engagementScore;
				$engagementScore.find(".compare-span .num").html(showEngagementScore);
				$engagementScore.find(".summaryScore span").html(summary.engagementScore);
				var avgScoreWidth = $engagementScore.width()-$engagementScore.find(".summaryScore").width()-80;
				$engagementScore.find(".avgScore").width(avgScoreWidth);
				$engagementScore.find(".avgScore .avgScoreNum").html(avgData.engagementScore);
				$engagementScore.find(".engagementConValue").html(summary.engagementScore - avgData.engagementScore==0?"":showEngagementScore+"% ");
				var engagementScoreMove = smr.formatToFixed(smr.formatDivisionNumber(summary.engagementScore - avgData.engagementScore, Math.abs(avgData.engagementScore)));
				var summaryScorePercent =  (0.5-smr.formatDivisionNumber(9,avgScoreWidth)) + engagementScoreMove;
				summaryScorePercent = (summaryScorePercent) >1 ? (1.00-smr.formatDivisionNumber(9,avgScoreWidth)) : summaryScorePercent;
				summaryScorePercent = (summaryScorePercent) <0 ? (0-smr.formatDivisionNumber(9,avgScoreWidth)) : summaryScorePercent;
				$engagementScore.find(".avgScore .compare-arrow").css("left",parseInt(summaryScorePercent*100)+"%");
				if(summary.name && summary.name!=""){
					$engagementScore.find(".engagementName").html(summary.name);
				}else{
					$engagementScore.find(".engagementContent").hide();
				}
				
				//show the Conversion Score part
				if(smr.conversionEnabled){
					$e.closest(".report").find(".conversionScore").removeClass("notShow");
					var $conversionScore = $section.find(".conversionScore");
					var $conversionShape = $conversionScore.find(".conversionShape");
					var conversionScore = smr.formatToFixed(smr.formatDivisionNumber(summary.conversionScore - avgData.conversionScore, avgData.conversionScore)*100);
					
					if(summary.conversionScore - avgData.conversionScore>0){
						$conversionScore.addClass("higher");
						$conversionScore.find(".conversionContent .compare").html("higher than ");
						$conversionScore.find(".compare-span .compare").html("&gt;");
					}else if ((summary.conversionScore - avgData.conversionScore)==0){
						$conversionScore.addClass("equal");
						$conversionScore.find(".conversionContent .compare").html("");
						$conversionScore.find(".compare-span").html("<span>is</span>");
					}else{
						$conversionScore.addClass("lower");
						$conversionScore.find(".conversionContent .compare").html("lower than ");
						$conversionScore.find(".compare-span .compare").html("&lt;");
					}					
					
					var showConversionScore = (conversionScore<0) ? conversionScore*(-1) : conversionScore;
					$conversionScore.find(".compare-span .num").html(showConversionScore);
					$conversionScore.find(".summaryScore span").html(summary.conversionScore);
					var avgScoreWidthC = $conversionScore.width()-$conversionScore.find(".summaryScore").width()-80;
					$conversionScore.find(".avgScore").width(avgScoreWidthC);
					$conversionScore.find(".avgScore .avgScoreNum").html(avgData.conversionScore);
					$conversionScore.find(".conversionConValue").html(summary.conversionScore - avgData.conversionScore==0?"": showConversionScore+"% ");
					
					var conversionScoreMove = smr.formatToFixed(smr.formatDivisionNumber(summary.conversionScore - avgData.conversionScore, Math.abs(avgData.conversionScore)));
					var summaryScorePercentC =  (0.5-smr.formatDivisionNumber(9,avgScoreWidthC)) + conversionScoreMove;
					summaryScorePercentC = (summaryScorePercentC) >1 ? (1.00-smr.formatDivisionNumber(9,avgScoreWidthC)) : summaryScorePercentC;
					summaryScorePercentC = (summaryScorePercentC) <0 ? (0-smr.formatDivisionNumber(9,avgScoreWidthC)) : summaryScorePercentC;
					$conversionScore.find(".avgScore .compare-arrow").css("left",parseInt(summaryScorePercentC*100)+"%");
					if(summary.name && summary.name!=""){
						$conversionScore.find(".conversionName").html(summary.name);
					}else{
						$conversionScore.find(".conversionContent").hide();
					}

				}else{
					$e.closest(".report").find(".conversionScore").addClass("notShow");
				}
				//-----if conversionEnabled 
			}else{
				$engagementScore.html("<div class='noData'>No Data!</div>");
				if(smr.conversionEnabled){
					$e.closest(".report").find(".conversionScore").removeClass("notShow");
				}else{
					$e.closest(".report").find(".conversionScore").addClass("notShow");
				}
				$e.closest(".report").find(".conversionScore").html("<div class='noData'>No Data!</div>");
			}
		}
	}
	
	function showUserOverviewImageAndList(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionUserInsightOverview-userOverviewSection .userImageSegmentList");
		var $userImage = $section.find(".userImage");
		var $segmentList = $section.find(".segmentList");
		var userGender = null;
		if(typeof dataAll == "undefined"){
			$section.html("");
			$section.append("<div class='noData'>No Data!</div>");
		}else{
			var dataList = dataAll.userSegmentData;
			if(typeof dataList != "undefined" && dataList != null){
				var showSegmentList = [];
				var overviewSelected = smr.getSetAndType("userInsight","main").set.attr("overviewSelected") || smr.defaultUserInsightOptions;
				$.each(dataList,function(i,item){
					if(brite.array.getIndex(overviewSelected,"label",item.segmentation)>-1){
						//add ellipsis for long segmentation
						var value = item.segmentation;
						if(value && value.length > 19){
							item.labelName = value.substring(0,16)+"...";
							item.ellipsis = true;
						}else{
							item.labelName = value;
						}
						
						//add ellipsis for long segment
						var segmentValue = item.segment;
						if(segmentValue && segmentValue.length > 22){
							item.labelValue = segmentValue.substring(0,19)+"...";
							item.valEllipsis = true;
						}else{
							item.labelValue = segmentValue;
						}
						
						showSegmentList.push($.extend({},item));
					}
					var segmenttationVal =  item.segmentation.toLowerCase();
					if(segmenttationVal == "gender"){
						userGender = item.segment;
					}
				});
				
				var $userOverviewdata = smr.render("tmpl-userOverviewSection-segment-userInsight",{ dataList:showSegmentList });
				if(typeof  userGender != "undefined" &&  userGender != null){
					var userGenderVal = userGender.toLowerCase();
					if(userGenderVal == 'female' || userGenderVal == 'f'){
						$userImage.html('<div class="image female"/></div>');
					}else if(userGenderVal == 'male' || userGenderVal == 'm'){
						$userImage.html('<div class="image male"/></div>');
					}else{
						$userImage.html('<div class="image common"></div>');
					}
				}else{
					$userImage.html('<div class="image common"></div>');
				}
				
				$segmentList.html($userOverviewdata);
			}else{
				$userImage.html('<div class="image common"></div>');
				$segmentList.html("<div class='noData'>No Data!</div>");
			}
		}
	}
	
	function showSummary(dataAll,viewRate){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		var $statsSummary = $e.find(".statsSummary");
		var $title = $e.closest(".report").find(".reportHeader .needS");
		var $subTitle = $e.find(".subTitle");
		var summaryData = {};
		if(typeof dataAll != "undefined" && typeof dataAll.summary != "undefined" && dataAll.summary!=null){
			summaryData = dataAll.summary ;
		}
		var summaryData = dataAll.summary || {};
		var stats = [];
		
		if(viewRate){
			stats = [
				{name:"sent",label:"Sent",value:smr.checkNumber(summaryData.sent),isRate:false},
				{name:"delivered",label:"Delivery Rate",value:smr.checkNumber(summaryData.deliveryRate),isRate:true},
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
	
	
	function showSummaryStatisticsComparisonSection(dataAll,viewRate){
		var view = this;
		var $e = view.$el;
		
		var $section = $e.find(".sectionUserInsightOverview-statsComparisonSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		if(typeof dataAll == "undefined" || dataAll.summary==null || typeof dataAll.summary=="undefined" || dataAll.avgData==null || typeof dataAll.avgData=="undefined" ){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var summaryData = dataAll.summary;
			var avgData = dataAll.avgData;
			
			var tableColumns = [];
			var tableData = [];
			if(viewRate){
				tableColumns.push({name:"name",label:" ",sortable:true});
				tableColumns.push({name:"sent",label:"Sent",textAlignLeft:true,isDraw:true});
				tableColumns.push({name:"delivered",label:"Delivery Rate",valueKey:"deliveryRate",textAlignLeft:true,isRate:true,isDraw:true});
				tableColumns.push({name:"open",label:"Open Rate",valueKey:"openRate",textAlignLeft:true,isRate:true,isDraw:true});
				tableColumns.push({name:"click",label:"Click Rate",valueKey:"clickRate",textAlignLeft:true,isRate:true,isDraw:true});
				tableColumns.push({name:"unsub",label:"Unsub Rate",valueKey:"unsubRate",textAlignLeft:true,isRate:true,isDraw:true});
				if(smr.conversionEnabled){
					tableColumns.push({name:"conversions",label:"Conversion Rate",valueKey:"conversionRate",textAlignLeft:true,isRate:true,isDraw:true});
					tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,textAlignLeft:true,isDraw:true,maxLength:5,ellipses:"right"});
				}
			}else{
				tableColumns.push({name:"name",label:" ",sortable:true});
				tableColumns.push({name:"sent",label:"Sent",textAlignLeft:true,isDraw:true});
				tableColumns.push({name:"delivered",label:"Delivered",textAlignLeft:true,isDraw:true});
				tableColumns.push({name:"open",label:"Opens",valueKey:"opens",textAlignLeft:true,isDraw:true});
				tableColumns.push({name:"click",label:"Clicks",valueKey:"clicks",textAlignLeft:true,isDraw:true});
				tableColumns.push({name:"unsub",label:"Unsubs",valueKey:"unsubs",textAlignLeft:true,isDraw:true});
				if(smr.conversionEnabled){
					tableColumns.push({name:"conversions",label:"Conversions",textAlignLeft:true,isDraw:true});
					tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,textAlignLeft:true,isDraw:true});
				}				
			}
			
			$.each(tableColumns,function(i,tableColumn){
				if(tableColumn.isDraw){
					var maximunKey = tableColumn.valueKey || tableColumn.name;
					tableColumn.maximun = Math.max.apply({},[smr.checkNumber(summaryData[maximunKey]),smr.checkNumber(avgData[maximunKey])]);
				}
			});
			
			var resultData;
			//summaryData 
			if(viewRate){
				if(smr.conversionEnabled){
					resultData = {
						"name":summaryData.name,
						"sent" : smr.checkNumber(summaryData.sent),
						"delivered" :smr.checkNumber(summaryData.deliveryRate),
						"open" : smr.checkNumber(summaryData.openRate),
						"click" : smr.checkNumber(summaryData.clickRate),
						"unsub" : smr.checkNumber(summaryData.unsubRate),
						"conversions" : smr.checkNumber(summaryData.conversionRate),
						"revenue" : smr.checkNumber(summaryData.revenue)
					};
				}else{
					resultData = {
						"name":summaryData.name,
						"sent" : smr.checkNumber(summaryData.sent),
						"delivered" :smr.checkNumber(summaryData.deliveryRate),
						"open" : smr.checkNumber(summaryData.openRate),
						"click" : smr.checkNumber(summaryData.clickRate),
						"unsub" : smr.checkNumber(summaryData.unsubRate)
					}
				}
				tableData.push(resultData);
			}else{
			    if(smr.conversionEnabled){
					resultData = {
						"name":summaryData.name,
						"sent" : smr.checkNumber(summaryData.sent),
						"delivered" :smr.checkNumber(summaryData.delivered),
						"open" : smr.checkNumber(summaryData.opens),
						"click" : smr.checkNumber(summaryData.clicks),
						"unsub" : smr.checkNumber(summaryData.unsubs),
						"conversions" : smr.checkNumber(summaryData.conversions),
						"revenue" : smr.checkNumber(summaryData.revenue)
					};
				}else{
					resultData = {
						"sent" : smr.checkNumber(summaryData.sent),
						"delivered" :smr.checkNumber(summaryData.delivered),
						"open" : smr.checkNumber(summaryData.opens),
						"click" : smr.checkNumber(summaryData.clicks),
						"unsub" : smr.checkNumber(summaryData.unsubs)
					};
				}
			    tableData.push(resultData);
			}
			//avgData
			if(viewRate){
				if(smr.conversionEnabled){
					resultData = {
						"name":"All Users (avg.)",
						"sent" : smr.checkNumber(avgData.sent),
						"delivered" :smr.checkNumber(avgData.deliveryRate),
						"open" : smr.checkNumber(avgData.openRate),
						"click" : smr.checkNumber(avgData.clickRate),
						"unsub" : smr.checkNumber(avgData.unsubRate),
						"conversions" : smr.checkNumber(avgData.conversionRate),
						"revenue" : smr.checkNumber(avgData.revenue)
					};
				}else{
					resultData = {
						"name":"All Users (avg.)",
						"sent" : smr.checkNumber(avgData.sent),
						"delivered" :smr.checkNumber(avgData.deliveryRate),
						"open" : smr.checkNumber(avgData.openRate),
						"click" : smr.checkNumber(avgData.clickRate),
						"unsub" : smr.checkNumber(avgData.unsubRate)
					}
				}
				tableData.push(resultData);
			}else{
			    if(smr.conversionEnabled){
					resultData = {
						"name":"All Users (avg.)",
						"sent" : smr.checkNumber(avgData.sent),
						"delivered" :smr.checkNumber(avgData.delivered),
						"open" : smr.checkNumber(avgData.opens),
						"click" : smr.checkNumber(avgData.clicks),
						"unsub" : smr.checkNumber(avgData.unsubs),
						"conversions" : smr.checkNumber(avgData.conversions),
						"revenue" : smr.checkNumber(avgData.revenue)
					};
				}else{
					resultData = {
						"name":"All Users (avg.)",
						"sent" : smr.checkNumber(avgData.sent),
						"delivered" :smr.checkNumber(avgData.delivered),
						"open" : smr.checkNumber(avgData.opens),
						"click" : smr.checkNumber(avgData.clicks),
						"unsub" : smr.checkNumber(avgData.unsubs)
					};
				}
			    tableData.push(resultData);
			}
			
			// add the table thead
			renderTableThead.call(view,tableColumns,"statsComparisonSection");
			//add the table tbody
			renderTableTbody.call(view,tableColumns,tableData,"","statsComparisonSection");
		}
	}
	
	function showSegmentGroupComparison(dataAll,type,flag,viewRate){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionUserInsightOverview-segmentComparisonSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		if(typeof dataAll == "undefined" || typeof view.commonDataAll.summary=="undefined" || view.commonDataAll.summary==null || typeof dataAll.segmentData=="undefined" || dataAll.segmentData==null){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var summary = view.commonDataAll.summary;
			var summarySent = smr.checkNumber(summary.sent);
			var summaryOpens = smr.checkNumber(summary.opens);
			var summaryOpenRate= smr.checkNumber(summary.openRate);
			var summaryClicks = smr.checkNumber(summary.clicks);
			var summaryClickRate= smr.checkNumber(summary.clickRate);
			var summaryConversions = smr.checkNumber(summary.conversions);
			var summaryConversionRate= smr.checkNumber(summary.conversionRate);
			var summaryRevenue= smr.checkNumber(summary.revenue);
			if(!flag){//	View Segment Values Checkbox unchecked
				if(type == 1){  //  % Difference From Segment 
					var dataList = dataAll.segmentData;
					var tableColumns = [];
					var tableData = [];
					if(viewRate){ //  view rates is checked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent",label:"Sent",isRate:true});
						tableColumns.push({name:"open",label:"Open Rate",isRate:true});
						tableColumns.push({name:"click",label:"Click Rate",isRate:true});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions",label:"Conversion Rate",isRate:true});
							tableColumns.push({name:"revenue",label:"Revenue",isRate:true});
						}
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpenRate - smr.checkNumber(rowData.openRate),smr.checkNumber(rowData.openRate))*100),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClickRate - smr.checkNumber(rowData.clickRate),smr.checkNumber(rowData.clickRate))*100),
									"conversions" : smr.formatToFixed(smr.formatDivisionNumber(summaryConversionRate - smr.checkNumber(rowData.conversionRate),smr.checkNumber(rowData.conversionRate))*100),
									"revenue" : smr.formatToFixed(smr.formatDivisionNumber(summaryRevenue - smr.checkNumber(rowData.revenue),smr.checkNumber(rowData.revenue))*100)
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpenRate - smr.checkNumber(rowData.openRate),smr.checkNumber(rowData.openRate))*100),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClickRate - smr.checkNumber(rowData.clickRate),smr.checkNumber(rowData.clickRate))*100)
								};
							}
							tableData.push(resultData);
						}
					}else{ // view rates is not checked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true});
						tableColumns.push({name:"sent",label:"Sent",isRate:true});
						tableColumns.push({name:"open",label:"Opens",isRate:true});
						tableColumns.push({name:"click",label:"Clicks",isRate:true});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions",label:"Conversions",isRate:true});
							tableColumns.push({name:"revenue",label:"Revenue",isRate:true});
						}
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpens - smr.checkNumber(rowData.opens),smr.checkNumber(rowData.opens))*100),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClicks - smr.checkNumber(rowData.clicks),smr.checkNumber(rowData.clicks))*100),
									"conversions" : smr.formatToFixed(smr.formatDivisionNumber(summaryConversions - smr.checkNumber(rowData.conversions),smr.checkNumber(rowData.conversions))*100),
									"revenue" : smr.formatToFixed(smr.formatDivisionNumber(summaryRevenue - smr.checkNumber(rowData.revenue),smr.checkNumber(rowData.revenue))*100)
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpens - smr.checkNumber(rowData.opens),smr.checkNumber(rowData.opens))*100),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClicks - smr.checkNumber(rowData.clicks),smr.checkNumber(rowData.clicks))*100)
								};
							}
							tableData.push(resultData);
						}
					}
					
					renderTableThead.call(view,tableColumns,"segmentComparisonSection");
					renderTableTbody.call(view,tableColumns,tableData,type,"segmentComparisonSection");
					
				}else if(type == 2){ //  Actual Difference From Segment
					var dataList = dataAll.segmentData;
					var tableColumns = [];
					var tableData = [];
					if(viewRate){ //  view rates is checked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent",label:"Sent",isRate:false,isColspan:false});
						tableColumns.push({name:"open",label:"Open Rate",isRate:true,isColspan:false});
						tableColumns.push({name:"click",label:"Click Rate",isRate:true,isColspan:false});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions",label:"Conversion Rate",isRate:true,isColspan:false});
							tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,isColspan:false});
						} 
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" : smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open" : smr.formatToFixed(summaryOpenRate - smr.checkNumber(rowData.openRate)),
									"click" : smr.formatToFixed(summaryClickRate - smr.checkNumber(rowData.clickRate)),
									"conversions" : smr.formatToFixed(summaryConversionRate - smr.checkNumber(rowData.conversionRate)),
									"revenue" : smr.formatToFixed(summaryRevenue - smr.checkNumber(rowData.revenue))
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" :smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open" : smr.formatToFixed(summaryOpenRate - smr.checkNumber(rowData.openRate)),
									"click" : smr.formatToFixed(summaryClickRate - smr.checkNumber(rowData.clickRate))
								};
							}
								
							tableData.push(resultData);
						}
					}else{//  view rates is unchecked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent",label:"Sent",isRate:false,isColspan:false});
						tableColumns.push({name:"open",label:"Opens",isRate:false,isColspan:false});
						tableColumns.push({name:"click",label:"Clicks",isRate:false,isColspan:false});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions",label:"Conversions",isRate:false,isColspan:false});
							tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,isColspan:false});
						} 
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" : smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open" : smr.formatToFixed(summaryOpens - smr.checkNumber(rowData.opens)),
									"click" : smr.formatToFixed(summaryClicks - smr.checkNumber(rowData.clicks)),
									"conversions" : smr.formatToFixed(summaryConversions - smr.checkNumber(rowData.conversions)),
									"revenue" : smr.formatToFixed(summaryRevenue - smr.checkNumber(rowData.revenue))
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent" :smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open" : smr.formatToFixed(summaryOpens - smr.checkNumber(rowData.opens)),
									"click" : smr.formatToFixed(summaryClicks - smr.checkNumber(rowData.clicks))
								};
							}
								
							tableData.push(resultData);
						}
					}
					
					renderTableThead.call(view,tableColumns,"segmentComparisonSection");
					renderTableTbody.call(view,tableColumns,tableData,type,"segmentComparisonSection");
				}
			}else{//  View Segment Values Checkbox checked
				if(type == 1){  //  % Difference From Segment
					var dataList = dataAll.segmentData;
					var tableColumns = [];
					var tableData = [];
					if(viewRate){ //  view rates is checked
						
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent1",label:"Sent",isColspan:true,noFontColor:false,isShow:false,noFontColor:true});
						tableColumns.push({name:"sent",label:"Sent",isColspan:true,isRate:true});
						tableColumns.push({name:"open1",label:"Open Rate",isColspan:true,isRate:false,isShow:false,noFontColor:true});
						tableColumns.push({name:"open",label:"Open Rate",isColspan:true,isRate:true});
						tableColumns.push({name:"click1",label:"Click Rate",isColspan:true,isRate:false,isShow:false,noFontColor:true});
						tableColumns.push({name:"click",label:"Click Rate",isColspan:true,isRate:true});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions1",label:"Conversion Rate",isColspan:true,isRate:false,isShow:false,noFontColor:true});
							tableColumns.push({name:"conversions",label:"Conversion Rate",isColspan:true,isRate:true});
							tableColumns.push({name:"revenue1",label:"Revenue",isColspan:true,isConversionSymbol:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"revenue",label:"Revenue",isColspan:true,isRate:true});
						}
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" : smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.openRate)),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpenRate - smr.checkNumber(rowData.openRate) ,smr.checkNumber(rowData.openRate))*100),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clickRate)),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClickRate - smr.checkNumber(rowData.clickRate) ,smr.checkNumber(rowData.clickRate))*100),
									"conversions1" : smr.formatToFixed(smr.checkNumber(rowData.conversionRate)),
									"conversions" : smr.formatToFixed(smr.formatDivisionNumber(summaryConversionRate - smr.checkNumber(rowData.conversionRate) ,smr.checkNumber(rowData.conversionRate))*100),
									"revenue1" : smr.formatToFixed(smr.checkNumber(rowData.revenue)),
									"revenue" : smr.formatToFixed(smr.formatDivisionNumber(summaryRevenue - smr.checkNumber(rowData.revenue) ,smr.checkNumber(rowData.revenue))*100)
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" : smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.openRate)),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpenRate - smr.checkNumber(rowData.openRate) ,smr.checkNumber(rowData.openRate))*100),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clickRate)),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClickRate - smr.checkNumber(rowData.clickRate) ,smr.checkNumber(rowData.clickRate))*100)
								};
							}
							tableData.push(resultData);
						}
					}else{ // view rates is not checked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent1",label:"Sent",isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"sent",label:"Sent",isColspan:true,isRate:true});
						tableColumns.push({name:"open1",label:"Opens",isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"open",label:"Opens",isColspan:true,isRate:true});
						tableColumns.push({name:"click1",label:"Clicks",isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"click",label:"Clicks",isColspan:true,isRate:true});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions1",label:"Conversions",isColspan:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"conversions",label:"Conversions",isColspan:true,isRate:true});
							tableColumns.push({name:"revenue1",label:"Revenue",isColspan:true,isConversionSymbol:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"revenue",label:"Revenue",isColspan:true,isRate:true});
						}
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" :smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.opens)),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpens - smr.checkNumber(rowData.opens) ,smr.checkNumber(rowData.opens))*100),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clicks)),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClicks - smr.checkNumber(rowData.clicks) ,smr.checkNumber(rowData.clicks))*100),
									"conversions1" : smr.formatToFixed(smr.checkNumber(rowData.conversions)),
									"conversions" : smr.formatToFixed(smr.formatDivisionNumber(summaryConversions - smr.checkNumber(rowData.conversions) ,smr.checkNumber(rowData.conversions))*100),
									"revenue1" : smr.formatToFixed(smr.checkNumber(rowData.revenue)),
									"revenue" : smr.formatToFixed(smr.formatDivisionNumber(summaryRevenue - smr.checkNumber(rowData.revenue) ,smr.checkNumber(rowData.revenue))*100)
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" :smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(smr.formatDivisionNumber(summarySent - smr.checkNumber(rowData.sent),smr.checkNumber(rowData.sent))*100),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.opens)),
									"open" : smr.formatToFixed(smr.formatDivisionNumber(summaryOpens - smr.checkNumber(rowData.opens) ,smr.checkNumber(rowData.opens))*100),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clicks)),
									"click" : smr.formatToFixed(smr.formatDivisionNumber(summaryClicks - smr.checkNumber(rowData.clicks) ,smr.checkNumber(rowData.clicks))*100)
								};
							}
							tableData.push(resultData);
						}
					}
					
					renderTableThead.call(view,tableColumns,"segmentComparisonSection");
					renderTableTbody.call(view,tableColumns,tableData,type,"segmentComparisonSection");
					
				}else if(type == 2){//  Actual Difference From Segment
					var dataList = dataAll.segmentData;
					var tableColumns = [];
					var tableData = [];
					if(viewRate){ //  view rates is checked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent1",label:"Sent",isRate:false,isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"sent",label:"Sent",isRate:false,isColspan:true});
						tableColumns.push({name:"open1",label:"Open Rate",isRate:true,isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"open",label:"Open Rate",isRate:true,isColspan:true});
						tableColumns.push({name:"click1",label:"Click Rate",isRate:true,isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"click",label:"Click Rate",isRate:true,isColspan:true});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions1",label:"Conversion Rate",isRate:true,isColspan:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"conversions",label:"Conversion Rate",isRate:true,isColspan:true});
							tableColumns.push({name:"revenue1",label:"Revenue",isConversionSymbol:true,isColspan:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,isColspan:true});
						} 
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" :smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.openRate)),
									"open" : smr.formatToFixed(summaryOpenRate - smr.checkNumber(rowData.openRate)),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clickRate)),
									"click" : smr.formatToFixed(summaryClickRate - smr.checkNumber(rowData.clickRate)),
									"conversions1" : smr.formatToFixed(smr.checkNumber(rowData.conversionRate)),
									"conversions" : smr.formatToFixed(summaryConversionRate - smr.checkNumber(rowData.conversionRate)),
									"revenue1" : smr.formatToFixed(smr.checkNumber(rowData.revenue)),
									"revenue" : smr.formatToFixed(summaryRevenue - smr.checkNumber(rowData.revenue))
									
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" :smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.openRate)),
									"open" : smr.formatToFixed(summaryOpenRate - smr.checkNumber(rowData.openRate)),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clickRate)),
									"click" : smr.formatToFixed(summaryClickRate - smr.checkNumber(rowData.clickRate))
								};
							}
								
							tableData.push(resultData);
						}
					}else{//  view rates is unchecked
						tableColumns.push({name:"segmentation",label:"Segmentation",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"segment",label:"Segment",textAlignLeft:true,noFontColor:true});
						tableColumns.push({name:"sent1",label:"Sent",isRate:false,isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"sent",label:"Sent",isRate:false,isColspan:true});
						tableColumns.push({name:"open1",label:"Opens",isRate:false,isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"open",label:"Opens",isRate:false,isColspan:true});
						tableColumns.push({name:"click1",label:"Clicks",isRate:false,isColspan:true,noFontColor:true,isShow:false});
						tableColumns.push({name:"click",label:"Clicks",isRate:false,isColspan:true});
						if(smr.conversionEnabled){
							tableColumns.push({name:"conversions1",label:"Conversions",isRate:false,isColspan:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"conversions",label:"Conversions",isRate:false,isColspan:true});
							tableColumns.push({name:"revenue1",label:"Revenue",isConversionSymbol:true,isColspan:true,noFontColor:true,isShow:false});
							tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,isColspan:true});
						} 
						for(var i=0; i<dataList.length;i++) {
							var rowData = dataList[i];
							var resultData;
							if(smr.conversionEnabled){
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" :smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.opens)),
									"open" : smr.formatToFixed(summaryOpens - smr.checkNumber(rowData.opens)),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clicks)),
									"click" : smr.formatToFixed(summaryClicks - smr.checkNumber(rowData.clicks)),
									"conversions1" : smr.formatToFixed(smr.checkNumber(rowData.conversions)),
									"conversions" : smr.formatToFixed(summaryConversions - smr.checkNumber(rowData.conversions)),
									"revenue1" : smr.formatToFixed(smr.checkNumber(rowData.revenue)),
									"revenue" : smr.formatToFixed(summaryRevenue - smr.checkNumber(rowData.revenue))
								};
							}else{
								resultData = {
									"segmentation":rowData.segmentation,
									"segment" : rowData.segment,
									"sent1" :smr.formatToFixed(smr.checkNumber(rowData.sent)),
									"sent" :smr.formatToFixed(summarySent - smr.checkNumber(rowData.sent)),
									"open1" : smr.formatToFixed(smr.checkNumber(rowData.opens)),
									"open" : smr.formatToFixed(summaryOpens - smr.checkNumber(rowData.opens)),
									"click1" : smr.formatToFixed(smr.checkNumber(rowData.clicks)),
									"click" : smr.formatToFixed(summaryClicks - smr.checkNumber(rowData.clicks))
								};
							}
								
							tableData.push(resultData);
						}
					}
					
					renderTableThead.call(view,tableColumns,"segmentComparisonSection");
					renderTableTbody.call(view,tableColumns,tableData,type,"segmentComparisonSection");
				}
			}
		}
	}
	
	
	function showProgramSection(dataAll){
		var view = this;
		var $e = view.$el;
		var $section = $e.find(".sectionUserInsightOverview-programSection");
		var $sectionContent = $section.find(".sectionContent");
		var $table = $sectionContent.find(".dataTable");
		if(typeof dataAll == "undefined" || dataAll==null || dataAll.length==0){
			$sectionContent.html("");
			$sectionContent.append("<div class='noData'>No Data!</div>");
		}else{
			var dataList = dataAll;
			var tableColumns = [];
			var tableData = [];
			
			tableColumns.push({name:"programName",label:"Program Name",textAlignLeft:true,sortable:true,maxLength:26,ellipses:"right"});
			tableColumns.push({name:"launchDate",label:"Enter Date",sortable:true,textAlignLeft:true});
			tableColumns.push({name:"campaignName",label:"Campaign",textAlignLeft:true,sortable:true,maxLength:26,ellipses:"right"});
			tableColumns.push({name:"status",label:"Current Status",textAlignLeft:true,sortable:true,maxLength:26,ellipses:"right"});
			tableColumns.push({name:"open",label:"Opens",textAlignCenter:true,sortable:true});
			tableColumns.push({name:"click",label:"Clicks",textAlignCenter:true,sortable:true});
			if(smr.conversionEnabled){
				tableColumns.push({name:"conversions",label:"Conversions",textAlignCenter:true,sortable:true});
				tableColumns.push({name:"revenue",label:"Revenue",isConversionSymbol:true,textAlignCenter:true,sortable:true});
			}
			
			for(var i=0; i<dataList.length;i++) {
				var rowData = dataList[i];
				var resultData;
				if(smr.conversionEnabled){
					resultData = {
						"id":rowData.id,
						"launchDate":rowData.date,
						"programName" : rowData.programName,
						"campaignName" :rowData.campaignName,
						"status" : rowData.status,
						"open" : smr.checkNumber(rowData.opens),
						"click" : smr.checkNumber(rowData.clicks),
						"conversions" : smr.checkNumber(rowData.conversions),
						"revenue" : smr.checkNumber(rowData.revenue)
					};
				}else{
					resultData = {
						"id":rowData.id,
						"launchDate":rowData.date,
						"programName" : rowData.programName,
						"campaignName" :rowData.campaignName,
						"status" : rowData.status,
						"open" : smr.checkNumber(rowData.opens),
						"click" : smr.checkNumber(rowData.clicks)
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
				$e.find(".sectionUserInsightOverview-programSection .sectionContent .dataTable tbody").empty();
				
				renderTableTbody.call(view,tableColumns,tableData,"","programSection");
			});
		}
	}
	
	
	function renderTableThead(tableColumns,sectionType){
		var view = this;
		var $e = view.$el;
		var $table;
		if(sectionType == "programSection"){
			$table = $e.find(".sectionUserInsightOverview-programSection .sectionContent .dataTable");
		}else if(sectionType == "statsComparisonSection"){
			$table = $e.find(".sectionUserInsightOverview-statsComparisonSection .sectionContent .dataTable");
		}else if(sectionType == "segmentComparisonSection"){
			$table = $e.find(".sectionUserInsightOverview-segmentComparisonSection .sectionContent .dataTable");
			$table.find("thead tr").empty();
		}
		
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			if(column.isShow === false){
				continue;
			}
			var columnLable = column.label;
			var columnName = column.name;
			var sortable = false;
			var isColspan = false;
			
			var colspan = 1;
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
			if(typeof column.isColspan != 'undefined'){
				isColspan = column.isColspan;
			}
			if(sectionType == "segmentComparisonSection" && isColspan){
				colspan = i<2 ? 1:2;
			}
		
			var tableThead = smr.render("tmpl-sectionContent-dataTable-tableThead-userInsight",{
				"label":columnLable,
				"column":columnName,
				"sortable":sortable,
				"colspan":colspan,
				"isColspan":isColspan
			});
			$table.find("thead tr").append(tableThead);
		}
	}
	
	function renderTableTbody(tableColumns,tableData,type,sectionType){
		var view = this;
		var $e = view.$el;
		var $tbody;
		if(sectionType == "programSection"){
			$tbody = $e.find(".sectionUserInsightOverview-programSection .sectionContent .dataTable tbody");
		}else if(sectionType == "statsComparisonSection"){
			$tbody = $e.find(".sectionUserInsightOverview-statsComparisonSection .sectionContent .dataTable tbody");
		}else if(sectionType == "segmentComparisonSection"){
			$tbody = $e.find(".sectionUserInsightOverview-segmentComparisonSection .sectionContent .dataTable tbody");
			$tbody.empty();
		}
		
		for(var i=0; i<tableData.length;i++) {
			var obj = tableData[i];
			if (obj) {
				var tableTbody = smr.render("tmpl-sectionContent-dataTable-tableTbody-userInsight",{});
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
					var textAlignCenter = false;
					var isCheckbox = false;
					var improvement = "unchange";
					var isDraw = false;
					var noFontColor = false;
					var isProgramName = false;
					var isUrlLink = false;
					var drawValue = null;
					
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
					
					if (typeof column.textAlignCenter != "undefined") {
						textAlignCenter = column.textAlignCenter;
					}
					
					if (typeof column.isCheckbox != "undefined") {
						isCheckbox = column.isCheckbox;
					}
					
					if (typeof column.noFontColor != "undefined") {
						noFontColor = column.noFontColor;
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
					
					if(sectionType == "segmentComparisonSection"){
						if(!noFontColor){
							if(value > 0){
								improvement = "improve";
							}else if(value < 0){
								improvement = "reduce";
							}
						}
					}
					
					if (typeof column.isDraw != "undefined") {
						isDraw = column.isDraw;
						if(isRate){
							if(column.maximun>=100){
								drawValue = parseInt(smr.formatDivisionNumber(value,column.maximun)*100);
							}else{
								drawValue = value;
							}
						}else{
							drawValue = parseInt(smr.formatDivisionNumber(value,column.maximun)*100);
						}
					}
					
					if(columnName != "launchDate"){
						value = smr.formatNumber(value);
					}
					
					
					if(isConversionSymbol && value == 0){
						isConversionSymbol = false;
					}
					
					if (typeof column.maxLength != "undefined") {
						var maxSize = column.maxLength;
						if(value != null && value.length > maxSize){
							haveTitle = true;
							columnTitle = value;
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
					
					var id = "";
					if(columnName == "programName"){
						id = obj["id"];
						isProgramName = true;
						isUrlLink = true;
					}
					
					//for Summary Statistics Comparison the first row font weight is bold
					var isFontBold = false;
					if(sectionType == "statsComparisonSection" && i == 0){
						isFontBold = true;
					}
					
					if(sectionType == "statsComparisonSection" && value == "All Users (avg.)"){
						isFontBold = true;
					}
					
					var tableTbodyTd = smr.render("tmpl-sectionContent-dataTable-tableTbody-td-userInsight",{
						"first":first,
						"value":value,
						"programId":id,
						"isProgramName":isProgramName,
						"improvement":improvement,
						"isRate":isRate,
						"haveTitle":haveTitle,
						"columnTitle":columnTitle,
						"isConversionSymbol":isConversionSymbol,
						"conversionCurrency":smr.conversionCurrency,
						"isLastRow":isLastRow,
						"textAlignLeft":textAlignLeft,
						"textAlignCenter":textAlignCenter,
						"isFontBold":isFontBold,
						"isUrlLink":isUrlLink,
						"isCheckbox":isCheckbox,
						"isDraw":isDraw,
						"drawValue":drawValue,
						"isMock":smr.isMock()
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
	brite.registerView("sectionUserInsightOverview",{
		emptyParent: true
	},function(){
		return new smr.SectionUserInsightOverview();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
