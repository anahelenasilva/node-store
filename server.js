"use strict";

//TODO: THIS IS A TODO

//FIXME: this is a fixme

import http from "htpp";
import express from "express";
const debug = require("debug")("nodestr:server");

const app = express();
const port = 3000;

app.set("port", port);

const server = http.createServer(app);
const router = express.Router();
