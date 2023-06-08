const $sidebar = $(".sidebar");

let previousWidth = $sidebar.outerWidth();
$sidebar.next().css("margin-left", previousWidth + "px");
if (!window.matchMedia("(max-width: 600px)").matches) {
  //on pc
  setInterval(function () {
    const currentWidth = $sidebar.outerWidth();
    if (currentWidth !== previousWidth) {
      $sidebar.next().css("margin-left", currentWidth + "px");
    }
    previousWidth = currentWidth;
  }, 10);
}

const $searchInput = $("#search-input");

$searchInput.focus(() => {
  $sidebar.addClass("on-search");
});
$searchInput.focusout(() => {
  $sidebar.removeClass("on-search");
});

$("#menu-icon").click(function () {
  $sidebar.toggleClass("close");
  $("#menu-icon").toggleClass("fa-xmark fa-bars");
});

$("#logout-item").click(() => {
  window.location.href = "/users/logout";
});
$(".list-item").each(function () {
  $(this).click(function () {
    const url = $(this).find("medium").text();
    window.location.href = "/tasks/" + url;
  });
});
