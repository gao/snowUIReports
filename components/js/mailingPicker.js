var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _tempPrevSet = null;
	var _defaultStartDate="";
	var _defaultEndDate="";
    var _firstCampaignOverview = true;
	//--------- /Component Private Properties --------- //
		
	// --------- Component Interface Implementation ---------- //
	function MailingPicker(){};
	smr.MailingPicker = MailingPicker; 
	
	MailingPicker.prototype.create = function(data,config){
		data = data || {};
		var mailingSetName = this.mailingSetName = data.mailingSetName || "main";
		var extTitle = "";
		if(mailingSetName != "main"){
			extTitle = mailingSetName == "compareA" ? "For Group A" : "For Group B";
		}
		var posWH = smr.getMailingPickerUIStates("PosWH");
		var posXY = smr.getMailingPickerUIStates("PosXY");
		if(smr.isIE && smr.isIE[1] == '7.0'){
			var posUI = {
					left: 	"",
					top:	"",
					width:	"",
					height:	""
			};
		}else{
			var posUI = {
					left: 	posXY.length > 0 ? posXY[0].left+"px" : "",
					top:	posXY.length > 0 ? posXY[0].top+"px" : "",
					width:	posWH.length > 0 ? posWH[0].width+"px" : "",
					height:	posWH.length > 0 ? posWH[0].height+"px" : ""
			};
		}
		
		$("body").append("<div id='notTransparentScreen'></div>");
		var html = smr.render("tmpl-mailingPicker",{posUI:posUI,extTitle:extTitle});
		return html;
	}
		
	MailingPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		data = data || {};
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType = data.type || smr.REPORT_TYPE.BATCH;
		view.hasSubOrganization = smr.hasSubOrgs[reportType] ;
		view.isRootOrg = smr.isRootOrg[reportType] ;
		view.$relatedReport = data.$relatedReport || $("body").find(".report[data-type='"+view.reportType+"']");
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		//save a temp set so we can do a 'cancel'
		var defaultSetType = smr.getSetAndType(reportType,mailingSetName);
		_tempPrevSet = smr.createCopySet(defaultSetType.set);
		
		view.defaultSetType = defaultSetType;

        if(reportType == "campaignOverview" && _firstCampaignOverview){
            var set = getSet.call(view, "campaign");
            var data = _tempPrevSet.list()
            for(var i = 0; i<data.length;i++){
               set.add(data[i])
            }
        }

        if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".mailingPicker-top").addClass("IE9PickerHeader-background");
		
        //show default view
		showMailingView.call(view);
		
        //click datatype and select for campaignOverview
        if(reportType == "campaignOverview" && _firstCampaignOverview){
        	$e.find("input[name='limitDataTo']").trigger("click");
        	_firstCampaignOverview = false;
        }

	}
	// --------- /Component Interface Implementation ---------- //
	
	MailingPicker.prototype.events = {
		"click; .mailingPicker-top .close" : clickCloseMethod,
		
		"click; .mailingPicker-bottom .btn.done" : clickBtnDoneMethod,
		
		"click; .mailingPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//tab event
		"click; .smrTabs .tab:not(.sel)" : clickSmrTabMethod,
		
		//drag event,dialog move
		"bdragmove; .mailingPicker-top" : bdragmoveMailingPickerTopMethod,
		
		"bdragend; .mailingPicker-top" : bdragendMailingPickerTopMethod,
		
		//drag event,dialog resize
		"bdragmove; .resizeHandler" : bdragmoveResizeHandlerMethod,
		
		"bdragend; .resizeHandler" : bdragendResizeHandlerMethod,
		
		"change; .mailingPicker-mailingView .tag[data-tag='selectMailings'] select[name='launchDate']":function(){
			showTable.call(this);
		}
	}
	
	MailingPicker.prototype.docEvents = {
		// bind the Esc key
		"keyup" : function(event){
			if(event.which == 27){
				this.close();
			}
		}
	}
	
	// --------- events --------- //
	function clickCloseMethod(){
		var view = this;
		var reflag = beforeCloseOrDoneCheckDate(view);
		if(reflag) view.close();
	}
	
	function clickBtnDoneMethod(){
		var view = this;
		var reportType = view.reportType;
		if(reportType == smr.REPORT_TYPE.BATCH){
			var status = saveLaunchDateOpts.call(view);
			var mailingSetName = view.mailingSetName
			var relFlag = beforeCloseOrDoneCheckDate(view);
			if(!relFlag) return;

			if(status.success){
				view.getData(false,"date").done(function(data){
					smr.getMailingSet(reportType,mailingSetName).clear();
					for(var i = 0; i < data.length; i++){
						var id = data[i].id;
						var name = data[i].name;
						var obj = {id:id,name:name};
						getSet.call(view,"mailing").add(obj);
					}
					triggerReportHeaderMailingSelectorChange.call(view,"mailing");
					
					view.close();
				});
			}else{
				view.close();
			}
		}else{
			var reflag = beforeCloseOrDoneCheckDate(view);
			if(reflag) view.close();
		}
	}
	
	function clickBtnCancelMethod(){
		var view = this;
		var defaultSetType = view.defaultSetType;
		smr.copySet(defaultSetType.set,_tempPrevSet);
		triggerReportHeaderMailingSelectorChange.call(view,_tempPrevSet.type);
		view.close();
	}
	
	function clickSmrTabMethod(event){
		var view = this;
		var $e = view.$el;
			
		var $tab = $(event.currentTarget);
		var $tabs = $tab.closest(".smrTabs");
		var tab = $tab.attr("data-tab");
		$tabs.find(".tab").removeClass("sel");
		$tab.addClass("sel");
		if(tab == 'mailing'){
			showMailingView.call(view);
		}else if(tab == 'manual'){
			showManualView.call(view);
		}
	}
	
	function bdragmoveMailingPickerTopMethod(event){
		var view = this;
		var $e = view.$el;
			
		var pos = $e.offset();
	    var newX = pos.left + event.bextra.deltaX;
	    var newY = pos.top + event.bextra.deltaY;
		if(newX < 0){
			newX = 0;
		}
		if(newX > $(window).width()){
			newX = $(window).width()-1;
		}
		if(newY < 0){
			newY = 0;
		}
		if(newY > $(window).height()){
			newY = $(window).height()-2;
		}
	        
		$e.offset({
			left:newX,
			top:newY
		});
	}
	
	function bdragendMailingPickerTopMethod(event){
		var view = this;
		var $e = view.$el;
		var pos = $e.offset();
	    var newX = pos.left;
	    var newY = pos.top;
		smr.saveMailingPickerUIStates("PosXY",{left:newX,top:newY});
	}
	
	function bdragmoveResizeHandlerMethod(event){
		var view = this;
		var $e = view.$el;
		var w = $e.width() + event.bextra.deltaX;
		var h = $e.height() + event.bextra.deltaY;      
		$e.width(w);
		$e.height(h);    
	}
	
	function bdragendResizeHandlerMethod(event){
		var view = this;
		var $e = view.$el;
		var w = $e.width();
		var h = $e.height();
		smr.saveMailingPickerUIStates("PosWH",{width:w,height:h});
	}
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	MailingPicker.prototype.destroy = function(){
		var $e = this.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		$selectMailingsTag.undelegate("input[name='name']","keyup.name");
	}
	
	MailingPicker.prototype.close = function(){
		var view = this;
		view.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
		
		//when close the mailingPicker ,close the dateSelect
		$("body").find(".dateSelect").bRemove();
		
		// when close mailingPicker, do call back
		if(view._closeCallback && $.isFunction(view._closeCallback)){
			view._closeCallback(view.reportType,view.mailingSetName);
		}
	}
	
	MailingPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	MailingPicker.prototype.getFilters = function(type){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectByLaunchDate = $mailingView.find(".tag[data-tag='selectByLaunchDate']");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		var $selectCampaignsTag = $mailingView.find(".tag[data-tag='selectCampaigns']");
		var $selectProgramsTag = $mailingView.find(".tag[data-tag='selectPrograms']");
		var $selectTagsTag = $mailingView.find(".tag[data-tag='selectTags']");
		var opts = {};
//		var launchDateOpts = view.launchDateOpts;
//		var dateRange = view.launchDateOpts.period.getDateRange();
		//FIXME for now just put an empty value
		var dateRange = {};
		if(typeof type == 'undefined'){
			type = 'mailing';
		}
		if(type == "mailing"){
			opts.mailingName = $selectMailingsTag.find("input[name='name']").val();
			opts.includeArchive = typeof $selectMailingsTag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
			opts.includeSubOrganizations = typeof $selectMailingsTag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
			opts.endDate = dateRange.endDate;
			opts.startDate = dateRange.startDate;
			
			if($selectMailingsTag.find("select[name='launchDate']").size()>0){
				var launchDateType = $selectMailingsTag.find("select[name='launchDate']").val();
				if(launchDateType != 'all'){
					var lEndDate = smr.serverDate;
					var lStartDate = smr.getLastNDays(launchDateType,lEndDate);
					//for 'yesterday' , just list Yestoday's data and not today's data 
					if(launchDateType=="yesterday"){
						lEndDate = new Date(smr.serverDate - 1 * 24 * 60 * 60 * 1000);
					}
//				if(opts.endDate * 1 > lEndDate * 1){
					opts.endDate = lEndDate;
//				}
//				if(opts.startDate * 1 < lStartDate * 1){
					opts.startDate = lStartDate;
//				}
				}else{
					opts.endDate = null;
					opts.startDate = null;
				}
			}
			
		}else if(type == "campaign"){
			opts.campaignName = $selectCampaignsTag.find("input[name='name']").val();
			opts.includeArchive = typeof $selectCampaignsTag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
			opts.includeSubOrganizations = typeof $selectCampaignsTag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
			opts.endDate = dateRange.endDate;
			opts.startDate = dateRange.startDate;
            if (reportType == "campaignOverview") {
                var limitPeriod = getSet.call(view, type).period();
                var limitDateRange = limitPeriod.getDateRange();
                opts.endDate = limitDateRange.endDate;
                opts.startDate = limitDateRange.startDate;
            }
		}else if(type == "program"){
			opts.campaignName = $selectProgramsTag.find("input[name='name']").val();
			opts.includeArchive = typeof $selectProgramsTag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
			opts.includeSubOrganizations = typeof $selectProgramsTag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
		}else if(type == "tag"){
			opts.includeArchive = typeof $selectTagsTag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
			opts.includeSubOrganizations = typeof $selectTagsTag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
            var limitPeriod = getSet.call(view, type).period();
            var limitDateRange = limitPeriod.getDateRange();
            opts.endDate = limitDateRange.endDate;
            opts.startDate = limitDateRange.startDate;
		}else if(type == "date"){
			var opts = view.launchDateOpts;
			dateRange = opts.period.getDateRange();
			opts.includeArchive = typeof $selectByLaunchDate.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
			opts.includeSubOrganizations = typeof $selectByLaunchDate.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
			opts.endDate = dateRange.endDate;
			opts.startDate = dateRange.startDate;
		}
		
		//FIXME comments for now
//		var limit = getSet.call(view,type).attr("limit");
//		if(limit){
//			var limitPeriod = getSet.call(view,type).period();
//			var limitDateRange = limitPeriod.getDateRange();
//			opts.endDate = limitDateRange.endDate;
//			opts.startDate = limitDateRange.startDate;
//		}
		return opts;
	}
	
	MailingPicker.prototype.getData = function(useTempData,type){
		var view = this;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName;
		var dfd = $.Deferred();
		if(!type){
			type = "mailing";
		}
		var opts = view.getFilters(type);
		if(!useTempData || !view._mailingTableData){
			var startDate = opts.startDate;
			var endDate = opts.endDate;
			//if(reportType == smr.REPORT_TYPE.BATCH && mailingSetName!="main"){
			//	startDate = null;
			//	endDate = null;
			//}
			smr.getMailingsForFilterBox(opts.mailingName,startDate,endDate,opts.includeArchive,view.reportType,null,opts.includeSubOrganizations).done(function(data){
				dfd.resolve(data.items);
				view._mailingTableData = data.items;
			});
		}else{
			dfd.resolve(view._mailingTableData);
		}
		return dfd.promise();
	}
	
	MailingPicker.prototype.getCampaignData = function(useTempData){
		var view = this;
		var dfd = $.Deferred();
		var opts = view.getFilters("campaign");
		if(!useTempData || !view._campaignTableData){
			smr.getCampaignsForFilterBox(opts.campaignName,opts.startDate,opts.endDate,opts.includeArchive,view.reportType,opts.includeSubOrganizations).done(function(data){
				dfd.resolve(data.items);
				view._campaignTableData = data.items;
			});
		}else{
			dfd.resolve(view._campaignTableData);
		}
		return dfd.promise();
	}
	
	MailingPicker.prototype.getProgramData = function(useTempData){
		var view = this;
		var dfd = $.Deferred();
		var opts = view.getFilters("program");
		if(!useTempData || !view._programTableData){
			smr.getProgramsForFilterBox(opts.campaignName,opts.startDate,opts.endDate,opts.includeArchive,null,opts.includeSubOrganizations).done(function(data){
				dfd.resolve(data.items);
				view._programTableData = data.items;
			});
		}else{
			dfd.resolve(view._programTableData);
		}
		return dfd.promise();
	}
	
	MailingPicker.prototype.getTagData = function(useTempData){
		var view = this;
		var dfd = $.Deferred();
		var opts = view.getFilters("tag");
		if(!useTempData || !view._tagTableData){
			smr.getTagsForFilterBox(opts.campaignName,opts.startDate,opts.endDate,opts.includeArchive,opts.includeSubOrganizations).done(function(data){
				dfd.resolve(data.items);
				view._tagTableData = data.items;
			});
		}else{
			dfd.resolve(view._tagTableData);
		}
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showMailingView(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName;
		var $content = $e.find(".mailingPicker-content");
		$content.empty();
		$content.append(smr.render("tmpl-mailingPicker-mailingView",{reportType:reportType}));
		var $tags = $content.find(".tags");
		var defaultTag = "selectMailings";
		
		// tags
		var renderOption = {reportType:reportType,hasSubOrganization:view.hasSubOrganization,isRootOrg:view.isRootOrg};
		var $selectByLaunchDate = $(smr.render("tmpl-mailingPicker-tag-selectByLaunchDate",renderOption));
		var $selectMailings = $(smr.render("tmpl-mailingPicker-tag-selectMailings",renderOption));
		var $selectPrograms = $(smr.render("tmpl-mailingPicker-tag-selectPrograms",renderOption));
		var $selectCampaigns = $(smr.render("tmpl-mailingPicker-tag-selectCampaigns",{reportType:reportType,hasSubOrganization:view.hasSubOrganization,isRootOrg:view.isRootOrg,data:{reportType:reportType,tag:"selectCampaigns"}}));
		var $selectTags = $(smr.render("tmpl-mailingPicker-tag-selectTags",{reportType:reportType,hasSubOrganization:view.hasSubOrganization,isRootOrg:view.isRootOrg,data:{reportType:reportType,tag:"selectTags"}}));
		
		//--------- Select Launch Date Tag ---------//
		if(reportType == smr.REPORT_TYPE.BATCH){
			$tags.append($selectByLaunchDate);
			$e.find(".mailingPicker-header .smrTabs input[type='radio'][value='selectByLaunchDate']").closest(".tab").show();
		}
		//--------- /Select Launch Date Tag ---------//
		
		//--------- Select Mailings Tag ---------//
		if(reportType == smr.REPORT_TYPE.BATCH || reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			$tags.append($selectMailings);
			$tags.append($selectTags);
			if(reportType == smr.REPORT_TYPE.BATCH ){
				$tags.find("select[name='launchDate']").closest(".label-field").show();
			}
			$e.find(".mailingPicker-header .smrTabs input[type='radio'][value='selectMailings']").closest(".tab").show();
			$e.find(".mailingPicker-header .smrTabs input[type='radio'][value='selectTags']").closest(".tab").show();
		}
		//--------- /Select Mailings Tag ---------//
		
		//--------- Select Programs Tag ---------//
		if(reportType == smr.REPORT_TYPE.PROGRAM){
			defaultTag = "selectPrograms";
			$tags.append($selectPrograms);
			$e.find(".mailingPicker-header .smrTabs input[type='radio'][value='selectPrograms']").closest(".tab").show();
		}
		//--------- /Select Programs Tag ---------//
		
		//--------- Select Campaigns Tag ---------//
		$tags.append($selectCampaigns);
		$e.find(".mailingPicker-header .smrTabs input[type='radio'][value='selectCampaigns']").closest(".tab").show();
		//--------- /Select Campaigns Tag ---------//
		
		
		//default show select mailing tag
		var setType = smr.getSetAndType(reportType,mailingSetName);
		//init options
		var period = smr.buildPeriod(null,null,null);
		view.launchDateOpts = {
			includeArchive:setType.set.attr("includeArchive"),
			includeSubOrganizations:setType.set.attr("includeSubOrg"),
			period:period
		}

		if(setType.type == "Campaign" || reportType=="campaignOverview"){
			defaultTag = "selectCampaigns";
		}
		
		if(setType.type == "Tag"){
			defaultTag = "selectTags";
		}
		
		showTag.call(view,defaultTag,view.launchDateOpts);
		registerMailingViewEvent.call(view);
	}
	
	function showTag(tag,option){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $tags = $e.find(".tags");
		var oincludeSubOrganizations = (typeof $tags.find(".tag:visible").find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true);
		$tags.find(".tag").hide();
		var $tag = $tags.find(".tag[data-tag='"+tag+"']");
		$tag.show();
		if(option && option.includeArchive) $tag.find("input[name='includeArchive']").attr("checked",true);
		if(option && option.includeSubOrganizations) $tag.find("input[name='includeSubOrganizations']").attr("checked",true);
		if(!option){
			$tag.find("input[name='includeSubOrganizations']").attr("checked",oincludeSubOrganizations);
			if(tag != "selectByLaunchDate"){
				saveLimitData.call(view,$tag);
			}else{
				saveLimitDataForDate.call(view,$tag);
			}
		}
	  
		$e.find(".mailingPicker-header .smrTabs input[type='radio'][value='"+tag+"']").attr("checked",true);
		period = view.launchDateOpts.period;
		smr.titleshow = true;

		if(tag == "selectByLaunchDate"){
			var dateType = getSet.call(view,"selectMailings").period().getDateType();
			if(typeof dateType == 'undefined'){
				dateType = "last30Days";
			}
			showDateType.call(view,$tag.find("select[name='dateTypeSelect']"),dateType);
			
			if(reportType == smr.REPORT_TYPE.BATCH){ 
				smr.getSet(reportType,view.mailingSetName,"selectMailings").attr("limit",true);
				if(view.mailingSetName == "main"){
					smr.getSet(reportType,"compareA","selectMailings").attr("limit",true);
				}
			}
		}else if(tag == "selectMailings"){
			showTable.call(view);
			showSelectedTable.call(view,"mailing");

			if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				refreshLimitData.call(view,"selectMailings");
			}

			if(reportType == smr.REPORT_TYPE.BATCH){ 
				getSet.call(view,"selectMailings").attr("limit",false);
			}

		}else if(tag == "selectPrograms"){
			showProgramTable.call(view);
			showSelectedTable.call(view,"program");
			refreshLimitData.call(view,"selectPrograms");
		}else if(tag == "selectCampaigns"){
			showCampaignTable.call(view);
			showSelectedTable.call(view,"campaign");
			refreshLimitData.call(view,"selectCampaigns");
		}else if(tag == "selectTags"){
			showTagTable.call(view);
			showSelectedTable.call(view,"tag");
			refreshLimitData.call(view,"selectTags");
		}
		
		if(tag != "selectByLaunchDate"){
			if(reportType==smr.REPORT_TYPE.BATCH){
				smr.getSet(reportType,view.mailingSetName,"selectMailings").attr("limit",false);
				if(view.mailingSetName == "main"){
					smr.getSet(reportType,"compareA","selectMailings").attr("limit",false);
				}
			}
		}
		
	}
	

	function registerMailingViewEvent(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		var $selectCampaignsTag = $mailingView.find(".tag[data-tag='selectCampaigns']");
		var $selectProgramsTag = $mailingView.find(".tag[data-tag='selectPrograms']");
		
		// extend the selected table
		$e.delegate(".mailingPicker-selected .label","click",function(){
			var $extendIcon = $(this);
			var $dataList = $extendIcon.closest(".tag").find(".dataList");
			if($dataList.is(":visible")){
				$extendIcon.removeClass("sel");
				$dataList.hide();
			}else{
				brite.display("dataList",view.selectedMailingTable,{list:view.selectDataList,width:view.selectedMailingTable.width(),showImmediate:true},{emptyParent:true});
				$extendIcon.addClass("sel");
			}
			
		});
		
		$e.delegate(".mailingPicker-header .smrTabs input[type='radio']","change",function(){
			var $input = $(this);
			var tag = $input.val();
			showTag.call(view,tag);
		});
		
		$e.delegate(".mailingPicker-header .smrTabs span.tagspan","click",function(){
			var $prevInput = $(this).prev();
			if(!$prevInput.is(":checked"))$prevInput.change();
		});
		
		$mailingView.delegate("input[name='limitDataTo']","change",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			var $limitDataTo = $this.closest(".limitDataTo");
			toggle$limitData($limitDataTo);
			saveLimitData.call(view,$tag);
		});
		
		$mailingView.delegate(".limitDataTo .dateInputs input[type='text']","change",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			var $limitDataTo = $this.closest(".limitDataTo");
			toggle$limitData($limitDataTo);
			saveLimitData.call(view,$tag);
		});
		
		$mailingView.delegate("select[name='dateTypeSelect']","change",function(){
			var $this = $(this);
			showDateType.call(view,$this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			if(tag != "selectByLaunchDate"){
				saveLimitData.call(view,$tag);
			}else{
				saveLimitDataForDate.call(view,$tag);
			}
			if(reportType=="campaignOverview"){
				showCampaignTable.call(view);
			}
		});
		
		$mailingView.delegate("input[name='startDate'],input[name='endDate']","focus",function(e){
			var inputValue = "";
			if(isValidDate(this)){
				inputValue = $(this).val();
				if($(this).attr("name")=="startDate"){
					_defaultStartDate = inputValue;
				}else{
					_defaultEndDate = inputValue;
				}
			}
		});
		
		$mailingView.find("input[name='startDate'],input[name='endDate']").blur(function(e){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			if(!$(".dateSelect").is(":visible")){
				if(!isValidDate(this)){
					if($(this).attr("name")=="startDate"){
						$(this).val(_defaultStartDate);
					}else{
						$(this).val(_defaultEndDate);
					}
					alert("Please enter a right date format!");
				}
				if(tag != "selectByLaunchDate"){
					saveLimitData.call(view,$tag);
				}else{
					saveLimitDataForDate.call(view,$tag);
				}
			}
		});

		$mailingView.delegate("input[name='startDate'],input[name='endDate']","click",function(e){
			var $this = $(this);
			var posX = $(e.target).offset().left;
			var posY = $(e.target).offset().top + 20;
			var $date = $(this);
			var preValue = "";
			if($this.attr("name")=="startDate"){
				preValue = _defaultStartDate;
			}else{
				preValue = _defaultEndDate;
			}
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			var $message = $selectProgramsTag.find(".message");
//			$date.val("");
			var changed = false;
			$this.unbind("keyup."+$this.attr("name"));
			$this.bind("keyup."+$this.attr("name"),function(){
				if(!changed){
					changed = true;
				}
			});
			brite.display("dateSelect",null,{posX:posX,posY:posY}).done(function(component){
				component.onChange(function(date){
					$date.val(getDateValue(date));
					if(tag != "selectByLaunchDate"){
						saveLimitData.call(view,$tag);
					}else{
						saveLimitDataForDate.call(view,$tag);
					}
					if(reportType=="campaignOverview"){
						showCampaignTable.call(view);
					}
				});
				
				component.onClose(function(){
					if(!changed){
						$date.val(preValue);
					}else{
						if(!isValidDate($date)){
							alert("Please enter right date format!");
							$date.val(preValue);
						}else{
							if(tag != "selectByLaunchDate"){
								saveLimitData.call(view,$tag);
							}else{
								saveLimitDataForDate.call(view,$tag);
								if(reportType=="campaignOverview"){
									showCampaignTable.call(view);
								}
							}
						}
					}
				});
			});
		});
		
		$mailingView.delegate("input[name='name']","keyup.name",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			
			setFilterName.call(view,$this.val());
			if(tag == "selectMailings"){
				showTable.call(view,true);
			}else if(tag == "selectCampaigns"){
				showCampaignTable.call(view,true);
			}else if(tag == "selectPrograms"){
				showProgramTable.call(view,true);
			}else if(tag == "selectTags"){
				showTagTable.call(view,true);
			}
		});
		
		$mailingView.find("input[name='includeArchive'][type='checkbox']").bind("change",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			
			if(tag != "selectByLaunchDate"){
				saveLimitData.call(view,$tag);
				if(tag == "selectMailings"){
					showTable.call(view);
				}else if(tag == "selectCampaigns"){
					showCampaignTable.call(view);
				}else if(tag == "selectPrograms"){
					showProgramTable.call(view);
				}else if(tag == "selectTags"){
					showTagTable.call(view);
				}
			}else{
				saveLimitDataForDate.call(view,$tag);
			}
			
		});
		
		$mailingView.find("input[name='includeSubOrganizations'][type='checkbox']").bind("change",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			
			
			if(tag != "selectByLaunchDate"){
				var set = getSet.call(view,tag);
				set.clear();
				saveLimitData.call(view,$tag);
				if(tag == "selectMailings"){
					showTable.call(view);
				}else if(tag == "selectCampaigns"){
					showCampaignTable.call(view);
				}else if(tag == "selectPrograms"){
					showProgramTable.call(view);
				}else if(tag == "selectTags"){
					showTagTable.call(view);
				}
			}else{
				saveLimitDataForDate.call(view,$tag);
			}
			
		});
		
		$mailingView.delegate(".keyCancel","click",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			$tag.find("input[name='name']").val("");
			setFilterName.call(view,$this.val());
			if(tag == "selectMailings"){
				showTable.call(view,true);
			}else if(tag == "selectCampaigns"){
				showCampaignTable.call(view,true);
			}else if(tag == "selectPrograms"){
				showProgramTable.call(view,true);
			}else if(tag == "selectTags"){
				showTagTable.call(view,true);
			}
		});
		
		$mailingView.delegate(".mailingPicker-table table .btnAction","change",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var obj = {id:id,name:name};
			var type = $tr.closest("table").attr("data-type");
			var set = getSet.call(view,type);
			
			if($btn.attr("checked")){
				if(id.indexOf(",")){
					var ids = id.split(",");
					for(var i=0;i<ids.length;i++){
						set.add({id:ids[i],name:name});
					}
				}else{
					set.add(obj);
				}
				$tr.addClass("checked");
				if(type == "tag"){
					$tr.find(".tags-value-select").show();
				}
			}else{
				if(id.indexOf(",")){
					var ids = id.split(",");
					for(var i=0;i<ids.length;i++){
						var index = set.indexOf({id:ids[i],name:name});
						set.remove(index);
					}
				}else{
					var index = set.indexOf(obj);
					set.remove(index);
				}
				$tr.removeClass("checked");
				if(type == "tag"){
					$tr.find(".tags-value-select").hide();
				}
			}
			
			var $table = $tr.closest("table");
			if(type == "tag"){
				set.clear();
				$table.find(".btnAction:checked").each(function(){
					var $thisTr = $(this).closest("tr");
					$thisTr.find(".tags-value-combox input:checked").each(function(){
						var thisCheckedInput = $(this);
						set.add({id:thisCheckedInput.val(),name:thisCheckedInput.attr("data-name"),pid:$thisTr.attr("data-obj.id"),pname:$thisTr.attr("data-obj.name")});
					});
				});
			}
			
			checkSelectALl($table);
			
			triggerReportHeaderMailingSelectorChange.call(view,type);
			// refresh the selectedTable
			showSelectedTable.call(view,type);
		});
		
		//add all event
		$mailingView.delegate(".mailingPicker-table .btnBatchAction","change",function(){
			var $btn = $(this);
			var $tag = $btn.closest(".tag");
			var type = $btn.closest("table").attr("data-type");
			var set = getSet.call(view,type);
			if($btn.attr("checked")){
				$tag.find(".mailingPicker-table table tbody tr").each(function(){
					var $tr = $(this);
					var id = $tr.attr("data-obj.id");
					var name = $tr.attr("data-obj.name");
					var obj = {id:id,name:name};
					if(id.indexOf(",")){
						var ids = id.split(",");
						if(set.indexOf({id:ids[0],name:name}) == -1){
							for(var i=0;i<ids.length;i++){
								set.add({id:ids[i],name:name});
							}
							var $btn = $tr.find(".btnAction");
							toggle$Button($btn);
						}
					}else{
						if(set.indexOf(obj) == -1){
							set.add(obj);
							var $btn = $tr.find(".btnAction");
							toggle$Button($btn);
						}
					}
					if(type == "tag"){
						$tr.find(".tags-value-select").show();
					}
				});
			}else{
				getSet.call(view,type).clear();
				$tag.find(".mailingPicker-table table .btnAction:checked").each(function(){
					var $btn = $(this);
					toggle$Button($btn);
				});
				$tag.find(".mailingPicker-table table tbody tr").each(function(){
					var $tr = $(this);
					if(type == "tag"){
						$tr.find(".tags-value-select").hide();
					}
				});
			}
			
			var $table = $btn.closest("table");
			if(type == "tag"){
				set.clear();
				$table.find(".btnAction:checked").each(function(){
					var $thisTr = $(this).closest("tr");
					$thisTr.find(".tags-value-combox input:checked").each(function(){
						var thisCheckedInput = $(this);
						set.add({id:thisCheckedInput.val(),name:thisCheckedInput.attr("data-name"),pid:$thisTr.attr("data-obj.id"),pname:$thisTr.attr("data-obj.name")});
					});
				});
			}
			
			triggerReportHeaderMailingSelectorChange.call(view,type);
			// refresh the selectedTable
			showSelectedTable.call(view,type);
		});
		
		// --------- table column event --------- //
		$mailingView.delegate("thead th.sortable","click",function(){
			var $th = $(this);
			var $table = $th.closest("table");
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
			var sortInfo = {
				name:columnName,
				order:order
			};
			
			var type = $table.attr("data-type");
			if(type == "mailing"){
				view._mailingSortInfo = sortInfo;
				showTable.call(view,true);
			}else if(type == "campaign"){
				view._campaignSortInfo = sortInfo;
				showCampaignTable.call(view,true);
			}else if(type == "program"){
				view._programSortInfo = sortInfo;
				showProgramTable.call(view,true);
			}else if (type == "tag"){
				view._tagSortInfo = sortInfo;
				showTagTable.call(view,true);
			}
		});
		
		$mailingView.delegate(".tag-values .tags-value-select .button-ico","click",function(event){
			var $this = $(this);
			var $tr = $this.closest("tr");
			var offset = $this.closest(".tags-value-select").offset();
			var moffset = $this.closest(".mailingPicker").offset();
			$tr.siblings().find(".tags-value-combox").hide();
			$this.closest(".tag-values").find(".tags-value-combox").css({left:offset.left-moffset.left,top:offset.top-moffset.top+22}).toggle();
		});
		
		$mailingView.delegate(".tag-values .tags-value-combox input","change",function(event){
			saveTagValues.call(view);
		});
		
		$mailingView.delegate(".tag-values .select-all","click",function(event){
			var $tag_values = $(this).closest(".tag-values");
			$tag_values.find(".item input").attr("checked","checked");
			saveTagValues.call(view);
		});
		
		$mailingView.delegate(".tag-values .unselect-all","click",function(event){
			var $tag_values = $(this).closest(".tag-values");
			$tag_values.find(".item input").removeAttr("checked");
			saveTagValues.call(view);
		});
		
		$("body").undelegate(".mailingPicker","click.tagevaluesclick");
		$("body").delegate(".mailingPicker","click.tagevaluesclick",function(event){
			var $tagevalues = $(event.target).closest(".tag-values");
			if($tagevalues.size()==0){
				$mailingView.find(".tags-value-combox").hide();
			}
		});
		
	}

	
	function showTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		var $table = $selectMailingsTag.find(".mailingPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._mailingSortInfo;
		var $availableMailings = $selectMailingsTag.find(".availableMailings");
		$tbody.empty();
		var set = smr.getMailingSet(view.reportType,view.mailingSetName);
		var includeSubOrg = set.attr("includeSubOrg");
		if(includeSubOrg){
			$table.find("th").addClass("hasSubOrganization");
			$table.find("th.orga").show();
		}else{
			$table.find("th").removeClass("hasSubOrganization");
			$table.find("th.orga").hide();
		}
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			
			var filterName = view._filterName;
			for(var i=0; i<data.length;i++){
				var obj = data[i];
				var objNameTmp = obj.name;
				if(obj.name){
					objNameTmp = (obj.name).toLowerCase();
				}
				var filterNameTmp = filterName;
				if(filterName){
					filterNameTmp = filterName.toLowerCase();
				}
				var objCampaignTmp = obj.campaign;
				if(obj.campaign){
					objCampaignTmp = (obj.campaign).toLowerCase();
				}
				
				if(!filterNameTmp || ((objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1) || (objCampaignTmp && objCampaignTmp.indexOf(filterNameTmp) > -1 ))){
					obj.isSelected = false;
					var mailing = {id:obj.id,name:obj.name};
					obj.hasSubOrganization= includeSubOrg;
					if(smr.getMailingSet(view.reportType,view.mailingSetName).indexOf(mailing) > -1){
						obj.isSelected = true;
					}
					if(obj.name && obj.name.length>26){
						obj.nameEllipses = obj.name.substring(0,12)+"..."+obj.name.substring(obj.name.length-12,obj.name.length) ;
					}
					if(obj.campaign && obj.campaign.length>26){
						obj.campaignEllipses = obj.campaign.substring(0,12)+"..."+obj.campaign.substring(obj.campaign.length-12,obj.campaign.length) ;
					}
					var $tr = smr.render("tmpl-mailingPicker-table-tr",obj);
					$tbody.append($tr);
				}
			}
			$availableMailings.find(".count").html(data.length);
			checkSelectALl($table);
			//save temp data
			view._mailingTableData = data;
		});
	}
	
	function showCampaignTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectCampaignsTag = $mailingView.find(".tag[data-tag='selectCampaigns']");
		var $table = $selectCampaignsTag.find(".mailingPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._campaignSortInfo;
		var $availableMailings = $selectCampaignsTag.find(".availableMailings");
		
		var set = smr.getCampaignSet(view.reportType,view.mailingSetName);
		var includeSubOrg = set.attr("includeSubOrg");
		
		$tbody.empty();
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getCampaignData(ifTempData).done(function(data){
			var temdata = {};
			if(includeSubOrg){
				for(var i=0; i<data.length;i++){
					if(temdata[data[i].campaign]){
						temdata[data[i].campaign] = temdata[data[i].campaign]+","+data[i].id;
					}else{
						temdata[data[i].campaign] = data[i].id;
					}
				}
			}
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName;
			var availableCount = 0;
			var temName={};
			for(var i=0; i<data.length;i++){
				var obj = data[i];
				var filterNameTmp = filterName;
				if(filterName){
					filterNameTmp = filterName.toLowerCase();
				}
				var objCampaignTmp = obj.campaign;
				if(obj.campaign){
					objCampaignTmp = (obj.campaign).toLowerCase();
				}
				if(!filterNameTmp || (objCampaignTmp && objCampaignTmp.indexOf(filterNameTmp) > -1 )){
					if(temName[obj.campaign]=="1" && includeSubOrg) continue;
					temName[obj.campaign] = "1";
					obj.isSelected = false;
					var mailing = {id:obj.id,name:obj.name};
					if(smr.getCampaignSet(view.reportType,view.mailingSetName).indexOf(mailing) > -1){
						obj.isSelected = true;
					}
					if(includeSubOrg)obj.id= temdata[obj.campaign];
					
					if(obj.campaign && obj.campaign.length>40){
						obj.campaignEllipses = obj.campaign.substring(0,19)+"..."+obj.campaign.substring(obj.campaign.length-19,obj.campaign.length) ;
					}
					var $tr = smr.render("tmpl-mailingPicker-campaign-table-tr",obj);
					$tbody.append($tr);
					availableCount++;
				}
			}
			$availableMailings.find(".count").html(availableCount);
			checkSelectALl($table);
			//save temp data
			view._campaignTableData = data;
		});
	}
	
	function showProgramTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectProgramsTag = $mailingView.find(".tag[data-tag='selectPrograms']");
		var $table = $selectProgramsTag.find(".mailingPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._programSortInfo;
		var $availableMailings = $selectProgramsTag.find(".availableMailings");
		
		$tbody.empty();
		var set = smr.getProgramSet(view.reportType,view.mailingSetName);
		var includeSubOrg = set.attr("includeSubOrg");
		if(includeSubOrg){
			$table.find("th").addClass("hasSubOrganization");
			$table.find("th.orga").show();
		}else{
			$table.find("th").removeClass("hasSubOrganization");
			$table.find("th.orga").hide();
		}
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getProgramData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName;
			for(var i=0; i<data.length;i++){
				var obj = data[i];
				var objNameTmp = obj.name;
				if(obj.name){
					objNameTmp = (obj.name).toLowerCase();
				}
				var filterNameTmp = filterName;
				if(filterName){
					filterNameTmp = filterName.toLowerCase();
				}
				var objCampaignTmp = obj.campaign;
				if(obj.campaign){
					objCampaignTmp = (obj.campaign).toLowerCase();
				}
				if(!filterNameTmp || ((objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1) || (objCampaignTmp && objCampaignTmp.indexOf(filterNameTmp) > -1 ))){
					obj.isSelected = false;
					var mailing = {id:obj.id,name:obj.name};
					obj.hasSubOrganization= includeSubOrg;
					if(smr.getProgramSet(view.reportType,view.mailingSetName).indexOf(mailing) > -1){
						obj.isSelected = true;
					}
					if(obj.name && obj.name.length>26){
						obj.nameEllipses = obj.name.substring(0,12)+"..."+obj.name.substring(obj.name.length-12,obj.name.length) ;
					}
					if(obj.campaign && obj.campaign.length>26){
						obj.campaignEllipses = obj.campaign.substring(0,12)+"..."+obj.campaign.substring(obj.campaign.length-12,obj.campaign.length) ;
					}
					var $tr = smr.render("tmpl-mailingPicker-program-table-tr",obj);
					$tbody.append($tr);
				}
			}
			$availableMailings.find(".count").html(data.length);
			checkSelectALl($table);
			//save temp data
			view._programTableData = data;
		});
	}
	
	function showTagTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectTagsTag = $mailingView.find(".tag[data-tag='selectTags']");
		var $table = $selectTagsTag.find(".mailingPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._tagSortInfo;
		var $availableMailings = $selectTagsTag.find(".availableMailings");
		
		$tbody.empty();
		var set = smr.getTagSet(view.reportType,view.mailingSetName);
		var includeSubOrg = set.attr("includeSubOrg");
		if(includeSubOrg){
			$table.find("th").addClass("hasSubOrganization");
			$table.find("th.orga").show();
		}else{
			$table.find("th").removeClass("hasSubOrganization");
			$table.find("th.orga").hide();
		}
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getTagData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName;
			var set = smr.getTagSet(view.reportType,view.mailingSetName);
		    var list = set.list();
		    var avilcount = 0;
			for(var i=0; i < data.length; i++){
				var obj = data[i];
				var objNameTmp = obj.tagName ? (obj.tagName).toLowerCase() : obj.tagName;
				var filterNameTmp = filterName ? filterName.toLowerCase() : filterName;
				if(!filterNameTmp || (objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1 )){
					obj.name = obj.tagName;
					obj.hasSubOrganization= includeSubOrg;
					if(brite.array.getIndex(list,"pid",obj.id+"")>-1){
						obj.isSelected = true;
					}
					
					if(obj.tagName && obj.tagName.length>26){
						obj.nameEllipses = obj.tagName.substring(0,12)+"..."+obj.tagName.substring(obj.tagName.length-12,obj.tagName.length);
					}
					avilcount ++;
					$.each(obj.tagValues,function(j,cdata){
						cdata.selected = false;
						if(obj.isSelected && brite.array.getIndex(list,"id",cdata.id+"")>-1){
							cdata.selected = true;
						}
					});
					
					var $tr = smr.render("tmpl-mailingPicker-tag-table-tr",obj);
					$tbody.append($tr);
				}
			}
			saveTagValues.call(view);
			$availableMailings.find(".count").html(avilcount);
			checkSelectALl($table);
			view._tagTableData = data;
		});
	}
	
	function showSelectedTable(type){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $tag,$selectedMailingTable;

		if(type=="mailing"){
			$tag = $mailingView.find(".tag[data-tag='selectMailings']");
		}else if(type == "campaign"){
			$tag = $mailingView.find(".tag[data-tag='selectCampaigns']");
		}else if(type == "program"){
			$tag = $mailingView.find(".tag[data-tag='selectPrograms']");
		}else if(type == "tag"){
			$tag = $mailingView.find(".tag[data-tag='selectTags']");
		}
		
		$selectedMailingTable = $tag.find(".selectedMailingTable");
		var set = getSet.call(view,type);
		var list = set.list();
		var includeSubOrg = set.attr("includeSubOrg");
		var selectedCount=0;
		if(type == "tag"){
			var tempList = [];
			var tempName = {};
			$.each(list,function(i,temp){
				tempList.push({id:temp.id,name:temp.pname + ": "+temp.name});
				if(tempName[temp.pid]) return;
				selectedCount +=1;
				tempName[temp.pid] = true;
			});
			view.selectDataList = tempList;
		}else if(includeSubOrg){
			var tempList = [];
			var tempName = {};
			for(var i=0;i<list.length;i++){
				if(tempName[list[i].name]) continue;
				tempList.push(list[i]);
				tempName[list[i].name] = true;
			}
			
			selectedCount = tempList.length;
			view.selectDataList = tempList;
		}else{
			selectedCount = list.length;
			view.selectDataList = list;
		}
		
		view.selectedMailingTable = $selectedMailingTable;
		
		//brite.display("dataList",{list:list,width:$selectedMailingTable.width()},{parent:$selectedMailingTable,emptyParent:true});
		var $selectedMailingLable = $tag.find(".mailingPicker-selected .selectedMailingLable");
		$selectedMailingLable.find(".count").text(selectedCount);
		if(selectedCount != 1){
			$selectedMailingLable.find(".needS").show();
		}else{
			$selectedMailingLable.find(".needS").hide();
		}
		
	}
	
	function showDateType($dateTypeSelect,type){
		var view = this;
		var $e = view.$el;
		var $tag = $dateTypeSelect.closest(".tag");
		var tag = $tag.attr("data-tag");
		if(typeof type == "undefined"){
			type = $dateTypeSelect.val();
		}
		var $date = $tag.find(".dateInputs");
		$dateTypeSelect.val(type);
		if(type == "inCustomDateRange"){
			$date.show();
			var $startDate = $tag.find("input[name='startDate']");
			var $endDate = $tag.find("input[name='endDate']");
			var dateRange;
			if(tag == "selectByLaunchDate"){
				var opts = view.launchDateOpts;
				dateRange = opts.period.getDateRange();
			}else{
				dateRange = getSet.call(view,tag).period().getDateRange();
			}
			$startDate.val(getDateValue(dateRange.startDate));
			$endDate.val(getDateValue(dateRange.endDate));
		}else{
			$date.hide();
		}
	}
	
	function saveLaunchDateOpts(name){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingPicker-mailingView");
		var $selectByLaunchDateTag = $mailingView.find(".tag[data-tag='selectByLaunchDate']");
		var status = {
				message:"Updated success",
				success:true
		};
		var period = getPeriod($selectByLaunchDateTag);
		var dateRange = period.getDateRange();
		if(!smr.isValidDate(dateRange.startDate)){
			status = {
				message:"Start date invalid",
				success:false
			}
			return status;
		}
		if(!smr.isValidDate(dateRange.endDate)){
			status = {
				message:"End date invalid",
				success:false
			}
			return status;
		}
		if(dateRange.endDate * 1 < dateRange.startDate * 1){
			status = {
				message:"End date must be after start date",
				success:false
			}
			return status;
		}
		view.launchDateOpts.period = period;
		var $includeArchive = $selectByLaunchDateTag.find("input[name='includeArchive']");
		view.launchDateOpts.includeArchive = typeof $includeArchive.attr("checked") == 'undefined' ? false : true;
		
		if(view.hasSubOrganization){
			var $includeSubOrganizations = $selectByLaunchDateTag.find("input[name='includeSubOrganizations']");
			view.launchDateOpts.includeSubOrganizations = typeof $includeSubOrganizations.attr("checked") == 'undefined' ? false : true;
		}
		
		return status;
	}
	
	function refreshLimitData(tag){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $tag = $e.find(".tag[data-tag='"+tag+"']");
		var $dateTypeSelect = $tag.find("select[name='dateTypeSelect']");
		var $limitDataTo = $tag.find(".limitDataTo");
		var dateType = getSet.call(view,tag).period().getDateType();
		toggle$limitData($limitDataTo,getSet.call(view,tag).attr("limit"));
		showDateType.call(view,$dateTypeSelect,dateType);
	}
	
	function saveLimitData($tag){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var tag = $tag.attr("data-tag");
		var period = getPeriod($tag);
		var $message = $tag.find(".limitDataTo .message");
		if(smr.isValidDate(period.startDate) && smr.isValidDate(period.endDate)){
			if(period.startDate * 1 > period.endDate * 1){
				$message.show();
				$message.html("Start date must be before end date.");
				return ;
			}
		}
		$message.hide();
		var set = getSet.call(view,tag);
		set.period(period);
		var limit = typeof $tag.find("input[name='limitDataTo']").attr("checked") == 'undefined' ? false : true;
		set.attr("limit",limit);
		
		var includeArchive = typeof $tag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
		set.attr("includeArchive",includeArchive);
		
		if(view.hasSubOrganization){
			var includeSubOrganizations = typeof $tag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
			set.attr("includeSubOrg",includeSubOrganizations);
		}
		
		triggerReportHeaderMailingSelectorChange.call(view,tag);

	}
	
	function saveLimitDataForDate($tag){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var period = getPeriod($tag);
		var set = getSet.call(view,"selectMailings");
		var $message = $tag.find(".launchDate-area .message");
		if(smr.isValidDate(period.startDate) && smr.isValidDate(period.endDate)){
			if(period.startDate * 1 > period.endDate * 1){
				$message.show();
				$message.html("Start date must be before end date.");
				return ;
			}
		}
		$message.hide();
		set.period(period);
		
		var includeArchive = typeof $tag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
		set.attr("includeArchive",includeArchive);
		
		if(view.hasSubOrganization){
			var includeSubOrganizations = typeof $tag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
			set.attr("includeSubOrg",includeSubOrganizations);
		}
		triggerReportHeaderMailingSelectorChange.call(view,"selectMailings");

	}
	
	function getSet(type){
		var view = this;
		var $e = view.$el;
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType;
		return smr.getSet(reportType,mailingSetName,type);
	}
	
	function triggerReportHeaderMailingSelectorChange(type){
		var view = this;
		var $e = view.$elt;
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType;
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		
		clearByType.call(view,type);
		if(mailingSetName == "main"){
			$reportHeader.trigger("reportHeaderMailingSelectorChange",{mailingSetName:mailingSetName});
		}else if(mailingSetName == "compareA" || mailingSetName == "compareB"){
			$reportHeader.closest(".report").trigger("COMPARISON_MAILINGSELECTOR_CHANGE",{mailingSetName:mailingSetName});
		}
	}
	
	function clearByType(type){
		var view = this;
		smr.setDefaultSet(view.reportType,view.mailingSetName,type);
	}
	
	function setFilterName(name){
		var view = this;
		var $e = view.$el;
		view._filterName = name;
		$e.find("input[name='name']").val(name);
		if(name != ""){
			$e.find(".keyCancel").show();
		}else{
			$e.find(".keyCancel").hide();
		}
	}
	
	function toggle$Button($btn){
		var $tr = $btn.closest("tr");
		if($btn.attr("checked")){
			$btn.removeAttr("checked");
			$tr.removeClass("checked");
		}else{
			$btn.attr("checked",true);
			$tr.addClass("checked");
		}
	}
	
	function checkSelectALl($table){
		var trSize = $table.find("tbody tr").size();
		var checkedSize = $table.find("tbody tr .first input[type='checkbox']:checked").size();
		if(trSize == checkedSize && trSize > 0 ){
			$table.find("thead tr .btnBatchAction").attr("checked",true);
		}else{
			$table.find("thead tr .btnBatchAction").removeAttr("checked");
		}
	}
	
	function toggle$limitData($limitDataTo,checked){
		var $checkbox = $limitDataTo.find("input[name='limitDataTo']");
		if(typeof checked == "undefined"){
			checked = typeof $checkbox.attr("checked") == "undefined" ? false : true;
		}else{
			if(checked){
				$checkbox.attr("checked","checked");
			}else{
				$checkbox.removeAttr("checked");
			}
		}
		if(!checked){
			$limitDataTo.addClass("disable");
			$limitDataTo.find("select").attr("disabled","disabled");
			$limitDataTo.find(".dateInputs input").attr("disabled","disabled");
		}else{
			$limitDataTo.removeClass("disable");
			$limitDataTo.find("select").removeAttr("disabled");
			$limitDataTo.find(".dateInputs input").removeAttr("disabled");
		}
	}

	function getPeriod($tag){
		var dateType = $tag.find("select[name='dateTypeSelect']").val();
		var startDate,endDate;
		var $startDate = $tag.find("input[name='startDate']");
		var $endDate = $tag.find("input[name='endDate']");
		startDate = new Date(Date.parse($startDate.val()));
		endDate = new Date(Date.parse($endDate.val()));
		return smr.buildPeriod(dateType,startDate,endDate);
	}
	
	function saveTagValues(){
		var view = this;
		var set = getSet.call(view,"selectTags");
		view.$el.find(".tag-values").each(function(){
			var $this = $(this);
			var tagId = $this.closest("tr").attr("data-obj.id");
			var $checkedInput = $this.find("input:checked");
			var size = $checkedInput.size();
			set.tagValues= set.tagValues || {};
			set.tagValues[tagId] = [];
			$checkedInput.each(function(){
				var $input = $(this);
				var object = {id:$input.val(),name:$input.attr("data-name")};
				set.tagValues[tagId].push(object);
			});
			if(size==0) $this.find(".value-name").html("0 items selected");
			if(size >1) $this.find(".value-name").html(size+" selected");
			if(size==1) $this.find(".value-name").html($checkedInput.attr("data-name"));
		});
		set.clear();
		view.$el.find(".dataTable[data-type='tag'] .btnAction:checked").each(function(){
			var $tr = $(this).closest("tr");
			$tr.find(".tags-value-combox input:checked").each(function(){
				var thisCheckedInput = $(this);
				set.add({id:thisCheckedInput.val(),name:thisCheckedInput.attr("data-name"),pid:$tr.attr("data-obj.id"),pname:$tr.attr("data-obj.name")});
			});
		});
		showSelectedTable.call(view,"tag");
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

	function beforeCloseOrDoneCheckDate(obj){
		var reflag = true;
	    var view = obj;
		var $e = obj.$element;
		$e.find(".mailingPicker-mailingView .dateInputs:visible").find("input:enabled").each(function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			if(!isValidDate(this)){
				alert("Please enter a right date format!");
				if($(this).attr("name")=="startDate"){
					$(this).val(_defaultStartDate);
				}else{
					$(this).val(_defaultEndDate);
				}
				reflag = false;
			}
			if(tag != "selectByLaunchDate"){
				saveLimitData.call(view,$tag);
			}else{
				saveLimitDataForDate.call(view,$tag);
			}
		});
		return reflag;
	}
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("mailingPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.MailingPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
