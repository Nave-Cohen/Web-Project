/* eslint-disable no-undef */
let id;
const $title = $('#task-title');
const $content = $('#task-content');
const $created = $('#task-created');
const $datetimepicker = $('#datetimepicker');
const $modal = $('#Modal');
let minDateTime;

function updateTask(task) {
  try {
    $.post('/tasks/update', task, function (task) {
      $(`.accordion-item-${task.id}`).remove();
    });
    $modal.hide();
  } catch {
    console.log('modal update-item error');
  }
}
function addTask(task) {
  try {
    $.post('/tasks/add', task, function () {
      location.reload();
      // TODO: $(`.accordion`).prepend(); add new task to accordion
    });
    $modal.hide();
  } catch {
    console.log('modal update-item error');
  }
}

// eslint-disable-next-line no-unused-vars
function showModal(_id = -1, title = '', content = '', start = '', created = '') {
  id = _id;
  $title.val(title);
  $content.text(content);
  minDateTime = moment().tz('Asia/Jerusalem').format('YYYY-MM-DDTHH:mm');
  $datetimepicker.attr('min', minDateTime);
  $datetimepicker.val(start);
  $created.text(id !== -1 ? 'created - ' + created : created);
  $modal.data('id', id);
  $modal
    .modal({
      backdrop: false,
      keyboard: false,
    })
    .show();
}

$datetimepicker.on('input', function () {
  const selectedDateTime = new Date($(this).val());
  const minDateTimeObj = new Date(minDateTime);

  if (selectedDateTime < minDateTimeObj) {
    $(this).val(minDateTime);
  }
});

$('#close-modal-btn').click(function () {
  $modal.hide();
});

$('#sbmt-btn').click(function () {
  const task = {
    id,
    title: $title.val(),
    content: $content.text(),
    start: $datetimepicker.val(),
  };

  if (id !== -1) {
    updateTask(task);
  } else {
    addTask(task);
  }
});
