const { Router } = require("express"),
  { getAllTasks, deleteTask } = require("../services/db.service"),
  { Tasks } = require("../entities/task");

const router = Router();

router.get("/upcoming", async function (req, res) {
  var upcomingTasks = await getAllTasks(req.session.user.id);
  var tasks = new Tasks(upcomingTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html });
});

router.delete("/", async function (req, res) {
  try {
    var result = await deleteTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;
