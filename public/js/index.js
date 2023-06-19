/* eslint-disable no-unused-vars */
function doneClicked(taskid) {
  fetch(`/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskid }),
  })
    .then((response) => {
      if (response.ok) {
        location.reload();
      } else {
        alert("There was an error when trying to finish a task");
      }
    })
    .catch((error) => {
      alert("Error when trying to POST request");
    });
}

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
        location.reload();
      } else {
        alert("There was an error when trying to delete");
      }
    })
    .catch((error) => {
      alert("Error when trying to DELETE request");
    });
}

const $items = $("[class*='accordion-item-']");

$("#search-input").on("input", function () {
  var inputValue = $(this).val().toLowerCase();

  $items.each(function () {
    if (!$(this).data("title").toLowerCase().includes(inputValue)) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
});

const $accordion = $("#accordion");
if ($accordion.children().length === 0) {
  //desktop
  $("#content").append(
    `<h1 id="task-placeholder">There is no tasks to show</h1>`
  );
}
function editClicked(taskId) {
  $("#editModal-" + taskId)
    .prependTo("body")
    .modal("show");
}
