angular.module('templates-NiceAddAndEditInputText', ['NiceAddAndEditInputText.html']);

angular.module("NiceAddAndEditInputText.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("NiceAddAndEditInputText.html",
    "<div ng-form=\"inputForm\" class=\"addAndEditInputText\">\n" +
    "    <input ng-focus=\"touched = true\" ng-change=\"inputChanged()\" name=\"objectName\" class=\"form-control objectName\" ng-model=\"ngModel.loginId\" ng-disabled=\"!ngModel.editMode && !isMaster\" ng-class=\"getValidationClass()\" type=\"text\"/>\n" +
    "    <div class=\"containerButtons\">\n" +
    "        <button ng-show=\"isMaster\"  disabled=\"disabled\" class='btn btn-sm btn-primary' ng-disabled=\"!canToAdd()\" ng-click='addItem()' translate=\"commonButtons.add\"></button>\n" +
    "        <button ng-show='!isMaster && !ngModel.editMode' class='btn btn-link delete-button' ng-click='removeItem(ngModel)'></button>\n" +
    "        <button ng-show='!isMaster&& !ngModel.editMode' class='btn btn-link edit-button' ng-click='actionEdit(ngModel)'></button>\n" +
    "        <button ng-show='!isMaster && ngModel.editMode' class='btn btn-primary btn-sm' ng-click='saveAfterEdit(ngModel)' translate=\"commonButtons.save\"></button>\n" +
    "        <button ng-show='!isMaster && ngModel.editMode' class='btn btn-sm cancel-button' ng-click='actionCancelAfterEdit(ngModel)'  translate=\"commonButtons.cancel\"></button>\n" +
    "    </div>\n" +
    "    <div ng-show=\"notUniqeError && !maximumSize\"><span class=\"error-message\" translate=\"activityCodes.modal.errors.uniqueTitle\"></span></div>\n" +
    "    <!--<div ng-show=\"touched && isEmpty && !maximumSize && addClicked\"><span class=\"error-message\" translate=\"generalErrorMessages.required\"></span></div>-->\n" +
    "    <div ng-show=\"maximumSize\"><span class=\"error-message\" ng-bind=\"limitItemsRequired\"></span></div>\n" +
    "</div>\n" +
    "");
}]);
