// packages
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
// middlewares
const errorsHandler = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// constants
const { DB_URL_DEV } = require('./utils/config');
const ORIGINS = require('./utils/origins');

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB_URL : DB_URL_DEV);
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(cors({
  origin: ORIGINS,
  credentials: true,
}));

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => console.log(`server listening at ${PORT}`));
