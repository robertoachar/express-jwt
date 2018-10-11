const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport');

const auth = require('./auth');
const router = require('./router');
const { catchAll, notFound } = require('./error');

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(auth);
app.use(passport.initialize());

app.use(router);

app.use(notFound);
app.use(catchAll);

module.exports = app;
