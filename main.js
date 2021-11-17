$(function(){
    'use strict';
  
    $.ajax({
        type:'GET',
        url:'/lms/task',
        dataType:'html'
    }).then(
        function(data){
            $("#timetable .header:first").before($(data).find(".block.clearfix"));
        },
        function(){
            alert("loading failed");
        }
    );
});