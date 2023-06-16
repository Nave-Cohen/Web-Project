const { Router } = require("express"),
  {
    getAllTasks,
    deleteTask,
    finishTask,
    getTodayTasks,
    getDoneTasks,
    countTodayTasks,
    countUpcomingTasks,
  } = require("../services/db.service"),
  { Tasks } = require("../entities/task");

const router = Router();

router.use("/", async function (req, res, next) {
  req.session.totalUpcomingTasks = await countUpcomingTasks(
    req.session.user.id
  );
  req.session.totalTodayTasks = await countTodayTasks(req.session.user.id);
  next();
});

router.get("/upcoming", async function (req, res) {
  var upcomingTasks = await getAllTasks(req.session.user.id);
  var tasks = new Tasks(upcomingTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: "Upcoming",
    totalUpcoming: req.session.totalUpcomingTasks,
    totalToday: req.session.totalTodayTasks,
  });
});

router.get("/today", async function (req, res) {
  var todayTasks = await getTodayTasks(req.session.user.id);
  var tasks = new Tasks(todayTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: "Today",
    totalUpcoming: req.session.totalUpcomingTasks,
    totalToday: req.session.totalTodayTasks,
  });
});

router.get("/completed", async function (req, res) {
  var doneTasks = await getDoneTasks(req.session.user.id);
  var tasks = new Tasks(doneTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: "Completed",
    totalUpcoming: req.session.totalUpcomingTasks,
    totalToday: req.session.totalTodayTasks,
  });
});

router.delete("/", async function (req, res) {
  try {
    await deleteTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

router.post("/", async function (req, res) {
  try {
    await finishTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});
module.exports = router;
