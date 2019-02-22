const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const seed = require('../seed');

seed();
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static(path.resolve(__dirname, '../node_modules')));
app.use('/song/:songId', express.static(path.resolve(__dirname, '../dist')));


const connection = mysql.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'password',
  database: 'ZoundCloud',
});


app.get('/song/:songId/comments', (req, res) => {
  console.log('here');
  const { songId } = req.params;
  connection.query(`SELECT * FROM comments where songId = ${songId}`, (err, response) => {
    if (err) {
      console.log('err', err);
      res.sendStatus(403);
    } else {
      console.log('working1');
      res.send(response);
    }
  });
});

app.get('/song/:songId/commentCount', (req, res) => {
  const { songId } = req.params;
  connection.query(`SELECT COUNT(*) FROM comments where songId = ${songId}`, (err, response) => {
    if (err) {
      console.log('errr', err);
      res.sendStatus(403);
    } else {
      console.log('working');
      res.send({ count: response[0]['COUNT(*)'] });
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
