const express = require('express');
const userRouter = require('./users/userRouter.js');
const server = express();

//global middleware
server.use(express.json());
server.use(logger);

//imports
server.use('/api/users', userRouter);


// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

server.get("/", (req,res) => {
  res.status(200).json({ envirronment: process.env.NODE.ENV})
})
//custom middleware

// logger logs to the console the following information about each request: request method, request url, and a timestamp
// this middleware runs on every request made to the API
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}], Requested method: ${req.method}, to Url:${req.url} from ${req.get('Origin')}`);

  next();
}

module.exports = server;
