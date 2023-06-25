/* eslint-disable no-unused-vars */
const $items = $("[class*='accordion-item-']");
let placeholder = false;
// eslint-disable-next-line no-undef
search($items); //Sidebar function.

$("#content-title").text(document.title + " Tasks"); //Change top site label.

$(document).ready(function () {
  var $accordion = $(".accordion");
  var $main = $("main");

  setInterval(function () {
    if ($accordion.is(":empty")) {
      $main.append(`<h1 id="task-placeholder">There are no tasks to show</h1>`);
    } else {
      $("#task-placeholder").remove();
    }
  }, 10);
});

$(document).ready(function () {
  let itemId = $.cookie("scroll");
  if (itemId) {
    let collapseItem = $("#collapse-" + itemId);
    collapseItem.collapse("show");
    scrollTo(collapseItem);
    $.removeCookie("scroll");
  }
});
