const { Router } = require("express"),
  dbService = require("../services/db.service"),
  router = Router();

// Fetch and store count of upcoming and today's tasks in the session
router.use(async function (req, res, next) {
  const id = req.session.user.id;
  req.session.upcoming = await dbService.countUpcomingTasks(id);
  req.session.today = await dbService.countTodayTasks(id);
  next();
});

// Render index page with the provided data
async function renderIndex(req, res, user, html, title) {
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: title,
    user: user,
    today: req.session.today,
    upcoming: req.session.upcoming,
  });
}

// Route handlers for getting tasks: today, upcoming, incompleted and completed

router.get("/upcoming", async function (req, res) {
  var upcomingTasks = await dbService.getAllTasks(req.session.user.id);
  var html = await upcomingTasks.toHtml();
  renderIndex(req, res, req.session.user, html, req.url.split("/").slice(-1));
});

router.get("/today", async function (req, res) {
  var todayTasks = await dbService.getTodayTasks(req.session.user.id);
  var html = await todayTasks.toHtml();
  renderIndex(req, res, req.session.user, html, req.url.split("/").slice(-1));
});

router.get("/incomplete", async function (req, res) {
  var doneTasks = await dbService.getIncompleteTasks(req.session.user.id);
  var html = await doneTasks.toHtml();
  renderIndex(req, res, req.session.user, html, req.url.split("/").slice(-1));
});

router.get("/completed", async function (req, res) {
  var doneTasks = await dbService.getDoneTasks(req.session.user.id);
  var html = await doneTasks.toHtml();
  renderIndex(req, res, req.session.user, html, req.url.split("/").slice(-1));
});

// Route handler for marking a task as done
router.post("/done", async function (req, res) {
  try {
    await dbService.finishTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

// Route handler for deleting a task
router.delete("/delete", async function (req, res) {
  try {
    await dbService.deleteTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

// Route handler for updating a task
router.post("/update", async function (req, res) {
  const task = packTask(req.body);
  try {
    await dbService.updateTask(task);
    res.send(task);
  } catch {
    res.sendStatus(500);
  }
});

// Route handler for adding a new task
router.post("/add", async function (req, res) {
  const request = packTask(req.body);

  const task = await dbService.addTask(req.session.user.id, request);
  if (task) {
    const html = await task.toHtml();
    res.send(html);
  } else {
    res.sendStatus(500);
  }
});

// Updating the badge count
router.get("/updateBadge", async function (req, res) {
  const uid = req.session.user.id;
  const upcomingNum = await dbService.countUpcomingTasks(uid);
  const todayNum = await dbService.countTodayTasks(uid);
  res.send({ upcoming: upcomingNum, today: todayNum });
});

// Getting a task by start time (for notification)
router.post("/now", async function (req, res) {
  const uid = req.session.user.id;
  const startTime = req.body.time;
  const closetTask = await dbService.getCurrentTask(uid, startTime);
  res.send(closetTask);
});

// Pack the task data into a JSON object
function packTask(body) {
  return {
    id: body.id,
    title: body.title,
    content: body.content,
    start: body.start,
    created: body.created,
  };
}

module.exports = router;
