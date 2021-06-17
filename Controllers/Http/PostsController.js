const mongoose = require("mongoose");
const AuthController = require("../Auth/AuthController");
const fs = require("fs");

exports.GetPosts = async function (req, res) {
  let postsCollection = await mongoose
    .model("Posts")
    .find({ erased: 0 })
    .populate("userId");

  res.send(postsCollection);
};

exports.LikePost = async function (req, res) {
  let postsCollection = await mongoose
    .model("Posts")
    .findOne({ erased: 0, _id: req.params.id });

  mongoose
    .model("Posts")
    .findOneAndUpdate(
      { _id: req.params.id },
      { likes: postsCollection.likes + 1 },
      function (error, post) {
        if (error) res.send(error);

        res.json({ msg: "liked" });
      }
    );
};

exports.postPost = async function (req, res) {
  let { userId } = AuthController.AuthUser(req);

  console.log(req.body.text);
  var contents = fs.readFileSync(req.file.path, { encoding: "base64" });

  let newPost = new mongoose.model("Posts")({ text: req.body.text });
  newPost.userId = userId;
  newPost.image = "data:image/png;base64," + contents;

  newPost.save(function (error, note) {
    if (error) res.send(error);
    res.status(200).json(note);
  });
};
