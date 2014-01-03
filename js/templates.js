Handlebars.templates = Handlebars.templates || {};


// template --- tmpl-abTestPicker ---
Handlebars.templates['tmpl-abTestPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"abTestPicker commonPicker old-picker\">\n		<div class=\"icoDiv resizeHandler\"></div>\n		<div class=\"abTestPicker-top commonPicker-top new-close\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">";
  foundHelper = helpers.extTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.extTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"abTestPicker-main commonPicker-main\">\n		<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Mailings Available\n			</div>\n			<div class=\"abTestPicker-content  commonPicker-content notab\">\n				\n			</div>\n		</div>\n		<div class=\"abTestPicker-bottom commonPicker-bottom old-layout\">\n			<div class=\"SMA-REPORT-ABTESTPICKERDONEBUTTON btn done\">Done</div>\n			<div class=\"SMA-REPORT-ABTESTPICKERCANCELBUTTON btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-abTestPicker-mailingView ---
Handlebars.templates['tmpl-abTestPicker-mailingView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"commonPicker-mailingView abTestPicker-mailingView\">\n		<div class=\"tags\">\n			\n		</div>\n	</div>";}
);

// template --- tmpl-abTestPicker-tag-selectTargets ---
Handlebars.templates['tmpl-abTestPicker-tag-selectTargets'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"tag \" data-tag=\"selectABTestMailings\">\n		<div class=\"tag-content\">\n			\n			<div class=\"SMA-REPORT-ABTESTPICKERFILTER commonPicker-filters abTestPicker-filter\">\n				<div class=\"filter-label abTestPicker-filter-label\">Filter by:</div>\n				<div class=\"filter-fields abTestPicker-filter-fields\">\n					<div class=\"label-field\">\n							<div class=\"field\">\n							<span class=\"sub-field left\">Launch Date</span>\n								<span class=\"sub-field right\">\n									<select name=\"launchDate\" style=\"width:135px\">\n										<option value=\"today\" >Today</option>\n										<option value=\"yesterday\">Yesterday</option>\n										<option value=\"last7Days\">Last 7 days</option>\n										<option value=\"last30Days\" selected>Last 30 days</option>\n										<option value=\"last60Days\">Last 60 days</option>\n										<option value=\"last90Days\">Last 90 days</option>\n										<option value=\"last180Days\">Last 180 days</option>\n										<option value=\"last365Days\">Last 365 days</option>\n										<option value=\"all\">All</option>\n									</select>\n								</span>\n								<span class=\"sub-field left\">Name</span>\n							<span class=\"sub-field name right\">\n								<input name=\"name\" type=\"text\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n							<span class=\"sub-field right\">\n								<input type=\"checkbox\" name=\"includeArchive\" />\n								<label>Include Archived Mailings</label>\n							</span>\n							<div class=\"cb\"></div>\n							</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-ABTESTPICKERTABLE abTestPicker-table commonPicker-table\">\n				<div class=\"abTestPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"ABTest\">\n						<thead>\n							<tr>\n								<th class=\"sortable name\" data-column=\"name\"><span class=\"thSortName\">Name</span></th>\n								<th class=\"sortable campaign\" data-column=\"campaign\"><span class=\"thSortName\">Campaign</span></th>\n								<th class=\"sortable type\" data-column=\"type\"><span class=\"thSortName\">Type</span></th>\n								<th class=\"sortable status\" data-column=\"status\"><span class=\"thSortName\">Status</span></th>\n								<th class=\"sortable launchDate\" data-column=\"launchDate\"><span class=\"thSortName\">Last Launch Date</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";}
);

// template --- tmpl-abTestPicker-target-table-tr ---
Handlebars.templates['tmpl-abTestPicker-target-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program5(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program11(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaignEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaignEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program13(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " pointertr\">\n		<td class=\"btnAction\" ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"btnAction\" ";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"btnAction\">";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"btnAction\">";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"btnAction\">";
  foundHelper = helpers.launchDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.launchDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-barChart ---
Handlebars.templates['tmpl-barChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"barChart\"> \n	</div>";}
);

// template --- tmpl-combobox ---
Handlebars.templates['tmpl-combobox'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"item ";
  stack1 = depth0.isDefault;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isHide;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isSMSKeyword;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isEventType;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isFailureDetailCode;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n				";
  return buffer;}
function program2(depth0,data) {
  
  
  return "default";}

function program4(depth0,data) {
  
  
  return "isHide";}

function program6(depth0,data) {
  
  
  return "isSMSKeyword";}

function program8(depth0,data) {
  
  
  return "isEventType";}

function program10(depth0,data) {
  
  
  return "isFailureDetailCode";}

  buffer += "<div class=\"combobox\" data-value=\"";
  stack1 = depth0.defaultItem;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.value;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"combobox-content\">\n			<div class=\"combobox-button\">\n				<label>";
  stack1 = depth0.defaultItem;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label><span class=\"button-ico ico ico-downArrow\"></span>\n			</div>\n			<div class=\"combobox-list\">\n				";
  stack1 = depth0.defaultItem;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.value;
  stack2 = depth0.list;
  foundHelper = helpers.eachList;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "eachList", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-dataList ---
Handlebars.templates['tmpl-dataList'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

  buffer += "<div class=\"dataList\" style=\"left:";
  foundHelper = helpers.left;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"dataList-main\">\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-dataList-item ---
Handlebars.templates['tmpl-dataList-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item\">\n		";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n	</div>";
  return buffer;}
);

// template --- tmpl-dataTable ---
Handlebars.templates['tmpl-dataTable'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    		<div class=\"table-title\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		";
  return buffer;}

function program3(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.smaclass;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.smaclass; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<div class=\"dataTableDiv\">\n		";
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<table class=\"";
  stack1 = depth0.smaclass;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " dataTable\">\n			<thead>\n				<tr></tr>\n			</thead>\n			<tbody></tbody>\n		</table>\n		<div class=\"hoverBoxContainer\"></div>\n	</div>";
  return buffer;}
);

// template --- tmpl-dataTable-tableThead ---
Handlebars.templates['tmpl-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "sortable";}

function program3(depth0,data) {
  
  
  return "barChartTh";}

function program5(depth0,data) {
  
  
  return "isTableOfBarView";}

function program7(depth0,data) {
  
  
  return "byDomain";}

function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n			<div class=\"dropDownSelectMetric\">\n				<select name='dropDownSelectMetric'>\n					";
  stack1 = depth0.label;
  stack2 = depth0.dropDownList;
  foundHelper = helpers.eachList;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)}) : helperMissing.call(depth0, "eachList", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</select>\n			</div>\n		";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<option value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.isDefault;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isByDomain;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.labelName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n					";
  return buffer;}
function program11(depth0,data) {
  
  
  return "selected";}

function program13(depth0,data) {
  
  
  return "disabled";}

function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span>";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		";
  return buffer;}

  buffer += "<th class=\"";
  foundHelper = helpers.labelCss;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelCss; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isBarChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isTableOfBarView;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isByDomain;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		";
  stack1 = depth0.isDropDown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(15, program15, data),fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</th>";
  return buffer;}
);

// template --- tmpl-dataTable-tableTbody ---
Handlebars.templates['tmpl-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n		<td ";
  stack1 = depth0.combinationTD;
  stack2 = depth0.combineRowspan;
  foundHelper = helpers.gtAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, 1, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "gtAndTrue", stack2, 1, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.isAlignLeft;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isAlignCenter;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isBindData;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.showHoverBox;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = depth0.showHoverBox;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n		";
  stack1 = depth0.isBarChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(19, program19, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n	";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " rowspan=\"";
  foundHelper = helpers.combineRowspan;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.combineRowspan; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program4(depth0,data) {
  
  
  return "alignLeft";}

function program6(depth0,data) {
  
  
  return "alignCenter";}

function program8(depth0,data) {
  
  
  return "bindData";}

function program10(depth0,data) {
  
  
  return "showhover";}

function program12(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "data-name=\"";
  foundHelper = helpers.mailingName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-value=\"";
  foundHelper = helpers.hoverBoxVal;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.hoverBoxVal; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program14(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<div class=\"bar-chart\"  ";
  stack1 = depth0.value;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 90, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)}) : helperMissing.call(depth0, "lte", stack1, 90, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n		<div class=\"bar-percent\" >";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n		";
  return buffer;}
function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program17(depth0,data) {
  
  
  return "%";}

function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deliverabilityDomains", {hash:{},inverse:self.program(30, program30, data),fn:self.program(20, program20, data)}) : helperMissing.call(depth0, "equal", stack1, "deliverabilityDomains", {hash:{},inverse:self.program(30, program30, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = depth0.isDomianDrilldownAndOtherCheck;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(28, program28, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                	<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"mailingNameURL\">\n					";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</span>\n				";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a onclick=\"smr.showDomainDrillDownReport('#reports-container',smr.REPORT_TYPE.DOMAINDRILLDOWN,'";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "','";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n					";
  return buffer;}

