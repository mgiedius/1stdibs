/* eslint-disable no-console, no-param-reassign */
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/browse', require('./routes/browseRouter'));
app.use('/item', require('./routes/itemRouter'));

app.use(express.static('build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log('Example app listening at localhost:%s', port);
});
