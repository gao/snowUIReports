var smr = smr || {};

(function($){

	// --------- Component Registration --------- //
	brite.registerView("barChart",{
		emptyParent: true
	},{
		create: function(data,config){
			return smr.render("tmpl-barChart",{});
		},
		postDisplay:function(data,config){
			var view = this;
			var $e = view.$el;
			
			data = data || {};
			var tableDataInfo = data.tableDataInfo;
			
			//control the second column with,because IE does not support nth-child(2)
			tableDataInfo.isTableOfBarView = true;
			
			brite.display("dataTable",$e,tableDataInfo);
		}
	});	
	// --------- /Component Registration --------- //
	
})(jQuery);
