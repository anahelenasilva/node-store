"use strict";

//TODO: THIS IS A TODO

//FIXME: this is a fixme

const express = require("express");
const http = require("http");
const debug = require("debug")("nodestr:server");

const app = express();
const port = 3000;
app.set("port", port);

const server = http.createServer(app);
const router = express.Router();

const route = router.get("/", (request, response, next) => {
  response.status(200).send({
    title: "Node Store API",
    version: "0.0.1",
  });
});

app.use("/", route);

server.listen(port);
