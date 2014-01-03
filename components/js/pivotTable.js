var smr = smr || {};

(function($){
	
	//var _privotFilter=[{"name":"Select Filter","value":"0"},{"name":"Content Zones","value":"contentZone","items":[{"name":"All Zones","value":"0"},{"name":"Zone 1(top left)","value":"zone1"},{"name":"Zone 2(top right)","value":"zone2"},{"name":"Zone 3(middle left)","value":"zone3"},{"name":"Zone 4(middle right)","value":"zone4"},{"name":"Zone 5(bottom left)","value":"zone5"},{"name":"Zone 6(botton right)","value":"zone6"}]},{"name":"Properties","value":"properties","items":[{"name":"All Properties","value":"0"},{"name":"Brand","value":"brand"},{"name":"Category","value":"category","items":[{"name":"All Categories","value":"0"},{"name":"Electronics","value":"electronics"},{"name":"Plastic ","value":"plastic"}]},{"name":"Image Color","value":"imageColor"},{"name":"Price Range","value":"priceRange"}]}];
	
	var _metricLabel = {"sent":"sent","opens":"opens","delivered":"delivered",
						"clicks":"clicks","unsub":"unsubs","conversions":"conversions","revenue":"revenue","revenues":"revenue",
						"targeted":"targeted","invalid":"invalid","failed":"failed","delivered":"delivered",
						"deliveryRate":"deliveryRate","triggered":"targeted",
						"openRate":"openRate","clickRate":"clickRate","clickToOpen":"clickToOpen","conversionRate":"conversionRate",
						"items":"items","averageOrderValue":"averageOrderValue","revenuePerEmail":"revenuePerEmail",
						"convertToClick":"convertToClick","failures":"failures","block":"block",
						"hard":"hard"	,"soft":"soft","technical":"technical","unknown":"unknown","averageOrderValue":"averageOrderValue",
						"sharers":"sharers", "shareCount":"shareCount","failureRate":"failureRate",
						"forwaders":"forwaders"	,"forwardedMessages":"forwardedMessages","clickers":"clickers","openers":"openers","subscribers":"subscribers"
						}; 
	
	var _metricRateLabel = {"sent":"sent","opens":"openRate","delivered":"deliveryRate","clicks":"clickRate","unsub":"unsubRate","conversions":"conversionRate","averageOrderValue":"averageOrderValue",
							"failures":"failures","failureRate":"failureRate","block":"blockRate","hard":"hardRate","soft":"softRate","technical":"technicalRate","unknown":"unknownRate"};
	
	var _metricUniqueLabel = { "opens":"uniqueOpens","openRate":"uniqueOpenRate", "clicks":"uniqueClicks","clickRate":"uniqueClickRate", "unsubs":"uniqueUnsubs",
			                   "unsub":"uniqueUnsubs","unsubRate":"uniqueUnsubRate", "complaints":"uniqueComplaints","complaintRate":"uniqueComplaintRate", 
			                   "clickToOpen":"uniqueClickToOpen"};
	
	// --------- Component Registration --------- //
	brite.registerView("pivotTable",{
		emptyParent:true
	},{
		create : function(data,config){
			var view = this;
			var dfd = $.Deferred();
			view.reportType = data.reportType;
			view.isNewRequest = data.isNewRequest || false;
			view.breakDownOptions = getBreakdownsAndPivotBy.call(view,false,data.section,view.reportType);
			view.pivotByOptions = getBreakdownsAndPivotBy.call(view,true,data.section,view.reportType);
			//hide the filter for now, filter:_privotFilter,
			var renderData = {breakdown:view.breakDownOptions,metricList:data.metricList,pivotBys:view.pivotByOptions};
			var html = smr.render("tmpl-pivotTable",renderData);
			return html;
		},
			
		postDisplay : function(data,config){
			var view = this;
			var $e = view.$el;
			var dataAll = data.dataAll||[];
			var set = smr.getSetAndType(data.reportType).set;
			var pivotOption = set.attr("pivotOption");
			var pivotBy = pivotOption[data.section] || view.pivotByOptions[0];
			var breakdowns = pivotOption[data.section+"-breakdown"] ;
			
			if(!pivotOption.columns[data.section] || pivotBy.value == 0){
				pivotOption.columns[data.section] = [];
				set.attr("pivotOption",pivotOption);
			}
			if(!breakdowns){
				breakdowns = [{name:"Mailing",value:"mailing"}];
				pivotOption[data.section+"-breakdown"] = breakdowns;
				set.attr("pivotOption",pivotOption);
			}
			
			view.pageCount = 25;
			view.viewRate = data.viewRate;
			view.uniqueStats = data.uniqueStats;
			view.metricName = data.metricName;
			view.dataAll = data.dataAll || [];
			view.section = data.section;
			view.breakdowns = breakdowns;
			view.pivotBy = pivotBy;
			view.parentView = data.parentView;
			
			view.$pivotDataPart = $e.find(".pivotDataPart");
			view.$aggregatingData = $e.find(".aggregating-data");
			view.$aggregatingGray = $e.find(".aggregating-gray");
			view.$progressBar = $e.find(".report-data-progressBar");
			view.$breakdown_content = $e.find(".breakdown-partSMR .breakdown-content");
			view.$metricSelect = $e.find(".metric-partSMR .breakdown-content .breakdown-item-part");
			view.$segmentTable = $e.find(".pivotSegmentTable .dataTable");
			view.$DataTable = $e.find(".pivotDataTable .dataTable");
			view.$pivotBySelect = $e.find(".pivotByPanel .pivotby").attr("data-value",pivotBy.value);
			view.$pivotBySelect.find(".metric-name").html(pivotBy.name);
			view.pivotTableColoumn = getDataTableColum.call(view,dataAll);
			view.$pivotRunReportPanel = $e.find(".pivotRunReportPanel").hide();
			view.$pivotRunReport = $e.find(".pivotRunReport");
			view.$pivotUpdateReport = $e.find(".pivotUpdateReport");
			//view.$pivotSaveReport = $e.find(".pivotSaveReport");
			view.$grayout = $e.find(".pivotDataPart .gray-out-pivot");
			
			var mmetric = brite.array.getItem(data.metricList,"name",data.metricName);
			var fetchVal = (pivotBy.value == 0 ?  smr.fetchSingleMetric : smr.fetchSingleMetricOrigin);
			(pivotBy.value=="0"&&!fetchVal)?view.$metricSelect.attr("disabled","disabled"):view.$metricSelect.removeAttr("disabled");
			view.$metricSelect.find(".metric-name").html(mmetric.labelName);
			view.$metricSelect.attr("data-value",mmetric.name);
			
			//when fetchSingleMetric is false, hide the Pivot Metric
			if(!fetchVal && pivotBy.value=="0"){
				$e.find(".metric-partSMR").hide();
			}else{
				$e.find(".metric-partSMR").show();
			}
			
			showPivotBreakdowns.call(view,breakdowns);
			showSegmentTable.call(view,dataAll,true);
			showPivotTable.call(view,dataAll,true,1);
			pivotBreakdownDragSort.call(view);
			bingEventForCombox.call(view);
		},
		
		events : {
			
			//click Generate New Report button event
			"click; .pivotRunReportPanel .run-report": function(event){
				var view = this;
				savePivotBreakdowns.call(view);
				view.getRunReportData().done(function(dataAll){
					view.pivotTableColoumn = getDataTableColum.call(view,dataAll.data);
					showSegmentTable.call(view,dataAll.data,true);
					showPivotTable.call(view,dataAll.data,true,1);
					var pivotByValue = view.$pivotBySelect.attr("data-value");
					var fetchVal = (pivotByValue == 0 ?  smr.fetchSingleMetric : smr.fetchSingleMetricOrigin);
					(pivotByValue=="0"&&!fetchVal) ? view.$metricSelect.attr("disabled","disabled"):view.$metricSelect.removeAttr("disabled");
					var extra = {summary:dataAll.summary,metric:view.$metricSelect.attr("data-value"),clickable:false};
					view.$el.closest(".report").trigger("STATSSUMMARY_STATUS_CHANGE",extra);
					view.$pivotRunReportPanel.hide();
					view.$pivotUpdateReport.hide();
					view.$pivotDataPart.removeClass("nomargin-top");
					view.$grayout.hide();
				});
			},
			
			//pivot Update New Report button event
			"click; .pivotRunReportPanel .update-report": function(event){
				var view = this;
				view.$el.find(".pivotRunReportPanel .run-report").trigger("click");
			},
						
			//pivot option click to show "pivotOption" event
			"click;  .pivotCondtionPanel .pivotOptionsPanel":function(event){
				var view = this;
				var $target = $(event.currentTarget);
				var $pivotPanel = $target.closest(".pivotPanelSMR");
				var pivotBy = view.$pivotBySelect.attr("data-value");
				var indexOfp = pivotBy.indexOf(":");
				pivotBy = indexOfp>-1 ? pivotBy.substring(0,indexOfp) : pivotBy;
				brite.display("pivotOption",$target.parent(),{list:view.pivotTableColoumn,pivotBy:pivotBy,section:view.section,reportType:view.reportType},{emptyParent:false}).done(function(component){
					component.onClose(function(){
						//check whether need to reload pivot table (control by fetchSingleMetric in Options)
						if(smr.needReloadPivotTable){
							showPivotTable.call(view,null,false,1,true);
						}
					});
				});
			},
			
			//pivot breakdown option drop down menu click event
			"click;  .pivotCondtionPanel .metric-name, .pivotCondtionPanel .ico-downArrow":function(event){
				var view = this;
				var $this = $(event.currentTarget);
				$this.closest(".breakdown-type").find(".combox-option").toggle();
				var $breakdown_item = $this.closest(".breakdown-item");
				if($breakdown_item.size()>0){
					$breakdown_item.siblings().find(".combox-option").hide();
					view.$pivotBySelect.find(".combox-option").hide();
				}else{
					view.$breakdown_content.find(".combox-option").hide();
				}
			},
			
			//pivot breakdown option click event
			"click;  .pivotCondtionPanel .combox-option > a":function(event){
				var $this = $(event.currentTarget);
				var $thisP = $this.parent();
				if($this.hasClass("hasSub") || $this.hasClass("disabled")|| $thisP.hasClass("hasSub") || $thisP.hasClass("disabled")) return;
				comboxOptionClickEvents.call(this,$this);
			},
			
			//pivot breakdown option has sub-menu hover event
			"mouseover;  .pivotCondtionPanel .combox-option a.hasSub":function(event){
				var view = this;
				var $this = $(event.currentTarget);
				if($this.hasClass("hovered") || $this.hasClass("disabled"))return;
				$this.toggleClass("hovered");
				$this.closest(".combox-option").find("> a.hasSub:not(.hovered)").find("div").remove();
				var $select = $this.closest(".breakdown-type");
				var sub_name = $this.attr("sub-name");
				var value = $this.attr("value");
				var catalogId = (sub_name=="catalogField") ? value : "";
				view.getSubMenus(sub_name,catalogId).done(function(data){
					var subMenu = data;
					if(data && data.length > 0){
						$.each(subMenu,function(i,item){
							item.value = value+":"+ (item.id || item.name);
							if(sub_name=="catalog"){
								item.hasSub = true;
								item.subMenuName = "catalogField";
							}
							if(item.name.length>20){
								item.showTitle = true;
							   	item.ellipse = item.name.substring(0,10)+"..."+item.name.substring(item.name.length - 10);
							}
							
							//add the department
							var set = smr.getSetAndType(view.reportType,"main").set;
							var hasSubOrgs = smr.hasSubOrgs[view.reportType] || false;
							var includeSubOrg = typeof set.attr("includeSubOrg")=="undefined" ? false : set.attr("includeSubOrg");
							if(item.department && item.department != null && hasSubOrgs && includeSubOrg){
								item.showTitle = true;
								item.showDepartment = true;
							}
							
							//add a mark for Tag
							if(sub_name == "tag"){
								item.isTagSelection = true;
							}
						});

						if($this.hasClass("hovered")){
							$this.closest(".combox-option").find("> a.hasSub:not(.hovered)").find("div").remove();
							var html = smr.render("tmpl-pivotTable-pivot-sub-combox-option",{subMenu:subMenu});
							$this.find("div").remove();
							$this.append(html).find("div").show();
							disabledSelectedOptions.call(view);
						}
					}
				});
			},
			
			//pivot breakdown option  hover out event
			"mouseleave;  .pivotCondtionPanel .combox-option a":function(event){
				var $this = $(event.currentTarget);
				$this.removeClass("hovered").find(".combox-option-subsction").remove();
			},
			
			//pivot breakdown sub-menu option hover out event
			"mouseleave; .pivotCondtionPanel .combox-option-subsction > a":function(event){
				var $this = $(event.currentTarget);
				$this.removeClass("hovered").find(".combox-option-subsction").remove();
			},
			
			//pivot breakdown sub-menu option click event
			"click; .pivotCondtionPanel .combox-option-subsction a":function(event){
				var $this = $(event.currentTarget);
				var $thisP = $this.parent();
				if($this.hasClass("hasSub") || $this.hasClass("disabled")|| $thisP.hasClass("hasSub") || $thisP.hasClass("disabled")) return;
				comboxOptionClickEvents.call(this,$this);
			},
			
			
			//pivot breakdown add button event
			"click;  .breakdownPanelSMR .btnAdd":function(event){
				var view = this;
				var $this = $(event.currentTarget);
				var $breakdown_item = $this.closest(".breakdown-item").removeClass("last").removeClass("only");
				var $breakdown_content = $breakdown_item.closest(".breakdown-content");
				$breakdown_item.after(smr.render("tmpl-pivotTable-pivot-breakdown-item",{breakdown:view.breakDownOptions}));
				var breakdown_item_size = $breakdown_content.find(".breakdown-item:visible").size();
				if(breakdown_item_size>2){
					$breakdown_content.find(".breakdown-item:visible").removeClass("last");
				}
				pivotBreakdownDragSort.call(this);
				disabledSelectedOptions.call(view);
			},
			
			//pivot breakdown delete button event
			"click;  .breakdownPanelSMR .btnDelete":function(event){
				var view = this;
				var $this = $(event.currentTarget);
				var $breakdown_item = $(event.currentTarget).closest(".breakdown-item")
				var $breakdown_content = $this.closest(".breakdown-content");
				$breakdown_item.remove();
				getConditionChange.call(view);

				//add "last" class for last item and add "only" class for item when there is only one item
				if(view.$breakdown_content.find(".breakdown-item:visible").size() <3){
					view.$breakdown_content.find(".breakdown-item:visible").removeClass("last");
					view.$breakdown_content.find(".breakdown-item:visible:last").addClass("last");
				}
				if(view.$breakdown_content.find(".breakdown-item:visible").size()  == 1 ){
					view.$breakdown_content.find(".breakdown-item:visible:last").addClass("only");
				}
			},
			
			//pagination select event
			"change; .pivotTable-pagination select": function(event) {
				var view = this;
				var $this = $(event.currentTarget);
				var thisVal = $this.val();
				var pageCount = "25";
				if(thisVal == "All"){
					pageCount = "all";
				}else{
					pageCount = $this.val() * 1;
				}
				view.pageCount = pageCount;
				var pagination1 = view.$segmentTable.data("pagination");
				var pagination2 = view.$DataTable.data("pagination");
				renderTableTbody.call(view,null,null,view.$segmentTable,pagination1,1);
				renderTableTbody.call(view,null,null,view.$DataTable,pagination2,1);
			},

			//pagination end page event
			"click; .pivotTable-pagination .nextEnd.action": function(e) {
				var view = this;
				var pagination = view.$segmentTable.data("pagination");
				var pageNum = pagination.getPageInfo().pageSize;
				renderTableTbody.call(view,null,null,view.$segmentTable,pagination,pageNum);
				renderTableTbody.call(view,null,null,view.$DataTable,pagination,pageNum);
			},

			//pagination first page event
			"click; .pivotTable-pagination .prevStart.action": function(e) {
				var view = this;
				var pagination = view.$segmentTable.data("pagination");
				renderTableTbody.call(view,null,null,view.$segmentTable,pagination,1);
				renderTableTbody.call(view,null,null,view.$DataTable,pagination,1);
			},
			
			//pagination prev page event
			"click; .pivotTable-pagination .prev.action": function(e) {
				var view = this;
				var pagination = view.$segmentTable.data("pagination");
				var pageNum = pagination.getPageInfo().pageNum-1;
				renderTableTbody.call(view,null,null,view.$segmentTable,pagination,pageNum);
				renderTableTbody.call(view,null,null,view.$DataTable,pagination,pageNum);
			},
			
			//pagination next page event
			"click; .pivotTable-pagination .next.action": function(e) {
				var view = this;
				var pagination = view.$segmentTable.data("pagination");
				var pageNum = pagination.getPageInfo().pageNum+1;
				renderTableTbody.call(view,null,null,view.$segmentTable,pagination,pageNum);
				renderTableTbody.call(view,null,null,view.$DataTable,pagination,pageNum);
			},
			
			//pagination number page click event
			"click; .pivotTable-pagination .nums .pageNum": function(event) {
				var view = this;
				var pagination = view.$segmentTable.data("pagination");
				var pageNum = $(event.currentTarget).attr("data-num") * 1;
				renderTableTbody.call(view,null,null,view.$segmentTable,pagination,pageNum);
				renderTableTbody.call(view,null,null,view.$DataTable,pagination,pageNum);
			},
			
			//data table th sort event
			"click; .pivotDataPart .dataTable thead th.sortable":function(event){
				var view = this;
				var $this = $(event.currentTarget);
				var order = true;
				var segmentTableData = view.$segmentTable.data("data");
				var pivotTableData = view.$DataTable.data("data");
				var tableData = [];
				$.each(segmentTableData,function(i,item){
					var objectNewItem = $.extend(item,pivotTableData[i]);
					tableData.push(objectNewItem);
				});
				var data_order = $this.attr("data-order"); 
				var columnName = $this.data("data-column");
				if(data_order && data_order=="Desc"){
					order = false;
				}
				view.$segmentTable.find("th").removeClass("asc").removeClass("desc").removeAttr("data-order");
				view.$DataTable.find("th").removeClass("asc").removeClass("desc").removeAttr("data-order");
				order = !order;
				if(order){
					$this.addClass("asc").attr("data-order","Asc");
				}else{
					$this.addClass("desc").attr("data-order","Desc");
				}
				
				sortByDefault(tableData,columnName,order);
				renderTableTbody.call(view,null,tableData,view.$segmentTable,null,1);
				renderTableTbody.call(view,null,tableData,view.$DataTable,null,1);
				
			}
		},
		
		getSubMenus : function(options,catalogId){
			var view = this;
			var dfd = $.Deferred();
			smr.getPivotSubMenus(view.reportType,options,catalogId,view.isNewRequest).done(function(data){
				var dataSet = data.items!=null ? data.items : [];
				dfd.resolve(dataSet);
			});
			return dfd.promise();
		},
		
		getRunReportData: function(){
			var view = this;
			var dfd = $.Deferred();
			var fetchVal =  (view.pivotBy.value == 0) ? fetchVal = smr.fetchSingleMetric :smr.fetchSingleMetricOrigin;
			var actions = { "overview" : "getOverview", "volume" : "getVolume", "engagement" : "getEngagement","disengagement" : "getDisEngagement", "conversions" : "getConversions" , "failures" : "getFailures"};    
			//when smr.fetchSingleMetric is false , no need to do new request
			var needDoNewRequest = true;
			if(!smr.fetchSingleMetric){
				needDoNewRequest = false;
			}
			var psize = {width:view.$el.width(),height:view.$el.height()};
			view.$progressBar.show();
			view.$grayout.hide();
			if(smr.isIE && document.documentMode && document.documentMode == 7){
				view.$aggregatingData.width(psize.width).height(psize.height);
				view.$aggregatingGray.width(psize.width).height(psize.height);
			}
			smr.getBigDataSummary(view.reportType,actions[view.section],view.metricName,view.viewRate, view.uniqueStats, needDoNewRequest, fetchVal).done(function(data){
				var dataSet = (data.items!=null && data.items.length > 0) ?data.items[0] : {};
				view.parentView.pivotAllData = dataSet;
				view.$progressBar.hide();
				dfd.resolve(dataSet);
			});
			return dfd.promise();
		}
		
	});
	// --------- /Component Registration --------- //
	
	function comboxOptionClickEvents($this,extra){
		var view = this; 
		var $select = $this.closest(".breakdown-type");
		var value = $this.attr("value");
		var catalogSecond = "";
		var sname = getLabel($this);
		$select.attr("data-value",value);
		$select.attr("data-name",sname);
		var ellipse = null;
		if(sname.length > 24){
			ellipse = sname.substring(0,11) + "..." + sname.substring((sname.length-11), sname.length);
		}
		$select.find(".metric-name").html(ellipse || sname);
		$select.find(".metric-name").attr("title",sname)
		$select.find(".combox-option").hide();
		$select.find(".combox-option-subsction").hide();
		
		//when fetchSingleMetric is false, hide the Pivot Metric
		if($select.hasClass("pivotby")){
			if(value == 0 && !smr.fetchSingleMetric){
				view.$el.find(".metric-partSMR").hide();
			}else{
				view.$el.find(".metric-partSMR").show();
			}
		}
		
		disabledSelectedOptions.call(view);
		getConditionChange.call(view);
	}
	
	function showSegmentTable(data,isNewData){
		var view = this;
		var $e = view.$el;
		data = data || view.dataAll;
		//savePivotBreakdowns.call(view);
		var set = smr.getSetAndType(view.reportType).set;
		var pivotOption = set.attr("pivotOption");
		
		var $segmentTable = $e.find(".pivotSegmentTable .dataTable");
		var segmentTableColoumn = [];
		var pivotBy = view.$pivotBySelect.attr("data-value");
		$.each(pivotOption[view.section+"-breakdown"],function(i,breakdown){
			var value = breakdown.value;
			var name  = breakdown.name;
			if(name && name!="" && value && value!="0" && value!=""){
				var indexSuff = name.indexOf(":");
				if(indexSuff>-1)name = name.substring(indexSuff+1);
				segmentTableColoumn.push({"label":$.trim(name),"sortable":true,"hasControl":true,dvalue:value});
			}
		});
		var total = [{"label":"Total","sortable":true,"hasControl":false,"isAlginRight":true,isRate:view.totalRate,showRateStuffix:view.totalRate,"isConversionSymbol":view.totalConversionSymbol}];
		if(pivotBy!="0"){
			segmentTableColoumn = segmentTableColoumn.concat(total);
		}
		var dataSegment = {"Total":0};
		var totalValues = [];
		$.each(segmentTableColoumn,function(i,item){
			if(item.label!="Total")dataSegment[item.label] = 0;
		});
		
		var segmentTableData = [];
		for(var i=0 ;i<data.length ;i++ ){
			var breakdowns = data[i].breakdowns;
			var object = $.extend({},dataSegment);
			$.each(breakdowns,function(j,itemData){
				$.each(segmentTableColoumn,function(m,coloumn){
					if(itemData.name==coloumn.dvalue){
						var breakd = {};
						breakd[coloumn.label] = itemData.value;
						object = $.extend(object,breakd);
					}
				});
			});
			if(pivotBy!="0"){
				var metricKey = _metricLabel[view.metricName];
				metricKey = view.viewRate ? _metricRateLabel[view.metricName] : metricKey;
				metricKey = view.uniqueStats ? _metricUniqueLabel[view.metricName] : metricKey;
				object["Total"] = data[i].summary[metricKey]; 
				totalValues.push(object["Total"]);
			}
			
			segmentTableData.push(object);
		}
		
		$.each(segmentTableColoumn,function(i,item){
			if(item.label=="Total") item.bestValue = getBestValue(true,totalValues);
		});
		
		renderTableThead.call(view,segmentTableColoumn,$segmentTable);
		renderTableTbody.call(view,segmentTableColoumn,segmentTableData,$segmentTable);
		
		$segmentTable.undelegate("thead tr th .delete-pivot-col","click");
		$segmentTable.delegate("thead tr th .delete-pivot-col","click",function(){
			var index = $(this).closest("th").index();
			var $items = view.$breakdown_content.find(".breakdown-item");
			if($items.size()>1){
				view.$breakdown_content.find(".breakdown-item").eq(index).find(".btnDelete").click();
			}
		});

	}
	
	function showPivotTable(data,isNewData,coloumnPageNum,changeOption){
		var view = this;
		var $e = view.$el;
		data = data || view.dataAll;
		var $DataTable = $e.find(".pivotDataTable .dataTable");
		var pivotTableColoumn = [];
		var pivotTableData = [];
		var set = smr.getSetAndType(view.reportType).set;
		var pivotOption = set.attr("pivotOption");
		var pivotBy = view.$pivotBySelect.attr("data-value");
		if(isNewData){
			
			//when pivotOption.columns length is 0 , we use the default 
			if(pivotOption.columns[view.section].length>0){
				$.each(view.pivotTableColoumn,function(i,item){
					if(brite.array.getIndex(pivotOption.columns[view.section],"label",item.label)>-1)pivotTableColoumn.push(item);
				});
			}else{
				pivotTableColoumn = view.pivotTableColoumn;
			}
			
			//sort column
			sortPivotTableColumn(pivotBy,pivotTableColoumn,pivotOption.sortOrder=="Descending"?false:true,pivotOption.sortBy);
			var valuesArray ={};
			var pivotData = {};
			$.each(pivotTableColoumn,function(i,item){
				if(view.viewRate && item.isRate!=false) item.isRate = view.viewRate;
				valuesArray[item.label] = [];
				pivotData[item.label] = 0;
			});
			
			//fetchVal is the smr.fetchSingleMetricOrigin or smr.fetchSingleMetric, when pivotBy!=0 use Origin value
			var fetchVal = smr.fetchSingleMetricOrigin;
			if(view.pivotBy.value == 0){
				fetchVal = smr.fetchSingleMetric;
			}
			if(pivotBy!="0" || (pivotBy=="0" && fetchVal)){
				var metricKey = _metricLabel[view.metricName];
				metricKey = view.viewRate ? _metricRateLabel[view.metricName] : metricKey;
				metricKey = view.uniqueStats ? _metricUniqueLabel[view.metricName] : metricKey;
				
				for(var i=0 ;i<data.length ;i++ ){
					var columnData = data[i].columnData;
					var object = $.extend({},pivotData);
					$.each(columnData,function(j,itemData){
						for(columnName in object){
							if(columnName==itemData.columnName){
								object[columnName] = itemData[metricKey];
								valuesArray[columnName].push(itemData[metricKey]);
							}
						}
					});
					pivotTableData.push(object);
				}
			}else{
				for(var i=0 ;i<data.length ;i++ ){
					var columnData = data[i].columnData;
					var itemData = columnData[0];
					var object = $.extend({},pivotData);
					
					$.each(pivotTableColoumn,function(i,item){
						var value = itemData[_metricLabel[item.name]];
						value = view.viewRate ? itemData[_metricRateLabel[item.name]] : value;
						value = view.uniqueStats ? itemData[_metricUniqueLabel[item.name]] : value;
						
						object[item.label] = value;
						valuesArray[item.label].push(value);
					});
					pivotTableData.push(object);
				}
			}
			
			$.each(pivotTableColoumn,function(i,item){
				item.bestValue = getBestValue(true,valuesArray[item.label]);
			});
			//put the pivotTableColoumn into $DataTable ,when isNewData is false we will use it
			$DataTable.data("tableColumns-all",pivotTableColoumn);
			$DataTable.data("tableColumns-cache",pivotTableColoumn);
		}else{
			pivotTableData = $DataTable.data("data");
			pivotTableColoumnAll = $DataTable.data("tableColumns-all");
			pivotTableColoumnCache = $DataTable.data("tableColumns-cache");
			if(changeOption){
				if( pivotOption.columns[view.section].length>0){
					$.each(pivotTableColoumnAll,function(i,item){
						if(brite.array.getIndex(pivotOption.columns[view.section],"label",item.label)>-1)pivotTableColoumn.push(item);
					});
					$DataTable.data("tableColumns-cache",pivotTableColoumn);
				}else{
					pivotTableColoumn = pivotTableColoumnAll;
				}
				sortPivotTableColumn(pivotBy,pivotTableColoumn,pivotOption.sortOrder=="Descending"?false:true,pivotOption.sortBy);
			}else{
				pivotTableColoumn = pivotTableColoumnCache;
			}
		}
		
		
		var coloumnPagination = smr.Pagination(pivotTableColoumn);	
			coloumnPagination.setPageCount(4);
		var pageInfo = coloumnPagination.go(coloumnPageNum||1);
		var pObj = $.extend({},pageInfo);
		var $pivotColumnControlPanel = $e.find(".pivotColumnControlPanel");
		$pivotColumnControlPanel.html(smr.render("tmpl-pivotTable-pivot-dataTableColoumn-pagination",pObj));
		pivotTableColoumn = pageInfo.pageList;
		
		renderTableThead.call(view,pivotTableColoumn,$DataTable);
		var pagination = $DataTable.data("pagination");
		var tablePageNum = pagination ? pagination.getPageInfo().pageNum : null ;
		renderTableTbody.call(view,pivotTableColoumn,pivotTableData,$DataTable,null,tablePageNum);
		
		$pivotColumnControlPanel.undelegate(".column-prev.active","click.prev");
		$pivotColumnControlPanel.undelegate(".column-next.active","click.next");
		$pivotColumnControlPanel.delegate(".column-prev.active","click.prev", function(e) {
			var pageNum = coloumnPagination.getPageInfo().pageNum-1;
			showPivotTable.call(view,data,false,pageNum)
		});
		$pivotColumnControlPanel.delegate(".column-next.active","click.next", function(e) {
			var pageNum = coloumnPagination.getPageInfo().pageNum+1;
			showPivotTable.call(view,data,false,pageNum)
		});
		
	}
	
	
	function pivotBreakdownDragSort(){
		var view = this;
		var $breakdown_content = view.$el.find(".pivotCondtionPanel .breakdown-partSMR .breakdown-content");
		var itemSize = $breakdown_content.find(".breakdown-item").size();
		if(itemSize>1){
			
			var $holder = $breakdown_content.find(".drag-holder");
			if($holder.size()==0){
				$holder = $("<div style='display:none' class='breakdown-item drag-holder'><div class='cb'></div></div>");
				$breakdown_content.append($holder);
				$holder = $breakdown_content.find(".drag-holder");
			}
			
			function getHolderIndex(top){
				if(top<=12) return 0;
				if(top>12 && top<=36) return 1;
				if(top>36 && top<=60) return 2;
				return itemSize;
			}
			
			$breakdown_content.find(".breakdown-item").off("bdragstart");
			$breakdown_content.find(".breakdown-item").off("bdragmove");
			$breakdown_content.find(".breakdown-item").off("bdragend");
			
			$breakdown_content.find(".breakdown-item").on("bdragstart",function(event){
			     var $this = $(this);
			     var offset = $this.position();
			     var top = offset.top;
			     $this.css({position: 'absolute',"z-index":2,top:top,left:0});
			     $holder.show().attr("index",getHolderIndex(top));
			     $this.after($holder);
			     $breakdown_content.find(".breakdown-item:last").after($this);
	        });
	            
			$breakdown_content.on("bdragmove",".breakdown-item",function(event){
			    var $this = $(this);
			    var offset = $this.position();
			    var top = offset.top + event.bextra.deltaY;
			    $this.css({top:top});
				var index = getHolderIndex(top);
				if(index != parseInt($holder.attr("index"))){
					$holder.attr("index",index);
					if(index+1==itemSize){
						$breakdown_content.find(".breakdown-item:not([index])").eq(index).after($holder);
					}else{
						$breakdown_content.find(".breakdown-item:not([index])").eq(index).before($holder);
					}
				}
	          });
			
			$breakdown_content.on("bdragend",".breakdown-item",function(){
				var $this = $(this);
				$this.removeAttr("style");
				$holder.after($this);
				$holder.hide();
	            pivotBreakdownDragEnd.call(view,$breakdown_content);
	        });
		}
		addZindexforBreakdownItems.call(view);
	}
	
	function pivotBreakdownDragEnd($breakdown_content){
		//when DragEnd , we should also check the condition change
		getConditionChange.call(this);
		if($breakdown_content.find(".breakdown-item").size() <3){
			$breakdown_content.find(".breakdown-item").removeClass("last");
			$breakdown_content.find(".breakdown-item:last").addClass("last");
		}
		addZindexforBreakdownItems.call(this);
	}
	
	
	function renderTableThead(tableColumns, $table){
		var view = this;
		var $e = view.$el;
		$table.find("thead").empty().append("<tr></tr>");
		var ellpsisLength ={"1":36,"2":18,"3":10,"4":5};
		var ellpsisLengthData ={"2":50,"3":30,"4":20};
		var needEllpsis = $table.parent().hasClass("pivotSegmentTable") ? true :false;
		
		//when there is no tableColumns , we will show a empty DIV
		if(typeof tableColumns=="undefined" || tableColumns==null || tableColumns.length==0 || typeof tableColumns[0]=="undefined"){
			$table.find("thead tr").append("<th class=\"tl alginRight\"><div class=\"label floatRight\">&nbsp;</div></th>");
			return;
		}
		for (var i = 0; i < tableColumns.length; i++) {
			var column = tableColumns[i];
			var columnLable = column.label;
			var hasControl = false;
			var sortable = false;
			var isAlginRight = false;
			var showRateStuffix = false;
			var maxLength = ellpsisLength[tableColumns.length];
			var ellpsis = false;
			var ellpsisLabel = column.label;
			
			if(typeof column.hasControl != 'undefined'){
				hasControl = column.hasControl;
			}
			if(typeof column.sortable != 'undefined'){
				sortable = column.sortable;
			}
			if(typeof column.isAlginRight != 'undefined'){
				isAlginRight = column.isAlginRight;
			}
			if(typeof column.showRateStuffix != 'undefined'){
				showRateStuffix = column.showRateStuffix;
			}
			
			//pivotSegmentTable and pivotDataTable both need to ellipsis when label too long
			if(needEllpsis){
				if(columnLable.length> maxLength){
					ellpsis = true;
					ellpsisLabel = columnLable.substring(0,maxLength-2)+"..";
				}
			}else{
				maxLength = ellpsisLengthData[tableColumns.length];
				if(columnLable.length > maxLength){
					ellpsis = true;
					ellpsisLabel = columnLable.substring(0,maxLength-3)+"...";
				}
			}
			var tableThead = smr.render("tmpl-pivotTable-pivot-dataTable-tableThead",{
				"label":columnLable,
				"ellpsisLabel":ellpsisLabel,
				"ellpsis":ellpsis,
				"sortable":sortable,
				"isAlginRight":isAlginRight,
				"showRateStuffix":showRateStuffix,
				"hasControl":hasControl
			});
			var $tableThead = $(tableThead);
			$tableThead.data("data-column",columnLable);
			if((i+1)!=tableColumns.length)$tableThead.css("width",parseInt(100/tableColumns.length)+"%");
			$table.find("thead tr").append($tableThead);
		}
		
		if((tableColumns.length==1 || (view.pivotBy.value!="0" && tableColumns.length==2)) && needEllpsis){
			$table.find("thead tr").find(".control .delete-pivot-col").hide();
		}
	}
	
	function renderTableTbody(tableColumns,tableData,$table,pagination,pageNum){
		var view = this;
		var $e = view.$el;
		var $tbody = $table.find("tbody").empty();

		if(tableColumns){
			$table.data("tableColumns",tableColumns);
		}else{
			tableColumns = $table.data("tableColumns");
		}
		if(tableData){
			$table.data("data",tableData);
		}else{
			tableData = $table.data("data");
		}
		if(!pagination){
			pagination = smr.Pagination(tableData);
		}
		$table.data("pagination",pagination);
		pagination.setPageCount(view.pageCount);
		var pageInfo = pagination.go(pageNum||1);
		var start = (pageInfo.startRows-1 >0) ? (pageInfo.startRows-1) :0 ;
		var ellpsisLengthData ={"2":24,"3":14,"1":46,"4":10};
		for(var i=start; i<pageInfo.endRows;i++) {
			var obj = tableData[i];
			var tableTbody = smr.render("tmpl-pivotTable-pivot-dataTable-tableTbody",{index:i});
			var $thisTr = $(tableTbody);
			for (var k = 0; k < tableColumns.length; k++) {
				var column = tableColumns[k];
				var columnName = column.label;
				var value = obj[columnName];
				var isAlginRight = false;
				var haveBestVaule = false;
				var isRate = false;
				var isConversionSymbol = false;
				
				if (typeof column.isConversionSymbol != "undefined") {
					isConversionSymbol = column.isConversionSymbol;
				}
				if (typeof column.isAlginRight != "undefined") {
					isAlginRight = column.isAlginRight;
				}
				if (typeof column.isRate != "undefined") {
					isRate = column.isRate;
				}
				if (typeof column.bestValue != "undefined" && column.bestValue.value == value && column.bestValue.haveBestVaule ) {
					haveBestVaule = true;
				}else{
					haveBestVaule = false;
				}
				//format the value to 2 decimal point
				if(isRate){
					value = smr.formatToFixed(value);
				}
				//format the number
				if(typeof value=="number"){
					value = smr.formatNumber(value);
				}
				
				var maxLength = ellpsisLengthData[tableColumns.length] || 20;
				var ellpsis = null;
				if((value+"").length > maxLength){
					ellpsis = (value+"").substring(0,maxLength-3)+"...";
				}
				
				var tableTbodyTd = smr.render("tmpl-pivotTable-pivot-dataTable-tableTbody-td",{
					"value":value,
					"ellpsis":ellpsis,
					"isRate":isRate,
					"isAlginRight":isAlginRight,
					"haveBestVaule":haveBestVaule,
					"isConversionSymbol":isConversionSymbol,
					"conversionCurrency":smr.conversionCurrency,
					"isMock":smr.isMock()
				});
				$thisTr.append(tableTbodyTd);
			}
			$tbody.append($thisTr);
		}
		$table.find("thead").show();
		if(tableData==null || tableData.length==0){
			$table.find("thead").hide();
			$tbody.append(smr.render("tmpl-pivotTable-pivot-dataTable-nodata",{colspan:tableColumns.length}));
		}
		var paginationHtml = smr.render("tmpl-pivotTable-pagination",pageInfo);
		$e.find(".pivotDataTable .pivot-table-bottom").html(paginationHtml);
	}
	
	
	function getDataTableColum(dataAll){
		var view = this;
		var pivotBy = view.$pivotBySelect.attr("data-value");
		var pivotTableColoumn = [];
		var fetchVal = smr.fetchSingleMetricOrigin;
		if(view.pivotBy.value == 0){
			fetchVal = smr.fetchSingleMetric;
		}
		if(pivotBy=="0" && !fetchVal){
			if(view.section=="overview"){
				pivotTableColoumn.push({"name":"sent","label":"Sent","isAlginRight":true,"dateSort":7,"sortable":true,isRate:false});
				pivotTableColoumn.push({"name":"delivered","label":"Delivered","isAlginRight":true,"dateSort":6,"sortable":true});
				pivotTableColoumn.push({"name":"opens","label":"Opens","isAlginRight":true,"dateSort":5,"sortable":true});
				pivotTableColoumn.push({"name":"clicks","label":"Clicks","isAlginRight":true,"dateSort":4,"sortable":true});
				if(view.reportType == smr.REPORT_TYPE.BATCH){
			  		pivotTableColoumn.push({"name":"unsub","label":"Unsub","isAlginRight":true,"dateSort":3,"sortable":true});
			  	}else if(view.reportType == smr.REPORT_TYPE.PROGRAM){
					pivotTableColoumn.push({"name":"unsub","label":"Unsubs","isAlginRight":true,"dateSort":3,"sortable":true});
				}
				if(smr.conversionEnabled){
					pivotTableColoumn.push({"name":"conversions","label":"Conversions","isAlginRight":true,"dateSort":2,"sortable":true});
					pivotTableColoumn.push({"name":(view.viewRate?"averageOrderValue":"revenue"),"label":(view.viewRate?"Average Order Value":"Revenue"),
						"isAlginRight":true,"dateSort":1,"sortable":true,isConversionSymbol:true,isRate:false});
				}							
			}else if(view.section=="volume"){
				pivotTableColoumn.push({"name":"targeted","label":(view.reportType == smr.REPORT_TYPE.BATCH ? "Targeted" : "Triggered"),"isAlginRight":true,"dateSort":6,"sortable":true});
				pivotTableColoumn.push({"name":"invalid","label":"Invalid","isAlginRight":true,"dateSort":5,"sortable":true});
				pivotTableColoumn.push({"name":"sent","label":"Sent","isAlginRight":true,"dateSort":4,"sortable":true});
				pivotTableColoumn.push({"name":"failed","label":"Failed","isAlginRight":true,"dateSort":3,"sortable":true});
				pivotTableColoumn.push({"name":"delivered","label":"Delivered","isAlginRight":true,"dateSort":2,"sortable":true});
				pivotTableColoumn.push({"name":"deliveryRate","label":"Delivery Rate","isAlginRight":true,"dateSort":1,"sortable":true,isRate:true});
			}else if(view.section=="engagement"){
				pivotTableColoumn.push({"name":"opens","label":"Opens","isAlginRight":true,"dateSort":5,"sortable":true});
				pivotTableColoumn.push({"name":"openRate","label":"Open %","isAlginRight":true,"dateSort":4,"sortable":true,isRate:true});
				pivotTableColoumn.push({"name":"clicks","label":"Clicks","isAlginRight":true,"dateSort":3,"sortable":true});
				pivotTableColoumn.push({"name":"clickRate","label":"Click %","isAlginRight":true,"dateSort":2,"sortable":true,isRate:true});
				pivotTableColoumn.push({"name":"clickToOpen","label":"Click-to-Open","isAlginRight":true,"dateSort":1,"sortable":true,isRate:true});
			}else if(view.section=="disengagement"){	
				if(view.reportType==smr.REPORT_TYPE.BATCH){
					pivotTableColoumn.push({"name":"unsub","label":"Unsub","isAlginRight":true,"dateSort":5,"sortable":true});
					pivotTableColoumn.push({"name":"unsubRate","label":"Unsub Rate","isAlginRight":true,"dateSort":4,"sortable":true,isRate:true});
				}else if(view.reportType==smr.REPORT_TYPE.PROGRAM){
					pivotTableColoumn.push({"name":"unsubs","label":"Unsubs","isAlginRight":true,"dateSort":5,"sortable":true});
					pivotTableColoumn.push({"name":"unsubRate","label":"Unsub Rate","isAlginRight":true,"dateSort":4,"sortable":true,isRate:true});
				}
				pivotTableColoumn.push({"name":"complaints","label":"Complaints","isAlginRight":true,"dateSort":3,"sortable":true});
				pivotTableColoumn.push({"name":"complaintRate","label":"Complaint Rate","isAlginRight":true,"dateSort":2,"sortable":true,isRate:true});
			}else if(view.section=="conversions"){
				pivotTableColoumn.push({name:"conversions",label:"Conversions","isAlginRight":true,"dateSort":7,"sortable":true});
				pivotTableColoumn.push({name:"conversionRate",label:"Conversion Rate","isAlginRight":true,"dateSort":6,"sortable":true,isRate:true});
				pivotTableColoumn.push({name:"items",label:"Items","isAlginRight":true,"dateSort":5,"sortable":true});
				pivotTableColoumn.push({name:"revenue",label:"Revenue","isAlginRight":true,"dateSort":4,"sortable":true,isConversionSymbol:true});
				pivotTableColoumn.push({name:"averageOrderValue",label:"Average Order Value","isAlginRight":true,"dateSort":3,"sortable":true,isConversionSymbol:true});
				pivotTableColoumn.push({name:"revenuePerEmail",label:"Revenue Per Email","isAlginRight":true,"dateSort":2,"sortable":true,isConversionSymbol:true});
				pivotTableColoumn.push({name:"convertToClick",label:"Convert-to-Click","isAlginRight":true,"dateSort":1,"sortable":true,isRate:true});
			}else if(view.section=="failures"){
				pivotTableColoumn.push({name:"failures",label:"Failures","isAlginRight":true,"dateSort":7,"sortable":true,isRate:false});
				pivotTableColoumn.push({name:"failureRate",label:"Failure Rate","isAlginRight":true,"dateSort":6,"sortable":true,isRate:true});
				pivotTableColoumn.push({name:"block",label:"Block","isAlginRight":true,"dateSort":5,"sortable":true});
				pivotTableColoumn.push({name:"hard",label:"Hard Bounce","isAlginRight":true,"dateSort":4,"sortable":true});
				pivotTableColoumn.push({name:"soft",label:"Soft Bounce","isAlginRight":true,"dateSort":3,"sortable":true});
				pivotTableColoumn.push({name:"technical",label:"Technical","isAlginRight":true,"dateSort":2,"sortable":true});
				pivotTableColoumn.push({name:"unknown",label:"Unknown","isAlginRight":true,"dateSort":1,"sortable":true});
			}
			/* 2013-06-12  hide the pivot in Sharing section
			else if(view.section=="sharing"){
				pivotTableColoumn.push({name:"sharers",label:"Sharers","isAlginRight":true,"dateSort":3,"sortable":true});
				pivotTableColoumn.push({name:"shareCount",label:"Share Count","isAlginRight":true,"dateSort":2,"sortable":true});
				pivotTableColoumn.push({name:"clicks",label:"Clicks","isAlginRight":true,"dateSort":1,"sortable":true});
			}else if(view.section=="sharingFTAF"){
				pivotTableColoumn.push({name:"forwaders",label:"Forwarders","isAlginRight":true,"dateSort":5,"sortable":true});
				pivotTableColoumn.push({name:"forwardedMessages",label:"Forwarded Messages","isAlginRight":true,"dateSort":4,"sortable":true});
				pivotTableColoumn.push({name:"clickers",label:"Clickers","isAlginRight":true,"dateSort":3,"sortable":true});
				pivotTableColoumn.push({name:"openers",label:"Openers","isAlginRight":true,"dateSort":2,"sortable":true});
				pivotTableColoumn.push({name:"subscribers",label:"Subscribers","isAlginRight":true,"dateSort":1,"sortable":true});
			}*/
		}else{
			var isRate = view.viewRate;
			var isConversionSymbol = false;
			if(view.section=="engagement" || view.section=="disengagement" || view.section=="conversions" || view.section=="volume"){
				if(view.metricName=="openRate"    || view.metricName=="clickRate" ||  
				   view.metricName=="clickToOpen" || view.metricName=="unsubRate" ||
				   view.metricName=="complaintRate" || view.metricName=="conversionRate" ||
				   view.metricName=="convertToClick"|| view.metricName=="deliveryRate"
				  )isRate = true;
			}
	
			if(view.section=="conversions" || view.section=="overview" || view.section=="failures" ){
				if(view.metricName=="revenue" || view.metricName=="revenues" || view.metricName=="averageOrderValue" || view.metricName=="revenuePerEmail"){
					isConversionSymbol = true;
					isRate = false;
				}
				if(view.metricName=="sent" || view.metricName=="failures"){
					isRate = false;
				}
				if(view.metricName=="failureRate"){
					isRate = true;
				}
			}
			view.totalConversionSymbol = isConversionSymbol;
			view.totalRate = isRate;
			if(dataAll[0] && dataAll[0].columnData){
				var columnData = dataAll[0].columnData;
				smr.newSort(columnData,"columnName",false); 
				$.each(columnData,function(i,item){
					pivotTableColoumn.push({"label":item.columnName,"isAlginRight":true,launchTime:item.launchTime,"dateSort":i,"sortable":true,"isRate":isRate,"isConversionSymbol":isConversionSymbol});
				});
			}
		}
		return pivotTableColoumn;
	}
	
	function savePivotBreakdowns(){
		var view = this;
		var set = smr.getSetAndType(view.reportType).set;
		var pivotOption = set.attr("pivotOption");
		pivotOption[view.section+"-breakdown"] = [];
		view.$element.find(".breakdownPanelSMR .breakdown-partSMR .breakdown-type").each(function(i){
			var $this =  $(this);
			var value =  $this.attr("data-value");
			var name  =  $this.find(".metric-name").text();
			var title =  $this.find(".metric-name").attr("title");
			if(value && value!="0" && value!=""){
				pivotOption[view.section+"-breakdown"].push({name:title||name,value:value});
			}
		});
		var pivotBy = view.$pivotBySelect.attr("data-value");
		var pivotByName = view.$pivotBySelect.find(".metric-name").text();
		var pivotByTitle = view.$pivotBySelect.find(".metric-name").attr("title");
		pivotOption.columns[view.section]=[];
		pivotOption[view.section] = {name:pivotByTitle || pivotByName,value:view.$pivotBySelect.attr("data-value")};
		set.attr("pivotOption",pivotOption);
		//update the pivotBy , metricName , breakdowns for this view
		view.pivotBy = pivotOption[view.section];
		view.metricName = view.$metricSelect.attr("data-value");
		view.breakdowns = pivotOption[view.section+"-breakdown"];
	}
	
	function showPivotBreakdowns(breakdowns){
		var view = this;
		if(breakdowns){
			var $breakdown_content = view.$el.find(".breakdown-partSMR .breakdown-content");
			$.each(breakdowns,function(i,breakdown){
				var breakdownName = breakdown.name;
				
				//for Catalog use the center ellipsis
				var ellipse = null;
				if(breakdownName.length > 22){
					ellipse = breakdownName.substring(0,10) + "..." + breakdownName.substring((breakdownName.length-10),breakdownName.length);
				}
				
				if(i==0){
					//for first BreakDown item
					var $fistItem = $breakdown_content.find(".breakdown-item").eq(0);
					$fistItem.find(".metric-name").text(ellipse || breakdownName);
					if(ellipse)$fistItem.find(".metric-name").attr("title", breakdownName);
					$fistItem.find(".breakdown-type").attr("data-value", breakdown.value);
					$fistItem.find(".breakdown-type").attr("data-name", breakdownName);
				}else{
					//for BreakDown item
					var html = smr.render("tmpl-pivotTable-pivot-breakdown-item",{breakdown:view.breakDownOptions});
					var $html = $(html);
					$html.find(".metric-name").text(ellipse || breakdownName);
					if(ellipse)$html.find(".metric-name").attr("title", breakdownName);
					$html.find(".breakdown-type").attr("data-value", breakdown.value);
					$html.find(".breakdown-type").attr("data-name", breakdownName);
					$breakdown_content.append($html);
				}
			});
			disabledSelectedOptions.call(view);
			var $breakdown_item = $breakdown_content.find(".breakdown-item").removeClass("last").removeClass("only");
			var breakdown_item_size =  $breakdown_item.size();
			if(breakdown_item_size==1) $breakdown_item.addClass("only");
			if(breakdown_item_size <3) $breakdown_content.find(".breakdown-item:last").addClass("last");
			if(breakdown_item_size >2) $breakdown_content.find(".breakdown-item").removeClass("last");
		}
	}
	
	function disabledSelectedOptions(){
		var view = this;
		var hasDateBased = false;
		var dataBased = "";
		var datebase = {"day":true,"week":true,"month":true,"quarter":true,"year":true};
		var hasTagSelection = false;
		var tagSelectionVal = "";
		view.$el.find(".combox-option a.disabled").removeClass("disabled");
		
		var pagebreakdowns = [];
		var pivotValue = view.$pivotBySelect.attr("data-value");
		view.$breakdown_content.find(".breakdown-type").each(function(){
			var value = $(this).attr("data-value");
			if(value && value!="0")pagebreakdowns.push({value:value});
		});
		
		$.each(pagebreakdowns,function(i,breakdown){
			if(!hasDateBased){
				hasDateBased= datebase[breakdown.value] || false;
				dataBased = datebase[breakdown.value] ? breakdown.value : "";
			}
			view.$breakdown_content.find(".combox-option a[value='"+breakdown.value+"']").addClass("disabled");
			
			//for tag only show in one dropdown
			if(breakdown.value.indexOf("tag:")>-1){
				view.$pivotBySelect.find(".combox-option .tagSelection").addClass("disabled");
				hasTagSelection = true;
				tagSelectionVal = breakdown.value;
			}else{
				view.$pivotBySelect.find(".combox-option a[value='"+breakdown.value+"']").addClass("disabled");
			}
		});
		
		//for tag only show in one dropdown list
		if(pivotValue.indexOf("tag:")>-1){
			view.$breakdown_content.find(".combox-option .tagSelection").addClass("disabled");
		}else{
			view.$breakdown_content.find(".combox-option a[value='"+pivotValue+"']").addClass("disabled");
		}
		view.$pivotBySelect.find(".combox-option a[value='"+pivotValue+"']").addClass("disabled");		
		
		if(!hasDateBased){
			hasDateBased= datebase[pivotValue] || false;
			dataBased = datebase[pivotValue] ? pivotValue : "";
		}

		if(hasDateBased){
			if(pivotValue!=dataBased){
				view.$pivotBySelect.find(".datebased").addClass("disabled");
			}
			view.$breakdown_content.find(".breakdown-type").each(function(){
				var $this = $(this);
				if($this.attr("data-value")!=dataBased){
					$this.find(".datebased").addClass("disabled");
				}
			});
		}
		
		//tag only can select in one breakdown
		if(hasTagSelection){
			view.$breakdown_content.find(".breakdown-type").each(function(){
				var $this = $(this);
				if($this.attr("data-value") != tagSelectionVal){
					$this.find(".tagSelection").addClass("disabled");
				}
			});
		}
		
		var $tragetOption = null;
		var $catalogOption = null;
		var $regionOption = null;
		view.$el.find(".breakdown-item-part").each(function(){
			var $thisItem = $(this);
			var pvalue = $thisItem.attr("data-value");
			if(pvalue=="region")$regionOption = $thisItem;
			if(pvalue=="target")$tragetOption = $thisItem;
			if(pvalue && pvalue.indexOf("catalog:")>-1)$catalogOption = $thisItem;
		});
		
		if($tragetOption){
			view.$el.find(".breakdown-item-part .combox-option a[value='region']").addClass("disabled");
			view.$el.find(".breakdown-item-part .combox-option a[value='catalog']").addClass("disabled");
			$tragetOption.find(".combox-option a[value='region']").removeClass("disabled");
			$tragetOption.find(".combox-option a[value='catalog']").removeClass("disabled");
		}
		
		if($catalogOption){
			view.$el.find(".breakdown-item-part .combox-option a[value='target']").addClass("disabled");
			$catalogOption.find(".combox-option a[value='target']").removeClass("disabled");
		}
		
		if($regionOption){
			view.$el.find(".breakdown-item-part .combox-option a[value='target']").addClass("disabled");
			$regionOption.find(".combox-option a[value='target']").removeClass("disabled");
		}
		
	}
	
	
	function getLabel($this){
		var label = "";
		while($this.size()>0){
			var $select_option_name = $this.find("> span.select-option-name");
			var select_option_name = $select_option_name.attr("data-n") || $select_option_name.html();
			if(select_option_name=="Mailing Tag"){
				select_option_name = "Tag"
			}else if(select_option_name=="Audience Segmentation"){
				select_option_name = "Segmentation";
			}
			label = select_option_name +(label.length>0?": ":"")+ label;
			$this = $this.parents("a.hasSub");
		}
		return label;
	}
	
	//can sort by string and number;
	function sortByDefault(arr,columnName,order){
		smr.newSort(arr,columnName,order); 
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
	
	function getBreakdownsAndPivotBy(isPivotBy,section,reportType){
		var options = [];
		if(isPivotBy)options.push({"name":"---- Select","value":"0"});
		options.push({"name":"Day","value":"day","datebased":true});
		options.push({"name":"Week","value":"week","datebased":true});
		options.push({"name":"Month","value":"month","datebased":true});
		options.push({"name":"Quarter","value":"quarter","datebased":true});
		options.push({"name":"Year","value":"year","datebased":true});
		options.push({"name":"Mailing","value":"mailing"});
		options.push({"name":"Campaign","value":"campaign"});
		if(reportType != smr.REPORT_TYPE.PROGRAM){
			options.push({"name":"Mailing Tag","value":"tag","hasSub":true,"subMenu":[],"subMenuName":"tag"});
		}
        options.push({"name":"Domain","value":"domain"});
        if(reportType == smr.REPORT_TYPE.BATCH){
        	options.push({"name":"Target","value":"target"});
        }
        if(section=="overview" || section=="engagement")options.push({"name":"Content Region","value":"region"});
        if(section=="engagement" && smr.showCatalogInPivot){
        	options.push({"name":"Catalog","value":"catalog","hasSub":true,"subMenu":[],"subMenuName":"catalog"});
        }
        if(smr.showSegmentInPivot){
        	options.push({"name":"Audience Segmentation","value":"segment","hasSub":true,"subMenu":[],"subMenuName":"segment"});
        }
        
        return options;
	}
	
	function sortPivotTableColumn(pivotBy,pivotTableColoumn,order,sortBy){
		if(pivotBy==null || pivotBy=="0"){
			smr.newSort(pivotTableColoumn,"dateSort",order);return;
		}
		if(pivotBy=="day" || pivotBy=="week" || pivotBy=="month" || pivotBy=="quarter"){
			pivotTableColoumn.sort(function(a,b){
				return newParseDate(pivotBy,a.label)-newParseDate(pivotBy,b.label);
			});
		}else if(pivotBy=="year"){
			pivotTableColoumn.sort(function(a,b){
				return parseInt(a.label)-parseInt(b.label);
			});
		}else if(pivotBy=="year"){
			pivotTableColoumn.sort(function(a,b){
				return parseInt(a.label)-parseInt(b.label);
			});
		}else if(pivotBy=="mailing"){
			if(sortBy=="Date"){
				smr.newSort(pivotTableColoumn,"launchTime",order);return;
			}else{
				smr.newSort(pivotTableColoumn,"dateSort",order);return;
			}
		}
		if(order)pivotTableColoumn.reverse();
	}
	
	function newParseDate(type,d){
		var months = {"Jan":"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":"06","Jul":"07","Aug":"08","Sep":"09","Oct":"10","Nov":"11","Dec":"12"};
		var quarter = {"Q1":"01","Q2":"04","Q3":"07","Q5":"10"};
		var ds = (d+"").split(" ");
		if (type=="day"){
			return smr.parseDate(d);
		}else if(type=="week"){
			return smr.parseDate(months[ds[0]]+"/"+ds[1]+"/"+ds[2]);
		}else if (type=="quarter"){
			return smr.parseDate(quarter[ds[0]]+"/"+"01"+"/"+ds[1]);
		}else if (type=="month"){
			return smr.parseDate(months[ds[0]]+"/"+"01"+"/"+ds[1]);
		} 
	}
	
	
	function bingEventForCombox(){
		var view = this;
		$("body").undelegate(".pivotTable","click.pivotcombox");
		$("body").delegate(".pivotTable","click.pivotcombox",function(event){
			var $tagevalues = $(event.target).closest(".breakdown-type");
			if($tagevalues.size()==0){
				view.$el.find(".combox-option").hide();
			}
		});
	}
	
	function addZindexforBreakdownItems(){
		var view = this;
		view.$breakdown_content.find(".breakdown-item").each(function(i){
			$(this).css("z-index",4-i);
		});
	}
	
	function getConditionChange(){
		var isChanged = false;
		var view = this;
		var set = smr.getSetAndType(view.reportType).set;
		var pivotOption = set.attr("pivotOption");
		var pivotBy = pivotOption[view.section] || view.pivotByOptions[0];
		
		
		//compare the metric change or not
		if(view.metricName != view.$metricSelect.attr("data-value")){
			isChanged = true;
		}
		
		//compare the breakdowns change or not
		var pagebreakdowns = [];
		var breakdowns = pivotOption[view.section+"-breakdown"] ;
		view.$breakdown_content.find(".breakdown-type").each(function(){
			var value = $(this).attr("data-value");
			if(value && value!="0")
				pagebreakdowns.push({value:value});
		});
		if(pagebreakdowns.length!=breakdowns.length){
			isChanged = true;
		}else{
			$.each(pagebreakdowns,function(i){
				if(breakdowns[i].value != pagebreakdowns[i].value){
					isChanged = true;
				}
			});
		}

		//compare the pivot by change or not
		if(pivotBy.value != view.$pivotBySelect.attr("data-value")){
			isChanged = true;
		}
		
		if(isChanged){
			//view.$pivotRunReport.hide();
			view.$pivotRunReportPanel.show();
			view.$pivotUpdateReport.show();
			view.$grayout.show();
			view.$pivotDataPart.addClass("nomargin-top");
			//view.$pivotSaveReport.hide();
		}else{
			//view.$pivotRunReport.show();
			view.$pivotRunReportPanel.hide();
			view.$pivotUpdateReport.hide();
			view.$pivotDataPart.removeClass("nomargin-top");
			view.$grayout.hide();
			//view.$pivotSaveReport.hide();
		}
	}
	
})(jQuery);
