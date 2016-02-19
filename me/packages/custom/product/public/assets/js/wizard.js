/**
 * Created by hbzhang on 10/30/14.
 */
angular.module('wizard', ['mgo-angular-wizard'])
    .controller('WizardCtrl', function($scope, WizardHandler) {
        $scope.finished = function() {
            alert("Wizard finished :)");
        }

        $scope.logStep = function() {
            console.log("Step continued");
        }

        $scope.goBack = function() {
            WizardHandler.wizard().goTo(0);
        }
    });