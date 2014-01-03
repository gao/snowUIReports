smr = smr || {};

(function($){
	
	function Period(dateType,startDate,endDate,reportType){
		this.dateType = dateType; 
		if(!dateType){
            if(reportType == "campaignOverview" || reportType == smr.REPORT_TYPE.USERINSIGHT){
                this.dateType = "last90Days";
            }else if(reportType == smr.REPORT_TYPE.AUDIENCE){
            	this.dateType = "last365Days";
            }else{
                this.dateType = "last30Days";
            }
		}
		if(dateType == 'inCustomDateRange' && startDate==null && endDate==null){
			this.dateType = "last30Days";
		}
		this.startDate = startDate; 
		this.endDate = endDate;
	}
	
	Period.prototype.setDateType = function(dateType){
		this.dateType = dateType;
	}
	
	Period.prototype.setStartDate = function(startDate){
		this.startDate = startDate;
	}
	
	Period.prototype.setEndDate = function(endDate){
		this.endDate = endDate;
	}
	
	Period.prototype.getDateType = function(){
		return this.dateType;
	}
	
	
	Period.prototype.getDateRange = function(){
		if(!smr.isValidDate(this.startDate)){
			this.startDate = null;
		}
		if(!smr.isValidDate(this.endDate)){
			this.endDate = null;
		}
		var startDate = this.startDate;
		var endDate = this.endDate;
		var dateRange;
		var dateYear;
		if(this.dateType == 'inCustomDateRange'){
			dateRange = {
				startDate:startDate,
				endDate:endDate
			}
		}else{
			endDate = smr.serverDate;
			startDate = smr.getLastNDays(this.dateType,endDate);
			//for 'yesterday' , just list Yestoday's data and not today's data 
			if(this.dateType=="yesterday"){
				endDate = new Date(smr.serverDate - 1 * 24 * 60 * 60 * 1000);
			}else if(this.dateType=="lastYear"){
				dateYear = new Date().getYear() + 1900;
				startDate=new Date(dateYear-1,0,1);
				endDate = new Date(dateYear -1,11,31);
			}else if(this.dateType=="thisYear"){
				dateYear = new Date().getYear() + 1900;
				startDate=new Date(dateYear,0,1);
			}
			dateRange = {
				startDate:startDate,
				endDate:endDate
			}
		}
		return dateRange;
	}
   
	smr.getLastNDays = function(n,baseDate){
		var returnDate;
		if(n == "today"){
			returnDate = new Date(baseDate);
		}else if(n == "yesterday"){
			returnDate = new Date(baseDate - 1 * 24 * 60 * 60 * 1000);
		}else if(n == "last7Days"){
			returnDate = new Date(baseDate - 6 * 24 * 60 * 60 * 1000);
		}else if(n == "last30Days"){
			returnDate = new Date(baseDate - 29 * 24 * 60 * 60 * 1000);
		}else if(n == "last60Days"){
			returnDate = new Date(baseDate - 59 * 24 * 60 * 60 * 1000);
		}else if(n == "last90Days"){
			returnDate = new Date(baseDate - 89 * 24 * 60 * 60 * 1000);
		}else if(n == "last180Days"){
			returnDate = new Date(baseDate - 179 * 24 * 60 * 60 * 1000);
		}else if(n == "last365Days"){
			returnDate = new Date(baseDate - 364 * 24 * 60 * 60 * 1000);
		}else if(n == "last2Years"){
			returnDate = new Date(baseDate - 729 * 24 * 60 * 60 * 1000);
		}else if(n == "last3Years"){
			returnDate = new Date(baseDate - 1094 * 24 * 60 * 60 * 1000);
		}
		return returnDate;
	}
	
	smr.buildPeriod = function(dateType,startDate,endDate,reportType){
		return new Period(dateType,startDate,endDate,reportType);
	}
	
})(jQuery);



