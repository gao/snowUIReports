var smr = smr || {};

(function($){
	
	// --------- Component Private Properties --------- //
	var _calendarCount = 2;
	var _callBack,_closeCallBack;
	// --------- /Component Private Properties --------- //


	// --------- Component Registration --------- //
	brite.registerView("dateSelect",{
		parent: "body"
	},{
		create: function(data,config){
			var data = data || {};
			var $html = $(smr.render("tmpl-dateSelect",{}));
			if(data.useParent){
				$html.css("position","static");
			}else{
				$("body").append("<div id='transparentScreen'></div>");
				if(data.posX){
					$html.css("left",data.posX+"px")
				}
				if(data.posY){
					$html.css("top",data.posY+"px")
				}
			}
			return $html;
		},
			
		postDisplay:function(data,config){
			var view = this;
			var $e = view.$el;
			var now = smr.serverDate;
			view.currentYear = now.getFullYear();
			view.currentMonth = now.getMonth();
			view.belforeLimitedDate = data.belforeLimitedDate;
			
			showCalendars.call(view);
		},
		
		events: {
			"click; .icos .icoDiv": clickCalendars, 
			"click; table.dateSelect-calendar-table td.calendar-date": clickCalendarDate, 
			"click; .dateSelect-buttons .button.close": buttonClose
		},
		
		docEvents: {
			"click; #transparentScreen" : function(){
				this.close();
			},

			// bind the Esc key
			"keyup" : function(event){
				if(event.which == 27){
					this.close();
				}
			}
		},
		
		onChange: function(callback){
			_callback = callback;
		},
		
		onClose: function(closeCallback){
			_closeCallback = closeCallback;
		},
		
		close: function(selected){
			if(!selected){
				if(typeof _closeCallback != "undefined" && $.isFunction(_closeCallback)){
					_closeCallback();
				}
			}
			this.$element.bRemove();
			$("body").find("#transparentScreen").remove();
		}
		
	});
	// --------- /Component Registration --------- //
	
	// --------- events --------- //
	function clickCalendars(event){
		var view = this;
		var $ico = $(event.currentTarget);
		var action = $ico.attr("data-action");
		if(action == "prev"){
			view.currentMonth--;
		}else{
			view.currentMonth++;
		}
		showCalendars.call(view);
	}
	
	function clickCalendarDate(event){
		var view = this;
		var $td = $(event.currentTarget);
		if($td.hasClass("gray")) return;
		var date = new Date(Date.parse($td.attr("data-value")));
		if(typeof _callback != "undefined" && $.isFunction(_callback)){
			_callback(date);
		}
		view.close(true);
	}

	function buttonClose($item){
		var view = this;
		view.close();
	}
	// --------- /events --------- //
	
	// --------- Component Private Methods --------- //
	function showCalendars(calendars){
		var view = this;
		var $e = view.$el;
		var $content = $e.find(".dateSelect-content");
		$content.empty(); 
		var calendars = getCalendars.call(view);
		
		var $calendar="";
		for(var i=calendars.length-1;i>=0;i--){
			  var obj = calendars[i];
			  obj.belforeLimitedDate = view.belforeLimitedDate;
			  $calendar += "<td>"+smr.render("tmpl-dateSelect-calendar",obj)+"</td>";
		} 
		$content.append("<table><tr>"+$calendar+"</tr></table>");
	}

	
	function getCalendars(calendarCount){
		var currentYear = this.currentYear;
		var currentMonth = this.currentMonth;
		if(typeof calendarCount == 'undefined'){
			calendarCount = _calendarCount;
		}
		var calendars = [];
		for(var index = 0;index < calendarCount;index++){
			var calendar = {};
			var firstDateOfMonth = new Date(smr.serverDate*1);//smr.serverDate;
			firstDateOfMonth.setFullYear(currentYear);
			firstDateOfMonth.setMonth(currentMonth-index);
			firstDateOfMonth.setDate(1);
			firstDateOfMonth.setHours(0);
			firstDateOfMonth.setMinutes(0);
			firstDateOfMonth.setSeconds(0);
			var endDateOfMonth = new Date(firstDateOfMonth*1);
			endDateOfMonth.setMonth(firstDateOfMonth.getMonth() + 1);
			endDateOfMonth.setDate(0);
			
			var weeks = [];
			var week=new Array(7);
			for(var i=0;i < endDateOfMonth.getDate(); i++){
				var date = new Date(firstDateOfMonth * 1 + i * 24 * 60 * 60 * 1000);
				week[date.getDay()] = date;
				if(date.getDay() % 7 == 6){
					weeks.push(week);
					week=new Array(7);
				}
			}
			weeks.push(week);
			if(weeks.length < 6){
				weeks.push(new Array(7));
			}
			
			calendar.year = firstDateOfMonth.getFullYear();
			calendar.month = firstDateOfMonth.getMonth();
			calendar.monthLabel = smr.formatMonth(calendar.month);
			calendar.weeks = weeks;
			calendars.push(calendar);
		}
		
		//reinit year and month
		var newDate = new Date(smr.serverDate*1);
		newDate.setFullYear(this.currentYear);
		newDate.setMonth(this.currentMonth);
		this.currentYear = newDate.getFullYear();
		this.currentMonth = newDate.getMonth();
		return calendars;
	}
	
	// --------- /Component Private Methods --------- //
	
})(jQuery);
