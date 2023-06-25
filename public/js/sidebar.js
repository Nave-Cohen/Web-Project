const $sidebar = $(".sidebar");
const $sidebarNext = $sidebar.next();
const $searchInput = $("#search-input");
const $menuIcon = $("#menu-icon");
const $listItems = $(".list-item:not(.user)");
const $logoutItem = $(".logout-btn");
const title = document.title.toLowerCase();

getBadges();

$(".item-text").each(function () {
  var text = $(this).text().toLowerCase();
  if (text.includes(title)) {
    $(this).closest(".list-item").addClass("active");
  } else {
    $(this).closest(".list-item").removeClass("active");
  }
});

// let previousWidth = $sidebar.outerWidth();
// $sidebarNext.css("margin-left", previousWidth + "px");

// if (!window.matchMedia("(max-width: 640px)").matches) {
//   // On desktop
//   setInterval(function () {
//     const currentWidth = $sidebar.outerWidth();
//     if (currentWidth !== previousWidth) {
//       $sidebarNext.css("margin-left", currentWidth + "px");
//     }
//     previousWidth = currentWidth;
//   }, 5);
// }

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
function getBadges() {
  if ($.cookie("badges")) {
    $.removeCookie("badges");
    var todayBadge = parseInt($("#today-badge").text());
    var upcomingBadge = parseInt($("#upcoming-badge").text());
    $("#today-badge").text(todayBadge + 1);
    $("#upcoming-badge").text(upcomingBadge + 1);
  }
}
setInterval(getBadges, 1000);

// eslint-disable-next-line no-unused-vars
function search(items) {
  $searchInput.on("input", function () {
    var inputValue = $(this).val().toLowerCase();
    items.each(function () {
      if (
        !$(this).data("title").toLowerCase().includes(inputValue) &&
        !$(this).find(".card-text").text().toLowerCase().includes(inputValue)
      ) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
}
