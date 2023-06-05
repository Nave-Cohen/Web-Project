const ejs = require("ejs");
const path = require("path");
const ejsPath = path.join(__dirname, "..", "views/partials/task.ejs");

class Task {
  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.content = task.content;
    this.createdDate = task.created;
    //TODO: add task start time
  }

  get created() {
    return this.getCreated();
  }

  set created(dateStr) {
    this.createdDate = dateStr;
  }

  getCreated() {
    const today = new Date();
    const date = new Date(this.createdDate);
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
        return value === 1 ? `1 ${units[i]} ago` : `${value} ${units[i]}s ago`;
      }
    }
    return "Just now";
  }

  async toHtml() {
    try {
      const html = await ejs.renderFile(ejsPath, { task: this });
      return html;
    } catch (err) {
      console.error(err);
      return "";
    }
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
const result = new Task({
  id: 1,
  uid: 1,
  title: "asdf",
  content: "asdf",
  created: dateStr,
});

result
  .toHtml()
  .then((html) => {
    console.log(html);
  })
  .catch((err) => {
    console.error(err);
  });
