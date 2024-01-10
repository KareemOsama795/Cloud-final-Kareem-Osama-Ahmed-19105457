const express = require('express');
const session = require('express-session');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL database connection
const db = mysql.createConnection({
  host: '127.0.0.1', // MySQL host
  user: 'root', // MySQL username
  password: '8y$4[6]L27:%', // MySQL password
  database: 'user' // MySQL database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Express session setup
app.use(
  session({
    secret: 'abx123%^*',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware for session check
const checkSession = (req, res, next) => {
  if (!req.session.loggedin) {
    res.redirect('/');
  } else {
    next();
  }
};

// Routes

// Index route
app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboard');
  } else {
    res.send('Index Screen');
  }
});

// Dashboard route
app.get('/dashboard', checkSession, (req, res) => {
  res.send('Dashboard Screen');
});

// Login history route
app.get('/loginhistory', checkSession, (req, res) => {
  res.send('Login History Screen');
});

// API routes

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication against the database
  // Assuming there is a 'users' table with 'username' and 'password' fields
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      req.session.loggedin = true;

      // Insert into Log table
      const logSql = 'INSERT INTO Log (date, username) VALUES (?, ?)';
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      db.query(logSql, [currentDate, username], (err) => {
        if (err) throw err;
        res.send(true);
      });
    } else {
      res.send(false);
    }
  });
});

// Logout API
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send(true);
});

// Add department API
app.post('/api/adddepartment', checkSession, (req, res) => {
  // Assuming a 'departments' table with a 'name' field
  const { departmentName } = req.body;
  const sql = 'INSERT INTO departments (name) VALUES (?)';
  db.query(sql, [departmentName], (err) => {
    if (err) throw err;
    res.send(true);
  });
});

// Add user API
app.post('/api/adduser', checkSession, (req, res) => {
  // Assuming a 'users' table with 'username' and 'password' fields
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err) => {
    if (err) throw err;
    res.send(true);
  });
});

// Delete user API
app.post('/api/deleteuser', checkSession, (req, res) => {
  // Assuming a 'users' table
  const { username } = req.body;
  const sql = 'DELETE FROM users WHERE username = ?';
  db.query(sql, [username], (err) => {
    if (err) throw err;
    res.send(true);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// Express session setup
app.use(
  session({
    secret: 'abx123%^*',
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware for session check
const checkSessio = (req, res, next) => {
  if (!req.session.loggedin) {
    res.redirect('/');
  } else {
    next();
  }
};

// Routes

// Index route
app.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.redirect('/dashboardApp');
  } else {
    res.send('Index Screen');
  }
});

// Dashboard route
app.get('/dashboard', checkSession, (req, res) => {
  res.send('Dashboard Screen');
});

// Login history route
app.get('/loginhistoryApp', checkSession, (req, res) => {
  res.send('Login History Screen');
});

// API routes

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Perform authentication against the database
  // Assuming there is a 'users' table with 'username' and 'password' fields
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      req.session.loggedin = true;

      // Insert into Log table
      const logSql = 'INSERT INTO Log (date, username) VALUES (?, ?)';
      const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      db.query(logSql, [currentDate, username], (err) => {
        if (err) throw err;
        res.send(true);
      });
    } else {
      res.send(false);
    }
  });
});

// Logout API
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send(true);
});

// Add department API
app.post('/api/adddepartment', checkSession, (req, res) => {
  // Assuming a 'departments' table with a 'name' field
  const { departmentName } = req.body;
  const sql = 'INSERT INTO departments (name) VALUES (?)';
  db.query(sql, [departmentName], (err) => {
    if (err) throw err;
    res.send(true);
  });
});

// Add user API
app.post('/api/adduser', checkSession, (req, res) => {
  // Assuming a 'users' table with 'username' and 'password' fields
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err) => {
    if (err) throw err;
    res.send(true);
  });
});

// Delete user API
app.post('/api/deleteuser', checkSession, (req, res) => {
  // Assuming a 'users' table
  const { username } = req.body;
  const sql = 'DELETE FROM users WHERE username = ?';
  db.query(sql, [username], (err) => {
    if (err) throw err;
    res.send(true);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});