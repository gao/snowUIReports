smr = smr || {};

(function($){
  var _inMemoryState = {};

   smr.state = function(componentName, key,value){
	   if(localStorage){
		   if(typeof componentName != "undefined" && typeof key != "undefined"){
			   if(typeof value != "undefined"){
				   if(value === null){
					   localStorage.removeItem(componentName + "_" + key);
				   }else{
					   localStorage.setItem(componentName + "_" + key,value);
				   }
			   }else{
				   return localStorage.getItem(componentName + "_" + key);
			   }
		   }
	   }else{
		   if(typeof value != "undefined"){
			   if(value === null){
				 delete  _inMemoryState[componentName + "_" + key];
			   }else{
				   _inMemoryState[componentName + "_" + key] = value;
			   }
		   }else{
			   return _inMemoryState[componentName + "_" + key];
		   }
	   }
   }

})(jQuery);