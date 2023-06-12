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
  var tasks = new Tasks(upcomingTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html, title: "Upcoming" });
});

router.get("/today", async function (req, res) {
  var todayTasks = await getTodayTasks(req.session.user.id);
  var tasks = new Tasks(todayTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html, title: "Today" });
});

router.get("/done", async function (req, res) {
  var doneTasks = await getDoneTasks(req.session.user.id);
  var tasks = new Tasks(doneTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html });
});

router.post("/done", async function (req, res) {
  try {
    await finishTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

router.delete("/delete", async function (req, res) {
  try {
    await deleteTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;
