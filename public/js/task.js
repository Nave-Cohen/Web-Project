$(".done-btn").each(function () {
  $(this).click(function () {
    $(this).toggleClass("fa-circle fa-circle-check");
    $(this).next().toggleClass("text-decoration-line-through");
    const item = $(this).closest("[class^='accordion-item-']");
    var parent = item.parent();
    item.appendTo(parent);
    //#TODO:close collapse.
  });
});
