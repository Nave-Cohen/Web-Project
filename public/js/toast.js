const $toast = $("#liveToast");

function getClosetTask() {
  $.get("/tasks/closet", function (response) {
    const date = new Date(response.task._start_);
    const startString = date.toISOString().slice(0, 16);
    checkTask(startString, response.task);
  });
}

function checkTask(startString, task) {
  const now = new Date();
  const nowString = now.toISOString().slice(0, 16); // Get date and time up to the minute
  if (nowString === startString) {
    clearInterval(intervalId);
    // eslint-disable-next-line no-undef
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance($toast);
    $toast.find(".toast-body").text(task.title);
    $toast.data("taskId", task.id);
    toastBootstrap.show();
    setTimeout(function () {
      setInt();
    }, 60000);
  }
}

function setInt() {
  intervalId = setInterval(getClosetTask, 1000 * 10);
}
getClosetTask();
let intervalId = setInterval(getClosetTask, 1000 * 10);

$toast.click(function () {
  try {
    const taskId = $(this).data("taskId");
    const $taskItem = $(".accordion-item-" + taskId);
    $taskItem.find("#collapse-" + taskId).collapse("show");
    $taskItem[0].scrollIntoView();
  } catch {
    /* empty */
  }
});
