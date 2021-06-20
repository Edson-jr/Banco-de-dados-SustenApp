const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./AuthController");

exports.AuthUser = function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = JWT.verify(token, process.env.SECRET_KEY);

    return decoded;
  } catch (error) {
    res.status(500).send({
      msg: "error_when_get_user",
    });
  }
};

exports.Login = async function (req, res) {
  try {
    const { email, passwordUser } = req.body;

    if (!req.body) {
      res.status(400).send({
        msg: "send_all_params",
        code: "400",
      });
    }

    let user = "";
    user = await mongoose.model("User").findOne({ email }).select("+password");

    if (user) {
      let { password } = user;

      let verificationPassword = await bcrypt.compare(passwordUser, password);

      if (verificationPassword) {
        let userId = user._id.toString();

        let dataUser = {
          userId,
          user,
        };

        const token = JWT.sign(dataUser, process.env.SECRET_KEY, {
          expiresIn: 604800,
        });

        user = auth.userResponse(user);

        let userResponse = {
          token,
          userId,
          user,
        };

        res.status(200).json(userResponse);
      } else {
        res.status(401).send({
          msg: "password_or_username_do_not_match",
          code: "401",
        });
      }
    } else {
      res.status(404).send({ msg: "user_not_found", code: "404" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "error_when_login_user",
      code: "500",
    });
  }
};

exports.createAccount = function (req, res) {
  try {
    const user = req.body;

    let newUser = "";
    const results = mongoose
      .model("User")
      .find({ email: user.email }, function name(error, tutors) {
        if (tutors.length) {
          res.status(400).send({
            msg: "already_exists_registered_email_address",
            code: "400",
          });
        } else {
          newUser = new mongoose.model("User")(user);

          newUser.save(function (error, newUser) {
            if (error) {
              res.status(400).send(error);
            } else {
              let userId = newUser._id.toString();

              let dataUser = {
                userId,
                newUser,
              };

              const token = JWT.sign(dataUser, process.env.SECRET_KEY, {
                expiresIn: 604800,
              });

              let user = auth.userResponse(newUser);

              let userResponse = {
                token,
                userId,
                user,
              };

              res.status(200).json(userResponse);
            }
          });
        }
      });

    return results;
  } catch (error) {
    res.status(500).send({
      msg: "error when create user",
    });
  }
};

exports.Session = async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decoded = JWT.verify(token, process.env.SECRET_KEY);

    let user = "";
    user = await mongoose
      .model("User")
      .findOne({ _id: decoded.userId })
      .select("+password");

    let responseuser = auth.userResponse(user);

    res.json(responseuser);
  } catch (error) {
    res.status(400).send({ msg: "token_not_sended" });
  }
};

exports.ResetPassword = function (req, res) {
  const token = req.headers.authorization.split(" ")[1];

  let decoded = JWT.verify(token, process.env.SECRET_KEY);

  mongoose
    .model("User")
    .findOneAndUpdate(
      { _id: decoded.userId },
      { password: req.body.password },
      function (error, post) {
        if (error) res.send(error);

        res.json({ msg: "reseted" });
      }
    );
};

exports.userResponse = function (user) {

  let userReturn = {
    nickname: user.nickname,
    email: user.email,
    city: user.city,
  };

  return userReturn;
};
