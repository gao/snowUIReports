(function($){
       
    Handlebars.registerHelper('listNum', function(start,end,currentPage, options) {
	  currentPage = parseInt(currentPage);
	  var fn = options.fn, inverse = options.inverse;
	  var ret = "", data;
	  if (options.data) {
	    data = Handlebars.createFrame(options.data);
	  }
	  var nums=new Array();
	  for(var i=start;i<=end;i++){
		 if(currentPage!=i){
			nums.push({num:i,css:"action"});
		 } else{
			nums.push({num:i});
		 }
	  }
	  if(nums && nums.length > 0) {
	    for(var i=0, j=nums.length; i<j; i++) {
	      if (data) { data.index = i; }
	      ret = ret + fn(nums[i], { data: data });
	    }
	  } else {
	    ret = inverse(this);
	  }
	  return ret;
    });
    
    Handlebars.registerHelper('reListNumber', function(val1,val2,val3,val4,currentPage, options) {
	  currentPage = parseInt(currentPage);
	  var fn = options.fn, inverse = options.inverse;
	  var start = parseInt(val1) - parseInt(val2);
	  var end = parseInt(val3) + parseInt(val4);
	  var ret = "", data;
	  if (options.data) {
	    data = Handlebars.createFrame(options.data);
	  }
	  var nums=new Array();
	  for(var i=start;i<=end;i++){
		 if(currentPage!=i){
			nums.push({num:i,css:"action"});
		 } else{
			nums.push({num:i});
		 }
	  }
	  if(nums && nums.length > 0) {
	    for(var i=0, j=nums.length; i<j; i++) {
	      if (data) { data.index = i; }
	      ret = ret + fn(nums[i], { data: data });
	    }
	  } else {
	    ret = inverse(this);
	  }
	  return ret;
    });
	
    Handlebars.registerHelper('subString', function(src,start,num,ellipsis) {
    	ellipsis =ellipsis||false;
    	if(num=="end"){
    		return new Handlebars.SafeString(src.substring(start,src.length-start));
    	}else{
			if(num+start<src.length&&ellipsis){
				return new Handlebars.SafeString(src.substring(start,num)+"...");
			}else{
				return new Handlebars.SafeString(src.substring(start,num));
			}
    	}
    });
    
    /**
	 * we can use like this {{#eachList a b }}  b is the default value
	 * means mark the isDefault item
	 */
    Handlebars.registerHelper('eachList', function(context,val, options) {
	  	var ret = "";
	  	for(var i=0, j=context.length; i<j; i++) {
	  		if(typeof context[i].value != "undefined"){
	  			if(context[i].value == val){
		  			context[i]["isDefault"] = true;
		  		}
	  		}else{
	  			if(context[i].labelName == val){
		  			context[i]["isDefault"] = true;
		  		}
	  		}
	  		
	    	ret = ret + options.fn(context[i]);
	  	}
	  	return ret;
	});
	
	Handlebars.registerHelper('eachWeeks', function(context, options) {
	  	var ret = "";
	  	var contextVal = {}
	  	for(var i=0, j=context.length; i<j; i++) {
	  		contextVal.week = context[i];
	  		//contextVal.belforeLimitedDate = val;
	    	ret = ret + options.fn(contextVal);
	  	}
	  	return ret;
	});
	
	 /**
	 * we can use like this {{#eachDayWeek a b }}  b is the default value
	 */
    Handlebars.registerHelper('eachDayWeek', function(context, val, options) {
	  	var ret = "";
	  	var contextVal = {}
	  	for(var i=0, j=context.length; i<j; i++) {
	  		var date = context[i];
	  		if(date){
	  			contextVal.date = date;
	  			contextVal.equalServerDate = false;
		  		if(val && val > date){
			  		contextVal.isGray = true;
			  	}
	
		  		if(smr.formatDate(date) == smr.formatDate(smr.serverDate)){
			  		contextVal.equalServerDate = true;
			  	}
			  	
			  	contextVal.formatDate = smr.formatDate(date);
			  	contextVal.dateVal = date.getDate();
	  		}else{
	  			contextVal.date = null;
	  		}
	  		ret = ret + options.fn(contextVal);
	  	}
	  	return ret;
	});
    
    /**
	 * we can use like this {{#gtAndTrue a b c}}true{{else}}false{{/equal}}
	 * means if (a > b && c) , will show true, else show false;
	 */
	Handlebars.registerHelper('gtAndTrue', function(a,b,c,options) {
		if(a > b && c) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * we can use like this {{#gtSum a b c}}true{{else}}false{{/equal}}
	 * means if (a > b + c) , will show true, else show false;
	 */
	Handlebars.registerHelper('gtSum', function(a,b,c,options) {
		if(a > b+c) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * we can use like this {{#notEqualAndTrue a b c}}true{{else}}false{{/equal}}
	 * means if (a != b && c) , will show true, else show false;
	 */
	Handlebars.registerHelper('notEqualAndTrue', function(a,b,c,options) {
		if(a != b && c) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * we can use like this {{#equalAndTrue a b c}}true{{else}}false{{/equal}}
	 * means if (a == b && c) , will show true, else show false;
	 */
	Handlebars.registerHelper('equalAndTrue', function(a,b,c,options) {
		if(a == b && c) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * we can use like this {{#equalOrUntrue a b c}}true{{else}}false{{/equal}}
	 * means if (a == b || !c) , will show true, else show false;
	 */
	Handlebars.registerHelper('equalOrUntrue', function(a,b,c,options) {
		if(a == b || !c) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * we can use like this {{#bothTrue a b }}true{{else}}false{{/equal}}
	 * means if (a && b) , will show true, else show false;
	 */
	Handlebars.registerHelper('bothTrue', function(a,b,options) {
		if(a && b) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
    
    /**
	 * we can use like this {{#equalOr a b c d}}true{{else}}false{{/equal}}
	 * means if (a == b || c == d) , will show true, else show false;
	 */
	Handlebars.registerHelper('equalOr', function(a,b,c,d,options) {
		if(a == b || c == d) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	 /**
	 * we can use like this {{#equalAnd a b c d}}true{{else}}false{{/equal}}
	 * means if (a == b && c == d) , will show true, else show false;
	 */
	Handlebars.registerHelper('equalAnd', function(a,b,c,d,options) {
		if(a == b && c == d) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
	
	/**
	 * we can use like this {{#notUndefined a}}true{{else}}false{{/equal}}
	 * means if (typeof a !=  'undefined') , will show true, else show false;
	 */
	Handlebars.registerHelper('notUndefined', function(a,options) {
		if(typeof a !=  'undefined') {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
})(jQuery);