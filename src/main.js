// This script run in https://utol.ecc.u-tokyo.ac.jp/lms/timetable at `document_idle` timing

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

    // Insert the task list block
    if (block !== null) {
      timetableHeader?.parentNode.insertBefore(block, timetableHeader);
    }
  })
  .catch((error) => {
    alert(error.message);
  })
  .finally(() => {
    // Remove the loader
    loader.remove();
  });
