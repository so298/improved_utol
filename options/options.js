function save_options() {
    // hide courses
    var hide_course_text = document.getElementById("hide-course-list").value;
    var hide_course_list = hide_course_text.split('\n');
    chrome.storage.sync.set({'hide-course-list': hide_course_list}, function(){});

    // colorize approaching tasks
    var checked = document.getElementById('highlight-check').checked;
    var color = document.getElementById('highlight-color').value;
    var time = parseInt(document.getElementById('highlight-time').value);
    chrome.storage.sync.set({
        'highlight-check': checked,
        'highlight-color': color,
        'highlight-time': time
    }, function(){});
}

document.getElementById('save_options').addEventListener('click', save_options);