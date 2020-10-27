let io;

exports.create = server => {
  io = require("socket.io")(server);
  io.on("connection", socket => {
    socket.on("profile", id =>{
      socket.join(id.toString());
    });
  });
};

exports.io = io;