var smr = smr || {};

(function($){
	
	var _sortBy = {
					                  "day":[{"sortBy":"Date","sortType":"Date"}],
					                 "week":[{"sortBy":"Date","sortType":"Date"}],
					                "month":[{"sortBy":"Date","sortType":"Date"}],
					              "quarter":[{"sortBy":"Date","sortType":"Date"}],
					                 "year":[{"sortBy":"Date","sortType":"Date"}],
					              "mailing":[{"sortBy":"Name","sortType":"Alpha-numeric"},{"sortBy":"Launch Date","sortType":"Date"}],
					             "campaign":[{"sortBy":"Name","sortType":"Alpha-numeric"}],
					             	  "tag":[{"sortBy":"Value","sortType":"Alpha-numeric"}],
					               "domain":[{"sortBy":"Domain","sortType":"Alpha-numeric"}],
					               "target":[{"sortBy":"Name","sortType":"Alpha-numeric"}],
					               "region":[{"sortBy":"Name","sortType":"Alpha-numeric"}],
					      "region-metadata":[{"sortBy":"Value","sortType":"Alpha-numeric"}],
					      		  "segment":[{"sortBy":"Segments","sortType":"Alpha-numeric"}]
				  };
	var _closeCallBack;
	// --------- Component Registration --------- //
	brite.registerView("pivotOption",{
		emptyParent:false,
		parent:"body"
	},{
		create : function(data,config){
			var data      = data || {};
			var pivotBy   = data.pivotBy   || "mailing";
			var readonly  = (_sortBy[pivotBy] && _sortBy[pivotBy].length>1) ? false :true;
			var fetchVal = smr.fetchSingleMetricOrigin;
			if(pivotBy == 0){
				fetchVal = smr.fetchSingleMetric;
			}
			var fetchAllMetrics  = fetchVal ? false :true;
			return smr.render("tmpl-pivotOption",{left:132,top:2,sortByOptions:_sortBy[pivotBy],readonly:readonly,fetchAllMetrics:fetchAllMetrics});
		},
			
		postDisplay : function(data,config){
			var view = this;
			var $e = view.$el;
			var pivotBy   = data.pivotBy;
			view.pivotBy = pivotBy;
			view.section = data.section;
			view.columnList = data.list || [];
			view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
			view.$pivotOptionMain = $e.find(".pivotOption-main");
			view.$pivotOptionHead = $e.find(".pivotOption-header");
			view.$pivotOptionContent = $e.find(".pivotOption-content");
			view.$pivotOptionItems = $e.find(".pivotOption-items");
			view.$pivotOptionHead.css("left",(view.$pivotOptionContent.width()-view.$pivotOptionHead.width())/2);
			
			// Fetch All Metrics checkbox only show when pivotBy==0
			if(pivotBy != 0){
				$e.find(".pivotOption-onlyShow").show();
				var $fetchAllMetrics = $e.find(".pivotOption-select-allMetric");
				$fetchAllMetrics.removeClass("onlyThis");
				$fetchAllMetrics.hide();
			}else{
				$e.find(".pivotOption-onlyShow").hide();
				var $fetchAllMetrics = $e.find(".pivotOption-select-allMetric");
				$fetchAllMetrics.show();
				$fetchAllMetrics.addClass("onlyThis");
			}
			
			view.show();
		},
		
		events : {
			"click; .pivotOption-select-all input" : function(event){
				var view = this;
				var checked = $(event.currentTarget).attr("checked") ? true :false;
				if(checked){
					view.$pivotOptionItems.find("input").attr("checked","checked");
				}else{
					view.$pivotOptionItems.find("input").removeAttr("checked");
				}
			},
			
			"click; .pivotOption-items input" : function(event){
				var view = this;
				var checkedNum = view.$pivotOptionItems.find("input:checked").size();
				var inputNum = view.$pivotOptionItems.find("input").size();
				if(checkedNum==inputNum){
					view.$el.find(".pivotOption-select-all input").attr("checked","checked");
				}else{
					view.$el.find(".pivotOption-select-all input").removeAttr("checked");
				}
			},
			
			"click; .pivotOption-header" : function(){
				this.close();
			},
			
			"click; .pivotOption-content .done" : function(){
				this.close();
			},
			
			"click; .pivotOption-content .cancel" : function(){
				this.$el.bRemove();
			}
		},
		
		
		close : function(){
			var view = this;
			var $e = view.$el;
			var pivotOption = view.getPivotOptions();
			smr.getSetAndType(view.reportType).set.attr("pivotOption",pivotOption);
			//if fetchAllMetrics checkbox changed,need to do a new request call
			if(pivotOption.isChangeFetch){
				smr.needReloadPivotTable = false;
				var fetchVal = smr.fetchSingleMetricOrigin;
				if(view.pivotBy == 0){
					fetchVal = smr.fetchSingleMetric;
				}
				$e.closest(".report").trigger("FETCH_ALLMETRICS_CHANGE",{fetchVal:fetchVal});
			}else{
				_closeCallback();
				view.$el.bRemove();
			}
		},
		
		onClose: function(closeCallback){
			_closeCallback = closeCallback;
		},
		
		show : function(){
			var view = this;
			var $e = view.$el;
			var pivotOption = smr.getSetAndType(view.reportType).set.attr("pivotOption");
			var isCheckedAll = pivotOption.columns[view.section].length==0 ? true:false;
			var shouldCheckedAll = true;
			view.$pivotOptionItems.empty();
			$.each(view.columnList,function(i,item){
				if(isCheckedAll || brite.array.getIndex(pivotOption.columns[view.section],"label",item.label)>-1){
					item.checked=true;
				}else{
					item.checked=false;
					shouldCheckedAll = false;
				}
				
				//add the ellipsis when the label too long
				item.ellipsis = false;
				var value = item.label;
				if(value && value.length > 40){
					item.ellipsis = true;
					item.labelName = value.substring(0,37)+"...";
				}else{
					item.labelName = value;
				}
				view.$pivotOptionItems.append(smr.render("tmpl-pivotOption-item",item));
			});
			if(shouldCheckedAll){
				$e.find(".pivotOption-select-all input").attr("checked","checked");
			}else{
				$e.find(".pivotOption-select-all input").removeAttr("checked");
			}
			$e.find(".pivotOption-algin input[value='"+pivotOption.sortOrder+"']").attr("checked","checked");
			$e.find(".pivotOption-sort select").val(pivotOption.sortBy);
			var $options = $e.find(".pivotOption-sort select option");
			if($e.find(".pivotOption-sort select option").size()==1){
				$options.eq(0).attr("selected","selected");
			}
		},
		
		getPivotOptions: function(){
			var view = this;
			var $e = view.$el;
			var pivotOption = smr.getSetAndType(view.reportType).set.attr("pivotOption");
			pivotOption.sortOrder =  $e.find(".pivotOption-algin input:checked").val();
			
			var fetchAllMetrics = $e.find(".pivotOption-select-allMetric input:checked").val();
			pivotOption.fetchAllMetrics =  fetchAllMetrics == "on" ? true : false;
			
			var sortByVal = $e.find(".pivotOption-sort select").val();
			pivotOption.sortBy = sortByVal ? sortByVal : "Name";
			
			pivotOption.columns[view.section] =[];
			
			//check whether change the fetchAllMetrics checkbox
			if(pivotOption.fetchAllMetrics == smr.fetchSingleMetric){
				pivotOption.isChangeFetch = true;
			}else{
				pivotOption.isChangeFetch = false;
			}
			
			smr.fetchSingleMetric = pivotOption.fetchAllMetrics ? false : true;
			
			$e.find(".pivotOption-items input:checked").each(function(){
				pivotOption.columns[view.section].push({"label":this.value});
			});
			
			return pivotOption;
		}
	});
	// --------- /Component Registration --------- //
	
})(jQuery);
