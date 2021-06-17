const express = require("express");
const routes = require("./Routes/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const requireDir = require("require-dir");
dotenv.config()


const app = express(),
            mongoose = require('mongoose'),
            modelsMongo = requireDir('./Models')
            
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ urlencoded: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("json spaces", 4);

app.use("/api", routes);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOCONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is runnig at ${port}`)

})