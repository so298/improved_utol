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
            alert("課題リストの読み込みに失敗しました");
        }
    );
});
