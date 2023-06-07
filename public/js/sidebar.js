$("#search-input").focus(() => {
  $(".sidebar").addClass("on-search");
});
$("#search-input").focusout(() => {
  $(".sidebar").removeClass("on-search");
});

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
  $(this).toggleClass("fa-solid fa-xmark");
  $(this).toggleClass("fa-solid fa-bars");
}
let previousWidth = $(".sidebar").width();
let animationFrameId;

$(window).on("resize", function () {
  cancelAnimationFrame(animationFrameId);
  animationFrameId = requestAnimationFrame(checkWidth);
});

function checkWidth() {
  const currentWidth = $(".sidebar").width();
  if (currentWidth !== previousWidth) {
    $(".sidebar")
      .next()
      .css("margin-left", currentWidth + "px");
    previousWidth = currentWidth;
  }
  animationFrameId = requestAnimationFrame(checkWidth);
}

// Start the initial check
animationFrameId = requestAnimationFrame(checkWidth);
