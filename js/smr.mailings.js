smr = smr || {};

(function($){
   
   var _mailingSet = {
		   "batch":{
			   "main":new MailingsSet("batch","main","mailing"),
			   "compareA":new MailingsSet("batch","compareA","mailing"),
			   "compareB":new MailingsSet("batch","compareB","mailing")
		   },
		   "transactional":{
			   "main":new MailingsSet("transactional","main","mailing"),
			   "compareA":new MailingsSet("transactional","compareA","mailing"),
			   "compareB":new MailingsSet("transactional","compareB","mailing")
		   },
		   "program":{
			   "main":new MailingsSet("program","main","mailing"),
			   "compareA":new MailingsSet("program","compareA","mailing"),
			   "compareB":new MailingsSet("program","compareB","mailing")
		   },
		   "campaignOverview":{
			   "main":new MailingsSet("campaignOverview","main","mailing")
		   },
		   "deliverability":{
			   "main":new MailingsSet("deliverability","main","mailing")
		   },
		   "deliverabilityDomains":{
	      		"main":new MailingsSet("deliverabilityDomains","main","mailing")
 		   },
		   "domainDrillDown":{
			   "main":new MailingsSet("domainDrillDown","main","mailing")
		   },
		   "audience":{
			   "main":new MailingsSet("audience","main","mailing")
		   },
		   "mailingDetail":{
			   "main":new MailingsSet("mailingDetail","main","mailing")
		   },
		   "ABTest":{
			   "main":new MailingsSet("ABTest","main","mailing")
		   },
		   "deviceUsage":{
			   "main":new MailingsSet("deviceUsage","main","mailing")
		   }
   }
   
   var _campaignSet = {
		   "batch":{
			   "main":new MailingsSet("batch","main","campaign"),
			   "compareA":new MailingsSet("batch","compareA","campaign"),
			   "compareB":new MailingsSet("batch","compareB","campaign")
		   },
		   "transactional":{
			   "main":new MailingsSet("transactional","main","campaign"),
			   "compareA":new MailingsSet("transactional","compareA","campaign"),
			   "compareB":new MailingsSet("transactional","compareB","campaign")
		   },
		   "program":{
			   "main":new MailingsSet("program","main","campaign"),
			   "compareA":new MailingsSet("program","compareA","campaign"),
			   "compareB":new MailingsSet("program","compareB","campaign")
		   },
		   "campaignOverview":{
			   "main":new MailingsSet("campaignOverview","main","campaign")
		   },
		   "deliverability":{
			   "main":new MailingsSet("deliverability","main","mailing")
		   },
		   "deliverabilityDomains":{
	      		"main":new MailingsSet("deliverabilityDomains","main","mailing")
 			},
 		   "domainDrillDown":{
 			   "main":new MailingsSet("domainDrillDown","main","mailing")
 		   },
		   "audience":{
			   "main":new MailingsSet("audience","main","mailing")
		   },
		   "mailingDetail":{
			   "main":new MailingsSet("mailingDetail","main","mailing")
		   },
		   "ABTest":{
			   "main":new MailingsSet("ABTest","main","mailing")
		   },
		   "deviceUsage":{
			   "main":new MailingsSet("deviceUsage","main","mailing")
		   }
   }
   
   var _programSet = {
		   "batch":{
			   "main":new MailingsSet("batch","main","program"),
			   "compareA":new MailingsSet("batch","compareA","program"),
			   "compareB":new MailingsSet("batch","compareB","program")
		   },
		   "transactional":{
			   "main":new MailingsSet("transactional","main","program"),
			   "compareA":new MailingsSet("transactional","compareA","program"),
			   "compareB":new MailingsSet("transactional","compareB","program")
		   },
		   "program":{
			   "main":new MailingsSet("program","main","program"),
			   "compareA":new MailingsSet("program","compareA","program"),
			   "compareB":new MailingsSet("program","compareB","program")
		   },
		   "campaignOverview":{
			   "main":new MailingsSet("campaignOverview","main","program")
		   },
		   "deliverability":{
			   "main":new MailingsSet("deliverability","main","mailing")
		   },
		   "deliverabilityDomains":{
	      		"main":new MailingsSet("deliverabilityDomains","main","mailing")
  			},
 		   "domainDrillDown":{
 			   "main":new MailingsSet("domainDrillDown","main","mailing")
 		   },
		   "audience":{
			   "main":new MailingsSet("audience","main","mailing")
		   },
		   "mailingDetail":{
			   "main":new MailingsSet("mailingDetail","main","mailing")
		   },
		   "ABTest":{
			   "main":new MailingsSet("ABTest","main","mailing")
		   },
		   "deviceUsage":{
			   "main":new MailingsSet("deviceUsage","main","mailing")
		   }
   }
   
   var _ipSet = {	
		   "deliverability":{
	   			"main":new MailingsSet("deliverability","main","ips")
   			},
   			"deliverabilityDomains":{
	      		"main":new MailingsSet("deliverabilityDomains","main","ips")
   			}
   }
   
   var _vsgSet = {	
		   "deliverability":{
			   "main":new MailingsSet("deliverability","main","vsgs")
		   },
   		   	"deliverabilityDomains":{
	      		"main":new MailingsSet("deliverabilityDomains","main","vsgs")
   			}
   }
   
   var _targetSet = {	
		   "audience":{
			   "main":new MailingsSet("audience","main","target")
		   }
   }
   
   var _mailingDetailSet = {	
		   "mailingDetail":{
			   "main":new MailingsSet("mailingDetail","main","mailingDetail")
		   }
   }
   
   var _ABTestSet = {	
		   "ABTest":{
			   "main":new MailingsSet("ABTest","main","ABTest")
		   }
   }

   var _tagSet = {	
		   "batch":{
			   "main":new MailingsSet("batch","main","tag"),
			   "compareA":new MailingsSet("batch","compareA","tag"),
			   "compareB":new MailingsSet("batch","compareB","tag")
		   },
		   "transactional":{
			   "main":new MailingsSet("transactional","main","tag"),
			   "compareA":new MailingsSet("transactional","compareA","tag"),
			   "compareB":new MailingsSet("transactional","compareB","tag")
		   },
		   "program":{
			   "main":new MailingsSet("program","main","tag"),
			   "compareA":new MailingsSet("program","compareA","tag"),
			   "compareB":new MailingsSet("program","compareB","tag")
		   },
		   "campaignOverview":{
			   "main":new MailingsSet("campaignOverview","main","tag")
		   },
		   "deviceUsage":{
			   "main":new MailingsSet("deviceUsage","main","tag")
		   }
   }
   
   var _UserInsightSet = {	
		"userInsight":{
			"main":new MailingsSet("userInsight","main","userInsight")
		}
   }
   //--------- LimitData ---------//
   
   /**
    * the mailing Set object format is like [{id:mailingId,name:mailingName},...,]
    */
   function MailingsSet(reportType,name,type,isTemp){
	   var localStorageKey = type+"_"+reportType+"_"+name;
	   this.localStorageKey = localStorageKey;
	   this.reportType = reportType;
	   this.type = type;
	   this.name = name;
	   // first the _data is null
	   this._data = null;
	   this.isTemp = true;
	   if(typeof isTemp != 'undefined'){
		   this.isTemp = isTemp;
	   }
   };
   
   MailingsSet.prototype.get = function(index){
	   var mailings = getData.call(this).mailings;
	   return mailings[index];
   }
   
   /**
    * @return this will return the list of selectIds for this mailings like [{id:mailingId,name:mailingName},...,]
    */
   MailingsSet.prototype.list = function(){
	   var mailings = getData.call(this).mailings;
	   return mailings;
   }
   
   MailingsSet.prototype.add = function(obj){
	   var data = getData.call(this); 
	   var mailings = data.mailings; 
	   if(this.indexOf(obj) == -1){
		   mailings.push(obj);
		   saveData.call(this);
	   }
   }
   
   MailingsSet.prototype.update = function(index,obj){
	   var mailings = getData.call(this).mailings; 
	   mailings.splice(index,1,obj);
	   saveData.call(this);
   }
   
   MailingsSet.prototype.remove = function(index){
	   var mailings = getData.call(this).mailings; 
	   mailings.splice(index,1);
	   saveData.call(this);
   }
   
   MailingsSet.prototype.clear = function(deep){
	   var data = getData.call(this);
	   data.mailings = [];
	   if(deep){
		   data = {mailings:[],limitData:{}};
	   }
	   saveData.call(this,data);
   }
   
   MailingsSet.prototype.indexOf = function(obj){
	   var mailings = getData.call(this).mailings;
	   var isExist = false;
	   for(var i=0 ;i < mailings.length; i++){
		   var o = mailings[i];
		   if(o.id == obj.id){
			   isExist = true;
			   return i;
		   }
	   }
	   if(!isExist){
		   return -1;
	   }
   }
   
   //a Period type required
   MailingsSet.prototype.period = function(period){
	   var limitData = getData.call(this).limitData;
	   if(typeof period == "undefined"){
		   var startDate = new Date(limitData.pStartDate);
		   var endDate = new Date(limitData.pEndDate);
		   if(!smr.isValidDate(startDate)){
			   startDate = null;
		   }
		   if(!smr.isValidDate(endDate)){
			   endDate = null;
		   }
		   period = smr.buildPeriod(limitData.pDateType,startDate,endDate,this.reportType);
		   return period;
	   }else{
		   limitData.pStartDate = period.startDate * 1;
		   limitData.pEndDate = period.endDate * 1;
		   limitData.pDateType = period.dateType;
		   saveData.call(this);
	   }
   }
   
   MailingsSet.prototype.attr = function(key,value){
	   var limitData = getData.call(this).limitData;
	   if(typeof value == "undefined"){
		   var value = limitData[key]
		   if(typeof value == 'undefined'){
			   if(key == "limit" ){
				   value = false;
			   }
			   if(key == "includeArchive"){
				   if(this.reportType=="campaignOverview"){
					   value = true;
				   }else{
					   value = false;
				   }
			   }
			   if(key=="includeSubOrg"){
				   return smr.isRootOrg[this.reportType];
			   }
			   if(key=="pivotOption"){
				   return {sortBy:"Name",sortOrder:"Descending",columns:{}};
			   }
			   if(key=="overviewOption"){
				   return {sortBy:"Name",sortOrder:"Descending",columns:{}};
			   }
		   }
		   return value;
	   }else{
		   limitData[key] = value;
		   saveData.call(this);
	   }
   }
   
   MailingsSet.prototype.defaultSet = function(value){
	   var data = getData.call(this);
	   if(typeof value == "undefined"){
		   var value = data.defaultSet;
		   return value;
	   }else{
		   data.defaultSet = value;
		   saveData.call(this);
	   }
   }
   
   function getData(){
	   //first init
	   var isTemp = this.isTemp;
	   if(this._data == null){
		   if (localStorage && !isTemp){
				// if support localStorage
				var localStorageKey = this.localStorageKey;
				var dataString = localStorage.getItem(localStorageKey);
				if (dataString){
					this._data = JSON.parse(dataString);
				}else{
					this._data = {mailings:[],limitData:{}};
				}
			}else{
				this._data = {mailings:[],limitData:{}};
			}
	   }
	   
		return this._data;
	}
	
	function saveData(data){
		var isTemp = this.isTemp;
		if(typeof data == 'undefined'){
			data = this._data;
		}else{
			this._data = data;
		}
		// if support localStorage
		if(localStorage && !isTemp){
			var localStorageKey = this.localStorageKey;
			console.log("SMR DEBUG: saving data: " + data + " stringify: " + JSON.stringify(data));
			if (data != null){
				localStorage.removeItem(localStorageKey);
				localStorage.setItem(localStorageKey,JSON.stringify(data));	
			}
		}
	}
	
	
	
	/**
    * get different MailingSet object by
    */
	smr.getMailingSet = function(type,name){
		var reportType = type;
		if(reportType == smr.REPORT_TYPE.PROGRAM){
			reportType = "program";
		}
		var mailingSet = _mailingSet[reportType][name];
		return mailingSet;
	}
	
	/**
	 * get different CampaignSet object by
	 */
	smr.getCampaignSet = function(type,name){
		var reportType = type;
		if(reportType == smr.REPORT_TYPE.PROGRAM){
			reportType = "program";
		}
		var campaignSet = _campaignSet[reportType][name];
		return campaignSet;
	}
	
	/**
	 * get different ProgramSet object by
	 */
	smr.getProgramSet = function(type,name){
		var reportType = type;
		if(reportType == smr.REPORT_TYPE.PROGRAM){
			reportType = "program";
		}
		var programSet = _programSet[reportType][name];
		return programSet;
	}
	
	/**
	 * get different VSGSet object by
	 */
	smr.getVSGSet = function(type,name){
		var reportType = type;
		var vsgSet = _vsgSet[reportType][name];
		return vsgSet;
	}
	
	/**
	 * get different IPSet object by
	 */
	smr.getIPSet = function(type,name){
		var reportType = type;
		var ipSet = _ipSet[reportType][name];
		return ipSet;
	}
	
	/**
	 * get different TargetSet object by
	 */
	smr.getTargetSet = function(type,name){
		var reportType = type;
		var targetSet = _targetSet[reportType][name];
		return targetSet;
	}
	
	/**
	 * get different MailingDetailSet object by
	 */
	smr.getMailingDetailSet = function(type,name){
		var reportType = type;
		var mailingDetailSet = _mailingDetailSet[reportType][name];
		return mailingDetailSet;
	}
	
	/**
	 * get different DomainDrillDownSet object by
	 */
	smr.getDomainDrillDownSet = function(type,name){
		var reportType = type;
		var domainDrillDwonSet = _mailingSet[reportType][name];
		return domainDrillDwonSet;
	}
	
	/**
	 * get different ABTest object by
	 */
	smr.getABTestSet = function(type,name){
		var reportType = type;
		var ABTestSet = _ABTestSet[reportType][name];
		return ABTestSet;
	}

	
	smr.getUserInsightSet = function(type,name){
		var reportType = type;
		var UserInsightSet = _UserInsightSet[reportType][name];
		return UserInsightSet;
	}
	
	/**
	 * get different Tag object by
	 */
	smr.getTagSet = function(type,name){
		var reportType = type;
		var tagSet = _tagSet[reportType][name];
		return tagSet;
	}
	
	smr.getSet = function(reportType,mailingSetName,type){
		if(typeof mailingSetName == 'undefined'){
			mailingSetName = "main";
		}
		var set;
		if(type == "mailing" || type == "selectMailings"){
			set = smr.getMailingSet(reportType,mailingSetName);
		}else if(type == "campaign" || type == "selectCampaigns"){
			set = smr.getCampaignSet(reportType,mailingSetName);
		}else if(type == "program" || type == "selectPrograms"){
			set = smr.getProgramSet(reportType,mailingSetName);
		}else if(type == "vsgs" || type == "selectVSGs"){
			set = smr.getVSGSet(reportType,mailingSetName);
		}else if(type == "ips" || type == "selectIPs"){
			set = smr.getIPSet(reportType,mailingSetName);
		}else if(type == "domainDrillDown"){
			set = smr.getDomainDrillDownSet(reportType,mailingSetName);
		}else if(type == "target" || type == "selectTargets"){
			set = smr.getTargetSet(reportType,mailingSetName);
		}else if(type == "mailingDetail" || type == "selectMailingDetails"){
			set = smr.getMailingDetailSet(reportType,mailingSetName);
		}else if(type == "ABTest" || type == "selectABTestMailings"){
			set = smr.getABTestSet(reportType,mailingSetName);
		}else if(type == "userInsight"){
			set = smr.getUserInsightSet(reportType,mailingSetName);
		}else if(type == "tag" || type == "selectTags"){
			set = smr.getTagSet(reportType,mailingSetName);
		}
		return set;
	}
	
	smr.getSetAndType = function(reportType,mailingSetName){
		if(typeof mailingSetName == 'undefined'){
			mailingSetName = "main";
		}
		var set,type;
		if(reportType == smr.REPORT_TYPE.DELIVERABILITY){
			var vsgSet = smr.getVSGSet(reportType,mailingSetName);
			var ipSet = smr.getIPSet(reportType,mailingSetName);
			if(vsgSet && vsgSet.defaultSet()){
				set = vsgSet;
				type = "VSG";
			}else{
				set = ipSet;
				type = "IP";
			}
		}else if(reportType == smr.REPORT_TYPE.AUDIENCE){
			var targetSet = smr.getTargetSet(reportType,mailingSetName);
			set = targetSet;
			type = "target";
		}else if(reportType == smr.REPORT_TYPE.MAILINGDETAIL){
			var mailingDetailSet = smr.getMailingDetailSet(reportType,mailingSetName);
			set = mailingDetailSet;
			type = "mailingDetail";
		}else if(reportType == smr.REPORT_TYPE.ABTEST){
			var ABTestSet = smr.getABTestSet(reportType,mailingSetName);
			set = ABTestSet;
			type = "ABTest";
		}else if(reportType == smr.REPORT_TYPE.DELIVERABILITYDOMAINS){
			var vsgSet = smr.getVSGSet(reportType,mailingSetName);
			set = vsgSet;
			type = "VSG";
		}else if (reportType == smr.REPORT_TYPE.DOMAINDRILLDOWN){
			var domainSet = smr.getDomainDrillDownSet(reportType,mailingSetName);
			set = domainSet;
			type = "domainDrillDown";
		}else if (reportType == smr.REPORT_TYPE.USERINSIGHT){
			var userInsightSet = smr.getUserInsightSet(reportType,mailingSetName);
			set = userInsightSet;
			type = "userInsight";
		}else{
			var mailingSet = smr.getMailingSet(reportType,mailingSetName);
			var campaignSet = smr.getCampaignSet(reportType,mailingSetName);
			var programSet = smr.getProgramSet(reportType,mailingSetName);
			var tagSet = smr.getTagSet(reportType,mailingSetName);
			if(campaignSet.defaultSet()){
				set = campaignSet;
				type = "Campaign";
			}else if(programSet.defaultSet()){
				set = programSet;
				type = "Program";
			}else if(tagSet.defaultSet()){
				set = tagSet;
				type = "Tag";
			}else{
				set = mailingSet;
				type = "Mailing";
			}
		}
		
		return {set:set,type:type};
	}
	
	smr.setDefaultSet = function(reportType,mailingSetName,type){
		if(type == "mailing" || type == "selectMailings"){
			smr.getMailingSet(reportType,mailingSetName).defaultSet(true);
			smr.getCampaignSet(reportType,mailingSetName).clear(true);
			smr.getProgramSet(reportType,mailingSetName).clear(true);
			smr.getTagSet(reportType,mailingSetName).clear(true);
		}else if(type == "campaign" || type == "selectCampaigns"){
			smr.getCampaignSet(reportType,mailingSetName).defaultSet(true);
			smr.getMailingSet(reportType,mailingSetName).clear(true);
			smr.getProgramSet(reportType,mailingSetName).clear(true);
			smr.getTagSet(reportType,mailingSetName).clear(true);
		}else if(type == "program" || type == "selectPrograms"){
			smr.getProgramSet(reportType,mailingSetName).defaultSet(true);
			smr.getMailingSet(reportType,mailingSetName).clear(true);
			smr.getCampaignSet(reportType,mailingSetName).clear(true);
			smr.getTagSet(reportType,mailingSetName).clear(true);
		}else if(type == "tag" || type == "selectTags"){
			smr.getTagSet(reportType,mailingSetName).defaultSet(true);
			smr.getProgramSet(reportType,mailingSetName).clear(true);
			smr.getMailingSet(reportType,mailingSetName).clear(true);
			smr.getCampaignSet(reportType,mailingSetName).clear(true);
		}else if(type == "vsgs" || type == "selectVSGs"){
			smr.getVSGSet(reportType,mailingSetName).defaultSet(true);
			smr.getIPSet(reportType,mailingSetName).clear(true);
		}else if(type == "ips" || type == "selectIPs"){
			smr.getIPSet(reportType,mailingSetName).defaultSet(true);
			smr.getVSGSet(reportType,mailingSetName).clear(true);
		}else if(type == "target" || type == "selectTargets"){
			smr.getTargetSet(reportType,mailingSetName).defaultSet(true);
		}else if(type == "mailingDetail" || type == "selectMailingDetails"){
			smr.getMailingDetailSet(reportType,mailingSetName).defaultSet(true);
		}else if(type == "ABTest" || type == "selectABTestMailings"){
			smr.getABTestSet(reportType,mailingSetName).defaultSet(true);
		}else if(type == "userInsight"){
			smr.getUserInsightSet(reportType,mailingSetName).defaultSet(true);
		}
	}
	
	smr.copySet = function(setA,setB){
		saveData.call(setA,$.extend(true,{},getData.call(setB)));
	}
	
	smr.createCopySet = function(set){
		var setCopy = new MailingsSet(set.reportType,set.name,set.type,true);
		smr.copySet(setCopy,set);
		return setCopy;
	}
	
	smr.saveMailingPickerUIStates = function(type,data){
		var states = new Array();
		//make sure top can not be negative
		if(data.top && data.top < 0){
			data.top = 10;
		}
		var dataVal = $.extend({},data);
		
		if(type == "PosXY"){
			localStorage.removeItem("mailingPickerUIStatesPosXY");
			states.push(dataVal);	
			localStorage.setItem('mailingPickerUIStatesPosXY', JSON.stringify(states));
		}else{
			localStorage.removeItem("mailingPickerUIStatesPosWH");
			states.push(dataVal);	
			localStorage.setItem('mailingPickerUIStatesPosWH', JSON.stringify(states));
		}	
	}

	smr.getMailingPickerUIStates = function(type){
		var states = [];
		var mailingPickerUIStates = localStorage.getItem("mailingPickerUIStates"+type);
		if (mailingPickerUIStates && mailingPickerUIStates!=null){
			states = JSON.parse(mailingPickerUIStates);
		}else{
			states = new Array();
		}
		return states;
	}

	smr.saveIPandVSGPickerUIStates = function(type,data){
		var states = new Array();
		if(data.top && data.top < 0){
			data.top = 10;
		}
		var dataVal = $.extend({},data);
		if(type == "PosXY"){
			localStorage.removeItem("ipandVSGPickerUIStatesPosXY");
			states.push(dataVal);	
			localStorage.setItem('ipandVSGPickerUIStatesPosXY', JSON.stringify(states));
		}else{
			localStorage.removeItem("ipandVSGPickerUIStatesPosWH");
			states.push(dataVal);	
			localStorage.setItem('ipandVSGPickerUIStatesPosWH', JSON.stringify(states));
		}	
	}

	smr.getIPandVSGPickerUIStates = function(type){
		var states = [];
		var ipandVSGPickerUIStates = localStorage.getItem("ipandVSGPickerUIStates"+type);
		if (ipandVSGPickerUIStates){
			states = JSON.parse(ipandVSGPickerUIStates);
		}else{
			states = new Array();
		}
		return states;
	}
	

})(jQuery);



