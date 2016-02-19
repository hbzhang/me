angular.module('componentshtmltemplate.templates', ['templates/htmls/checkbox.html', 'templates/htmls/checkboxpopup.html', 'templates/htmls/personnamepopup.html', 'templates/htmls/personname.html', 'templates/htmls/fbcomponents.html']);

angular.module("templates/htmls/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/htmls/checkbox.html",
    "<div class=\"form-group\">\n" +
    "       <label for=\"{{formName+index}}\" class=\"col-sm-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n" +
    "          <div class=\"col-sm-8\">\n" +
    "                <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n" +
    "                       <div class='checkbox' ng-repeat=\"item in options track by $index\">\n" +
    "                                  <label><input type='checkbox' ng-model=\"inputArray_CheckBox[$index]\" \n" +
    "                                  	id=\"{{formName+index}}-{{$index}}\"/>\n" +
    "                                  {{item}}\n" +
    "                                  </label>\n" +
    "                       </div>\n" +
    "       <p class='help-block'>{{description}}</p>\n" +
    "   </div>\n" +
    "</div>\n" +
    "   ");
}]);

angular.module("templates/htmls/checkboxpopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/htmls/checkboxpopup.html",
    "<form>\n" +
    "    <div class=\"form-group\"> \n" +
    "           <label class='control-label'>Label</label>      \n" +
    "           <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n" +
    "   </div>    \n" +
    "   <div class=\"form-group\">\n" +
    "   <label class='control-label'>Description</label>\n" +
    "          <input type='text' ng-model=\"description\" class='form-control'/>    \n" +
    "   </div>\n" +
    "   <div class=\"form-group\"> \n" +
    "           <label class='control-label'>Options</label>\n" +
    "           <textarea class=\"form-control\" rows=\"3\" ng-model=\"optionsText\"/>\n" +
    "   </div>\n" +
    "   <div class=\"checkbox\">    \n" +
    "           <label> \n" +
    "           <input type='checkbox' ng-model=\"required\" />            Required        \n" +
    "          </label>  \n" +
    "   </div>\n" +
    "   <hr/>\n" +
    "   <div class='form-group'>        \n" +
    "   	<input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>        \n" +
    "   	<input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>        \n" +
    "   	<input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>   \n" +
    "   </div>\n" +
    "</form>\n" +
    "  ");
}]);

angular.module("templates/htmls/personnamepopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/htmls/personnamepopup.html",
    "<form>\n" +
    "   <div class=\"form-group\">\n" +
    "          <label class='control-label'>Label</label>\n" +
    "                 <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n" +
    "                     </div>    \n" +
    "                     <div class=\"checkbox\">        \n" +
    "          <label>\n" +
    "          <input type='checkbox' ng-model=\"required\" />  Required </label>\n" +
    "   </div>\n" +
    "   <hr/> \n" +
    "   <div class='form-group'>  <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n" +
    "   <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n" +
    "   <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n" +
    "   </div>\n" +
    "</form>\"\n" +
    "    ");
}]);

angular.module("templates/htmls/personname.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/htmls/personname.html",
    "<div class=\"form-group\">\n" +
    "     <label for=\"{{formName+index}}\" class=\"col-md-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n" +
    "        <div class=\"col-md-8\">\n" +
    "              <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n" +
    "                     <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n" +
    "                                 <input type=\"text\"  ng-model=\"inputArray[0]\"  class=\"form-control\" id=\"{{formName+index}}-0\"/>\n" +
    "                   \n" +
    "                               <p class='help-block'>First name</p> \n" +
    "                     </div>       \n" +
    "                     <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n" +
    "                      <input type=\"text\"  ng-model=\"inputArray[1]\"\n" +
    "                                      class=\"form-control\" id=\"{{formName+index}}-1\"/>  \n" +
    "                                       <p class='help-block'>Last name</p>      \n" +
    "                     </div>\n" +
    "       </div>\n" +
    "</div>\"\n" +
    "    ");
}]);

angular.module("templates/htmls/fbcomponents.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/htmls/fbcomponents.html",
    "<!--<ul ng-if=\"groups.length > 1\" class=\"nav nav-tabs nav-justified\">\n" +
    "    <li ng-repeat=\"group in groups\" ng-class=\"{active:activeGroup==group}\">\n" +
    "           <a href='#' ng-click=\"selectGroup($event, group)\">{{group}}</a>\n" +
    "    </li>\n" +
    " </ul>\n" +
    " <div class='form-horizontal'>\n" +
    "    	<accordion close-others=\"oneAtATime\">\n" +
    "    	<accordion-group heading=\"asd\" is-open=\"status.isFirstOpen\" >\n" +
    "    	  <div class='fb-component' ng-repeat=\"component in components\"        \n" +
    "    	  fb-component=\"component\">\n" +
    "    	   </div>\n" +
    "    	</accordion-group>\n" +
    "    	</accordion>\n" +
    " </div> \n" +
    "\n" +
    "\n" +
    "\n" +
    "-->\n" +
    "\n" +
    "<tabset>\n" +
    "        <tab heading={{group.name}} ng-repeat=\"group in nav_tree_array\" >\n" +
    "          <div class='form-horizontal'>\n" +
    "            <accordion close-others=\"oneAtATime\">\n" +
    "                <accordion-group ng-repeat=\"item in child_array_accordin($event, group)\"  heading={{item}} >\n" +
    "\n" +
    "                <div ng-if=\"!according_item_is_tabs($event, group,item )\" class='fb-component' ng-repeat=\"component in child_array_components($event, group,item)\"        \n" +
    "                     fb-component=\"component\">\n" +
    "                </div>\n" +
    "\n" +
    "               <tabset ng-if=\"according_item_is_tabs($event, group,item )\">\n" +
    "                <tab heading={{tab[0].group}} ng-repeat=\"tab in child_array_tabs($event, group,item)\"  >\n" +
    "                \n" +
    "                   <div class='fb-component' ng-repeat=\"component in child_array_tab_components($event, group,item,tab)\"        \n" +
    "                     fb-component=\"component\">\n" +
    "                </div>\n" +
    "                </tab>\n" +
    "               <tabset>\n" +
    "\n" +
    "              \n" +
    "                 </accordion-group>\n" +
    "             </accordion>\n" +
    "          </div>\n" +
    "        </tab>\n" +
    " <tabset>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    ");
}]);
