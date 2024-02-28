function process_tasks(value) {
  const lines = document.getElementsByClassName("result_list_line");
  const len = lines.length;
  const now = Date.now();

  const hide_list = new Set(value["hide-course-list"]);
  let highlight_flag = value["highlight-check"];
  let highlight_time = value["highlight-time"];
  let color = value["highlight-color"];

  // if values are not set
  if (highlight_flag == undefined) highlight_flag = true;
  if (highlight_time == undefined) highlight_time = 48;
  if (color == undefined) color = "yellow";

  const caution_time_limit = highlight_time * 60 * 60 * 1000;

  for (let i = 0; i < len; i++) {
    // hide courses in hide list
    var title = lines[i].querySelector(
      ".tasklist-course.break.course"
    ).innerText;
    if (hide_list.has(title)) {
      lines[i].style.display = "none";
      continue;
    }

    if (highlight_flag) {
      // colorize deadline approaching tasks
      const deadline_text = lines[i].querySelector(
        ".tasklist-mobile-width-deadline.deadline"
      ).innerText;
      const deadline = Date.parse(deadline_text);
      if (deadline - now < caution_time_limit) {
        lines[i].style.backgroundColor = color;
      }
    }
  }
}

$(function () {
  "use strict";

  $.ajax({
    type: "GET",
    url: "/lms/task",
    dataType: "html",
  }).then(
    function (data) {
      $("#selectTimetable").before($(data).find(".block.clearfix"));
      chrome.storage.sync.get(
        [
          "hide-course-list",
          "highlight-check",
          "highlight-color",
          "highlight-time",
        ],
        process_tasks
      );
    },
    function () {
      alert("課題リストの読み込みに失敗しました");
    }
  );
});
