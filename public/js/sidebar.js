$(".sidebar").prev().appendTo("head"); // Move <style> element to end of head
$(".sidebar").next().appendTo("body"); // Move <script> element to end of body

let animationFrameId;
if (!window.matchMedia("(max-width: 600px)").matches) {
  let previousWidth = $(".sidebar").outerWidth();
  setInterval(function () {
    const currentWidth = $(".sidebar").outerWidth();
    if (currentWidth !== previousWidth) {
      $(".sidebar")
        .next()
        .css("margin-left", currentWidth + "px");
    }
    previousWidth = currentWidth;
  }, 10);
}

$("#search-input").focus(() => {
  $(".sidebar").addClass("on-search");
});
$("#search-input").focusout(() => {
  $(".sidebar").removeClass("on-search");
});

$("#menu-icon").click(function () {
  toggleMenu();
});

function toggleMenu() {
  $(".sidebar").toggleClass("close");
  $("#menu-icon").toggleClass("fa-xmark fa-bars");
}

$("#logout-item").click(() => {
  window.location.href = "/users/logout";
});
$(".list-item").each(function () {
  $(this).click(function () {
    const url = $(this).find("medium").text();
    window.location.href = "/tasks/" + url;
  });
});
