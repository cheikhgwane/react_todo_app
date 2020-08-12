let express = require("express");
let mongoose = require("mongoose");

let bodyParser = require("body-parser");
let router = require("./routes");
const app = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET ,PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static(__dirname + "/../build"));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

mongoose.connect("mongodb://127.0.0.1/todo_bd", { useNewUrlParser: true });

let db = mongoose.connection;

db.on("error", err => {
  console.log("Erreur de connexion :" + err);
});

db.on("connected", () => {
  console.log("Connexion établie");
});
