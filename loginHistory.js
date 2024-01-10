const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Sample data for usernames and login dates
const userData = [
  { username: 'user1', loginDate: '2024-01-10' },
  { username: 'user2', loginDate: '2024-01-09' },
  // Add more data as needed
];

// Route to render the table view
app.get('/', (req, res) => {
  res.render('index', { users: userData });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
