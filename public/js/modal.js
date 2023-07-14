// Bootstrap modal for adding/editing a new task

// Bootstrap modal for adding/editing a new task

let id;
const $title = $("#task-title");
const $content = $("#task-content");
const $created = $("#task-created");
const $alertMsg = $("#alert-msg");
const $datetimepicker = $("#datetimepicker");
const $modal = $("#Modal");
let minDateTime;

// Update task with new input
// Update task with new input
function updateTask(task) {
  const $task = $(`.accordion-item-${task.id}`);
  $task.find("#title").text(task.title);
  $task.find("#content").text(task.content);
  $task.find("#created").text(task.created);
  $task.find("#start").text("start - " + task.start.replace("T", " "));
}

// Add a new task
// Place task immediately in right place (sorted by date and time)
function addTask(task, response) {
  const currentHref = location.href.toLowerCase();
  const taskDate = new Date(task.start);

  if (
    currentHref.includes("upcoming") ||
    (currentHref.includes("today") &&
      taskDate.toDateString() === new Date().toDateString())
  ) {
    const accordionItems = document.querySelectorAll(
      "[class*='accordion-item-']"
    );
    const accordion = $(".accordion");
    let inserted = false;

    accordionItems.forEach((item) => {
      // Compare added task date and time with other tasks on page
      const startDateElement = item.querySelector("#start");
      const startDateText = startDateElement.textContent.split(" - ")[1].trim();
      const [day, month, year, time] = startDateText.split(/[/ ]/);
      const [hours, minutes] = time.split(":");
      const compareDate = new Date("20" + year, month - 1, day, hours, minutes);
      if (taskDate.getTime() < compareDate.getTime()) {
        $(item).before(response);
        inserted = true;
        return false;
      }
    });

    if (!inserted) {
      accordion.append(response);
    }
  }
}

// Update the task by sending post request
// Update the task by sending post request
function updateRequest(task) {
  $.post(
    "/tasks/update",
    task,
    function (response) {
      updateTask(response);
    },
    "json"
  ).fail(function () {
    alert("modal update-item error");
  });
  $modal.hide();
}

// Add new task by sending post request
// Add new task by sending post request
function addReqest(task) {
  $.post(
    "/tasks/add",
    task,
    function (response) {
      addTask(task, response);
    },
    "html"
  ).fail(function () {
    alert("modal update-item error");
  });
  $modal.hide();
}

// Get the minimum date and time (from current date and time) for the datetime picker
// Get the minimum date and time (from current date and time) for the datetime picker
function getMinDate() {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  const minDateTimeObj = new Date(now - tzOffset);
  return minDateTimeObj.toISOString().slice(0, 16);
}

function setStart() {
  minDateTime = getMinDate();
  $datetimepicker.attr("min", minDateTime);
  $datetimepicker.val(minDateTime);
}

// Validate the modal input fields
// Validate the modal input fields
function validateModal() {
  const selectedDateTime = new Date($datetimepicker.val());
  const minDateTimeObj = new Date(getMinDate());
  const pattern =
    /^([A-Za-z]{3})\s([A-Za-z]{3})\s(\d{2})\s(\d{4})\s(\d{2}):(\d{2}):(\d{2}).+/;

  if ($title.val() === "") {
    $alertMsg.text("Title cannot be empty.");
    return false;
  } else if (selectedDateTime < minDateTimeObj) {
    $(this).val(minDateTime);
    $alertMsg.text("Selected date cannot be earlier than now.");
    return false;
  } else if (!pattern.test(selectedDateTime)) {
    $alertMsg.text("The selected date you choose is not valid.");
    return false;
  }
  return true;
}

// Pack the task data into a JSON object
// Pack the task data into a JSON object
function packTask() {
  return {
    id,
    title: $title.val(),
    content: $content.val(),
    start: $datetimepicker.val(),
    created: $created.text(),
  };
}

// Show modal with task data

// Show modal with task data
function showModal(_id = -1, title = "", content = "", created = "") {
  id = _id;
  $title.val(title);
  $content.val(content);
  $created.text(id !== -1 ? "created - " + created : created);
  setStart();

  $modal.data("id", id);
  $modal
    .modal({
      backdrop: false,
      keyboard: false,
    })
    .show();
}

// Hide modal when close button is clicked
// Hide modal when close button is clicked
$("#close-modal-btn").click(function () {
  $modal.hide();
});

// Update or add when the submit button is clicked
// Update or add when the submit button is clicked
$("#sbmt-btn").click(function () {
  if (!validateModal()) {
    $alertMsg.removeClass("d-none");
    return;
  }
  var task = packTask();
  if (task.id !== -1) {
    updateRequest(task);
  } else {
    addReqest(task);
    $.cookie("badges", "true|" + task.start);
  }
});
