function save_options() {
    // hide courses
    var hide_course_text = document.getElementById('hide-course-list').value;
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

chrome.storage.sync.get(
    ['hide-course-list', 'highlight-check', 'highlight-color', 'highlight-time'],
    function(value) {
        var hide_list = value['hide-course-list'];
        var highlight_flag = value['highlight-check']
        var color = value['highlight-color'];
        var highlight_time = value['highlight-time'];

        if (hide_list != undefined) {
            var text = hide_list.join('\n');
            console.log(text);
            document.getElementById('hide-course-list').value = text;
        }
        if (highlight_flag == true || highlight_flag == false) {
            document.getElementById('highlight-check').checked = highlight_flag;
        }
        if (color != undefined) {
            document.getElementById('highlight-color').value = color;
        }
        if (highlight_time != undefined) {
            document.getElementById('highlight-time').value = highlight_time;
        }
    }
);

document.getElementById('save_options').addEventListener('click', save_options);

