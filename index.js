const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const db = require('./config/database');
const routes = require('./routes/cryptoRoute');
const { start } = require('./jobs/fetchPrices');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.use('/', routes);

(async () => {
    try {
        await db();
        logger.info('Database connected successfully');

        start();

        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
        });
    } catch (error) {
        logger.error('Error connecting to the database:', error);
        process.exit(1);
    }
})();
