const express = require('express');
const server = express();

//global middleware
server.use(express.json());
server.use(logger);

//imports
const userRouter = require('./users/userRouter.js');
server.use('/api/users', userRouter);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.meathod} to ${req.url} from ${req.get('Origin')}`);

  next();
}

module.exports = server;
