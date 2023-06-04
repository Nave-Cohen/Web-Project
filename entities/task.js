class Task {
  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.content = task.content;
    this.created = task.created;
    //TODO: add task start time
  }

  get created() {
    return this.created_;
  }

  set created(dateStr) {
    const today = new Date();
    const date = new Date(dateStr);
    const timeDiff = Math.floor((today - date) / 1000);

    const units = ["year", "month", "week", "day", "hour", "minute", "second"];
    const durations = [
      365.25 * 24 * 60 * 60,
      30.44 * 24 * 60 * 60,
      7 * 24 * 60 * 60,
      24 * 60 * 60,
      60 * 60,
      60,
      1,
    ];

    for (let i = 0; i < units.length; i++) {
      const value = Math.floor(timeDiff / durations[i]);

      if (value > 0) {
        this.created_ =
          value === 1 ? `1 ${units[i]} ago` : `${value} ${units[i]}s ago`;
        return;
      }
    }
    this.created_ = "Just now";
  }

  toHtml() {
    return `<div class="accordion-item">
     <h2 class="accordion-header" id="task-${this.id}">
       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${this.id}" aria-expanded="true" aria-controls="collapse-${this.id}">
         ${this.title}
       </button>
     </h2>
     <div id="collapse-${this.id}" class="accordion-collapse collapse show" aria-labelledby="task-${this.id}" data-bs-parent="#accordion-${this.id}">
       <div class="accordion-body">
        TODO: add card body
       </div>
     </div>`;
  }
}

class Tasks {
  constructor(tasks) {
    this.tasks = tasks.map((task) => new Task(task));
  }
  toHtml() {
    var html = `<div class="accordion" id="accordion">`;
    this.tasks.forEach((task) => {
      html += task.toHtml();
    });
    return html + "</div>";
    //TODO: create acordeon
  }
}

const dateStr = "2023-06-03 00:16:32";
const result = new Tasks([
  {
    id: 1,
    uid: 1,
    title: "asdf",
    content: "asdf",
    created: dateStr,
  },
]);
console.log(result.toHtml());
