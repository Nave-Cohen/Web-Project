const { Router } = require("express"),
  dbService = require("../services/db.service"),
  { Tasks } = require("../entities/task");

const router = Router();
router.get("/upcoming", async function (req, res) {
  var upcomingTasks = await dbService.getAllTasks(req.session.user.id);
  var tasks = new Tasks(upcomingTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html, title: "Upcoming" });
});

router.get("/today", async function (req, res) {
  var todayTasks = await dbService.getTodayTasks(req.session.user.id);
  var tasks = new Tasks(todayTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html, title: "Today" });
});

router.get("/done", async function (req, res) {
  var doneTasks = await dbService.getDoneTasks(req.session.user.id);
  var tasks = new Tasks(doneTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", { tasks: html, title: "Done" });
});

router.delete("/delete", async function (req, res) {
  try {
    await dbService.deleteTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

router.post("/done", async function (req, res) {
  try {
    await dbService.finishTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

router.post("/update", async function (req, res) {
  const task = {
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    start: req.body.start,
  };
  try {
    await dbService.updateTask(task);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});
router.post("/add", async function (req, res) {
  const task = {
    title: req.body.title,
    content: req.body.content,
    start: req.body.start,
  };
  try {
    await dbService.addTask(req.session.user.id, task);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});
module.exports = router;
