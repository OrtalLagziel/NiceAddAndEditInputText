/**
 * NiceAddAndEditInputText
 * @version v0.0.1 - 2016-07-13
 * @link 
 * @author  <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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

angular.module('myModule')

    .directive('niceAddAndEditInputText', ["$translate", function ($translate) {
        'use strict';
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'NiceAddAndEditInputText.html',
            scope: {
                ngModel: '=',
                isMaster: '=?',
                ngDisabled: '=?',
                titles: '=?',
                limitInputs: '=?',
                actionAdd: '&?',
                actionRemove: '&?',
                activityChanged: '&?',
                actionEdit: '&?',
                actionSaveAfterEdit: '&?',
                actionCancelAfterEdit: '&?'
            },
            link: function(scope, element, attributes, controller) {
                scope.ngDisabled = scope.ngDisabled ? scope.ngDisabled : false;
                scope.limitItemsRequired = $translate.instant('createUserModal.maxLimitOfACD' , {items: scope.limitInputs});
                scope.limitInputs = scope.limitInputs ? parseInt(scope.limitInputs) : 50;
                scope.isMaster = scope.isMaster ? scope.isMaster : false;
                scope.isDirty = false;
               // scope.controlFieldInteracted = Utils.controlFieldInteracted;
                scope.ngDisabled = scope.ngDisabled ? scope.ngDisabled : false;
                scope.notUniqeError = false;
                scope.elapseModel = function() {
                    scope.ngModel.loginId = '';
                    scope.addClicked = false;
                };
                if (scope.ngModel == null && !scope.ngDisabled) {
                    scope.ngModel = {loginId:'', editMode:false};
                }

                scope.disabledMode = !scope.ngModel.editMode && !scope.isMaster;
                scope.goToActivityChanged = function(){
                    scope.isDirty = true;
                };

                scope.isValid = function() {
                    if (!scope.isMaster) {
                        return true;
                    }

                    if (scope.titles.indexOf(scope.ngModel.loginId) !== -1) {
                        scope.notUniqeError = true;
                    }
                    else {
                        scope.notUniqeError = false;
                    }
                    if (scope.titles.length === scope.limitInputs) {
                        scope.maximumSize = true;
                    }
                    else {
                        scope.maximumSize = false;
                    }
                    return ((!scope.notUniqeError) && (scope.ngModel.loginId !== '') && (!scope.maximumSize));
                };
                scope.inputChanged = function() {
                    //scope.touched = true;
                    scope.canToAdd();
                };
                scope.canToAdd = function(){
                    if (scope.isMaster){
                        return scope.isValid();
                    }
                };

                scope.saveAfterEdit = function(ngModel) {
                    if (scope.titles.indexOf(scope.ngModel.loginId) !== -1) {
                        scope.notUniqeError = true;
                    }
                    else {
                        scope.notUniqeError = false;
                        scope.actionSaveAfterEdit(ngModel);
                    }
                };

                scope.addItem = function(){
                    scope.addClicked = true;
                    if (scope.ngModel.loginId === '') {
                        scope.isEmpty = true;
                        return;
                    }
                    if (scope.titles.length === scope.limitInputs) {
                        //scope.limitItemsRequired = $translate.instant('createUserModal.maxLimitOfACD' , {items: scope.limitInputs});
                        scope.maximumSize = true;
                        return;
                    }
                    scope.maximumSize = false;
                    scope.isEmpty = false;
                    if (scope.titles.indexOf(scope.ngModel.loginId) !== -1) {
                        scope.notUniqeError = true;
                    }
                    else {
                        scope.notUniqeError = false;
                        if (scope.canToAdd()) {
                            scope.actionAdd(scope.ngModel);
                            scope.elapseModel();
                        }
                    }
                };

                scope.getValidationClass = function() {
                    if ((!scope.isValid()) && (scope.isMaster) && (scope.ngModel.loginId !== '')) {
                        return 'invalidInput';
                    }
                };

                scope.canEdit = function() {
                    return Object.keys(scope.activityForm.$error).length === 0;
                };

                scope.removeItem = function(item){
                    scope.actionRemove(item);
                    scope.maximumSize = false;
                };
            }
        };
    }]);
