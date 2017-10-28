const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = require('./auth');
const error = require('./error');

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, PATCH, PUT, POST');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

auth.initAuth();
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'username' && password === 'password') {
    const payload = { id: '123456789', username: 'User' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 });

    res.json({ token });
  }
  else {
    res.json(401).json({ message: 'Invalid username/password' });
  }
});

app.get('/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  });

app.use(error.notFound);
app.use(error.catchAll);

module.exports = app;
