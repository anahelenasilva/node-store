"use strict";

const jwt = require("jsonwebtoken");

exports.generateToken = async (data) => {
  return jwt.sign(data, global.SALT_KEY, { expiresIn: "1d" });
};

exports.decodeToken = async (token) => {
  var data = await jwt.verify(token, global.SALT_KEY);
  return data;
};

exports.authorize = async (request, response, next) => {
  var token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"];

  if (!token) {
    response.status(401).json({
      message: "Acesso Restrito",
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        response.status(401).json({
          message: "Token inválido",
        });
      } else {
        next();
      }
    });
  }
};

exports.isAdmin = async (request, response, next) => {
  var token =
    request.body.token ||
    request.query.token ||
    request.headers["x-access-token"];

  if (!token) {
    response.status(401).json({
      message: "Token inválido",
    });
  } else {
    jwt.verify(token, global.SALT_KEY, function (error, decoded) {
      if (error) {
        response.status(401).json({
          message: "Token inválido",
        });
      } else {
        if (decoded.roles === undefined || decoded.roles.includes("admin")) {
          next();
        } else {
          response.status(403).json({
            message: "Você não tem permissão para acessar esse recurso",
          });
        }
      }
    });
  }
};
