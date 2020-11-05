const { Message } = require("../models");
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
        const newMessage = new Message(message);
        newMessage.save().then(result => {
          conversation.messages.push(result._id);
          conversation.save().then(() => {
            Profile.findById(conversation.sitter_id)
              .populate("requests")
              .populate({
                path: "conversations",
                populate: {
                  path: "messages",
                  model: "Message"
                }
              })
              .then((profile) => {
                io.to(conversation.sitter_id).emit("update", profile);
              });
            Profile.findById(conversation.user_id)
              .populate("requests")
              .populate({
                path: "conversations",
                populate: {
                  path: "messages",
                  model: "Message",
                },
              })
              .then((profile) => {
                io.to(conversation.user_id).emit("update", profile);
              });
          });
        });
      });
    });

    socket.on("read messages", ({conversationId, profileId}) => {
      Conversation.findById(conversationId).populate("messages").then(conversation => {
        const read = profileId.toString() === conversation.user_id.toString() ? "read_by_user" : "read_by_sitter";
        conversation.messages.forEach(message => {
          message[read] = true;
          message.save();
        });
        conversation.save().then(() => {
          Profile.findById(conversation.sitter_id)
            .populate("requests")
            .populate({
              path: "conversations",
              populate: {
                path: "messages",
                model: "Message",
              },
            })
            .then((profile) => {
              io.to(conversation.sitter_id).emit("update", profile);
            });
          Profile.findById(conversation.user_id)
            .populate("requests")
            .populate({
              path: "conversations",
              populate: {
                path: "messages",
                model: "Message",
              },
            })
            .then((profile) => {
              io.to(conversation.user_id).emit("update", profile);
            });
        });
      });
    });
  });
  exports.io = io;
};
