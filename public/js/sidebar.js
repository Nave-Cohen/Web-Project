const $sidebar = $(".sidebar");
const $sidebarNext = $sidebar.next();
const $searchInput = $("#search-input");
const $menuIcon = $("#menu-icon");
const $listItems = $(".list-item");
const $logoutItem = $("#logout-item");

const title = document.title;

$(`medium:contains(${title})`).parent().addClass("active");

let previousWidth = $sidebar.outerWidth();
$sidebarNext.css("margin-left", previousWidth + "px");

if (!window.matchMedia("(max-width: 640px)").matches) {
  // On desktop
  setInterval(function () {
    const currentWidth = $sidebar.outerWidth();
    if (currentWidth !== previousWidth) {
      $sidebarNext.css("margin-left", currentWidth + "px");
    }
    previousWidth = currentWidth;
  }, 10);
}

$searchInput.on("focus", function () {
  $sidebar.addClass("on-search");
});

$searchInput.on("focusout", function () {
  $sidebar.removeClass("on-search");
});

$menuIcon.on("click", function () {
  $sidebar.toggleClass("close");
  $menuIcon.toggleClass("fa-xmark fa-bars");
});

$logoutItem.on("click", function () {
  window.location.href = "/users/logout";
});

$listItems.on("click", function () {
  const url = $(this).find("medium").text();
  window.location.href = "/tasks/" + url;
});
