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
        console.log(conversation)
        conversation.save().then(() => {
          Profile.findById(conversation.sitter_id)
            .populate("requests")
            .populate("conversations")
            .then((profile) => {
              io.to(conversation.sitter_id).emit("update", profile);
            });
          Profile.findById(conversation.user_id)
            .populate("requests")
            .populate("conversations")
            .then((profile) => {
              io.to(conversation.user_id).emit("update", profile);
            });
        });
      });
    });

    socket.on("read messages", ({conversationId, profileId}) => {
      Conversation.findById(conversationId).then(conversation => {
        const read = profileId.toString() === conversation.user_id.toString() ? "read_by_user" : "read_by_sitter";
        conversation.messages.forEach(message => {
          message[read] = true;
        });
        conversation.save().then(() => {
          Profile.findById(conversation.sitter_id)
            .populate("requests")
            .populate("conversations")
            .then((profile) => {
              io.to(conversation.sitter_id).emit("update", profile);
            });
          Profile.findById(conversation.user_id)
            .populate("requests")
            .populate("conversations")
            .then((profile) => {
              io.to(conversation.user_id).emit("update", profile);
            });
        })
      });
    });
  });
  exports.io = io;
};
