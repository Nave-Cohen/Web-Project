function doneClicked(id) {}
function deleteClicked(taskid) {
  fetch(`/tasks`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskid }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload(); // Refresh the page
      } else {
        alert("There was an error when trying to delete");
      }
    })
    .catch((error) => {
      alert("Error when trying to DELETE request");
    });
}

$("#search-input").focus(() => {
  $(".sidebar").addClass("on-search");
});
$("#search-input").focusout(() => {
  $(".sidebar").removeClass("on-search");
});
$("#menu-icon").click(function () {
  if ($(this).hasClass("fa-solid fa-xmark")) {
    $(this).attr("class", "fa-solid fa-bars");
  } else {
    $(this).attr("class", "fa-solid fa-xmark");
  }
  $(".sidebar").toggleClass("close");
});
