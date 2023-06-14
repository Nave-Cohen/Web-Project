/* eslint-disable no-unused-vars */
const $items = $("[class*='accordion-item-']");

$("#search-input").on("input", function () {
  var inputValue = $(this).val().toLowerCase();

  $items.each(function () {
    if (!$(this).data("title").toLowerCase().includes(inputValue)) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
});

$("#content-title").text(document.title + " Tasks"); //Change top site label.

const $accordion = $("#accordion");
if ($accordion.children().length === 0) {
  //desktop
  $("#content").append(
    `<h1 id="task-placeholder">There is no tasks to show</h1>`
  );
}
