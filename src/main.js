const timetableHeader = document.querySelector("#selectTimetable");

// Insert loader DOM
const loader = document.createElement("div");
loader.classList.add("ilms-tasklist-loader");
timetableHeader?.parentNode.insertBefore(loader, timetableHeader);

// Fetch the task list
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

    // Remove the loader DOM and insert the task list block
    loader.remove();
    if (block !== null) {
      timetableHeader?.parentNode.insertBefore(block, timetableHeader);
    }
  })
  .catch((error) => {
    alert(error.message);
  });
