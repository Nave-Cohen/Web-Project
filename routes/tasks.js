const { Router } = require("express"),
  {
    getAllTasks,
    deleteTask,
    finishTask,
    getTodayTasks,
    getCompletedTasks,
    getIncompletedTasks,
    countTodayTasks,
    countUpcomingTasks,
    countIncompletedTasks,
  } = require("../services/db.service"),
  { Tasks } = require("../entities/task");

const router = Router();

router.use("/", async function (req, res, next) {
  req.session.totalTodayTasks = await countTodayTasks(req.session.user.id);
  req.session.totalUpcomingTasks = await countUpcomingTasks(
    req.session.user.id
  );
  req.session.totalIncompletedTasks = await countIncompletedTasks(
    req.session.user.id
  );
  next();
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
    totalIncompleted: req.session.totalIncompletedTasks,
  });
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
    totalIncompleted: req.session.totalIncompletedTasks,
  });
});

router.get("/incomplete", async function (req, res) {
  var incompleteTasks = await getIncompletedTasks(req.session.user.id);
  var tasks = new Tasks(incompleteTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: "Incompleted",
    totalUpcoming: req.session.totalUpcomingTasks,
    totalToday: req.session.totalTodayTasks,
    totalIncompleted: req.session.totalIncompletedTasks,
  });
});

router.get("/completed", async function (req, res) {
  var completedTasks = await getCompletedTasks(req.session.user.id);
  var tasks = new Tasks(completedTasks);
  var html = await tasks.toHtml();
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: "Completed",
    totalUpcoming: req.session.totalUpcomingTasks,
    totalToday: req.session.totalTodayTasks,
    totalIncompleted: req.session.totalIncompletedTasks,
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
