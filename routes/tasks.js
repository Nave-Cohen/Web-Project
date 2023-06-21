const { Router } = require("express"),
  dbService = require("../services/db.service"),
  router = Router();

async function renderIndex(res, user, html, title) {
  res.render("../views/ejs/index.ejs", {
    tasks: html,
    title: title,
    user: user,
  });
}

router.get("/today", async function (req, res) {
  var todayTasks = await dbService.getTodayTasks(req.session.user.id);
  var html = await todayTasks.toHtml();
  renderIndex(res, req.session.user, html, req.url.split("/").slice(-1));
});

router.get("/upcoming", async function (req, res) {
  var upcomingTasks = await dbService.getAllTasks(req.session.user.id);
  var html = await upcomingTasks.toHtml();
  renderIndex(res, req.session.user, html, req.url.split("/").slice(-1));
});

router.get("/incomplete", async function (req, res) {
  var incompleteTasks = await dbService.getIncompletedTasks(req.session.user.id);
  var html = await incompleteTasks.toHtml();
  renderIndex(res, req.session.user, html, req.url.split("/").slice(-1));
});

router.get("/completed", async function (req, res) {
  var doneTasks = await dbService.getCompletedTasks(req.session.user.id);
  var html = await doneTasks.toHtml();
  renderIndex(res, req.session.user, html, req.url.split("/").slice(-1));
});

router.post("/done", async function (req, res) {
  try {
    await dbService.finishTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

router.delete("/delete", async function (req, res) {
  try {
    await dbService.deleteTask(req.body.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

router.post("/update", async function (req, res) {
  const task = packTask(req.body);
  try {
    await dbService.updateTask(task);
    res.send(task);
  } catch {
    res.sendStatus(500);
  }
});

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

router.get("/updateBadge", async function (req, res) {
  const uid = req.session.user.id;
  const todayNum = await dbService.countTodayTasks(uid);
  const upcomingNum = await dbService.countUpcomingTasks(uid);
  const incompletedNum = await dbService.countIncompletedTasks(uid);
  res.send({ upcoming: upcomingNum, today: todayNum , incompleted: incompletedNum});
});

router.get("/closet", async function (req, res) {
  const uid = req.session.user.id;
  const closetTask = await dbService.getFirstTask(uid);
  if (closetTask) {
    res.send({ task: closetTask });
  } else {
    res.sendStatus(500);
  }
});

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
