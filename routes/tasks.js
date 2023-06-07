const { Router } = require("express"),
  {
    getAllTasks,
    deleteTask,
    finishTask,
    getTodayTasks,
    getDoneTasks,
  } = require("../services/db.service"),
  { Tasks } = require("../entities/task");

const router = Router();

router.get("/upcoming", async function (req, res) {
  var upcomingTasks = await getAllTasks(req.session.user.id);
  var tasks = new Tasks(upcomingTasks.tasks);
  var doneTasks = new Tasks(upcomingTasks.doneTasks);
  var htmlTasks = await tasks.toHtml();
  var htmlDoneTasks = await doneTasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: htmlTasks,
    doneTasks: htmlDoneTasks,
  });
});

router.get("/today", async function (req, res) {
  var todayTasks = await getTodayTasks(req.session.user.id);
  var tasks = new Tasks(todayTasks.tasks);
  var doneTasks = new Tasks(todayTasks.doneTasks);
  var htmlTasks = await tasks.toHtml();
  var htmlDoneTasks = await doneTasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: htmlTasks,
    doneTasks: htmlDoneTasks,
  });
});

router.get("/done", async function (req, res) {
  var todayTasks = await getDoneTasks(req.session.user.id);
  var tasks = new Tasks(todayTasks);
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

router.post("/", async function (req, res) {
  try {
    var result = await finishTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});
module.exports = router;
