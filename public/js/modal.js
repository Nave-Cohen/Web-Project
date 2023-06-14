var id;
const $title = $("#task-title");
const $content = $("#task-content");
const $created = $("#task-created");
const $datetimepicker = $("#datetimepicker");
const $modal = $("#Modal");
var minDateTime;
// eslint-disable-next-line no-unused-vars
function showModal(
  _id = -1,
  title = "",
  content = "",
  start = "",
  created = ""
) {
  id = _id;
  $title.val(title);
  $content.text(content);
  // eslint-disable-next-line no-undef
  minDateTime = moment().tz("Asia/Jerusalem").format("YYYY-MM-DDTHH:mm");
  $datetimepicker.attr("min", minDateTime);
  $datetimepicker.val(start);
  if (id !== -1) {
    $created.text("created - " + created);
  } else {
    $created.text(created);
  }
  $modal.data("id", id);
  $modal
    .modal({
      backdrop: false,
      keyboard: false,
    })
    .show();
}
$datetimepicker.on("input", function () {
  var selectedDateTime = new Date($(this).val());
  var minDateTimeObj = new Date(minDateTime);

  if (selectedDateTime < minDateTimeObj) {
    $(this).val(minDateTime);
    alert("the must be greater then current time");
  }
});

$("#close-modal-btn").click(function () {
  $("#Modal").hide();
});

$("#sbmt-btn").click(function () {
  const task = {
    id: id,
    title: $title.val(),
    content: $content.text(),
    start: $datetimepicker.val(),
  };
  if (id !== -1) {
    try {
      $.post("/tasks/update", task, function (task) {
        $(`.accordion-item-${task.id}`).remove();
      });
      $modal.hide();
    } catch {
      console.log("modal update-item error");
    }
  } else {
    try {
      $.post("/tasks/add", task, function () {
        location.reload();
        // TODO: $(`.accordion`).prepend(); add new task to accordion
      });
      $modal.hide();
    } catch {
      console.log("modal update-item error");
    }
  }
});
