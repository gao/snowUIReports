var smr = smr || {};


//format number like 123456 to 123,456,if number is null or undefined,set it to 0
smr.formatNumber = function(num,type){
	if(typeof num == "undefined" || num == 'null'){
		return 0;
	}else{
		if(type && type == "short"){
			var n = "";
			var value = num;
			if(value >= 1000){
				if(value >= 1000 && value < 1000000){
					value = value/1000;
					n = "K";
				}else if(value >= 1000000 && value < 1000000000){
					value = value/1000000;
					n = "M";
				}else if(value >= 1000000000){
					value = value/1000000000;
					n = "B";
				}
			}
			if(value<=-1000){
				if(value <= -1000 && value > -1000000){
					value = value/1000;
					n = "K";
				}else if(value <= -1000000 && value > -1000000000){
					value = value/1000000;
					n = "M";
				}else if(value <= -1000000000){
					value = value/1000000000;
					n = "B";
				}
			}
			return value + n;
		}else{
			var n = num+"";
			n = n.replace(/(\d)(?=(\d{3})+\b)/g, "$1,")
			return n;
		}
	}
};

//if number is null or undefined,set it to 0
smr.checkNumber = function(num){
	if(typeof num == "undefined" || num == 'null' || num == null){
		return 0;
	}else{
		return num;
	}
};

//if number is null,0 or undefined,set the calculation value to 0
smr.formatDivisionNumber = function(num1,num2){
	if(typeof num1 == "undefined" || num1 == 'null'){
		return 0;
	}else if(typeof num2 == "undefined" || num2 == 'null' || num2 == 0){
		return 0;
	}else{
		return num1/num2;
	}
};

//if the value is like 0.001, it will show 0.00 , so make it see at least 3 decimal points
smr.formatToFixed = function(val){
	if(typeof val == "undefined" || val == 'null'){
		return 0;
	}else{
		if(val < 1 && val > 0){
			return parseFloat(val.toFixed("3"));
		}else{
			return parseFloat(val.toFixed("2"));
		}
	}
};

//parse date,for now just support yyyy-MM-dd, MM/dd/yyyy
smr.parseDate = function(dateStr){
	var seconds = null;
	if(dateStr.indexOf("-") >= 0 ){
		var dArr = dateStr.split("-");
		seconds = Date.parse(dArr[1]+"/"+dArr[2]+"/"+dArr[0]);
	}else{
		seconds = Date.parse(dateStr);
	}
	return new Date(seconds);
}


//new sort to table arr
smr.newSort=function(arr,columnName,order){
	var temp;
    var exchange;
	
	for(var i=0; i<arr.length; i++){
		exchange = false;
		for(var j=arr.length-2; j>=i; j--){
			var valueA = "";
			var valueB = "";
			if(columnName == "Mailing" || columnName == "Mailing Name" || columnName=="Client"){
				valueA = arr[j+1][columnName].value;
				valueB = arr[j][columnName].value;
				
				//for the column Others
				if(typeof valueA == "undefined"){
					valueA = arr[j+1][columnName];
				}
				if(typeof valueB == "undefined"){
					valueB = arr[j][columnName];
				}
			}else{
				valueA = arr[j+1][columnName];
				valueB = arr[j][columnName];
			}
			if(valueA == null || typeof valueA == "undefined"){
				valueA = "";
			}
			if(valueB==null || typeof valueB == "undefined"){
				valueB="";
			}
			
			if(columnName == "launchDate" || columnName == "lastDate" || columnName == "lastUsed"){
				//var months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
				if(valueA.indexOf("-") >=0 ){
					var dArr1 = valueA.split("-");
					var dArr2 = valueB.split("-");
//					valueA = Date.parse(dArr1[2]+"/"+(months.indexOf(dArr1[1].toLowerCase())+1)+"/"+dArr1[0]);
//					valueB = Date.parse(dArr2[2]+"/"+(months.indexOf(dArr2[1].toLowerCase())+1)+"/"+dArr2[0]);
					valueA = Date.parse(dArr1[1]+" "+dArr1[0]+","+dArr1[2]);
					valueB = Date.parse(dArr2[1]+" "+dArr2[0]+","+dArr2[2]);
				}else{
					valueA = Date.parse(valueA);
					valueB = Date.parse(valueB);
				}
			}else if(columnName == "date" || columnName == "createdDate"){
				// support yyyy-MM-dd
				if(valueA.indexOf("-") >=0 ){
					var dArr1 = valueA.split("-");
					var dArr2 = valueB.split("-");
					valueA = Date.parse(dArr1[1]+"/"+dArr1[2]+"/"+dArr1[0]);
					valueB = Date.parse(dArr2[1]+"/"+dArr2[2]+"/"+dArr2[0]);
				}else{
					valueA = Date.parse(valueA);
					valueB = Date.parse(valueB);
				}
			}
			//sometimes the number value will be N/A
			if(valueA == "N/A")valueA=0;
			if(valueB == "N/A")valueB=0;
			
			if(order){
				if((valueA) < (valueB)){
					temp = arr[j+1] ;
					arr[j+1] = arr[j] ;
					arr[j]  = temp;
					exchange = true;
				}
			}else{
				if((valueA) > (valueB)){
					temp = arr[j+1] ;
					arr[j+1] = arr[j] ;
					arr[j]  = temp;
					exchange = true;
				}
			}
		}
			
		if(!exchange){
			break;
		} 	
	}	
 
	return arr;
}