function program26(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:sm.comp.tab.TabMgr.openTab('DOMAIN_DELIVERABILITY_DRILLDOWN','fromReportType=";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&startDate=";
  foundHelper = helpers.startDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&endDate=";
  foundHelper = helpers.endDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&domainName=";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n					";
  return buffer;}

function program28(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<span>";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n				";
  return buffer;}

function program30(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(31, program31, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.haveColor;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isFailureDetailCount;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(35, program35, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(35, program35, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isUseClassMailingNameURL;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(37, program37, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				";
  stack1 = depth0.isMailingName;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(57, program57, data),fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  stack1 = depth0.opens;
  stack2 = depth0.showOpen;
  foundHelper = helpers.bothTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(78, program78, data)}) : helperMissing.call(depth0, "bothTrue", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(78, program78, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program31(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program33(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"color:";
  foundHelper = helpers.columnColor;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnColor; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program35(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "class=\"failureDetailCount\" data-value=\"";
  foundHelper = helpers.failureType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.failureType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-category=\"";
  foundHelper = helpers.failureCategory;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.failureCategory; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program37(depth0,data) {
  
  
  return "class=\"mailingNameURL\"";}

function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = depth0.isBatchType;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(45, program45, data),fn:self.program(40, program40, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program40(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(43, program43, data),fn:self.program(41, program41, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program41(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:smr.showReport('#reports-container',smr.REPORT_TYPE.MAILINGDETAIL,'sectionMailingDetail',null,null,[301],'mailingDetail');\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}

function program43(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					 	<a href=\"javascript:sm.app.mailing.MailingMgr.showDetailReport(";
  foundHelper = helpers.mailingId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ",'','')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}

function program45(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(48, program48, data),fn:self.program(46, program46, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program46(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:smr.showReport('#reports-container',smr.REPORT_TYPE.MAILINGDETAIL,'sectionMailingDetail',null,null,[400],'mailingDetail');\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}

function program48(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:sm.app.mailing.MailingMgr.showDetailReport(";
  foundHelper = helpers.mailingId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ",";
  stack1 = depth0.startDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(51, program51, data),fn:self.program(49, program49, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ",";
  stack1 = depth0.endDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(55, program55, data),fn:self.program(53, program53, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ")\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}
function program49(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "'";
  foundHelper = helpers.startDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'";
  return buffer;}

function program51(depth0,data) {
  
  
  return "''";}

function program53(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "'";
  foundHelper = helpers.endDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'";
  return buffer;}

function program55(depth0,data) {
  
  
  return "''";}

function program57(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "null", {hash:{},inverse:self.program(76, program76, data),fn:self.program(58, program58, data)}) : helperMissing.call(depth0, "notEqual", stack1, "null", {hash:{},inverse:self.program(76, program76, data),fn:self.program(58, program58, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program58(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n						";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(59, program59, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  stack1 = depth0.isDomianDrilldown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(72, program72, data),fn:self.program(61, program61, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  stack1 = depth0.isRate;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(74, program74, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(74, program74, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program59(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program61(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "other", {hash:{},inverse:self.program(67, program67, data),fn:self.program(62, program62, data)}) : helperMissing.call(depth0, "notEqual", stack1, "other", {hash:{},inverse:self.program(67, program67, data),fn:self.program(62, program62, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program62(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		                        ";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(65, program65, data),fn:self.program(63, program63, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							";
  return buffer;}
function program63(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n									<a onclick=\"smr.showDomainDrillDownReport('#reports-container',smr.REPORT_TYPE.DOMAINDRILLDOWN,'";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "','";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n								";
  return buffer;}

function program65(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n									<a href=\"javascript:sm.comp.tab.TabMgr.openTab('DOMAIN_DELIVERABILITY_DRILLDOWN','fromReportType=";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&startDate=";
  foundHelper = helpers.startDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&endDate=";
  foundHelper = helpers.endDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&domainName=";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n								";
  return buffer;}

function program67(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n								";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "audience", {hash:{},inverse:self.program(70, program70, data),fn:self.program(68, program68, data)}) : helperMissing.call(depth0, "equal", stack1, "audience", {hash:{},inverse:self.program(70, program70, data),fn:self.program(68, program68, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		                	";
  return buffer;}
function program68(depth0,data) {
  
  
  return "\n		                            <span title=\"Messages Studio tracks statistics for the largest domains in the target. The remaining domains are grouped together under this entry.\">\n		                			    (not tracked)\n		                			</span>\n		                        ";}

function program70(depth0,data) {
  
  
  return "\n								    <span title=\"Message Studio tracks statistics by domain for a set of often mailed domain names. To change the list of domains that are tracked, please contact support\">\n									    (not tracked)\n								    </span>\n		                        ";}

function program72(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n						";
  return buffer;}

function program74(depth0,data) {
  
  
  return "%";}

function program76(depth0,data) {
  
  
  return "\n						-\n					";}

function program78(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"opens-rate\">";
  foundHelper = helpers.opens;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.opens; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%</div>";
  return buffer;}

  stack1 = depth0.isCombination;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-section-table-td-hover ---
Handlebars.templates['tmpl-section-table-td-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"hoverDiv\">\n	    <div class=\"topPart\">\n			<span class=\"titleLabel\">Mailing Name:</span><br>\n			<span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		</div>\n	    <div class=\"bottomPart\">\n	    	<span class=\"titleLabel\">Subject Line:</span><br>\n	    	<span>";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-dataTable-pagination ---
Handlebars.templates['tmpl-dataTable-pagination'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	<span class=\"goto\">\n		<span class=\"gotoBtn\">Go to:</span>\n		<input name=\"gotoPage\" type=\"text\" value=\"";
  foundHelper = helpers.pageNum;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.pageNum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n	</span>\n	";
  return buffer;}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

function program9(depth0,data) {
  
  
  return "selected";}

function program11(depth0,data) {
  
  
  return "selected";}

function program13(depth0,data) {
  
  
  return "selected";}

function program15(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n		<span class=\"nums\">\n			<span class=\"prevStart ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;&lt;</span>\n			<span class=\"prev ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;</span>\n			";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageNum;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, 1, stack1, 2, {hash:{},inverse:self.program(27, program27, data),fn:self.program(20, program20, data)}) : helperMissing.call(depth0, "equalOr", stack2, 1, stack1, 2, {hash:{},inverse:self.program(27, program27, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<span class=\"next ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(38, program38, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;</span>\n			<span class=\"nextEnd ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(40, program40, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;&gt;</span>\n		</span>\n	";
  return buffer;}
function program16(depth0,data) {
  
  
  return "action";}

function program18(depth0,data) {
  
  
  return "action";}

function program20(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(24, program24, data),fn:self.program(21, program21, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(24, program24, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " \n					";
  stack1 = depth0.pageNum;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 6, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)}) : helperMissing.call(depth0, "listNum", 1, 6, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n					";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)}) : helperMissing.call(depth0, "listNum", 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program25(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>  \n					";
  return buffer;}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.gtSum;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, 3, {hash:{},inverse:self.program(31, program31, data),fn:self.program(28, program28, data)}) : helperMissing.call(depth0, "gtSum", stack2, stack1, 3, {hash:{},inverse:self.program(31, program31, data),fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program28(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageNum;
  stack3 = depth0.pageNum;
  foundHelper = helpers.reListNumber;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, 2, stack2, 3, stack1, {hash:{},inverse:self.noop,fn:self.program(29, program29, data)}) : helperMissing.call(depth0, "reListNumber", stack3, 2, stack2, 3, stack1, {hash:{},inverse:self.noop,fn:self.program(29, program29, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program29(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n					";
  return buffer;}

function program31(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(35, program35, data),fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(35, program35, data),fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program32(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  stack3 = depth0.pageSize;
  foundHelper = helpers.reListNumber;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, 6, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(33, program33, data)}) : helperMissing.call(depth0, "reListNumber", stack3, 6, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program33(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}

function program35(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)}) : helperMissing.call(depth0, "listNum", 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program36(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}

function program38(depth0,data) {
  
  
  return "action";}

function program40(depth0,data) {
  
  
  return "action";}

  buffer += "<tr class=\"tfoot\">\n	<td class=\"pagination\" colspan=\"10\">\n	";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "gt", stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<span class=\"showRows\">\n		Show Rows\n		<select name=\"SMA-REPORT-PAGECOUNT pageCount\">\n		<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 15, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, 15, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">15</option>\n		<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 25, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, 25, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">25</option>\n		<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 50, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, 50, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">50</option>\n		<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "equal", stack1, 100, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">100</option>\n		<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 500, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "equal", stack1, 500, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">500</option>\n		<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "all", {hash:{},inverse:self.noop,fn:self.program(13, program13, data)}) : helperMissing.call(depth0, "equal", stack1, "all", {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">All</option>\n		</select>\n	</span>\n	<span class=\"info\">";
  foundHelper = helpers.startRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " - ";
  foundHelper = helpers.endRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " of ";
  foundHelper = helpers.sizeCount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sizeCount; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)}) : helperMissing.call(depth0, "gt", stack1, 1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-dateSelect ---
Handlebars.templates['tmpl-dateSelect'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"dateSelect\">\n		<div class=\"dateSelect-main\">\n			<div class=\"icos\">\n				<div class=\"icoDiv icoLeft\" data-action=\"prev\"><span class=\"ico ico-icoLeft\"></span></div>\n				<div class=\"icoDiv icoRight\" data-action=\"next\"><span class=\"ico ico-icoRight\"></span></div>\n			</div>\n			<div class=\"dateSelect-content\">\n				\n			</div>\n			<div class=\"dateSelect-buttons\">\n				<div class=\"button close\">Close</div>\n			</div>\n		</div>\n	</div>";}
);

// template --- tmpl-dateSelect-calendar ---
Handlebars.templates['tmpl-dateSelect-calendar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					<tr >\n						";
  stack1 = depth0.belforeLimitedDate;
  stack2 = depth0.week;
  foundHelper = helpers.eachDayWeek;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "eachDayWeek", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</tr>\n				";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							";
  stack1 = depth0.date;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(8, program8, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n								<td class=\"calendar-date ";
  stack1 = depth0.isGray;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.equalServerDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  foundHelper = helpers.formatDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.formatDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n									";
  foundHelper = helpers.dateVal;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dateVal; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n								</td>\n							";
  return buffer;}
function program4(depth0,data) {
  
  
  return "gray";}

function program6(depth0,data) {
  
  
  return "today";}

function program8(depth0,data) {
  
  
  return "\n								<td>\n									&nbsp;\n								</td>\n							";}

  buffer += "<div class=\"dateSelect-calendar\">\n		<div class=\"title\">\n			";
  foundHelper = helpers.monthLabel;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.monthLabel; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.year;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.year; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n		</div>\n		<table class=\"dateSelect-calendar-table\">\n			<thead>\n				<tr class=\"calendar-week\">\n					<th data-value=\"0\">S</th>\n					<th data-value=\"1\">M</th>\n					<th data-value=\"2\">T</th>\n					<th data-value=\"3\">W</th>\n					<th data-value=\"4\">T</th>\n					<th data-value=\"5\">F</th>\n					<th data-value=\"6\">S</th>\n				</tr>\n			</thead>\n			<tbody>\n				";
  stack1 = depth0.weeks;
  foundHelper = helpers.eachWeeks;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "eachWeeks", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</tbody>\n		</table>\n	</div>";
  return buffer;}
);

// template --- tmpl-drillDown ---
Handlebars.templates['tmpl-drillDown'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n					<div class=\"itemColumnLink\" data-value=\"Unsubscribe\">Total Unsubs</div>\n					<div class=\"itemColumnLink\" data-value=\"UniqUnsubscribe\">Unique Unsubs</div>\n					";}

function program3(depth0,data) {
  
  
  return "\n					<div class=\"itemColumnLink\" data-value=\"Delivered\">Delivered</div>\n					";}

function program5(depth0,data) {
  
  
  return "\n					<div class=\"itemColumnLink\" data-value=\"Conversions\">Conversions</div>\n					";}

  buffer += "<div id=\"drillDownDiv\" class=\"drillDownDiv\" style=\"right:";
  foundHelper = helpers.right;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.right; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;\">\n		<div class=\"drillDown-main\">\n			<div class=\"drillDown-header\">\n				Individual Records Drilldown\n			</div>\n			<div class=\"drillDown-content\">\n				<div class=\"drillDown-items\">\n					<div class=\"itemColumnLink\" data-value=\"Failure\">Failures</div>\n					<div class=\"itemColumnLink\" data-value=\"Invalid\">Invalid</div>\n					<div class=\"itemColumnLink\" data-value=\"Open\">Total Opens</div>\n					<div class=\"itemColumnLink\" data-value=\"UniqOpen\">Unique Opens</div>\n					<div class=\"itemColumnLink\" data-value=\"Click\">Total Clicks</div>\n					<div class=\"itemColumnLink\" data-value=\"UniqClick\">Unique Clicks</div>\n					\n					";
  stack1 = depth0.isNotTransactional;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					\n					<div class=\"itemColumnLink\" data-value=\"Complaint\">Total Complaints</div>\n					<div class=\"itemColumnLink\" data-value=\"UniqComplaint\">Unique Complaints</div>\n					\n					";
  stack1 = depth0.isShowDelivered;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					\n					";
  stack1 = depth0.conversionEnabled;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-exportPicker ---
Handlebars.templates['tmpl-exportPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"org\"/>Organization</div>\n					";}

  buffer += "<div class=\"exportPicker\" style=\"right:";
  foundHelper = helpers.right;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.right; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"exportPicker-header\">\n			<label>Excel Export</label>\n			<div class=\"ico icoDel\"></div>\n		</div>\n		<div class=\"exportPicker-main\">\n			<div class=\"column\">\n				<div class=\"column-header\">Metrics Categories</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"volume\"/>Volume</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"disengagement\"/>Dis-Engagement</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"engagement\"/>Engagement</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"failures\"/>Failures</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"ftaf\"/>FTAF</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"sharing\"/>Sharing</div>\n					<div class=\"item\">&nbsp;</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"links\"/>Links</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"deviceusage\"/>Device Usage</div>\n				</div>\n			</div>\n			<div class=\"column\">\n				<div class=\"column-header\">Breakdowns</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"none\"/>None</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"domain\"/>Domain</div>\n					";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<div class=\"item\">--- Mailing Based ---</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"mailing\"/>Mailing</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"campaign\"/>Campaign</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"program\"/>Program</div>\n					<div class=\"item\">--- Time Based ---</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"day\"/>Day</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"week\"/>Week</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"month\"/>Month</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"quarter\"/>Quarter</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"year\"/>Year</div>\n				</div>\n			</div>\n			<div class=\"column\">\n				<div class=\"column-header\">SubTotals</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"none\"/>None</div>\n					<div class=\"item\">--- Mailing Based ---</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"campaign\"/>Campaign</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"program\"/>Program</div>\n					<div class=\"item\">--- Time Based ---</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"day\"/>Day</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"week\"/>Week</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"month\"/>Month</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"quarter\"/>Quarter</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"year\"/>Year</div>\n				</div>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n		<div class=\"exportPicker-footer\">\n			<div class=\"btn export\">Export</div>\n			<div class=\"btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-exportPickerDeliverability ---
Handlebars.templates['tmpl-exportPickerDeliverability'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"org\"/>Organization</div>\n					";}

  buffer += "<div class=\"exportPicker\" style=\"right:";
  foundHelper = helpers.right;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.right; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"exportPicker-header\">\n			<label>Excel Export</label>\n			<div class=\"ico icoDel\"></div>\n		</div>\n		<div class=\"exportPicker-main\">\n			<div class=\"column\">\n				<div class=\"column-header\">Metrics Categories</div>\n				<div class=\"column-content\">\n					<!--<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"defers\"/>Defers</div>-->\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"failures\"/>Failures</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"failureRate\"/>Failure Rates</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"failureDetail\"/>Failure Detail</div>\n				</div>\n			</div>\n			<div class=\"column\">\n				<div class=\"column-header\">Breakdowns</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"none\"/>None</div>\n					";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"domain\"/>Domain</div>\n					<div class=\"item\">--- Sending Based ---</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"ip\"/>IP</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"vsg\"/>VSG</div>\n					<div class=\"item\">--- Time Based ---</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"day\"/>Day</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"week\"/>Week</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"month\"/>Month</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"quarter\"/>Quarter</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"year\"/>Year</div>\n				</div>\n			</div>\n			<div class=\"column\">\n				<div class=\"column-header\">SubTotals</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"none\"/>None</div>\n					<div class=\"item\">--- Time Based ---</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"day\"/>Day</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"week\"/>Week</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"month\"/>Month</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"quarter\"/>Quarter</div>\n					<div class=\"item\"><input name=\"subTotalBy\" type=\"radio\" value=\"year\"/>Year</div>\n				</div>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n		<div class=\"exportPicker-footer\">\n			<div class=\"btn export\">Export</div>\n			<div class=\"btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-exportPickerAudience ---
Handlebars.templates['tmpl-exportPickerAudience'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"addressLifetime\"/>Address Lifetime</div>\n					";}

  buffer += "<div class=\"exportPicker\" style=\"right:";
  foundHelper = helpers.right;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.right; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"exportPicker-header\">\n			<label>Excel Export</label>\n			<div class=\"ico icoDel\"></div>\n		</div>\n		<div class=\"exportPicker-main\">\n			<div class=\"column\">\n				<div class=\"column-header\">Metrics</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"size\"/>Size</div>\n					<div class=\"item\"><input name=\"reportSections\" type=\"checkbox\" value=\"domain\"/>By Domain</div>\n					";
  stack1 = depth0.dataSourceType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "ids", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "ids", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			</div>\n			<div class=\"column\" style=\"margin-left:100px;\">\n				<div class=\"column-header\">Breakdowns</div>\n				<div class=\"column-content\">\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"day\"/>Day</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"week\"/>Week</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"month\"/>Month</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"quarter\"/>Quarter</div>\n					<div class=\"item\"><input name=\"breakDownBy\" type=\"radio\" value=\"year\"/>Year</div>\n				</div>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n		<div class=\"exportPicker-footer\">\n			<div class=\"btn export\">Export</div>\n			<div class=\"btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-flipSwitch ---
Handlebars.templates['tmpl-flipSwitch'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"flipSwitch\" data-value=\"on\">\n		<div class=\"flipSwitch-buttons\">\n	        <div class=\"button leftButton\">\n	        </div>\n	        <div class=\"button rightButton disSel\">\n	        </div>\n        	<label class=\"text\"></label>\n		</div>\n	</div>";}
);

// template --- tmpl-ipandVSGPicker ---
Handlebars.templates['tmpl-ipandVSGPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"ipandVSGPicker  commonPicker old-picker\">\n		<div class=\"icoDiv resizeHandler\"></div>\n		<div class=\"ipandVSGPicker-top commonPicker-top new-close\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">";
  foundHelper = helpers.extTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.extTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"ipandVSGPicker-main commonPicker-main\">\n			<div class=\"SMA-REPORT-IPANDVAGPICKERHEADER ipandVSGPicker-header commonPicker-header\">\n				<div class=\"header-label\">\n					Select By:\n				</div>\n				<div class=\"smrTabs\">\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectVSGs\"/><span class=\"tagspan\" data-value=\"selectVSGs\">Mailing Server Groups</span>\n					</div>\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectIPs\"/><span class=\"tagspan\" data-value=\"selectIPs\">IPs</span>\n					</div>\n				</div>\n			</div>\n			<div class=\"ipandVSGPicker-content commonPicker-content\">\n				\n			</div>\n		</div>\n		<div class=\"ipandVSGPicker-bottom  commonPicker-bottom old-layout\">\n			<div class=\"SMA-REPORT-IPANDVAGPICKERDONEBUTTON btn done\">Done</div>\n			<div class=\"SMA-REPORT-IPANDVAGPICKERDONEBUTTON btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-ipandVSGPicker-mailingView ---
Handlebars.templates['tmpl-ipandVSGPicker-mailingView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"commonPicker-mailingView ipandVSGPicker-mailingView\">\n		<div class=\"tags\">\n			\n		</div>\n	</div>";}
);

// template --- tmpl-ipandVSGPicker-tag-selectVSGs ---
Handlebars.templates['tmpl-ipandVSGPicker-tag-selectVSGs'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							<span class=\"sub-field\"><input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" />Include Data from Sub-Organizations</span>\n							";
  return buffer;}
function program2(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

  buffer += "<div class=\"tag \" data-tag=\"selectVSGs\">\n		<div class=\"tag-content\">\n			<div class=\"commonPicker-selected ipandVSGPicker-selected\">\n				<div class=\"selectedMailingLable\">\n					<div class=\"label\">\n						<span class=\"count\">0</span> Mailing Server Group<span class=\"needS\">s</span> Selected\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n				";
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-ipandVSGPicker-limitData", "selectVSGs", {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-ipandVSGPicker-limitData", "selectVSGs", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"selectedMailingTable\">\n				\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Mailing Server Groups Available\n			</div>\n			<div class=\"SMA-REPORT-IPANDVAGPICKERFILTER commonPicker-filter ipandVSGPicker-filter\">\n				<div class=\"filter-label ipandVSGPicker-filter-label\">Filter by:</div>\n				<div class=\"filter-fields ipandVSGPicker-filter-fields\">\n					<div class=\"label-field\">\n						<div class=\"label left\">Name:</div>\n						<div class=\"field\">\n							<span class=\"sub-field name\">\n								<input name=\"name\" type=\"text\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n							";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-IPANDVAGPICKERTABLE ipandVSGPicker-table commonPicker-table\">\n				<div class=\"ipandVSGPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"vsgs\">\n						<thead>\n							<tr>\n								<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">Name</span></th>\n								<th class=\"sortable\" data-column=\"createdDate\"><span class=\"thSortName\">Created Date</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-ipandVSGPicker-tag-selectIPs ---
Handlebars.templates['tmpl-ipandVSGPicker-tag-selectIPs'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<div class=\"filter-label ipandVSGPicker-filter-label\">Filter by:</div>\n				<div class=\"filter-fields ipandVSGPicker-filter-fields\">\n					<div class=\"label-field\">\n						<div class=\"field\">\n							<span class=\"sub-field\"><input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" />Include Data from Sub-Organizations</span>\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n				";
  return buffer;}
function program2(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

  buffer += "<div class=\"tag \" data-tag=\"selectIPs\">\n		<div class=\"tag-content\">\n			<div class=\"commonPicker-selected ipandVSGPicker-selected\">\n				<div class=\"selectedMailingLable\">\n					<div class=\"label\">\n						<span class=\"count\">0</span> IP<span class=\"needS\">s</span> Selected\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n				";
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-ipandVSGPicker-limitData", "selectIPs", {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-ipandVSGPicker-limitData", "selectIPs", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"selectedMailingTable\">\n				\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> IPs Available\n			</div>\n			<div class=\"SMA-REPORT-IPANDVAGPICKERFILTER commonPicker-filter ipandVSGPicker-filter\">\n				";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			\n			<div class=\"SMA-REPORT-IPANDVAGPICKERTABLE ipandVSGPicker-table commonPicker-table\">\n				<div class=\"ipandVSGPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"ips\">\n						<thead>\n							<tr>\n								<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">IP</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-ipandVSGPicker-ip-table-tr ---
Handlebars.templates['tmpl-ipandVSGPicker-ip-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked";}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.ip;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.ip; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"first\">\n			<div><input type=\"checkbox\" ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"btnAction\"/></div>\n		</td>\n		<td>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-ipandVSGPicker-vsg-table-tr ---
Handlebars.templates['tmpl-ipandVSGPicker-vsg-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"first\">\n			<div><input type=\"checkbox\" ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"btnAction\"/></div>\n		</td>\n		<td ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td>";
  foundHelper = helpers.createdDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.createdDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-ipandVSGPicker-limitData ---
Handlebars.templates['tmpl-ipandVSGPicker-limitData'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"limitDataTo\">\n		<div class=\"limitDataToSec\">\n			<span class=\"spanTitle\">Use data from</span> \n		</div>\n		<div class=\"limitDataToSec\">\n			<select name=\"dateTypeSelect\">\n				<option value=\"inCustomDateRange\">In custom date range</option>\n				<option value=\"last7Days\">Last 7 days</option>\n				<option value=\"last30Days\">Last 30 days</option>\n				<option value=\"last60Days\">Last 60 days</option>\n				<option value=\"last90Days\">Last 90 days</option>\n				<option value=\"last180Days\">Last 180 days</option>\n			</select>\n		</div>\n		<div class=\"limitDataToSec\">\n			<span class=\"dateInputs\">\n				<label>from</label>\n				<input type=\"text\" name=\"startDate\" value=\"mm/dd/yy\"/>\n				<label>to</label>\n				<input type=\"text\" name=\"endDate\" value=\"mm/dd/yy\"/>\n			</span>\n			<br/>\n			<span class=\"message\"></span>\n		</div>\n		<div class=\"cb\"></div>\n	</div>";}
);

// template --- tmpl-mailingDetailPicker ---
Handlebars.templates['tmpl-mailingDetailPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"mailingDetailPicker commonPicker old-picker\">\n		<div class=\"icoDiv resizeHandler\"></div>\n		<div class=\"mailingDetailPicker-top commonPicker-top new-close\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">Select Mailing</div>\n		</div>\n		<div class=\"mailingDetailPicker-main commonPicker-main\">\n			<div class=\"mailingDetailPicker-content commonPicker-content notab\">\n				\n			</div>\n		</div>\n		<div class=\"mailingDetailPicker-bottom commonPicker-bottom\">\n			<div class=\"SMA-REPORT-MAILINGDETAILPICKERDONEBUTTON btn done\">Done</div>\n			<div class=\"SMA-REPORT-MAILINGDETAILPICKERCANCELBUTTON btn cancel\">Cancel</div>\n		</div>\n	</div>";}
);

// template --- tmpl-mailingDetailPicker-mailingView ---
Handlebars.templates['tmpl-mailingDetailPicker-mailingView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"commonPicker-mailingView mailingDetailPicker-mailingView\">\n		<div class=\"tags\">\n			\n		</div>\n	</div>";}
);

// template --- tmpl-mailingDetailPicker-tag-selectMailingDetails ---
Handlebars.templates['tmpl-mailingDetailPicker-tag-selectMailingDetails'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n										<option value=\"program\">Lifecycle Program</option>\n										";}

  buffer += "<div class=\"tag \" data-tag=\"selectMailingDetails\">\n		<div class=\"tag-content\">\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Mailings Available\n			</div>\n			<div class=\"SMA-REPORT-MAILINGDETAILPICKERFILTER commonPicker-filter mailingDetailPicker-filter\">\n				<div class=\"filter-label mailingDetailPicker-filter-label\">Filter by:</div>\n				<div class=\"filter-fields mailingDetailPicker-filter-fields\">\n					<div class=\"label-field\">\n							<div class=\"label right\">Launch Date</div>\n							<div class=\"field\">\n								<span class=\"sub-field\">\n									<select name=\"launchDate\" style=\"width:154px\">\n										<option value=\"today\" >Today</option>\n										<option value=\"yesterday\">Yesterday</option>\n										<option value=\"last30Days\" selected>Last 30 days</option>\n										<option value=\"last90Days\">Last 90 days</option>\n										<option value=\"last180Days\">Last 180 days</option>\n										<option value=\"last365Days\">Last 365 days</option>\n										<option value=\"all\">All</option>\n									</select>\n								</span>\n								<span class=\"sub-field mt-sub-field\">Mailing Type</span>\n								<span class=\"sub-field\">\n									<select name=\"mailingType\" class=\"mt-select\">\n										<option value=\"all\" selected>All</option>\n										<option value=\"onetime\">One Time</option>\n										<option value=\"recurring\">Recurring</option>\n										<option value=\"abtest\">A/B Test</option>\n										<option value=\"transactional\">Transactional</option>\n										";
  stack1 = depth0.isProgramLicensed;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n										<option value=\"co\">Campaign Optimizer</option>\n									</select>\n								</span>\n							</div>\n					</div>\n					<div class=\"label-field\">\n						<div class=\"label right\">Name</div>\n						<div class=\"field\">\n							<span class=\"sub-field name float-left\">\n								<input name=\"name\" class=\"fi-text\" type=\"text\"/>\n								<span class=\"keyCancel ico ico-close\">&nbsp;&nbsp;&nbsp;&nbsp;</span>\n							</span>\n							<span class=\"sub-field float-left\"><input class=\"in-checkbox\" type=\"checkbox\" name=\"includeArchive\" />Include Archived Mailings</span>\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-MAILINGDETAILPICKERTABLE mailingDetailPicker-table commonPicker-table\">\n				<div class=\"mailingDetailPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"mailingDetail\">\n						<thead>\n							<tr>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">Name</span></th>\n								<th class=\"sortable\" data-column=\"campaign\"><span class=\"thSortName\">Campaign</span></th>\n								<th class=\"sortable\" data-column=\"type\"><span class=\"thSortName\">Type</span></th>\n								<th class=\"sortable\" data-column=\"launchDate\"><span class=\"thSortName\">Launch Date</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingDetailPicker-mailingDetail-table-tr ---
Handlebars.templates['tmpl-mailingDetailPicker-mailingDetail-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program5(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program11(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaignEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaignEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program13(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"  data-obj.type=\"";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " pointertr\">\n		<td class=\"btnAction\" ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"btnAction\" ";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"btnAction\">";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"btnAction\">";
  foundHelper = helpers.launchDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.launchDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-mailingPicker ---
Handlebars.templates['tmpl-mailingPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"mailingPicker commonPicker old-picker\">\n		<div class=\"icoDiv resizeHandler\"></div>\n		<div class=\"mailingPicker-top commonPicker-top old-close\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">Select Mailings / Campaigns ";
  foundHelper = helpers.extTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.extTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"mailingPicker-main commonPicker-main\">\n			<div class=\"SMA-REPORT-MAILINGPICKERHEADER mailingPicker-header commonPicker-header\">\n				<div class=\"header-label\">\n					Select By:\n				</div>\n				<div class=\"smrTabs\">\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectByLaunchDate\"/><span class=\"tagspan\" data-value=\"selectByLaunchDate\">Date</span>\n					</div>\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectMailings\"/><span class=\"tagspan\" data-value=\"selectMailings\">Mailings</span>\n					</div>\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectPrograms\"/><span class=\"tagspan\" data-value=\"selectPrograms\">Programs</span>\n					</div>\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectCampaigns\"/><span class=\"tagspan\" data-value=\"selectCampaigns\">Campaigns</span>\n					</div>\n					<div class=\"tab\">\n						<input name=\"tag\" type=\"radio\"  value=\"selectTags\"/><span class=\"tagspan\" data-value=\"selectTags\">Tags</span>\n					</div>\n				</div>\n			</div>\n			<div class=\"mailingPicker-content commonPicker-content\">\n				\n			</div>\n		</div>\n		<div class=\"mailingPicker-bottom commonPicker-bottom old-layout\">\n			<div class=\"SMA-REPORT-MAILINGPICKERDONEBUTTON btn done\">Done</div>\n			<div class=\"SMA-REPORT-MAILINGPICKERCANCELBUTTON btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingPicker-mailingView ---
Handlebars.templates['tmpl-mailingPicker-mailingView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"commonPicker-mailingView mailingPicker-mailingView\">\n		<div class=\"tags\">\n			\n		</div>\n	</div>";}
);

// template --- tmpl-mailingPicker-tag-selectByLaunchDate ---
Handlebars.templates['tmpl-mailingPicker-tag-selectByLaunchDate'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" class=\"includeSubOrganizations\" />\n						<label>Include Mailings from Sub-Organizations</label>\n						";
  return buffer;}
function program2(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

  buffer += "<div class=\"tag selectByLaunchDate\" data-tag=\"selectByLaunchDate\">\n		<div class=\"tag-content\">\n			<div class=\"SMA-REPORT-MAILINGPICKERLAUNCHDATE launchDate-area\">\n				<div>\n					<div class=\"lblVal dateType\">\n						<label>All mailings:</label>\n						<select name=\"dateTypeSelect\">\n							<option value=\"inCustomDateRange\">In custom date range</option>\n							<option value=\"last30Days\" >Last 30 days</option>\n							<option value=\"last90Days\">Last 90 days</option>\n							<option value=\"last180Days\">Last 180 days</option>\n							<option value=\"last365Days\">Last 365 days</option>\n						</select>\n					</div>\n					<div class=\"lblVal date\">\n						<div class=\"dateInputs\">\n							<label>from</label>\n							<input type=\"text\" name=\"startDate\" value=\"mm/dd/yy\"/>\n							<label>to</label>\n							<input type=\"text\" name=\"endDate\" value=\"mm/dd/yy\"/>\n						</div>\n						<div class=\"message\">\n						</div>\n					</div>\n					<div class=\"lblVal includeArchive\">\n						<input type=\"checkbox\" name=\"includeArchive\" />\n						<label>Include Archived Mailings</label>\n						";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingPicker-tag-selectMailings ---
Handlebars.templates['tmpl-mailingPicker-tag-selectMailings'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-mailingPicker-limitData", "selectMailings", {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-mailingPicker-limitData", "selectMailings", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"label-field\">\n							<div class=\"label left\">Launch Date:</div>\n							<div class=\"field\">\n								<span class=\"sub-field\">\n									<select name=\"launchDate\" style=\"width:154px\">\n										<option value=\"today\" >Today</option>\n										<option value=\"yesterday\">Yesterday</option>\n										<option value=\"last7Days\">Last 7 days</option>\n										<option value=\"last30Days\" selected>Last 30 days</option>\n										<option value=\"last60Days\">Last 60 days</option>\n										<option value=\"last90Days\">Last 90 days</option>\n										<option value=\"last180Days\">Last 180 days</option>\n										<option value=\"last365Days\">Last 365 days</option>\n										<option value=\"all\">All</option>\n									</select>\n								</span>\n								";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</div>\n						</div>\n					";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n								<span class=\"sub-field\"><input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" class=\"includeSubOrganizations\" />Include Mailings from Sub-Organizations</span>\n								";
  return buffer;}
function program5(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

function program7(depth0,data) {
  
  
  return "\n							<span class=\"sub-field\"><input type=\"checkbox\" name=\"includeArchive\" />Include Archived Mailings</span>\n							";}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"field\">\n							<span class=\"sub-field\"><input type=\"checkbox\" name=\"includeArchive\" />Include Archived Mailings</span>\n							<span class=\"sub-field\"><input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" />Include Mailings from Sub-Organizations</span>\n						</div>\n						";
  return buffer;}
function program10(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

function program12(depth0,data) {
  
  
  return "\n								<th class=\"sortable orga\" data-column=\"organization\"><span class=\"thSortName\">Organization</span></th>\n								";}

  buffer += "<div class=\"tag \" data-tag=\"selectMailings\">\n		<div class=\"tag-content\">\n			<div class=\"mailingPicker-selected commonPicker-selected\">\n				<div class=\"selectedMailingLable\">\n					<div class=\"label\">\n						<span class=\"count\">0</span> Mailing<span class=\"needS\">s</span> Selected\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n				";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "transactional", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "transactional", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"selectedMailingTable\">\n				\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Mailings Available\n			</div>\n			<div class=\"SMA-REPORT-MAILINGPICKERFILTER commonPicker-filter mailingPicker-filter\">\n				<div class=\"filter-label mailingPicker-filter-label\">Filter By:</div>\n				<div class=\"filter-fields mailingPicker-filter-fields\">\n					";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "batch", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "batch", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<div class=\"label-field\">\n						<div class=\"label left\">Name:</div>\n						<div class=\"field\">\n							<span class=\"sub-field name\">\n								<input name=\"name\" type=\"text\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n							";
  stack1 = depth0.hasSubOrganization;
  stack2 = depth0.reportType;
  foundHelper = helpers.equalOrUntrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "batch", stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equalOrUntrue", stack2, "batch", stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n						";
  stack1 = depth0.hasSubOrganization;
  stack2 = depth0.reportType;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "batch", stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "batch", stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-MAILINGPICKERTABLE commonPicker-table mailingPicker-table\">\n				<div class=\"mailingPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"mailing\">\n						<thead>\n							<tr>\n								<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">Name</span></th>\n								<th class=\"sortable\" data-column=\"campaign\"><span class=\"thSortName\">Campaign</span></th>\n								";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								<th class=\"sortable\" data-column=\"launchDate\"><span class=\"thSortName\">Launch Date</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingPicker-tag-selectPrograms ---
Handlebars.templates['tmpl-mailingPicker-tag-selectPrograms'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n							<span class=\"sub-field\"><input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" />Include Programs from Sub-Organizations</span>\n							";
  return buffer;}
function program2(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

function program4(depth0,data) {
  
  
  return "\n								<th class=\"sortable orga\" data-column=\"organization\"><span class=\"thSortName\">Organization</span></th>\n								";}

  buffer += "<div class=\"tag \" data-tag=\"selectPrograms\">\n		<div class=\"tag-content\">\n			<div class=\"mailingPicker-selected commonPicker-selected\">\n				<div class=\"selectedMailingLable\">\n					<div class=\"label\">\n						<span class=\"count\">0</span> Program<span class=\"needS\">s</span> Selected\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n				";
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-mailingPicker-limitData", "selectPrograms", {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-mailingPicker-limitData", "selectPrograms", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"selectedMailingTable\">\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Programs Available\n			</div>\n			<div class=\"SMA-REPORT-MAILINGPICKERFILTER commonPicker-filter mailingPicker-filter\">\n				<div class=\"filter-label mailingPicker-filter-label\">Filter By:</div>\n				<div class=\"filter-fields mailingPicker-filter-fields\">\n					<div class=\"label-field\">\n						<div class=\"label\">Filter:</div>\n						<div class=\"field\">\n							<span class=\"sub-field name\">\n								<input name=\"name\" style=\"margin-left:4px;\" type=\"text\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n						</div>\n						<div class=\"field\">\n							<span class=\"sub-field\"><input type=\"checkbox\" name=\"includeArchive\" />Include Archived Programs</span>\n							";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-MAILINGPICKERTABLE commonPicker-table mailingPicker-table\">\n				<div class=\"mailingPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"program\">\n						<thead>\n							<tr>\n								<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">Name</span></th>\n								<th class=\"sortable\" data-column=\"campaign\"><span class=\"thSortName\">Campaign</span></th>\n								";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								<th class=\"sortable\" data-column=\"launchDate\"><span class=\"thSortName\">Launch Date</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingPicker-tag-selectCampaigns ---
Handlebars.templates['tmpl-mailingPicker-tag-selectCampaigns'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"sub-field\">\n								<input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" />\n								Include ";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "program", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equal", stack1, "program", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " from Sub-Organizations\n							</span>\n							";
  return buffer;}
function program2(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

function program4(depth0,data) {
  
  
  return "Programs";}

function program6(depth0,data) {
  
  
  return "Mailings";}

  buffer += "<div class=\"tag \" data-tag=\"selectCampaigns\">\n		<div class=\"tag-content\">\n			<div class=\"mailingPicker-selected commonPicker-selected\">\n				<div class=\"selectedMailingLable\">\n					<div class=\"label\">\n						<span class=\"count\">0</span> Campaign<span class=\"needS\">s</span> Selected\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n				";
  stack1 = depth0.data;
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-mailingPicker-limitData", stack1, {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-mailingPicker-limitData", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"selectedMailingTable\">\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Campaigns Available\n			</div>\n			<div class=\"SMA-REPORT-MAILINGPICKERFILTER commonPicker-filter mailingPicker-filter\">\n				<div class=\"filter-label mailingPicker-filter-label\">Filter By:</div>\n				<div class=\"filter-fields mailingPicker-filter-fields\">\n					<div class=\"label-field\">\n						<div class=\"label\">Filter:</div>\n						<div class=\"field\">\n							<span class=\"sub-field name\">\n								<input name=\"name\" type=\"text\" style=\"margin-left:4px;\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n						</div>\n						<div class=\"field\">\n							<span class=\"sub-field\"><input type=\"checkbox\" name=\"includeArchive\" />Include Archived Mailings</span>\n							";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-MAILINGPICKERTABLE commonPicker-table mailingPicker-table\">\n				<div class=\"mailingPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"campaign\">\n						<thead>\n							<tr>\n								<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n								<th class=\"sortable\" data-column=\"campaign\"><span class=\"thSortName\">Name</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n			\n			\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingPicker-tag-selectTags ---
Handlebars.templates['tmpl-mailingPicker-tag-selectTags'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"sub-field\">\n								<input type=\"checkbox\" ";
  stack1 = depth0.isRootOrg;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " name=\"includeSubOrganizations\" />\n								Include ";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "program", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equal", stack1, "program", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " from Sub-Organizations\n							</span>\n							";
  return buffer;}
function program2(depth0,data) {
  
  
  return "checked=\"true\" disabled=\"true\"";}

function program4(depth0,data) {
  
  
  return "Programs";}

function program6(depth0,data) {
  
  
  return "Mailings";}

function program8(depth0,data) {
  
  
  return "\n								<th class=\"sortable orga\" data-column=\"organization\"><span class=\"thSortName\">Organization</span></th>\n								";}

  buffer += "<div class=\"tag \" data-tag=\"selectTags\">\n		<div class=\"tag-content\">\n			<div class=\"mailingPicker-selected commonPicker-selected\">\n				<div class=\"selectedMailingLable\">\n					<div class=\"label\">\n						<span class=\"count\">0</span> Tag<span class=\"needS\">s</span> Selected\n					</div>\n					<div class=\"cb\"></div>\n				</div>\n				";
  stack1 = depth0.data;
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-mailingPicker-limitData", stack1, {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-mailingPicker-limitData", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"selectedMailingTable\">\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Tags Available\n			</div>\n			<div class=\"SMA-REPORT-MAILINGPICKERFILTER commonPicker-filter mailingPicker-filter\">\n				<div class=\"filter-label mailingPicker-filter-label\">Filter By:</div>\n				<div class=\"filter-fields mailingPicker-filter-fields\">\n					<div class=\"label-field\">\n						<div class=\"label\">Filter:</div>\n						<div class=\"field\">\n							<span class=\"sub-field name\">\n								<input name=\"name\" type=\"text\" style=\"margin-left:4px;\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n						</div>\n						<div class=\"field\">\n							<span class=\"sub-field\"><input type=\"checkbox\" name=\"includeArchive\" />Include Archived Mailings</span>\n							";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-MAILINGPICKERTABLE commonPicker-table mailingPicker-table\">\n				<div class=\"mailingPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"tag\">\n						<thead>\n							<tr>\n								<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">Tag Name</span></th>\n								";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								<th data-column=\"tageValues\"><span class=\"thSortName\">Values</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n			\n			\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingPicker-table-tr ---
Handlebars.templates['tmpl-mailingPicker-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program13(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaignEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaignEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program15(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<td>";
  foundHelper = helpers.organization;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.organization; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n		";
  return buffer;}

function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " ";
  foundHelper = helpers.launchDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.launchDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program21(depth0,data) {
  
  
  return " Unlaunched ";}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"first\">\n			<div><input type=\"checkbox\" ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"btnAction\"/></div>\n		</td>\n		<td ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td ";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<td>";
  stack1 = depth0.launchDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-mailingPicker-campaign-table-tr ---
Handlebars.templates['tmpl-mailingPicker-campaign-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaignEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaignEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"first\">\n			<div><input type=\"checkbox\" ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"btnAction\"/></div>\n		</td>\n		<td ";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-mailingPicker-program-table-tr ---
Handlebars.templates['tmpl-mailingPicker-program-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program13(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaignEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaignEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program15(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.campaign;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.campaign; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<td>";
  foundHelper = helpers.organization;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.organization; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n		";
  return buffer;}

function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " ";
  foundHelper = helpers.launchDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.launchDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program21(depth0,data) {
  
  
  return " Unlaunched ";}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"first\">\n			<div><input type=\"checkbox\" ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"btnAction\"/></div>\n		</td>\n		<td ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td ";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.campaignEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<td>";
  stack1 = depth0.launchDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-mailingPicker-tag-table-tr ---
Handlebars.templates['tmpl-mailingPicker-tag-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<td>";
  foundHelper = helpers.organization;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.organization; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n		";
  return buffer;}

function program13(depth0,data) {
  
  
  return "showValues";}

function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"item\">\n						<input type=\"checkbox\" ";
  stack1 = depth0.selected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-name=\"";
  foundHelper = helpers.tagValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.tagValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" name=\"tagValue\"><span>";
  foundHelper = helpers.tagValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.tagValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n					</div>\n					";
  return buffer;}
function program16(depth0,data) {
  
  
  return "checked=\"checked\"";}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"first\">\n			<div><input type=\"checkbox\" ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"btnAction\"/></div>\n		</td>\n		<td ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  stack1 = depth0.hasSubOrganization;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<td >\n			<div class=\"tag-values\" data-value=\"0\">\n				<div data-value=\"0\" class=\"tags-value-select ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n					<span class=\"value-name\">0 items selected</span><span class=\"button-ico ico ico-downArrow\"></span>\n				</div>\n				<div class=\"tags-value-combox\">\n					<div class=\"item\">\n						<a href=\"javascript:void(0);\" class=\"select-all\"><span class=\"icon icon-ok\">&nbsp;</span>Select All</a><a href=\"javascript:void(0);\" class=\"unselect-all\"><span class=\"icon icon-remove\">&nbsp;</span>Unselect All</a>\n					</div>\n					";
  stack1 = depth0.tagValues;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			</div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-mailingPicker-limitData ---
Handlebars.templates['tmpl-mailingPicker-limitData'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "Limit to mailings launched between";}

function program3(depth0,data) {
  
  
  return "Limit data to";}

  buffer += "<div class=\"limitDataTo\">\n		<div class=\"limitDataToSec\">\n			<input type=\"checkbox\" name=\"limitDataTo\" />";
  stack1 = depth0.reportType;
  stack2 = depth0.tag;
  foundHelper = helpers.equalAnd;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "selectCampaigns", stack1, "batch", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equalAnd", stack2, "selectCampaigns", stack1, "batch", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n		</div>\n		<div class=\"limitDataToSec\">\n			<select name=\"dateTypeSelect\">\n				<option value=\"inCustomDateRange\">In custom date range</option>\n				<option value=\"last7Days\" >Last 7 days</option>\n				<option value=\"last30Days\" >Last 30 days</option>\n				<option value=\"last90Days\">Last 90 days</option>\n				<option value=\"last180Days\">Last 180 days</option>\n				<option value=\"last365Days\">Last 365 days</option>\n			</select>\n		</div>\n		<div class=\"limitDataToSec\">\n			<span class=\"dateInputs\">\n				<label>from</label>\n				<input type=\"text\" name=\"startDate\" value=\"mm/dd/yy\"/>\n				<label>to</label>\n				<input type=\"text\" name=\"endDate\" value=\"mm/dd/yy\"/>\n			</span>\n			<br/>\n			<span class=\"message\"></span>\n		</div>\n		<div class=\"cb\"></div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingSelector ---
Handlebars.templates['tmpl-mailingSelector'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

  buffer += "<div class=\"mailingSelector\" style=\"left:";
  foundHelper = helpers.left;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"mailingSelector-main\">\n			<div class=\"mailingSelector-header\">\n					";
  foundHelper = helpers.text;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n			</div>\n			<div class=\"mailingSelector-content\">\n				<div class=\"mailingSelector-items\">\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingSelector-item ---
Handlebars.templates['tmpl-mailingSelector-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item\">\n		";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n	</div>";
  return buffer;}
);

// template --- tmpl-overlay ---
Handlebars.templates['tmpl-overlay'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

  buffer += "<div class=\"overlay\" style=\"right:";
  foundHelper = helpers.right;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.right; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n        <h3><span>Link:Email Evoluation Conference</span><div class=\"icoDiv close\"><span class=\"ico ico-close\">&nbsp;</span></div></h3>\n        <p class=\"marginTop10\"><span>Click Rate:</span><span class=\"clickRate\">0.22%</span></p>\n        <p><span>Unique Clicks:</span><span class=\"uniqueClicks\">25</span></p>\n        <p><span>Total Clicks:</span><span class=\"totalClicks\">28</span></p>\n        <p class=\"marginTop20\">Sent 11364 times</p>\n        <p>In 46% of Message</p>\n	</div>";
  return buffer;}
);

// template --- tmpl-overviewOption ---
Handlebars.templates['tmpl-overviewOption'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

  buffer += "<div class=\"overviewOption\" style=\"left:";
  foundHelper = helpers.left;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"overviewOption-main\">\n			<div class=\"overviewOption-header\">\n				<span class=\"option-ico\">&nbsp;</span><span>Options</span><b class=\"arrowup\"></b>\n			</div>\n			<div class=\"overviewOption-content\">\n				<div class=\"overviewOption-select-tip\">\n					<span>Select Segment Groups to Display</span>\n				</div>\n				<div class=\"overviewOption-items\">\n					\n				</div>\n				<div class=\"overviewOption-handle\">\n					<div class=\"btn cancel\">Close</div>  \n					<div class=\"btn reset\">Reset</div> \n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-overviewOption-item ---
Handlebars.templates['tmpl-overviewOption-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked=\"checked\"";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  buffer += "<div class=\"item\">\n		<input type=\"checkbox\" name=\"overviewOptionColumn\" value=\"";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.checked;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n		<span ";
  stack1 = depth0.ellipsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.labelName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	</div>";
  return buffer;}
);

// template --- tmpl-pieChart ---
Handlebars.templates['tmpl-pieChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.smaclass;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.smaclass; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

function program9(depth0,data) {
  
  
  return "selected";}

function program11(depth0,data) {
  
  
  return "selected";}

function program13(depth0,data) {
  
  
  return "selected";}

  buffer += "<div class=\"";
  stack1 = depth0.smaclass;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " pieChart\">\n		<table class=\"pie-dataShow\" cellspacing=\"0\">\n			<tbody></tbody>\n		</table>\n		<div class=\"pieChartToolBar\" >\n			<div class=\"SMA-REPORT-SHOWONLY showOnly\">\n				<label>Show Only</label>\n				<select name='showOnly'>\n					<option value=\"5\" ";
  stack1 = depth0.maxPies;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 5, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, 5, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">5</option>\n					<option value=\"10\" ";
  stack1 = depth0.maxPies;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 10, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, 10, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">10</option>\n					<option value=\"15\" ";
  stack1 = depth0.maxPies;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 15, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, 15, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">15</option>\n					<option value=\"20\" ";
  stack1 = depth0.maxPies;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 20, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "equal", stack1, 20, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">20</option>\n					<option value=\"30\" ";
  stack1 = depth0.maxPies;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 30, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "equal", stack1, 30, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">30</option>\n					<option value=\"all\" ";
  stack1 = depth0.maxPies;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "all", {hash:{},inverse:self.noop,fn:self.program(13, program13, data)}) : helperMissing.call(depth0, "equal", stack1, "all", {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">All</option>\n				</select>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-pieChart-tableThead ---
Handlebars.templates['tmpl-pieChart-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "sortable";}

function program3(depth0,data) {
  
  
  return "DropDownTh";}

function program5(depth0,data) {
  
  
  return "pieChartTh";}

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n			<div class=\"dropDownSelectMetric\">\n				<select name='dropDownSelectMetric'>\n					";
  stack1 = depth0.label;
  stack2 = depth0.dropDownList;
  foundHelper = helpers.eachList;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)}) : helperMissing.call(depth0, "eachList", stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</select>\n			</div>\n		";
  return buffer;}
function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<option value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.isDefault;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isByDomain;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.labelName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n					";
  return buffer;}
function program9(depth0,data) {
  
  
  return "selected";}

function program11(depth0,data) {
  
  
  return "disabled";}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span>";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		";
  return buffer;}

  buffer += "<th class=\"";
  foundHelper = helpers.labelCss;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelCss; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isDropDown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isPieChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" >\n		";
  stack1 = depth0.isDropDown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(13, program13, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</th>";
  return buffer;}
);

// template --- tmpl-pieChart-tableTbody ---
Handlebars.templates['tmpl-pieChart-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n		<td>\n			<div class=\"indexNum\" data-target=\"target";
  foundHelper = helpers.index;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.index;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n			<div class=\"indexParColor\" style=\"background:";
  foundHelper = helpers.colorVal;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.colorVal; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"></div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-pieChart-tableTbodyEmpty ---
Handlebars.templates['tmpl-pieChart-tableTbodyEmpty'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n		<td class=\"noBottomBorder\"></td>\n	</tr>";}
);

// template --- tmpl-pieChart-tableTbody-NoData ---
Handlebars.templates['tmpl-pieChart-tableTbody-NoData'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n		<td class=\"nodata pieChartNoData\" colspan=\"4\">No data!</td>\n	</tr>";}
);

// template --- tmpl-pieChart-tableTbody-td ---
Handlebars.templates['tmpl-pieChart-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<td class=\"noBottomBorder\" ";
  stack1 = depth0.lengthVal;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " >\n		<div class=\"pie-chartDiv\"></div>\n	</td>\n	";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "rowspan=\"";
  foundHelper = helpers.lengthVal;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.lengthVal; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		";
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<td class=\"rate\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%</td>\n		";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<td class=\"";
  stack1 = depth0.isAlignLeft;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isUseClassMailingNameURL;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				";
  stack1 = depth0.isMailingName;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(32, program32, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</span>\n		</td>\n		";
  return buffer;}
function program8(depth0,data) {
  
  
  return "textAlignLeft";}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program12(depth0,data) {
  
  
  return "class=\"mailingNameURL\"";}

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = depth0.isBatchType;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(20, program20, data),fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:smr.showReport('#reports-container',smr.REPORT_TYPE.MAILINGDETAIL,'sectionMailingDetail',null,null,[301],'mailingDetail');\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					 	<a href=\"javascript:sm.app.mailing.MailingMgr.showDetailReport(";
  foundHelper = helpers.mailingId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ",'','')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:smr.showReport('#reports-container',smr.REPORT_TYPE.MAILINGDETAIL,'sectionMailingDetail',null,null,[400],'mailingDetail');\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}

function program23(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:sm.app.mailing.MailingMgr.showDetailReport(";
  foundHelper = helpers.mailingId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ",";
  stack1 = depth0.startDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(26, program26, data),fn:self.program(24, program24, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ",";
  stack1 = depth0.endDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(30, program30, data),fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ")\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n						";
  return buffer;}
function program24(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "'";
  foundHelper = helpers.startDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'";
  return buffer;}

function program26(depth0,data) {
  
  
  return "''";}

function program28(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "'";
  foundHelper = helpers.endDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'";
  return buffer;}

function program30(depth0,data) {
  
  
  return "''";}

function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  stack1 = depth0.isDomianDrilldown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(46, program46, data),fn:self.program(35, program35, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program33(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program35(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "other", {hash:{},inverse:self.program(41, program41, data),fn:self.program(36, program36, data)}) : helperMissing.call(depth0, "notEqual", stack1, "other", {hash:{},inverse:self.program(41, program41, data),fn:self.program(36, program36, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	                        ";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(39, program39, data),fn:self.program(37, program37, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program37(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n								<a onclick=\"smr.showDomainDrillDownReport('#reports-container',smr.REPORT_TYPE.DOMAINDRILLDOWN,'";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "','";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n							";
  return buffer;}

function program39(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n								<a href=\"javascript:sm.comp.tab.TabMgr.openTab('DOMAIN_DELIVERABILITY_DRILLDOWN','fromReportType=";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&startDate=";
  foundHelper = helpers.startDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&endDate=";
  foundHelper = helpers.endDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&domainName=";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n							";
  return buffer;}

function program41(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							";
  stack1 = depth0.reportType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "audience", {hash:{},inverse:self.program(44, program44, data),fn:self.program(42, program42, data)}) : helperMissing.call(depth0, "equal", stack1, "audience", {hash:{},inverse:self.program(44, program44, data),fn:self.program(42, program42, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	                	";
  return buffer;}
function program42(depth0,data) {
  
  
  return "\n	                        	<span title=\"Messages Studio tracks statistics for the largest domains in the target. The remaining domains are grouped together under this entry.\">\n	            			    	(not tracked)\n	            				</span>\n	                        ";}

function program44(depth0,data) {
  
  
  return "\n	                        	<span title=\"Message Studio tracks statistics by domain for a set of often mailed domain names. To change the list of domains that are tracked, please contact support\">\n									(not tracked)\n								</span>\n	                        ";}

function program46(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n					";
  return buffer;}

  stack1 = depth0.isPieChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-pieChart-tableTbody-tr ---
Handlebars.templates['tmpl-pieChart-tableTbody-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n		<td class=\"pieChartTable-data-table-td\" style=\"padding:0; vertical-align: top;border-bottom:none\" >\n			<table class=\"pieChartTable-data-table\" cellspacing=\"0\" style=\"border:0;\">\n				<thead>\n					<tr>\n						<th class=\"index\">Legend</th>\n					</tr>\n				</thead>\n				<tbody class=\"pieChartTable-data-tbody\">\n					\n				</tbody>\n			</table>\n		</td>\n		<td class=\"noBottomBorder pieChartTable-data-pieDiv\" style=\"padding:0; vertical-align: top;\">\n			<div class=\"pie-chartDiv-head\">&nbsp;</div>\n			<div class=\"pie-chartDiv\"></div>\n		</td>\n	</tr>";}
);

// template --- tmpl-pivotOption ---
Handlebars.templates['tmpl-pivotOption'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "width:";
  foundHelper = helpers.width;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.width; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px";
  return buffer;}

function program3(depth0,data) {
  
  
  return "disabled=\"disabled\"";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<option value=\"";
  foundHelper = helpers.sortType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sortType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.sortBy;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sortBy; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n						";
  return buffer;}

function program7(depth0,data) {
  
  
  return "checked=\"checked\"";}

  buffer += "<div class=\"pivotOption\" style=\"left:";
  foundHelper = helpers.left;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.left; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;top:";
  foundHelper = helpers.top;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.top; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "px;";
  stack1 = depth0.width;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<div class=\"pivotOption-main\">\n			<div class=\"pivotOption-header\">\n				<span class=\"option-ico\">&nbsp;</span><span>Options</span><b class=\"arrowup\"></b>\n			</div>\n			<div class=\"pivotOption-content\">\n				<div class=\"pivotOption-sort pivotOption-onlyShow\">\n					<span>Sort by</span>\n					<select ";
  stack1 = depth0.readonly;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n						";
  stack1 = depth0.sortByOptions;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</select>\n				</div>\n				<div class=\"pivotOption-algin pivotOption-onlyShow\">\n					<div class=\"pivotOption-algin-item\">\n						<input type=\"radio\" name=\"SortOrder\" value=\"Ascending\"/>\n						<span>Left to Right - Smallest / newest value at left</span>\n					</div>\n					<div class=\"pivotOption-algin-item\">\n						<input type=\"radio\" name=\"SortOrder\" value=\"Descending\"/>\n						<span>Right to Left - Smallest / newest value at right</span>\n					</div>\n				</div>\n				<div class=\"pivotOption-select-allMetric\">\n					<div class=\"item\">\n						<input type=\"checkbox\" name=\"fetchAllMetrics\" ";
  stack1 = depth0.fetchAllMetrics;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n						<span>Fetch All Metrics</span>\n					</div>\n				</div>\n				<div class=\"pivotOption-select-tip pivotOption-onlyShow\">\n					<span>Select Columns:</span>\n				</div>\n				<div class=\"pivotOption-select-all pivotOption-onlyShow\">\n					<div class=\"item\">\n						<div class=\"item-checkbox\">\n							<input type=\"checkbox\" name=\"pivotOptionColumn\" value=\"1\" checked=\"checked\"/>\n						</div>\n						<div class=\"item-line\"></div>\n						<div  class=\"item-span\">\n							<span>Column Name</span>\n						</div>\n					</div>\n				</div>\n				<div class=\"pivotOption-items pivotOption-onlyShow\">\n					\n				</div>\n				<div class=\"pivotOption-handle\">\n					<div class=\"btn done\">Done</div>\n					<div class=\"btn cancel\">Cancel</div>   \n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotOption-item ---
Handlebars.templates['tmpl-pivotOption-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked=\"checked\"";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  buffer += "<div class=\"item\">\n		<div class=\"item-checkbox\">\n			<input type=\"checkbox\" name=\"pivotOptionColumn\" value=\"";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.checked;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n		</div>\n		<div class=\"item-line\"></div>\n		<div  class=\"item-span\">\n			<span ";
  stack1 = depth0.ellipsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.labelName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotTable ---
Handlebars.templates['tmpl-pivotTable'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n										<a href=\"javascript:void(0);\" value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><span class=\"select-option-name\">";
  foundHelper = helpers.labelName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></a>\n									";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n										<a href=\"javascript:void(0);\" ";
  stack1 = depth0.datebased;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.hasSub;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><span class=\"select-option-name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"icon-chevron-right\">&nbsp;</span></a>\n									";
  return buffer;}
function program4(depth0,data) {
  
  
  return "class=\"datebased\"";}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "class=\"hasSub\" sub-name=\"";
  foundHelper = helpers.subMenuName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subMenuName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n								<a href=\"javascript:void(0);\" ";
  stack1 = depth0.datebased;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.hasSub;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><span class=\"select-option-name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"icon-chevron-right\">&nbsp;</span></a>\n							";
  return buffer;}
function program9(depth0,data) {
  
  
  return "class=\"datebased\"";}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "class=\"hasSub\" sub-name=\"";
  foundHelper = helpers.subMenuName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subMenuName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  buffer += "<div class=\"pivotTable\">\n			<div class=\"pivotHeader\">\n				<div class=\"pivotTableMetric\">\n					<span class=\"metric-title\">Pivot Report: New</span>\n				</div>\n			</div>\n			\n			<div class=\"cb\"></div>\n			<div class=\"pivotCondtionPanel pivot-right-left-SMR\">\n				<div class=\"breakdownPanelSMR pivot-left-SMR\">\n				\n					<div class=\"metric-partSMR\">\n						<div class=\"breakdown-title\"><span>Pivot Metric</span></div>\n						<div class=\"breakdown-content\">\n							<div class=\"breakdown-item only last\" style=\"z-index:5;\">\n								<span class=\"breakdown-item-drag-dot\" style=\"visibility:hidden;\">&nbsp;</span>\n								<div class=\"breakdown-item-part breakdown-type\">\n									<div class=\"breakdown-type-select\" data-value=\"0\">\n										<span class=\"metric-name\">Select</span><span class=\"button-ico ico ico-downArrow\"></span>\n									</div>\n									<div class=\"combox-option\" style=\"z-index:6\">\n									";
  stack1 = depth0.metricList;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n									</div>\n								</div>\n								<div class=\"cb\"></div>\n							</div>\n						</div><!--/breakdown-content-->\n					</div><!--/metric-partSMR-->\n					\n					<div class=\"breakdown-partSMR\">\n						<div class=\"breakdown-title\"><span>Breakdown by</span></div>\n						<div class=\"breakdown-content\">\n							<div class=\"breakdown-item only last\">\n								<span class=\"breakdown-item-drag-dot\">&nbsp;</span>\n								<div class=\"breakdown-item-part breakdown-type\">\n									<div class=\"breakdown-type-select\" data-value=\"0\">\n										<span class=\"metric-name\">Select</span><span class=\"button-ico ico ico-downArrow\"></span>\n									</div>\n									<div class=\"combox-option\">\n									";
  stack1 = depth0.breakdown;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n									</div>\n								</div>\n								<div class=\"breakdown-item-part breakdown-delete\"><a href=\"##1\" class=\"ic btnDelete\">&nbsp;</a></div>\n								<div class=\"breakdown-item-part breakdown-add\"><a href=\"##1\" class=\"ic btnAdd\">&nbsp;</a></div>\n								<div class=\"cb\"></div>\n							</div>\n						</div><!--/breakdown-content-->\n					</div><!--/breakdown-partSMR-->\n				</div><!--/breakdownPanelSMR-->\n\n				<div class=\"pivotPanelSMR pivot-right-SMR\">\n					<div class=\"pivot pivotByPanel\">\n						<span>Pivot by</span>\n						<div class=\"breakdown-item-part breakdown-type pivotby\">\n							<div class=\"breakdown-type-select\" data-value=\"0\">\n								<span class=\"metric-name\">---- Select</span><span class=\"button-ico ico ico-downArrow\"></span>\n							</div>\n							<div class=\"combox-option\">\n							";
  stack1 = depth0.pivotBys;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							</div>\n							<div class=\"combox-option-subsction\"></div>\n						</div>\n					</div>\n					<div class=\"pivot pivotOptionsPanel\">\n						<span class=\"option-ico\">&nbsp;</span><a href=\"##1\" class=\"option-label\">Options</a>\n					</div>\n					<div class=\"pivotColumnControlPanel\">\n						<span>Columns:</span>\n						<span class=\"column-start\">1</span>\n						<span>-</span>\n						<span class=\"column-end\">4</span>\n						<span>of</span>\n						<span class=\"column-total\">9</span>\n						<span class=\"column-control column-prev\">&nbsp;</span>\n						<span class=\"column-control column-next active\">&nbsp;</span>\n					</div>\n					<div class=\"cb\"></div>\n				</div><!--/pivotPanelSMR-->\n			</div><!--/pivotCondtionPanel-->\n\n			<div class=\"cb\"></div>\n			<div class=\"pivotRunReportPanel pivot-right-left-SMR\">\n				<div class=\"pivotRunReport\">\n					<div class=\"breakdownPanelButton pivot-left-SMR\"><div class=\"btn run-report\">Generate New Report</div></div>\n					<div class=\"pivotRunReportMessage pivot-right-SMR\"><span>To run a report, select settings(above) first.</span></div>\n				</div>\n				<div class=\"pivotUpdateReport\">\n					<span>Data no longer reflects report settings</span><div class=\"btn run-report\">Generate New Report</div>\n				</div>\n				<div class=\"pivotSaveReport\">\n					<div class=\"breakdownPanelButton pivot-left-SMR\"><div class=\"btn save-report\">Save Report</div></div>\n					<div class=\"pivotRunReportMessage pivot-right-SMR\"><span>Have not implement right now!</span></div>\n				</div>\n			</div><!--/pivotRunReportPanel-->\n			\n			<div class=\"cb\"></div>\n			\n			<div class=\"pivotDataPart\">\n				<div class=\"pivotSegmentTable\">\n					<table class=\"dataTable\">\n						<thead></thead>\n						<tbody></tbody>\n					</table>\n					<div class=\"pivot-table-bottom\">&nbsp;</div>\n				</div>\n\n				<div class=\"pivotDataTable\">\n					<table class=\"dataTable\">\n						<thead></thead>\n						<tbody></tbody>\n					</table>\n					<div class=\"pivot-table-bottom\">&nbsp;</div>\n				</div>\n				<div class=\"gray-out-pivot\"></div>\n			</div>\n			<div class=\"cb\"></div>\n			<div class=\"report-data-progressBar\">\n				<div class=\"aggregating-gray\"></div>\n				<div class=\"aggregating-data\">\n					<div class=\"aggregating-progress\">\n						<div class=\"aggregating-title\"><span>Searching activity detail and aggregating data</span></div>\n						<div class=\"aggregating-bar\"></div>\n					</div>\n				</div>\n			</div>\n	</div><!---/pivotTable----->";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-sub-combox-option ---
Handlebars.templates['tmpl-pivotTable-pivot-sub-combox-option'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<a href=\"javascript:void(0);\" class=\"";
  stack1 = depth0.datebased;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.hasSub;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isTagSelection;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = depth0.hasSub;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><span ";
  stack1 = depth0.ellipse;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.showTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"select-option-name\">";
  stack1 = depth0.ellipse;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span><span class=\"icon-chevron-right\">&nbsp;</span></a>\n	";
  return buffer;}
function program2(depth0,data) {
  
  
  return "datebased";}

function program4(depth0,data) {
  
  
  return "hasSub";}

function program6(depth0,data) {
  
  
  return "tagSelection";}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "sub-name=\"";
  foundHelper = helpers.subMenuName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subMenuName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "data-n=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "title=\"";
  stack1 = depth0.ellipse;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.showDepartment;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"";
  return buffer;}
function program13(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " Organization: ";
  foundHelper = helpers.department;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.department; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program17(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.ellipse;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.ellipse; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program19(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<div class=\"combox-option-subsction\">\n	";
  stack1 = depth0.subMenu;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-dataTableColoumn-pagination ---
Handlebars.templates['tmpl-pivotTable-pivot-dataTableColoumn-pagination'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "active";}

function program3(depth0,data) {
  
  
  return "active";}

  buffer += "<div>\n		<span>Columns:</span>\n		<span class=\"column-start\">";
  foundHelper = helpers.startRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		<span>-</span>\n		<span class=\"column-end\">";
  foundHelper = helpers.endRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		<span>of</span>\n		<span class=\"column-total\">";
  foundHelper = helpers.sizeCount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sizeCount; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		<span class=\"column-control column-prev ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&nbsp;</span>\n		<span class=\"column-control column-next ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&nbsp;</span>\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-filter-item ---
Handlebars.templates['tmpl-pivotTable-pivot-filter-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"filter-item last\">\n		";
  stack1 = depth0.dataVal;
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-pivotTable-pivot-filter-item-part", stack1, {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-pivotTable-pivot-filter-item-part", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<div class=\"filter-item-part filter-delete\"><a href=\"##1\" class=\"ic btnDelete\">&nbsp;</a></div>\n		<div class=\"filter-item-part filter-add\"><a href=\"##1\" class=\"ic btnAdd\">&nbsp;</a></div>\n		<div class=\"cb\"></div>\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-filter-item-part ---
Handlebars.templates['tmpl-pivotTable-pivot-filter-item-part'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "filter-type";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<option value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n			";
  return buffer;}

  buffer += "<div class=\"filter-item-part filter-prop ";
  stack1 = depth0.fp;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<select class=\"filter-prop-select\">\n			";
  stack1 = depth0.filter;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</select>\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-breakdown-item ---
Handlebars.templates['tmpl-pivotTable-pivot-breakdown-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<a href=\"javascript:void(0);\" ";
  stack1 = depth0.datebased;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.hasSub;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><span class=\"select-option-name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"icon-chevron-right\">&nbsp;</span></a>\n			";
  return buffer;}
function program2(depth0,data) {
  
  
  return "class=\"datebased\"";}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "class=\"hasSub\" sub-name=\"";
  foundHelper = helpers.subMenuName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subMenuName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  buffer += "<div class=\"breakdown-item last\">\n		<span class=\"breakdown-item-drag-dot\">&nbsp;</span>\n		<div class=\"breakdown-item-part breakdown-type\">\n			<div class=\"breakdown-type-select\" data-value=\"0\">\n				<span class=\"metric-name\">Select</span><span class=\"button-ico ico ico-downArrow\"></span>\n			</div>\n			<div class=\"combox-option\">\n			";
  stack1 = depth0.breakdown;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</div>\n		<div class=\"breakdown-item-part breakdown-delete\"><a href=\"##1\" class=\"ic btnDelete\">&nbsp;</a></div>\n		<div class=\"breakdown-item-part breakdown-add\"><a href=\"##1\" class=\"ic btnAdd\">&nbsp;</a></div>\n		<div class=\"cb\"></div>\n	</div>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-dataTable-tableThead ---
Handlebars.templates['tmpl-pivotTable-pivot-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return " sortable";}

function program3(depth0,data) {
  
  
  return " alginRight";}

function program5(depth0,data) {
  
  
  return "<div class=\"control\"><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></div>";}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program9(depth0,data) {
  
  
  return "floatRight";}

function program11(depth0,data) {
  
  
  return " %";}

function program13(depth0,data) {
  
  
  return "</span><div class=\"control\"><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></div>";}

function program15(depth0,data) {
  
  
  return "<div class=\"control\"><a href=\"##1\" class=\"delete-pivot-col\">&nbsp;&nbsp;</a></div>";}

  buffer += "<th class=\"tl";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.isAlginRight;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		";
  stack1 = depth0.hasControl;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<div ";
  stack1 = depth0.ellpsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"data-th-label ";
  stack1 = depth0.isAlginRight;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"><span class=\"th-label-value\">";
  foundHelper = helpers.ellpsisLabel;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.ellpsisLabel; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.showRateStuffix;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.hasControl;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n		";
  stack1 = depth0.hasControl;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</th>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-dataTable-tableTbody ---
Handlebars.templates['tmpl-pivotTable-pivot-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr index=\"";
  foundHelper = helpers.index;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"></tr>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-pivotTable-pivot-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "alginRight";}

function program3(depth0,data) {
  
  
  return "best";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var stack1;
  stack1 = depth0.ellpsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
function program10(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.ellpsis;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.ellpsis; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program12(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program14(depth0,data) {
  
  
  return "&nbsp;";}

function program16(depth0,data) {
  
  
  return "%";}

  buffer += "<td class=\"";
  stack1 = depth0.isAlginRight;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<span class=\"";
  stack1 = depth0.haveBestVaule;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = depth0.ellpsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.value;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(14, program14, data),fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n	</td>";
  return buffer;}
);

// template --- tmpl-pivotTable-pivot-dataTable-nodata ---
Handlebars.templates['tmpl-pivotTable-pivot-dataTable-nodata'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr><td class=\"nodata\" colspan=\"";
  foundHelper = helpers.colspan;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.colspan; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">No Data!</td></tr>";
  return buffer;}
);

// template --- tmpl-pivotTable-pagination ---
Handlebars.templates['tmpl-pivotTable-pagination'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n		<span class=\"nums\">\n			<span class=\"prevStart ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;&lt;</span>\n			<span class=\"prev ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;</span>\n			";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageNum;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, 1, stack1, 2, {hash:{},inverse:self.program(13, program13, data),fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equalOr", stack2, 1, stack1, 2, {hash:{},inverse:self.program(13, program13, data),fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<span class=\"next ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(24, program24, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;</span>\n			<span class=\"nextEnd ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;&gt;</span>\n		</span>\n	";
  return buffer;}
function program2(depth0,data) {
  
  
  return "action";}

function program4(depth0,data) {
  
  
  return "action";}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " \n					";
  stack1 = depth0.pageNum;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 6, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)}) : helperMissing.call(depth0, "listNum", 1, 6, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n					";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "listNum", 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>  \n					";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.gtSum;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, 3, {hash:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "gtSum", stack2, stack1, 3, {hash:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageNum;
  stack3 = depth0.pageNum;
  foundHelper = helpers.reListNumber;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, 2, stack2, 3, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)}) : helperMissing.call(depth0, "reListNumber", stack3, 2, stack2, 3, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n					";
  return buffer;}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(21, program21, data),fn:self.program(18, program18, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(21, program21, data),fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program18(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  stack3 = depth0.pageSize;
  foundHelper = helpers.reListNumber;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, 6, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)}) : helperMissing.call(depth0, "reListNumber", stack3, 6, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}

function program21(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)}) : helperMissing.call(depth0, "listNum", 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}

function program24(depth0,data) {
  
  
  return "action";}

function program26(depth0,data) {
  
  
  return "action";}

function program28(depth0,data) {
  
  
  return "selected";}

function program30(depth0,data) {
  
  
  return "selected";}

function program32(depth0,data) {
  
  
  return "selected";}

function program34(depth0,data) {
  
  
  return "selected";}

function program36(depth0,data) {
  
  
  return "selected";}

function program38(depth0,data) {
  
  
  return "selected";}

function program40(depth0,data) {
  
  
  return "selected";}

  buffer += "<div class=\"pivotTable-pagination\" data-pageNum=\"";
  foundHelper = helpers.pageNum;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.pageNum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n	<span class=\"info\">Rows: ";
  foundHelper = helpers.startRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " - ";
  foundHelper = helpers.endRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " of ";
  foundHelper = helpers.sizeCount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sizeCount; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "gt", stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<span class=\"showRows\">\n			<span class=\"show-label\">Show</span>\n			<select name=\"SMA-REPORT-PAGECOUNT pageCount\">\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 10, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)}) : helperMissing.call(depth0, "equal", stack1, 10, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">10</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 15, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)}) : helperMissing.call(depth0, "equal", stack1, 15, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">15</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 25, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "equal", stack1, 25, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">25</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 50, {hash:{},inverse:self.noop,fn:self.program(34, program34, data)}) : helperMissing.call(depth0, "equal", stack1, 50, {hash:{},inverse:self.noop,fn:self.program(34, program34, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">50</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)}) : helperMissing.call(depth0, "equal", stack1, 100, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">100</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 500, {hash:{},inverse:self.noop,fn:self.program(38, program38, data)}) : helperMissing.call(depth0, "equal", stack1, 500, {hash:{},inverse:self.noop,fn:self.program(38, program38, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">500</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "all", {hash:{},inverse:self.noop,fn:self.program(40, program40, data)}) : helperMissing.call(depth0, "equal", stack1, "all", {hash:{},inverse:self.noop,fn:self.program(40, program40, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">All</option>\n			</select>\n			<span class=\"rows-label\">Rows</span>\n		</span>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionMailingDetail ---
Handlebars.templates['tmpl-sectionMailingDetail'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"mailing-date\">";
  foundHelper = helpers.formatDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.formatDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n			";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"mailing-date\">";
  foundHelper = helpers.formatDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.formatDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n			";
  return buffer;}

function program5(depth0,data) {
  
  
  return "checked=\"true\"";}

function program7(depth0,data) {
  
  
  return "checked=\"true\"";}

function program9(depth0,data) {
  
  
  return "checked=\"true\"";}

function program11(depth0,data) {
  
  
  return "checked=\"checked\"";}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<input name=\"linkType\" type=\"radio\" ";
  stack1 = depth0.linkType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "conversions", {hash:{},inverse:self.noop,fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "equal", stack1, "conversions", {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"conversions\"><span data-value=\"conversions\">Conversions</span>\n						<input name=\"linkType\" type=\"radio\" ";
  stack1 = depth0.linkType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "both", {hash:{},inverse:self.noop,fn:self.program(16, program16, data)}) : helperMissing.call(depth0, "equal", stack1, "both", {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " value=\"both\"><span data-value=\"both\">Both</span>\n					";
  return buffer;}
function program14(depth0,data) {
  
  
  return "checked=\"checked\"";}

function program16(depth0,data) {
  
  
  return "checked=\"checked\"";}

  buffer += "<div class=\"sectionMailingDetail\">\n		\n		<div class=\"sectionMailingDetail-headerInfo\">\n			<span class=\"title\">Mailing Detail Report:</span> \n			<span class=\"mailing-name\">${mailingName}</span>\n			";
  stack1 = depth0.mailingType;
  stack2 = depth0.mailingType;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Transactional", stack1, "transactional", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equalOr", stack2, "Transactional", stack1, "transactional", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  stack1 = depth0.mailingType;
  stack2 = depth0.mailingType;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Program", stack1, "program", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equalOr", stack2, "Program", stack1, "program", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n\n		<div class=\"sectionMailingDetail-subjectLine\">\n			<span class=\"title\">Subject Line:</span> <span class=\"titleVal\"></span>\n		</div>\n		\n		<div class=\"sectionMailingDetail-headerSection\">\n			\n		</div>\n     \n	 	<div class=\"sectionMailingDetail-summaryConversionSection mailingDetailPart\">\n	 		<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Summary Statistics\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"sectionMailingDetail-summarySection\">\n					<div class=\"sectionTitle-sub\">Volume and Engagement</div>\n					<div class=\"statsSummaryItems\"></div>\n				</div>\n				\n				<div class=\"sectionMailingDetail-conversionSection\">\n					<div class=\"sectionTitle-sub\">Conversion</div>\n					<div class=\"statsSummaryItems\"></div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-summaryConversionSectionForTransactional mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Summary Statistics\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"sectionMailingDetail-summarySectionForTransactional\">\n					<div class=\"sectionTitle-sub\">\n						Volume and Engagement\n					</div>\n					<div class=\"sectionContent-sub\">\n						<div class=\"summarySectionForTransactionalTable\">\n							<table class=\"dataTableForTransactional\">\n							</table>\n						</div>\n					</div>\n				</div>\n				\n				<div class=\"sectionMailingDetail-conversionSectionForTransactional\">\n					<div class=\"sectionTitle-sub\">Conversion</div>\n					<div class=\"sectionContent-sub\">\n						<div class=\"conversionSectionForTransactionalTable\">\n							<table class=\"dataTableForTransactional\">\n							</table>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-mailingVSCampaignAveragesSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Mailing Performance vs Campaign Averages\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"campaignAveragesSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr>\n								<th class=\"name\">Metric</th>\n								<th class=\"rate\">Mailing</th>\n								<th class=\"rate\">Campaign</th>\n								<th class=\"arrow\"></th>\n								<th class=\"rate\">Change</th>\n								<th class=\"bar\"></th>\n							</tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-targetSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Target Performance\n				<span class=\"targetTypeSelect\">\n					View:\n					<input name=\"targetType\" type=\"radio\" value=\"count\" ";
  stack1 = depth0.targetType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "count", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, "count", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><span data-value=\"count\">Count</span>\n					<input name=\"targetType\" type=\"radio\" value=\"rate\" ";
  stack1 = depth0.targetType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "rate", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "rate", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><span data-value=\"rate\">% (Relative to Volume)</span>\n					<input name=\"targetType\" type=\"radio\" value=\"percent\" ";
  stack1 = depth0.targetType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "percent", {hash:{},inverse:self.noop,fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "equal", stack1, "percent", {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><span data-value=\"percent\">% (Of Total)</span>\n				</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"targetSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-failureSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Failure Analysis</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"failureSectionTable\">\n					<table class=\"dataTable\">\n						<tr>\n							<th class=\"name\">Failure Category</th>\n							<th class=\"rate\">Count</th>\n							<th class=\"rate\">Rate</th>\n							<th class=\"rate\">%</th>\n							<th class=\"bar\"></th>\n						</tr>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-linkSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Link Performance</span>\n				<span class=\"linkTypeSelect\">\n					View:\n					<input name=\"linkType\" type=\"radio\" value=\"clicks\" ";
  stack1 = depth0.linkType;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "clicks", {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "equal", stack1, "clicks", {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "><span data-value=\"clicks\">Clicks</span>\n					";
  stack1 = depth0.isConversionReportEnabledForMDR;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"linkSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-shareSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Share Performance\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"shareSectionSummaryAndTable\">\n					<div class=\"sectionSubTitle\">Summary Statistics</div>\n					<div class=\"statsSummaryItems\"></div>\n					\n					<div class=\"sectionSubTitle\">Share Offers Performance</div>\n					<div class=\"shareOffersSectionTable\">\n						<table class=\"dataTable\">\n							<thead>\n								<tr></tr>\n							</thead>\n							<tbody></tbody>\n						</table>\n					</div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-ftafSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Forward to a Friend Performance\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"ftafSectionTable\">\n					<div class=\"sectionSubTitle\">Summary Statistics</div>\n					<div class=\"statsSummaryItems\"></div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"hoverItemContainer\"></div>\n		<div class=\"linkHoverBoxContainer\"></div>\n	</div>";
  return buffer;}
);

// template --- tmpl-subjectLine ---
Handlebars.templates['tmpl-subjectLine'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span title=\"";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.subjectEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subjectEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>";
  return buffer;}
);

// template --- tmpl-headerSection ---
Handlebars.templates['tmpl-headerSection'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"headerSection-table\">\n		<table>\n			<tr>\n				<td class=\"labelTd first\">Campaign:&nbsp;</td>\n				<td class=\"value\" title=\"";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaign;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignEllipses;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Status:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.status;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Launched At:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.launchDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n			<tr>\n				<td class=\"labelTd first\">Mailing Type:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mailingType;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Report Generated:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.reportGenerated;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Elapsed Time:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.elapsedTime;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n		</table>\n	</div>";
  return buffer;}
);

// template --- tmpl-statistic-dataItem ---
Handlebars.templates['tmpl-statistic-dataItem'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "first";}

function program3(depth0,data) {
  
  
  return "dataItemSpace";}

function program5(depth0,data) {
  
  
  return "showhover";}

function program7(depth0,data) {
  
  
  return "haveRightRadius";}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  
  return "%";}

  buffer += "<div class=\"dataItem ";
  stack1 = depth0.isFirst;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isLeftSpace;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.isShowHover;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.haveRightRadius;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"mainPart\">\n			<div class=\"dataItem-value\">\n				";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"dataItem-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingVSCampaignAveragesSection-dataTable-tr ---
Handlebars.templates['tmpl-mailingVSCampaignAveragesSection-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n	<tr><td colspan=\"6\" class=\"noBorder\"></td></tr>\n	";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n		";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isForTransactional;
  stack2 = depth0.summaryObj;
  stack2 = stack2 == null || stack2 === false ? stack2 : stack2.label;
  foundHelper = helpers.equalAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Complaint Rate", stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equalAndTrue", stack2, "Complaint Rate", stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;}
function program4(depth0,data) {
  
  
  return "\n		<tr><td colspan=\"6\" class=\"noBorder\"></td></tr>\n		";}

function program6(depth0,data) {
  
  
  return "lastRowTr";}

function program8(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program10(depth0,data) {
  
  
  return "%";}

function program12(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program14(depth0,data) {
  
  
  return "%";}

function program16(depth0,data) {
  
  
  return "\n				<span class=\"noArrow\">-</span>\n			";}

function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"smr-carouselSpriteIco ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></span>\n			";
  return buffer;}
function program19(depth0,data) {
  
  
  return " smr-arrowUpLargeGreen ";}

function program21(depth0,data) {
  
  
  return " smr-arrowDownLargeRed ";}

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<span>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.changeVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</span>\n			";
  return buffer;}

function program25(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.changeVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</span>\n			";
  return buffer;}
function program26(depth0,data) {
  
  
  return "greenFont ";}

function program28(depth0,data) {
  
  
  return " redFont";}

function program30(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"leftBar\">\n						";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "reduce", {hash:{},inverse:self.program(36, program36, data),fn:self.program(31, program31, data)}) : helperMissing.call(depth0, "equal", stack1, "reduce", {hash:{},inverse:self.program(36, program36, data),fn:self.program(31, program31, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n					<div class=\"rightBar\">\n						";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(43, program43, data),fn:self.program(38, program38, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(43, program43, data),fn:self.program(38, program38, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n				";
  return buffer;}
function program31(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"worsenedBar\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.program(34, program34, data),fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "lte", stack1, 100, {hash:{},inverse:self.program(34, program34, data),fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>";
  return buffer;}
function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program34(depth0,data) {
  
  
  return "style=\"width:100%\"";}

function program36(depth0,data) {
  
  
  return "<div class=\"worsenedBarHide\"></div>";}

function program38(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"improvedBar\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)}) : helperMissing.call(depth0, "lte", stack1, 100, {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>";
  return buffer;}
function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program41(depth0,data) {
  
  
  return "style=\"width:100%\"";}

function program43(depth0,data) {
  
  
  return "<div class=\"improvedBarHide\"></div>";}

  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "Unsub Rate", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "Unsub Rate", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<tr class=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "RPM", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equal", stack1, "RPM", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"name\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isCurrencySymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mailingVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isCurrencySymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"arrow\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)}) : helperMissing.call(depth0, "equal", stack1, "unchange", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)}) : helperMissing.call(depth0, "equal", stack1, "unchange", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>\n			<div class=\"barDiv\">\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.noop,fn:self.program(30, program30, data)}) : helperMissing.call(depth0, "notEqual", stack1, "unchange", {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-failureSection-dataTable-tr ---
Handlebars.templates['tmpl-failureSection-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"normalBar\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 95, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "lte", stack1, 95, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program4(depth0,data) {
  
  
  return "style=\"width:95%\"";}

  buffer += "<tr>\n		<td class=\"name\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.count;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n		<td>\n			<div class=\"barDiv\">\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tableThead ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "sortable";}

function program3(depth0,data) {
  
  
  return "isBarTh";}

function program5(depth0,data) {
  
  
  return "isBarAndValueTh";}

  buffer += "<th class=\"";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.isBarChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isBarAndValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<span>";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	</th>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tableTbody ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-sectionContent-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "showhover";}

function program3(depth0,data) {
  
  
  return "lastRowTd";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "data-name=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-value=\"";
  foundHelper = helpers.linkUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.linkUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span class=\"barValue\">";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n			";
  stack1 = depth0.isTotalColumn;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program8(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program10(depth0,data) {
  
  
  return "%";}

function program12(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<div class=\"normalBarDiv\" >\n					";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			";
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<div class=\"normalBar\"  ";
  stack1 = depth0.value;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 90, {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "lte", stack1, 90, {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n					";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.value;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program17(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = depth0.isBarChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(27, program27, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program20(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"normalBar\"  ";
  stack1 = depth0.value;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 90, {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data)}) : helperMissing.call(depth0, "lte", stack1, 90, {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.value;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program25(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n					";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</span>\n			";
  return buffer;}
function program28(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program30(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program32(depth0,data) {
  
  
  return "%";}

  buffer += "<td class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.showHoverBox;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Total", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "Total", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = depth0.showHoverBox;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n		";
  stack1 = depth0.isBarAndValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(19, program19, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tr ---
Handlebars.templates['tmpl-sectionContent-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "bottomBorder";}

function program3(depth0,data) {
  
  
  return "showhover";}

function program5(depth0,data) {
  
  
  return "bottomBorder";}

function program7(depth0,data) {
  
  
  return "showhover";}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  
  return "%";}

function program13(depth0,data) {
  
  
  return "bottomBorder";}

  buffer += "<tr class=\"dataTableTr\">\n		<td class=\"name ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isHaveLine;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isShowHover;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td class=\"value ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isHaveLine;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isShowHover;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.value;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"sparkLine ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isHaveLine;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-report ---
Handlebars.templates['tmpl-report'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"smr report\" data-type=\"";
  foundHelper = helpers.reportType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n	   <div class=\"report-header\">\n	   </div>\n	   <div class=\"report-content\">\n	   		\n	   </div>\n	   <div class=\"report-data-loading\">\n          <div>\n          	<span class=\"loading-data-gif\">&nbsp;</span><span>Loading data...</span>\n		  </div>\n	   </div>\n	   <div class=\"report-data-progressBar\">\n			<div class=\"aggregating-gray\"></div>\n			<div class=\"aggregating-data\">\n				<div class=\"aggregating-progress\">\n					<div class=\"aggregating-title\"><span>Searching activity detail and aggregating data</span></div>\n					<div class=\"aggregating-bar\"></div>\n				</div>\n			</div>\n		<div>\n	</div>";
  return buffer;}
);

// template --- tmpl-reportHeader ---
Handlebars.templates['tmpl-reportHeader'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	   	  <div class=\"reportHeader-selectors\">\n	   	  	<div class=\"SMA-REPORT-MAILINGSELECTOR reportHeader-mailingSelector ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "ABTest", {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "equal", stack1, "ABTest", {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "audience", {hash:{},inverse:self.noop,fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equal", stack1, "audience", {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "mailingDetail", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equal", stack1, "mailingDetail", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		   	  	";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "campaignOverview", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data)}) : helperMissing.call(depth0, "equal", stack1, "campaignOverview", {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				<span class=\"date\"></span>\n			</div>\n            ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "domainDrillDown", {hash:{},inverse:self.program(32, program32, data),fn:self.program(30, program30, data)}) : helperMissing.call(depth0, "equal", stack1, "domainDrillDown", {hash:{},inverse:self.program(32, program32, data),fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	   	  </div>\n		";
  return buffer;}
function program2(depth0,data) {
  
  
  return "abtest-selector";}

function program4(depth0,data) {
  
  
  return "audience-selector";}

function program6(depth0,data) {
  
  
  return "mailingDetail-selector";}

function program8(depth0,data) {
  
  
  return "\n					<span class=\"count\">10</span> Campaigns\n				";}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deliverability", {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "equal", stack1, "deliverability", {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n				";
  return buffer;}
function program11(depth0,data) {
  
  
  return "\n						&nbsp; \n					";}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deliverabilityDomains", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "equal", stack1, "deliverabilityDomains", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program14(depth0,data) {
  
  
  return "\n							All VSGs\n						";}

function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "domainDrillDown", {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data)}) : helperMissing.call(depth0, "equal", stack1, "domainDrillDown", {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program17(depth0,data) {
  
  
  return "\n								<span class=\"count\">0</span> <span class=\"type\">Mailing</span><span class=\"needS\">s</span>\n							";}

function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n								";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "audience", {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data)}) : helperMissing.call(depth0, "equal", stack1, "audience", {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n							";
  return buffer;}
function program20(depth0,data) {
  
  
  return "\n									<span class=\"count\">Target</span><span class=\"type\">:&nbsp;</span><span class=\"needS\"></span>\n								";}

function program22(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n									";
  stack1 = depth0.type;
  stack2 = depth0.type;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "mailingDetail", stack1, "ABTest", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)}) : helperMissing.call(depth0, "equalOr", stack2, "mailingDetail", stack1, "ABTest", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n								";
  return buffer;}
function program23(depth0,data) {
  
  
  return "\n										<span class=\"needS\"></span>\n									";}

function program25(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n										";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data)}) : helperMissing.call(depth0, "equal", stack1, "userInsight", {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n									";
  return buffer;}
function program26(depth0,data) {
  
  
  return "\n											<span class=\"needS\"></span>\n										";}

function program28(depth0,data) {
  
  
  return "\n											<span class=\"count\">0</span> <span class=\"type\">Mailing</span><span class=\"needS\">s</span>\n										";}

function program30(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"domainName\" style=\"margin-left:35px;\">\n				<span class=\"text\">Domain: ";
  foundHelper = helpers.domainName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.domainName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " </span>\n			</div>\n			";
  return buffer;}

function program32(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"edit ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "mailingDetail", {hash:{},inverse:self.noop,fn:self.program(33, program33, data)}) : helperMissing.call(depth0, "equal", stack1, "mailingDetail", {hash:{},inverse:self.noop,fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				";
  stack1 = depth0.showEditIcon;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "true", {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data)}) : helperMissing.call(depth0, "equal", stack1, "true", {hash:{},inverse:self.program(37, program37, data),fn:self.program(35, program35, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n            ";
  return buffer;}
function program33(depth0,data) {
  
  
  return "editForMDR";}

function program35(depth0,data) {
  
  
  return "\n				<span class=\"pencilIco\"></span>\n				";}

function program37(depth0,data) {
  
  
  return "\n				(<span class=\"text\">Edit</span>)\n				";}

function program39(depth0,data) {
  
  
  return "\n		  <div class=\"reportHeader-period maildetail-period\" style=\"position:relative\">\n			<div class=\"export-print\"><span>Export as</span><span class=\"export\"></span></div>\n	   	  	<div class=\"date-arrow\"><div class=\"reportHeader-date maildetail-date\"></div><b class=\"arrowdown\"></b><div class=\"clear\"></div></div>\n			<div class=\"reportHeader-dateSelector\" style=\"margin-left:-50px;\">\n					<div class=\"date\">\n						<div class=\"dateInputs\">\n							<label class=\"date-range\">Date Range:</label>\n							<input type=\"text\" class=\"dateS\" name=\"startDate\" value=\"\"/>\n							<label class=\"date-to\">to</label>\n							<input type=\"text\" class=\"dateS\" name=\"endDate\" value=\"\"/>\n							<div class=\"btn apply dateSelectorDone\">Apply</div>\n						</div>\n					</div>\n					<span class=\"message\"></span>\n					<div class=\"reportHeaderDateSelect\"></div>\n			</div>\n	   	  </div>\n		";}

function program41(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deviceUsage", {hash:{},inverse:self.program(44, program44, data),fn:self.program(42, program42, data)}) : helperMissing.call(depth0, "equal", stack1, "deviceUsage", {hash:{},inverse:self.program(44, program44, data),fn:self.program(42, program42, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program42(depth0,data) {
  
  
  return "\n			  <div class=\"reportHeader-period maildetail-period deviceusage-date\" style=\"position:relative\">\n		   	  	<div class=\"date-arrow\"><div class=\"reportHeader-date maildetail-date\"></div><b class=\"arrowdown\"></b><div class=\"clear\"></div></div>\n				<div class=\"reportHeader-dateSelector\" style=\"margin-left:-20px;\">\n						<div class=\"date\">\n							<div class=\"dateInputs\">\n								<div class=\"selector\">\n									<label class=\"date-range\">Date Selector:</label>\n									<select name=\"dateTypeSelect\" class=\"dateTypeSelect\">\n										<option value=\"last7Days\" >Last 7 days</option>\n										<option value=\"last30Days\" >Last 30 days</option>\n										<option value=\"last60Days\">Last 60 days</option>\n										<option value=\"last180Days\">Last 180 days</option>\n										<option value=\"last365Days\">Last 365 days</option>\n										<option value=\"inCustomDateRange\">In custom date range</option>\n									</select>\n									<div class=\"btn apply dateSelectorDone\">Apply</div>\n								</div>\n								<div class=\"inputor\">\n									<label class=\"date-range\">Date Range:</label>\n									<input type=\"text\" class=\"dateS\" name=\"startDate\" value=\"\"/>\n									<label class=\"date-to\">to</label>\n									<input type=\"text\" class=\"dateS\" name=\"endDate\" value=\"\"/>\n								</div>\n							</div>\n						</div>\n						<span class=\"message\"></span>\n						<div class=\"reportHeaderDateSelect\"></div>\n				</div>\n		   	  </div>\n			";}

function program44(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			  ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.program(47, program47, data),fn:self.program(45, program45, data)}) : helperMissing.call(depth0, "equal", stack1, "userInsight", {hash:{},inverse:self.program(47, program47, data),fn:self.program(45, program45, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program45(depth0,data) {
  
  
  return "\n			  <div class=\"reportHeader-findUser\" style=\"position:relative\">\n			  	 <div class=\"find-sec user-page\">\n			  	 </div>\n		   	  	 <div class=\"find-sec\"><span class=\"find-user-label\">Find User</span><input placeholder=\"Recipient Id\" class=\"find-user-input\" /><span class=\"ico ico-find\">&nbsp;</span></div>\n		   	  </div>\n		   	  ";}

function program47(depth0,data) {
  
  
  return "\n		   	  <div class=\"reportHeader-period\" style=\"position:relative\">\n		   	  	 <div class=\"reportHeader-date\"></div>\n		   	  </div>\n		   	  ";}

function program49(depth0,data) {
  
  
  return "\n		<div class=\"reportHeader-info\">\n			<span class=\"info email\"></span>\n			<!--\n			<span class=\"split\">|</span>\n			<span class=\"info\">Date Added:&nbsp;<span class=\"dateAdded\"></span></span>\n			-->\n		</div>\n		";}

function program51(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<div class=\"reportHeader-nav\" ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "domainDrillDown", {hash:{},inverse:self.noop,fn:self.program(52, program52, data)}) : helperMissing.call(depth0, "equal", stack1, "domainDrillDown", {hash:{},inverse:self.noop,fn:self.program(52, program52, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.program(56, program56, data),fn:self.program(54, program54, data)}) : helperMissing.call(depth0, "equal", stack1, "userInsight", {hash:{},inverse:self.program(56, program56, data),fn:self.program(54, program54, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	   	</div>\n	   \n	   	";
  stack1 = depth0.type;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deviceUsage", {hash:{},inverse:self.program(79, program79, data),fn:self.program(70, program70, data)}) : helperMissing.call(depth0, "notEqual", stack1, "deviceUsage", {hash:{},inverse:self.program(79, program79, data),fn:self.program(70, program70, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n	   \n	   ";
  return buffer;}
function program52(depth0,data) {
  
  
  return "style=\"display:none\"";}

function program54(depth0,data) {
  
  
  return "\n				<div class=\"SMA-REPORT-USERINSIGHTOVERVIEW reportHeader-nav-item sel\" data-section=\"sectionUserInsightOverview\">Overview</div>\n				<div class=\"SMA-REPORT-EMAILS reportHeader-nav-item\" data-section=\"sectionEmails\">Emails</div>\n			";}

function program56(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		   		";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deliverability", {hash:{},inverse:self.program(59, program59, data),fn:self.program(57, program57, data)}) : helperMissing.call(depth0, "equal", stack1, "deliverability", {hash:{},inverse:self.program(59, program59, data),fn:self.program(57, program57, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program57(depth0,data) {
  
  
  return "\n					<div class=\"SMA-REPORT-DELIVERABILITYOVERVIEW reportHeader-nav-item sel\" data-section=\"sectionDeliverabilityOverview\">Overview</div>\n					<div class=\"SMA-REPORT-FAILURES reportHeader-nav-item\" data-section=\"sectionFailures\">Failures</div>\n					<!--<div class=\"reportHeader-nav-item\" data-section=\"sectionDefers\">Defers</div>-->\n					<div class=\"SMA-REPORT-TRENDS reportHeader-nav-item last\" data-section=\"sectionTrends\">Trends</div>\n				";}

function program59(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "audience", {hash:{},inverse:self.program(62, program62, data),fn:self.program(60, program60, data)}) : helperMissing.call(depth0, "equal", stack1, "audience", {hash:{},inverse:self.program(62, program62, data),fn:self.program(60, program60, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program60(depth0,data) {
  
  
  return "\n						<div class=\"SMA-REPORT-OVERVIEW reportHeader-nav-item sel\" data-section=\"sectionAudienceOverview\">Overview</div>\n						<div class=\"SMA-REPORT-ENGAGEMENT reportHeader-nav-item\" data-section=\"sectionEngagement\">Engagement</div>\n						<div class=\"SMA-REPORT-TRENDS reportHeader-nav-item last\" data-section=\"sectionTrends\">Trends</div>\n					";}

function program62(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deviceUsage", {hash:{},inverse:self.program(65, program65, data),fn:self.program(63, program63, data)}) : helperMissing.call(depth0, "equal", stack1, "deviceUsage", {hash:{},inverse:self.program(65, program65, data),fn:self.program(63, program63, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program63(depth0,data) {
  
  
  return "\n							<div class=\"SMA-REPORT-OVERVIEW reportHeader-nav-item sel\" data-section=\"sectionDeviceUsageOverview\">Overview</div>\n							<div class=\"SMA-REPORT-DAYOFWEEK reportHeader-nav-item\" data-section=\"sectionDayOfWeek\">Day of Week</div>\n						";}

function program65(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<div class=\"SMA-REPORT-OVERVIEW reportHeader-nav-item sel\" data-section=\"sectionOverview\">Overview</div>\n				   	  		<div class=\"SMA-REPORT-VOLUME reportHeader-nav-item\" data-section=\"sectionVolume\">Volume</div>\n				   	 		<div class=\"SMA-REPORT-ENGAGEMENT reportHeader-nav-item\" data-section=\"sectionEngagement\">Engagement</div>\n				   	  		<div class=\"SMA-REPORT-LINKS reportHeader-nav-item\" data-section=\"sectionLinks\">Links</div>\n				   	  		<div class=\"SMA-REPORT-DISENGAGEMENT reportHeader-nav-item\" data-section=\"sectionDisEngagement\">Dis-Engagement</div>\n					  		";
  stack1 = depth0.conversionEnabled;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(66, program66, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					  		<div class=\"SMA-REPORT-SHARING reportHeader-nav-item\" data-section=\"sectionSharing\">Sharing</div>\n				   	  		<div class=\"SMA-REPORT-FAILURES reportHeader-nav-item\" data-section=\"sectionFailures\">Failures</div>\n					 		<div class=\"SMA-REPORT-COMPARISON reportHeader-nav-item\" data-section=\"sectionComparison\">Comparison</div>\n							";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "program", {hash:{},inverse:self.noop,fn:self.program(68, program68, data)}) : helperMissing.call(depth0, "equal", stack1, "program", {hash:{},inverse:self.noop,fn:self.program(68, program68, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				   	  		<div class=\"SMA-REPORT-TRENDS reportHeader-nav-item last\" data-section=\"sectionTrends\">Trends</div>\n						";
  return buffer;}
function program66(depth0,data) {
  
  
  return "\n					  			<div class=\"SMA-REPORT-CONVERSIONS reportHeader-nav-item\" data-section=\"sectionConversions\">Conversions</div>\n					 		";}

function program68(depth0,data) {
  
  
  return "\n								<div class=\"SMA-REPORT-EVENTS reportHeader-nav-item\" data-section=\"sectionEvents\">Events</div>\n					   	  		<div class=\"SMA-REPORT-SMS reportHeader-nav-item\" data-section=\"sectionSMS\">SMS</div>\n							";}

function program70(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		   	<div class=\"reportHeader-toolbar ";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "domainDrillDown", {hash:{},inverse:self.noop,fn:self.program(71, program71, data)}) : helperMissing.call(depth0, "equal", stack1, "domainDrillDown", {hash:{},inverse:self.noop,fn:self.program(71, program71, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			   	<div class=\"reportHeader-toolItems\">\n			   	\n			   	    <div class=\"SMA-REPORT-SELECTDATE toolbar-item reportHeader-selectdate\">\n						<div class=\"reportHeader-period maildetail-period deviceusage-date\">\n				   	  		<label>Date Range</label> \n				   	  		<div class=\"date-arrow\"><div class=\"reportHeader-date maildetail-date\"></div><span class=\"arrowdown\"></span></div>\n							<div class=\"reportHeader-dateSelector\" style=\"display:none\">\n								<div class=\"date\">\n									<div class=\"dateInputs\">\n										<div class=\"selector\">\n											<label class=\"date-range\">Date Selector:</label>\n											<select name=\"dateTypeSelect\" class=\"dateTypeSelect\">\n												<option value='last30Days'>Last 30 days</option>\n												<option value='last60Days'>Last 60 days</option>\n												<option value='last90Days' selected='selected'>Last 90 days</option>\n												<option value='last180Days'>Last 180 days</option>\n												<option value='last365Days'>Last 365 days</option>\n												<option value='thisYear'>This year</option>\n												<option value='lastYear'>Last year</option>\n												<option value='inCustomDateRange'>Custom</option>\n											</select>\n											<div class=\"btn apply dateSelectorDone\">Apply</div>\n										</div>\n										<div class=\"inputor\">\n											<label class=\"date-range\">Date Range:</label>\n											<input type=\"text\" class=\"dateS\" name=\"startDate\" value=\"\"/>\n											<label class=\"date-to\">to</label>\n											<input type=\"text\" class=\"dateS\" name=\"endDate\" value=\"\"/>\n										</div>\n									</div>\n								</div>\n								<span class=\"message\"></span>\n								<div class=\"reportHeaderDateSelect\"></div>\n							</div>\n				   	   </div>\n					</div>\n					\n					<div class=\"SMA-REPORT-BREAKDOWN toolbar-item reportHeader-breakdown\">\n						<label>Breakdown by</label> <div class=\"toolbar-item-content reportHeader-breakdownCombobox\"></div>\n					</div>\n					 ";
  stack1 = depth0.type;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(73, program73, data)}) : helperMissing.call(depth0, "notEqual", stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(73, program73, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					<div class=\"SMA-REPORT-DEVICESELECTOR toolbar-item reportHeader-deviceSelector\">\n						<label>Show Device</label> \n						<div class=\"toolbar-item-content reportHeader-deviceSwitch\">\n							<input type=\"checkbox\" />\n						</div>\n					</div>\n					<div class=\"SMA-REPORT-DYNAMICCONTENT toolbar-item reportHeader-dynamicContentSelector\">\n						<label>Dynamic Content</label> \n						<div class=\"toolbar-item-content reportHeader-dynamicContentSwitch\">\n							<input type=\"checkbox\" />\n						</div>\n						<div class=\"iconDiv glyphicon icon-help\" title=\"When reporting for dynamic content, click rates are computed using the number of messages a link was inserted in.  The count will differ from the number of messages actually delivered with the link because message bounces are not deducted from the insertion count.\"></div>\n					</div>\n	\n					<div class=\"SMA-REPORT-CLINETSELECTOR toolbar-item reportHeader-clientSelector\">\n						<label>Show Client</label> \n						<div class=\"toolbar-item-content reportHeader-clientSwitch\">\n							<input type=\"checkbox\" />\n						</div>\n					</div>\n	\n					<div class=\"SMA-REPORT-UNIQUESTATSSELECTER toolbar-item reportHeader-uniqueStatsSelector\">\n						<label>Show Unique Stats</label>\n						<div class=\"toolbar-item-content reportHeader-uniqueStatsSwitch\">\n							<input type=\"checkbox\" />\n						</div>\n					</div>\n					<div class=\"SMA-REPORT-SUBSECTION toolbar-item reportHeader-subSection\">\n						<label>Sub-Section</label> <div class=\"toolbar-item-content reportHeader-subSectionCombobox\"></div>\n					</div>\n				</div>\n				<div class=\"reportHeader-toolItems-right\">\n					<div class=\"toolbar-item reportHeader-exportAndPrint\">\n						<div class=\"toolbar-item-content\">\n							<div class=\"SMA-REPORT-OPTIONS btn btnOptions\"  title=\"Options\"><span class=\"option-ico\">&nbsp;</span><a href=\"##1\" class=\"option-label\"><span>Options</span></a></div>\n							<div class=\"SMA-REPORT-EXPORT btn btnExport\"  title=\"Excel Export\"><span>Export</span></div>\n							<div class=\"SMA-REPORT-RECORDSDRILLDOWN btn btnPrint\"   title=\"Individual Records Drilldown\"><span class=\"ico ico-btnPrint\"></span></div>\n				   	    </div>\n			   	    </div>\n					";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(75, program75, data)}) : helperMissing.call(depth0, "equal", stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(75, program75, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			   	    ";
  stack1 = depth0.type;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(77, program77, data)}) : helperMissing.call(depth0, "notEqual", stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(77, program77, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n		   	</div>\n	   	";
  return buffer;}
function program71(depth0,data) {
  
  
  return "reportHeader-nav-top";}

function program73(depth0,data) {
  
  
  return "\n					<div class=\"SMA-REPORT-TOGGLE toolbar-item reportHeader-toggle\">\n						<label>View Rates</label> \n						<div class=\"toolbar-item-content reportHeader-rateSwitch\">\n							<input type=\"checkbox\" />\n						</div>\n					</div>\n					 ";}

function program75(depth0,data) {
  
  
  return "\n					<div class=\"SMA-REPORT-TOGGLE toolbar-item reportHeader-toggle\">\n						<label>View Rates</label> \n						<span class=\"toolbar-item-content reportHeader-rateSwitch\">\n							<input type=\"checkbox\" />\n						</span>\n					</div>\n					";}

function program77(depth0,data) {
  
  
  return "\n					<div class=\"toolbar-item reportHeader-viewSelector\">\n						<div class=\"toolbar-item-content\">\n							<div class=\"SMA-REPORT-OVERVIEWICON reportsHeader-viewButton summary sel\" data-view=\"summary\"><span class=\"ico ico-view-summary\" title=\"Overview\"></span></div>\n							<div class=\"SMA-REPORT-TABLEVIEWICON reportsHeader-viewButton table\" data-view=\"table\"><span class=\"ico ico-view-table\" title=\"Table View\"></span></div>\n							<div class=\"SMA-REPORT-PIECHARTICON reportsHeader-viewButton pie\" data-view=\"pie\"><span class=\"ico ico-view-pie\" title=\"Pie Chart\"></span></div>\n							<div class=\"SMA-REPORT-BARCHARTICON reportsHeader-viewButton bar\" data-view=\"bar\"><span class=\"ico ico-view-bar\" title=\"Bar Chart\"></span></div>\n							<div class=\"SMA-REPORT-PIVOTVIEWICON reportsHeader-viewButton pivot\" data-view=\"pivot\"><span class=\"ico ico-view-pivot\" title=\"Pivot Table\"></span></div>\n					   	</div>\n			   		</div>\n			   		";}

function program79(depth0,data) {
  
  
  return "\n	   		<div class=\"reportHeader-toolbar\">\n		   		<div class=\"reportHeader-toolItems\">\n		   			<div class=\"SMA-REPORT-SHOWCOUNT toolbar-item reportHeader-showCount\">\n						<label>Show Count</label> \n						<div class=\"toolbar-item-content reportHeader-showCountSwitch\">\n							<input type=\"checkbox\" />\n						</div>\n					</div>\n		   		</div>\n	   		</div>\n	   ";}

  buffer += "<div class=\"reportHeader\">\n	   <div class=\"reportHeader-top\">\n	   	  <div class=\"reportHeader-reportName\">\n	   	  	";
  foundHelper = helpers.reportTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.reportTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n		  </div>\n		  \n		";
  stack1 = depth0.isNotDUAndRA;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		\n		";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "mailingDetail", {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)}) : helperMissing.call(depth0, "equal", stack1, "mailingDetail", {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	   </div><!--/reportHeader-top-->\n\n		";
  stack1 = depth0.type;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(49, program49, data)}) : helperMissing.call(depth0, "equal", stack1, "userInsight", {hash:{},inverse:self.noop,fn:self.program(49, program49, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n	   ";
  stack1 = depth0.isNotThese;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(51, program51, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n	 \n	</div>";
  return buffer;}
);

// template --- tmpl-reportHeader-userPage ---
Handlebars.templates['tmpl-reportHeader-userPage'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	 <input class=\"current-num\" value=\"";
  foundHelper = helpers.currentNum;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.currentNum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" />\n  	 <span>of</span>\n  	 <span class=\"user-count\">";
  foundHelper = helpers.total;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.total; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n  	 <span class=\"user-control\">\n	  	 <span class=\"ico user-next";
  stack1 = depth0.haveNext;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&nbsp;</span>\n	  	 <span class=\"ico user-prev";
  stack1 = depth0.havePrev;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&nbsp;</span>\n  	 </span>\n  	 ";
  return buffer;}
function program2(depth0,data) {
  
  
  return " active";}

function program4(depth0,data) {
  
  
  return " active";}

  stack1 = depth0.hasControl;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-sectionABTest ---
Handlebars.templates['tmpl-sectionABTest'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionABTest\">\n		\n		<div class=\"sectionABTest-headerSection\">\n			\n		</div>\n     		\n		<div class=\"sectionABTest-summary-Chart\">\n			<div class=\"sectionContent\">\n				\n			</div>\n		</div>\n\n		\n		<div class=\"sectionABTest-gridSection\">\n			<div class=\"sectionTitle\">\n				<span class=\"showTypeSelect\">\n					Show:\n					<input name=\"showType\" type=\"radio\" value=\"count\"><span class=\"showType-count\">Counts</span>\n					<input name=\"showType\" type=\"radio\" value=\"percent\"><span class=\"showType-percent\">Percentages</span>\n				</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"targetSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"gridHoverBoxContainer\"></div>\n	</div>";}
);

// template --- tmpl-ABTest-headerSection ---
Handlebars.templates['tmpl-ABTest-headerSection'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<tr>\n				<td class=\"labelTd first\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.winnerCriteria;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.winnerCriteria;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">&nbsp;</td>\n				<td class=\"value\"></td>\n				<td class=\"labelTd\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.timeTillWinnerSelection;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.timeTillWinnerSelection;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n			";
  return buffer;}
function program2(depth0,data) {
  
  
  return "Winner Criteria:";}

function program4(depth0,data) {
  
  
  return "Time Till Winner Selection:";}

  buffer += "<div class=\"headerSection-table\">\n		<table>\n			<tr>\n				<td class=\"labelTd first\">Campaign:&nbsp;</td>\n				<td class=\"value longvalue\" title=\"";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaign;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignEllipses;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Status:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.status;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Test Started:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.testStartTime;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n			<tr>\n				<td class=\"labelTd first\">Test Type:&nbsp;</td>\n				<td class=\"value longvalue\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.testType;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Report Generated:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.reportGeneratedTime;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " <span class=\"refresh\"><span></td>\n				<td class=\"labelTd\">Elapsed Time:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.elapsedTime;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n			";
  stack1 = depth0.showWinner;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</table>\n	</div>";
  return buffer;}
);

// template --- tmpl-ABTest-dataTable-tableThead ---
Handlebars.templates['tmpl-ABTest-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "sortable";}

  buffer += "<th class=\"";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"  data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"th-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	</th>";
  return buffer;}
);

// template --- tmpl-ABTest-dataTable-tableTbody ---
Handlebars.templates['tmpl-ABTest-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr index=\"";
  foundHelper = helpers.index;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.index; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n	</tr>";
  return buffer;}
);

// template --- tmpl-ABTest-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-ABTest-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "showhover";}

function program3(depth0,data) {
  
  
  return "lastRowTd";}

function program5(depth0,data) {
  
  
  return "alignLeft";}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(15, program15, data),fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "Total", {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "notEqual", stack1, "Total", {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<a class=\"name-value\" href=\"javascript:smr.showReport('#reports-container',smr.REPORT_TYPE.MAILINGDETAIL,'sectionMailingDetail',null,null,[301],'mailingDetail');\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a><span class=\"iconspan glyphicon icon-info-sign\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n							";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<a class=\"name-value\" href=\"javascript:smr.showReport('#reports-container',smr.REPORT_TYPE.BATCH,null,null,[101]);\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n							";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "Total", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)}) : helperMissing.call(depth0, "notEqual", stack1, "Total", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n						";
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					 		<a class=\"name-value\" href=\"javascript:sm.app.mailing.MailingMgr.showDetailReport(";
  foundHelper = helpers.mailingId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ",'','')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a><span class=\"iconspan glyphicon icon-info-sign\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n							";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<a class=\"name-value\" href=\"javascript:sm.comp.tab.TabMgr.openTab('BATCH_MAILING_REPORT','";
  foundHelper = helpers.mailingIds;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingIds; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "');\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n							";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<span ";
  stack1 = depth0.haveBestVaule;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(23, program23, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n				";
  return buffer;}
function program21(depth0,data) {
  
  
  return "class=\"best\"";}

function program23(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForABTest;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForABTest; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program25(depth0,data) {
  
  
  return "%";}

  buffer += "<td class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.showHoverBox;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Total", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "Total", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.isAlignLeft;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				";
  stack1 = depth0.first;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "", {hash:{},inverse:self.program(20, program20, data),fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "notEqual", stack1, "", {hash:{},inverse:self.program(20, program20, data),fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</span>\n	</td>";
  return buffer;}
);

// template --- tmpl-gridSection-table-td-hover ---
Handlebars.templates['tmpl-gridSection-table-td-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.splitName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.splitName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program3(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.ellipse;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.ellipse; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program5(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.splitName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.splitName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<div class=\"hoverDiv\">\n		<div><span>Name:</span><span ";
  stack1 = depth0.ellipse;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.ellipse;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></div>\n		<div><span>Subject Line:</span><span>";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div>\n		<div><span class=\"tmp-span\">Template:</span><div class=\"template\"><img src=\"";
  foundHelper = helpers.splitImage;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.splitImage; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" /></div></div>\n	<div>";
  return buffer;}
);

// template --- tmpl-legend-item-hover ---
Handlebars.templates['tmpl-legend-item-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"legend-item-hover\">\n		<div></div>\n	<div>";}
);

// template --- tmpl-sectionAudienceOverview ---
Handlebars.templates['tmpl-sectionAudienceOverview'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionAudienceOverview\">\n	</div>";}
);

// template --- tmpl-sectionAudienceOverview-table ---
Handlebars.templates['tmpl-sectionAudienceOverview-table'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionAudienceOverviewTable\">\n		<div class=\"byTitle\">Overview by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionAudienceOverviewTable-table\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionAudienceOverview-bar ---
Handlebars.templates['tmpl-sectionAudienceOverview-bar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionAudienceOverviewBar\">\n		<div class=\"byTitle\">Overview by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionAudienceOverviewBar-table\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionAudienceOverview-pie ---
Handlebars.templates['tmpl-sectionAudienceOverview-pie'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionAudienceOverviewPie\">\n		<div class=\"byTitle\">Overview by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionAudienceOverviewPie-pie\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionAudienceOverviewSummary ---
Handlebars.templates['tmpl-sectionAudienceOverviewSummary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "selected";}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

  buffer += "<div class=\"sectionAudienceOverviewSummary\">\n		<div class=\"sectionAudienceOverviewSummary-chart\">\n			<div class=\"viewBy head\">\n				<span>View by </span>\n				<span class=\"SMA-REPORT-VIEWBYDAY action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"day\">Day</span>\n				<span class=\"SMA-REPORT-VIEWBYWEEK action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"week\">Week</span>\n				<span class=\"SMA-REPORT-VIEWBYMONTH action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"month\">Month</span>\n				<span class=\"SMA-REPORT-VIEWBYQUARTER action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"quarter\">Quarter</span>\n			</div>\n			<div class=\"chart-content\"></div>\n		</div>\n		\n		<div class=\"sectionAudienceOverviewSummary-bottom\">\n			<span class=\"spanTitle totalSize\">Total Size:<span></span></span>\n			<span class=\"spanTitle engagementBreakDown\">Engagement Breakdown</span>\n			<div class=\"sectionAudienceOverviewSummary-engagementBreakDown table-part\">\n				<table >\n					<tr>\n						<th class=\"name\">Segment</th>\n						<th class=\"count\">Count</th>\n						<th class=\"rate\">% change</th>\n						<th class=\"trends\">Count Trends</th>\n						<th class=\"rate\">% of total</th>\n						<th></th>\n					</tr>\n				</table>\n			</div>\n			<span class=\"spanTitle\">Top 5 ISPs</span>\n			<div class=\"sectionAudienceOverviewSummary-top5ISPs table-part\">\n				<table >\n					<tr>\n						<th class=\"name\">ISP Domain</th>\n						<th class=\"count\">Count</th>\n						<th class=\"rate\">% change</th>\n						<th class=\"trends\">Count Trends</th>\n						<th class=\"rate\">% of total</th>\n						<th></th>\n					</tr>\n				</table>\n			</div>\n			<span class=\"spanTitle addressLifetimeBreakDown\">Address Lifetime</span>\n			<div class=\"sectionAudienceOverviewSummary-addressLifetime table-part\">\n				<table >\n					<tr>\n						<th class=\"name bucket-name\">Segment</th>\n						<th class=\"name median\">Median</th>\n						<th class=\"distribution\">Distribution</th>\n						<th class=\"median-over-time\">Median over Time</th>\n					</tr>\n				</table>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionAudienceOverviewSummary-bottom-totalSize ---
Handlebars.templates['tmpl-sectionAudienceOverviewSummary-bottom-totalSize'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "+";}

function program3(depth0,data) {
  
  
  return "\n			<span class=\"smr-noArrowBlack\">-</span>\n		";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span class=\"smr-carouselSpriteIco ";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.arrowVal;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "up", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equal", stack1, "up", {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></span>\n		";
  return buffer;}
function program6(depth0,data) {
  
  
  return " smr-arrowUpLargeGreen ";}

function program8(depth0,data) {
  
  
  return " smr-arrowDownLargeRed ";}

  buffer += "<span>\n		";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.total;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " (";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentChange;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "gt", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentChange;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%)\n		";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.arrowVal;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "no", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "no", {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</span>";
  return buffer;}
);

// template --- tmpl-sectionAudienceOverviewSummary-bottom-tr ---
Handlebars.templates['tmpl-sectionAudienceOverviewSummary-bottom-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			   ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentChange;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "gt", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentChange;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n			   ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.arrowVal;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "no", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equal", stack1, "no", {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program2(depth0,data) {
  
  
  return "+";}

function program4(depth0,data) {
  
  
  return "\n				  <span class=\"smr-noArrowBlack\">-</span>\n			   ";}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				  <span class=\"smr-carouselSpriteIco ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.arrowVal;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "up", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "up", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></span>\n			   ";
  return buffer;}
function program7(depth0,data) {
  
  
  return " smr-arrowUpLargeGreen ";}

function program9(depth0,data) {
  
  
  return " smr-arrowDownLargeRed ";}

function program11(depth0,data) {
  
  
  return "\n			   <span class=\"smr-noArrowBlack\">-</span>\n			";}

  buffer += "<tr>\n		<td class=\"name first\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"count\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.count;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"rate\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentChange;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(11, program11, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"sparkLine ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.className;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"></td>\n		<td class=\"rate\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.totalPercent;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</td>\n		<td class=\"last\">\n			<div class=\"table-bar\">\n				<div class=\"bar\" style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.totalPercent;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"></div>\n			</div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionAudienceOverviewSummary-bottom-lifetime-tr ---
Handlebars.templates['tmpl-sectionAudienceOverviewSummary-bottom-lifetime-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.median;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n			";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n			   <span class=\"smr-noArrowBlack\">-</span>\n			";}

  buffer += "<tr>\n		<td class=\"name first\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"name\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.median;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"sparkBar ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.className;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"></td>\n		<td class=\"sparkLine ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.className;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"></td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionCampaignOverview ---
Handlebars.templates['tmpl-sectionCampaignOverview'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionCampaignOverview\">\n		<div class=\"sectionCampaignOverview-top\">\n			<div class=\"graphType\">\n				<div class=\"graphTypeList\"></div>\n			</div>\n		</div>\n      <div style=\"clear: both;\" class=\"sectionCampaignOverview-viewchart\">\n		<div class=\"viewBy head\">\n				<span>View by: </span>\n				<span class=\"SMA-REPORT-VIEWBYWEEK action selected\" data-view=\"week\">Week</span>\n				<span class=\"SMA-REPORT-VIEWBYMONTH action\" data-view=\"month\">Month</span>\n				<span class=\"SMA-REPORT-VIEWBYQUARTER action\" data-view=\"quarter\">Quarter</span>\n		</div>\n		\n		<div class=\"sectionCampaignOverview-chart\">\n\n		</div>\n     </div>\n		<div class=\"sectionCampaignOverview-bottom\">\n			<div class=\"statistic\">Overview Statistics by Campaign</div>\n			<div class=\"sectionCampaignOverview-bottom-table\">\n				<table >\n\n				</table>\n			</div>\n            <div class=\"menuContainer\"></div>\n            <div class=\"menuhoverContainer\"></div>\n		</div>\n	</div>";}
);

// template --- tmpl-sectionCampaignOverview-table-tr ---
Handlebars.templates['tmpl-sectionCampaignOverview-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "title='";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "'";
  return buffer;}

function program3(depth0,data) {
  
  var stack1;
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignNameEllipses;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  return escapeExpression(stack1);}

function program5(depth0,data) {
  
  var stack1;
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  return escapeExpression(stack1);}

function program7(depth0,data) {
  
  
  return "\n				<span class=\"smr-noArrowBlack\">-</span>\n			";}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"smr-carouselSpriteIco ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.openArrow;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "up", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data)}) : helperMissing.call(depth0, "equal", stack1, "up", {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></span>\n			";
  return buffer;}
function program10(depth0,data) {
  
  
  return " smr-arrowUpLargeGreen ";}

function program12(depth0,data) {
  
  
  return " smr-arrowDownLargeRed ";}

function program14(depth0,data) {
  
  
  return "\n				<span class=\"smr-noArrowBlack\">-</span>\n			";}

function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"smr-carouselSpriteIco ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickArrow;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "up", {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data)}) : helperMissing.call(depth0, "equal", stack1, "up", {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></span>\n			";
  return buffer;}
function program17(depth0,data) {
  
  
  return " smr-arrowUpLargeGreen ";}

function program19(depth0,data) {
  
  
  return " smr-arrowDownLargeRed ";}

function program21(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n            <td>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.conversionRate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n            <td>";
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.revenue;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n        ";
  return buffer;}

  buffer += "<tr >\n		<td class=\"name first\"><span class=\"metric\" data-cid ='";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignId;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "' ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignNameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignNameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></td>\n		<td>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.sent;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.deliverability;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"showhover\" data-name=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.openName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-value=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.open;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-rate=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.openRateVariance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><span>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.open;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.openArrow;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "no", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "no", {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"showhover\" data-name=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-value=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.click;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-rate=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickRateVariance;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><span>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.click;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span> \n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickArrow;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "no", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "equal", stack1, "no", {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.unsub;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n        ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.enabled;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionCampaignOverview-table-td-hover ---
Handlebars.templates['tmpl-sectionCampaignOverview-table-td-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "%";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<span class=\"hoverdate\">";
  foundHelper = helpers.startDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "&nbsp;-&nbsp;";
  foundHelper = helpers.endDate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endDate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>";
  return buffer;}

  buffer += "<div class=\"hoverDiv\">\n	    <div style=\"font-weight:bold;color\"#000\"><span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ": </span><span>";
  foundHelper = helpers.rate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.rate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.rate;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span></div>\n	    <div style=\"margin-top:5px\"><span>Prior Period: ";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>";
  stack1 = depth0.startDate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionCampaignOverview-table-head ---
Handlebars.templates['tmpl-sectionCampaignOverview-table-head'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "\n        <th data-column=\"conversionRate\"><span class=\"icos\">Conversion</span><span class=\"ico\"></span></th>\n        <th data-column=\"conversionRevenue\"><span class=\"icos\">Revenue</span><span class=\"ico\"></span></th>\n        ";}

  buffer += "<tr>\n        <th data-column=\"campaignName\"><span class=\"icos\">Campaign</span><span class=\"ico\"></span></th>\n        <th data-column=\"totalSent\"><span class=\"icos\">Sent</span><span class=\"ico\"></span></th>\n        <th data-column=\"deliveryRate\"><span class=\"icos\">Deliverability</span><span class=\"ico\"></span></th>\n        <th data-column=\"uniqueOpenRate\"><span class=\"icos\">Open</span><span class=\"ico\"></span></th>\n        <th data-column=\"uniqueClickRate\"><span class=\"icos\">Click</span><span class=\"ico\"></span></th>\n        <th data-column=\"uniqueUnSubsRate\"><span class=\"icos\">Unsub</span><span class=\"ico\"></span></th>\n        ";
  stack1 = depth0.enabled;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </tr>";
  return buffer;}
);

// template --- tmpl-sectionCampaignOverview-context-menu ---
Handlebars.templates['tmpl-sectionCampaignOverview-context-menu'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "\n            		<a onclick=\"smr.showReport('#reports-container',smr.REPORT_TYPE.BATCH)\">Batch</a>\n				";}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<a href=\"javascript:smr.campiagnOverviewOpenTab('BATCH_MAILING_REPORT','campaignIds=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&sectionName=sectionOverview&startDate=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.startDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&endDate=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.endDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "')\">\n            		Batch\n				</a>\n				";
  return buffer;}

function program5(depth0,data) {
  
  
  return "\n            		<a onclick=\"smr.showReport('#reports-container',smr.REPORT_TYPE.TRANSACTIONAL)\">Transactional</a>\n				";}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            	<a href=\"javascript:smr.campiagnOverviewOpenTab('TRANSACTIONAL_MAILING_REPORT','campaignIds=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&sectionName=sectionOverview&startDate=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.startDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&endDate=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.endDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "')\">\n            		Transactional\n				</a>\n				";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <li data-section=\"program\">\n            	";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(12, program12, data),fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</li>\n			";
  return buffer;}
function program10(depth0,data) {
  
  
  return "\n            		<a onclick=\"smr.showReport('#reports-container',smr.REPORT_TYPE.PROGRAM)\">Lifecycle Marketing</a>\n				";}

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            	<a href=\"javascript:smr.campiagnOverviewOpenTab('PROGRAM_REPORT','campaignIds=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&sectionName=sectionOverview&startDate=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.startDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&endDate=";
  stack1 = depth0.dataObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.endDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "')\">\n            		Lifecycle Marketing\n				</a>\n				";
  return buffer;}

  buffer += "<div class=\"contextMenu\">\n        <ul>\n            <li data-section=\"batch\">\n            	";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</li>\n            <li data-section=\"transactional\">\n            	";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</li>\n			";
  stack1 = depth0.isProgramLicensed;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </ul>\n    </div>";
  return buffer;}
);

// template --- tmpl-sectionComparison ---
Handlebars.templates['tmpl-sectionComparison'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionComparison\"> \n		<div class=\"groups\"></div>\n		<div class=\"sectionComparison-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionComparison-sectionComparisonSummary ---
Handlebars.templates['tmpl-sectionComparison-sectionComparisonSummary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"SMA-REPORT-COMPARISONSUMMARY sectionComparisonSummary\">\n		<div class=\"sectionComparisonSummary-title\">";
  foundHelper = helpers.setType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.setType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " Group Comparison</div>\n		<div class=\"sectionComparisonSummary-summary\">\n			<table>\n				<tr>\n					<th class=\"first\">\n						<div class=\"thName\">Metrics</div>\n					</th>\n					<th class=\"value\">\n						<div class=\"thName\">Group A</div>\n						<div class=\"line\"></div>\n						<div class=\"group groupA\" data-set=\"compareA\">\n							<div class=\"mailing\"><span class=\"count\">0</span><span class=\"type\">Mailing</span><span class=\"needS\">s</span><span class=\"pencilIco\"></span></div>\n							<div class=\"date\"></div>\n							<div class=\"cb\"></div>\n						</div>\n					</th>\n					<th class=\"value\">\n						<div class=\"thName\">Group B</div>\n						<div class=\"line\"></div>\n						<div class=\"group groupB\" data-set=\"compareB\">\n							<div class=\"mailing\"><span class=\"count\">0</span><span class=\"type\">Mailing</span><span class=\"needS\">s</span><span class=\"pencilIco\"></span></div>\n							<div class=\"date\"></div>\n							<div class=\"cb\"></div>\n						</div>\n					</th>\n					<th class=\"last\">\n						<div class=\"thName\">% Change</div>\n					</th>\n				</tr>\n			</table>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionComparison-sectionComparisonSummary-summary-tr ---
Handlebars.templates['tmpl-sectionComparison-sectionComparisonSummary-summary-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "%";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program7(depth0,data) {
  
  
  return "%";}

function program9(depth0,data) {
  
  
  return "\n			<td class=\"upOrDown last NAvalue\">\n				N/A\n			</td>\n		";}

function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<td class=\"upOrDown last ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.upOrDown;
  foundHelper = helpers.notUndefined;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)}) : helperMissing.call(depth0, "notUndefined", stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.upOrDown;
  foundHelper = helpers.notUndefined;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)}) : helperMissing.call(depth0, "notUndefined", stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.change;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "% ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.upOrDown;
  foundHelper = helpers.notUndefined;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{},inverse:self.program(25, program25, data),fn:self.program(20, program20, data)}) : helperMissing.call(depth0, "notUndefined", stack1, {hash:{},inverse:self.program(25, program25, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</td>\n		";
  return buffer;}
function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.upOrDown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;}
function program13(depth0,data) {
  
  
  return "redColor";}

function program15(depth0,data) {
  
  
  return "greenColor";}

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.upOrDown;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;}
function program18(depth0,data) {
  
  
  return "&nbsp;";}

function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.upOrDown;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;}
function program21(depth0,data) {
  
  
  return "<span class=\"smr-carouselSpriteIco  smr-arrowUpLargeGreen \"></span>";}

function program23(depth0,data) {
  
  
  return "<span class=\"smr-carouselSpriteIco  smr-arrowDownLargeRed \"></span>";}

function program25(depth0,data) {
  
  
  return "<span class=\"smr-carouselSpriteNone\">&nbsp;</span>";}

  buffer += "<tr class=\"";
  foundHelper = helpers.trCss;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.trCss; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<td class=\"first\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"value\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isCurrency;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.value;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"value\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isCurrency;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.value2;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isNAValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionConversions ---
Handlebars.templates['tmpl-sectionConversions'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionConversions\"> \n		<div class=\"byTitle\">Conversions by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionConversions-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionDayOfWeek ---
Handlebars.templates['tmpl-sectionDayOfWeek'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDayOfWeek\">\n		<div class=\"sectionDayOfWeek-openPart\">\n			<div class=\"title\">Opens</div>\n			<div class=\"openChart\"></div>\n			<div class=\"openTable\">\n				<div class=\"sectionContent\">\n					<div class=\"openSectionTable\">\n						<table class=\"dataTable\">\n							<thead>\n								<tr></tr>\n							</thead>\n							<tbody></tbody>\n						</table>\n					</div>\n				</div>\n			</div>\n		</div>\n		<div class=\"sectionDayOfWeek-clickPart\">\n			<div class=\"title\">Clicks</div>\n			<div class=\"clickChart\"></div>\n			<div class=\"clickTable\">\n				<div class=\"sectionContent\">\n					<div class=\"clickSectionTable\">\n						<table class=\"dataTable\">\n							<thead>\n								<tr></tr>\n							</thead>\n							<tbody></tbody>\n						</table>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>";}
);

// template --- tmpl-sectionDayOfWeek-sectionContent-dataTable-tableThead ---
Handlebars.templates['tmpl-sectionDayOfWeek-sectionContent-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<th data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n	</th>";
  return buffer;}
);

// template --- tmpl-sectionDayOfWeek-sectionContent-dataTable-tableTbody ---
Handlebars.templates['tmpl-sectionDayOfWeek-sectionContent-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-sectionDayOfWeek-sectionContent-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-sectionDayOfWeek-sectionContent-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "lastRowTd";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"indexParColor\" style=\"background:";
  foundHelper = helpers.colorVal;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.colorVal; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"></div>\n			<span class=\"deviceType\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n			<span>\n				";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</span>\n		";
  return buffer;}
function program6(depth0,data) {
  
  
  return "%";}

  buffer += "<td class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		";
  stack1 = depth0.first;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>";
  return buffer;}
);

// template --- tmpl-sectionDefers ---
Handlebars.templates['tmpl-sectionDefers'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDefers\"> \n		<div class=\"byTitle\">Defers by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionDefers-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionDefers-barChart ---
Handlebars.templates['tmpl-sectionDefers-barChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDefersBar\"> \n	</div>";}
);

// template --- tmpl-sectionDefers-pieChart ---
Handlebars.templates['tmpl-sectionDefers-pieChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDefersPie\"> \n	</div>";}
);

// template --- tmpl-sectionDefers-tableChart ---
Handlebars.templates['tmpl-sectionDefers-tableChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDefersTable\"> \n	</div>";}
);

// template --- tmpl-sectionDeliverabilityDomains ---
Handlebars.templates['tmpl-sectionDeliverabilityDomains'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDeliverabilityDomains\">  \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionDeliverabilityDomains-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionDeliverabilityDomains-tableChart ---
Handlebars.templates['tmpl-sectionDeliverabilityDomains-tableChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDeliverabilityDomainsTable\"> \n	</div>";}
);

// template --- tmpl-sectionDeliverabilityOverview ---
Handlebars.templates['tmpl-sectionDeliverabilityOverview'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDeliverabilityOverview\">\n	</div>";}
);

// template --- tmpl-sectionDeliverabilityOverview-summary ---
Handlebars.templates['tmpl-sectionDeliverabilityOverview-summary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "selected";}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

function program9(depth0,data) {
  
  
  return "\n						<a class=\"spanTitleByDomain\" onclick=\"smr.showReport('#reports-container',smr.REPORT_TYPE.DELIVERABILITYDOMAINS,'sectionDeliverabilityDomains');\">by Domain</a>\n					";}

function program11(depth0,data) {
  
  
  return "\n						<a class=\"spanTitleByDomain\"  href=\"javascript:sm.comp.tab.TabMgr.openTab('DELIVERABILITY_DOMAIN_FAILURE_REPORT')\">by Domain</a>\n					";}

  buffer += "<div class=\"sectionDeliverabilityOverviewSummary\">\n		<div class=\"sectionDeliverabilityOverviewSummary-chart\">\n			<div class=\"viewBy head\">\n				<span>View by </span>\n				<span class=\"SMA-REPORT-VIEWBYDAY action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"day\">Day</span>\n				<span class=\"SMA-REPORT-VIEWBYWEEK action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"week\">Week</span>\n				<span class=\"SMA-REPORT-VIEWBYMONTH action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"month\">Month</span>\n				<span class=\"SMA-REPORT-VIEWBYQUARTER action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"quarter\">Quarter</span>\n			</div>\n			<div class=\"chart-content\"></div>\n		</div>\n		\n		<div class=\"sectionDeliverabilityOverviewSummary-bottom\">\n			<div class=\"sectionDeliverabilityOverviewSummary-bottom-left\">\n				<span class=\"spanTitle\">Delivery Statistics</span>\n				<table>\n					<tr>\n						<th class=\"metric\">Metrics</th>\n						<th class=\"count\">Count</th>\n						<th class=\"rate\">Rate</th>\n						<th>Rate Trend</th>\n					</tr>\n				</table>\n			</div>\n			\n			<div class=\"sectionDeliverabilityOverviewSummary-bottom-right\">\n				<span class=\"spanTitle\">Failure Rates \n					";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(11, program11, data),fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</span>\n				<table>\n					<tr>\n						<th class=\"name\">Domain</th>\n						<th class=\"count\">Count</th>\n						<th class=\"rate\">Rate</th>\n					</tr>\n				</table>\n			</div>\n			\n			<div class=\"cb\"></div>\n		</div>\n		\n		<div class=\"sectionDeliverabilityOverviewSummary-bottom-link\">\n			<a href=\"javascript:sm.comp.tab.TabMgr.openTab('CLASSIC_DELIVERABILITY_REPORT')\">Classic Deliverability Reports</a>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionDeliverabilityOverview-summary-table-tr ---
Handlebars.templates['tmpl-sectionDeliverabilityOverview-summary-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            	";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<a class=\"spanTitleByDomain\" onclick=\"smr.showDomainDrillDownReport('#reports-container',smr.REPORT_TYPE.DOMAINDRILLDOWN,'deliverability','";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "')\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a>\n				";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<a class=\"spanTitleByDomain\" href=\"javascript:sm.comp.tab.TabMgr.openTab('DOMAIN_DELIVERABILITY_DRILLDOWN','fromReportType=deliverability&startDate=";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.startDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&endDate=";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.endDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "&domainName=";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "')\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a>\n				";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<a class=\"spanTitleByDomain\" onclick=\"smr.showReport('#reports-container',smr.REPORT_TYPE.DELIVERABILITYDOMAINS,'sectionDeliverabilityDomains');\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a>\n				";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					<a class=\"spanTitleByDomain\"  href=\"javascript:sm.comp.tab.TabMgr.openTab('DELIVERABILITY_DOMAIN_FAILURE_REPORT')\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a>\n				";
  return buffer;}

  buffer += "<tr>\n		<td class=\"name\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.domainName;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "other", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqual", stack1, "other", {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			\n		</td>\n		<td class=\"count alignRight\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.count;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"rate alignRight\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionDeliverabilityOverview-summary-leftTable-tr ---
Handlebars.templates['tmpl-sectionDeliverabilityOverview-summary-leftTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<span class=\"metric\" data-metric=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span>\n			";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<span ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.indentable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span>\n			";
  return buffer;}
function program4(depth0,data) {
  
  
  return "class=\"indentable\"";}

  buffer += "<tr>\n		<td class=\"name\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"alignRight\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.count;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"alignRight\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td class=\"rateTrend\">\n			<span class=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"></span>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionDeviceUsageOverview ---
Handlebars.templates['tmpl-sectionDeviceUsageOverview'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDeviceUsageOverview\">\n		<div class=\"sectionDeviceUsageOverview-top\">\n			<div class=\"graphType\">\n				<div class=\"graphTypeList\"></div>\n				<span class=\"graphTitle\">Trend</span>\n			</div>\n		</div>\n		<div style=\"clear: both;\" class=\"sectionDeviceUsageOverview-viewchart\">\n			<div class=\"viewBy head\">\n				<span>View by: </span>\n				<span class=\"SMA-REPORT-VIEWBYDAY action selected\" data-view=\"day\">Day</span>\n				<span class=\"SMA-REPORT-VIEWBYWEEK action\" data-view=\"week\">Week</span>\n				<span class=\"SMA-REPORT-VIEWBYMONTH action\" data-view=\"month\">Month</span>\n				<span class=\"SMA-REPORT-VIEWBYQUARTER action\" data-view=\"quarter\">Quarter</span>\n			</div>\n			\n			<div class=\"sectionDeviceUsageOverview-chart\"></div>\n		</div>\n		\n		<div class=\"sectionDeviceUsageOverview-overviewTable\">\n			<div class=\"sectionContent\">\n				<div class=\"overviewSectionTable\">\n					<table class=\"dataTable\">\n						<tr>\n							<th class=\"name\">Device Type</th>\n							<th class=\"centerAlignTh\" colspan=\"2\">Opens</th>\n							<th class=\"centerAlignTh\" colspan=\"2\">Clicks</th>\n							<th>Click-to-Open</th>\n						</tr>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionDeviceUsageOverview-phoneUsageSection deviceUsagePart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Phone Usage Breakdown</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"phoneUsageSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionDeviceUsageOverview-tabletUsageSection deviceUsagePart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Tablet Usage Breakdown</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"tabletUsageSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n	</div>";}
);

// template --- tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableThead ---
Handlebars.templates['tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "isBarAndValueTh";}

  buffer += "<th class=\"";
  stack1 = depth0.isBarAndValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n	</th>";
  return buffer;}
);

// template --- tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody ---
Handlebars.templates['tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-sectionDeviceUsageOverview-sectionContent-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "lastRowTd";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span class=\"barValue\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n			";
  stack1 = depth0.isTotalColumn;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program4(depth0,data) {
  
  
  return "%";}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<div class=\"normalBarDiv\" >\n					";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<div class=\"normalBar\"  ";
  stack1 = depth0.value;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 90, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data)}) : helperMissing.call(depth0, "lte", stack1, 90, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n					";
  return buffer;}
function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.value;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program11(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n			<span>\n				";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</span>\n		";
  return buffer;}
function program14(depth0,data) {
  
  
  return "%";}

  buffer += "<td class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		";
  stack1 = depth0.isBarAndValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(13, program13, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>";
  return buffer;}
);

// template --- tmpl-overviewTable-dataTable-tr ---
Handlebars.templates['tmpl-overviewTable-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<tr>\n		<td class=\"name\">\n			<div class=\"indexParColor\" style=\"background:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.colorVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"></div>\n			<span class=\"deviceType\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span>\n		</td>\n		<td class=\"rate\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.openShare;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.openCount;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td class=\"rate\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickShare;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickCount;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td class=\"rate\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickToOpen;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionDisEngagement ---
Handlebars.templates['tmpl-sectionDisEngagement'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDisEngagement\"> \n		<div class=\"byTitle\">Dis-Engagement by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionDisEngagement-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionDisEngagement-barChart ---
Handlebars.templates['tmpl-sectionDisEngagement-barChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDisEngagementBar\"> \n	</div>";}
);

// template --- tmpl-sectionDisEngagement-pieChart ---
Handlebars.templates['tmpl-sectionDisEngagement-pieChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDisEngagementPie\"> \n	</div>";}
);

// template --- tmpl-sectionDisEngagement-tableChart ---
Handlebars.templates['tmpl-sectionDisEngagement-tableChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDisEngagementTable\"> \n	</div>";}
);

// template --- tmpl-sectionDisEngagement-pivotChart ---
Handlebars.templates['tmpl-sectionDisEngagement-pivotChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEngagementPivot\">\n	</div>";}
);

// template --- tmpl-sectionDomainDrilldown ---
Handlebars.templates['tmpl-sectionDomainDrilldown'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDomainDrilldown\"> \n		<div class=\"byTitle\">Domain Drilldown by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionDomainDrilldown-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionDomainDrilldown-barChart ---
Handlebars.templates['tmpl-sectionDomainDrilldown-barChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDomainDrilldownBar\"> \n	</div>";}
);

// template --- tmpl-sectionDomainDrilldown-pieChart ---
Handlebars.templates['tmpl-sectionDomainDrilldown-pieChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDomainDrilldownPie\"> \n	</div>";}
);

// template --- tmpl-sectionDomainDrilldown-tableChart ---
Handlebars.templates['tmpl-sectionDomainDrilldown-tableChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionDomainDrilldownTable\"> \n	</div>";}
);

// template --- tmpl-sectionEmails ---
Handlebars.templates['tmpl-sectionEmails'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEmails\">  \n		\n		<div class=\"sectionEmails-summary\">\n			<div class=\"byTitle byTitle-table emailSummary\">Summary Statistics</div> \n			<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		</div> \n		\n		<div class=\"sectionEmails-tablePart\">\n		    <div class=\"sectionView\">\n				<span></span>\n			</div>\n			<div class=\"sectionTitle\">\n				<div class=\"collapsible exp email-filter\">[+] Filter </div>\n				<div class=\"collapsible col email-filter\">[-] Filter by: </div>\n				<div class=\"email-filter-fields\">\n					<table>\n						<tr>\n							<td class=\"td-right\" align=\"right\">Mailing Name</td><td class=\"td-left\">&nbsp;&nbsp;<input type=\"text\" class=\"mailingname\" name=\"mailingname\"/></td>\n							<td class=\"td-left\"><input type=\"checkbox\" class=\"cbox\" value=\"Opened\" name=\"opened\"><label>Opened</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" class=\"cbox\" value=\"Clicked\" name=\"clicked\"><label>Clicked</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"checkbox\" class=\"cbox\" value=\"Converted\" name=\"converted\"><label>Converted</label></td>\n						</tr>\n						<tr>\n							<td class=\"td-right\" align=\"right\">Date</td><td class=\"td-left\">&nbsp;&nbsp;<select class=\"dates\" name=\"dates\"><option value=\"after\" selected>after</option ><option value=\"on\">on</option><option value=\"before\">before</option></select>&nbsp;&nbsp;<input type=\"text\" name=\"dateValue\" class=\"dateValue\" value=\"   /  /    \"/></td>\n							<td class=\"td-left\">&nbsp;Revenue&nbsp;&nbsp;<select class=\"revenues\" name=\"revenues\"><option value=\"D\" selected>></option><option value=\"A\">=</option><option value=\"S\"><</option></select>&nbsp;<label class=\"isCurrency\"></label>&nbsp;<input type=\"text\" class=\"revenueValue\" name=\"revenueValue\"/><span class=\"message\"></span></td>\n							<td></td>\n						</tr>\n					</table>\n				</div>\n				<div class=\"btn reset resetBtn\">Reset</div>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"sectionEmailTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n	</div>";}
);

// template --- tmpl-sectionContent-dataTable-tableThead-emails ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableThead-emails'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "sortable";}

  buffer += "<th class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"th-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	</th>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tableTbody-emails ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody-emails'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-sectionContent-dataTable-tableTbody-td-emails ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody-td-emails'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		<td class=\"";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " drawType\">\n			";
  stack1 = depth0.value;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, true, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equal", stack1, true, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n	";
  return buffer;}
function program2(depth0,data) {
  
  
  return "lastRowTd";}

function program4(depth0,data) {
  
  
  return "\n			<div class=\"viewDraw\"></div>\n			";}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<td class=\"";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.textAlignLeft;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.textAlignCenter;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.haveColor;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.isMailingName;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isIcon;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				";
  stack1 = depth0.isMailingName;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(33, program33, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</span>\n		</td>\n	";
  return buffer;}
function program7(depth0,data) {
  
  
  return "lastRowTd";}

function program9(depth0,data) {
  
  
  return "textAlignLeft";}

function program11(depth0,data) {
  
  
  return "textAlignCenter";}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"color:";
  foundHelper = helpers.columnColor;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnColor; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program17(depth0,data) {
  
  
  return "class=\"mailingNameURL\"";}

function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "data-name=\"";
  foundHelper = helpers.mailingName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program21(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:void(0);\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n					";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:sm.comp.list.ListMgr.displayOnListPage(";
  stack1 = depth0.useProgramId;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(27, program27, data),fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ",'";
  stack1 = depth0.useProgramId;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(31, program31, data),fn:self.program(29, program29, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "','";
  foundHelper = helpers.assetType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.assetType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n					";
  return buffer;}
function program25(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.programId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.programId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program27(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program29(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.programName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.programName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program31(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.mailingName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.mailingName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program33(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(34, program34, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n				";
  return buffer;}
function program34(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  stack1 = depth0.isDraw;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(6, program6, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-email-dateView ---
Handlebars.templates['tmpl-email-dateView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"email-dateView\">\n		<div class=\"tags\">\n			\n		</div>\n	</div>";}
);

// template --- tmpl-sectionEngagement ---
Handlebars.templates['tmpl-sectionEngagement'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEngagement\"> \n	</div>";}
);

// template --- tmpl-sectionEngagement-table ---
Handlebars.templates['tmpl-sectionEngagement-table'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEngagementTable\"> \n		<div class=\"byTitle\">Engagement by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionEngagement-table\"></div>\n		<div class=\"versionHoverBoxContainer\"></div>\n	</div>";}
);

// template --- tmpl-sectionEngagement-bar ---
Handlebars.templates['tmpl-sectionEngagement-bar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEngagementBar\"> \n		<div class=\"byTitle\">Engagement by <span class=\"viewByValue\"></span></div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionEngagement-bar\"></div>\n		<div class=\"versionHoverBoxContainer\"></div>\n	</div>";}
);

// template --- tmpl-sectionEngagement-pie ---
Handlebars.templates['tmpl-sectionEngagement-pie'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEngagementPie\"> \n		<div class=\"byTitle\">Engagement by <span class=\"viewByValue\"></span></div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionEngagement-pie\"></div>\n		<div class=\"versionHoverBoxContainer\"></div>\n	</div>";}
);

// template --- tmpl-sectionEngagement-pivot ---
Handlebars.templates['tmpl-sectionEngagement-pivot'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEngagementPivotTable\">\n		<div class=\"byTitle\">Summary Statistics</div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionEngagement-pivot\"></div>\n	</div>";}
);

// template --- tmpl-sectionEngagement-versionSection-table-td-hover ---
Handlebars.templates['tmpl-sectionEngagement-versionSection-table-td-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<table>\n			<tr class=\"head\">\n				<td class=\"first\">Version</td>\n				<td class=\"opens\">Opens</td>\n				<td class=\"percent\">% of ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n			";
  stack1 = depth0.versions;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<tr>\n				<td class=\"first\">";
  foundHelper = helpers.client;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.client; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"opens\">";
  foundHelper = helpers.opens;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.opens; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"percent\">";
  foundHelper = helpers.percent;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.percent; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%</td>\n			</tr>\n			<table>\n			";
  return buffer;}

function program4(depth0,data) {
  
  
  return "\n			<div class=\"no-version\">No version</div>\n		";}

  buffer += "<div class=\"hoverDiv\">\n		";
  stack1 = depth0.hasData;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<div>";
  return buffer;}
);

// template --- tmpl-sectionEvents ---
Handlebars.templates['tmpl-sectionEvents'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEvents\">\n	</div>";}
);

// template --- tmpl-sectionEvents-tableChart ---
Handlebars.templates['tmpl-sectionEvents-tableChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEventsTable\">\n		<div class=\"byTitle\">Events by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionEvents-table\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionEvents-pieChart ---
Handlebars.templates['tmpl-sectionEvents-pieChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEventsPie\">\n		<div class=\"byTitle\">Events by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary pieOrBarView\"></div>\n		<div class=\"sectionEvents-pie\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionEvents-barChart ---
Handlebars.templates['tmpl-sectionEvents-barChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionEventsBar\">\n		<div class=\"byTitle\">Events by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary pieOrBarView\"></div>\n		<div class=\"sectionEvents-bar\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionFailures ---
Handlebars.templates['tmpl-sectionFailures'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionFailures\"> \n		<div class=\"byTitle\">Failures by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionFailures-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionFailures-bar ---
Handlebars.templates['tmpl-sectionFailures-bar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionFailuresBar\"> \n	</div>";}
);

// template --- tmpl-sectionFailures-pie ---
Handlebars.templates['tmpl-sectionFailures-pie'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionFailuresPie\">\n	</div>";}
);

// template --- tmpl-sectionFailures-table ---
Handlebars.templates['tmpl-sectionFailures-table'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionFailuresTable\"> \n	</div>";}
);

// template --- tmpl-sectionFailures-pivot ---
Handlebars.templates['tmpl-sectionFailures-pivot'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionFailuresPivot\"> \n	</div>";}
);

// template --- tmpl-sectionLinks ---
Handlebars.templates['tmpl-sectionLinks'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionLinks\"> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionLinks-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionMailingDetail ---
Handlebars.templates['tmpl-sectionMailingDetail'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionMailingDetail\">\n		\n		<div class=\"sectionMailingDetail-subjectLine\">\n			<span class=\"title\">Subject Line:</span> <span class=\"titleVal\"></span>\n		</div>\n		\n		<div class=\"sectionMailingDetail-headerSection\">\n			\n		</div>\n     \n	 	<div class=\"sectionMailingDetail-summaryConversionSection mailingDetailPart\">\n	 		<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Summary Statistics\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"sectionMailingDetail-summarySection\">\n					<div class=\"sectionTitle-sub\">Volume and Engagement</div>\n					<div class=\"statsSummaryItems\"></div>\n				</div>\n				\n				<div class=\"sectionMailingDetail-conversionSection\">\n					<div class=\"sectionTitle-sub\">Conversion</div>\n					<div class=\"statsSummaryItems\"></div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-summaryConversionSectionForTransactional mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Summary Statistics\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"sectionMailingDetail-summarySectionForTransactional\">\n					<div class=\"sectionTitle-sub\">\n						Volume and Engagement\n					</div>\n					<div class=\"sectionContent-sub\">\n						<div class=\"summarySectionForTransactionalTable\">\n							<table class=\"dataTableForTransactional\">\n							</table>\n						</div>\n					</div>\n				</div>\n				\n				<div class=\"sectionMailingDetail-conversionSectionForTransactional\">\n					<div class=\"sectionTitle-sub\">Conversion</div>\n					<div class=\"sectionContent-sub\">\n						<div class=\"conversionSectionForTransactionalTable\">\n							<table class=\"dataTableForTransactional\">\n							</table>\n						</div>\n					</div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-mailingVSCampaignAveragesSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Mailing Performance vs Campaign Averages\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"campaignAveragesSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr>\n								<th class=\"name\">Metric</th>\n								<th class=\"rate\">Mailing</th>\n								<th class=\"rate\">Campaign</th>\n								<th class=\"arrow\"></th>\n								<th class=\"rate\">Change</th>\n								<th class=\"bar\"></th>\n							</tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-targetSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Target Performance\n				<span class=\"targetTypeSelect toolBarMD\">\n					View:\n					<input name=\"targetType\" type=\"radio\" value=\"count\"><span class=\"targetType-count\">Count</span>\n					<input name=\"targetType\" type=\"radio\" value=\"rate\" checked=\"checked\"><span class=\"targetType-rate\">% (Relative to Volume)</span>\n					<input name=\"targetType\" type=\"radio\" value=\"percent\"><span class=\"targetType-percent\">% (Of Total)</span>\n				</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"targetSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-failureSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Failure Analysis</span>\n				<div class=\"btn failureDetailReport\">Failure Detail Report</div>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"failureSectionTable\">\n					<table class=\"dataTable\">\n						<tr>\n							<th class=\"name\">Failure Category</th>\n							<th class=\"rate\">Count</th>\n							<th class=\"rate\">Rate</th>\n							<th class=\"rate\">%</th>\n							<th class=\"bar\"></th>\n						</tr>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-linkSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Link Performance</span>\n				<span class=\"linkTypeSelect toolBarMD\">\n					View:\n					<input name=\"linkType\" type=\"radio\" value=\"clicks\" checked=\"checked\"><span>Clicks</span>\n					<div class=\"conversionReportPart\">\n						<input name=\"linkType\" type=\"radio\" value=\"conversions\"><span>Conversions</span>\n						<input name=\"linkType\" type=\"radio\" value=\"both\"><span>Both</span>\n					</div>\n				</span>\n				<span class=\"dynamicContentSelector toolBarMD\">\n					<input type=\"checkbox\" />\n					<span>Dynamic Content</span>\n					<span class=\"iconDiv glyphicon icon-help\" title=\"When reporting for dynamic content, click rates are computed using the number of messages a link was inserted in.  The count will differ from the number of messages actually delivered with the link because message bounces are not deducted from the insertion count.\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n				</span>\n				<div class=\"btn overlayReport\">Overlay Report</div>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"linkSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-shareSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Share Performance\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"shareSectionSummaryAndTable\">\n					<div class=\"sectionSubTitle\">Summary Statistics</div>\n					<div class=\"statsSummaryItems\"></div>\n					\n					<div class=\"sectionSubTitle\">Share Offers Performance</div>\n					<div class=\"shareOffersSectionTable\">\n						<table class=\"dataTable\">\n							<thead>\n								<tr></tr>\n							</thead>\n							<tbody></tbody>\n						</table>\n					</div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-ftafSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				Forward to a Friend Performance\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"ftafSectionTable\">\n					<div class=\"sectionSubTitle\">Summary Statistics</div>\n					<div class=\"statsSummaryItems\"></div>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionMailingDetail-deviceUsageSection mailingDetailPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span>Device Usage</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"deviceUsageSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"hoverItemContainer\"></div>\n		<div class=\"linkHoverBoxContainer\"></div>\n	</div>";}
);

// template --- tmpl-subjectLine ---
Handlebars.templates['tmpl-subjectLine'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<span title=\"";
  foundHelper = helpers.subject;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subject; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.subjectEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.subjectEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>";
  return buffer;}
);

// template --- tmpl-headerSection ---
Handlebars.templates['tmpl-headerSection'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"headerSection-table\">\n		<table>\n			<tr>\n				<td class=\"labelTd first\">Campaign:&nbsp;</td>\n				<td class=\"value\" title=\"";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaign;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignEllipses;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Status:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.status;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Launched At:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.launchDate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n			<tr>\n				<td class=\"labelTd first\">Mailing Type:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mailingType;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"labelTd\">Report Generated:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.reportGenerated;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " <span class=\"refresh\"><span></td>\n				<td class=\"labelTd\">Elapsed Time:&nbsp;</td>\n				<td class=\"value\">";
  stack1 = depth0.summary;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.elapsedTime;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			</tr>\n		</table>\n	</div>";
  return buffer;}
);

// template --- tmpl-statistic-dataItem ---
Handlebars.templates['tmpl-statistic-dataItem'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "first";}

function program3(depth0,data) {
  
  
  return "dataItemSpace";}

function program5(depth0,data) {
  
  
  return "showhover";}

function program7(depth0,data) {
  
  
  return "haveRightRadius";}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  
  return "%";}

  buffer += "<div class=\"dataItem ";
  stack1 = depth0.isFirst;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isLeftSpace;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.isShowHover;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.haveRightRadius;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"mainPart\">\n			<div class=\"dataItem-value\">\n				";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"dataItem-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-statsSummaryItems-dataItem-hover ---
Handlebars.templates['tmpl-statsSummaryItems-dataItem-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Total ";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program3(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.title1;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title1; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Unique ";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.title2;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title2; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<div class=\"hoverBox\">\n		<div class=\"hoverDiv\">\n			<div class=\"totalPart\">\n				<div class=\"title\">\n					<div class=\"name\">";
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n				<div class=\"leftPart\">\n					<div class=\"value\">";
  foundHelper = helpers.value1;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value1; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n					<div class=\"hoverDiv-label\">";
  foundHelper = helpers.name1;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name1; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n				</div>\n				<div class=\"rightPart\">\n					<div class=\"value\">";
  foundHelper = helpers.value2;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value2; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n					<div class=\"hoverDiv-label\">";
  foundHelper = helpers.name2;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name2; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n				</div>\n		   	</div>\n			<div class=\"uniquePart\">\n				<div class=\"title\">\n					<div class=\"name\">";
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n				</div>\n				<div class=\"leftPart\">\n					<div class=\"value\">";
  foundHelper = helpers.value3;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value3; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n					<div class=\"hoverDiv-label\">";
  foundHelper = helpers.name3;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name3; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n				</div>\n				<div class=\"rightPart\">\n					<div class=\"value\">";
  foundHelper = helpers.value4;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value4; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n					<div class=\"hoverDiv-label\">";
  foundHelper = helpers.name4;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name4; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-statsSummaryItemsForTransactional-hover ---
Handlebars.templates['tmpl-statsSummaryItemsForTransactional-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Total ";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program3(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.title1;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title1; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"uniquePart\">\n				<div class=\"title\">\n					<div class=\"name\">";
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n				<div class=\"metric\">\n					<span class=\"metricName\">";
  foundHelper = helpers.name3;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name3; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n					<span class=\"metricValue\">";
  foundHelper = helpers.value3;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value3; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n				</div>\n				<div class=\"metric\">\n					<span class=\"metricName\">";
  foundHelper = helpers.name4;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name4; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n					<span class=\"metricValue\">";
  foundHelper = helpers.value4;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value4; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n				</div>\n			</div>\n			";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Unique ";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program8(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.title2;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title2; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<div class=\"hoverBox\">\n		<div class=\"hoverDiv itemsForTransactional\">\n			<div class=\"totalPart\">\n				<div class=\"title\">\n					<div class=\"name\">";
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n				</div>\n				<div class=\"metric\">\n					<span class=\"metricName\">";
  foundHelper = helpers.name1;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name1; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n					<span class=\"metricValue\">";
  foundHelper = helpers.value1;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value1; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n				</div>\n				<div class=\"metric\">\n					<span class=\"metricName\">";
  foundHelper = helpers.name2;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name2; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n					<span class=\"metricValue\">";
  foundHelper = helpers.value2;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value2; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n				</div>\n		   	</div>\n		   	";
  stack1 = depth0.showUniquePart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-mailingVSCampaignAveragesSection-dataTable-tr ---
Handlebars.templates['tmpl-mailingVSCampaignAveragesSection-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "\n	<tr><td colspan=\"6\" class=\"noBorder\"></td></tr>\n	";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n		";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isForTransactional;
  stack2 = depth0.summaryObj;
  stack2 = stack2 == null || stack2 === false ? stack2 : stack2.label;
  foundHelper = helpers.equalAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Complaint Rate", stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)}) : helperMissing.call(depth0, "equalAndTrue", stack2, "Complaint Rate", stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  return buffer;}
function program4(depth0,data) {
  
  
  return "\n		<tr><td colspan=\"6\" class=\"noBorder\"></td></tr>\n		";}

function program6(depth0,data) {
  
  
  return "lastRowTr";}

function program8(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program10(depth0,data) {
  
  
  return "%";}

function program12(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program14(depth0,data) {
  
  
  return "%";}

function program16(depth0,data) {
  
  
  return "\n				<span class=\"noArrow\">-</span>\n			";}

function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"smr-carouselSpriteIco ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ></span>\n			";
  return buffer;}
function program19(depth0,data) {
  
  
  return " smr-arrowUpLargeGreen ";}

function program21(depth0,data) {
  
  
  return " smr-arrowDownLargeRed ";}

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n				<span>";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.changeVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</span>\n			";
  return buffer;}

function program25(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<span class=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(28, program28, data),fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.changeVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</span>\n			";
  return buffer;}
function program26(depth0,data) {
  
  
  return "greenFont ";}

function program28(depth0,data) {
  
  
  return " redFont";}

function program30(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"leftBar\">\n						";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "reduce", {hash:{},inverse:self.program(36, program36, data),fn:self.program(31, program31, data)}) : helperMissing.call(depth0, "equal", stack1, "reduce", {hash:{},inverse:self.program(36, program36, data),fn:self.program(31, program31, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n					<div class=\"rightBar\">\n						";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(43, program43, data),fn:self.program(38, program38, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(43, program43, data),fn:self.program(38, program38, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					</div>\n				";
  return buffer;}
function program31(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"worsenedBar\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.program(34, program34, data),fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "lte", stack1, 100, {hash:{},inverse:self.program(34, program34, data),fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>";
  return buffer;}
function program32(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program34(depth0,data) {
  
  
  return "style=\"width:100%\"";}

function program36(depth0,data) {
  
  
  return "<div class=\"worsenedBarHide\"></div>";}

function program38(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"improvedBar\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)}) : helperMissing.call(depth0, "lte", stack1, 100, {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>";
  return buffer;}
function program39(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.barWidth;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program41(depth0,data) {
  
  
  return "style=\"width:100%\"";}

function program43(depth0,data) {
  
  
  return "<div class=\"improvedBarHide\"></div>";}

  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "Unsub Rate", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "Unsub Rate", {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<tr class=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "RPM", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equal", stack1, "RPM", {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		<td class=\"name\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isCurrencySymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.mailingVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isCurrencySymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.campaignVal;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"arrow\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)}) : helperMissing.call(depth0, "equal", stack1, "unchange", {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)}) : helperMissing.call(depth0, "equal", stack1, "unchange", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td>\n			<div class=\"barDiv\">\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.improvement;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.noop,fn:self.program(30, program30, data)}) : helperMissing.call(depth0, "notEqual", stack1, "unchange", {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-failureSection-dataTable-tr ---
Handlebars.templates['tmpl-failureSection-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"normalBar\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 95, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)}) : helperMissing.call(depth0, "lte", stack1, 95, {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\"";
  return buffer;}

function program4(depth0,data) {
  
  
  return "style=\"width:95%\"";}

  buffer += "<tr>\n		<td class=\"name\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.count;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n		<td>\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%\n		</td>\n		<td>\n			<div class=\"barDiv\">\n				";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.percentageOfFailure;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n		</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tableThead ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableThead'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "sortable";}

function program3(depth0,data) {
  
  
  return "isBarTh";}

function program5(depth0,data) {
  
  
  return "isBarAndValueTh";}

  buffer += "<th class=\"";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.isBarChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isBarAndValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"th-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	</th>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tableTbody ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-sectionContent-dataTable-tableTbody-td ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody-td'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "showhover";}

function program3(depth0,data) {
  
  
  return "lastRowTd";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "data-name=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-value=\"";
  foundHelper = helpers.linkUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.linkUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span class=\"barValue\">";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n			";
  stack1 = depth0.isTotalColumn;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program8(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program10(depth0,data) {
  
  
  return "%";}

function program12(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<div class=\"normalBarDiv\" >\n					";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</div>\n			";
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<div class=\"normalBar\"  ";
  stack1 = depth0.value;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 90, {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "lte", stack1, 90, {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n					";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.value;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program17(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			";
  stack1 = depth0.isBarChart;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(27, program27, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program20(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"normalBar\"  ";
  stack1 = depth0.value;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 90, {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data)}) : helperMissing.call(depth0, "lte", stack1, 90, {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program24(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.value;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program25(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

function program27(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n					";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</span>\n			";
  return buffer;}
function program28(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program30(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program32(depth0,data) {
  
  
  return "%";}

  buffer += "<td class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.showHoverBox;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "Total", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "Total", stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = depth0.showHoverBox;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n		";
  stack1 = depth0.isBarAndValue;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(19, program19, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tr ---
Handlebars.templates['tmpl-sectionContent-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "bottomBorder";}

function program3(depth0,data) {
  
  
  return "showhover";}

function program5(depth0,data) {
  
  
  return "bottomBorder";}

function program7(depth0,data) {
  
  
  return "showhover";}

function program9(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrencyForMDR;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrencyForMDR; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program11(depth0,data) {
  
  
  return "%";}

function program13(depth0,data) {
  
  
  return "bottomBorder";}

  buffer += "<tr class=\"dataTableTr\">\n		<td class=\"name ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isHaveLine;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isShowHover;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\n		</td>\n		<td class=\"value ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isHaveLine;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isShowHover;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.value;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isRate;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</td>\n		<td class=\"sparkLine ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isHaveLine;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-linkSection-table-td-hover ---
Handlebars.templates['tmpl-linkSection-table-td-hover'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"hoverDiv\">\n	    <div>\n			<span>Link Name: ";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		</div>\n	    <div style=\"margin-top:3px\">\n	    	<span>URL: <a href=\"";
  foundHelper = helpers.linkUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.linkUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" target=\"_blank\">";
  foundHelper = helpers.linkUrl;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.linkUrl; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a></span>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionOverview ---
Handlebars.templates['tmpl-sectionOverview'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionOverview\">\n	</div>";}
);

// template --- tmpl-sectionOverview-table ---
Handlebars.templates['tmpl-sectionOverview-table'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionOverviewTable\">\n		<div class=\"byTitle\">Overview by <span class=\"viewByValue\"></span></div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionOverviewTable-table\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionOverview-bar ---
Handlebars.templates['tmpl-sectionOverview-bar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionOverviewBar\">\n		<div class=\"byTitle\">Overview by <span class=\"viewByValue\"></span></div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionOverviewBar-table\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionOverview-pie ---
Handlebars.templates['tmpl-sectionOverview-pie'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionOverviewPie\">\n		<div class=\"byTitle\">Overview by <span class=\"viewByValue\"></span></div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionOverviewPie-pie\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionOverview-pivot ---
Handlebars.templates['tmpl-sectionOverview-pivot'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionOverviewPivotTable\">\n		<div class=\"byTitle\">Summary Statistics</div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionOverviewPivot-pivot\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionOverviewSummary ---
Handlebars.templates['tmpl-sectionOverviewSummary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "selected";}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

  buffer += "<div class=\"sectionOverviewSummary\">\n		<div class=\"sectionOverviewSummary-chart\">\n			<div class=\"viewBy head\">\n				<span>View by </span>\n				<span class=\"SMA-REPORT-VIEWBYDAY action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"day\">Day</span>\n				<span class=\"SMA-REPORT-VIEWBYWEEK action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"week\">Week</span>\n				<span class=\"SMA-REPORT-VIEWBYMONTH action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"month\">Month</span>\n				<span class=\"SMA-REPORT-VIEWBYQUARTER action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"quarter\">Quarter</span>\n			</div>\n			<div class=\"chart-content\"></div>\n		</div>\n		\n		<div class=\"SMA-REPORT-ENGAGEMENTMETRICS sectionOverviewSummary-bottom\">\n			<span class=\"spanTitle\">Engagement Funnel</span>\n			<div class=\"sectionOverviewSummary-summary\">\n				<table >\n					<tr>\n						<th class=\"name\">Metrics</th>\n						<th class=\"count\">Count</th>\n						<th class=\"rate\" colspan=\"2\">Rate</th>\n					</tr>\n				</table>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionOverviewSummary-summary-tr ---
Handlebars.templates['tmpl-sectionOverviewSummary-summary-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<span class=\"metric\" data-metric=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</span>";
  return buffer;}

function program3(depth0,data) {
  
  var stack1;
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.label;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  return escapeExpression(stack1);}

function program5(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program7(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<td class=\"rateVal\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n			<td class=\"noBorder\"></td>\n		";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "revenue", {hash:{},inverse:self.program(13, program13, data),fn:self.program(10, program10, data)}) : helperMissing.call(depth0, "equal", stack1, "revenue", {hash:{},inverse:self.program(13, program13, data),fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				<td class=\"rate last noBorder\" colspan=\"2\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "revenue", {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "notEqual", stack1, "revenue", {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n			";
  return buffer;}
function program11(depth0,data) {
  
  var stack1;
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  return escapeExpression(stack1);}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				<td class=\"rateVal noBorderRight\" ";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n				<td class=\"last noBorderLeft\">\n					";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.isBar;
  stack2 = depth0.summaryObj;
  stack2 = stack2 == null || stack2 === false ? stack2 : stack2.isRate;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, false, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, false, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				</td>\n			";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "style='color:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ";'";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n						<div class=\"funnel-bar\">\n							<div class=\"bar\" style=\"width:";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.rate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"></div>\n						</div>\n					";
  return buffer;}

  buffer += "<tr data-metric=\"";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">\n		<td class=\"name first\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.clickable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"count\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "revenue", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, "revenue", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.count;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		";
  stack1 = depth0.showName;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</tr>";
  return buffer;}
);

// template --- tmpl-sectionOverviewSummary-summary-breakTr-tr ---
Handlebars.templates['tmpl-sectionOverviewSummary-summary-breakTr-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr class=\"breakTr\">\n		<td class=\"name first\"></td>\n		<td class=\"count\"></td>\n		<td class=\"rateVal\"></td>\n		<td class=\"noBorder\"></td>\n	</tr>";}
);

// template --- tmpl-sectionOverviewSummary-funnel-item ---
Handlebars.templates['tmpl-sectionOverviewSummary-funnel-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"sectionOverviewSummary-funnel-item\">\n		<span class=\"smrlabel\"><span class=\"metric\" data-metric=\"";
  foundHelper = helpers.metric;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.metric; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ":</span></span>\n		<span>";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionSharing ---
Handlebars.templates['tmpl-sectionSharing'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSharing\"> \n		<div class=\"byTitle\">Sharing by <span class=\"viewByValue\"></span></div> \n		<div class=\"statsSummary\"></div>\n		<div class=\"sectionSharing-view\"></div>\n	</div>";}
);

// template --- tmpl-sectionSharing-bar ---
Handlebars.templates['tmpl-sectionSharing-bar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSharingBar\"> \n	</div>";}
);

// template --- tmpl-sectionSharing-pie ---
Handlebars.templates['tmpl-sectionSharing-pie'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSharingPie\"> \n	</div>";}
);

// template --- tmpl-sectionSharing-table ---
Handlebars.templates['tmpl-sectionSharing-table'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSharingTable\"> \n	</div>";}
);

// template --- tmpl-sectionSharing-pivot ---
Handlebars.templates['tmpl-sectionSharing-pivot'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSharingPivot\"> \n	</div>";}
);

// template --- tmpl-sectionSMS ---
Handlebars.templates['tmpl-sectionSMS'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSMS\">\n	</div>";}
);

// template --- tmpl-sectionSMS-summary ---
Handlebars.templates['tmpl-sectionSMS-summary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "selected";}

function program3(depth0,data) {
  
  
  return "selected";}

function program5(depth0,data) {
  
  
  return "selected";}

function program7(depth0,data) {
  
  
  return "selected";}

  buffer += "<div class=\"sectionSMSSummary\">\n		<div class=\"sectionSMSSummary-chart\">\n			<div class=\"viewBy head\">\n				<span>View by </span>\n				<span class=\"SMA-REPORT-VIEWBYDAY action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "equal", stack1, "day", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"day\">Day</span>\n				<span class=\"SMA-REPORT-VIEWBYWEEK action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "equal", stack1, "week", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"week\">Week</span>\n				<span class=\"SMA-REPORT-VIEWBYMONTH action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "equal", stack1, "month", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"month\">Month</span>\n				<span class=\"SMA-REPORT-VIEWBYQUARTER action ";
  stack1 = depth0.viewBy;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "equal", stack1, "quarter", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-view=\"quarter\">Quarter</span>\n			</div>\n			<div class=\"chart-content\"></div>\n		</div>\n		\n		<div class=\"sectionSMSSummary-bottom\">\n			<div class=\"sectionSMSSummary-bottom-left\">\n				<span class=\"spanTitle\">SMS Sent</span>\n				<table>\n					<tr>\n						<th>Metrics</th>\n						<th>Count</th>\n						<th>Rate</th>\n					</tr>\n				</table>\n			</div>\n			\n			<div class=\"sectionSMSSummary-bottom-right\">\n				<span class=\"spanTitle\">SMS Received</span>\n				<table>\n					<tr>\n						<th>Metrics</th>\n						<th>Count</th>\n						<th>Rate</th>\n					</tr>\n				</table>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionSMS-summary-sent-table-tr ---
Handlebars.templates['tmpl-sectionSMS-summary-sent-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<tr>\n		<td class=\"name\">Sent</td>\n		<td class=\"rate\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.sent;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"count\">&nbsp;</td>\n	</tr>\n	<tr>\n		<td class=\"name\">Failed</td>\n		<td class=\"rate\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.failed;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"count\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.failedRate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</td>\n	</tr>\n	<tr>\n		<td class=\"name\">Delivered</td>\n		<td class=\"rate\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.delivered;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"count\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.deliveredRate;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "%</td>\n	</tr>\n    ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n    <tr>\n      <td colspan=\"3\" style=\"text-align:center\">No data!</td>\n    <tr>\n    ";}

  stack1 = depth0.haveData;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-sectionSMS-summary-received-table-tr ---
Handlebars.templates['tmpl-sectionSMS-summary-received-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n	<tr>\n		<td class=\"name\">Received</td>\n		<td class=\"rate\">";
  stack1 = depth0.summaryObj;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.received;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</td>\n		<td class=\"count\">&nbsp;</td>\n	</tr>\n    ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "\n    <tr>\n      <td colspan=\"3\" style=\"text-align:center\">No data!</td>\n    <tr>\n    ";}

  stack1 = depth0.haveData;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-sectionSMS-tableChart ---
Handlebars.templates['tmpl-sectionSMS-tableChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSMSTable\">\n		<div class=\"byTitle\">SMS by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionSMS-table\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionSMS-pieChart ---
Handlebars.templates['tmpl-sectionSMS-pieChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSMSPie\">\n		<div class=\"byTitle\">SMS by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary pieOrBarView\"></div>\n		<div class=\"sectionSMS-pie\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionSMS-barChart ---
Handlebars.templates['tmpl-sectionSMS-barChart'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionSMSBar\">\n		<div class=\"byTitle\">SMS by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary pieOrBarView\"></div>\n		<div class=\"sectionSMS-bar\">\n		</div>\n	</div>";}
);

// template --- tmpl-sectionSMS-keyword-breakdown ---
Handlebars.templates['tmpl-sectionSMS-keyword-breakdown'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"item\" data-value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>";
  return buffer;}
);

// template --- tmpl-sectionTrends ---
Handlebars.templates['tmpl-sectionTrends'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionTrends\">\n	</div>";}
);

// template --- tmpl-sectionTrendsSummary ---
Handlebars.templates['tmpl-sectionTrendsSummary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionTrendsSummary\">\n		<div class=\"sectionTrendsSummary-content\">\n			<div class=\"sectionTrendsSummary-content-left\">\n				<div class=\"viewBy head\">\n					<span>View by </span>\n					<span class=\"SMA-REPORT-VIEWBYDAY action selected\" data-view=\"day\">Day</span>\n					<span class=\"SMA-REPORT-VIEWBYWEEK action\" data-view=\"week\">Week</span>\n					<span class=\"SMA-REPORT-VIEWBYMONTH action\" data-view=\"month\">Month</span>\n					<span class=\"SMA-REPORT-VIEWBYQUARTER action\" data-view=\"quarter\">Quarter</span>\n				</div>\n				<div class=\"topChart\"></div>\n				<div class=\"bottomChart\"></div>\n			</div>\n			<div class=\"sectionTrendsSummary-content-right\">\n				<div class=\"SMA-REPORT-TRENDMETRICSBOX trendMetricsBox\">\n					<div class=\"header\">Trend Metrics</div>\n					<div class=\"trendMetricsBox-content\"></div>\n				</div>\n			</div>\n			<div class=\"cb\"></div>\n		</div>\n	</div>";}
);

// template --- tmpl-sectionTrendsSummary-item ---
Handlebars.templates['tmpl-sectionTrendsSummary-item'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "leftIndent";}

function program3(depth0,data) {
  
  
  return "checked";}

  buffer += "<div class=\"sectionTrendsSummary-item\">\n		<div class=\"trends-item-data ";
  stack1 = depth0.isLeftIndent;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-isRate=\"";
  foundHelper = helpers.isRate;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.isRate; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-isUnique=\"";
  foundHelper = helpers.isUnique;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.isUnique; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-labelChart=\"";
  foundHelper = helpers.labelChart;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelChart; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n			<input type=\"checkbox\" name=\"";
  foundHelper = helpers.inputName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.inputName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.isChecked;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "/>\n			<span class=\"itemValue\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n			<span class=\"itemLabel\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n		</div>\n		<div class=\"trends-item-line\"></div>\n	</div>";
  return buffer;}
);

// template --- tmpl-sectionUserInsightOverview ---
Handlebars.templates['tmpl-sectionUserInsightOverview'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionUserInsightOverview\">  \n		\n		<div class=\"sectionUserInsightOverview-userOverviewSection\">\n			<div class=\"byTitle UserOverview\">User Overview</div>\n			<div class=\"sectionUserOverviewContent userImageSegmentList\">\n				<div class=\"userImage\"></div>\n				<div class=\"segmentList\"></div>\n			</div>\n			\n			<div class=\"sectionUserOverviewContent userScore\">\n				<div class=\"engagementScore score-div\">\n					<div class=\"above\">\n						<div class=\"engagementShape score-div-shape\"><span class=\"stitle\">Engagement Score:</span><span class=\"compare-span\"><label class=\"num\">  </label>%&nbsp;<label class=\"compare\">&gt;</label></span><span>Average</span></div>\n						<div class=\"engagementCompare score-div-compare\">\n							<div class=\"summaryScore\"><span>  </span></div>\n							<div class=\"avgScore\">\n								<span class=\"compare-arrow\"></span>\n								<span class=\"cen-line\"></span>\n								<span class=\"ver-line\"></span>\n								<span class=\"avgScoreNum\">  </span>\n							</div>\n							<div class=\"clear\"></div>\n						</div>\n					</div>\n					<div class=\"engagementContent score-content\"><span class=\"engagementName\"></span>'s Engagement score (based on open, click rates and unsubs) is <span class=\"engagementConValue\">% </span><label class=\"compare\"></label> average</div>\n				</div>\n			</div>\n			\n			<div class=\"sectionUserOverviewContent userScore\">\n				<div class=\"conversionScore score-div\">\n					<div class=\"above\">\n						<div class=\"conversionShape score-div-shape\"><span class=\"stitle\">Conversion Score:</span><span class=\"compare-span\"><label class=\"num\">  </label>%&nbsp;<label class=\"compare\">&gt;</label></span><span>Average</span></div>\n						<div class=\"conversionCompare score-div-compare\">\n							<div class=\"summaryScore\"><span>  </span></div>\n							<div class=\"avgScore\">\n								<span class=\"compare-arrow\"></span>\n								<span class=\"cen-line\"></span>\n								<span class=\"ver-line\"></span>\n								<span class=\"avgScoreNum\">  </span>\n							</div>\n							<div class=\"clear\"></div>\n						</div>\n					</div>\n					<div class=\"conversionContent score-content\"><span class=\"conversionName\"></span>'s Conversion score (based on conversions and revenue) is <span class=\"conversionConValue\">% </span><label class=\"compare\"></label> average</div>\n				</div>\n			</div>\n			<div class=\"clear\"></div>\n		</div>\n		\n		<div class=\"sectionUserInsightOverview-summary\">\n		\n			<div class=\"byTitle byTitle-table userInsightSummary\">Summary Statistics</div> \n			<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary userInsightSummary\"></div>\n		</div> \n		\n		<div class=\"sectionUserInsightOverview-statsComparisonSection userInsightPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span class=\"spanTitle\">&nbsp;Summary Statistics Comparison</span>\n				<div class=\"clear\"></div>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"statsComparisonSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionUserInsightOverview-segmentComparisonSection userInsightPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span class=\"spanTitle\">&nbsp;Segment Group Comparison</span>\n				<span class=\"toolbar\">\n					View:\n					<input name=\"segment\" type=\"radio\" value=\"2\" checked/><span>Actual Difference From Segment</span>\n					<input name=\"segment\" type=\"radio\" value=\"1\"  /><span>% Difference From Segment</span> \n				</span>\n				<span class=\"toolbar showAverageSegment\">\n					<input name=\"average\" type=\"checkbox\" /><span>View Segment Values</span>\n				</span>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"segmentComparisonSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n		<div class=\"sectionUserInsightOverview-programSection userInsightPart\">\n			<div class=\"sectionTitle\">\n				<span class=\"collapsible exp\">[-]</span>\n				<span class=\"collapsible col\">[+]</span>\n				<span class=\"spanTitle\">&nbsp;LCM Programs</span>\n				<div class=\"clear\"></div>\n			</div>\n			<div class=\"sectionContent\">\n				<div class=\"programSectionTable\">\n					<table class=\"dataTable\">\n						<thead>\n							<tr></tr>\n						</thead>\n						<tbody></tbody>\n					</table>\n				</div>\n			</div>\n		</div>\n		\n	</div>";}
);

// template --- tmpl-sectionContent-dataTable-tableThead-userInsight ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableThead-userInsight'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "sortable";}

  buffer += "<th class=\"";
  stack1 = depth0.sortable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-column=\"";
  foundHelper = helpers.column;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.column; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" colspan=\"";
  foundHelper = helpers.colspan;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.colspan; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"th-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n	</th>";
  return buffer;}
);

// template --- tmpl-sectionContent-dataTable-tableTbody-userInsight ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody-userInsight'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<tr>\n	</tr>";}
);

// template --- tmpl-sectionContent-dataTable-tableTbody-td-userInsight ---
Handlebars.templates['tmpl-sectionContent-dataTable-tableTbody-td-userInsight'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "lastRowTd";}

function program3(depth0,data) {
  
  
  return "textAlignLeft";}

function program5(depth0,data) {
  
  
  return "textAlignCenter";}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<span>\n				<input type=\"checkbox\" ";
  stack1 = depth0.value;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "true", {hash:{},inverse:self.noop,fn:self.program(8, program8, data)}) : helperMissing.call(depth0, "equal", stack1, "true", {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " disabled=\"true\"/>\n			</span>\n			";
  stack1 = depth0.isDraw;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program8(depth0,data) {
  
  
  return "checked=\"true\"";}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"normalBarDiv\" >\n				";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"normalBar\"  ";
  stack1 = depth0.drawValue;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data)}) : helperMissing.call(depth0, "lte", stack1, 100, {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;}
function program12(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.drawValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.drawValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program14(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.drawValue;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program15(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " \n			<span ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " class=\"";
  stack1 = depth0.improvement;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "unchange", {hash:{},inverse:self.noop,fn:self.program(20, program20, data)}) : helperMissing.call(depth0, "notEqual", stack1, "unchange", {hash:{},inverse:self.noop,fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isUrlLink;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isFontBold;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(27, program27, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n				";
  stack1 = depth0.isProgramName;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(34, program34, data),fn:self.program(29, program29, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</span>\n			";
  stack1 = depth0.isDraw;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(41, program41, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		";
  return buffer;}
function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.columnTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.columnTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " ";
  stack1 = depth0.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;}
function program21(depth0,data) {
  
  
  return "greenFont";}

function program23(depth0,data) {
  
  
  return "redFont";}

function program25(depth0,data) {
  
  
  return "isUrlLink";}

function program27(depth0,data) {
  
  
  return "fontBold";}

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n					";
  stack1 = depth0.isMock;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(32, program32, data),fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program30(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"#\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n					";
  return buffer;}

function program32(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<a href=\"javascript:sm.comp.list.ListMgr.displayOnListPage(";
  foundHelper = helpers.programId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.programId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ",'";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "','PROGRAM')\">";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a>\n					";
  return buffer;}

function program34(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(35, program35, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.improvement;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "improve", {hash:{},inverse:self.noop,fn:self.program(37, program37, data)}) : helperMissing.call(depth0, "equal", stack1, "improve", {hash:{},inverse:self.noop,fn:self.program(37, program37, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack2 = depth0.value;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(39, program39, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program35(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program37(depth0,data) {
  
  
  return "+";}

function program39(depth0,data) {
  
  
  return "%";}

function program41(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n			<div class=\"normalBarDiv\" >\n				";
  stack1 = depth0.value;
  foundHelper = helpers.notEqual;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 0, {hash:{},inverse:self.noop,fn:self.program(42, program42, data)}) : helperMissing.call(depth0, "notEqual", stack1, 0, {hash:{},inverse:self.noop,fn:self.program(42, program42, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			";
  return buffer;}
function program42(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					<div class=\"normalBar\"  ";
  stack1 = depth0.drawValue;
  foundHelper = helpers.lte;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.program(45, program45, data),fn:self.program(43, program43, data)}) : helperMissing.call(depth0, "lte", stack1, 100, {hash:{},inverse:self.program(45, program45, data),fn:self.program(43, program43, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "></div>\n				";
  return buffer;}
function program43(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"width:";
  foundHelper = helpers.drawValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.drawValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "%\" ";
  return buffer;}

function program45(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " ";
  stack1 = depth0.drawValue;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(46, program46, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program46(depth0,data) {
  
  
  return "style=\"width:0%;border:0px;\"";}

  buffer += "<td class=\"";
  foundHelper = helpers.first;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.first; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.isLastRow;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.textAlignLeft;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.textAlignCenter;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n		";
  stack1 = depth0.isCheckbox;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(17, program17, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</td>";
  return buffer;}
);

// template --- tmpl-userOverviewSection-segment-userInsight ---
Handlebars.templates['tmpl-userOverviewSection-segment-userInsight'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n	<div class=\"segment\" >\n		<span class=\"segmentName\" ";
  stack1 = depth0.ellipsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.labelName;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelName; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ":</span>\n		<span class=\"segmentValue\" ";
  stack1 = depth0.valEllipsis;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.labelValue;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.labelValue; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	</div>\n	";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.segmentation;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.segmentation; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.segment;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.segment; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

  stack1 = depth0.dataList;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
);

// template --- tmpl-sectionVolume ---
Handlebars.templates['tmpl-sectionVolume'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"sectionVolume\">\n		<div class=\"byTitle\">Volume by <span class=\"viewByValue\"></span></div> \n		<div class=\"SMA-REPORT-SUMMARYSTATISTICSTABLE statsSummary\"></div>\n		<div class=\"sectionVolume-view\"></div>\n	</div>";}
);

// template --- tmpl-statsSummary ---
Handlebars.templates['tmpl-statsSummary'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"statsSummary-dataItem\"></div>";}
);

// template --- tmpl-statsSummary-dataItem ---
Handlebars.templates['tmpl-statsSummary-dataItem'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  
  return "first";}

function program3(depth0,data) {
  
  
  return "clickable";}

function program5(depth0,data) {
  
  
  return "unclickable";}

function program7(depth0,data) {
  
  
  return "sel";}

function program9(depth0,data) {
  
  
  return "byDomain";}

function program11(depth0,data) {
  
  
  return "rightPart-table";}

function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"dataItem-label\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>";
  return buffer;}

function program15(depth0,data) {
  
  
  return "dataItem-table";}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "style=\"color:";
  foundHelper = helpers.haveColor;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.haveColor; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.titleVal;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.titleVal; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program21(depth0,data) {
  
  
  return "\n					&nbsp;&nbsp;\n				";}

function program23(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					";
  stack1 = depth0.isConversionSymbol;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(24, program24, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  stack1 = depth0.isRate;
  stack2 = depth0.val;
  foundHelper = helpers.notEqualAndTrue;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(26, program26, data)}) : helperMissing.call(depth0, "notEqualAndTrue", stack2, "N/A", stack1, {hash:{},inverse:self.noop,fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program24(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.conversionCurrency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.conversionCurrency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program26(depth0,data) {
  
  
  return "%";}

function program28(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"dataItem-label dataItem-table\">";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>";
  return buffer;}

  buffer += "<div class=\"dataItem ";
  stack1 = depth0.isFirst;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isClickable;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isSelectedItem;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.isByDomain;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" data-value=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"rightPart ";
  stack1 = depth0.viewType;
  stack2 = depth0.viewType;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "table", stack1, "pivot", {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "equalOr", stack2, "table", stack1, "pivot", {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            ";
  stack1 = depth0.viewType;
  stack2 = depth0.viewType;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "bar", stack1, "pie", {hash:{},inverse:self.noop,fn:self.program(13, program13, data)}) : helperMissing.call(depth0, "equalOr", stack2, "bar", stack1, "pie", {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<div class=\"dataItem-value ";
  stack1 = depth0.viewType;
  stack2 = depth0.viewType;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "table", stack1, "pivot", {hash:{},inverse:self.noop,fn:self.program(15, program15, data)}) : helperMissing.call(depth0, "equalOr", stack2, "table", stack1, "pivot", {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" ";
  stack1 = depth0.haveColor;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.haveTitle;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n				";
  stack1 = depth0.isByDomain;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(23, program23, data),fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			";
  stack1 = depth0.viewType;
  stack2 = depth0.viewType;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "table", stack1, "pivot", {hash:{},inverse:self.noop,fn:self.program(28, program28, data)}) : helperMissing.call(depth0, "equalOr", stack2, "table", stack1, "pivot", {hash:{},inverse:self.noop,fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</div>\n	</div>";
  return buffer;}
);

// template ---  ---
Handlebars.templates[''] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "(function($){\n	brite.registerView(\"supportMessage\", {\n	    parent: \"#page\",\n		emptyParent: true\n	}, {\n		build: function(){\n			return smr.render(\"tmpl-supportMessage\",{});\n		}, \n		postDisplay: function(){\n			\n		}\n	});\n\n})(jQuery);";}
);

// template --- tmpl-supportMessage ---
Handlebars.templates['tmpl-supportMessage'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"notsupported\">\n		<div class=\"message\">\n			<p>During development the only supported browsers are Chrome and Safari.</p>\n			<p>We will add support for IE, Firefox once we have implemented the final look and feel.</p>\n		</div>\n	</div>";}
);

// template --- tmpl-targetPicker ---
Handlebars.templates['tmpl-targetPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"targetPicker commonPicker new-picker\">\n		<div class=\"icoDiv resizeHandler\"></div>\n		<div class=\"targetPicker-top commonPicker-top new-close\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">";
  foundHelper = helpers.extTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.extTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"targetPicker-main commonPicker-main\">\n			<div class=\"targetPicker-content commonPicker-content\">\n				\n			</div>\n		</div>\n		<div class=\"targetPicker-bottom commonPicker-bottom\">\n			<div class=\"SMA-REPORT-TARGETPICKERDONEBUTTON btn done\">Done</div>\n			<div class=\"SMA-REPORT-TARGETPICKERCANCELBUTTON btn cancel\">Cancel</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-targetPicker-mailingView ---
Handlebars.templates['tmpl-targetPicker-mailingView'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"commonPicker-mailingView targetPicker-mailingView\">\n		<div class=\"tags\">\n			\n		</div>\n	</div>";}
);

// template --- tmpl-targetPicker-tag-selectTargets ---
Handlebars.templates['tmpl-targetPicker-tag-selectTargets'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"tag \" data-tag=\"selectTargets\">\n		<div class=\"tag-content\">\n			<div class=\"commonPicker-selected targetPicker-selected\">\n				";
  foundHelper = helpers.incl;
  stack1 = foundHelper ? foundHelper.call(depth0, "tmpl-targetPicker-limitData", "selectTargets", {hash:{}}) : helperMissing.call(depth0, "incl", "tmpl-targetPicker-limitData", "selectTargets", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</div>\n			<div class=\"availableMailings\">\n				<span class=\"count\">0</span> Targets Available\n			</div>\n			<div class=\"SMA-REPORT-TARGETPICKERFILTER commonPicker-filter targetPicker-filter\">\n				<div class=\"filter-label targetPicker-filter-label\">Filter by:</div>\n				<div class=\"filter-fields targetPicker-filter-fields\">\n					<div class=\"label-field\">\n							<div class=\"label left\">Last Used:</div>\n							<div class=\"field\">\n								<span class=\"sub-field\">\n									<select name=\"launchDate\" style=\"width:154px\">\n										<option value=\"today\" >Today</option>\n										<option value=\"yesterday\">Yesterday</option>\n										<option value=\"last7Days\">Last 7 days</option>\n										<option value=\"last30Days\">Last 30 days</option>\n										<option value=\"last60Days\">Last 60 days</option>\n										<option value=\"last180Days\">Last 180 days</option>\n										<option value=\"last365Days\">Last 365 days</option>\n										<option value=\"all\" selected>All</option>\n									</select>\n								</span>\n							</div>\n					</div>\n					<div class=\"label-field\">\n						<div class=\"label left\">Name:</div>\n						<div class=\"field\">\n							<span class=\"sub-field name\">\n								<input name=\"name\" type=\"text\"/>\n								<span class=\"keyCancel ico ico-close\"></span>\n							</span>\n						</div>\n					</div>\n				</div>\n				<div class=\"cb\"></div>\n			</div>\n			\n			<div class=\"SMA-REPORT-TARGETPICKERTABLE targetPicker-table commonPicker-table\">\n				<div class=\"targetPicker-dataTable\">\n					<table class=\"dataTable\" data-type=\"target\">\n						<thead>\n							<tr>\n								<th class=\"sortable\" data-column=\"name\"><span class=\"thSortName\">Name</span></th>\n								<th class=\"sortable\" data-column=\"dataSource\"><span class=\"thSortName\">Data Source</span></th>\n								<th class=\"sortable\" data-column=\"lastUsed\"><span class=\"thSortName\">Last Used</span></th>\n							</tr>\n						</thead>\n						<tbody>\n						</tbody>\n					</table>\n					<div class=\"targetPicker-noTargets\"><div class=\"nomessage\">No targets in this organization have audience statistics enabled.&nbsp;Audience statistics can be enabled in </div><div class=\"nomessage sec\">Target options</div></div>\n				</div>\n			</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-targetPicker-target-table-tr ---
Handlebars.templates['tmpl-targetPicker-target-table-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program5(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.nameEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nameEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program7(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "title=\"";
  foundHelper = helpers.dataSource;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataSource; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program11(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.dataSourceEllipses;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataSourceEllipses; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

function program13(depth0,data) {
  
  var stack1, foundHelper;
  foundHelper = helpers.dataSource;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataSource; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  return escapeExpression(stack1);}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" datasource-type=\"";
  foundHelper = helpers.dataSourceType;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dataSourceType; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " pointertr\">\n		<td class=\"btnAction\" ";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.nameEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"btnAction\" ";
  stack1 = depth0.dataSourceEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  stack1 = depth0.dataSourceEllipses;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"btnAction\">";
  foundHelper = helpers.lastUsed;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.lastUsed; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n	</tr>";
  return buffer;}
);

// template --- tmpl-targetPicker-limitData ---
Handlebars.templates['tmpl-targetPicker-limitData'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"limitDataTo\">\n		<div class=\"limitDataToSec\">\n			<span class=\"spanTitle\">Use data from</span> \n		</div>\n		<div class=\"limitDataToSec\">\n			<select name=\"dateTypeSelect\">\n				<option value=\"last30Days\">Last 30 days</option>\n				<option value=\"last60Days\">Last 60 days</option>\n				<option value=\"last90Days\">Last 90 days</option>\n				<option value=\"last180Days\">Last 180 days</option>\n				<option value=\"last365Days\">Last 365 days</option>\n				<option value=\"last2Years\">Last 2 years</option>\n				<option value=\"last3Years\">Last 3 years</option>\n				<option value=\"inCustomDateRange\">In custom date range</option>\n			</select>\n		</div>\n		<div class=\"limitDataToSec\">\n			<span class=\"dateInputs\">\n				<label>from</label>\n				<input type=\"text\" name=\"startDate\" value=\"mm/dd/yy\"/>\n				<label>to</label>\n				<input type=\"text\" name=\"endDate\" value=\"mm/dd/yy\"/>\n			</span>\n			<br/>\n			<span class=\"message\"></span>\n		</div>\n		<div class=\"cb\"></div>\n	</div>";}
);

// template --- tmpl-userInsightPicker ---
Handlebars.templates['tmpl-userInsightPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"userInsightPicker\">\n		<div class=\"icoDiv resizeHandler\"></div>\n		<div class=\"userInsightPicker-top\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">Select User(s) to View</div>\n		</div>\n		<div class=\"userInsightPicker-main\">\n			<div class=\"userInsightPicker-available\">\n				<span class=\"available-name\">Users:</span><span class=\"available-count\">0</span>\n			</div>\n			\n			<div class=\"userInsightPicker-filter\">\n				<div class=\"filter-head\">\n					<div class=\"filter-title exp\">\n						<span class=\"collapsible exp\">[-]</span>\n						<span class=\"collapsible col\">[+]</span>\n						<span class=\"title\">Filter by</span>\n					</div>\n					<div class=\"filter-option\" style=\"display:none\">\n						<span class=\"option-ico\">&nbsp;</span><a class=\"option-label\" href=\"##1\">Options</a>\n					</div>\n				</div>\n				<div class=\"filter-body\">\n					<div class=\"filter-content\">\n						<div class=\"filter-content-section\">\n							<div class=\"sec\"><span>Recipient Id&nbsp;</span><input class=\"fi filter-recipientId\" /></div>\n							<div class=\"sec\" style=\"display:none\"><span>Name&nbsp;</span><input class=\"fi filter-name\" /></div>\n							<div class=\"sec\" style=\"display:none\">\n								<span>Date Added</span>\n								<select class=\"date-select\">\n									<option value=\"after\"  >after</option>\n									<option value=\"before\" >before</option>\n								<select/>\n								<input class=\"dateAddedRange\" />\n							</div>\n							<div class=\"clear\"></div>\n						</div>\n						\n						<div class=\"filter-content-section\" style=\"display:none\">\n							<div class=\"sec\">\n								<span>Open Rate</span>\n								<select class=\"compare-select\">\n									<option value=\"D\">&gt;</option>\n									<option value=\"S\">&lt;</option>\n								<select/>\n								<input data-name=\"Open Rate\" class=\"fi rate-input\" />\n								<span>%</span>\n							</div>\n							<div class=\"sec\">\n								<span>Click Rate</span>\n								<select class=\"compare-select\">\n									<option value=\"D\">&gt;</option>\n									<option value=\"S\">&lt;</option>\n								<select/>\n								<input data-name=\"Click Rate\" class=\"fi rate-input\" />\n								<span>%</span>\n							</div>\n							<div class=\"sec\">\n								<span>Conv. Rate</span>\n								<select class=\"compare-select\">\n									<option value=\"D\">&gt;</option>\n									<option value=\"S\">&lt;</option>\n								<select/>\n								<input data-name=\"Conv. Rate\" class=\"fi rate-input\" />\n								<span>%</span>\n							</div>\n							<div class=\"sec\">\n								<span>Converions</span>\n								<select class=\"compare-select\">\n									<option value=\"D\">&gt;</option>\n									<option value=\"S\">&lt;</option>\n								<select/>\n								<input data-name=\"Converions\" class=\"fi rate-input\" />\n								<span>%</span>\n							</div>\n							<div class=\"sec\">\n								<span>Revenue</span>\n								<select class=\"compare-select\">\n									<option value=\"D\">&gt;</option>\n									<option value=\"S\">&lt;</option>\n								<select/>\n								<span>";
  foundHelper = helpers.currency;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.currency; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n								<input data-name=\"Revenue\" class=\"fi currency-input\" />\n							</div>\n							<div class=\"clear\"></div>\n						</div>\n					</div>\n					\n					<div class=\"filter-bottom\">\n						<div class=\"SMA-REPORT-USERINSIGHTPICKERFIND btn find\">Find</div>\n						<div class=\"SMA-REPORT-USERINSIGHTPICKERRESET btn reset\">Reset</div>   \n						<div class=\"error-message\"><span class=\"msg-content\"></span></div>\n						<div class=\"clear\"></div>   \n					</div>\n				</div>\n				\n			</div>\n			\n			<div class=\"userInsightPicker-table\">\n				<table class=\"dataTable\" data-type=\"mailing\">\n					<thead>\n						<tr>\n							<th class=\"first\"><div><input type=\"checkbox\" class=\"btnBatchAction\"/></div></th>\n							<th class=\"sortable email\" data-column=\"email\"><span class=\"thSortName\">Recipient Id</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<!--\n							<th class=\"sortable name\" data-column=\"name\"><span class=\"thSortName\">Name</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<th class=\"sortable\" data-column=\"dateAdded\"><span class=\"thSortName\">Date Added</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<th class=\"sortable rate\" data-column=\"openRate\"><span class=\"thSortName\">Open Rate</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<th class=\"sortable rate\" data-column=\"clickRate\"><span class=\"thSortName\">Click Rate</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<th class=\"sortable rate\" data-column=\"conversionRate\"><span class=\"thSortName\">Conv. Rate</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<th class=\"sortable\" data-column=\"conversions\"><span class=\"thSortName\">Conversions</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							<th class=\"sortable last\" data-column=\"revenue\"><span class=\"thSortName\">Revenue</span><span class=\"sort asc\">&uarr;</span><span class=\"sort desc\">&darr;</span></th>\n							-->\n						</tr>\n					</thead>\n					<tbody>\n					</tbody>\n				</table>\n			</div>\n			\n			<div class=\"dataTable-bottom\">									\n			</div>\n			\n		</div>\n		<div class=\"userInsightPicker-bottom\">\n			<div class=\"SMA-REPORT-USERINSIGHTPICKERDONEBUTTON btn done\">View</div>\n			<div class=\"SMA-REPORT-USERINSIGHTPICKERSELECTBUTTON btn select\">Select</div>\n			<div class=\"SMA-REPORT-USERINSIGHTPICKERCANCELBUTTON btn cancel\">Cancel</div>\n			<div class=\"clear\"></div>\n		</div>\n		<div class=\"reportPicker-data-loading\">\n          <div>\n          	<span class=\"loading-data-gif\">&nbsp;</span><span>Loading data...</span>\n		  </div>\n	   </div>\n	</div>";
  return buffer;}
);

// template --- tmpl-userInsightPicker-dataTable-tr ---
Handlebars.templates['tmpl-userInsightPicker-dataTable-tr'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "checked";}

function program3(depth0,data) {
  
  
  return "checked=\"checked\"";}

  buffer += "<tr data-obj.id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"  data-obj.name=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n			<td class=\"first\">\n				<div><input ";
  stack1 = depth0.isSelected;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " type=\"checkbox\" class=\"btnAction\"/></div>\n			</td>\n			<td><span>";
  foundHelper = helpers.recipientId;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.recipientId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</td>\n			<!--\n			<td><span>";
  foundHelper = helpers.dateAdded;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dateAdded; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></td>\n			-->\n	</tr>";
  return buffer;}
);

// template --- tmpl-userInsightPicker-pagination ---
Handlebars.templates['tmpl-userInsightPicker-pagination'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n		<span class=\"nums\">\n			<span class=\"prevStart ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;&lt;</span>\n			<span class=\"prev ";
  stack1 = depth0.isFirst;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&lt;</span>\n			";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageNum;
  foundHelper = helpers.equalOr;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, 1, stack1, 2, {hash:{},inverse:self.program(13, program13, data),fn:self.program(6, program6, data)}) : helperMissing.call(depth0, "equalOr", stack2, 1, stack1, 2, {hash:{},inverse:self.program(13, program13, data),fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			<span class=\"next ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(24, program24, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;</span>\n			<span class=\"nextEnd ";
  stack1 = depth0.isLast;
  stack1 = helpers.unless.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">&gt;&gt;</span>\n		</span>\n	";
  return buffer;}
function program2(depth0,data) {
  
  
  return "action";}

function program4(depth0,data) {
  
  
  return "action";}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n				";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(10, program10, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " \n					";
  stack1 = depth0.pageNum;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 6, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)}) : helperMissing.call(depth0, "listNum", 1, 6, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n					";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)}) : helperMissing.call(depth0, "listNum", 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program11(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>  \n					";
  return buffer;}

function program13(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n				";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.gtSum;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, 3, {hash:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data)}) : helperMissing.call(depth0, "gtSum", stack2, stack1, 3, {hash:{},inverse:self.program(17, program17, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageNum;
  stack3 = depth0.pageNum;
  foundHelper = helpers.reListNumber;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, 2, stack2, 3, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)}) : helperMissing.call(depth0, "reListNumber", stack3, 2, stack2, 3, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n						<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n					";
  return buffer;}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n					";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 6, {hash:{},inverse:self.program(21, program21, data),fn:self.program(18, program18, data)}) : helperMissing.call(depth0, "gt", stack1, 6, {hash:{},inverse:self.program(21, program21, data),fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n				";
  return buffer;}
function program18(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  stack3 = depth0.pageSize;
  foundHelper = helpers.reListNumber;
  stack1 = foundHelper ? foundHelper.call(depth0, stack3, 6, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)}) : helperMissing.call(depth0, "reListNumber", stack3, 6, stack2, 0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program19(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}

function program21(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n						";
  stack1 = depth0.pageNum;
  stack2 = depth0.pageSize;
  foundHelper = helpers.listNum;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)}) : helperMissing.call(depth0, "listNum", 1, stack2, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n					";
  return buffer;}
function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n							<span class=\"pageNum ";
  foundHelper = helpers.css;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.css; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-num='";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "'>";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> \n						";
  return buffer;}

function program24(depth0,data) {
  
  
  return "action";}

function program26(depth0,data) {
  
  
  return "action";}

function program28(depth0,data) {
  
  
  return "selected";}

function program30(depth0,data) {
  
  
  return "selected";}

function program32(depth0,data) {
  
  
  return "selected";}

function program34(depth0,data) {
  
  
  return "selected";}

function program36(depth0,data) {
  
  
  return "selected";}

function program38(depth0,data) {
  
  
  return "selected";}

function program40(depth0,data) {
  
  
  return "selected";}

  buffer += "<div class=\"userInsightPicker-pagination\" data-pageNum=\"";
  foundHelper = helpers.pageNum;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.pageNum; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n	<span class=\"info\">Rows: ";
  foundHelper = helpers.startRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.startRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " - ";
  foundHelper = helpers.endRows;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.endRows; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " of ";
  foundHelper = helpers.sizeCount;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sizeCount; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>\n	";
  stack1 = depth0.pageSize;
  foundHelper = helpers.gt;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "gt", stack1, 1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		<span class=\"showRows\">\n			<span class=\"show-label\">Show</span>\n			<select name=\"SMA-REPORT-PAGECOUNT pageCount\">\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 10, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)}) : helperMissing.call(depth0, "equal", stack1, 10, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">10</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 15, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)}) : helperMissing.call(depth0, "equal", stack1, 15, {hash:{},inverse:self.noop,fn:self.program(30, program30, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">15</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 25, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)}) : helperMissing.call(depth0, "equal", stack1, 25, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">25</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 50, {hash:{},inverse:self.noop,fn:self.program(34, program34, data)}) : helperMissing.call(depth0, "equal", stack1, 50, {hash:{},inverse:self.noop,fn:self.program(34, program34, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">50</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 100, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)}) : helperMissing.call(depth0, "equal", stack1, 100, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">100</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 500, {hash:{},inverse:self.noop,fn:self.program(38, program38, data)}) : helperMissing.call(depth0, "equal", stack1, 500, {hash:{},inverse:self.noop,fn:self.program(38, program38, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">500</option>\n			<option ";
  stack1 = depth0.pageCount;
  foundHelper = helpers.equal;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "all", {hash:{},inverse:self.noop,fn:self.program(40, program40, data)}) : helperMissing.call(depth0, "equal", stack1, "all", {hash:{},inverse:self.noop,fn:self.program(40, program40, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">All</option>\n			</select>\n			<span class=\"rows-label\">Rows</span>\n		</span>\n	</div>";
  return buffer;}
);

// template --- tmpl-viewEmailsPicker ---
Handlebars.templates['tmpl-viewEmailsPicker'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"viewEmailsPicker\">\n		<div class=\"viewEmailsPicker-top\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">";
  foundHelper = helpers.extTitle;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.extTitle; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"viewEmailsPicker-main\">\n			<div class=\"viewEmailsPicker-content\">\n				\n			</div>\n		</div>\n		<div class=\"viewEmailsPicker-bottom\">\n			<div class=\"SMA-REPORT-VIEWEMAILSPICKERCANCELBUTTON btn cancel\">Close</div>\n		</div>\n	</div>";
  return buffer;}
);

// template --- tmpl-viewTips ---
Handlebars.templates['tmpl-viewTips'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "style=\"display:none\"";}

  buffer += "<div class=\"viewTips\" style=\"";
  foundHelper = helpers.style;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.style; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<div class=\"viewTips-top\">\n			<div class=\"icoDiv close\"><span class=\"ico ico-close\"></span></div>\n			<div class=\"title\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"viewTips-main\">\n			<div class=\"viewTips-content\">";
  foundHelper = helpers.content;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>\n		</div>\n		<div class=\"viewTips-bottom\" ";
  stack1 = depth0.doNotShowBtn;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">\n			<div class=\"SMA-REPORT-VIEWEMAILSPICKERCANCELBUTTON btn cancel\">Close</div>\n		</div>\n	</div>";
  return buffer;}
);
