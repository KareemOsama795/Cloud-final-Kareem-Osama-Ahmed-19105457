const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs'); 
const mysql = require('mysql2');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

// viewing the page 
app.get('/', (req, res) => {
  res.render('indexApp');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;


  // let's assume the username is "useraast" and password is "passaast"
  if (username === 'useraast' && password === 'passaast') {
    res.send(true);
  } else {
    res.send(false);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("http://localhost:3000");
});