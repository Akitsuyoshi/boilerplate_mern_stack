/* eslint global-require: 0 */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, '../../', 'public');
const isProd = process.env.NODE_ENV === 'production';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type',
  );
  res.set({
    Connection: 'close',
    'Cache-Control': 'no-cache',
  });

  next();
});

app.use(logger('dev'));
app.use('/api', bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.get('/api', (req, res) => {
  res.send('Hello from Express!');
});

// Webpack Requirements
if (!isProd) {
  const webpack = require('webpack');
  const config = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      watchOptions: {
        ignored: /node_modules/,
      },
      noInfo: true,
      publicPath: config.output.path,
      port,
    }),
  );
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2000,
    }),
  );
} else {
  // It serves any static files in production
  app.use(express.static(publicPath));
  app.set('port', port);
}
export default app;
