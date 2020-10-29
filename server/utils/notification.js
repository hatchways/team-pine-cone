const Profile = require("../models/Profile");
const socket = require("./socket");

exports.notify = (id, notification) => {
  Profile.findById(id).then(profile => {
    profile.notifications.push(notification);
    socket.io.to(id.toString()).emit("notification", notification);
    profile.save();
  });
};

exports.remove = (profileId, notificationId) => {
  Profile.findById(profileId).then(profile => {
    let index;
    profile.notifications.forEach((notification, i) => {
      if (notification._id === notificationId) index = i;
    });
    if (index) profile.notifications.splice(index, 1);
    profile.save();
  });
};