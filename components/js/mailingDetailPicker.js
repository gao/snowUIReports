var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _tempPrevSet = null;
	var _defaultStartDate = "";
	var _defaultEndDate = "";
	//--------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function MailingDetailPicker(){};
	smr.MailingDetailPicker = MailingDetailPicker; 	
	
	MailingDetailPicker.prototype.create = function(data,config){
		data = data || {};
		var mailingSetName = this.mailingSetName = data.mailingSetName || "main";
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

		return smr.render("tmpl-mailingDetailPicker",{posUI:posUI});
	}
		
	MailingDetailPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		data = data || {};
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType = data.type || smr.REPORT_TYPE.MAILINGDETAIL;
		view.$relatedReport = data.$relatedReport || $("body").find(".report[data-type='"+view.reportType+"']");
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		//save a temp set so we can do a 'cancel'
		var defaultSetType = smr.getSetAndType(reportType,mailingSetName);
		_tempPrevSet = smr.createCopySet(defaultSetType.set);
		
		view.defaultSetType = defaultSetType;
		
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".mailingDetailPicker-top").addClass("IE9PickerHeader-background");
		if(smr.isChrome) view.$el.addClass("chromePicker");
		if(smr.isFirefox) view.$el.addClass("firefoxPicker");
		//show default view
		showMailingDetailView.call(view);		
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	MailingDetailPicker.prototype.events = {
		"click; .mailingDetailPicker-top .close" : clickCloseOrDoneMethod,
		
		"click; .mailingDetailPicker-bottom .btn.done" : clickCloseOrDoneMethod,
		
		"click; .mailingDetailPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//drag event,dialog move
		"bdragmove; .mailingDetailPicker-top" : bdragmoveMailingDetailPickerTopMethod,
		
		"bdragend; .mailingDetailPicker-top" : bdragendMailingDetailPickerTopMethod ,
		
		//drag event,dialog resize
		"bdragmove; .resizeHandler" : bdragmoveResizeHandlerMethod ,
		
		"bdragend; .resizeHandler" : bdragendResizeHandlerMethod
	}
	
	MailingDetailPicker.prototype.docEvents = {
		// bind the Esc key
		"keyup" : function(event){
			if(event.which == 27){
				this.close();
			}
		}
	}
	
	// --------- events --------- //
	function clickCloseOrDoneMethod(){
		var view = this;
		triggerReportHeaderMailingDetailSelectorChange.call(view,_tempPrevSet.type);
		view.close();
	}
	
	function clickBtnCancelMethod(){
		var view = this;
		var defaultSetType = view.defaultSetType;
		smr.copySet(defaultSetType.set,_tempPrevSet);
		triggerReportHeaderMailingDetailSelectorChange.call(view,_tempPrevSet.type);
		view.close();
	}
	
	function bdragmoveMailingDetailPickerTopMethod(event){
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
	
	function bdragendMailingDetailPickerTopMethod(event){
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
	MailingDetailPicker.prototype.destroy = function(){
		var $e = this.$el;
		var $mailingView = $e.find(".mailingDetailPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		$selectMailingsTag.undelegate("input[name='name']","keyup.name");
	}
	
	MailingDetailPicker.prototype.close = function(){
		var view = this;
		view.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
				
		// when close MailingDetailPicker, do call back
		if(view._closeCallback && $.isFunction(view._closeCallback)){
			view._closeCallback(view.reportType,view.mailingSetName);
		}
	}
	
	MailingDetailPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	MailingDetailPicker.prototype.getFilters = function(){
		var view = this;
		var $e = view.$el;
		var reportType = this.reportType;
		var $mailingView = $e.find(".mailingDetailPicker-mailingView");
		var $selectMailingDetailsTag = $mailingView.find(".tag[data-tag='selectMailingDetails']");
		
		var opts = {};
		var dateRange = {};
		opts.mailingName = $selectMailingDetailsTag.find("input[name='name']").val();
		opts.mailingType = $selectMailingDetailsTag.find("select[name='mailingType']").val();
		opts.includeArchive = typeof $selectMailingDetailsTag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
		opts.endDate = dateRange.endDate;
		opts.startDate = dateRange.startDate;
		
		if($selectMailingDetailsTag.find("select[name='launchDate']").size()>0){
			var launchDateType = $selectMailingDetailsTag.find("select[name='launchDate']").val();
			if(launchDateType != 'all'){
				var lEndDate = smr.serverDate;
				var lStartDate = smr.getLastNDays(launchDateType,lEndDate);
				//for 'yesterday' , just list Yestoday's data and not today's data 
				if(launchDateType=="yesterday"){
					lEndDate = new Date(smr.serverDate - 1 * 24 * 60 * 60 * 1000);
				}
				opts.endDate = lEndDate;
				opts.startDate = lStartDate;
			}else{
				opts.endDate = null;
				opts.startDate = null;
			}
		}
		return opts;
	}
	
	MailingDetailPicker.prototype.getMailingDetailData = function(useTempData){
		var view = this;
		var reportType = view.reportType;
		var opts = view.getFilters();
		var dfd = $.Deferred();
		if(!useTempData || !view._MailingDetailTableData){
			smr.getMailingDetailsForFilterBox(view.reportType,opts.startDate,opts.endDate,opts.includeArchive,opts.mailingType).done(function(data){
				dfd.resolve(data.items);
				view._MailingDetailTableData = data.items;
			});
		}else{
			dfd.resolve(view._MailingDetailTableData);
		}
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
		
	// --------- Component Private Methods --------- //
	function showMailingDetailView(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName;
		var $content = $e.find(".mailingDetailPicker-content");
		$content.empty();
		$content.append(smr.render("tmpl-mailingDetailPicker-mailingView",{reportType:reportType}));
		var $tags = $content.find(".tags");
		var defaultTag = "selectMailingDetails";
				
		// tags
		var $selectMailingDetails = $(smr.render("tmpl-mailingDetailPicker-tag-selectMailingDetails",{reportType:reportType,isProgramLicensed:smr.isProgramLicensed}));
		$tags.append($selectMailingDetails);
		$e.find(".mailingDetailPicker-header .smrTabs input[type='radio'][value='selectMailingDetails']").closest(".tab").show();
		
		//default show select mailing tag
		var setType = smr.getSetAndType(reportType,mailingSetName);
		//init options
		var period = smr.buildPeriod(null,null,null);
		view.launchDateOpts = {
			includeArchive:setType.set.attr("includeArchive"),
			period:period
		}
		
		showTag.call(view,defaultTag,view.launchDateOpts);
		registerViewEvent.call(view);
	}
	
	function showTag(tag,option){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $tags = $e.find(".tags");
		$tags.find(".tag").hide();
		var $tag = $tags.find(".tag[data-tag='"+tag+"']");
		$tag.show();
		
		if(option && option.includeArchive){
			$tag.find("input[name='includeArchive']").attr("checked",true);
		} 

		showMailingDetailTable.call(view);
	}
	

	function registerViewEvent(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		var $mailingView = $e.find(".mailingDetailPicker-mailingView");
		var $selectMailingDetailsTag = $mailingView.find(".tag[data-tag='selectMailingDetails']");
		
		$selectMailingDetailsTag.delegate("select[name='launchDate']","change",function(){
			showMailingDetailTable.call(view);
		});
		
		$mailingView.find("input[name='includeArchive'][type='checkbox']").bind("change",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			
			saveLimitData.call(view,$tag);
			showMailingDetailTable.call(view,false);
		});
		
		
		$mailingView.delegate("input[name='name']","keyup.name",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			setFilterName.call(view,$this.val());
			showMailingDetailTable.call(view,true);
		});
		
		$mailingView.delegate("select[name='mailingType']","change",function(){
			var $this = $(this);
			showMailingDetailTable.call(view);
		});
		
		$mailingView.delegate(".keyCancel","click",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			$tag.find("input[name='name']").val("");
			setFilterName.call(view,$this.val());
			showMailingDetailTable.call(view,true);
		});
		
		$mailingView.delegate(".mailingDetailPicker-table table td.btnAction","click",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var mailingType = $tr.attr("data-obj.type");
			var obj = {id:id,name:name,mailingType:mailingType};
			var type = $table.attr("data-type");
			$table.find("tr").removeClass("checked");
            var set = getSet.call(view,type);
            set.clear();
            set.add(obj);
			$tr.addClass("checked");			
			triggerReportHeaderMailingDetailSelectorChange.call(view,type);
		});
		
		//add all event
		$mailingView.delegate(".mailingDetailPicker-table table td.btnAction","dblclick",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var mailingType = $tr.attr("data-obj.type");
			var obj = {id:id,name:name,mailingType:mailingType};
			var type = $table.attr("data-type");
			$table.find("tr").removeClass("checked");
            var set = getSet.call(view,type);
            set.clear();
            set.add(obj);
			$tr.addClass("checked");			
			triggerReportHeaderMailingDetailSelectorChange.call(view,type);
			view.close();
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
				$ico.addClass("icoAsc").removeClass("icoDesc").html("&uarr;");
			}else{
				$th.attr("data-order","Desc")
				$ico.addClass("icoDesc").removeClass("icoAsc").html("&darr;");
			}
			var sortInfo = { name:columnName, order:order };
			
			var type = $table.attr("data-type");
			view._mailingDetailSortInfo = sortInfo;
			showMailingDetailTable.call(view,true);

		});
		
	}
	
	
	function showMailingDetailTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".mailingDetailPicker-mailingView");
		var $selectMailingDetailsTag = $mailingView.find(".tag[data-tag='selectMailingDetails']");
		var $table = $selectMailingDetailsTag.find(".mailingDetailPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._mailingDetailSortInfo;
		var $availableMailings = $selectMailingDetailsTag.find(".availableMailings");
		
		$tbody.empty();
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getMailingDetailData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName||"";
			var availableCount = 0;
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
				if(!filterNameTmp || (objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1 )){
					obj.isSelected = false;
					var mailingDetailObject = {id:obj.id , name:obj.name };
					if(smr.getMailingDetailSet(view.reportType,view.mailingSetName).indexOf(mailingDetailObject) > -1){
						obj.isSelected = true;
					}
					if(obj.name && obj.name.length>26){
						obj.nameEllipses = obj.name.substring(0,12)+"..."+obj.name.substring(obj.name.length-12,obj.name.length) ;
					}
					if(obj.campaign && obj.campaign.length>26){
						obj.campaignEllipses = obj.campaign.substring(0,12)+"..."+obj.campaign.substring(obj.campaign.length-12,obj.campaign.length) ;
					}
					var $tr = smr.render("tmpl-mailingDetailPicker-mailingDetail-table-tr",obj);
					$tbody.append($tr);
					availableCount++;
				}
			}
			$availableMailings.find(".count").html(availableCount);
			
			view._MailingDetailTableData = data;
		});
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
		
		var includeArchive = typeof $tag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
		set.attr("includeArchive",includeArchive);
				
		triggerReportHeaderMailingDetailSelectorChange.call(view,tag);
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
	
	function getSet(type){
		var view = this;
		var $e = view.$el;
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType;
		return smr.getSet(reportType,mailingSetName,type);
	}
	
	function triggerReportHeaderMailingDetailSelectorChange(type){
		var view = this;
		var $e = view.$el;
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType;
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		getSet.call(view,type).attr("limit",true);
		
		clearByType.call(view,type);
		if(mailingSetName == "main"){
			$reportHeader.trigger("reportHeaderMailingSelectorChange",{mailingSetName:mailingSetName});
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
	brite.registerView("mailingDetailPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.MailingDetailPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
