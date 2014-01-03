var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _viewRate;
	var showMailingSelectDailog = {
			"batch":true,
			"transactional":true,
			"program":true
	};
	// --------- /Component Private Properties --------- //
	
	// --------- /Component Interface Implementation ---------- //
	function SectionComparison(){}
	smr.SectionComparison = SectionComparison; 
	
	SectionComparison.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionComparison",{});
	}
		
	SectionComparison.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
		
		var viewName = data.view || "table";
		view.viewName = viewName;
		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		var reportType = view.reportType = data.reportType || view.reportType;
		view.isNewRequest = data.isNewRequest || false;
		
		data.opts = data.opts || {};
		view.autoRefresh = data.opts.autoRefresh;
		view.showView(viewName);
		
		$e.closest(".report").find(".reportHeader").find(".reportHeader-toolItems .reportHeader-toggle").addClass("reportHeader-toggle-comparison");
	}
	
	SectionComparison.prototype.events = {
			
		"click; .group":function(event){
			var view = this;
			var $e = view.$el;
			var reportType = view.reportType;
			var $this = $(event.currentTarget);
			
			var mailingSetName = $this.attr("data-set");
			// show groupA if groupA is not selected
			if(mailingSetName == "compareB"){
				var groupASet = smr.getSetAndType(reportType,"compareA");
				if(groupASet.set.list().length == 0){
					mailingSetName = "compareA";
				}
			}
			var $relatedReport = $e.closest(".report");
			brite.display("mailingPicker",$("body"),{type:reportType,mailingSetName:mailingSetName,$relatedReport:$relatedReport}).done(function(component){
				component.onClose(function(reportType,mailingSetName){
					var refresh = true;
					var mName = mailingSetName;
					// show groupB if groupB is not selected
					if(mailingSetName == "compareA"){
						var groupBSet = smr.getSetAndType(reportType,"compareB");
						if(groupBSet.set.list().length == 0){
							refresh = false;
							showGroupB($relatedReport,reportType);
						}
					}
					
					if(refresh){
						$relatedReport.bComponent().setSectionAndView("sectionComparison",null,{autoRefresh:true});
					}
				});
			});
		}
	}
	
	SectionComparison.prototype.parentEvents = {
		report:{
			//event for report view change
			"REPORTHEADER_VIEW_CHANGE" : function(e,extra){
				var view = this;
				var viewName = extra.viewName;
				view.viewName = viewName;
				if(view.showView(viewName)){
					extra.complete = true;
				}else{
					alert("Not support yet");
				}
			},
			
			//event for comparison mailing selector change
			"COMPARISON_MAILINGSELECTOR_CHANGE" : function(){
				var view = this;
				showTypeAndDate.call(view);
			},
			
			//event for report view rate change
			"REPORTHEADER_VIEWRATE_CHANGE": function(event,extra){
				var view = this;
				_viewRate = extra.value;
				view.showView(view.viewName,_viewRate);
			}
		}
	}
	
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionComparison.prototype.getSummary = function(){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"comparison","",view.isNewRequest).done(function(data){
			var dataSet = data.items[0];
			dfd.resolve(dataSet);
			$reportDataLoading.hide();
		});
		return dfd.promise();
	}
	
	SectionComparison.prototype.showView = function(viewName,viewRate){
		var view = this;
		var $e = view.$element;
		var reportType = view.reportType;
		_viewRate = $e.closest(".report").find(".reportHeader-toggle input[type='checkbox']") ? true : false;
		if(typeof viewRate != 'undefined'){
			_viewRate = viewRate;
		}
		//clean first
		$e.bEmpty();
		
		var html;
		if(viewName == 'summary'){
			var setType = smr.getSetAndType(reportType,"compareA").type;
			html = smr.render("tmpl-sectionComparison-sectionComparisonSummary",{reportType:reportType,setType:setType});
		}else{
			return false;
		}
		
		$e.append($(html));
		if(viewName == 'summary'){
			showSummaryView.call(view,_viewRate);
		}
		return true;
	}
	
	SectionComparison.prototype.destroy = function(){
		this.$el.closest(".report").find(".reportHeader").find(".reportHeader-toolItems .reportHeader-toggle").removeClass("reportHeader-toggle-comparison");
	}
	// --------- Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	
	function showSummaryView(viewRate){
		var view = this;
		var $e = view.$el; 
		var reportType = view.reportType;
		
		var view = this;
		var $e = view.$el;
		var $summary = $e.find(".sectionComparisonSummary-summary");
		var $table = $summary.find("table");
		
		//first init
		$table.find("tr:not(:first)").remove();
		// show selected
		if(view.autoRefresh != true){
			// copy groupA from current selection
			var setTypeA = smr.getSetAndType(reportType,"compareA");
			var setTypeMain = smr.getSetAndType(reportType,"main");
			smr.setDefaultSet(reportType,"compareA",setTypeMain.type.toLowerCase());
			setTypeA = smr.getSetAndType(reportType,"compareA");
			smr.copySet(setTypeA.set,setTypeMain.set);
			
			//if need to auto open groupB		
			var setTypeB = smr.getSetAndType(reportType,"compareB");
			var $relatedReport = $e.closest(".report");
			//if(setTypeB.set.list().length == 0){
			if(showMailingSelectDailog[reportType]){
				showGroupB($relatedReport,reportType);
				showMailingSelectDailog[reportType] = false;
			}
			//}
		}
		showTypeAndDate.call(view);
		view.getSummary().done(function(data){
			//show table
			var tableData = getTableData(data,viewRate,reportType);
			for(var i=0 ; i<tableData.length; i++){
				var summaryObj = tableData[i];
				var $tr = smr.render("tmpl-sectionComparison-sectionComparisonSummary-summary-tr",{
						summaryObj:summaryObj,
						viewRate:viewRate,
						reportType:reportType,
						conversionCurrency: smr.conversionCurrency,
						trCss: i%2 == 0 ? "" : "rowSel"
					});
				$table.append($tr);
			}
		});
	}
	
	function showTypeAndDate(){
		var view = this;
		var $e = view.$el; 
		var reportType = view.reportType;
		
		var $compareAMailingSelectorCount = $e.find(".groupA .count");
		var $compareBMailingSelectorCount = $e.find(".groupB .count");
		var $compareAMailingSelectorType = $e.find(".groupA .type");
		var $compareBMailingSelectorType = $e.find(".groupB .type");
		var $compareAMailingSelectorDate = $e.find(".groupA .date");
		var $compareBMailingSelectorDate = $e.find(".groupB .date");
		var $compareAMailingSelectorNeedS = $e.find(".groupA .needS");
		var $compareBMailingSelectorNeedS = $e.find(".groupB .needS");
		var setTypeA = smr.getSetAndType(reportType,"compareA");
		var setTypeB = smr.getSetAndType(reportType,"compareB");
		
		function getCount(set,type){
			var list = set.list();
			var count = 0;
			if(type=="Tag"){
				var tempName = {};
				$.each(list,function(i,temp){
					if(tempName[temp.pid]) return;
					count ++;
					tempName[temp.pid] = true;
				});
			}else{
				count = list.length;
			}
			return count;
		}
		var countA = getCount(setTypeA.set,setTypeA.type);
		var countB = getCount(setTypeB.set,setTypeB.type);
		var dateRangeA = setTypeA.set.period().getDateRange();
		var dateRangeB = setTypeB.set.period().getDateRange();
		$compareAMailingSelectorCount.html(countA);
		$compareBMailingSelectorCount.html(countB);
		$compareAMailingSelectorType.html(setTypeA.type);
		$compareBMailingSelectorType.html(setTypeB.type);
		//control the 's' display
		if(countA != 1){
			$compareAMailingSelectorNeedS.show();
		}else{
			$compareAMailingSelectorNeedS.hide();
		}
		if(countB != 1){
			$compareBMailingSelectorNeedS.show();
		}else{
			$compareBMailingSelectorNeedS.hide();
		}		
		
		if(setTypeA.set.attr("limit")){
			$compareAMailingSelectorDate.html(smr.formatDate(dateRangeA.startDate,"medium")+" - "+smr.formatDate(dateRangeA.endDate,"medium"));
		}

		if(setTypeB.set.attr("limit")){
			$compareBMailingSelectorDate.html(smr.formatDate(dateRangeB.startDate,"medium")+" - "+smr.formatDate(dateRangeB.endDate,"medium"));
		}
	}
	
	// --------- Helper Functions ---------- //
	function showGroupB($relatedReport,reportType){
		
		brite.display("mailingPicker",$("body"),{type:reportType,mailingSetName:"compareB",$relatedReport:$relatedReport}).done(function(component){
			component.onClose(function(type,name){
				$relatedReport.bComponent().setSectionAndView("sectionComparison",null,{autoRefresh:true});
			});
		});
		
	}
	
	function getTableData(data,viewRate,reportType){
		var batchTableNamesForRateOff = [
				{label:'Sent',name:'sent'},
				{label:'Failure',name:'failed'},
				{label:'Opens',name:'opens',uniqueOn:true},
				{label:'Clicks',name:'clicks',uniqueOn:true},
				{label:'Unsub',name:'unsub',uniqueOn:true},
				{label:'Complaints',name:'complaints',uniqueOn:true}
  		];
		var batchTableNamesForRateOn = [
   				{label:'Sent',name:'sent'},
   				{label:'Deliverability',name:'delivered'},
   				{label:'Open Rate',name:'opens',uniqueOn:true},
   				{label:'Click Rate',name:'clicks',uniqueOn:true},
   				{label:'Click-To-Open',name:'clickToOpen',uniqueOn:true},
   				{label:'Unsub Rate',name:'unsub',uniqueOn:true},
   				{label:'Complaints Rate',name:'complaints',uniqueOn:true}
     	];
		
		var transactionalTableNamesForRateOff = [
				{label:'Sent',name:'sent'},
				{label:'Failure',name:'failed'},
				{label:'Opens',name:'opens',uniqueOn:true},
				{label:'Clicks',name:'clicks',uniqueOn:true},
				{label:'Complaints',name:'complaints',uniqueOn:true}
		];
		
		var transactionalTableNamesForRateOn = [
   				{label:'Sent',name:'sent'},
   				{label:'Deliverability',name:'delivered'},
   				{label:'Open Rate',name:'opens',uniqueOn:true},
   				{label:'Click Rate',name:'clicks',uniqueOn:true},
   				{label:'Click-To-Open',name:'clickToOpen',uniqueOn:true},
   				{label:'Complaints Rate',name:'complaints',uniqueOn:true}
   		];
		
		var programTableNamesForRateOff = [
		        {label:'Sent',name:'sent'},
		        {label:'Failure',name:'failed'},
		        {label:'Opens',name:'opens',uniqueOn:true},
		        {label:'Clicks',name:'clicks',uniqueOn:true},
		        {label:'Unsub',name:'unsubs',uniqueOn:true},
		        {label:'Complaints',name:'complaints',uniqueOn:true}
		];
		                         		
		var programTableNamesForRateOn = [
		        {label:'Sent',name:'sent'},
		        {label:'Deliverability',name:'delivered'},
		        {label:'Open Rate',name:'opens',uniqueOn:true},
		        {label:'Click Rate',name:'clicks',uniqueOn:true},
		        {label:'Click-To-Open',name:'clickToOpen',uniqueOn:true},
		        {label:'Unsub Rate',name:'unsubs',uniqueOn:true},
		        {label:'Complaints Rate',name:'complaints',uniqueOn:true}
		];
		
		var tableNames = batchTableNamesForRateOff;
		if(viewRate){
			tableNames = batchTableNamesForRateOn;
		}
		if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			if(viewRate){
				tableNames = transactionalTableNamesForRateOn;
			}else{
				tableNames = transactionalTableNamesForRateOff;
			}
		}else if(reportType == smr.REPORT_TYPE.PROGRAM){
			if(viewRate){
				tableNames = programTableNamesForRateOn;
			}else{
				tableNames = programTableNamesForRateOff;
			}
		}
		
		//only when conversionEnabled=true,should show Conversions Revenue and Average Order Value
		if(smr.conversionEnabled){
			if(viewRate){
				tableNames.push({label:'Conversion Rate',name:'conversions'});
			}else{
				tableNames.push({label:'Conversions',name:'conversions'});
			}
			tableNames.push({label:'Total Revenue',name:'revenue'});
			tableNames.push({label:'Average Order Value',name:'averageOrderValue'});
		}
		
		tableNames = smr.sortMetrics(tableNames);
		var tableData = [];
		for(var i=0; i<tableNames.length; i++){
			var objName = tableNames[i].name;
			
			var obj = "";
			var obj2 = "";
			if(objName == "revenue" || objName == "averageOrderValue"){
				obj = data.summary["conversions"];
				obj2 = data.summary2["conversions"];
			}else{
				obj = data.summary[objName];
				obj2 = data.summary2[objName];
			}
			
			var summaryObj = {};

			summaryObj.label = tableNames[i].label;
			summaryObj.name = objName;
			
			var value = "";
			var value2 = ""; 
			if(tableNames[i].uniqueOn){
				if(reportType == smr.REPORT_TYPE.BATCH){
					if(objName == "clickToOpen"){
						value = obj.uniqueRate;
						value2 = obj2.uniqueRate;
					}else{
						value = viewRate ? obj.uniqueRate : obj.unique;
						value2 = viewRate ? obj2.uniqueRate  : obj2.unique;
					}
				}else{
					if(objName == "clickToOpen"){
						value = obj.uniqueRate;
						value2 = obj2.uniqueRate;
					}else{
						var uName = "unique" + objName.substring(0,1).toUpperCase() + objName.substring(1);
						obj = data.summary[uName];
						obj2 = data.summary2[uName];
						
						value = viewRate ? obj.rate : obj.count;
						value2 = viewRate ? obj2.rate  : obj2.count;
					}
				}
			}else{
				if(objName =='averageOrderValue'){
					value = obj.averageOrderValue;
					value2 = obj2.averageOrderValue;
				}else if(objName =='revenue'){
					value = obj.revenue;
					value2 = obj2.revenue;
				}else{
					value = viewRate ? obj.rate : obj.count;
					value2 = viewRate ? obj2.rate  : obj2.count;
				}
			}
			summaryObj.value = smr.checkNumber(value);
			summaryObj.value2 = smr.checkNumber(value2);
			summaryObj.isRate = viewRate;
			summaryObj.isCurrency = false;
			summaryObj.isNAValue = false;
			
			if(objName =='revenue' || objName =='averageOrderValue'){
				summaryObj.isRate = false;
				summaryObj.isCurrency = true;
			}else if(objName =='sent'){
				summaryObj.value = smr.checkNumber(obj.count);
				summaryObj.value2 = smr.checkNumber(obj2.count);
				summaryObj.isRate = false;
			}
			
			// percentage values
			if(viewRate){
				if(objName == "revenue" || objName == "sent" || objName == "averageOrderValue"){
					if(summaryObj.value == 0){
						summaryObj.isNAValue = true;
					}
					summaryObj.change = smr.formatDivisionNumber((summaryObj.value2 - summaryObj.value),summaryObj.value)*100;
				}else{
					summaryObj.change = summaryObj.value2 - summaryObj.value;
				}
			}else{
				if(summaryObj.value == 0){
					summaryObj.isNAValue = true;
				}
				summaryObj.change = smr.formatDivisionNumber((summaryObj.value2 - summaryObj.value),summaryObj.value)*100;
			}
			if(!isFinite(summaryObj.change)){
				summaryObj.change = 0;
			}
			summaryObj.change = summaryObj.change.toFixed("2");
			
			if(summaryObj.change != 0){
				summaryObj.upOrDown = summaryObj.change > 0 ? true : false;
			}
			
			if(!summaryObj.isRate){
				summaryObj.value = smr.formatNumber(summaryObj.value);
				summaryObj.value2 = smr.formatNumber(summaryObj.value2);
			}
			
			tableData.push(summaryObj);
		}
		
		return tableData;
	}
	// --------- /Helper Functions ---------- //
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("sectionComparison",{
		emptyParent: true,
		loadTmpl:true
	},function(){
		return new smr.SectionComparison();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
