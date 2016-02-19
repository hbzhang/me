'use strict';

angular.module('mean.product').controller(
    'ClassController',
    ['$rootScope','$state',
     'toaster', '$scope',
     '$location', '$stateParams',
     'focus', 'FileUploader',
     'Global', 'Class',
     'Feedback', 'Upload',
     'Comment',
     function($rootScope,$state,toaster,
             $scope, $location,
             $stateParams, focus,
             FileUploader, Global,
             Class, Feedback,
             Upload, Comment) {
        $scope.global = Global;
        $scope.package = {
            name: 'class'
        };

        $scope.error = "";
        $scope.pop = function(){
            if($scope.error.length > 0)
                toaster.pop('success', "oh, something wrong!", $scope.error, 4500, 'trustedHtml', 'goToLink');
            else
                toaster.pop('success', "", 'your work is submitted', 4500, 'trustedHtml', 'goToLink');
        };

        $scope.thisclass = {};
        $scope.createClass=true;
        $scope.thisclass.weekdays=[];
        $scope.thisclass.exclusiondates=[];

        $scope.isAdmin = function(class_) {
            if (!class_) return false;
            return $scope.global.isAdmin;
        };

        $scope.isInstructorClass = function(class_) {
            if (!class_) return false;
            return $scope.global.isAdmin || (class_.instructor && class_.instructor._id === $scope.global.user._id);
        };

        $scope.today = new Date();
        $scope.startopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.thisclass.startopened = true;
        };

        $scope.endopen = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.thisclass.endopened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yyyy',
            startingDay: 1
        };

        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.format = 'MM/dd/yyyy';
        $scope.dateValid = false;

        $scope.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wendsday', 'Thursday', 'Friday', 'Saturday'];
        $scope.toggleSelection = function(day) {
            var idx = $scope.thisclass.weekdays.indexOf(day);
            if (idx === -1) {
                $scope.thisclass.weekdays.push(day);
            } else {
                $scope.thisclass.weekdays.splice(idx, 1);
            }
        };

        $scope.toggleExclusion = function(date) {
            var idx = $scope.thisclass.exclusiondates.indexOf(date);
            if (idx === -1) {
                $scope.thisclass.exclusiondates.push(date);
            } else {
                $scope.thisclass.exclusiondates.splice(idx, 1);
            }
        };

        $scope.syllabuslist = [];
        $scope.syllabuses = [];

        $scope.classUpdate = function(isValid) {
            var class_ = $scope.thisclass;
            class_.$update(function(res) {
                $scope.error = "";
                $location.path('class/view/' + res._id);
            },function(error) {
                $scope.error = error.data.error;
                alert($scope.error);
                //console.log(error.data.error);
            });
        };


        $scope.generateAllDates = function(class_) {
            if (class_.startdate === undefined || class_.enddate === undefined ||
                    class_.weekdays.length === 0 || class_.enddate < class_.startdate) {
                return [];
            }


            var d = new Date(class_.startdate);//.getTime()
            var dend = new Date(class_.enddate);



            var all = [];
            // Find all possible dates
            while (d <= dend) {
                for (var wd in class_.weekdays) {
                    if (d.getDay() === class_.weekdays[wd]) {
                        all.push(new Date(d.getTime()));
                    }
                }
                d.setDate(d.getDate() + 1);
            }

            //console.log(all);

            return all;
        };

        $scope.validateDate = function(date) {

            var d = new Date($scope.thisclass.startdate);
            var dend = new Date($scope.thisclass.enddate);

            if (typeof date === 'undefined')
            return;


            if (d > dend) {
                $scope.dateValid = false;
            } else {
                $scope.dateValid = true;
            }

            if ($scope.thisclass.weekdays.indexOf(d.getDay()) === -1) {
                $scope.startdateValid = false;
                $scope.dateValid = false;
            } else {
                $scope.startdateValid = true;
            }
            if ($scope.thisclass.weekdays.indexOf(dend.getDay()) === -1) {
                $scope.enddateValid = false;
                $scope.dateValid = false;
            } else {
                $scope.enddateValid = true;
            }
        };

        $scope.$watchGroup(['thisclass.startdate', 'thisclass.enddate', 'thisclass.weekdays.length'], function(newv, oldv, scope) {
            if (scope.thisclass !== undefined && scope.createClass !== undefined) {
                scope.thisclass.alldates = $scope.generateAllDates(scope.thisclass);
                scope.thisclass.exclusiondates = [];
                scope.validateDate(scope.thisclass.startdate);
            }
        });

        $scope.thisclass.weektime = new Date();
        $scope.classSubmit = function(isValid) {

            var syllabusids = [];

            if ($scope.thisclass.weektime === undefined) {
                $scope.thisclass.weektime = new Date();
            }


            /*for (var syllabus in $scope.syllabuslist) {
                console.log(syllabus);
                syllabusids.push(syllabus._id);
            }*/

            $scope.syllabuslist.map(function(item) {
                    syllabusids.push(item._id);
                }
            )
            console.log(syllabusids);

            var class_ = new Class.class_({
                title: $scope.thisclass.title,
                description: $scope.thisclass.description,
                location: $scope.thisclass.location,
                startdate: $scope.thisclass.startdate,
                enddate: $scope.thisclass.enddate,
                emailtemplate: $scope.thisclass.emailtemplate,
                exclusiondates: $scope.thisclass.exclusiondates,
                weekdays: $scope.thisclass.weekdays,
                weektime: $scope.thisclass.weektime,
                capacity: $scope.thisclass.capacity,
                instructor: $scope.thisclass.instructor._id,
                thumbnail: $scope.thisclass.thumbnail._id,
                syllabus: syllabusids //$scope.syllabuslist
            });

            console.log("instructor ID: " + $scope.thisclass.instructor._id);
            class_.$save(function(data) {
                console.log(data);
                $scope.error = "";
                //$location.path('class/view/' + res._id);
            }, function(error){
                $scope.error = error.data.error;
                alert($scope.error);
            });
        };

        $scope.reloadAllClasses = function(){
            //console.log('reload now');
            $scope.listClass();
        };


        $scope.listClass = function() {
            Class.class_.query(function(classes) {
                $scope.classes = classes;
                //console.log(classes);
            });
        };

        $scope.getClassByInstructor = function() {
            Class.classByInstructor.query({instructorId: $stateParams.instructorId}, function(classes) {
                $scope.classes = classes;
                $scope.instructorname = classes[0].instructor.name;
            });
        };

        $scope.getClassByLocation = function() {
            Class.classByLocation.query({location: $stateParams.location}, function(classes) {
                $scope.classes = classes;
                $scope.locationname = classes[0].location;
            });
        };

        $scope.getClassByStudent = function() {
            Class.classByStudent.query({studentId: $scope.global.user._id}, function(classes) {
                $scope.classes = classes;
            });
        };

        $scope.getInstructors = function() {
            Class.instructors.query(function(instructors) {
                $scope.instructorList = instructors;
            });
        };

        $scope.joinClass = function(classid) {
            Class.join.get({classId:classid}, function(student) {
                $scope.findOne();
            });
        };

        $scope.removeClass = function(class_) {
            if (class_) {
                Class.class_.delete({classId:class_._id}, function(c) {
                    for (var i = 0; i < $scope.classes.length; i += 1) {
                        if ($scope.classes[i]._id === class_._id) {
                            $scope.classes.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.classes.$remove(function(response) {
                    $location.path('class');
                });
            }
        };

        $scope.removeFile = function(fileId) {
            if (fileId) {
                Upload.upload.delete({fileId:fileId}, function(f) {
                    for (var i in $scope.thisclass.syllabus) {
                        if ($scope.thisclass.syllabus[i].fileid === fileId) {
                            $scope.thisclass.syllabus.splice(i, 1);
                        }
                    }
                });
            }
        };

        $scope.removeFeedback = function(feedback) {
            if (feedback) {
                Feedback.feedback.delete({feedbackId:feedback._id}, function(f) {
                    for (var i in $scope.thisclass.feedbacks) {
                        if ($scope.thisclass.feedbacks[i] === feedback) {
                            $scope.thisclass.feedbacks.splice(i, 1);
                        }
                    }
                });
            }
        };

        $scope.findOne = function() {
            $scope.getInstructors();
            Feedback.feedbackByClass.query({classId: $stateParams.classId
            }, function(feedbacks) {
                $scope.thisclass.feedbacks = feedbacks;
            });

            Class.class_.get({
                classId: $stateParams.classId
            }, function(class_) {
                $scope.thisclass = class_;
                $scope.thisclass.feedbacks = class_.feedbacks === undefined ? [] : class_.feedbacks;
                $scope.thisclass.inclass = false;
                $scope.hasTn = $scope.thisclass.thumbnail !== undefined;
                for (var s in class_.students) {
                    var cur = class_.students[s];
                    if (cur._id === $scope.global.user._id) {
                        $scope.thisclass.inclass = true;
                        break;
                    }
                }

                for (var il in $scope.instructorList) {
                    if ($scope.instructorList[il]._id === class_.instructor._id) {
                        $scope.thisclass.instructor = $scope.instructorList[il];
                        break;
                    }
                }

                for (var i in class_.syllabus) {
                    $scope.syllabuses.push(class_.syllabus[i]._id);
                }
                $scope.syllabuslist = class_.syllabus;
                if ($scope.createClass !== undefined) {
                    //alert('hehe');
                    $scope.validateDate();
                }
            });

            Comment.commentByClass.query({
                classId: $stateParams.classId
            }, function(comments) {
                $scope.thisclass.comments = comments;
            });

        };

        $scope.feedbackSubmit = function() {
            var f = new Feedback.feedback({
                owner: $scope.global.user._id,
                class_: $stateParams.classId,
                content: $scope.feedback
            });
            f.$save(function(f, res) {
                f.owner = $scope.global.user;
                $scope.feedback = '';
                $scope.thisclass.feedbacks.push(f);
            });
        };

        $scope.leaveComment = function(student) {
            focus('comment');
            $scope.commentStudent = student;
            $scope.commentbox = true;
        };

        $scope.commentSubmit = function() {
            $scope.commentbox = false;
            var c = new Comment.comment({
                instructor: $scope.global.user._id,
                student: $scope.commentStudent._id,
                class_: $stateParams.classId,
                content: $scope.comment
            });
            c.$save(function(cc, res) {
                cc.student = $scope.commentStudent;
                $scope.thisclass.comments.push(cc);
            });
            $scope.comment = '';
        };

        $scope.removeComment = function(c) {
            if (c) {
                Comment.comment.delete({commentId:c._id}, function(cc) {
                    for (var i in $scope.thisclass.comments) {
                        if ($scope.thisclass.comments[i]._id === c._id) {
                            $scope.thisclass.comments.splice(i, 1);
                            break;
                        }
                    }
                });
            }
        };

        $scope.dropStudent = function(student) {
            var dropfunc = function(res) {
                $scope.thisclass = res;
            };
            for (var s in $scope.thisclass.students) {
                if (student._id === $scope.thisclass.students[s]._id) {
                    $scope.thisclass.students.splice(s, 1);

                    var class_ = $scope.thisclass;
                    class_.$update(dropfunc);
                    break;
                }
            }
        };

        $scope.hasTn = false;
        var tnuploader = $scope.tnuploader = new FileUploader({
            //scope: $scope,
            autoUpload:true,
            url: '/upload',
            queueLimit: 1
        });

        $scope.tnuploadComplete = true;
        $scope.tnupload = function() {
            $scope.tnuploadComplete = false;
            tnuploader.uploadAll();

        };

        tnuploader.onSuccessItem = function(item, res, status, header) {
            console.log('hahaasdasdads');
            $scope.tnuploadComplete = true;
            $scope.thisclass.thumbnail = res;
            $scope.hasTn = true;
            console.log('eee');
        };

        tnuploader.onErrorItem = function(item, response, status, headers) {

            console.log('error');
        }


        tnuploader.onAfterAddingFile = function(item) {

            console.log(item);
        }

        var uploader = $scope.uploader = new FileUploader({
            scope: $scope,
            autoUpload:true,
            url: '/upload'
        });

        $scope.uploadComplete = true;
        $scope.upload = function() {
            $scope.uploadComplete = false;
            uploader.uploadAll();
        };

        uploader.onSuccessItem = function(item, res, status, header) {
            $scope.uploadComplete = true;
            $scope.syllabuses.push(res._id);
            $scope.syllabuslist.push(res);
        };

        $scope.filterlist = [
            {name: 'Location'},
            {name: 'Instructor'},
            {name: 'Class Name'}
        ];

        Class.locations.query({}, function(locations) {
            $scope.locations = locations;
        });

        $scope.applyFilter = function(filterselect, namefilter, instructorfilter, locationfilter) {
            var newlocation = '#';
            //console.log(locationfilter);
            switch (filterselect.name) {
                case 'Location':
                    newlocation = '/#!/class/location/' + locationfilter;
                    break;
                case 'Instructor':
                    newlocation = '/#!/class/instructor/' + instructorfilter._id;
                    break;
                case 'Class Name':
                    newlocation = '/#!/class/view/' + namefilter._id;
                    break;
                default:
                    break;
            }
            window.location = newlocation;

        };

        $scope.instructorfilter = [];
        $scope.locationfilter = '';
        $scope.namefilter = [];


        $scope.changedValuename = function(opt1,opt2) {

            //$state.go($state.current, {}, {reload: true});
            //console.log('reload class from server');
            //console.log(opt1);
            $scope.instructorfilter = [];
            $scope.locationfilter = '';
         };

        $scope.changedValueinstructor = function(opt1, opt2) {

            $scope.namefilter = [];
            $scope.locationfilter = '';
        };

        $scope.changedValuelocation = function(opt1, opt2) {
            console.log(opt1);
            $scope.instructorfilter = [];
            $scope.namefilter = [];
        };


        $scope.getInstructors();
    }
]);
