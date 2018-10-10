const logger = require('./logger');

const app = require('./app');
const config = require('./config');

app.listen(config.PORT, () => {
  Object.keys(config).map((key) => logger.info(`${key}: ${config[key]}`));
});
