const Conversation = require("../models/Conversation");
const Profile = require("../models/Profile");
const notifier = require("./notification");

let io;

exports.create = server => {
  io = require("socket.io")(server, {
    pingInterval: 5000,
    pingTimeout: 120000
  });
  io.on("connection", socket => {
    socket.on("profile", id =>{
      console.log(id);
      if (id) socket.join(id.toString());
    });

    socket.on("notification read", (profileId, notificationId) => {
      notifier.remove(profileId, notificationId);
    });

    socket.on("message", ({conversationId, message}) => {
      Conversation.findById(conversationId).then(conversation => {
        conversation.messages.push(message);
        conversation.save().then(() => {
          const notifyId = message.sender === conversation.user_id ? conversation.sitter_id : conversation.user_id;
          Profile.findById(notifyId).populate("requests").populate("conversations").then(profile => {
            io.to(notifyId).emit("update", profile);
          });
        });
      });
    });
  });
  exports.io = io;
};
