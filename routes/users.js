const { Router } = require("express"),
  dbService = require("../services/db.service"),
  User = require("../entities/user");

const router = Router();

//render login
router.get("/signin", function (req, res) {
  renderSignTabs(res, "signin", "signup");
});

router.post("/signin", async function (req, res) {
  var user = await dbService.login(req.body.username, req.body.password);
  if (user) {
    req.session.user = new User(user);
    res.redirect("/");
  } else {
    renderSignTabs(res, "signin", "signup");
  }
});

//render register
router.get("/signup", function (req, res) {
  renderSignTabs(res, "signup", "signin");
});

function renderSignTabs(res, activeTab, inactiveTab) {
  res.render(`ejs/sign-tabs.ejs`, {
    active: activeTab,
    notactive: inactiveTab,
  });
}
//render logout
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/user/signin");
});

module.exports = router;
