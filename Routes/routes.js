const { Router } = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const AuthController = require("../Controllers/Auth/AuthController");

const PostsController = require("../Controllers/Http/PostsController");
const SalesController = require("../Controllers/Http/SalesController");

const Auth = require("../Middlewares/Auth");

const Route = Router();

Route.post("/createuser", AuthController.createAccount);
Route.post("/login", AuthController.Login);
Route.get("/session", Auth.session, AuthController.Session);
Route.post("/resetpassword", Auth.session, AuthController.ResetPassword);


Route.get("/posts", Auth.session, PostsController.GetPosts);

Route.post(
  "/posts",
  Auth.session,
  upload.single("image"),
  PostsController.postPost
);

Route.post("/postslike/:id", Auth.session, PostsController.LikePost);

Route.get("/sales", Auth.session, SalesController.GetSales);

Route.post(
  "/sales",
  Auth.session,
  upload.single("image"),
  SalesController.postSale
);

module.exports = Route;
