'use strict';

angular.module('mean.product').controller('AnnouncementController', ['$rootScope','toaster','$scope', '$location', '$state', '$stateParams', 'Global', 'Class', 'Announcement',
    function($rootScope, toaster,$scope, $location,$state, $stateParams, Global, Class, Announcement) {
        $scope.global = Global;

       $scope.pop = function(){
            toaster.pop('success', "Good Work", 'The item was just created', 4500, 'trustedHtml', 'goToLink');
        };

        $scope.findClasses = function() {
            if ($scope.global.user.roles.indexOf('admin')) {
                Class.class_.query(function(classes) {
                    $scope.classlist = classes;
                });
            } else {
                Class.classByInstructor.query({instructorId: $scope.global.user._id}, function(classes) {
                    $scope.classlist = classes;
                });
            }
        };

        $scope.listClass = function() {
            Class.class_.query(function(classes) {
                $scope.classes = classes;
            });
        };

        $scope.reloadAllAnnouncements = function(){
            console.log('reload now');
            $scope.announcementList();
        };

        $scope.announcementSubmit = function() {
            var a = new Announcement.announcement({
                class_: $scope.announceclass._id,
                title: $scope.title,
                content: $scope.content
            });

            a.$save(function(res) {
                //$location.path('managementa');
                 console.log(toaster);
               //$rootScope.$broadcast("importandDataChanged");
               //$state.go($state.current, {}, {reload: true});
              //$state.forceReload();
            });
         };

        $scope.announcementList = function() {
            Announcement.announcementByClass.query({}, function(announcements) {
                $scope.announcementlist = announcements;
            });
        };

        $scope.announcementListByClass = function() {
            Announcement.announcementByClass.query({classId: $stateParams.classId}, function(announcements) {
                $scope.announcementlist = announcements;
            });
        };
    }
]);
