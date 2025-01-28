var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const serverless = require('serverless-http');

const http = require('http');
var app = express();
const port = 8080 || 3000;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
io.on('connection', (socket) => {
  const username = socket.handshake.query.username
  socket.on('message', (data) => {
    const message = {
      message: data.message,
      senderUsername: data.message.sender,
      sentAt: data.message.timestamp
    }
    messages.push(message)
    io.emit('message', message)
    console.log(message);
  })
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports.handler = serverless(app);