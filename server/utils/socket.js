let io;

exports.create = server => {
  io = require("socket.io")(server);
};

io.on("connection", socket => {
  console.log(socket);
});

exports.io = io;