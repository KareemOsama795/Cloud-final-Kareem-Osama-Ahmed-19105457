const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs'); 
const mysql = require('mysql2');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'ejs');

app.get('/views/dashboardApp', (req, res) => {
    res.render('dashboardApp');
  });
  


  // Sample users data
const users = [
    { id: 1, username: 'user1', password: 'password1', department: 'dept1' },
    { id: 2, username: 'user2', password: 'password2', department: 'dept2' }
];



// Add depatrment 

  app.post('/api/adddepartment', (req, res) => {
    const departmentName = req.body.departmentName;

    // Validate the input data
    if (!departmentName) {
        return res.status(400).send("Department Name is required");
    }

    // Add the department to your data storage
    departments.push({ name: departmentName });

    // Send a success response to the client
    res.send(true);
});


// Add user 
app.post('/api/adduser', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const departmentId = req.body.departmentId;

    // Validate the input data
    if (!username || !password || !departmentId) {
        return res.status(400).send("Username, Password, and Department ID are required");
    }

    // Add the user to your data storage
    users.push({ username, password, departmentId });

    // Send a success response to the client
    res.send(true);
});


app.post('/api/deleteuser', (req, res) => {
    const userId = req.body.userId;

    // Find and remove the user with the specified ID
    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        users.splice(index, 1);
        res.send(true); // User deleted successfully
    } else {
        res.send(false); // User not found or deletion failed
    }
});

// API endpoint for fetching users
app.get('/api/getusers', (req, res) => {
    // Replace this with your logic to fetch users from the database or other source
    res.json(users);
});


// API endpoint for logging out
app.post('/api/logout', (req, res) => {
    // Replace this with your logout logic (e.g., clearing session, destroying tokens)
    // Simulate a successful logout
    const logoutSuccess = true;

    if (logoutSuccess) {
        res.send(true); // Logout successful
    } else {
        res.send(false); // Logout error
    }
});





PORT = 3000 ; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("http://localhost:3000/views/dashboard");
  });