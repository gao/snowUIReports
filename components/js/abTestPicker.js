var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _tempPrevSet = null;
	var _defaultStartDate = "";
	var _defaultEndDate = "";
	//--------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function ABTestPicker(){};
	smr.ABTestPicker = ABTestPicker; 	
	
	ABTestPicker.prototype.build = function(data,config){
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
		var reportType = data.type || smr.REPORT_TYPE.AUDIENCE;
		var titleStr = "Select A/B Test Mailings";
		var html = smr.render("tmpl-abTestPicker",{posUI:posUI,extTitle:titleStr});
		return html;
	}
		
	ABTestPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		data = data || {};
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType = data.type || smr.REPORT_TYPE.ABTEST;
		view.$relatedReport = data.$relatedReport || $("body").find(".report[data-type='"+view.reportType+"']");
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		//save a temp set so we can do a 'cancel'
		var defaultSetType = smr.getSetAndType(reportType,mailingSetName);
		_tempPrevSet = smr.createCopySet(defaultSetType.set);
		
		view.defaultSetType = defaultSetType;
		
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".abTestPicker-top").addClass("IE9PickerHeader-background");
		//show default view
		showTargetView.call(view);
	
	}
	// --------- /Component Interface Implementation ---------- //
	
	ABTestPicker.prototype.events = {
		"click; .abTestPicker-top .close" : clickCloseOrDoneMethod,
		
		"click; .abTestPicker-bottom .btn.done" : clickCloseOrDoneMethod,
		
		"click; .abTestPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//drag event,dialog move
		"bdragmove; .abTestPicker-top" : bdragmoveABTestPickerTopMethod,
		
		"bdragend; .abTestPicker-top" : bdragendABTestPickerTopMethod,
		
		//drag event,dialog resize
		"bdragmove; .resizeHandler" : bdragmoveResizeHandlerMethod,
		
		"bdragend; .resizeHandler" : bdragendResizeHandlerMethod
	}
	
	ABTestPicker.prototype.docEvents = {
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
		view.close();
	}
	
	function clickBtnCancelMethod(){
		var view = this;
		var defaultSetType = view.defaultSetType;
		smr.copySet(defaultSetType.set,_tempPrevSet);
		triggerReportHeaderTargetSelectorChange.call(view,_tempPrevSet.type);
		view.close();
	}
	
	function bdragmoveABTestPickerTopMethod(event){
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
	
	function bdragendABTestPickerTopMethod(event){
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
	ABTestPicker.prototype.destroy = function(){
		var $e = this.$el;
		var $mailingView = $e.find(".abTestPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		$selectMailingsTag.undelegate("input[name='name']","keyup.name");
		$("body").unbind("keyup.closeDialog");
	}
	
	ABTestPicker.prototype.close = function(){
		var view = this;
		this.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
				
		// when close ABTestPicker, do call back
		if(view._closeCallback && $.isFunction(view._closeCallback)){
			view._closeCallback(view.reportType,view.mailingSetName);
		}
	}
	
	ABTestPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	ABTestPicker.prototype.getFilters = function(){
		var view = this;
		var $e = view.$el;
		var reportType = this.reportType;
		var $mailingView = $e.find(".abTestPicker-mailingView");
		var $selectABTestMailingsTag = $mailingView.find(".tag[data-tag='selectABTestMailings']");
		
		var opts = {};
		
		opts.filtername = $selectABTestMailingsTag.find("input[name='name']").val();	
		opts.includeArchive = typeof $selectABTestMailingsTag.find("input[name='includeArchive']").attr("checked") == 'undefined' ? false : true;
		var launchDateType = $selectABTestMailingsTag.find("select[name='launchDate']").val();
		if(launchDateType != 'all'){
			var lEndDate = smr.serverDate;
			var lStartDate = smr.getLastNDays(launchDateType,lEndDate);
			if(launchDateType=="yesterday")lEndDate = new Date(smr.serverDate - 1 * 24 * 60 * 60 * 1000);
			opts.endDate = lEndDate;
			opts.startDate = lStartDate;
		}else{
			opts.endDate = null;
			opts.startDate = null;
		}
		
		return opts;
	}
	
	ABTestPicker.prototype.getMailingsData = function(useTempData){
		var view = this;
		var reportType = view.reportType;
		var opts = view.getFilters();
		var dfd = $.Deferred();
		if(!useTempData || !view._TargetTableData){
			smr.getABTestMailingsForFilterBox(view.reportType,opts.startDate,opts.endDate,opts.includeArchive).done(function(data){
				if(data.items==null){
					dfd.resolve([]);
				}else{
					dfd.resolve(data.items);
				}
				view._TargetTableData = data.items;
			});
		}else{
			dfd.resolve(view._TargetTableData);
		}
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
		
	// --------- Component Private Methods --------- //
	function showTargetView(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName;
		var $content = $e.find(".abTestPicker-content");
		$content.empty();
		$content.append(smr.render("tmpl-abTestPicker-mailingView",{reportType:reportType}));
		var $tags = $content.find(".tags");
		var defaultTag = "selectABTestMailings";
				
		// tags
		var $selectTargets = $(smr.render("tmpl-abTestPicker-tag-selectTargets",{reportType:reportType}));
		$tags.append($selectTargets);
		
		//default show select mailing tag
		var setType = smr.getSetAndType(reportType,mailingSetName);
		var option = {includeArchive:(setType.set.attr("includeArchive")?true:false)};
		showTag.call(view,defaultTag,option);
		registerViewEvent.call(view);
	}
	
	function showTag(tag,option){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		if(option && option.includeArchive){
			$e.find(".abTestPicker-mailingView input[name='includeArchive'][type='checkbox']").attr("checked",true);
		}

		showSelectABMailingsTable.call(view);
	}

	function registerViewEvent(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		var $mailingView = $e.find(".abTestPicker-mailingView");
		var $selectABTestMailings = $mailingView.find(".tag[data-tag='selectABTestMailings']");
		
		$selectABTestMailings.delegate("select[name='launchDate']","change",function(){
			showSelectABMailingsTable.call(view);
		});
		
		$mailingView.find("input[name='includeArchive'][type='checkbox']").bind("change",function(){
			var $this = $(this);
			var includeArchive = $this.attr("checked") == 'undefined' ? false : true;
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			var set = getSet.call(view,tag);
			if(includeArchive){
				set.attr("includeArchive",true);
			}else{
				set.attr("includeArchive",false);
			}
			showSelectABMailingsTable.call(view);
		});
		
		$mailingView.delegate("input[name='name']","keyup.name",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			setFilterName.call(view,$this.val());
			showSelectABMailingsTable.call(view,true);
		});
		
		$mailingView.delegate(".keyCancel","click",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			$tag.find("input[name='name']").val("");
			setFilterName.call(view,$this.val());
			showSelectABMailingsTable.call(view,true);
		});
		
		$mailingView.delegate(".abTestPicker-table table td.btnAction","click",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var obj = {id:id,name:name};
			var type = $table.attr("data-type");
			$table.find("tr").removeClass("checked");
            var set = getSet.call(view,type);
            set.clear();
            set.add(obj);
			$tr.addClass("checked");			
			triggerReportHeaderTargetSelectorChange.call(view,type);
		});
		
		//add all event
		$mailingView.delegate(".abTestPicker-table table td.btnAction","dblclick",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var obj = {id:id,name:name};
			var type = $table.attr("data-type");
			$table.find("tr").removeClass("checked");
            var set = getSet.call(view,type);
            set.clear();
            set.add(obj);
			$tr.addClass("checked");			
			triggerReportHeaderTargetSelectorChange.call(view,type);
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
			view._targetSortInfo = sortInfo;
			showSelectABMailingsTable.call(view,true);

		});
		
	}
	
	function showSelectABMailingsTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".abTestPicker-mailingView");
		var $selectABTestMailings = $mailingView.find(".tag[data-tag='selectABTestMailings']");
		var $table = $selectABTestMailings.find(".abTestPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._targetSortInfo;
		var $availableMailings = $(".abTestPicker").find(".availableMailings");
		
		$tbody.empty();
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getMailingsData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName||"";
			var availableCount = 0;
			if(data.length>0){
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
					if(!filterNameTmp || (objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1 ) ){
						obj.isSelected = false;
						var targetObject = {id:obj.id , name:obj.name };
						if(smr.getABTestSet(view.reportType,view.mailingSetName).indexOf(targetObject) > -1){
							obj.isSelected = true;
						}
						if(obj.name && obj.name.length>20){
							obj.nameEllipses = obj.name.substring(0,8)+"..."+obj.name.substring(obj.name.length-8,obj.name.length) ;
						}
						if(obj.campaign && obj.campaign.length>20){
							obj.campaignEllipses = obj.campaign.substring(0,8)+"..."+obj.campaign.substring(obj.campaign.length-8,obj.campaign.length) ;
						}
						var $tr = smr.render("tmpl-abTestPicker-target-table-tr",obj);
						$tbody.append($tr);
						availableCount++;
					}
				}
			}
			$availableMailings.find(".count").html(availableCount);
			
			view._TargetTableData = data;
		});
	}
	
	function getSet(type){
		var view = this;
		var $e = view.$el;
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType;
		return smr.getSet(reportType,mailingSetName,type);
	}
	
	function triggerReportHeaderTargetSelectorChange(type){
		var view = this;
		var $e = view.$el;
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType;
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
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
		var $e = view.$element;
		view._filterName = name;
		$e.find("input[name='name']").val(name);
		if(name != ""){
			$e.find(".keyCancel").show();
		}else{
			$e.find(".keyCancel").hide();
		}
	}
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("abTestPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.ABTestPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
