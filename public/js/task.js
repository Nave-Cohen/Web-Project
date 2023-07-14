// Post request for finish an active task
// On success the task will move to Completed tasks page
function doneClicked(taskid, startTime) {
  fetch("/tasks/done", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskid }),
  })
    .then((response) => {
      if (response.ok) {
        $(`.accordion-item-${taskid}`).remove();
        $.cookie("badges", "false|" + convertDate(startTime));
      } else {
        alert("There was an error when trying to finish a task");
      }
    })
    .catch((error) => {
      alert("Error when trying to POST request");
    });
}

// Post request for delete a task
// On success the task will be removed
function deleteClicked(taskid, startTime) {
  fetch("/tasks/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: taskid }),
  })
    .then((response) => {
      if (response.ok) {
        $(`.accordion-item-${taskid}`).remove();
        $.cookie("badges", "false|" + convertDate(startTime));
      } else {
        alert("There was an error when trying to delete");
      }
    })
    .catch((error) => {
      alert("Error when trying to DELETE request");
    });
}

function convertDate(date) {
  const [day, month, year, time] = date.split(/[/ ]/);
  const [hours, minutes] = time.split(":");
  return new Date("20" + year, month - 1, day, hours, minutes);
}
