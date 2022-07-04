// ==+==+==+==+==+==+==+==+==+==[Requirements]==+==+==+==+==+==+==+==+==+==
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());


// ==+==+==+==+==+==+==+==+==+==[Connect DataBase]==+==+==+==+==+==+==+==+==+==
mongoose
  .connect(
    "mongodb+srv://sarhank44:sarhank8299@sarhancluster.fxjt3wn.mongodb.net/group65Database",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is Connected You are Ready To Goo buddy!"))
  .catch((err) => console.log(err.message));


app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Yuhoo! Express app is running on port " + (process.env.PORT || 3000));
});
