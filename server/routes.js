let router = require("express").Router();
let controller = require("./controller");
const path = require("path");
//______________________

let page = pageName => __dirname + "/../build" + pageName;

const { getAllToDo, addToDo, getById, deleteById } = controller;

router.get("/", (req, res) => {
  console.log(req);
  res.status(200).sendFile(path.join(__dirname + "/../build/index.html"));
});
router.route("/api/addTodo").post((req, res) => {
  console.log("=================================");
  console.log(req.body);
  console.log("=================================");
  addToDo(req.body).then(result => {
    res.sendStatus(result);
  });
});

router.get("/api/getAll", (req, res) => {
  getAllToDo()
    .then(result => {
      console.log(result);
      res.status(200).send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
});

router
  .get("/api/:id", (req, res) => {
    //console.log(req.params.id);
    const { id } = req.params;
    getById(id)
      .then(todo => {
        //console.log(todo);
        res.status(200).send(JSON.stringify(todo));
      })
      .catch(err => {
        res.status(404).send(JSON.stringify("Not Found" + err));
      });
  })
  .put("/api/:id", (req, res) => {
    res.status(200).send(JSON.stringify(req.params));
    console.log(req.params);
  })
  .delete("/api/:id", (req, res) => {
    console.log(req.params);
    deleteById(req.params.id)
      .then(r => {
        console.log(r);
        res.status(200).send(JSON.stringify(r));
      })
      .catch(err => {
        res.status(400).send(JSON.stringify(err));
      });
  });

module.exports = router;
