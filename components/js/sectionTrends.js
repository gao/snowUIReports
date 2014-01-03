var smr = smr || {};

(function($){
     
	// --------- Component Private Properties --------- //
	var _breakDownType;

	var colorVals = [
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(69,114,255,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(223,16,68,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(24,159,198,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(240,251,235,0)'],[1, 'rgba(108,201,39,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(128,105,155,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(219,132,61,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(146,168,205,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(164,125,124,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(181,202,146,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(115,11,155,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(250,79,155,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(25,87,234,1)']]},
	                 {linearGradient: ["0%", "0%", "0%", "100%"],stops: [[0, 'rgba(231,250,246,0)'],[1, 'rgba(125,187,234,1)']]}
	                 ];
	var lineColorVals = ["#4572FF","#DF1044","#189fc6","#6cc927","#80699B","#DB843D","#92A8CD","#A47D7C","#B5CA92","#730B9B","#FA4F9B","#1957EA"];
	var _showNamesBatch = [];
	var _showNamesTransactional = [];
	var _showNamesLifeCycle = [];
	var _showNamesDeliverability = [];
	var _showNamesAudience = [];

	_showNamesBatch = [{label:'Opens',name:'opens',inputName:'opens',isUnique:true,color:colorVals[2],lineColor:lineColorVals[2]},
		               {label:'Clicks',name:'clicks',inputName:'clicks',isUnique:true,color:colorVals[3],lineColor:lineColorVals[3]}];

	_showNamesTransactional = [{label:'Opens',name:'uniqueOpens',inputName:'opens',isUnique:true,color:colorVals[2],lineColor:lineColorVals[2]},
		                       {label:'Clicks',name:'uniqueClicks',inputName:'clicks',isUnique:true,color:colorVals[3],lineColor:lineColorVals[3]}];

	_showNamesLifeCycle = [{label:'Opens',name:'uniqueOpens',inputName:'opens',isUnique:true,color:colorVals[2],lineColor:lineColorVals[2]},
		     	           {label:'Clicks',name:'uniqueClicks',inputName:'clicks',isUnique:true,color:colorVals[3],lineColor:lineColorVals[3]}];
	
	_showNamesDeliverability = [{label:'Failure Count',name:'failed',inputName:'failureCount',color:colorVals[1],lineColor:lineColorVals[1]},
		     	           {label:'Failure Rate',name:'failed',inputName:'failureRate',isRate:true,color:colorVals[6],lineColor:lineColorVals[6]}];
	
	_showNamesAudience = [{label:'Change ',name:'change',inputName:'changeCount',color:colorVals[1],lineColor:lineColorVals[1]},
	 		     	      {label:'% Change',name:'percentageChange',inputName:'percentChange',isRate:true,color:colorVals[2],lineColor:lineColorVals[2]}];
	// --------- /Component Private Properties --------- //
	
	
	// --------- Component Interface Implementation ---------- //
	function SectionTrends(){}
	smr.SectionTrends = SectionTrends;
	
	SectionTrends.prototype.create = function(data,config){
		return smr.render("tmpl-sectionTrends",{});
	};
		
	SectionTrends.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		data = data || {};
		var viewName = "summary";

		view.reportType = data.reportType || smr.REPORT_TYPE.BATCH;
		view.isNewRequest = data.isNewRequest || false;
		//set day as the default value of breakDownBy
		_breakDownType = "day";
		
		view.showView(viewName);			
	};
	
	SectionTrends.prototype.events={
			
		"click; .viewBy .action" : function(event){
			var $this = $(event.currentTarget);
			$this.closest(".viewBy").find(".action").removeClass("selected");
			$this.addClass("selected");
		},
		
		"click; .viewBy.head .action":function(event){
			var view = this;
			var $this = $(event.currentTarget);
			var viewBy = $this.attr("data-view");
			_breakDownType = viewBy;
			showSummaryView.call(view,viewBy);
		}
	}
	
    // --------- /Component Interface Implementation ---------- //

	
    // --------- Component Public API --------- //
	SectionTrends.prototype.getAllData = function(viewBy){
		var view = this;
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		
		var dataType = "common";
		if(view.reportType == smr.REPORT_TYPE.DELIVERABILITY){
			dataType = "deliverabilityOverview";
		}else if(view.reportType == smr.REPORT_TYPE.AUDIENCE){
			typeVal = "audience";
		}
		
		smr.getSummary(view.reportType,dataType,viewBy,view.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items!=null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	};
	
	SectionTrends.prototype.showView = function(viewName){
		var view = this;
		var $e = view.$element;
		
		//clean first
		$e.bEmpty();
		var html = smr.render("tmpl-sectionTrendsSummary",{});
	
		$e.append($(html));
		showSummaryView.call(view,_breakDownType);

		return true;
	};
    // --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showSummaryView(by){
		var view = this;
		var $e = view.$el; 

		//clear container
		var $topChart = $e.find(".topChart");
		$topChart.empty();
		
		var reportType = view.reportType;
		var showNamesArray = [];
		if(reportType == smr.REPORT_TYPE.BATCH){
			showNamesArray = _showNamesBatch;
		}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			showNamesArray = _showNamesTransactional;
		}else if(reportType == smr.REPORT_TYPE.PROGRAM){
			showNamesArray = _showNamesLifeCycle;
		}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
			showNamesArray = _showNamesAudience;
		}else{
			showNamesArray = _showNamesDeliverability;
		}

		view.getAllData(by).done(function(data){
			for(var t=0;t<showNamesArray.length;t++){
				var sName = showNamesArray[t];
				showSummaryChartTopPartAllSelect.call(view,sName,(view.reportType==smr.REPORT_TYPE.AUDIENCE ? data :data.data));
			}
			
			//in audience report does not show the deiliver/failied chart
			if(reportType != smr.REPORT_TYPE.AUDIENCE){
				showSummaryChartButtomPart.call(view,by,data.data);
			}
			
			showSummarySeriesPart.call(view,by,(view.reportType==smr.REPORT_TYPE.AUDIENCE ? data :data.summary));
		});
	}
	
	function showSummaryChartTopPartAllSelect(showName,data){
		var view = this;
		var $e = view.$el;
		var $topChart = $e.find(".topChart");
		
		showSummaryChart.call(view,$topChart,showName,data);
	}
	
	function showSummaryChartTopPart(by,showName){
		var view = this;
		var $e = view.$el;
		var $topChart = $e.find(".topChart");
		
		view.getAllData(by).done(function(data){
			showSummaryChart.call(view,$topChart,showName,(view.reportType==smr.REPORT_TYPE.AUDIENCE ? data :data.data));
		});	
	}
	
	function showSummaryChartButtomPart(by,data){
		var view = this;
		var $e = view.$el;
		var $bottomChart = $e.find(".bottomChart");
		by = by || "day";

		//clear container
		$bottomChart.empty();
		
		var deliveredObj = {
			name: "Delivered",
			data: [],
			color: {
		        linearGradient: ["0%", "0%", "0%", "100%"],
		        stops: [
	                [0, '#C5EFFC'],
	                [1, '#1FA0C9']
	            ]
		    },
		    borderColor:"#0d9ac5"
		};
		
		var failedObj = {
			name: "Failed",
			data: [],
			color: {
		        linearGradient: ["0%", "0%", "0%", "100%"],
		        stops: [
	                [0, '#FF6965'],
	                [1, '#AA4643']
	            ]
		    },
		    borderColor:"#6E2D2B"
		};
		
		var categories = [];
		for (var i = 0; i < data.length; i++) {
			categories.push(data[i].date);
			deliveredObj.data.push(smr.checkNumber(data[i].delivered.count));
			failedObj.data.push(smr.checkNumber(data[i].failed.count));
		}
		
		//the buttom chart
		var secChart = new Highcharts.Chart({
			chart: {
				renderTo: $bottomChart.get(0),
				defaultSeriesType: 'column',
				height: 150,
				marginRight: 30,
				marginLeft: 70,
				backgroundColor: 'rgba(0,0,0,0)'
			},
			title: {
				text: "Delivered & Failed",
				align: 'left',
				margin:5,
				x:60,
				style : {
					color: '#303030',
					fontSize: '12px',
					fontWeight: 'bold',
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
				}
			},
			xAxis: {
				categories:categories,
				gridLineWidth:1,
				gridLineColor:'#cccccc',
				tickLength:0,
				title: {
					text: null
				},
				labels: {
					rotation: 325,
					step:Math.ceil(categories.length / 31),
					x: -1,
					y: 20,
					formatter:function() {
						var date = this.value;
						if(by == "day" || by == "week"){
							date = smr.formatDate(smr.parseDate(this.value),"MM-dd")
						}
						return date;
					}
				}
			},
			yAxis: {
				lineWidth: 1,
				gridLineWidth:1,
				gridLineColor:'#e6e6e6',
				title: {
					text: null
				},
				labels:{
					formatter:function() {
						return smr.formatNumber(this.value,"short");
					}
				},
				min:0
			},
			credits: {
				enabled: false
			},
			tooltip: {
		        formatter: function() {
		            return '<span>' + this.x + '</span><br/>' + '<span">' + this.series.name + ': <b>' + Highcharts.numberFormat(this.y, 0) + '</b></span>';
		        }
		    },
			plotOptions: {
				column: {stacking: 'normal'}
			},
			legend: {
				enabled: false
			},
			series: [failedObj,deliveredObj]
		});
	}
	
	function showSummarySeriesPart(by,data){
		var view = this;
		var $e = view.$el;
		var $rightContent = $e.find(".sectionTrendsSummary-content-right .trendMetricsBox-content");
		
		//clear container
		$rightContent.empty();
		
		var reportType = view.reportType;
		var showNames = [];
		if(reportType == smr.REPORT_TYPE.BATCH){
			showNames = _showNamesBatch;
		}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			showNames = _showNamesTransactional;
		}else if(reportType == smr.REPORT_TYPE.PROGRAM){
			showNames = _showNamesLifeCycle ;
		}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
			showNames = _showNamesAudience;
		}else{
			showNames = _showNamesDeliverability;
		}

		var rowNames = [];
		if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
			rowNames = [
		   				{label:'Sent',name:'sent',inputName:"sent"},
		   				{label:'Failed',name:'failed',inputName:"failed"},
		   				{label:'Opens',name:'uniqueOpens',inputName:"opens",isUnique:true},
		   				{label:'Clicks',name:'uniqueClicks',inputName:"clicks",isUnique:true},
		   				{label:'Complaints',name:'uniqueComplaints',isUnique:true,inputName:"complaints"},
		   				{label:'Deliverability',name:'delivered',isRate:true,inputName:"delivered"},
		   				{label:'Open Rate',name:'uniqueOpens',isUnique:true,isRate:true,inputName:"opensRate"},
		   				{label:'Click Rate',name:'uniqueClicks',isUnique:true,isRate:true,inputName:"clicksRate"},
		   				{label:'Click-To-Open',name:'clickToOpen',isUnique:true,isRate:true,inputName:"clickToOpen"}
		   		];
		}else if(reportType == smr.REPORT_TYPE.PROGRAM){
			rowNames = [
		   				{label:'Sent',name:'sent',inputName:"sent"},
		   				{label:'Failed',name:'failed',inputName:"failed"},
		   				{label:'Opens',name:'uniqueOpens',inputName:"opens",isUnique:true},
		   				{label:'Clicks',name:'uniqueClicks',inputName:"clicks",isUnique:true},
		   				{label:'Unsubs',name:'uniqueUnsubs',isUnique:true,inputName:"unsubs"},
		   				{label:'Complaints',name:'uniqueComplaints',isUnique:true,inputName:"complaints"},
		   				{label:'Deliverability',name:'delivered',isRate:true,inputName:"delivered"},
		   				{label:'Open Rate',name:'uniqueOpens',isUnique:true,isRate:true,inputName:"opensRate"},
		   				{label:'Click Rate',name:'uniqueClicks',isUnique:true,isRate:true,inputName:"clicksRate"},
		   				{label:'Click-To-Open',name:'clickToOpen',isUnique:true,isRate:true,inputName:"clickToOpen"}
		   		];
		}else if(reportType == smr.REPORT_TYPE.BATCH){
			rowNames = [
	   				{label:'Sent',name:'sent',inputName:"sent"},
	   				{label:'Failed',name:'failed',inputName:"failed"},
	   				{label:'Opens',name:'opens',inputName:"opens",isUnique:true},
	   				{label:'Clicks',name:'clicks',inputName:"clicks",isUnique:true},
	   				{label:'Unsubs',name:'unsub',isUnique:true,inputName:"unsub"},
	   				{label:'Complaints',name:'complaints',inputName:"complaints",isUnique:true},
	   				{label:'Deliverability',name:'delivered',isRate:true,inputName:"delivered"},
	   				{label:'Open Rate',name:'opens',isUnique:true,isRate:true,inputName:"opensRate"},
	   				{label:'Click Rate',name:'clicks',isUnique:true,isRate:true,inputName:"clicksRate"},
	   				{label:'Click-To-Open',name:'clickToOpen',isUnique:true,isRate:true,inputName:"clickToOpen"}	
	   		];
		}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
	        var set = smr.getSetAndType(view.reportType,"main").set;
	        var list = set.list();
			var dataSourceType = list[0].dataSourceType;
			rowNames = [
		   				{label:'Total Size',name:'total',inputName:"total"},
		   				{label:'Change',name:'change',inputName:"changeCount"},
		   				{label:'% Change',name:'percentageChange',inputName:"percentChange",isRate:true}	
		   		];
			if(dataSourceType!="eds"){
				rowNames.push({label:'Active Size',name:'active',inputName:"active"});
				rowNames.push({label:'Lapsed Size',name:'lapsed',inputName:"lapsed"});
				rowNames.push({label:'Inactive Size',name:'inactive',inputName:"inactive"});
			}
		}else{
			//right now do not show Defer {label:'Defer Count',name:'defers',inputName:"defers"},
			rowNames = [
		   				{label:'Sent',name:'sent',inputName:"sent"},
		   				{label:'Failure Count',name:'failed',inputName:"failureCount"},
		   				{label:'Block',labelChart:'Block Count',name:'block',inputName:"blockCount",isLeftIndent:true},
		   				{label:'Hard Bounce',labelChart:'Hard Bounce Count',name:'hardBounce',inputName:"hardBounceCount",isLeftIndent:true},
		   				{label:'Soft Bounce',labelChart:'Soft Bounce Count',name:'softBounce',inputName:"softBounceCount",isLeftIndent:true},
		   				{label:'Technical',labelChart:'Technical Count',name:'technical',inputName:"technicalCount",isLeftIndent:true},
		   				{label:'Failure Rate',name:'failed',inputName:"failureRate",isRate:true},
		   				{label:'Block',labelChart:'Block Rate',name:'block',inputName:"blockRate",isRate:true,isLeftIndent:true},
		   				{label:'Hard Bounce',labelChart:'Hard Bounce Rate',name:'hardBounce',inputName:"hardBounceRate",isRate:true,isLeftIndent:true},
		   				{label:'Soft Bounce',labelChart:'Soft Bounce Rate',name:'softBounce',inputName:"softBounceRate",isRate:true,isLeftIndent:true},
		   				{label:'Technical',labelChart:'Technical Rate', name:'technical',inputName:"technicalRate",isRate:true,isLeftIndent:true}
		   		];
		}
		
		//only when conversionEnabled=true,should show Conversions and Revenue
		if(smr.conversionEnabled && reportType != smr.REPORT_TYPE.DELIVERABILITY && reportType != smr.REPORT_TYPE.AUDIENCE){
			rowNames.push({label:'Revenue',name:'revenue',inputName:"revenue"});
			rowNames.push({label:'Conversion Rate',name:'conversions',isRate:true,inputName:"conversions"});
		}

		var tempContent = "";
		for(var i=0; i<rowNames.length; i++){
			var rowNameVal = rowNames[i];
			
			var summaryObj = {
					label:rowNameVal.label,
					labelChart:rowNameVal.labelChart,
					name:rowNameVal.name,
					inputName:rowNameVal.inputName,
					isRate:rowNameVal.isRate,
					isUnique:rowNameVal.isUnique,
					isLeftIndent:rowNameVal.isLeftIndent
			};
			
			if(reportType == smr.REPORT_TYPE.AUDIENCE){
				if(rowNameVal.name == "change"){
					summaryObj.value = smr.formatNumber(data.totalData?data.totalData.totalSizeChange:0);
				}else if(rowNameVal.name == "total"){
					summaryObj.value = smr.formatNumber(data.totalData?data.totalData.totalSize:0);
				}else if(rowNameVal.name == "percentageChange"){
					summaryObj.value = smr.checkNumber(data.totalData?data.totalData.totalPercentageChange:0) + "%";
				}else{
					if(data.engagementData){
						summaryObj.value = smr.formatNumber(data.engagementData[rowNameVal.name]);
					}else{
						summaryObj.value=0;
					}
				}
			}else{
				if(rowNameVal.name == "revenue"){
					var obj = data['conversions'];
				}else{
					var obj = data[rowNameVal.name];
				}
				
				if(rowNameVal.isRate){
					if(rowNameVal.isUnique){
						if(reportType == smr.REPORT_TYPE.BATCH){
							summaryObj.value = smr.checkNumber(obj.uniqueRate) + "%";
						}else{
							if(rowNameVal.name == "clickToOpen"){
								summaryObj.value = smr.checkNumber(obj.uniqueRate) + "%";
							}else{
								summaryObj.value = smr.checkNumber(obj.rate) + "%";
							}
						}
					}else{
						summaryObj.value = smr.checkNumber(obj.rate) + "%";
					}
				}else{
					if(rowNameVal.name == "revenue"){
						summaryObj.value = smr.conversionCurrency + smr.formatNumber(obj.revenue);
					}else{
						if(rowNameVal.isUnique){
							if(reportType == smr.REPORT_TYPE.BATCH){
								summaryObj.value = smr.formatNumber(obj.unique);
							}else{
								summaryObj.value = smr.formatNumber(obj.count);
							}
						}else{
							summaryObj.value = smr.formatNumber(obj.count);
						}
					}
				}
			}
			
			summaryObj.isChecked = false;
			for(var k=0;k<showNames.length;k++){
				var showName = showNames[k];
				if(rowNameVal.inputName == showName.inputName){
					summaryObj.isChecked = true;
				}
			}
			
			var $row = smr.render("tmpl-sectionTrendsSummary-item",summaryObj);
			
			tempContent = tempContent + $row;
		}
		
		$rightContent.append(tempContent);
		
		//after the show SeriesPart we bind the click 
		$e.find(".trends-item-data :checkbox").click(function(){
			var $this = $(this);
			var isHave = false;
			var nameIndex = 0;
			var iName = $this.attr("name");
			
			var showNamesVal = [];
			if(reportType == smr.REPORT_TYPE.BATCH){
				showNamesVal = _showNamesBatch;
			}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				showNamesVal = _showNamesTransactional;
			}else if(reportType == smr.REPORT_TYPE.PROGRAM){
				showNamesVal = _showNamesLifeCycle ;
			}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
				showNamesVal = _showNamesAudience;
			}else{
				showNamesVal = _showNamesDeliverability;
			}

			for(var t=0;t<showNamesVal.length;t++){
				var sName = showNamesVal[t].inputName;
				if(iName == sName){
					isHave = true;
					nameIndex = t;
				}
			}

			if(isHave){
				$e.find(".topChart").find("."+iName).remove();

				if(reportType == smr.REPORT_TYPE.BATCH){
					_showNamesBatch.splice(nameIndex,1);
				}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
					_showNamesTransactional.splice(nameIndex,1);
				}else if(reportType == smr.REPORT_TYPE.PROGRAM){
					_showNamesLifeCycle.splice(nameIndex,1);
				}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
					_showNamesAudience.splice(nameIndex,1);
				}else{
					_showNamesDeliverability.splice(nameIndex,1);
				}
			}else{
				var showData ={
						inputName:iName,
						name:$this.attr("value"),
						label:$this.closest(".trends-item-data").find(".itemLabel").html(),
						labelChart: $this.closest(".trends-item-data").attr("data-labelChart"),
						isRate:$this.closest(".trends-item-data").attr("data-isRate"),
						isUnique:$this.closest(".trends-item-data").attr("data-isUnique")
				}
				
				var checkedName = [];
				$e.find(".trends-item-data :checkbox:checked").each(function(){
					checkedName.push($(this).attr("name"));
				});
				
				var indexVal = 0;
				for(var n=0;n<checkedName.length;n++){
					if(checkedName[n] == iName){
						indexVal = n;
					}
				}
				
				var colorIndex = 0;
				$e.find(".trends-item-data :checkbox").each(function(index){
					var $this = $(this);
					if(iName == $this.attr("name")){
						colorIndex = index;
					}
				});
				showData.color = colorVals[colorIndex];
				showData.lineColor = lineColorVals[colorIndex];

				if(reportType == smr.REPORT_TYPE.BATCH){
					_showNamesBatch.splice(indexVal,0,showData);
				}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
					_showNamesTransactional.splice(indexVal,0,showData);
				}else if(reportType == smr.REPORT_TYPE.PROGRAM){
					_showNamesLifeCycle.splice(indexVal,0,showData);
				}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
					_showNamesAudience.splice(indexVal,0,showData);
				}else{
					_showNamesDeliverability.splice(indexVal,0,showData);
				}
				
				showSummaryChartTopPart.call(view,by,showData);
			}
		});
	}
	
	function showSummaryChart($topChart,showName,data){
		var view = this;
		var reportType = view.reportType;
		if($topChart.find(".checkChart").size() == 0){
			$topChart.append("<div class='checkChart "+showName.inputName+"'></div>");
		}else{
			var indexNum = 0;
			var showNames = [];
			if(reportType == smr.REPORT_TYPE.BATCH){
				showNames = _showNamesBatch;
			}else if(reportType == smr.REPORT_TYPE.TRANSACTIONAL){
				showNames = _showNamesTransactional;
			}else if(reportType == smr.REPORT_TYPE.PROGRAM){
				showNames = _showNamesLifeCycle ;
			}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
				showNames = _showNamesAudience;
			}else{
				showNames = _showNamesDeliverability;
			}
			for(var t=0;t<showNames.length;t++){
				if(showNames[t].inputName == showName.inputName){
					indexNum = t-1;
				}
			}
			
			if(indexNum >= 0){
				$("<div class='checkChart "+showName.inputName+"'></div>").insertAfter($topChart.find("."+showNames[indexNum].inputName));
			}else{
				$topChart.prepend("<div class='checkChart "+showName.inputName+"'></div>");
			}	
		}
		
		//init series
		var typeObj = {
			name: showName.label,
			data: [],
			color: showName.color,
			minVal:0,
			showNegativeValue:false
		};
		
		var categories = [];
		//this part is for audience report 
		if(reportType == smr.REPORT_TYPE.AUDIENCE){
			if(showName.name=="change" || showName.name=="percentageChange" || showName.name=="total"){
				data = data.totalData?data.totalData.data:null;
			}else{
				data = data.engagementData?data.engagementData.data:null;
			}
			if(data==null) return;
			if(showName.isRate){
				for (var i = 0; i < data.length; i++) {
					var dataValue = data[i];
					categories.push(dataValue.date);
					typeObj.data.push(smr.checkNumber(dataValue[showName.name]));
				}
				var minValue = 0;
				var min = Math.min.apply(Math,typeObj.data);
				if(min > 5){
					if(min > 90){
						minValue = 90;
					}else{
						minValue =  min - 5;
					}
				}
				if(showName.name=="percentageChange"){
					typeObj.showNegativeValue = true;
					typeObj.minVal = min;
				}
			}else{
				for (var i = 0; i < data.length; i++) {
					var dataValue = data[i];
					categories.push(dataValue.date);
					typeObj.data.push(smr.checkNumber(dataValue[showName.name]));	
				}
				var min = Math.min.apply(Math,typeObj.data);
				if(showName.name=="change"){
					typeObj.showNegativeValue = true;
					typeObj.minVal = min;
				}
			}
		}else{
			if(showName.isRate){
				for (var i = 0; i < data.length; i++) {
					var dataValue = data[i];
					categories.push(dataValue.date);
					if(showName.isUnique){
						if(reportType == smr.REPORT_TYPE.BATCH){
							typeObj.data.push(smr.checkNumber(dataValue[showName.name].uniqueRate));
						}else{
							if(showName.name == "clickToOpen"){
								typeObj.data.push(smr.checkNumber(dataValue[showName.name].uniqueRate));
							}else{
								typeObj.data.push(smr.checkNumber(dataValue[showName.name].rate));
							}
						}
					}else{
						typeObj.data.push(smr.checkNumber(dataValue[showName.name].rate));
					}
				}
				var minValue = 0;
				var min = Math.min.apply(Math,typeObj.data);
				if(min > 5){
					if(min > 90){
						minValue = 90;
					}else{
						minValue =  min - 5;
					}
				}
				typeObj.minVal = minValue;
				//only deliverability graph should be capped at 100%
				if(showName.name == "delivered"){
					typeObj.maxVal = Math.max.apply(Math,typeObj.data);
				}
			}else{
				for (var i = 0; i < data.length; i++) {
					var dataValue = data[i];
					categories.push(dataValue.date);
					
					if(showName.name == "revenue"){
						typeObj.data.push(smr.checkNumber(dataValue['conversions'].revenue));	
					}else{
						if(showName.isUnique){
							if(reportType == smr.REPORT_TYPE.BATCH){
								typeObj.data.push(smr.checkNumber(dataValue[showName.name].unique));
							}else{
								typeObj.data.push(smr.checkNumber(dataValue[showName.name].count));
							}
						}else{
							typeObj.data.push(smr.checkNumber(dataValue[showName.name].count));
						}
					}	
				}
			}
		}
		
		//the chart
		var topChart = new Highcharts.Chart({
			chart: {
				renderTo: $topChart.find("."+showName.inputName).get(0),
				defaultSeriesType: 'area',
				height: view.reportType==smr.REPORT_TYPE.AUDIENCE ? 200 :150,
				marginLeft: 70,
				marginRight: 30,
				spacingTop:0,
				spacingBottom:6,
				backgroundColor: 'rgba(0,0,0,0)'
			},
			title: {
				text: showName.labelChart ? showName.labelChart : showName.label,
				align: 'left',
				x:60,
				margin:5,
				style : {
					color: '#303030',
					fontSize: '12px',
					fontWeight: 'bold',
					fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
				}
			},
			xAxis: {
				categories:categories,
				gridLineWidth:1,
				gridLineColor:'#cccccc',
				tickWidth: 0,
				title: {
					text: null
				},
				labels: {
					enabled: view.reportType==smr.REPORT_TYPE.AUDIENCE ? true : false,
					rotation: 325,
					x: -1,
					y: 28
				}
			},
			yAxis: {
				lineWidth: 1,
				gridLineWidth:1,
				gridLineColor:'#e6e6e6',
				title: {
					text: null
				},
				labels:{
					formatter:function() {
						var showVal = smr.formatNumber(this.value,"short");
						var showPct = showName.isRate;
						if(showPct){
							showVal = showVal + "%";
						}
						return showVal;
					}
				},
				max: ((showName.isRate && typeObj.maxVal >= 95) ? 100 : null),
				min: typeObj.showNegativeValue ? typeObj.minVal : ( showName.isRate ? typeObj.minVal : 0)
			},
			credits: {
				enabled: false
			},
			tooltip: {
		        formatter: function() {
				var labelVal = showName.labelChart ? showName.labelChart : showName.label;
					var yVal = this.y;
					if(showName.isRate){
						var val = (yVal >= 10) ? Highcharts.numberFormat(yVal, 1) : Highcharts.numberFormat(yVal, 2);
						yVal = val + "%";
					}
		            return '<span>' + this.x + '</span><br/>' + '<span>' + labelVal + ': <b>' + smr.formatNumber(yVal) + '</b></span>';
		        },
		        borderColor: showName.lineColor
		    },
			plotOptions: {
				area:{
					fillColor: showName.color,
					lineColor: showName.lineColor,
					marker: {
		               enabled: true,
		               fillColor: showName.lineColor,
		               lineColor: '#FFFFFF',
		               lineWidth: 2
		            }
				}
			},
			legend: {
				enabled: false
			},
			series: [typeObj]
		});
	}
    // --------- /Component Private Methods --------- //

    // --------- Component Registration --------- //
    brite.registerView("sectionTrends", {
        emptyParent : true
    }, function () {
        return new smr.SectionTrends();
    });
    // --------- Component Registration --------- //

})(jQuery);
