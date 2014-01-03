var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _viewBy = "week";
	var _showName = "openRate";
	// --------- /Component Private Properties --------- //

	// --------- Component Interface Implementation ---------- //
	function SectionCampaignOverview(){};
	smr.SectionCampaignOverview = SectionCampaignOverview; 
	
	SectionCampaignOverview.prototype.create = function(data,config){
		return smr.render("tmpl-sectionCampaignOverview",{});
	}
		
	SectionCampaignOverview.prototype.postDisplay = function(data,config){
		var view = this;
		var $e = view.$el;
		view.isNewRequest = data.isNewRequest || false;
		
		var dateRange = smr.getSetAndType("campaignOverview","main").set.period().getDateRange();
		if(dateRange.startDate){
			view.startDate = dateRange.startDate;
		}
		if(dateRange.endDate){
			view.endDate = dateRange.endDate;
		}
		
		$e.find(".sectionCampaignOverview-bottom-table table").append(smr.render("tmpl-sectionCampaignOverview-table-head",{enabled:smr.conversionEnabled}))
		showView.call(view,_viewBy,_showName);
			
		//show combobox
		var $graphTypeCombobox = $e.find(".graphTypeList");
		var list=[
			{name:"Sent",value:"sent"},
			{name:"Deliverability %",value:"deliverabilityRate"},
			{name:"Open %",value:"openRate"},
			{name:"Click %",value:"clickRate"},
			{name:"Unsub %",value:"unsubRate"}
		];
        if(smr.conversionEnabled){
            list.push({name:"Revenue",value:"revenue"});
            list.push({name:"Conversion %",value:"conversionRate"});
        }
		var defaultValue = "openRate";
		brite.display("combobox",$graphTypeCombobox,{list:list,defaultValue:defaultValue});

	}
	
	SectionCampaignOverview.prototype.events = {
			
			"click; .viewBy .action" :function(event){
				var $this = $(event.currentTarget);
				$this.closest(".viewBy").find(".action").removeClass("selected");
				$this.addClass("selected");
			},
			
			"click; .viewBy.head .action": function(event){
				var view = this;
				var $this = $(event.currentTarget);
				_viewBy = $this.attr("data-view");
				showView.call(view,_viewBy,_showName);
			},
			
			"click; .graphTypeList .combobox .item" : function(event){
				var view = this;
				var $this = $(event.currentTarget);
				var val = $this.closest(".graphTypeList .combobox").attr("data-value");
				showView.call(view,_viewBy,val);
			},

	        //add context menu handler
	        "click; .sectionCampaignOverview-bottom-table span.metric":function(event){
				var view = this;
				var $e = view.$el;
	            function showMenu(cid) {
	                $e.find(".menuContainer").hide();
	                $e.find(".menuContainer").empty();
	                
	                var startDate="",endDate="";
					var dateRange = smr.getSetAndType("campaignOverview","main").set.period().getDateRange();
					if(dateRange.startDate){
						startDate = smr.formatDate(dateRange.startDate);
					}
					if(dateRange.endDate){
						endDate = smr.formatDate(dateRange.endDate);
					}
	                var dataObj = {
	                		id : cid,
	                		startDate : startDate,
	                		endDate : endDate
	                };
	                var html = smr.render("tmpl-sectionCampaignOverview-context-menu",{dataObj:dataObj, isMock:smr.isMock(), isProgramLicensed:smr.isProgramLicensed});
	                $container = $e.find(".menuContainer");
	                $container.append(html);
	                var offset = $e.closest(".smr.report").offset() ;
	                var IE7offsetX = 0;
	                if(smr.isIE && document.documentMode == 7) IE7offsetX = 40;
	                $container.css({left:(event.clientX - offset.left)-IE7offsetX , top:event.clientY-offset.top-50});
	                $container.show(100);
	                var menuEnable = true;
	                $container.find(".contextMenu").mouseleave(function(){
	                    if (menuEnable) {
	                        $e.find(".menuContainer").empty();
	                        $container.hide();
	                        menuEnable = false;
	                    }
	                    return false;
	                });

	                $e.click(function () {
	                    if (menuEnable) {
	                        $e.find(".menuContainer").empty();
	                        $container.hide();
	                        menuEnable = false;
	                    }
	                });
	            }

	            var $this = $(event.currentTarget);
	            var cid = $this.attr("data-cid");

	            showMenu(cid);
	            return false;
	        }
	}
	
	// --------- /Component Interface Implementation ---------- //
	
	
	// --------- Component Public API --------- //
	SectionCampaignOverview.prototype.getAllData = function(viewBy){
		var dfd = $.Deferred();
		var $reportDataLoading = this.$el.closest(".report").find(".report-data-loading");
		$reportDataLoading.show();
		smr.getSummary("campaignOverview","campaignOverview",viewBy,this.isNewRequest).done(function(data){
			var dataSet = {};
			if(data.items != null){
				dataSet = data.items[0];
			}
			$reportDataLoading.hide();
			dfd.resolve(dataSet);
		});
		return dfd.promise();
	}
	// --------- /Component Public API --------- //
	
	
	// --------- Component Private Methods --------- //
	function showView(by,graphName){
		var view = this;
		var $e = view.$el; 
		_showName = graphName || _showName;
		
		view.getAllData(by).done(function(dataAll){
			showTopPartChart.call(view,by,_showName,dataAll.campaignOverviewGraphEntryList);	
			showButtomPartTable.call(view,by,_showName,dataAll.campaignOverviewBeanList);
			var campaignSet = smr.getSetAndType("campaignOverview","main").set;
			campaignSet.clear();
			if(dataAll.campaignOverviewGraphEntryList!=null && dataAll.campaignOverviewGraphEntryList.length>0){
				for(var i =0; i< dataAll.campaignOverviewGraphEntryList.length; i++){
					var object = dataAll.campaignOverviewGraphEntryList[i];
					campaignSet.add({id:object.campaignId,name:object.campaignName});
				}
				$e.closest(".report").find(".reportHeader").trigger("reportHeaderMailingSelectorChange",{mailingSetName:"main"});
			}
		});
	}
	
	function showTopPartChart(by,showName,graphData){
		var view = this;
		var $e = view.$el;
		var $chart = $e.find(".sectionCampaignOverview-chart");
		by = by || "week";
		
		if(typeof graphData == "undefined" || graphData == null || graphData.length == 0){
			$chart.html("");
			$chart.append("<div class='noData'>No Data!</div>");
		}else{
			$chart.empty();
			$chart.append("<div class='campaignOVChart'></div>");

			var dataStore = {};
			
			var categories = [];
	        smr.newSort(graphData, "date", true);
	        var preDate = null;
	        var isMaxVal = false;

			for (var i = 0; i < graphData.length; i++) {
				var dataObj = graphData[i];
	            if(dataObj.date != preDate){
				   categories.push(dataObj.date);
	                preDate = dataObj.date;
	            }
	            var obj = dataStore[dataObj.campaignName] = dataStore[dataObj.campaignName] || {name:dataObj.campaignName,data:[]};

				//obj.name = dataObj.campaignName;
	            while(obj.data.length < categories.length-1){
	               obj.data.push(0);
	            }
				if(showName == "sent"){
					obj.data.push(dataObj.totalSent);
				}else if(showName == "deliverabilityRate"){
					if(!isMaxVal && dataObj.deliveryRate >= 95){
						isMaxVal = true;
					}
					obj.data.push(dataObj.deliveryRate);
				}else if(showName == "openRate"){
					obj.data.push(dataObj.uniqueOpenRate);
				}else if(showName == "clickRate"){
					obj.data.push(dataObj.uniqueClickRate);
				}else if(showName == "unsubRate"){
					obj.data.push(dataObj.uniqueUnSubsRate);
				}else if(showName == "conversionRate"){
					obj.data.push(dataObj.conversionRate);
				}else if(showName == "revenue"){
					obj.data.push(dataObj.conversionRevenue);
				}
				
				//dataArray.push(obj);
			}
	        var dataArray = [];
	        for(var prop in dataStore){
	            var obj = dataStore[prop];
	            while (obj.data.length < categories.length - 1) {
	                obj.data.push(0);
	            }
	            dataArray.push(obj);
	        }
	        
	        var isRateChart = false;
	        if(showName == "deliverabilityRate" || showName == "openRate" || showName == "clickRate" || showName == "unsubRate" || showName == "conversionRate"){
	        	isRateChart = true;
	        }

			var fstChart = new Highcharts.Chart({
				chart: {
					renderTo: $chart.find('.campaignOVChart').get(0),
					defaultSeriesType: 'line',
					height: 250,
					marginLeft: 92,
					backgroundColor: 'rgba(0,0,0,0)'
				},
				title: {
					text: null
				},
				xAxis: {
					categories:categories,
					tickWidth: 0,
					title: {
						text: null
					},
					labels: {
						rotation: 325,
						step:Math.ceil(categories.length / 31),
						x: -1,
						y: 28
					}
				},
				yAxis: {
					lineWidth: 1,
					title: {
						text: null
					},
					labels:{
						formatter:function() {
							var showVal = smr.formatNumber(this.value,"short");
							if(isRateChart){
								showVal = showVal + "%";
							}
							return showVal;
						}
					},
					max: ((isRateChart && isMaxVal)  ? 100 : null),
					min:0
				},
				credits: {
					enabled: false
				},
				tooltip: {
			        formatter: function() {
						var yVal = this.y;
						if(isRateChart){
							var val = (yVal >= 10) ? Highcharts.numberFormat(yVal, 1) : Highcharts.numberFormat(yVal, 2);
							yVal = val + "%";
						}
			            return '<span>' + this.x + '</span><br/>' + '<span>' + this.series.name + ': <b>' + smr.formatNumber(yVal) + '</b></span>';
			        },
			        borderColor: showName.lineColor
			    },
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0,
					x:50,
					y:-20,
	                width: 160
				},
				series: dataArray
			});
		}
	}


    function refleshTable(data, $table, columnName, order,view) {
    	var $e = view.$el;
        $table.find("tr:not(:first)").remove();
        smr.newSort(data,columnName,order);
        var $th = $table.find("th[data-column='" + columnName + "']");
        $table.find("th span.ico").html("&nbsp;&nbsp;");
        $ico = $th.find("span.ico");
        if (order) {
            $ico.html("&uarr;");
        } else {
            $ico.html("&darr;");
        }
        if(order){
            $th.attr("data-order", "Asc");
        }else{
            $th.attr("data-order", "Desc")
        }
        var arrow = function(v1){
            if(v1>0.1){
                return "up";
            }else if(v1<-0.1){
                return "down";
            }else{
                return "no";
            }
        };
        var objs = [];
        for (i = 0; i < data.length; i++) {
            var dataObj = data[i];
            var summaryObj = {
                campaignName : dataObj.campaignName,
                sent : smr.formatNumber(dataObj.totalSent),
                deliverability : dataObj.deliveryRate + "%",
                open : dataObj.uniqueOpenRate + "%" ,
                click : dataObj.uniqueClickRate + "%" ,
                unsub : dataObj.uniqueUnSubsRate + "%",
                conversionRate : dataObj.conversionRate + "%",
                revenue : smr.formatNumber(dataObj.conversionRevenue),
                clickName: "Click Rate",
                clickRateVariance : dataObj.clickRateVariance,
                clickArrow : arrow(dataObj.clickRateVariance),
                openName: "Open Rate",
                openRateVariance : dataObj.openRateVariance,
                openArrow : arrow(dataObj.openRateVariance),
                campaignId : dataObj.campaignId,
                enabled:  smr.conversionEnabled
            };
			if(dataObj.campaignName && dataObj.campaignName.length>40){
				summaryObj.campaignNameEllipses = dataObj.campaignName.substring(0,37)+"..." ;
			}
            
           objs.push(summaryObj);
        }

        for (var i = 0; i < objs.length; i++) {
            var $tr = smr.render("tmpl-sectionCampaignOverview-table-tr",{summaryObj:objs[i], conversionCurrency:smr.conversionCurrency});
            $table.append($tr);
        }
        
        
        $table.find("td.showhover span").hover(
        	function(event){
        		var datePro = (view.endDate-view.startDate)/(1000 * 60 * 60 * 24);
        		datePro = datePro+1;
        		var $this = $(this);
        		var $thisparent = $(this).parent();
        		var rate = $thisparent.attr("data-rate");
        		if(rate.indexOf(".")>-1){
        		   rate = parseFloat($thisparent.attr("data-rate")).toFixed("2");
        		}else{
        		   rate = parseInt(rate);
        		}
        		var value = $thisparent.attr("data-value");
                if(value.indexOf(".")>-1){
                   value = parseFloat($thisparent.attr("data-value")).toFixed("2");
                }else{
                   value = parseInt(value);
                }
                var prevalue = (value-rate)+"";
                if(prevalue.indexOf(".")>-1){
                	prevalue = parseFloat(prevalue).toFixed("2");
                 }else{
                	prevalue = parseInt(prevalue);
                 }
        		var dataObj = {
        				name:$thisparent.attr("data-name")+" Change",
        				rate:rate>0?"+"+rate:rate,
        				value:prevalue+"%",
        				startDate:smr.formatDate(new Date(view.startDate-datePro * 24 * 60 * 60 * 1000),"medium"),
        				endDate:smr.formatDate(new Date(view.endDate-datePro * 24 * 60 * 60 * 1000),"medium")
        		};
        		var html = smr.render("tmpl-sectionCampaignOverview-table-td-hover",dataObj);
        		$container = $e.find(".menuhoverContainer");
        		$container.append(html);
        		var offset = $e.closest(".smr.report").offset() ;
        		var thisSpanOffset = $(this).offset();
        		var IE7offsetX = 0;
        		$container.css({left:(thisSpanOffset.left - offset.left+20)-IE7offsetX , top:thisSpanOffset.top-offset.top-35});
        		$container.show();
        	},function(){
        		$container = $e.find(".menuhoverContainer");
        		$container.empty();
        		$container.hide();
        	}       	
        );
    }

    function showButtomPartTable(by,showName,data){
		var view = this;
		var $e = view.$el;
		var $table = $e.find(".sectionCampaignOverview-bottom table");
		by = by || "week";
		//first init
        refleshTable(data, $table, "totalSent", false,view);
        // --------- table column event --------- //
		$table.delegate("th","click",function(event){
			var e = event || window.event;
			var elem = e.srcElement||e.target;
			if($(elem).is("select")){
				return;
			}
			var $th = $(this);
			var columnName = $th.attr("data-column");

			var order = true;
			$table.find("th:not(:nth-child("+($th.index()+1)+"))").attr("data-order","");
			if($th.attr("data-order") == 'Desc'){
				order = false;
			}
			order = !order;
            refleshTable(data,$table,columnName, order,view);
		});
	}
	// --------- /Component Private Methods --------- //
	
	
	// --------- Component Registration --------- //
	brite.registerView("sectionCampaignOverview",{
		emptyParent: true
	},function(){
		return new smr.SectionCampaignOverview();
	});	
	// --------- /Component Registration --------- //
})(jQuery);
