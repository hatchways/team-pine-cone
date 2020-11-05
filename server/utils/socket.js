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

    socket.on("read messages", ({conversationId, profileId}) => {
      Conversation.findById(conversationId).then(conversation => {
        const read = profileId === conversation.user_id ? "read_by_user" : "read_by_sitter";
        conversation.messages.forEach(message => {
          message[read] = true;
        });
        conversation.save();
      });
    });
  });
  exports.io = io;
};
