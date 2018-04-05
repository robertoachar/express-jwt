const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('./config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'username' && password === 'password') {
    const payload = { id: '123456789', username: 'User' };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 60 });

    res.json({ token });
  } else {
    res.json(401).json({ message: 'Invalid username/password' });
  }
});

router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
