const notifier = require("./notification");

let io;

exports.create = server => {
  io = require("socket.io")(server);
  io.on("connection", socket => {
    socket.on("profile", id =>{
      console.log(id);
      socket.join(id.toString());
    });

    socket.on("notification read", (profileId, notificationId) => {
      notifier.remove(profileId, notificationId);
    });
  });
  exports.io = io;
};
