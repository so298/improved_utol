$(function(){
    'use strict';
  
    $.ajax({
        type:'GET',
        url:'/lms/task',
        dataType:'html'
    }).then(
        function(data){
            $("#impInformation").after($(data).find(".block.clearfix"));
        },
        function(){
            alert("loading failed");
        }
    );
});