var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _config = {
			"none":["none"],
			"domain":["none"],
			"org":["day","week", "month", "quarter", "year"],
			"orgMailing":["day","week", "month", "quarter", "year"],
			"orgDeliverability":["none","day","week", "month", "quarter", "year"],
			"mailing":["none","campaign", "program", "day", "week", "month", "quarter", "year"],
			"campaign":["none","day", "week", "month", "quarter", "year"],
			"program":["none","day", "week", "month", "quarter", "year"],
			"day":["none","week", "month", "quarter", "year"],
			"week":["none","month", "quarter", "year"],
			"month":["none","quarter", "year"],
			"quarter":["none","year"],
			"year":["none"]
	};
	
	var _configMetrics = {
			"domain":["ftaf","sharing","links"]
	};
	// --------- /Component Private Properties --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("exportPicker",{
		emptyParent: false,
		parent: "body"
	},{
		create: function(data,config){
			var view = this;
			var data = data || {};
			var width = data.width;
			var $target = data.$target;
			var right=3,top=0;
			if($target){
				top = $target.offset().top + $target.height() + 1;
			}
			var reportType = view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
			var set = smr.getSetAndType(reportType,"main").set;
			view.hasSubOrganization = typeof set.attr("includeSubOrg")=="undefined" ? false : set.attr("includeSubOrg");
			var $html = "";
			var renderData = {width:width,right:right,top:top,hasSubOrganization:view.hasSubOrganization};
			if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
				$html = $(smr.render("tmpl-exportPickerDeliverability",renderData));
			}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
				var list = set.list();
				renderData.dataSourceType = list[0].dataSourceType;
				$html = $(smr.render("tmpl-exportPickerAudience",renderData));
			}else {
				$html = $(smr.render("tmpl-exportPicker",renderData));
			}
			$("body").append("<div id='notTransparentScreen'></div>");
			return $html;
		},
			
		postDisplay:function(data,config){
			var view = this;
			var $e = view.$el;
			var data = data || {};
			var reportType = view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
			
			//by default all "Metric Categories" are selected,expect Links and Device Usage
			if(reportType!=smr.REPORT_TYPE.AUDIENCE){
				$e.find("input[name='reportSections']").each(function(){
					var $this = $(this);
					var _val = $this.val();
					$this.attr("checked",true);
					if(_val == "links" || _val == "deviceusage"){
						$this.attr("checked",false);
					}
				});
			}else{
				$e.find("input[name='reportSections'][value='size']").attr("checked",true);
				$e.find("input[name='breakDownBy'][value='month']").attr("checked",true);
			}
			
			//init radio buttons
			if(reportType == smr.REPORT_TYPE.BATCH || reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				$e.find("input[name='breakDownBy'][value='program']").attr("disabled",true).closest(".item").addClass("disable");
				$e.find("input[name='subTotalBy'][value='program']").attr("disabled",true).closest(".item").addClass("disable");
			}
			var setType = smr.getSetAndType(reportType,"main");
			var mailings = setType.set.list();
			if(mailings.length == 0){
				$e.find(".btn.export").addClass("disable");
			}
			$e.find("input[name='breakDownBy'][value='none']").attr("checked",true);
			$e.find("input[name='subTotalBy'][value='none']").attr("checked",true);
			
			view.mailings = mailings;
			view.reportType = reportType;
			
		},
		
		close : function(selected){
			this.$el.bRemove();
			$("body").find(".reportHeader-toolbar .btnExport").removeClass("sel");;
			$("body").find("#notTransparentScreen").remove();
		},
		
		events : {
			"click; .ico.icoDel,.btn.cancel" : function(){
				this.close();
			},
			
			//when no metrics categories are selected ,'Export' button should be disable 
			"change; input[name='reportSections']" : changeReportSectionsMethod,
			
			"change; input[name='breakDownBy']" : changeBreakDownByMethod,
			
			"click; .btn.export" : clickBtnExportMetod
		}
		
	});	
	// --------- /Component Registration --------- //
	
	
	// --------- events --------- //
	function changeReportSectionsMethod(){
		var view = this;
		var $e = view.$el;
				
		if(view.mailings.length == 0){
			$e.find(".btn.export").addClass("disable");
		}else{
			if($e.find("input[name='reportSections']:checked").size() > 0){
				$e.find(".btn.export").removeClass("disable");
			}else{
				$e.find(".btn.export").addClass("disable");
			}
		}
	}
		
	function changeBreakDownByMethod(event){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
				
		var breakDownBy = $(event.currentTarget).val();
		var enableSubTotals = _config[breakDownBy];
		if(breakDownBy=="org"){
			if(reportType != smr.REPORT_TYPE.DELIVERABILITY){
				enableSubTotals = _config[breakDownBy+"Mailing"];
			}else{
				enableSubTotals = _config[breakDownBy+"Deliverability"];
			}
		}
		var oriValue = $e.find("input[name='subTotalBy']:checked").val();
		$e.find("input[name='subTotalBy']").each(function(){
			var $this = $(this);
			if($.inArray($this.val(),enableSubTotals) > -1){
				$this.removeAttr("disabled");
				$this.closest(".item").removeClass("disable");
			}else{
				$this.attr("disabled",true);
				$this.closest(".item").addClass("disable");
			}
		});
				
		if(breakDownBy == "mailing"){
			if(reportType == smr.REPORT_TYPE.BATCH || reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				$e.find("input[name='subTotalBy'][value='program']").attr("disabled",true).closest(".item").addClass("disable");
			}
		}
				
		if(breakDownBy == "domain"){
			var enableMetrics = _configMetrics[breakDownBy];
			$e.find("input[name='reportSections']").each(function(){
				var $this = $(this);
				if($.inArray($this.val(),enableMetrics) > -1){
					$this.attr("checked",false);
					$this.attr("disabled",true);
					$this.closest(".item").addClass("disable");
				}
			});
					
			//when no metrics categories are selected ,'Export' button should be disable 
			if(view.mailings.length == 0){
				$e.find(".btn.export").addClass("disable");
			}else{
				if($e.find("input[name='reportSections']:checked").size() > 0){
					$e.find(".btn.export").removeClass("disable");
				}else{
					$e.find(".btn.export").addClass("disable");
				}
			}
		}else{
			$e.find("input[name='reportSections']").each(function(){
				var $this = $(this);
				$this.removeAttr("disabled");
				$this.closest(".item").removeClass("disable");
			});
		}
				
		if($.inArray(oriValue,enableSubTotals) == -1){
			$e.find("input[name='subTotalBy'][value='none']").attr("checked",true);
		}

		if(breakDownBy == "organization" &&  reportType != smr.REPORT_TYPE.DELIVERABILITY){
			$e.find("input[name='subTotalBy'][value='none']").attr("checked",false);
		}
	}
		
	function clickBtnExportMetod(event){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
				
		var $this = $(event.currentTarget);
		if($this.hasClass("disable")){
			//'Export' button is disable,do nothing
		}else{
			var breakDownBy = $e.find("input[name='breakDownBy']:checked").val();
			var subTotalBy = $e.find("input[name='subTotalBy']:checked").val();
			var reportSections = [];
					
			$e.find("input[name='reportSections']:checked").each(function(){
				reportSections.push($(this).val());
			});
					
			if(breakDownBy == "none"){
				breakDownBy = null;
			}
					
			if(subTotalBy == "none"){
				subTotalBy = null;
			}
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				subTotalBy=null;
			}

			smr.getReportAsExcel(reportType,breakDownBy,reportSections,subTotalBy);
			//close picker
			view.close();
		}
	}
		
	// --------- /events --------- //
	
})(jQuery);
