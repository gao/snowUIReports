var smr = smr || {};

(function($){
	
	// --------- private properties ---------- //
	
	var validNumberReg = /^[0-9]*\.?[0-9]*$/;
	// ---------/ private properties ---------- //
	
	// --------- Component Interface Implementation ---------- //
	function UserInsightPicker(){};
	smr.UserInsightPicker = UserInsightPicker; 	
	
	UserInsightPicker.prototype.create = function(data,config){
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

		return smr.render("tmpl-userInsightPicker",{posUI:posUI,currency:smr.conversionCurrency});
	}
		
	UserInsightPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		
		view.reportType = data.type || smr.REPORT_TYPE.USERINSIGHT;
		view.defaultSetType = smr.getSetAndType(view.reportType);
		view._tempPrevSet = smr.createCopySet(view.defaultSetType.set);	
		
		view.$userInsightPickerMain = $e.find(".userInsightPicker-main");
		view.$userInsightPickerBottom = $e.find(".userInsightPicker-bottom");
		view.$userInsightPickerTable = view.$userInsightPickerMain.find(".userInsightPicker-table");
		view.$dataTable = view.$userInsightPickerTable.find(".dataTable");
		view.$dataTableBottom = view.$userInsightPickerMain.find(".dataTable-bottom");
		view.$relatedReport = data.$relatedReport || $("body").find(".report[data-type='"+view.reportType+"']");
		view.$filterContent = view.$userInsightPickerMain.find(".filter-content");
		view.$filterDateSelect = view.$userInsightPickerMain.find("select.date-select");
		view.$filterDateAdded = view.$userInsightPickerMain.find("input.dateAddedRange");
		view.$filterErrorMessage = view.$userInsightPickerMain.find(".error-message .msg-content");
		view.pageSize = 25;
		
		//add the search value
		var set = smr.getSetAndType(view.reportType,"main").set;
		var curSearchVal = set.attr("UserInsightSearchRecipientId") || "";
		if(curSearchVal != ""){
			view.$el.find(".userInsightPicker-filter").find(".filter-body .filter-recipientId").val(curSearchVal);
		}
		
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".userInsightPicker-top").addClass("IE9PickerHeader-background");
		showView.call(view);		
	}
	// --------- /Component Interface Implementation ---------- //
	
	UserInsightPicker.prototype.events = {
			
		"click; .userInsightPicker-top .close" : clickCloseOrDoneMethod,
		
		"click; .userInsightPicker-bottom .btn.done" : clickCloseOrDoneMethod,
		
		"click; .userInsightPicker-bottom .btn.select" : clickSelectMethod,
		
		"click; .userInsightPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//drag event,dialog move
		"bdragmove; .userInsightPicker-top" : bdragmoveUserInsightPickerTopMethod,
		
		"bdragend; .userInsightPicker-top" : bdragendUserInsightPickerTopMethod ,
		
		//drag event,dialog resize
		"bdragmove; .resizeHandler" : bdragmoveResizeHandlerMethod ,
		
		"bdragend; .resizeHandler" : bdragendResizeHandlerMethod,
		
		"click; .collapsible": clickCollapsibleEvent,
		
		// the filter reset button event 
		"click; .userInsightPicker-filter .filter-bottom .reset": clickFilterResetEvent,
		
		// the filter find button event 
		"click; .userInsightPicker-filter .filter-bottom .find": clickFilterFindEvent,
		
		"change; .userInsightPicker-pagination select": function(event) {
			var view = this;
			var value = $(event.currentTarget).val();
			var pageCount = (value == "All" ? "1000" : value*1 );
			view.pageSize = pageCount;
			showDetailTable.call(view,false,1);
		},
	
		"click; .userInsightPicker-pagination .nextEnd.action": function(e) {
			var view = this;
			var pageNum = Math.ceil(view.totalCount / view.pageSize);
			showDetailTable.call(view,false,pageNum)
		},
	
		"click; .userInsightPicker-pagination .prevStart.action": function(e) {
			var view = this;
			showDetailTable.call(view,false,1);
		},
		
		"click; .userInsightPicker-pagination .prev.action": function(e) {
			var view = this;
			var pageNum = view.curNum-1;
			showDetailTable.call(view,false,pageNum);
		},
		
		"click; .userInsightPicker-pagination .next.action": function(e) {
			var view = this;
			var pageNum = view.curNum+1;
			showDetailTable.call(view,false,pageNum);
		},
		
		"click; .userInsightPicker-pagination .nums .pageNum": function(event) {
			var view = this;
			var pageNum = $(event.currentTarget).attr("data-num") * 1;
			showDetailTable.call(view,false,pageNum);
		},
		
		//event for the rate input to check the number validation
		"blur; .rate-input , .currency-input": function(event) {
			var view = this;
			var $this = $(event.currentTarget);
			var value = $this.val();
			var name = $this.attr("data-name");
			if(!validNumberReg.test(value)){
				$this.addClass("error");
				view.$filterErrorMessage.html("Invalid value for "+name);
			}
		},
		
		//event for the rate input remove the error message
		"focus; .rate-input , .currency-input": function(event) {
			var view = this;
			var $this = $(event.currentTarget);
			if($this.hasClass("error")){
				$this.removeClass("error").val("");
				view.$filterErrorMessage.empty();
			}
		}
		
		
	}
	
	UserInsightPicker.prototype.docEvents = {
		// bind the Esc key
		"keyup" : function(event){
			if(event.which == 27){
				this.close();
			}else if(event.which == 13){
				clickFilterFindEvent.call(this);
			}
		}
	}
	
	// --------- events --------- //
	function clickCloseOrDoneMethod(){
		var view = this;
		view.close();
	}
	
	function clickSelectMethod(){
		var view = this;
		var $btnBatchAction = view.$userInsightPickerTable.find("thead tr th.first .btnBatchAction");
		$btnBatchAction.attr("checked","checked").trigger("change");
	}
	
	function clickBtnCancelMethod(){
		var view = this;
		smr.copySet(view.defaultSetType.set,view._tempPrevSet);
		view.close();
	}
	
	function bdragmoveUserInsightPickerTopMethod(event){
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
	
	function bdragendUserInsightPickerTopMethod(event){
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
	
	function clickCollapsibleEvent(event){
		var $this = $(event.currentTarget);
		var $filterTitle = $this.closest(".filter-title");
		var $filterBody  = $this.closest(".userInsightPicker-filter").find(".filter-body");
		if($filterTitle.hasClass("exp")){
			$filterTitle.removeClass("exp").addClass("col");
			$filterBody.slideUp(500);
		}else{
			$filterTitle.removeClass("col").addClass("exp");
			$filterBody.slideDown(500);
		}
	}
	
	function clickFilterResetEvent(event){
		var view = this;
		view.$filterContent.find("select").each(function(){this.selectedIndex=0;});
		view.$filterContent.find("input.fi").val("");
		view.$filterContent.find("input.dateAddedRange").val(getDateValue(smr.serverDate));
		showDetailTable.call(view,false);
		updateSearchRecipientId.call(view);
	}
	
	function clickFilterFindEvent(event){
		var view = this;
		var errorSize = view.$filterContent.find("input.error").size();
		if(errorSize>0){ return ;}
		showDetailTable.call(view,false);
		updateSearchRecipientId.call(view);
	}
	
	// --------- /events --------- //
	
	// --------- Component Public API --------- //
	UserInsightPicker.prototype.destroy = function(){
		var $e = this.$el;
		var $mailingView = $e.find(".userInsightPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		$selectMailingsTag.undelegate("input[name='name']","keyup.name");
	}
	
	UserInsightPicker.prototype.close = function(){
		var view = this;
		view.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
				
		// when close UserInsightPicker, do call back
		if(view._closeCallback && $.isFunction(view._closeCallback)){
			view._closeCallback(view.reportType,view.mailingSetName);
		}
	}
	
	UserInsightPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	UserInsightPicker.prototype.getFilters = function(){
		var view = this;
		var opts = {};
		var $filterBody = view.$el.find(".userInsightPicker-filter").find(".filter-body");
		var recipientId = $.trim($filterBody.find(".filter-recipientId").val());
		var count  = view.$dataTableBottom.find(".showRows select").val();
		count = (count=="All" ? 1000 : count);
		opts.recipientId = recipientId;
		opts.count = count || 25;
		opts.offset = (view.curNum-1) * parseInt(count) || 0;
		return opts;
	}
	
	UserInsightPicker.prototype.getUserInsightData = function(useTempData){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var opts = view.getFilters();
		var dfd = $.Deferred();

		if(!useTempData || !view._userInsightDatas){
			var $reportDataLoading = $e.closest(".userInsightPicker").find(".reportPicker-data-loading");
			$reportDataLoading.show();
			smr.getUserInsightForFilterBox(opts.recipientId,opts.offset,opts.count).done(function(data){
				view.totalCount = data.items[0].totalCount;
				view._userInsightDatas = data.items[0].data;
				$reportDataLoading.hide();
				dfd.resolve(data.items[0].data);
			});
		}else{
			dfd.resolve(view._userInsightDatas);
		}
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
		
	// --------- Component Private Methods --------- //
	function showView(){
		var view = this;
		var set  = smr.getSetAndType(view.reportType).set;
		var dateCompareType = set.attr("dateCompareType") || "after";
		var dateCompareDate = set.attr("dateCompareDate") || getDateValue(smr.serverDate);
		
		view.defaultCompareDate = dateCompareDate;
		view.$filterDateSelect.val(dateCompareType);
		view.$filterDateAdded.val(dateCompareDate);
		
		showDetailTable.call(view);
		showViewOrDoneButton.call(view);
		registerViewEvent.call(view);
	}
	

	function registerViewEvent(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		
		view.$userInsightPickerMain.delegate(".userInsightPicker-table table td .btnAction","change",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var $table = $tr.closest("table");
			
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			
			
			$tr.toggleClass("checked");
			if($btn.attr("checked")){
				var objc = brite.array.getItem(view._userInsightDatas,"audienceId",parseInt(id));
				//hide the dateAdded 2013-09-16
				//var obj = {id:id,name:objc.recipientId,email:objc.recipientId,dateAdded:objc.dateAdded};
				var obj = {id:id,name:objc.recipientId,email:objc.recipientId};
				getSet.call(view).add(obj);
			}else{
				var index = getSet.call(view).indexOf({id:id});
				getSet.call(view).remove(index);
			}
			checkSelectAll($table);
			showViewOrDoneButton.call(view);
		});
		
		view.$userInsightPickerMain.delegate(".userInsightPicker-table table th .btnBatchAction","change",function(){
			var $btn = $(this);
			var $table = $btn.closest("table");
			if($btn.attr("checked")){
				$table.find("tbody tr").each(function(){
					var $tr = $(this);
					var id = $tr.attr("data-obj.id");
					var name = $tr.attr("data-obj.name");
					var objc = brite.array.getItem(view._userInsightDatas,"audienceId",parseInt(id));
					//hide the dateAdded 2013-09-16
					//var obj = {id:id,name:objc.recipientId,email:objc.recipientId,dateAdded:objc.dateAdded};
					var obj = {id:id,name:objc.recipientId,email:objc.recipientId};
					if(getSet.call(view).indexOf(obj) == -1){
						getSet.call(view).add(obj);
						$tr.addClass("checked").find(".btnAction").attr("checked","checked");
					}
				});
			}else{
				getSet.call(view).clear();
				$table.find("tbody tr").each(function(){
					var $tr = $(this);
					$tr.removeClass("checked").find(".btnAction").removeAttr("checked");
				});
			}	
			showViewOrDoneButton.call(view);
		});
		
		view.$userInsightPickerMain.delegate("thead th.sortable","click",function(){			
			var $this = $(this);
			var $thead = $this.closest("thead");
			var $table = $thead.closest("table");
			var order = false;
			var tableData = $table.data("data");
			var data_order = $this.attr("data-order"); 
			var columnName = $this.attr("data-column");
			var order = (data_order && data_order=="Desc") ? true :false;
			$thead.find("th").removeClass("asc").removeClass("desc").removeAttr("data-order");
			if(order){
				$this.addClass("asc").attr("data-order","Asc");
			}else{
				$this.addClass("desc").attr("data-order","Desc");
			}
			var sortInfo = { name:columnName, order:order };
			view._userInsightInfo = sortInfo;
			showDetailTable.call(view,true);
		});
		
		view.$userInsightPickerMain.delegate("input.dateAddedRange","click",function(e){
			var $this = $(this);
			var posX = $this.offset().left;
			var posY = $this.offset().top + 20;
			brite.display("dateSelect",null,{posX:posX,posY:posY}).done(function(component){
				component.onChange(function(date){
					var newCaompareDate = getDateValue(date);
					view.defaultCompareDate = newCaompareDate;
					$this.val(newCaompareDate);
					saveCompareDateAndType.call(view);
				});
				component.onClose(function(){
					$this.val(view.defaultCompareDate);
				});
			});
		});
		
		view.$userInsightPickerMain.delegate("select.date-select","change",function(e){
			saveCompareDateAndType.call(view);
		});
		
	}
	
	//show the table data
	function showDetailTable(ifTempData,pageNum){
		var view = this;
		var $e = view.$el;
		
		var $table = view.$dataTable;
		var $tbody = $table.find("tbody").empty();
		var sortInfo = view._userInsightInfo;
		
		view.curNum = pageNum || 1;
			
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getUserInsightData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			var pageInfo = getPageInfo(view.totalCount,view.curNum,view.pageSize);
			var list = smr.getUserInsightSet(view.reportType,"main").list();
			if(typeof data!="undefined" && data!=null){
				for(var i=0; i<data.length;i++) {
					var obj = $.extend({isSelected:false,currency:smr.conversionCurrency},data[i]);
					obj.id = obj.audienceId;
					var userInsightObject = {id: obj.audienceId+"" , name:obj.recipientId };
					if(smr.getUserInsightSet(view.reportType,"main").indexOf(userInsightObject) > -1){
						obj.isSelected = true;
					}
//				if(obj.name && obj.name.length>13){
//					var name = obj.name;
//					obj.nameEllipses = name.substring(0,5)+"..."+name.substring(name.length-6,name.length) ;
//				}
					var tr = smr.render("tmpl-userInsightPicker-dataTable-tr",obj);
					$tbody.append(tr);
				}
			}else{
				$tbody.append("<tr><td colspan='3' style='text-align:center'>No Data!</td></tr>")
			}
			var paginationHtml = smr.render("tmpl-userInsightPicker-pagination",pageInfo);
			view.$dataTableBottom.html(paginationHtml);
			view.$userInsightPickerMain.find(".available-count").html(view.totalCount);
			view._userInsightDatas = data;
			checkSelectAll($table);
		});
	}
		
	
	function showViewOrDoneButton(){
		var view = this;
		var list  = smr.getSetAndType(view.reportType).set.list();
		if(list.length>0){
			view.$userInsightPickerBottom.find(".done").show();
			view.$userInsightPickerBottom.find(".select").hide();
		}else{
			view.$userInsightPickerBottom.find(".done").hide();
			view.$userInsightPickerBottom.find(".select").show();
		}
		
	}
	
	function saveCompareDateAndType(){
		var view = this;
		var set  = smr.getSetAndType(view.reportType).set;
		var dateCompareType = view.$filterDateSelect.val();
		set.attr("dateCompareType",dateCompareType);
		set.attr("dateCompareDate",view.defaultCompareDate);
	}
	
	function getSet(type){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var set = smr.getSet(reportType,"main","userInsight");
		return set;
	}
	
	function clearByType(type){
		var view = this;
		smr.setDefaultSet(view.reportType,view.mailingSetName,type);
	}
	
	function checkSelectAll($table){
		var trSize = $table.find("tbody tr").size();
		var checkedSize = $table.find("tbody tr .first input[type='checkbox']:checked").size();
		if(trSize == checkedSize && trSize > 0 ){
			$table.find("thead tr .btnBatchAction").attr("checked",true);
		}else{
			$table.find("thead tr .btnBatchAction").removeAttr("checked");
		}
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
	
	function getPageInfo(total,curNum,pageSize){
		var object = {};
		object.pageNum   = curNum;
		object.pageCount = pageSize;
		object.sizeCount = total;
		object.startRows = (curNum-1) * pageSize + 1;
		object.endRows   =  curNum * pageSize > total ? total : curNum * pageSize ;
		object.pageSize  = Math.ceil(total / pageSize);

    	var cp = curNum;
    	var yu = cp%10 ;
        var min = (yu==0 ? curNum - pageSize+1 :curNum - yu+1);
        var max = (yu==0 ? cp : cp+(pageSize-yu) );
        if(max >= object.pageSize) max = object.pageSize;
        var pages = [];
        for(var i = 0, j = min; j <= max; j++, i++){
            pages[i] = j;
        }
        object.pageList =  pages;
        object.isFirst  = (curNum==1);
        object.isLast   = (curNum==object.pageSize);
        return object;
	}
	
	function updateSearchRecipientId(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var opts = view.getFilters();
		var recipientId = opts.recipientId;
		var set = smr.getSetAndType(view.reportType).set;
		set.attr("UserInsightSearchRecipientId",recipientId);
	}
	
	// --------- /Component Private Methods --------- //
	
	// --------- Component Registration --------- //
	brite.registerView("userInsightPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.UserInsightPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
