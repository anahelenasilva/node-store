const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = router.get("/", (request, response, next) => {
  response.status(200).send({
    title: "Node Store API",
    version: "0.0.3",
  });
});

const create = router.post("/", (request, response, next) => {
  response.status(201).send(request.body);
});

const put = router.put("/:id", (request, response, next) => {
  const id = request.params.id;
  response.status(200).send({ id: id, item: request.body });
});

const del = router.delete("/:id", (request, response, next) => {
  response.status(200).send(request.body);
});

app.use("/", route);
app.use("/products", create);
app.use("/products", put);
app.use("/products", del);

module.exports = app;
