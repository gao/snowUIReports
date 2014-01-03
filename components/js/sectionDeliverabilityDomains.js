var smr = smr || {};

(function($){
	
	// --------- Component Interface Implementation ---------- //
	function SectionDeliverabilityDomains(){};
	smr.SectionDeliverabilityDomains = SectionDeliverabilityDomains; 
	
	SectionDeliverabilityDomains.prototype.create = function(data,config){
	    return smr.render("tmpl-sectionDeliverabilityDomains",{});
	};
		
	SectionDeliverabilityDomains.prototype.postDisplay = function(data,config){
		var view = this;
	    var $e = view.$el;
	    //Remove the outer border
	    $e.closest(".report").find(".report-content").css("border","hidden");
	    
		view.reportType = data.reportType || smr.REPORT_TYPE.DELIVERABILITYDOMAINS;
		view.isNewRequest = data.isNewRequest || false;
		var viewName = "table";
		view.showView(viewName);
	};
	// --------- /Component Interface Implementation ---------- //
	
	// --------- Component Public API --------- //
	SectionDeliverabilityDomains.prototype.getAllData = function(){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary(view.reportType,"deliverabilityDomains","",view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	
	SectionDeliverabilityDomains.prototype.showView = function(viewName){
		var view = this;
		var $e = view.$el;
		
		//clean first
		$e.find(".statSummary").empty();
		$e.find(".sectionDeliverabilityDomains-view").empty();

		html = smr.render("tmpl-sectionDeliverabilityDomains-tableChart",{});
		$e.find(".sectionDeliverabilityDomains-view").append($(html));
		
		view.getAllData().done(function(dataAll){
			showTableView.call(view,dataAll);
		});
		
		return true;
	}
	// --------- /Component Public API --------- //	
		
	
	// --------- Component Private Methods --------- //
	function showTableView(dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $sectionDeliverabilityDomains = $e.find(".sectionDeliverabilityDomainsTable");
		
		//show the summary status
		showSummary.call(view,"table",dataAll);
		
		if(typeof dataAll == "undefined" || typeof dataAll.data == "undefined" || dataAll.data == null){
			$sectionDeliverabilityDomains.html("");
			$sectionDeliverabilityDomains.append("<div class='noData'>No Data!</div>");
		}else{
			$sectionDeliverabilityDomains.html("<span class=\"report-rendering-gif\">&nbsp;</span><span style='margin-left:5px;'>Rendering chart...</span>");
			var data = dataAll.data;
			
			var tableDataInfo ={
					tableColumns: [
					    {name:"Date",label:"Domain",isDomianDrilldown:true},
					    {name:"failures",label:"Failures"},
						{name:"block",label:"Block"},
						{name:"hard",label:"Hard Bounce"},
						{name:"soft",label:"Soft Bounce"},
						{name:"technical",label:"Technical"},
						{name:"unknown",label:"Unknown"}
	                ],
					tableData:[],
					reportType:reportType
				};
			
			for(var i = 0; i < data.length; i++){
				var rowData = data[i];
				if(rowData){
					var resultData = {};
					resultData = {
							"Domain":rowData.domain ? rowData.domain : 'no name',
							"Failures":smr.checkNumber(rowData.failed),
							"Block":smr.checkNumber(rowData.block),
							"Hard Bounce":smr.checkNumber(rowData.hardBounce),
							"Soft Bounce":smr.checkNumber(rowData.softBounce),
							"Technical":smr.checkNumber(rowData.technical),
							"Unknown":smr.checkNumber(rowData.unknown)
					};
					tableDataInfo.tableData.push(resultData);
				}
			}
			tableDataInfo.smaclass="SMA-REPORT-DELIVERABILITYDOMAINSDATATABLE";
			brite.display("dataTable",$e.find(".sectionDeliverabilityDomainsTable"),tableDataInfo);	
		}
	}
	
	function showSummary(viewType,dataAll){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		var $statsSummary = $e.find(".statsSummary");
		if(typeof dataAll == "undefined"){
			$statsSummary.html("");
			$statsSummary.append("<div class='noData'>No Data!</div>");
		}else{
			var summaryData = dataAll;
			var stats = [];

			stats = [
				{name:"failures",label:"Failures",value:smr.checkNumber(summaryData.failed),title:"Failures count from the 100 domains with the most failures"},
				{name:"block",label:"Block",value:smr.checkNumber(summaryData.block)},
				{name:"hard",label:"Hard Bounce",value:smr.checkNumber(summaryData.hardBounce)},
				{name:"soft",label:"Soft Bounce",value:smr.checkNumber(summaryData.softBounce)},
				{name:"technical",label:"Technical",value:smr.checkNumber(summaryData.technical)},
				{name:"unknown",label:"Unknown",value:smr.checkNumber(summaryData.unknown)}
		  	];
			
			brite.display("statsSummary",$statsSummary,{stats:stats,viewType:viewType});
		}
	}	
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionDeliverabilityDomains",{
		emptyParent: true
	},function(){
		return new smr.SectionDeliverabilityDomains();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
