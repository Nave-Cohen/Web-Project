const $sidebar = $('.sidebar');
const $sidebarNext = $sidebar.next();
const $searchInput = $('#search-input');
const $menuIcon = $('#menu-icon');
const $listItems = $('.list-item:not(.user)');
const $logoutItem = $('#logout-item');

const title = document.title;
getBadges();
$(`medium:contains(${title})`).parent().addClass('active');

let previousWidth = $sidebar.outerWidth();
$sidebarNext.css('margin-left', previousWidth + 'px');

if (!window.matchMedia('(max-width: 640px)').matches) {
  // On desktop
  setInterval(function () {
    const currentWidth = $sidebar.outerWidth();
    if (currentWidth !== previousWidth) {
      $sidebarNext.css('margin-left', currentWidth + 'px');
    }
    previousWidth = currentWidth;
  }, 5);
}

$searchInput.on('focus', function () {
  $sidebar.addClass('on-search');
});

$searchInput.on('focusout', function () {
  $sidebar.removeClass('on-search');
});

$menuIcon.on('click', function () {
  $sidebar.toggleClass('close');
  $menuIcon.toggleClass('fa-xmark fa-bars');
});

$logoutItem.on('click', function () {
  window.location.href = '/users/logout';
});

$listItems.on('click', function () {
  const url = $(this).find('medium').text();
  window.location.href = '/tasks/' + url;
});
function getBadges() {
  $.get(
    '/tasks/updateBadge',
    function (response) {
      $('#today-badge').text(response.today);
      $('#upcoming-badge').text(response.upcoming);
    },
    'json'
  );
}
setInterval(getBadges, 2500);

// eslint-disable-next-line no-unused-vars
function search(items) {
  $searchInput.on('input', function () {
    var inputValue = $(this).val().toLowerCase();
    items.each(function () {
      if (!$(this).data('title').toLowerCase().includes(inputValue)) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
}
