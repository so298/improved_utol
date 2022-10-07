function save_options() {
  // hide courses
  const hide_course_text = document.getElementById("hide-course-list").value;
  const hide_course_list = hide_course_text.split("\n");
  chrome.storage.sync.set(
    { "hide-course-list": hide_course_list },
    function () {}
  );

  // colorize approaching tasks
  const checked = document.getElementById("highlight-check").checked;
  const color = document.getElementById("highlight-color").value;
  const time = parseInt(document.getElementById("highlight-time").value);
  chrome.storage.sync.set(
    {
      "highlight-check": checked,
      "highlight-color": color,
      "highlight-time": time,
    },
    function () {}
  );
}

chrome.storage.sync.get(
  ["hide-course-list", "highlight-check", "highlight-color", "highlight-time"],
  function (value) {
    const hide_list = value["hide-course-list"];
    const highlight_flag = value["highlight-check"];
    const color = value["highlight-color"];
    const highlight_time = value["highlight-time"];

    if (hide_list != undefined) {
      const text = hide_list.join("\n");
      document.getElementById("hide-course-list").value = text;
    }
    if (highlight_flag == true || highlight_flag == false) {
      document.getElementById("highlight-check").checked = highlight_flag;
    }
    if (color != undefined) {
      document.getElementById("highlight-color").value = color;
    }
    if (highlight_time != undefined) {
      document.getElementById("highlight-time").value = highlight_time;
    }
  }
);

document.getElementById("save_options").addEventListener("click", save_options);
