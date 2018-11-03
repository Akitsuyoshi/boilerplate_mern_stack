import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.resolve(__dirname, '..', '..', 'public');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
  res.set({
    Connection: 'close', 'Cache-Control': 'no-cache',
  });

  next();
});

app.use(logger('dev'));
app.use('/api', bodyParser.urlencoded({ extended: false }), bodyParser.json());

app.get('/api', (req, res) => {
  res.send('Hello from Express!');
});

// It serves any static files
app.use(express.static(publicPath));
app.set('port', port);

export default app;
