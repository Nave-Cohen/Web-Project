/* eslint-disable no-undef */
let id;
const $title = $('#task-title');
const $content = $('#task-content');
const $created = $('#task-created');
const $datetimepicker = $('#datetimepicker');
const $modal = $('#Modal');
let minDateTime;

function updateRequest(task) {
  try {
    $.post('/tasks/update', task, function (task) {
      $(`.accordion-item-${task.id}`).remove();
    });
    $modal.hide();
  } catch {
    alert('modal update-item error');
  }
}
function addReqest(task) {
  try {
    $.post('/tasks/add', task, function () {
      location.reload();
      // TODO: $(`.accordion`).prepend(); add new task to accordion
    });
    $modal.hide();
  } catch {
    alert('modal update-item error');
  }
}
function getMinDate() {
  return moment().tz('Asia/Jerusalem').format('YYYY-MM-DDTHH:mm');
}
function setStart() {
  minDateTime = getMinDate();
  $datetimepicker.attr('min', minDateTime);
  $datetimepicker.val(minDateTime);
}
function validateDate() {
  minDateTime = getMinDate();
  const selectedDateTime = new Date($datetimepicker.val());
  const minDateTimeObj = new Date(minDateTime);

  if (selectedDateTime < minDateTimeObj) {
    $(this).val(minDateTime);
    return false;
  }
  return true;
}

// eslint-disable-next-line no-unused-vars
function showModal(_id = -1, title = '', content = '', start = '', created = '') {
  id = _id;
  $title.val(title);
  $content.val(content);
  $created.text(id !== -1 ? 'created - ' + created : created);
  setStart();

  $modal.data('id', id);
  $modal
    .modal({
      backdrop: false,
      keyboard: false,
    })
    .show();
}

$('#close-modal-btn').click(function () {
  $modal.hide();
});

$('#sbmt-btn').click(function () {
  if (!validateDate()) {
    $('#alert-msg').removeClass('d-none');
    return;
  }
  const task = {
    id,
    title: $title.val(),
    content: $content.val(),
    start: $datetimepicker.val(),
  };

  if (id !== -1) {
    updateRequest(task);
  } else {
    addReqest(task);
  }
});
