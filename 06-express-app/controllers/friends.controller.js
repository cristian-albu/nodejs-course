const model = require("../models/friends.model");

function getFriends(req, res) {
  res.json(model);
}

function getFriend(req, res) {
  const friendId = Number(req.params.friendId);

  const friend = model[friendId];
  if (friend) {
    res.status(200).json(friend);
  } else {
    res.status(404).json({
      error: "Friend does not exist",
    });
  }
}

function postFriend(req, res) {
  if (!req.body.name) {
    return res.status(400).json({
      errpr: "Missing friend name",
    });
  }
  const newFriend = {
    name: req.body.name,
    id: model.length,
  };
  model.push(newFriend);
  res.status(201).json(newFriend);
}

module.exports = {
  getFriends,
  getFriend,
  postFriend,
};
