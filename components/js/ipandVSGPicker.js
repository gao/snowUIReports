var smr = smr || {};

(function($){

	//--------- Component Private Properties --------- //
	var _tempPrevSet = null;
	var _defaultStartDate = "";
	var _defaultEndDate = "";
	//--------- /Component Private Properties --------- //
	
	// --------- Component Interface Implementation ---------- //
	function IPandVSGPicker(){};
	smr.IPandVSGPicker = IPandVSGPicker; 	
	
	IPandVSGPicker.prototype.create = function(data,config){
		data = data || {};
		var mailingSetName = this.mailingSetName = data.mailingSetName || "main";
		var posWH = smr.getIPandVSGPickerUIStates("PosWH");
		var posXY = smr.getIPandVSGPickerUIStates("PosXY");
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
		var reportType = data.type || smr.REPORT_TYPE.DELIVERABILITY;
		var titleStr = "Select Mailing Server Groups / IPs";
		if(reportType == smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
			titleStr = "Select Mailing Server Groups";
		}
		return smr.render("tmpl-ipandVSGPicker",{posUI:posUI,extTitle:titleStr});
	}
		
	IPandVSGPicker.prototype.postDisplay = function(data,config){
	    var view = this;
		var $e = view.$el;
		data = data || {};
		var mailingSetName = view.mailingSetName;
		var reportType = view.reportType = data.type || smr.REPORT_TYPE.DELIVERABILITY;
		view.hasSubOrganization = smr.hasSubOrgs[reportType] || false;
		view.isRootOrg = smr.isRootOrg[reportType] || false;
		view.$relatedReport = data.$relatedReport || $("body").find(".report[data-type='"+view.reportType+"']");
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		
		//save a temp set so we can do a 'cancel'
		var defaultSetType = smr.getSetAndType(reportType,mailingSetName);
		_tempPrevSet = smr.createCopySet(defaultSetType.set);
		
		view.defaultSetType = defaultSetType;
		
		if(smr.isIE && smr.isIE[1] == '9.0') view.$el.find(".ipandVSGPicker-top").addClass("IE9PickerHeader-background");
		//show default view
		showIPandVSGView.call(view);
		
	}
	// --------- /Component Interface Implementation ---------- //
	
	IPandVSGPicker.prototype.events = {
		"click; .ipandVSGPicker-top .close" : clickCloseOrDoneMethod,
		
		"click; .ipandVSGPicker-bottom .btn.done" : clickCloseOrDoneMethod,
		
		"click; .ipandVSGPicker-bottom .btn.cancel" : clickBtnCancelMethod,
		
		//drag event,dialog move
		"bdragmove; .ipandVSGPicker-top" : bdragmoveIpandVSGPickerTopMethod,
		
		"bdragend; .ipandVSGPicker-top" : bdragendIpandVSGPickerTopMethod,
		
		//drag event,dialog resize
		"bdragmove; .resizeHandler" : bdragmoveResizeHandlerMethod,
		
		"bdragend; .resizeHandler" : bdragendResizeHandlerMethod 
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
		triggerReportHeaderVSGIPSelectorChange.call(view,_tempPrevSet.type);
		view.close();
	}
	
	function bdragmoveIpandVSGPickerTopMethod(event){
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
	
	function bdragendIpandVSGPickerTopMethod(event){
		var view = this;
		var $e = view.$el;
		var pos = $e.offset();
	    var newX = pos.left;
	    var newY = pos.top;
		smr.saveIPandVSGPickerUIStates("PosXY",{left:newX,top:newY});
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
		smr.saveIPandVSGPickerUIStates("PosWH",{width:w,height:h});
	}
	// --------- /events --------- //
	
	IPandVSGPicker.prototype.docEvents = {
		// bind the Esc key
		"keyup" : function(event){
			if(event.which == 27){
				this.close();
			}
		}
	}
	
	// --------- Component Public API --------- //
	IPandVSGPicker.prototype.destroy = function(){
		var $e = this.$el;
		var $mailingView = $e.find(".ipandVSGPicker-mailingView");
		var $selectMailingsTag = $mailingView.find(".tag[data-tag='selectMailings']");
		$selectMailingsTag.undelegate("input[name='name']","keyup.name");
	}
	
	IPandVSGPicker.prototype.close = function(){
		var view = this;
		view.$el.bRemove();
		$("body").find("#notTransparentScreen").remove();
				
		// when close IPandVSGPicker, do call back
		if(view._closeCallback && $.isFunction(view._closeCallback)){
			view._closeCallback(view.reportType,view.mailingSetName);
		}
	}
	
	IPandVSGPicker.prototype.onClose = function(closeCallback){
		this._closeCallback = closeCallback;
	}
	
	IPandVSGPicker.prototype.getFilters = function(type){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var $mailingView = $e.find(".ipandVSGPicker-mailingView");
		var $selectVSGsTag = $mailingView.find(".tag[data-tag='selectVSGs']");
		var $selectIPsTag = $mailingView.find(".tag[data-tag='selectIPs']");
		
		var opts = {};
		if(typeof type == 'undefined'){
			type = 'vsgs';
		}
		if(type == "vsgs"){
			opts.filtername = $selectVSGsTag.find("input[name='name']").val();
			opts.includeSubOrganizations = typeof $selectVSGsTag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
		}else if(type == "ips"){
			opts.filtername = "";
			opts.includeSubOrganizations = typeof $selectIPsTag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
		}
		return opts;
	}
	
	IPandVSGPicker.prototype.getVSGData = function(useTempData){
		var view = this;
		var reportType = view.reportType;
		var dfd = $.Deferred();
		var filter = view.getFilters("vsgs");
		if(!useTempData || !view._VSGTableData){
			smr.getVSGsForFilterBox(reportType,filter.includeSubOrganizations).done(function(data){
				dfd.resolve(data.items);
				view._VSGTableData = data.items;
			});
		}else{
			dfd.resolve(view._VSGTableData);
		}
		return dfd.promise();
	}
	
	IPandVSGPicker.prototype.getIPData = function(useTempData){
		var view = this;
		var reportType = view.reportType;
		var dfd = $.Deferred();
		var filter = view.getFilters("ips");
		if(!useTempData || !view._IPTableData){
			smr.getVSGsForFilterBox(reportType,filter.includeSubOrganizations).done(function(data){
				var dataItems = data.items;
				var ipDataArray = new Array();
				var iptem = {};
				//put all the IP of the VSG into one array, and format every object like {"ip":xxx,"name":xxx} 
				for(var k=0;k<dataItems.length;k++){
					var ipsarr = dataItems[k].ips;
					for(var i=0 ; i<ipsarr.length; i++ ){
						if(iptem[ipsarr[i]]==null){
							ipDataArray.push({"ip":ipsarr[i],"name":ipsarr[i]});
							iptem[ipsarr[i]]=false;
						}
					}
				}
				dfd.resolve(ipDataArray);
				view._IPTableData = ipDataArray;
			});
		}else{
			dfd.resolve(view._IPTableData);
		}
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
		
	// --------- Component Private Methods --------- //
	function showIPandVSGView(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName;
		var $content = $e.find(".ipandVSGPicker-content");
		$content.empty();
		$content.append(smr.render("tmpl-ipandVSGPicker-mailingView",{reportType:reportType}));
		var $tags = $content.find(".tags");
		var defaultTag = "selectIPs";
				
		// tags
		var renderOption = {reportType:reportType,hasSubOrganization:view.hasSubOrganization,isRootOrg:view.isRootOrg};
		var $selectVSGs = $(smr.render("tmpl-ipandVSGPicker-tag-selectVSGs",renderOption));
		$tags.append($selectVSGs);
		$e.find(".ipandVSGPicker-header .smrTabs input[type='radio'][value='selectVSGs']").closest(".tab").show();
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
			var $selectIPs = $(smr.render("tmpl-ipandVSGPicker-tag-selectIPs",renderOption));
			$tags.append($selectIPs);
			$e.find(".ipandVSGPicker-header .smrTabs input[type='radio'][value='selectIPs']").closest(".tab").show();
		}
		
		//default show select mailing tag
		var setType = smr.getSetAndType(reportType,mailingSetName);
		if(setType.type == "VSG"){
			defaultTag = "selectVSGs";
		}
		view.launchOptions = {
				includeSubOrganizations:setType.set.attr("includeSubOrg")
		}
		
		showTag.call(view,defaultTag,view.launchOptions);
		registerViewEvent.call(view);
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
		
		if(option && option.includeSubOrganizations) $tag.find("input[name='includeSubOrganizations']").attr("checked",true);
		if(!option){
			$tag.find("input[name='includeSubOrganizations']").attr("checked",oincludeSubOrganizations);
			saveLimitData.call(view,$tag);
		}
		
		$e.find(".ipandVSGPicker-header .smrTabs input[type='radio'][value='"+tag+"']").attr("checked",true);

		if(tag == "selectVSGs"){
			showVSGTable.call(view);
			showSelectedTable.call(view,"vsgs");
			refreshLimitData.call(view,"selectVSGs");
		}else if(tag == "selectIPs"){
			showIPTable.call(view);
			showSelectedTable.call(view,"ips");
			refreshLimitData.call(view,"selectIPs");
		}		
	}
	

	function registerViewEvent(){
		var view = this;
		var $e = view.$el;
		var reportType = view.reportType;
		var mailingSetName = view.mailingSetName
		var $reportHeader = view.$relatedReport.find(".reportHeader");
		var $mailingView = $e.find(".ipandVSGPicker-mailingView");
		var $selectVSGsTag = $mailingView.find(".tag[data-tag='selectVSGs']");
		var $selectIPsTag = $mailingView.find(".tag[data-tag='selectIPs']");
		
		// extend the selected table
		$e.delegate(".ipandVSGPicker-selected .label","click",function(){
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
		
		$e.delegate(".ipandVSGPicker-header .smrTabs input[type='radio']","change",function(){
			var $input = $(this);
			var tag = $input.val();
			showTag.call(view,tag);
		});
		
		$e.delegate(".ipandVSGPicker-header .smrTabs span.tagspan","click",function(){
			var $prevInput = $(this).prev();
			if(!$prevInput.is(":checked"))$prevInput.change();
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
			var belforeLimitedDate = new Date(smr.serverDate- 179 * 24 * 60 * 60 * 1000);
			
			brite.display("dateSelect",null,{posX:posX,posY:posY,belforeLimitedDate:belforeLimitedDate}).done(function(component){
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
			if(tag == "selectVSGs"){
				showVSGTable.call(view,true);
			}else if(tag == "selectIPs"){
				showIPTable.call(view,true);
			}
		});
		
		$mailingView.delegate("input[name='includeSubOrganizations'][type='checkbox']","change",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			
			saveLimitData.call(view,$tag);
			var set = getSet.call(view,tag);
			set.clear();
			if(tag == "selectVSGs"){
				showVSGTable.call(view);
			}else if(tag == "selectIPs"){
				showIPTable.call(view);
			}
			
		});
		
		$mailingView.delegate(".keyCancel","click",function(){
			var $this = $(this);
			var $tag = $this.closest(".tag");
			var tag = $tag.attr("data-tag");
			$tag.find("input[name='name']").val("");
			setFilterName.call(view,$this.val());
			if(tag == "selectVSGs"){
				showVSGTable.call(view,true);
			}else if(tag == "selectIPs"){
				showIPTable.call(view,true);
			}
		});
		
		$mailingView.delegate(".ipandVSGPicker-table table .btnAction","change",function(){
			var $btn = $(this);
			var $tr = $btn.closest("tr");
			var id = $tr.attr("data-obj.id");
			var name = $tr.attr("data-obj.name");
			var obj = {id:id,name:name};
			var type = $tr.closest("table").attr("data-type");
			if($btn.attr("checked")){
				getSet.call(view,type).add(obj);
				$tr.addClass("checked");
			}else{
				var index = getSet.call(view,type).indexOf(obj);
				getSet.call(view,type).remove(index);
				$tr.removeClass("checked");
			}			
			var $table = $tr.closest("table");
			checkSelectALl($table);
			
			triggerReportHeaderVSGIPSelectorChange.call(view,type);
			// refresh the selectedTable
			showSelectedTable.call(view,type);
		});
		
		//add all event
		$mailingView.delegate(".ipandVSGPicker-table .btnBatchAction","change",function(){
			var $btn = $(this);
			var $tag = $btn.closest(".tag");
			var type = $btn.closest("table").attr("data-type");
			if($btn.attr("checked")){
				$tag.find(".ipandVSGPicker-table table tbody tr").each(function(){
					var $tr = $(this);
					var id = $tr.attr("data-obj.id");
					var name = $tr.attr("data-obj.name");
					var obj = {id:id,name:name};
					if(getSet.call(view,type).indexOf(obj) == -1){
						getSet.call(view,type).add(obj);
						var $btn = $tr.find(".btnAction");
						toggle$Button($btn);
					}
				});
			}else{
				getSet.call(view,type).clear();
				$tag.find(".ipandVSGPicker-table table .btnAction:checked").each(function(){
					var $btn = $(this);
					toggle$Button($btn);
				});
			}			
			
			triggerReportHeaderVSGIPSelectorChange.call(view,type);
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
				$ico.addClass("icoAsc").removeClass("icoDesc").html("&uarr;");
			}else{
				$th.attr("data-order","Desc")
				$ico.addClass("icoDesc").removeClass("icoAsc").html("&darr;");
			}
			var sortInfo = { name:columnName, order:order };
			
			var type = $table.attr("data-type");
			if(type == "vsgs"){
				view._vsgSortInfo = sortInfo;
				showVSGTable.call(view,true);
			}else if(type == "ips"){
				view._ipSortInfo = sortInfo;
				showIPTable.call(view,true);
			}
		});
		
	}
	
	
	function showVSGTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".ipandVSGPicker-mailingView");
		var $selectVSGsTag = $mailingView.find(".tag[data-tag='selectVSGs']");
		var $table = $selectVSGsTag.find(".ipandVSGPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._vsgSortInfo;
		var $availableMailings = $selectVSGsTag.find(".availableMailings");
		
		$tbody.empty();
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getVSGData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			var filterName = view._filterName||"";
			var availableCount = 0;
			for(var i=0; i<data.length;i++){
				var obj = data[i];
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
					if(obj.name=='<None>') continue;
					obj.isSelected = false;
					var vsgObject = {id:obj.name , name:obj.name };
					if(smr.getVSGSet(view.reportType,view.mailingSetName).indexOf(vsgObject) > -1){
						obj.isSelected = true;
					}
					if(obj.name && obj.name.length>30){
						obj.nameEllipses = obj.name.substring(0,27)+"..." ;
					}
					var $tr = smr.render("tmpl-ipandVSGPicker-vsg-table-tr",obj);
					$tbody.append($tr);
					availableCount++;
				}
			}
			$availableMailings.find(".count").html(availableCount);
			checkSelectALl($table);
			
			view._VSGTableData = data;
		});
	}
	
	function showIPTable(ifTempData){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".ipandVSGPicker-mailingView");
		var $selectProgramsTag = $mailingView.find(".tag[data-tag='selectIPs']");
		var $table = $selectProgramsTag.find(".ipandVSGPicker-table table");
		var $tbody = $table.find("tbody");
		var sortInfo = view._ipSortInfo;
		var $availableMailings = $selectProgramsTag.find(".availableMailings");
		
		$tbody.empty();
		if(!ifTempData){
			$table.find("th").attr("data-order","").find(".ico").remove();
		}
		view.getIPData(ifTempData).done(function(data){
			if(sortInfo){
				var name = sortInfo.name;
				var order = sortInfo.order;
				smr.newSort(data,name,order); 
			}
			for(var i=0; i<data.length;i++){
				var obj = data[i];
				if( obj.ip ){
					obj.isSelected = false;
					var ipobject = {id:obj.ip , name:obj.name};
					if(smr.getIPSet(view.reportType,view.mailingSetName).indexOf(ipobject) > -1){
						obj.isSelected = true;
					}
					var $tr = smr.render("tmpl-ipandVSGPicker-ip-table-tr",obj);
					$tbody.append($tr);
				}
			}
			$availableMailings.find(".count").html(data.length);
			checkSelectALl($table);
			view._IPTableData = data;
		});
	}	
	function showSelectedTable(type){
		var view = this;
		var $e = view.$el;
		var $mailingView = $e.find(".ipandVSGPicker-mailingView");
		var $tag,$selectedMailingTable;
		
		if(type=="vsgs"){
			$tag = $mailingView.find(".tag[data-tag='selectVSGs']");
		}else if(type == "ips"){
			$tag = $mailingView.find(".tag[data-tag='selectIPs']");
		}		
		$selectedMailingTable = $tag.find(".selectedMailingTable");
		
		var list = getSet.call(view,type).list();
		var selectedCount = list.length;
		
		//put the list and selectedMailingTable object to view, 
		//when click the "N xxx selected" to show the data list
		view.selectDataList = list;
		view.selectedMailingTable = $selectedMailingTable;
		
		//change the selected IP or VSG data list 
		//brite.display("dataList",{list:list,width:$selectedMailingTable.width()},{parent:$selectedMailingTable,emptyParent:true});
		
		var $selectedMailingLable = $tag.find(".ipandVSGPicker-selected .selectedMailingLable");		
		$selectedMailingLable.find(".count").text(selectedCount);
		if(selectedCount != 1 && selectedCount != 0){
			$selectedMailingLable.find(".needS").show();
		}else{
			$selectedMailingLable.find(".needS").hide();
		}
		
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
		
		if(view.hasSubOrganization){
			var includeSubOrganizations = typeof $tag.find("input[name='includeSubOrganizations']").attr("checked") == 'undefined' ? false : true;
			set.attr("includeSubOrg",includeSubOrganizations);
		}
				
		triggerReportHeaderVSGIPSelectorChange.call(view,tag);
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
	
	function triggerReportHeaderVSGIPSelectorChange(type){
		var view = this;
		var $e = view.$element;
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
	brite.registerView("ipandVSGPicker",{
		unique:true,
		parent:"body"
	},function(){
		return new smr.IPandVSGPicker();
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
