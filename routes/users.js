const { Router } = require("express"),
  dbService = require("../services/db.service"),
  router = Router();

// Check if a user is already authenticated
router.use("/:query", (req, res, next) => {
  if (
    req.session.user &&
    req.params.query !== "logout" &&
    req.params.query !== "profile"
  ) {
    res.redirect("/");
  } else {
    next();
  }
});

// Render login
router.get("/signin", function (req, res) {
  renderSignTabs(res, "signin", "signup");
});

// Handle user signin
router.post("/signin", async function (req, res) {
  var user = await dbService.login(req.body.username, req.body.password);
  if (user) {
    if (req.body.checkbox) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 365;
    }
    req.session.user = user;
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

// Render register
router.get("/signup", function (req, res) {
  renderSignTabs(res, "signup", "signin");
});

// Handle user registration
router.post("/signup", async function (req, res) {
  var user = await dbService.register(
    req.body.username,
    req.body.email,
    req.body.password
  );
  if (!user || user.errno == 1062) {
    // Email or Username is taken
    res.sendStatus(500);
  } else {
    req.session.user = user;
    user.name = req.body.username;
    user.letter = user.name.charAt(0);
    res.sendStatus(200);
  }
});

// Switch between signin and register tabs
function renderSignTabs(res, activeTab, inactiveTab) {
  res.render(`ejs/sign-tabs.ejs`, {
    title: "Sign-" + activeTab.slice(4),
    active: activeTab,
    notactive: inactiveTab,
  });
}

// Handle user profile edit
router.post("/profile", async function (req, res) {
  var user = await dbService.editProfile(req.body);
  if (user) {
    req.session.user.name = req.body.username;
    req.session.user.email = req.body.email;
    req.session.user.letter = req.body.username.charAt(0);
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

// Render logout
router.get("/logout", function (req, res) {
  res.clearCookie("connect.sid");
  req.session.destroy();
  res.redirect("/users/signin");
});

module.exports = router;
