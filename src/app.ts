import express from 'express';
import cors from 'cors';
import config from './config/env.js';

const app = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

export default app;
