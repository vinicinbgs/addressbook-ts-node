import loadEnvs from './config/envs';
loadEnvs();

import express from 'express';
import { Server } from 'http';
import { routes } from './config/routes';
import configServer from './config/server';
import logger from './config/logger';

import ExceptionHandlerMiddleware from './http/middlewares/ExceptionHandlerMiddleware';

import { relationalDB } from './databases';

const port = configServer.port;
const host = configServer.host;

const app = express();

const psql = relationalDB;

const gracefulShutdown = async (code: any, server?: Server) => {
  console.log(code);

  (await psql).destroy();

  if (server) server.close();
};

app.use(logger);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.use(ExceptionHandlerMiddleware);

app.use('/report-coverage', express.static('coverage/lcov-report'));

psql.then(() => {
  const server = app.listen(port, host, async () => {
    console.log(`Server running at ${port}`);
  });

  process.on('SIGINT', (code) => gracefulShutdown(code, server));

  process.on('SIGTERM', (code) => gracefulShutdown(code, server));
});

process.on('uncaughtException', (code) => {
  console.log('uncaughtException', code);
});

process.on('unhandledRejection', (code) => {
  console.log('unhandledRejection', code);
});

export default app;