//format date
smr.formatDate = function(date,pattern){
	if(typeof pattern == "undefined"){
		pattern = "MM/dd/yyyy";
	}
	var o = {
		"M+" :  date.getMonth()+1,  //month
		"d+" :  date.getDate(),     //day
		"h+" :  date.getHours(),    //hour
		"m+" :  date.getMinutes(),  //minute
		"s+" :  date.getSeconds(), //second
		"q+" :  Math.floor((date.getMonth()+3)/3),  //quarter
		"S"  :  date.getMilliseconds() //millisecond
	}
	var str = "";
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	if(pattern.toLowerCase() == "long"){
		str = months[date.getMonth()] + " " + date.getDate() + ", "+date.getFullYear();
	}else if(pattern.toLowerCase() == "medium"){
		str = months[date.getMonth()].substring(0,3) + " " + date.getDate() + ", "+date.getFullYear();
	}else{
		str = pattern;
		if(/(y+)/.test(str)) {
			str = str.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		
		for(var k in o) {
			if(new RegExp("("+ k +")").test(str)) {
				str = str.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		
	}
	return str;
	
};

smr.formatMonth = function(month,p){
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	if(p == "medium"){
		return months[month].substring(0,3);
	}
	return months[month];
}

//to test if it is a valid Date
smr.isValidDate = function(date) {
	if (Object.prototype.toString.call(date) !== "[object Date]" ){
		return false;
	}
	return !isNaN(date.getTime());
}

//format name to css name
smr.formatNameToCss = function(str){
	var cssName = str.replace(/\s/g, "");
	cssName = cssName.toLowerCase();
	//sometimes the name will have % ,change it to rate
	cssName = cssName.replace(/\%/g, "rate");
	//sometimes the name will have . ,change it to -
	cssName = cssName.replace(/\./g, "_");
	//sometimes the name will have ( ,change it to ""
	cssName = cssName.replace(/\(/g, "");
	//sometimes the name will have ) ,change it to ""
	cssName = cssName.replace(/\)/g, "");
	return cssName;
};

//get a array from m to n, m and n must be number. m must be smaller than or equal n
smr.getArrayFromMToN = function(m,n){
	var arr = [];
	if(typeof m == 'number' && typeof n == 'number' && m <= n){
		for(var i=m; i<=n ; i++){
			arr.push(i);
		}
		return arr;
	}
	return arr;
};

//draw notch in $item
smr.drawNotch = function($item){
	$item.append("<canvas width=0 height=0 ></canvas>");
	var gtx = brite.gtx($item.find("canvas"));
//	gtx.fitParent();
	gtx.canvas().width = $item.outerWidth();
	gtx.canvas().height = $item.outerHeight() + 1;
	var width = gtx.canvas().width;
	var height = gtx.canvas().height;
	
	gtx.strokeStyle("#cdcbcc");
	gtx.fillStyle("#f0eeef");
	gtx.beginPath();
	gtx.moveTo(width/2 - 15, height);
	gtx.lineTo(width/2, height-7);
	gtx.stroke();
	gtx.lineTo(width/2 + 15, height);
	gtx.stroke();
	gtx.closePath();
	gtx.lineWidth(2);
	gtx.fill();
};

// get pagination object for some list data
(function($){
	
	// --------- smr.Pagination Constructor --------- //
	function Pagination(list){
		
		if (!(this instanceof Pagination)) {
			var pagination = new Pagination(list);
			//init private members
			pagination._pageNum =1;
			pagination._pageCount =25;
			pagination._dataList = [].concat(list);
			pagination._sizeCount = list.length;
			pagination._pageSize = getPageSize.call(pagination);
			return pagination;
		}
	}
	smr.Pagination = Pagination; 
	// --------- /smr.Pagination Constructor --------- //

	// --------- Public Methods --------- //
	Pagination.prototype.getList = function(){
		return this._dataList;
	}
	Pagination.prototype.getPageInfo = function(){
		return this.go(this._pageNum);
	}
	Pagination.prototype.setPageCount = function(pageCount){
		this._pageCount = pageCount;
		this._pageSize = getPageSize.call(this);
	}
	Pagination.prototype.go = function(pageNum){
		var pageNum = pageNum || 1;
		var pageCountNum = this._pageCount;
		if(this._pageCount == "all"){
			pageCountNum = this._sizeCount;
		}
		var startRows = ( pageNum-1 ) * pageCountNum + 1;
		var endRows = pageNum * pageCountNum;
		if(this._sizeCount == 0){
			startRows = 0;
			endRows = 0;
		}else{
			if(startRows > this._sizeCount){
				startRows = ( this._pageSize-1 ) * pageCountNum + 1; 
				endRows = this._sizeCount;
				this._pageNum = this._pageSize;
			}else if(startRows <= this._sizeCount && endRows > this._sizeCount){
				endRows = this._sizeCount;
				this._pageNum = this._pageSize;
			}else{
				this._pageNum = pageNum;
			}
		}

		var subList = [];
		for(var i = startRows-1 ; i < endRows;i++){
			subList.push(this._dataList[i]);
		}
		var sizeCount = this._sizeCount;
		var pageCount = this._pageCount;
		pageNum = this._pageNum;
		var thisC = this;
		var pageInfo = {
				pageNum:pageNum,
				pageCount:pageCount,
				sizeCount:sizeCount,
				pageSize:getPageSize.call(thisC),
				pageList:subList,
				startRows:startRows,
				endRows:endRows,
				isFirst:isFirst.call(thisC),
				isLast:isLast.call(thisC)
			}

		return pageInfo;
	}
	Pagination.prototype.next = function(){
		return this.go(this._pageNum + 1);
	}
	Pagination.prototype.prev = function(){
		return this.go(this._pageNum - 1);
	}
	Pagination.prototype.goFirst = function(){
		return this.go(1);
	}
	Pagination.prototype.goLast = function(){
		return this.go(this._pageSize);
	}
	// --------- /Public Methods --------- //
	
	function isFirst(){
		if(this._pageNum == 1){
			return true;
		}
		return false;
	}
	
	function isLast(){
		if(this._pageNum == this._pageSize){
			return true;
		}
		return false;
	}
	
	function getPageSize(){
		var pageCountNum = this._pageCount;
		if(this._pageCount == "all"){
			pageCountNum = this._sizeCount;
		}
		this._pageSize = Math.ceil(this._sizeCount / pageCountNum);
		return this._pageSize;
	}

})(jQuery);
