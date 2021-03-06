require("dotenv").config();
const passwordReset = require("./routes/api/PasswordReset");
const users = require("./routes/api/users");
const connection = require("./config/db");
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connection();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.use("/api/users", users);
app.use("/api/password-reset", passwordReset);

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//Serve Static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
});
}

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(0);
  });

  process.on('SIGTERM', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(0);
  });