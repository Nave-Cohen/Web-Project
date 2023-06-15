/* eslint-disable no-undef */
let id;
const $title = $('#task-title');
const $content = $('#task-content');
const $created = $('#task-created');
const $alertMsg = $('#alert-msg');
const $datetimepicker = $('#datetimepicker');
const $modal = $('#Modal');
let minDateTime;

function updateTask(task) {
  const $task = $(`.accordion-item-${task.id}`);
  $task.find('#title').text(task.title);
  $task.find('#content').text(task.content);
  $task.find('#created').text(task.created);
  $task.find('#start').text('start - ' + task.start.replace('T', ' '));
}
function addTask(task, response) {
  if (
    (location.href.toLowerCase().includes('today') && isToday(task.start)) ||
    location.href.toLowerCase().includes('upcoming')
  ) {
    const taskDate = new Date(task.start);
    $("[class*='accordion-item-']").each(function () {
      var compareDate = new Date($(this).find('#start').text().slice(7));
      if (taskDate < compareDate) {
        $(this).before(response);
        return;
      }
    });
  }
}

function updateRequest(task) {
  $.post(
    '/tasks/update',
    task,
    function (response) {
      updateTask(response);
    },
    'json'
  ).fail(function () {
    alert('modal update-item error');
  });
  $modal.hide();
}

function addReqest(task) {
  $.post(
    '/tasks/add',
    task,
    function (response) {
      addTask(task, response);
    },
    'html'
  ).fail(function () {
    alert('modal update-item error');
  });
  $modal.hide();
}

function getMinDate() {
  return moment().tz('Asia/Jerusalem').format('YYYY-MM-DDTHH:mm');
}

function isToday(date) {
  const gotDate = new Date(date.slice(0, 16)).toISOString().slice(0, 10);
  const today = getMinDate().slice(0, 10);
  if (gotDate === today) {
    return true;
  }
  return false;
}

function setStart() {
  minDateTime = getMinDate();
  $datetimepicker.attr('min', minDateTime);
  $datetimepicker.val(minDateTime);
}

function validateModal() {
  const selectedDateTime = new Date($datetimepicker.val());
  const minDateTimeObj = new Date(getMinDate());
  const pattern = /^([A-Za-z]{3})\s([A-Za-z]{3})\s(\d{2})\s(\d{4})\s(\d{2}):(\d{2}):(\d{2}).+/;

  if ($title.val() === '') {
    $alertMsg.text('Title cannot be empty.');
    return false;
  } else if (selectedDateTime < minDateTimeObj) {
    $(this).val(minDateTime);
    $alertMsg.text('Selected date cannot be earlier than now.');
    return false;
  } else if (!pattern.test(selectedDateTime)) {
    $alertMsg.text('The selected date you choose is not valid.');
    return false;
  }
  return true;
}

function packTask() {
  return {
    id,
    title: $title.val(),
    content: $content.val(),
    start: $datetimepicker.val(),
    created: $created.text(),
  };
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

$('#sbmt-btn').click(function () {
  if (!validateModal()) {
    $alertMsg.removeClass('d-none');
    return;
  }
  var task = packTask();
  if (task.id !== -1) {
    updateRequest(task);
  } else {
    addReqest(task);
  }
});
