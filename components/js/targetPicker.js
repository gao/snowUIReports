var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _tempPrevSet = null;
	var _defaultStartDate = "";
	var _defaultEndDate = "";
	//--------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function TargetPicker(){};
	smr.TargetPicker = TargetPicker; 	
	
	TargetPicker.prototype.build = function(data,config){
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
		var titleStr = "Select Target";
		var $html = smr.render("tmpl-targetPicker",{posUI:posUI,extTitle:titleStr});
		var $e = $($html);
        return $e;
	}
		
	TargetPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		data = data || {};
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType = data.type || smr.REPORT_TYPE.AUDIENCE;
		view.$relatedReport = data.$relatedReport || $("body").find(".report[data-type='"+view.reportType+"']");
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		//save a temp set so we can do a 'cancel'
		var defaultSetType = smr.getSetAndType(reportType,mailingSetName);
		_tempPrevSet = smr.createCopySet(defaultSetType.set);
		
		view.defaultSetType = defaultSetType;
		
		//show default view
		showTargetView.call(view);
		
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".targetPicker-top").addClass("IE9PickerHeader-background");
	
	}
	// --------- /Component Interface Implementation ---------- //
	
	TargetPicker.prototype.events = {
		"click; .targetPicker-top .close" : clickCloseOrDoneMethod,
		
		"click; .targetPicker-bottom .btn.done" : clickCloseOrDoneMethod,
		
		"click; .targetPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//drag event,dialog move
		"bdragmove; .targetPicker-top" : bdragmoveTargetPickerTopMethod,
		
		"bdragend; .targetPicker-top" : bdragendTargetPickerTopMethod,
		
		//drag event,dialog resize
		"bdragmove; .resizeHandler" : bdragmoveResizeHandlerMethod,
		
		"bdragend; .resizeHandler" : bdragendResizeHandlerMethod
	}
	
	TargetPicker.prototype.docEvents = {
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
		var reflag = beforeCloseOrDoneCheckDate(view);
		if(reflag) view.close();
	}
	
	function clickBtnCancelMethod(){
		var view = this;
		var defaultSetType = view.defaultSetType;
		smr.copySet(defaultSetType.set,_tempPrevSet);
		triggerReportHeaderTargetSelectorChange.call(view,_tempPrevSet.type);
		view.close();
	}
	
	function bdragmoveTargetPickerTopMethod(event){
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
	
	function bdragendTargetPickerTopMethod(event){
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
	TargetPicker.prototype.destroy = function(){
		var $e = this.$el;
		var $mailingView = $e.find(".targetPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		$selectMailingsTag.undelegate("input[name='name']","keyup.name");
		$("body").unbind("keyup.closeDialog");
	}
	
	TargetPicker.prototype.close = function(){
		var view = this;
		this.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
				
		// when close TargetPicker, do call back
		if(view._closeCallback && $.isFunction(view._closeCallback)){
			view._closeCallback(view.reportType,view.mailingSetName);
		}
	}
	
	TargetPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	TargetPicker.prototype.getFilters = function(){
		var view = this;
		var $e = view.$el;
		var reportType = this.reportType;
		var $mailingView = $e.find(".targetPicker-mailingView");
		var $selectTargetsTag = $mailingView.find(".tag[data-tag='selectTargets']");
		
		var opts = {};
		
		opts.filtername = $selectTargetsTag.find("input[name='name']").val();		
		var launchDateType = $selectTargetsTag.find("select[name='launchDate']").val();
		if(launchDateType != 'all'){
			var lEndDate = smr.serverDate;
			var lStartDate = smr.getLastNDays(launchDateType,lEndDate);
			if(launchDateType=="yesterday"){
				lEndDate = new Date(smr.serverDate - 1 * 24 * 60 * 60 * 1000);
			}
			opts.endDate = lEndDate;
			opts.startDate = lStartDate;
		}else{
			opts.endDate = null;
			opts.startDate = null;
		}
		
		return opts;
	}
	
	TargetPicker.prototype.getTargetData = function(useTempData){
		var view = this;
		var reportType = view.reportType;
		var opts = view.getFilters();
		var dfd = $.Deferred();
		if(!useTempData || !view._TargetTableData){
			smr.getTargetsForFilterBox(view.reportType,opts.startDate,opts.endDate).done(function(data){
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
		var $content = $e.find(".targetPicker-content");
		$content.empty();
		$content.append(smr.render("tmpl-targetPicker-mailingView",{reportType:reportType}));
		var $tags = $content.find(".tags");
		var defaultTag = "selectTargets";
				
		// tags
		var $selectTargets = $(smr.render("tmpl-targetPicker-tag-selectTargets",{reportType:reportType}));
		$tags.append($selectTargets);
		
		//default show select mailing tag
		var setType = smr.getSetAndType(reportType,mailingSetName);
		
		showTag.call(view,defaultTag);
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
		$e.find(".targetPicker-header .smrTabs input[type='radio'][value='"+tag+"']").attr("checked",true);

		showTargetTable.call(view);
		refreshLimitData.call(view,"selectTargets");
			
	}
	

	function registerViewEvent(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		var $mailingView = $e.find(".targetPicker-mailingView");
		var $selectTargetsTag = $mailingView.find(".tag[data-tag='selectTargets']");
		
		$selectTargetsTag.delegate("select[name='launchDate']","change",function(){
			showTargetTable.call(view);
		});
		
		$mailingView.delegate("select[name='dateTypeSelect']","change",function(){
			var $this = $(this);
			showDateType.call(view,$this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			
			saveLimitData.call(view,$tag);

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
				saveLimitData.call(view,$tag);
				
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
			var $message = $tag.find(".message");
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
					saveLimitData.call(view,$tag);
				});
				
				component.onClose(function(){
					if(!changed){
						$date.val(preValue);
					}else{
						if(!isValidDate($date)){
							alert("Please enter right date format!");
							$date.val(preValue);
						}else{
							var date = new Date(Date.parse($date.val()));
							if(date<belforeLimitedDate){
								$date.val(preValue);
							}
							saveLimitData.call(view,$tag);
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
			showTargetTable.call(view,true);
		});
		
		$mailingView.delegate(".keyCancel","click",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			$tag.find("input[name='name']").val("");
			setFilterName.call(view,$this.val());
			showTargetTable.call(view,true);
		});
		
		$mailingView.delegate(".targetPicker-table table td.btnAction","click",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var dataSourceType = $tr.attr("datasource-type");
			var obj = {id:id,name:name,dataSourceType:dataSourceType};
			var type = $table.attr("data-type");
			$table.find("tr").removeClass("checked");
            var set = getSet.call(view,type);
            set.clear();
            set.add(obj);
			$tr.addClass("checked");			
			triggerReportHeaderTargetSelectorChange.call(view,type);
		});
		
		//add all event
		$mailingView.delegate(".targetPicker-table table td.btnAction","dblclick",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var dataSourceType = $tr.attr("datasource-type");
			var obj = {id:id,name:name,dataSourceType:dataSourceType};
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
			showTargetTable.call(view,true);

		});
		
	}
	
	
	function showTargetTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".targetPicker-mailingView");
		var $selectTargetsTag = $mailingView.find(".tag[data-tag='selectTargets']");
		var $table = $selectTargetsTag.find(".targetPicker-table table");
		var $noTarget = $selectTargetsTag.find(".targetPicker-table .targetPicker-noTargets");
		var $tbody = $table.find("tbody");
		var sortInfo = view._targetSortInfo;
		var $availableMailings = $selectTargetsTag.find(".availableMailings");
		
		$tbody.empty();
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getTargetData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName||"";
			var availableCount = 0;
			if(data.length>0){
				$table.show();
				$noTarget.hide();
				for(var i=0; i<data.length;i++){
					var obj = data[i];
					var objNameTmp = obj.name;
					if(obj.name){
						objNameTmp = (obj.name).toLowerCase();
					}
					var objDataSourceTmp = obj.dataSource;
					if(obj.dataSource){
						objDataSourceTmp = (obj.dataSource).toLowerCase();
					}
					var filterNameTmp = filterName;
					if(filterName){
						filterNameTmp = filterName.toLowerCase();
					}
					if(!filterNameTmp || (objNameTmp && objNameTmp.indexOf(filterNameTmp) > -1 ) || (objDataSourceTmp && objDataSourceTmp.indexOf(filterNameTmp) > -1 )){
						obj.isSelected = false;
						var targetObject = {id:obj.id , name:obj.name };
						if(smr.getTargetSet(view.reportType,view.mailingSetName).indexOf(targetObject) > -1){
							obj.isSelected = true;
						}
						if(obj.name && obj.name.length>26){
							obj.nameEllipses = obj.name.substring(0,12)+"..."+obj.name.substring(obj.name.length-12,obj.name.length) ;
						}
						if(obj.dataSource && obj.dataSource.length>26){
							obj.dataSourceEllipses = obj.dataSource.substring(0,12)+"..."+obj.dataSource.substring(obj.dataSource.length-12,obj.dataSource.length) ;
						}
						var $tr = smr.render("tmpl-targetPicker-target-table-tr",obj);
						$tbody.append($tr);
						availableCount++;
					}
				}
			}else{
				$noTarget.show();
			}
			$availableMailings.find(".count").html(availableCount);
			checkSelectALl($table);
			
			view._TargetTableData = data;
		});
	}
	
	function refreshLimitData(tag){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $tag = $e.find(".tag[data-tag='"+tag+"']");
		var $dateTypeSelect = $tag.find("select[name='dateTypeSelect']");
		var dateType = getSet.call(view,tag).period().getDateType();
		showDateType.call(view,$dateTypeSelect,dateType);
	}
	
	function saveLimitData($tag){
		var view = this;
		var $e = view.$el
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
		
				
		triggerReportHeaderTargetSelectorChange.call(view,tag);
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
			var dateRange = getSet.call(view,tag).period().getDateRange();
			
			$startDate.val(getDateValue(dateRange.startDate));
			$endDate.val(getDateValue(dateRange.endDate));
		}else{
			$date.hide();
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
	
	function checkSelectALl($table){
		var trSize = $table.find("tbody tr").size();
		var checkedSize = $table.find("tbody tr .first input[type='checkbox']:checked").size();
		if(trSize == checkedSize && trSize > 0 ){
			$table.find("thead tr .btnBatchAction").attr("checked",true);
		}else{
			$table.find("thead tr .btnBatchAction").removeAttr("checked");
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
			saveLimitData.call(view,$tag);
		});
		return reflag;
	}
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("targetPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.TargetPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
