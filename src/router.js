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

  if (username !== 'username' || password !== 'password') {
    return res.status(401).json({ message: 'Invalid username/password' });
  }

  const payload = { id: '123456789', name: 'User' };
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 60 });

  return res.json({ token });
});

router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
