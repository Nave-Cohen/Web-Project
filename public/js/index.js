/* eslint-disable no-unused-vars */
const $items = $("[class*='accordion-item-']");

// eslint-disable-next-line no-undef
search($items); //Sidebar function.

$('#content-title').text(document.title + ' Tasks'); //Change top site label.

const $accordion = $('#accordion');
if ($accordion.children().length === 0) {
  $('#content').append(`<h1 id="task-placeholder">There is no tasks to show</h1>`);
}
