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
$("#upcoming-element").click(() => {
  window.location.href = "/tasks/upcoming";
});
$("#today-element").click(() => {
  window.location.href = "/tasks/today";
});
$("#done-element").click(() => {
  window.location.href = "/tasks/done";
});

document.addEventListener("DOMContentLoaded", function () {
  const urlPath = window.location.pathname;
  const tasksHeader = document.getElementById("tasks-header");

  if (urlPath === "/tasks/today") {
    tasksHeader.textContent = "Today Tasks";
  } else if (urlPath === "/tasks/upcoming") {
    tasksHeader.textContent = "Upcoming Tasks";
  } else if (urlPath === "/tasks/done") {
    tasksHeader.textContent = "Done Tasks";
  }
});

function editClicked(taskId) {
  $("#editModal-" + taskId)
    .prependTo("body")
    .modal("show");
}
