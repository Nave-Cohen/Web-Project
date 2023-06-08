$(document).ready(() => {
  $(".sidebar").prev().appendTo("head"); // Move <style> element to end of head
  $(".sidebar").next().appendTo("body"); // Move <script> element to end of body

  let previousWidth = $(".sidebar").outerWidth();
  if (!window.matchMedia("(max-width: 600px)").matches) {
    setInterval(function () {
      const currentWidth = $(".sidebar").outerWidth();
      if (currentWidth !== previousWidth) {
        $(".sidebar")
          .next()
          .css("margin-left", currentWidth + "px");
      }
      previousWidth = currentWidth;
    }, 10);
  } else {
    $(".sidebar").next().css("margin-left", "50px");
  }

  $("#search-input").focus(() => {
    $(".sidebar").addClass("on-search");
  });
  $("#search-input").focusout(() => {
    $(".sidebar").removeClass("on-search");
  });

  $("#menu-icon").click(function () {
    $(".sidebar").toggleClass("close");
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
});
