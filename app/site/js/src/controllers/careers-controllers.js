var app  = angular.module('tourepedia')
.controller('CareerController', ['$scope','JobApplicationService', function(scope, jobService){

    scope.submittingJobApplication = false;

    scope.availableJobs = [];

    jobService.getJobs().then(function(resp){
        console.log(resp.data);
        scope.availableJobs = resp.data;
    });


    scope.selectedJob  = {};
    scope.applicant = {'gitHub': '', 'linkedin':''};

    scope.setSelectedJob = function(job){
        scope.selectedJob = job;
        scope.applicant.jobTitle = job.title;
    };



    scope.submitJobApplication = function(){
        scope.submittingJobApplication = true;
        jobService.apply(scope.applicant).then(function(resp){
            console.log(resp.data);
            scope.submittingJobApplication = false;
            var data = resp.data;
            if(data.applicationSubmitted){
                alert("Your form successfully submitted. You will  be contacted soon.");
                CloseDialog('job-apply-dialog');
            }else{
                alert("We are facing some problems while processing request. Please try after sometime.");
            }
        });
    };

}]);
