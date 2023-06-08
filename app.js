/* eslint-disable no-undef */
const express = require('express');
const app = express();
const users = require('./routes/users');
const tasks = require('./routes/tasks');
const sessions = require('./services/sessions.service');
const jwt = require('./middlewares/login.middleware');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static(`${__dirname}/public`));
app.use(sessions);

app.get('/', jwt, async (req, res) => {
  res.redirect('tasks/upcoming');
});
app.use('/users', users);

app.use('/tasks', jwt, tasks);

app.use((req, res) => {
  res.render('ejs/404.ejs');
});

if (process.env.npm_lifecycle_event != 'test') {
  app.listen(8080, () => {
    console.log('listening on port 8080');
  });
}
module.exports.app = app;
