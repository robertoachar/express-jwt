/* eslint no-unused-vars: 0 */

module.exports.catchAll = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something broke!';

  res.status(status).json({ error: { message } });
};

module.exports.notFound = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;

  next(error);
};
