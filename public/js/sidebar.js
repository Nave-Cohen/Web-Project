// App sidebar

const $sidebar = $(".sidebar");
const $searchInput = $("#search-input");
const $menuIcon = $("#menu-icon");
const $listItems = $(".list-item:not(.user)");
const $logoutItem = $(".logout-btn");
const title = document.title.toLowerCase();

getBadges();

// Highlight icon active for selected page
$(".item-text").each(function () {
  var text = $(this).text().toLowerCase();
  if (text.includes(title)) {
    $(this).closest(".list-item").addClass("active");
  } else {
    $(this).closest(".list-item").removeClass("active");
  }
});

// Clicked on search
$searchInput.on("focus", function () {
  $sidebar.addClass("on-search");
});

$searchInput.on("focusout", function () {
  $sidebar.removeClass("on-search");
});

// Open/Close menu bar
$menuIcon.on("click", function () {
  $sidebar.toggleClass("close");
  $menuIcon.toggleClass("fa-xmark fa-bars");
});

// Logout button - redirect to logout
$logoutItem.on("click", function () {
  window.location.href = "/users/logout";
});

// Redirect to selected tasks page
$listItems.on("click", function () {
  const url = $(this).find("medium").text();
  window.location.href = "/tasks/" + url;
});

// Update tasks count for today and upcoming tasks and place it in propper badge
function getBadges() {
  const cookieValue = $.cookie("badges");
  const cookieArray = cookieValue ? cookieValue.split("|") : [];
  if (cookieArray.length < 1) {
    return;
  }
  const cookie = cookieArray[0];
  const taskDate = new Date(cookieArray[1]);

  const todayBadgeElement = $("#today-badge");
  const upcomingBadgeElement = $("#upcoming-badge");

  let todayBadge = parseInt(todayBadgeElement.text(), 10);
  let upcomingBadge = parseInt(upcomingBadgeElement.text(), 10);
  console.log(
    taskDate,
    taskDate.getDate() === new Date().getDate(),
    taskDate.getDate(),
    new Date().getDate()
  );
  if (cookie === "true") {
    if (taskDate.getDate() === new Date().getDate()) {
      todayBadge++;
      upcomingBadge++;
      todayBadgeElement.text(todayBadge);
      upcomingBadgeElement.text(upcomingBadge);
    } else {
      upcomingBadge++;
      upcomingBadgeElement.text(upcomingBadge);
    }
    $.removeCookie("badges");
  }
  if (cookie === "false") {
    if (taskDate.getDate() === new Date().getDate()) {
      todayBadge--;
      upcomingBadge--;
      todayBadgeElement.text(todayBadge);
      upcomingBadgeElement.text(upcomingBadge);
    } else {
      upcomingBadge--;
      upcomingBadgeElement.text(upcomingBadge);
    }
    $.removeCookie("badges");
  }
  todayBadgeElement.text(todayBadge);
  upcomingBadgeElement.text(upcomingBadge);

  $.removeCookie("badges");
}

setInterval(getBadges, 500);

// Search tasks by title or content
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
