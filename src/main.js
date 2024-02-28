fetch("/lms/task")
  .then((response) => {
    if (!response.ok) {
      throw new Error("課題リストの読み込みに失敗しました");
    }
    return response.text();
  })
  .then((html) => {
    // Insert the task list block into the timetable page
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const block = doc.querySelector(".block.clearfix");
    if (block !== null) {
      const timetableHeader = document.querySelector("#timetable");
      if (timetableHeader !== null) {
        timetableHeader.parentNode.insertBefore(block, timetableHeader);
      }
    }
  })
  .catch((error) => {
    alert(error.message);
  });
