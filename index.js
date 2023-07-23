const express = require('express');
const app = express();

// Mock user data (replace this with a real database or user authentication system)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  // Add more users as needed
];

// Middleware to parse incoming JSON data
app.use(express.json());

// Route for user registration (signup)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(409).json({ error: 'Username already taken' });
  }

  // Create a new user
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  // Return the newly created user
  return res.status(201).json(newUser);
});

// Route for user login (authentication)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  // Check if the user exists and provided correct credentials
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // You can implement a proper authentication mechanism here (e.g., using JWT)

  // For simplicity, we're returning a success message with the user information
  return res.status(200).json({ message: 'Login successful', user });
});

// Route to get user details (requires authentication)
app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // You can add authentication middleware here to ensure only authenticated users can access this route

  // For simplicity, we're returning the user details
  return res.status(200).json(user);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
