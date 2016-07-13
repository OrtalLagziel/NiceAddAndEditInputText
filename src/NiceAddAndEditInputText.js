angular.module('myModule')

    .directive('niceAddAndEditInputText', function ($translate) {
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
    });
