const mongoose = require("mongoose");
const AuthController = require("../Auth/AuthController");
const fs = require("fs");

exports.GetSales = async function (req, res) {
  let postsCollection = await mongoose
    .model("Sales")
    .find({ erased: 0 })
    .populate("userId");

  res.send(postsCollection);
};

exports.postSale = async function (req, res) {
  let { userId } = AuthController.AuthUser(req);

  var contents = fs.readFileSync(req.file.path, { encoding: "base64" });

  let newSale = new mongoose.model("Sales")({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  });

  newSale.userId = userId;
  newSale.image = "data:image/png;base64," + contents;

  newSale.save(function (error, note) {
    if (error) res.send(error);
    res.status(200).json({ msg: 'created'});
  });
};
